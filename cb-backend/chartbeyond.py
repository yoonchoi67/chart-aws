import time
from datetime import datetime
import praw
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA
from collections import defaultdict
import yfinance as yf
from modules import modules
from modules import temp_modules
from decimal import Decimal
import sys, traceback

""" local initialization """
prod = True # fix this later
printit = True
interval = '%H'

if prod: 
    nltk.data.path.append("/home/ubuntu/env/lib/python3.8/site-packages")
    nltk.downloader.download('vader_lexicon')

""" local tickers related initialization """
tickers_set = modules.get_tickers()  # """ set of tickers we will use to get 'intersection' with the reddit streams """
tickers_dict = defaultdict(lambda: defaultdict(Decimal))  # """ a dictionary to hold information until batch processing """
tickers_batching_set = set() # """ tickers that we will accumulate until the interval. Then we will add differences to the dynamodb and then reset it """
difference = set()

""" dynamodb related initialization"""
processed_ticker_list_db, practices_db = modules.connect_to_dynamodb()  # """ reference to all the dynamodb tables I am connected to """
tickers_set_in_db = modules.get_dynamodb_tickers(processed_ticker_list_db)  # """ this gets the current processed tickers inside a dynamodb that we will merge with 'intersection' later """

""" nltk related initialization """
sia = SIA()  # """ a nltk that I will use: https://www.nltk.org/api/nltk.sentiment.html#module-nltk.sentiment.vader """

""" time related initialization """
ts = time.time()
start_minutes = int(datetime.utcfromtimestamp(ts).strftime(interval))
# print("starting at minute: ", start_minutes)
# print(datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d-%H-%M'))

# print(tickers_dict)
# sys.exit()

""" reddit related initialization """
reddit = modules.get_reddit_credentials(
)  # """ a reddit instance with a subreddit that I want to track """
subreddit = reddit.subreddit(
    'wallstreetbets')  # """ a reddit instance with a subreddit that I want to track """
stream = praw.models.util.stream_generator(
    lambda **kwargs: modules.submissions_and_comments(subreddit, **kwargs))  # """ generate a stream """

