import os
import boto3
import praw

from nltk.corpus import stopwords


def get_tickers():
    """ Return a set of all the tickers I am tracking"""
    # Tickers I am excluding
    # stops = {x.upper() for x in stopwords.words('english')}
    # stops = {x for x in stops if len(x)<5}
    excluded_tickers = {"USA", "ATH", "EDIT", "HMM", "LMAO", "IMO", "DD", "SO", "OR", "FOR", "REAL", "DM", "TIL", "CAN", "BE", "IRS", "ALL", 'SOME', 'THEY', 'SHAN', 'OVER', 'RE', 'SHE', 'WERE', 'THEN', 'ANY', 'MORE', 'ISN', 'UP', 'THAN', 'WITH', 'AM', 'HAD', 'HIM', 'I', 'BUT', 'EACH', 'OURS', 'IN', 'ONCE', 'DON', 'S', 'DID', 'INTO', 'OUT', 'AREN', 'WHO', 'SUCH', 'VE', 'DO', 'WON', 'BE', 'WHOM',
                        'ONLY', 'NO', 'WAS', 'BOTH', 'WHEN', 'HAVE', 'YOUR', 'DOWN', 'MA', 'HOW', 'ALL', 'HERE', 'ITS', 'ON', 'DOES', 'THAT', 'WILL', 'AIN', 'OR', 'OF', 'M', 'BY', 'IF', 'TO', 'OUR', 'IS', 'BEEN', 'FROM', 'ME', 'WE', 'HER', 'WHY', 'O', 'LL', 'SAME', 'HASN', 'NOR', 'HADN', 'AS', 'OFF', 'FOR', 'HIS', 'ARE', 'DIDN', 'IT', 'SO', 'T', 'AT', 'AN', 'A', 'JUST', 'VERY', 'AND',
                        'HE', 'HERS', 'NOT', 'Y', 'TOO', 'MY', 'HAS', 'WASN', 'D', 'THIS', 'YOU', 'OWN', 'THE', 'THEM', 'MOST', 'WHAT', 'NOW', 'FEW', 'CAN'}
    path = os.getcwd()
    ticker_path = os.path.join(path, "../tickers", "final_tickers.csv")
    with open(ticker_path, newline='') as f:
        mylist = f.read().splitlines()
        return set(mylist) - excluded_tickers #- stops


def connect_to_dynamodb():
    """ connect to dynamodb tables and returns the references """
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')

    """ tables I am accessing """
    processed_ticker_list_db = dynamodb.Table('processed_ticker_list')
    practices_db = dynamodb.Table('sentiments_by_hour')

    return processed_ticker_list_db, practices_db

def connect_to_dynamodb_from_practices():
    """ connect to dynamodb tables and returns the references """
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')

    """ tables I am accessing """
    processed_ticker_list_db = dynamodb.Table('processed_ticker_list')
    practices_db = dynamodb.Table('practices')

    return processed_ticker_list_db, practices_db

def get_dynamodb_tickers(database):
    """ returns tickers inside the db with the reference to the database as an input """
    response = database.scan()
    data = response['Items']
    processed_ticker_set = set()
    processed_ticker_set = {d['ticker'] for d in data}
    return processed_ticker_set


def get_reddit_credentials():
    """ returns reddit instance from the credentials """
    return praw.Reddit(client_id='e_fBF6pjWeoGXg',
                       client_secret='CFAYoU7fUDjwhZYvzm5ZoFcBRiIVTw',
                       user_agent='awoken_soybean')


def submissions_and_comments(subreddit, **kwargs):
    """ 
    streaming both comments and submissions. got code from following: 
    - https://www.reddit.com/r/redditdev/comments/7jng5a/whats_the_best_way_to_monitorreply_to_comments/dr7qn4p/
    - https://gist.github.com/MrEdinLaw/9d50507a037f2e2f54b76d2cadffc72a
    """
    results = []
    results.extend(subreddit.new(**kwargs))
    results.extend(subreddit.comments(**kwargs))
    results.sort(key=lambda post: post.created_utc, reverse=True)
    return results
