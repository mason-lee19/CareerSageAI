"""Used for development, vectorizer will take sql db data and convert it into a local vectorized database for API use"""

import sqlite3
import json
import ollama
from langchain.docstore.document import Document
from langchain.embeddings.base import Embeddings
from langchain.vectorstores import FAISS


class OllamaEmbeddings(Embeddings):
    def __init__(self, model="mxbai-embed-large"):
        self.model = model

    def embed_documents(self, texts):
        return [self.embed_query(text) for text in texts]

    def embed_query(self, text):
        response = ollama.embeddings(
            model=self.model, prompt=text.replace("\u00a0", " ")
        )
        return response["embedding"]


def appendSalary(min_salary, max_salary):
    if not min_salary and not max_salary:
        return None

    return f"${min_salary}-${max_salary}"


def combinedDescReq(desc, req):
    if not req and not desc:
        return None

    if not req:
        return desc

    for r in req:
        desc += str(r)

    return desc


db_name = "./data/db.db"
job_table_name = "job_data"
job_desc_name = "ai_desc_data_v4"

conn = sqlite3.connect(db_name)
cursor = conn.cursor()

# cursor.execute(f"""
#    SELECT jobLink,jobTitle,jobCompany,minSalary,maxSalary,jobDetails,jobLocation,pullDate
#    FROM {table_name}
# """)
cursor.execute(f"""
    SELECT j.jobLink, j.jobTitle, j.jobCompany, j.minSalary, j.maxSalary, j.jobLocation, j.pullDate, 
                d.employment_type, d.is_remote, d.yrs_exp, d.job_desc, d.requirements, d.company_desc
    FROM {job_table_name} AS j 
    JOIN {job_desc_name} AS d 
    ON j.jobKey = d.job_key
""")

rows = cursor.fetchall()

conn.close()

print(f"Rows Fetched : {len(rows)}")

documents = [
    Document(
        page_content=combinedDescReq(job[10], job[11]),
        metadata={
            "url": job[0],
            "title": job[1],
            "company": job[2],
            "salary": appendSalary(job[3], job[4]),
            "location": job[5],
            "pullDate": job[6],
            "employmentType": job[7],
            "remoteStatus": job[8],
            "yrsExp": job[9],
            "jobDesc": job[10],
            "req": job[11],
            "compDesc": job[12],
        },
    )
    for job in rows
]

print("Embedding documents")

embeddings = OllamaEmbeddings()
vector_db = FAISS.from_documents(documents, embeddings)
vector_db.save_local("./data/vector_store")


print("Creating index_to_id.json")

index_to_id = {idx: uuid for idx, uuid in enumerate(vector_db.docstore._dict.keys())}

with open("./data/index_to_id.json", "w") as f:
    json.dump(index_to_id, f)

print("FAISS index created and saved.")