""" streaming """
def main():
    global prod, printit, interval, tickers_set, tickers_dict, tickers_batching_set, difference
    global processed_ticker_list_db, practices_db, tickers_set_in_db, sia, ts, start_minutes, reddit, subreddit, stream

    try:

        for post in stream:
            # skip the past because start of the stream always contain those from few minutes before
            if int(post.created_utc) < int(ts): continue

            try:
                splitted_sentences = set()
                # """ when the stream object is a comment """  # https://praw.readthedocs.io/en/latest/code_overview/models/comment.html?highlight=comment
                if isinstance(post, praw.models.reddit.comment.Comment): splitted_sentences = set(post.body.split())
                # """ when the stream object is a submission """ # https://praw.readthedocs.io/en/latest/code_overview/models/submission.html?highlight=submission
                elif isinstance(post, praw.models.reddit.submission.Submission): splitted_sentences = set(post.title + " " + post.selftext)
                
                intersection = splitted_sentences & tickers_set
                tickers_batching_set.update(intersection)
                
                # process the sentence only if there are ticker mentions inside
                if intersection:
                    # nltk... improve upon this maybe
                    scores = 0
                    if isinstance(post, praw.models.reddit.comment.Comment): scores = sia.polarity_scores(post.body)
                    elif isinstance(post, praw.models.reddit.submission.Submission): scores = sia.polarity_scores(post.title + " " + post.selftext)
                    
                    # to be used for checking the interval and deciding on batch processing
                    minutes = datetime.utcfromtimestamp(post.created_utc).strftime(interval)

                    for ticker in intersection:

                        """ check for the next interval and batch process the info into the dynamodb """
                        if int(minutes) != int(start_minutes):
                            if printit: print(datetime.now(), "- batch processing started")

                            # get difference between tickers processed through stream and tickers in dynamodb, so we will put the difference into dynamodb later 
                            difference = tickers_batching_set - tickers_set_in_db
                            
                            # practices dynamodb table batching
                            try:
                                # this is necessary to prevent 'dictionary changed size during iteration' error
                                temp_tickers_dict = tickers_dict
                                for k, v in temp_tickers_dict.items():
                                    if prod:
                                        practices_db.put_item(
                                            Item={
                                                'ticker': str(k),
                                                'date': str(v['date']),
                                                'positives': Decimal(v['positives']),
                                                'mentions': Decimal(v['mentions']),
                                                'created': Decimal(v['created'])    
                                            })
                            except Exception as e:
                                if printit: print(datetime.now(), '- ***error in practices dynamodb with error:', e)
                            
                            # processed_ticker_list dynamodb table batching
                            try:
                                if not difference: pass
                                for each in difference:
                                    if True:
                                        processed_ticker_list_db.put_item(
                                            Item={
                                                'ticker': each
                                            })
                            except Exception as e:
                                if printit: print(datetime.now(), '- ***error in processed_ticker_list dynamodb with error:', e)
                            
                            tickers_set_in_db |= tickers_batching_set
                            print("difference: ", difference)
                            print("intersection: ", intersection)
                            print("tickers_batching_set: ", tickers_batching_set)
                            print("tickers_set_in_db: ", tickers_set_in_db)
                            print("===========")
                            tickers_batching_set = set()
                            if printit: print(datetime.now(), "- batch processing finished")

                            # reset timer and dictionary
                            start_minutes = minutes                
                            tickers_dict = defaultdict(lambda: defaultdict(Decimal))
                            
                        """ populate tickers_dict """
                        if not tickers_dict[ticker]["positives"]: tickers_dict[ticker]["positives"] = 0
                        if scores['compound'] >= 0.1: tickers_dict[ticker]["positives"] += 1
                        tickers_dict[ticker]["mentions"] += 1
                        tickers_dict[ticker]["created"] = post.created_utc # more like, the most recent one's created time
                        tickers_dict[ticker]["date"] = datetime.utcfromtimestamp(post.created_utc).strftime('%Y-%m-%d-%H-%M') # more like, the most recent one's created date
                        if isinstance(post, praw.models.reddit.comment.Comment): tickers_dict[ticker]["comment"] = "Y"
                        elif isinstance(post, praw.models.reddit.submission.Submission): tickers_dict[ticker]["comment"] = "N"    

            except Exception as e:
                print(datetime.now(), ' - ***exception in one reddit loop with error:', e)
                
    except KeyboardInterrupt as kb:
        print("keyboard interrupt: Writing what I have down to dynamodb")
        print("difference in kb: ", difference)
        print("intersection in kb: ", intersection)
        print("tickers_batching_set in kb: ", tickers_batching_set)
        print("tickers_set_in_db in kb: ", tickers_set_in_db)
        print("===========")
        try:
            # this is necessary to prevent 'dictionary changed size during iteration' error
            temp_tickers_dict = tickers_dict
            for k, v in temp_tickers_dict.items():
                if prod:
                    practices_db.put_item(
                        Item={
                            'ticker': str(k),
                            'date': str(v['date']),
                            'positives': Decimal(v['positives']),
                            'mentions': Decimal(v['mentions']),
                            'created': Decimal(v['created'])                                   
                        })
        except Exception as e:
            if printit: print(datetime.now(), '- ***error in practices dynamodb with error:', e)
        
        # processed_ticker_list dynamodb table batching
        try:
            if not difference: pass
            for each in difference:
                if prod: processed_ticker_list_db.put_item( Item={ 'ticker': each })
        
        except Exception as e:
            if printit: print(datetime.now(), '- ***error in processed_ticker_list dynamodb with error:', e)
        
        print(datetime.now(), "write while keyboard exit successful")

    except Exception as e:
        print(datetime.now(), "Exitting gracefully failed with error: ", e)
    
    sys.exit(0)

if __name__ == "__main__":
    main()

# difference = {"TSLA", "GME", "AMC"}
# for each in difference:
#     processed_ticker_list_db.put_item(
#         Item={
#             'ticker': each
#         })