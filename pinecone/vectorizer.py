"""Used for development, vectorizer will take sql db data and convert it into a local vectorized database for API use
"""
import sqlite3
import ollama
from langchain.docstore.document import Document
from langchain.embeddings.base import Embeddings
from langchain.vectorstores import FAISS

class OllamaEmbeddings(Embeddings):
    def __init__(self,model="mxbai-embed-large"):
        self.model=model

    def embed_documents(self,texts):
        return [self.embed_query(text) for text in texts]
    
    def embed_query(self,text):
        response = ollama.embeddings(model=self.model,prompt=text.replace(u'\u00a0',u' '))
        return response["embedding"]

def appendSalary(min_salary,max_salary):
    if not min_salary and not max_salary:
        return None

    return f"${min_salary}-${max_salary}"

db_name = "./data/db.db"
table_name = "job_data"

conn = sqlite3.connect(db_name)
cursor = conn.cursor()

cursor.execute(f"""
    SELECT jobLink,jobTitle,jobCompany,minSalary,maxSalary,jobDetails,jobLocation,pullDate
    FROM {table_name}
""")

rows = cursor.fetchall()

conn.close()

print(f"Rows Fetched : {len(rows)}")

documents = [
    Document(
        page_content = job[5],
        metadata = {
            "url":job[0],
            "title":job[1],
            "company":job[2],
            "salary":appendSalary(job[3],job[4]),
            "details":job[5],
            "location":job[6],
            "pullDate":job[7]}
    )
    for job in rows
]

print(f"Embedding documents")

embeddings = OllamaEmbeddings()
vector_db = FAISS.from_documents(documents,embeddings)
vector_db.save_local("./data/vector_store")


print(f"Creating index_to_id.json")

index_to_id = {idx:uuid for idx, uuid in enumerate(vector_db.docstore._dict.keys())}

import json
with open("./data/index_to_id.json","w") as f:
    json.dump(index_to_id,f)

print("FAISS index created and saved.")
    