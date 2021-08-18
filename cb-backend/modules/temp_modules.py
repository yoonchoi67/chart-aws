import time
from datetime import datetime

def write_file(minutes, tickers_dict):
    f = open("demofile2.txt", "a")
    f.write("minutes: ")
    f.write(str((int(minutes)-1) % 60))
    f.write("\n")
    for each in tickers_dict:
        f.write(each)
        f.write(": ")
        f.write(str(tickers_dict[each]))
        f.write("\n")
    f.write("defaultdict resetted")
    f.write("\n")
    f.write("\n")
    f.close()

def write_error(prod, e):
    if prod:
        f = open("/home/ubuntu/errors/errors.txt", "a")
        ts = time.time()
        f.write("error at: ")
        f.write(str(datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')))
        f.write("\n")
        f.write(str(e))
        f.write("\n")
        f.write("\n")
        f.close()
    if not prod:
        f = open("./errors.txt", "a")
        ts = time.time()
        f.write("error at: ")
        f.write(str(datetime.utcfromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')))
        f.write("\n")
        f.write(str(e))
        f.write("\n")
        f.write("\n")
        f.close()