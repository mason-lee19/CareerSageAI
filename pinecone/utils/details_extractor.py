from langchain_ollama import OllamaLLM
from typing import Optional
from pydantic import BaseModel
import json
import re
import requests
from dotenv import load_dotenv
import os

load_dotenv()

BASE_API_URL = os.getenv("LOCAL_OLLAMA_API_URL")
API_URL = BASE_API_URL + "/api/generate"

class ExtractedSections(BaseModel):
    employment_type: str
    is_remote: bool
    yrs_exp: Optional[str] = None
    job_desc: str
    requirements: str
    company_desc: Optional[str] = None

class JobDetailsExtractor:
    def __init__(self,job_details):
        self.job_details = self._preprocess_text(job_details)
        self.job_data = self._extract_job_details()

    def extract(self) -> ExtractedSections:
        return ExtractedSections(
            employment_type=self._extract_employment_type(),
            is_remote=self._is_remote(),
            yrs_exp=self.job_data.get("experience",""),
            job_desc=self.job_data.get("job_description", ""),
            requirements=json.dumps(self.job_data.get("requirements", [])),
            company_desc=self.job_data.get("company_description", None)
        )
    
    def _preprocess_text(self,text: str) -> str:
        return re.sub(r'\s+', ' ', text).strip()
    
    def _check_bool(self,value) -> bool:
        return value if isinstance(value, bool) else 0
    
    def _extract_employment_type(self) -> str:
        job_types = ["full[- ]?time", "part[- ]?time", "contract", "temporary", "freelance"]
        match = re.search("|".join(job_types), self.job_details, re.IGNORECASE)
        return match.group(0).capitalize() if match else "Full-time"
    
    def _is_remote(self) -> bool:
        remote_keywords = ["remote", "work from home", "telecommute", "virtual"]
        return bool(re.search("|".join(remote_keywords), self.job_details, re.IGNORECASE))

    def _create_prompt(self) -> str:
        return f"""
            You are a helpful assistant that extracts structured information from job postings. Below is a job posting from Indeed:

            {self.job_details}

            Extract the following information in JSON format:
            - "job_description": A reworded and slightly summarized version of the full job description. Include all responsibilities, required skills, and key tasks. If the job description is not clearly labeled, infer it from any relevant sections, such as role expectations, day-to-day activities, or skill requirements. Avoid leaving this field blank unless absolutely no relevant information is present. Avoid exact wording.
            - "requirements": A rephrased list of job requirements, maintaining the meaning but avoiding exact wording.
            - "experience": A string with the minimum years of experience required for this job, formatted like "3 Years" or "1 Year".
            - "company_description": A summarized and reworded version of the company description, if available.

            Maintain accuracy while avoiding direct copying of phrases from the original text. The rephrasing should provide the same essential information in a fresh and unique way.

            Return the output in the following JSON format:
            {{
                "job_description": "...",
                "requirements": ["...", "..."],
                "experience": "...",
                "company_description": "..."
            }}

            Do not return anything else but the data in JSON format.
            """

    def _ask_ollama(self, prompt: str) -> str:
        #model = OllamaLLM(model="llama3.2")
        #return model.invoke(prompt)
        payload = {
            "model":"llama3.2",
            "prompt": prompt,
            "stream": False,
            "options" : {
                "num_ctx": 4096,
            },
        }

        response = requests.post(API_URL,json=payload)

        if response.status_code != 200:
            print(f"Error {response.status_code} : {response.text}")
            return None
        
        response_data = response.json()
        
        return response_data['response']

    def _parse_llm_response(self, response: str) -> dict:
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return {}

    def _extract_job_details(self) -> dict:
        prompt = self._create_prompt()
        response = self._ask_ollama(prompt)
        return self._parse_llm_response(response)