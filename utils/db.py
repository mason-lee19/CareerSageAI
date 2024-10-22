from pydantic import BaseModel
import sqlite3
import hashlib
import datetime

class DataBaseSQLConfig(BaseModel):
    bucket_name:str
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
                pullDate TEXT,
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
        return hashlib.md5(job_link.encode()).hexdigest()
    
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
        job_key = self.generate_job_key(job_data.jobLink)
        if not self.job_exists(job_key):
            pull_date = datetime.now().strftime('%Y-%m-$d')
            self.cursor.execute(f'''
                INSERT INTO {self.config.table_name} (jobKey, jobLink, jobTitle, jobCompany, minSalary, maxSalary, jobDetails, jobLocation, pullDate)
                VALUES (? ? ? ? ? ? ? ? ?)
            ''',(job_key,job_data.jobLink,job_data.jobTitle,job_data.jobCompany,
                 job_data.minSalary,job_data.maxSalary,job_data.jobDetails,
                 job_data.jobLocation,pull_date))
            
            self.conn.commit()

        else:
            print(f'Job {job_data.jobTitle} already exists in the database')


    def close(self):
        """Close database connection."""
        self.conn.close()

    

    