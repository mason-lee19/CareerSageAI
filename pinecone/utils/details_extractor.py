from langchain_ollama import OllamaLLM
from pydantic import BaseModel
import json
import re

class ExtractedSections(BaseModel):
    job_type: str
    is_remote: bool
    yrs_exp: int
    job_desc: str
    requirements: str
    company_desc: str = None

class JobDetailsExtractor:
    def __init__(self,job_details):
        self.job_details = self._preprocess_text(job_details)
        self.job_data = self._extract_job_details()

    def extract(self) -> ExtractedSections:
        return ExtractedSections(
            job_type=self._extract_job_type(),
            is_remote=self._is_remote(),
            yrs_exp=self._extract_max_years_experience(),
            job_desc=self.job_data.get("job_description", ""),
            requirements=json.dumps(self.job_data.get("requirements", [])),
            company_desc=self.job_data.get("company_description", "")
        )

    def _preprocess_text(self, text: str) -> str:
        return re.sub(r'\s+', ' ', text).strip()

    def _extract_job_type(self) -> str:
        job_types = ["full[- ]?time", "part[- ]?time", "contract", "temporary", "internship", "freelance"]
        match = re.search("|".join(job_types), self.job_details, re.IGNORECASE)
        return match.group(0).capitalize() if match else "Not specified"

    def _is_remote(self) -> bool:
        remote_keywords = ["remote", "work from home", "telecommute", "virtual"]
        return bool(re.search("|".join(remote_keywords), self.job_details, re.IGNORECASE))

    def _extract_max_years_experience(self) -> int:
        patterns = [
            r'(\d{1,2})\+?\s*(?:years|yrs)\s*of\s*experience',
            r'(\d{1,2})-(\d{1,2})\s*(?:years|yrs)',
            r'at least\s*(\d{1,2})\s*(?:years|yrs)'
        ]
        years = [int(y) for pattern in patterns for match in re.findall(pattern, self.job_details, re.IGNORECASE) 
                 for y in (match if isinstance(match, tuple) else [match])]
        return max(years) if years else None

    def _create_prompt(self) -> str:
        return f"""
        You are a helpful assistant that extracts structured information from job postings. 
        Below is a job posting from Indeed:

        {self.job_details}

        Extract the following information in JSON format:
        - "job_description": The full text of the job description, including all responsibilities and skills needed.
        - "requirements": A list of job requirements exactly as listed.
        - "company_description": The full text of the company description (if available).

        Maintain the wording and details as presented. You can summarize lightly.

        Return the output in the following JSON format:
        {{
            "job_description": "...",
            "requirements": ["...", "..."],
            "company_description": "..."
        }}

        Do not return anything else but the data in JSON format.
        """

    def _ask_ollama(self, prompt: str) -> str:
        model = OllamaLLM(model="llama3.2")
        return model.invoke(prompt)

    def _parse_llm_response(self, response: str) -> dict:
        try:
            return json.loads(response)
        except json.JSONDecodeError:
            return {}

    def _extract_job_details(self) -> dict:
        prompt = self._create_prompt()
        response = self._ask_ollama(prompt)
        return self._parse_llm_response(response)