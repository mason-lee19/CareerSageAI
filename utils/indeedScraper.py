from curl_cffi import requests as cureq
from pydantic import BaseModel
from typing import List
from bs4 import BeautifulSoup
import re

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

class IndeedScraper:
    def __init__(self, session: cureq.Session):
        self.session = session

    def get_search(self, job_title:str, location:str, start_num:int):
        url = f"https://www.indeed.com/jobs?q={self.format_search(job_title)}&l={self.format_search(location)}%2C++CA&start={str(start_num)}"
        resp = self.session.get(url,headers=HEADERS)

        resp.raise_for_status()

        return JobListing(**self.pull_job_details(resp))

    def format_search(self,search:str):
        return search.replace(' ','+')
    
    def pull_job_details(self,resp):
        job_list = {'jobLink':[],'jobTitle':[],'jobCompany':[],'minSalary':[],'maxSalary':[],'jobDetails':[]}

        if 'text/html' in resp.headers['Content-Type'] and resp.status_code == 200:
            soup = BeautifulSoup(resp.text, 'html.parser')

            outer_most_point=soup.find('div',attrs={'id': 'mosaic-provider-jobcards'})

            for i in outer_most_point.find('ul'):
                a = i.find('a')
                if not a:
                    continue

                href_link = a.get('href')
                job_list['jobLink'].append(href_link)

                job_link = 'https://www.indeed.com' + href_link
                job_salary,job_description = self.pull_job_desc(job_link)
    
                if job_salary != 'Not Specified' and len(job_salary.split(' ')) > 2:
                    job_list['minSalary'].append(job_salary.split('-')[0].replace('$',''))
                    job_list['maxSalary'].append(job_salary.split('-')[1].split(' ')[1].replace('$',''))
                else:
                    job_list['minSalary'].append('None')
                    job_list['maxSalary'].append('None')

                job_list['jobDetails'].append(job_description)

                raw_title = i.find('span',id=lambda x: x and x.startswith('jobTitle-'))
                if raw_title:
                    job_list['jobTitle'].append(raw_title.get_text())
                else:
                    job_list['jobTitle'].append('None')

                raw_company = i.find('span',{'data-testid':'company-name'})
                if raw_company:
                    job_list['jobCompany'].append(raw_company.get_text())
                else:
                    job_list['jobCompany'].append('None')

        return job_list
    
    def pull_job_desc(job_link):
        resp = cureq.get(job_link,impersonate='chrome')

        if 'text/html' in resp.headers['Content-Type'] and resp.status_code == 200:

            soup = BeautifulSoup(resp.text,'html.parser')
            outer_most_points = soup.find('div',class_=re.compile(r'^fastviewjob'))

            raw_salary = outer_most_points.find('div',attrs={'id':'salaryInfoAndJobType'})
            salary = 'Not Specified'
            
            if raw_salary:
                salary = raw_salary.get_text()
            
            raw_description = outer_most_points.find('div',attrs={'id':'jobDescriptionText'})
            description = 'None'
            
            if raw_description:
                description = raw_description.get_text().replace('\n','')
            
        return salary,description
