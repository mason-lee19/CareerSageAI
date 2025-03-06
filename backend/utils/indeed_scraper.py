from pydantic import BaseModel
from typing import List
from bs4 import BeautifulSoup
import json
import os
import re

from .string_util import StringUtil
from .logger_config import logger, log_and_print
from .search_api import SearchAPI

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
}


class JobListing(BaseModel):
    jobLink: List[str]
    jobTitle: List[str]
    jobCompany: List[str]
    minSalary: List[int]
    maxSalary: List[int]
    salaryUnit: List[str]
    jobDetails: List[str]
    jobLocation: List[str]
    expirationStatus: List[bool]


class IndeedScraper:
    def __init__(self, mode="online", folder_path=None):
        """
        Intializes scraper tool to pull job links from main indeed mosaic and info from individual job links

        Args:
            mode (online/offline): online pulls from online urls, offline is for testing with html from ../PageTests folder
            folder_path (str): If offline use to define PageTests folder to use saved html pages
        """
        self.mode = mode

        # Setup pulling from PageTests folder for html code instead of url
        if self.mode == "offline":
            self.folder_path = folder_path
            self.mosaic_page = folder_path + "/jobmosaic.html"
            self.job_links = self._collect_file_paths(folder_path)

        elif self.mode == "online":
            self.search = SearchAPI()

    def get_search(
        self, job_title: str = None, location: str = None, start_num: int = None
    ):
        """
        Fetches job listings from Indeed based on job title, location, and start number.

        Args:
            job_title (str): The job title to search for.
            location (str): The location to search in.
            start_num (int): The pagination start number for results.

        Returns:
            JobListing: A JobListing object populated with the fetched job details.
        """
        if self.mode == "online":
            log_and_print(
                f"[Indeed Scraper] Pulling Indeed Job Information for: {job_title} - {location} - page: {int(start_num // 10)}"
            )

            # Construct the search URL
            url = self._build_url(job_title, location, start_num)
            logger.info(
                f"[Indeed Scraper] Pulling Indeed Job Information for: {job_title} - {location} - page: {int(start_num // 10)}"
            )
            logger.info(f"url: {url}")

            # Send the GET request
            response = self.search.get_html(url)

            if not response:
                # Raise an error for bad HTTP responses
                logger.error(f"[Indeed Scraper] unable to get response : {response}")

                return None

            # Pull job details and return as JobListing object
            job_details = self.pull_job_details(response)
            return JobListing(**job_details)

        else:
            log_and_print(
                f"[Indeed Scraper] Pulling Indeed job information from {self.folder_path}"
            )

            with open(self.mosaic_page, "r", encoding="utf-8") as file:
                mosaic_html_content = file.read()

            job_details = self.pull_job_details(mosaic_html_content)

            return JobListing(**job_details)

    def pull_job_details(self, resp):
        """
        Fetches job details from Indeed mosaic view

        Args:
            resp: url request response

        Returns:
            job_list (dict): Job detail dictionary to fill JobListing BaseModel
        """
        job_list = {
            "jobLink": [],
            "jobTitle": [],
            "jobCompany": [],
            "minSalary": [],
            "maxSalary": [],
            "salaryUnit": [],
            "jobDetails": [],
            "jobLocation": [],
            "expirationStatus": [],
        }

        if self.mode == "online" and resp:
            soup = BeautifulSoup(resp, "html.parser")

            outer_most_point = soup.find(
                "div", attrs={"id": "mosaic-provider-jobcards"}
            )

            if outer_most_point:
                for job in outer_most_point.find("ul"):
                    job_list = self._process_job_element(job, job_list)

        elif self.mode == "offline":
            soup = BeautifulSoup(resp, "html.parser")

            outer_most_point = soup.find(
                "div", attrs={"id": "mosaic-provider-jobcards"}
            )

            job_idx = 0

            if outer_most_point:
                for job in outer_most_point.find("ul"):
                    a = job.find("a")
                    if not a:
                        continue
                    # print(self._get_indeed_url(a.get('href')))
                    # Only iterate through the pages that we have saved in page tests folder

                    if job_idx + 1 > len(self.job_links):
                        break

                    with open(self.job_links[job_idx], "r", encoding="utf-8") as file:
                        cur_job_html = file.read()

                    job_list_len = len(job_list["jobLink"])

                    job_list = self._process_job_element(job, job_list, cur_job_html)

                    if job_list_len < len((job_list["jobLink"])):
                        job_idx += 1

        else:
            logger.error(
                f"[Indeed Scraper] Invalid mode or no response provided for online mode... mode = {self.mode}"
            )

        return job_list

    def _process_job_element(self, job, job_list, job_html=None) -> dict:
        """
        Processes an individual job element and appends details to the job_list.

        Args:
            job: The job HTML element.
            job_list: The dictionary to store job details.

        Return:
            job_list: Updated job_list dictionary
        """
        a = job.find("a")

        if not a:
            return job_list

        job_link = self._get_indeed_url(a.get("href"))

        # Check if job link is an ad
        if "rc" not in set(job_link.split("/")):
            logger.error(f"Bad url found skipping: {job_link}")
            return job_list

        if self.mode == "online":
            job_resp = self.search.get_html(job_link)

            if not job_resp:
                log_and_print(
                    f"[Indeed Scraper] Error with individual job link : {job_link}"
                )
            else:
                job_salary_info, job_description = self.pull_job_desc_salary(job_resp)
                expiration = self._check_expired_job(job_resp)

        elif self.mode == "offline":
            job_salary_info, job_description = self.pull_job_desc_salary(job_html)
            expiration = self._check_expired_job(job_html)

        min_salary, max_salary, salary_unit = (
            job_salary_info[0],
            job_salary_info[1],
            job_salary_info[2],
        )

        job_list["jobLink"].append(job_link)

        job_list["minSalary"].append(min_salary)
        job_list["maxSalary"].append(max_salary)
        job_list["salaryUnit"].append(salary_unit)
        job_list["jobDetails"].append(job_description)

        job_list["jobTitle"].append(
            StringUtil.extract_text(
                job.find("span", id=lambda x: x and x.startswith("jobTitle-"))
            )
        )
        job_list["jobCompany"].append(
            StringUtil.extract_text(job.find("span", {"data-testid": "company-name"}))
        )
        job_list["jobLocation"].append(
            StringUtil.extract_text(job.find("div", {"data-testid": "text-location"}))
        )

        job_list["expirationStatus"].append(expiration)

        return job_list

    def pull_job_desc_salary(self, job_resp) -> tuple:
        """
        Fetches the job salary and description from the given job link.

        Args:
            job_resp : Returned html response from individual job page.

        Returns:
            tuple: A tuple containing salary (str) and description (str).
        """
        salary_info = (None, None, None)
        description = None

        try:
            soup = BeautifulSoup(job_resp, "html.parser")
            salary_container = soup.find("script", type="application/ld+json")
            desc_container = soup.find("div", class_=re.compile(r"^fastviewjob"))

            if not salary_container and desc_container:
                return salary_info, description

            # Extract salary info
            salary_info = self._extract_salary(salary_container)

            # Extract job description
            description = self._extract_description(desc_container)

        except Exception as e:
            print("[Indeed Scraper] Error getting salary and job description")
            logger.error(f"""[Indeed Scraper] Error getting salary and job description
                         Salary Info : {salary_info}
                         Desc : {description}
                         Error : {e}""")

        return salary_info, description

    def _collect_file_paths(self, folder_path):
        """
        Iterates through a folder and collects all file paths into an array.

        Args:
            folder_path (str): The path to the folder.

        Returns:
            list: A list containing the full paths of all files in the folder.
        """
        file_paths = []

        for root, _, files in os.walk(folder_path):
            for file in files:
                # Skip the main mosaic page to just collect individual job links for description and salary
                if file == "jobmosaic.html":
                    continue
                full_path = os.path.join(root, file)
                file_paths.append(full_path)

        return file_paths

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

        return f"https://www.indeed.com/jobs?q={formatted_job_title}&l={formatted_location}+CA&start={str(start_num)}"

    def _check_expired_job(self, resp) -> bool:
        """Search for any div with relevant text indicating expiration"""

        if resp:
            soup = BeautifulSoup(resp, "html.parser")

            # Search for any div with relevant text indicating expiration
            expired_message = soup.find(
                lambda tag: tag.name == "div"
                and "This job has expired on Indeed" in tag.get_text()
            )

            if expired_message:
                return True
            return False
        else:
            logger.error("Unable to retrieve individual job url")
            return False

    @staticmethod
    def _get_indeed_url(href):
        """Helper function to build full Indeed link from href"""
        return "https://www.indeed.com" + href

    @staticmethod
    def _get_clean_salary(job_salary):
        """Helper function to split and clean salary into min and max."""
        if job_salary != "Not Specified" and len(job_salary.split(" ")) > 2:
            min_salary = job_salary.split("-")[0].replace("$", "").strip()
            max_salary = job_salary.split("-")[1].split(" ")[1].replace("$", "").strip()
            return min_salary, max_salary
        return "None", "None"

    @staticmethod
    def _extract_salary(container: BeautifulSoup) -> str:
        """Helper function to extract the salary information from the job container."""
        salary_data = json.loads(container.string)
        base_salary = salary_data.get("baseSalary", {}).get("value", {})

        min_salary = base_salary.get("minValue")
        max_salary = base_salary.get("maxValue")
        salary_unit = base_salary.get("unitText")

        return (
            (int(min_salary), int(max_salary), str(salary_unit))
            if base_salary
            else (None, None, None)
        )

    @staticmethod
    def _extract_description(container: BeautifulSoup) -> str:
        """Helper function to extract the job description from the job container."""
        raw_description = container.find("div", attrs={"id": "jobDescriptionText"})
        return (
            raw_description.get_text().replace("\n", "") if raw_description else "None"
        )
