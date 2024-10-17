from utils import DataBase, IndeedScraper, SearchAPI
import pandas as pd
from curl_cffi import requests as cureq

def scrape_indeed( job_title:str,location:str,pages:int):
    """
    Iterates through indeed job board based on job title, location  and pulls relevent information to push to db file.

        Args:
            session (cureq.Session): curl_cffi request session
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
    for page in range(0,pages):
        listing = indeed_scraper.get_search(job_title,location,page*10)
        # Instead of concat update to push to db file
        df = pd.concat([df,pd.DataFrame(listing.dict())],ignore_index=True)

    return df

if __name__ == "__main__":
    print('Scraping Indeed')
    indeed_info = scrape_indeed('data engineer','mountain view',2)
    indeed_info.to_excel('test.xlsx')
    print('Done Scraping Indeed')