from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import numpy as np
import json

from utils.embedding import OllamaEmbeddings
from langchain.vectorstores import FAISS

embeddings = OllamaEmbeddings()
vector_db = FAISS.load_local("./data/vector_store",embeddings,allow_dangerous_deserialization=True)
with open("./data/index_to_id.json","r") as f:
    index_to_id = json.load(f)

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
    try:
        query = request.query
        query_embedding = embeddings.embed_query(query)
        
        #results = vector_db.similarity_search_by_vector(query_embedding, request.k)
        distances, indices = vector_db.index.search(np.array([query_embedding]),request.k)

        scores = 1 / (1 + distances[0])
        scores = [round(float(score)*100,4) for score in scores]

        doc_uuids = [index_to_id[str(index)] for index in indices[0]]
        jobs = [vector_db.docstore._dict[uuid].metadata for uuid in doc_uuids]

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
    except Exception as e:
        print(f"An error occured: {e}")
        raise HTTPException(status_code=500,detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1",port=8000)