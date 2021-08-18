import csv

# get rid of tickers with '^' and are single symbols
if False:
    with open('tickers.csv', 'r') as inp, open('final_tickers.csv', 'a') as out:
        tickers = inp.read().splitlines() 
        writer = csv.writer(out)
        # lines = inp.readlines()

        for ticker in tickers:
            if "^" not in ticker and len(ticker)>=2:
                out.write(ticker)
                out.write("\n")