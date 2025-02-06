from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from langchain.vectorstores import FAISS
from langchain.embeddings.base import Embeddings
import ollama

class OllamaEmbeddings(Embeddings):
    def __init__(self,model="mxbai-embed-large"):
        self.model=model

    def embed_documents(self,texts):
        return [self.embed_query(text) for text in texts]
    
    def embed_query(self,text):
        response = ollama.embeddings(model=self.model,prompt=text.replace(u'\u00a0',u' '))
        return response["embedding"]

embeddings = OllamaEmbeddings()
vector_db = FAISS.load_local("./data/vector_store",embeddings,allow_dangerous_deserialization=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class JobQueryRequest(BaseModel):
    query:str
    k:int = 3

@app.post("/search_jobs/")
async def search_job_api(request: JobQueryRequest):
    """Search FAISS using a query and return results"""
    query_embeddings = embeddings.embed_query(request.query)
    results = vector_db.similarity_search_by_vector(query_embeddings,request.k)
    
    return {"results": [job.metadata for job in results]}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1",port=8000)