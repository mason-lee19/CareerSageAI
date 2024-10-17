from curl_cffi import requests as cureq
import os

class SearchAPI():
    def __init__(self):
        session = self.get_session()

        return session

    def get_session(self):
        """Helper function to return curl_cffi session"""
        return cureq.Session(impersonate="chrome", proxy=os.getenv("stickyproxy"))
        
