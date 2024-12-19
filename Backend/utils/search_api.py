from zenrows import ZenRowsClient
import os

INTEL_DRIVER_PATH = './utils/chromedriverX64'
MAC_DRIVER_PATH = './utils/chromedriverArm64'

class SearchAPI():
    def __init__(self):
        """Initialize the SearchAPI class and create a curl_cffi session."""      
        self.driver = self._create_driver()

    def _create_driver(self):
        """Creates and returns a curl_cffi session using the specified proxy."""
        return ZenRowsClient(os.getenv("ZEN_ROWS_API_KEY"))
    
    def get_html(self,url:str):
        resp = self.driver.get(url,params={"js_render":"true"})

        return resp.text
 
        
