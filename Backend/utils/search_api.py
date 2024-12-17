from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from .logger_config import logger
import os

INTEL_DRIVER_PATH = './utils/chromedriverX64'
MAC_DRIVER_PATH = './utils/chromedriverArm64'

class SearchAPI():
    def __init__(self):
        """Initialize the SearchAPI class and create a curl_cffi session."""
        self.driver = self._create_driver()

    def _create_driver(self):
        """Creates and returns a curl_cffi session using the specified proxy."""
        try:
            service = Service(INTEL_DRIVER_PATH)
        except:
            service = Service(MAC_DRIVER_PATH) 
        
        return webdriver.Chrome(service=service)

        
