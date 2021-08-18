import os

path = os.getcwd()
print(path)
ticker_path = os.path.join(path, "./tickers", "final_tickers.csv")
with open(ticker_path, newline='') as f:
    print(f.read().splitlines())
    # printset(mylist) - excluded_tickers #- stops