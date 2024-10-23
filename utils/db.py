from pydantic import BaseModel
import sqlite3
import hashlib
from datetime import datetime

class DataBaseSQLConfig(BaseModel):
    db_file:str
    table_name:str
    local_db_path:str

class DataBase():
    def __init__(self,config):
        """
        Initialize the database connection and create table if it does not exists.
        Args:
            config (DataBaseSqlConfig): Sql file configuration details
        """
        print('[DB] Initializing db handler')
        self.config = config

        self.conn = sqlite3.connect(config.local_db_path)
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self):
        """Create the table_name table if it doesn't exist."""
        self.cursor.execute(f'''
            CREATE TABLE IF NOT EXISTS {self.config.table_name} (
                jobKey TEXT PRIMARY KEY,
                jobLink TEXT,
                jobTitle TEXT,
                jobCompany TEXT,
                minSalary TEXT,
                maxSalary TEXT,
                jobDetails TEXT,
                jobLocation TEXT,
                pullDate TEXT
            )
        ''')

        self.conn.commit()

    def generate_job_key(self,job_link: str) -> str:
        """
        Generate a unique job key using the jobLink as the basis.
        Args:
            job_link (str): The job link to hash.
        Returns:
            str: A unique job key identifier
        """
        job_bytes = job_link.encode('utf-8')

        sha256_hash = hashlib.sha256()
        sha256_hash.update(job_bytes)

        unique_key = sha256_hash.hexdigest()

        return unique_key
    
    def job_exists(self,job_key: str,) -> bool:
        """
        Check if a job with the given job key already exists in the database.
        Args:
            job_key (str): The unique key identifier for the job.
        Returns:
            bool: True if the job exists, False otherwise.
        """
        self.cursor.execute(f'SELECT 1 FROM {self.config.table_name} WHERE jobKey = ?',(job_key,))
        return self.cursor.fetchone() is not None
    
    def add_job(self,job_data):
        """
        Add job to the database if it doesn't exist already.
        Args:
            job_data (JobListing): Job data.
        """
        print('[DB] Inserting listing data to db table')
        for idx in range(len(job_data.jobLink)):
            job_key = self.generate_job_key(job_data.jobLink[idx])
            if not self.job_exists(job_key):
                pull_date = datetime.now().strftime('%Y-%m-%d')
                self.cursor.execute(f'''
                    INSERT INTO {self.config.table_name} (jobKey, jobLink, jobTitle, jobCompany, minSalary, maxSalary, jobDetails, jobLocation, pullDate)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''',(job_key, job_data.jobLink[idx], job_data.jobTitle[idx] ,job_data.jobCompany[idx],
                    job_data.minSalary[idx], job_data.maxSalary[idx], job_data.jobDetails[idx],
                    job_data.jobLocation[idx], pull_date))
                
                self.conn.commit()

            else:
                print(f'[DB] Job {job_data.jobTitle} already exists in the database')


    def close(self):
        """Close database connection."""
        print('[DB] Closing db connection')
        self.conn.close()

    

    