from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from langchain.vectorstores import FAISS
from langchain.embeddings.base import Embeddings
import ollama
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class OllamaEmbeddings(Embeddings):
    def __init__(self,model="mxbai-embed-large"):
        self.model=model

    def embed_documents(self,texts):
        return [self.embed_query(text) for text in texts]
    
    def embed_query(self,text:str):
        if isinstance(text, np.ndarray):
            text = str(text) 
        response = ollama.embeddings(model=self.model,prompt=text.replace(u'\u00a0',u' '))
        embedding = response["embedding"]

        return np.array(embedding)

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
    k:int = 100

@app.post("/search_jobs/")
async def search_job_api(request: JobQueryRequest,
                         page:int = 1,
                         limit:int = 10):
    """Search FAISS using a query and return results"""
    query = request.query
    query_embeddings = embeddings.embed_query(query)
    
    results = vector_db.similarity_search_by_vector(query_embeddings, request.k)

    jobs = [job.metadata for job in results]

    scores = []
    for job in results:
        job_embeddings = embeddings.embed_query(job.page_content)
        similarity_score = cosine_similarity([query_embeddings], [job_embeddings])[0][0]
        scores.append(similarity_score)

    start_index = (page-1) * limit
    end_index = start_index + limit

    paginated_jobs = jobs[start_index:end_index]
    paginated_scores = scores[start_index:end_index]
    
    return {"page":page,
            "limit":limit,
            "total_results": len(jobs),
            "results": [
                {"metadata": job, "score": score} 
                for job, score in zip(paginated_jobs, paginated_scores)
            ]}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1",port=8000)