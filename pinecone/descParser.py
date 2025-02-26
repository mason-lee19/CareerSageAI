"""Used for development, descParser will take descriptions and break down into parts for website.
"""
import sqlite3
from tqdm import tqdm

from utils.details_extractor import JobDetailsExtractor

def create_table(cursor,table_name):

    cursor.execute('''
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name=?
    ''', (table_name,))
    table_exists = cursor.fetchone()
    
    if not table_exists:
        cursor.execute(f'''
            CREATE TABLE IF NOT EXISTS {table_name} (
                job_key TEXT,
                employment_type TEXT,
                is_remote BOOLEAN,
                yrs_exp TEXT,
                job_desc TEXT,
                requirements TEXT,
                company_desc TEXT,
                FOREIGN KEY (job_key) REFERENCES job_data(job_key)
            )
        ''')
        conn.commit()
        print(f"Table {table_name} created.")
    else:
        print(f"Table {table_name} already exists. Skipping creation.")

def insert_job_details(cursor,table_name,job_key,extracted_sections):

    cursor.execute(f'''
        INSERT INTO {table_name} (
            job_key,
            employment_type, 
            is_remote, 
            yrs_exp, 
            job_desc, 
            requirements, 
            company_desc
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (
        job_key,
        extracted_sections.employment_type,
        extracted_sections.is_remote,
        extracted_sections.yrs_exp,
        extracted_sections.job_desc,
        extracted_sections.requirements,
        extracted_sections.company_desc
    ))
    
    conn.commit()


db_name = "./data/db.db"
table_name = "job_data"

conn = sqlite3.connect(db_name)
cursor = conn.cursor()

cursor.execute(f"""
    SELECT jobKey, jobDetails
    FROM {table_name}
""")

rows = cursor.fetchall()

#desc_table_name = "ai_desc_data_v3"
desc_table_name = "ai_desc_data_v4"

create_table(cursor,desc_table_name)

for job in tqdm(rows,desc="Processing Job Postings"):
    job_key = job[0]
    job_details = job[1]

    cursor.execute(f'''
        SELECT 1 FROM {desc_table_name} WHERE job_key = ?
    ''', (job_key,))
    exists = cursor.fetchone()

    if exists:
        print("Job key already exists... skipping...")
        continue

    extractor = JobDetailsExtractor(job_details)
    try:
        extracted_sections = extractor.extract()
        insert_job_details(cursor,desc_table_name,job_key,extracted_sections)

    except Exception as e:
        print(f"Failed to extract information from this job : {e}")
        print(f"***********{job_key} Job Details**************")
        print(job_details)

    

conn.close()

