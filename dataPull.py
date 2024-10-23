from utils import DataBase, DataBaseSQLConfig, IndeedScraper, SearchAPI, JobListing
import pandas as pd
from curl_cffi import requests as cureq
import time

def scrape_indeed(job_title:str,location:str,pages:int,dbHanlder):
    """
    Iterates through indeed job board based on job title, location  and pulls relevent information to push to db file.

        Args:
            job_title (str): The job title to search for.
            location (str): The location to search in.
            start_num (int): The pagination start number for results.

        Returns:
            df (pd.DataFrame): DataFrame with job information
    """
    df = pd.DataFrame()
    indeed_scraper = IndeedScraper(SearchAPI().session)

    ###
    # Figure out how many pages we want or pull max pages instead of manually adding pages
    ###
    cur_page = 0
    while cur_page <= pages:
        listing = indeed_scraper.get_search(job_title,location,cur_page*10)
        # Instead of concat update to push to db file
        if isinstance(listing,JobListing):
            dbHanlder.add_job(listing)
            #df = pd.concat([df,pd.DataFrame(listing.dict())],ignore_index=True)
            cur_page += 1
        else:
            print(f'[MAIN] Something went wrong with page : {cur_page}')
            print('[MAIN] Waiting 10 seconds and trying again')
            time.sleep(10)

    return df

SQLConfig = DataBaseSQLConfig(
    db_file = 'db.db',
    table_name = 'job_data',
    local_db_path = './data/db.db'
)

if __name__ == "__main__":
    dbHandler = DataBase(SQLConfig)
    dbHandler.create_table()

    print('[MAIN] Scraping Indeed')
    indeed_info = scrape_indeed('data engineer','mountain view',10,dbHandler)
    #indeed_info.to_excel('test.xlsx')
    print('[MAIN] Done Scraping Indeed')

    dbHandler.close()