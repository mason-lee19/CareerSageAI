from langchain.embeddings.base import Embeddings
import ollama
import numpy as np

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