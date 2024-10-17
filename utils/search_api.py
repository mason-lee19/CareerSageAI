from curl_cffi import requests as cureq
import os

class SearchAPI():
    def __init__(self):
        """Initialize the SearchAPI class and create a curl_cffi session."""
        self.session = self._create_session()

    def _create_session(self):
        """Creates and returns a curl_cffi session using the specified proxy."""
        proxy=os.getenv("stickyproxy")
        return cureq.Session(impersonate="chrome",proxy=proxy)

        
