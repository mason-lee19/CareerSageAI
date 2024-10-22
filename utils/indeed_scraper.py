from curl_cffi import requests as cureq
from pydantic import BaseModel
from typing import List
from bs4 import BeautifulSoup
import re
import os
import time
import traceback

from .string_util import StringUtil

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
}

class JobListing(BaseModel):
    jobLink: List[str]
    jobTitle: List[str]
    jobCompany: List[str]
    minSalary: List[str]
    maxSalary: List[str]
    jobDetails: List[str]
    jobLocation: List[str]

class IndeedScraper:
    def __init__(self, session: cureq.Session):
        self.session = session

    def get_search(self, job_title:str, location:str, start_num:int):
        """
        Fetches job listings from Indeed based on job title, location, and start number.

        Args:
            job_title (str): The job title to search for.
            location (str): The location to search in.
            start_num (int): The pagination start number for results.

        Returns:
            JobListing: A JobListing object populated with the fetched job details.
        """
        try:
            print(f'[Indeed Scraper] Pulling Indeed Job Information for: {job_title} - {location} - page: {int(start_num//10)}')
            # Construct the search URL
            url = self._build_url(job_title, location, start_num)
            
            # Send the GET request
            response = self.session.get(url, headers=HEADERS)

            if response.status_code != 200:
                # Raise an error for bad HTTP responses
                response.raise_for_status()
                return response.status_code

            # Pull job details and return as JobListing object
            return JobListing(**self.pull_job_details(response))

        except Exception as e:
            print(f"[Indeed Scraper] Error fetching job listings: {e}")
            print('-'*20)
            traceback.print_exc()
            print('-'*20)
            return None

    def pull_job_details(self,resp):
        """
        Fetches job details from Indeed mosaic view

        Args:
            resp: url request response

        Returns:
            job_list (dict): Job detail dictionary to fill JobListing BaseModel
        """
        job_list = {'jobLink':[],'jobTitle':[],
                    'jobCompany':[],'minSalary':[],
                    'maxSalary':[],'jobDetails':[],'jobLocation':[]}

        if 'text/html' in resp.headers['Content-Type'] and resp.status_code == 200:
            soup = BeautifulSoup(resp.text, 'html.parser')

            outer_most_point=soup.find('div',attrs={'id': 'mosaic-provider-jobcards'})

            for job in outer_most_point.find('ul'):
                a = job.find('a')
                if not a:
                    continue

                job_link = self._get_indeed_url(a.get('href'))

                job_list['jobLink'].append(job_link)

                job_salary,job_description = self.pull_job_desc(job_link)
    
                min_salary, max_salary = self._get_clean_salary(job_salary)

                job_list['minSalary'].append(min_salary)
                job_list['maxSalary'].append(max_salary)
                job_list['jobDetails'].append(job_description)

                job_list['jobTitle'].append(
                    StringUtil.extract_text(job.find('span', id=lambda x: x and x.startswith('jobTitle-')))
                )
                job_list['jobCompany'].append(
                    StringUtil.extract_text(job.find('span', {'data-testid': 'company-name'}))
                )
                job_list['jobLocation'].append(
                    StringUtil.extract_text(job.find('div', {'data-testid': 'text-location'}))
                )

        return job_list

    def pull_job_desc(self,job_link:str) -> tuple:
        """
        Fetches the job salary and description from the given job link.

        Args:
            job_link (str): URL of the job posting.

        Returns:
            tuple: A tuple containing salary (str) and description (str).
        """
        resp = self.session.get(job_link,impersonate='chrome')

        if resp.status_code != 200:
            print(f'[Indeed Scraper] Something went wrong with job link : {job_link}')
            print(f'[Indeed Scraper] Waiting 10 seconds and trying again')
            time.sleep(10)
            resp = self.session.get(job_link,impersonate='chrome')

        salary = 'Not Specified'
        description = 'None'

        try:

            if 'text/html' in resp.headers['Content-Type'] and resp.status_code == 200:

                soup = BeautifulSoup(resp.text,'html.parser')
                job_container = soup.find('div',class_=re.compile(r'^fastviewjob'))

                if not job_container:
                    return 'Not Specified', 'None'
                
                # Extract salary info
                salary = self._extract_salary(job_container)

                # Extract job description
                description = self._extract_description(job_container)
                
            return salary,description
        
        except Exception as e:
            print(f'Job Link : {job_link}')
            print(f'Salary : {salary}')
            print(f'Desc : {description}')
            print(f'Something went wrong: {e}')
            
        return 'Not Specified', 'None'
    
    def _build_url(self, job_title: str, location: str, start_num: int) -> str:
        """
        Helper function to build the URL for the job search request.

        Args:
            job_title (str): The job title to search for.
            location (str): The location to search in.
            start_num (int): The pagination start number for results.

        Returns:
            str: The formatted search URL.
        """
        formatted_job_title = StringUtil.format_search(job_title)
        formatted_location = StringUtil.format_search(location)

        return f"https://www.indeed.com/jobs?q={formatted_job_title}&l={formatted_location},+CA&start={str(start_num)}"

    @staticmethod
    def _get_indeed_url(href):
        """Helper function to build full Indeed link from href"""
        return 'https://www.indeed.com' + href

    @staticmethod
    def _get_clean_salary(job_salary):
        """Helper function to split and clean salary into min and max."""
        if job_salary != 'Not Specified' and len(job_salary.split(' ')) > 2:
            min_salary = job_salary.split('-')[0].replace('$', '').strip()
            max_salary = job_salary.split('-')[1].split(' ')[1].replace('$', '').strip()
            return min_salary, max_salary
        return 'None', 'None'
    
    @staticmethod
    def _extract_salary(container: BeautifulSoup) -> str:
        """Helper function to extract the salary information from the job container."""
        raw_salary = container.find('div',attrs={'id':'salaryInfoAndJobType'})
        return raw_salary.get_text() if raw_salary else 'Not Specified'

    @staticmethod
    def _extract_description(container: BeautifulSoup) -> str:
        """Helper function to extract the job description from the job container."""
        raw_description = container.find('div', attrs={'id':'jobDescriptionText'})
        return raw_description.get_text().replace('\n', '') if raw_description else 'None'
