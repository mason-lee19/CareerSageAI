from pydantic import BaseModel
import sqlite3
import hashlib
from datetime import datetime
from .logger_config import logger


class DataBaseSQLConfig(BaseModel):
    db_file: str
    table_name: str
    local_db_path: str


class DataBase:
    def __init__(self, config):
        """
        Initialize the database connection and create table if it does not exists.
        Args:
            config (DataBaseSqlConfig): Sql file configuration details
        """
        print("[DB] Initializing db handler")
        self.config = config

        self.conn = sqlite3.connect(config.local_db_path)
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self) -> None:
        """Create the table_name table if it doesn't exist."""
        self.cursor.execute(f"""
            CREATE TABLE IF NOT EXISTS {self.config.table_name} (
                jobKey TEXT PRIMARY KEY,
                jobLink TEXT,
                jobTitle TEXT,
                jobCompany TEXT,
                minSalary INTEGER,
                maxSalary INTEGER,
                salaryUnit TEXT,
                jobDetails TEXT,
                jobLocation TEXT,
                pullDate TEXT
            )
        """)

        self.conn.commit()

    def _generate_job_key(self, job_link: str) -> str:
        """
        Generate a unique job key using the jobLink as the basis.
        Args:
            job_link (str): The job link to hash.
        Returns:
            str: A unique job key identifier
        """
        job_bytes = job_link.encode("utf-8")

        sha256_hash = hashlib.sha256()
        sha256_hash.update(job_bytes)

        unique_key = sha256_hash.hexdigest()

        return unique_key

    def _job_exists(
        self,
        job_key: str,
    ) -> bool:
        """
        Check if a job with the given job key already exists in the database.
        Args:
            job_key (str): The unique key identifier for the job.
        Returns:
            bool: True if the job exists, False otherwise.
        """
        self.cursor.execute(
            f"SELECT 1 FROM {self.config.table_name} WHERE jobKey = ?", (job_key,)
        )
        return self.cursor.fetchone() is not None

    def add_job(self, job_data) -> None:
        """
        Add job to the database if it doesn't exist already.
        Args:
            job_data (JobListing): Job data.
        """
        print("[DB] Inserting listing data to db table")
        for idx in range(len(job_data.jobLink)):
            job_key = self._generate_job_key(job_data.jobLink[idx])
            if job_data.expirationStatus[idx]:
                logger.info(
                    f"[DB] Job has expired removing/skipping {job_data.jobTitle} - {job_data.jobCompany}"
                )
                if self._job_exists(job_key):
                    self._remove_job(job_key)
                continue
            if not self._job_exists(job_key):
                pull_date = datetime.now().strftime("%Y-%m-%d")
                self.cursor.execute(
                    f"""
                    INSERT INTO {self.config.table_name} (jobKey,jobLink,jobTitle,jobCompany,minSalary,maxSalary,salaryUnit,jobDetails,jobLocation,pullDate)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                    (
                        job_key,
                        job_data.jobLink[idx],
                        job_data.jobTitle[idx],
                        job_data.jobCompany[idx],
                        job_data.minSalary[idx],
                        job_data.maxSalary[idx],
                        job_data.salaryUnit[idx],
                        job_data.jobDetails[idx],
                        job_data.jobLocation[idx],
                        pull_date,
                    ),
                )

                self.conn.commit()

            else:
                logger.info(
                    f"[DB] Job {job_data.jobTitle} already exists in the database"
                )

    def _remove_job(self, job_key: str) -> None:
        """
        Remove job from database if it exists and has an expired job message.
        Args:
            job_key (str): Job Key
        """
        query = f"DELETE FROM {self.config.table_name} WHERE {job_key} = ?"
        self.cursor.execute(query, (job_key,))

        self.conn.commit()

    def close(self) -> None:
        """Close database connection."""
        print("[DB] Closing db connection")
        logger.info("[DB] Clsoing db connection")
        self.conn.close()
