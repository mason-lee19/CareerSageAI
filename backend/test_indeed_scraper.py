import unittest
from utils import IndeedScraper, JobListing


class TestScraper(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Set up resources required for all tests.
        """
        # Test HTML files folder path
        cls.test_files_path = "./PageTests"
        # Instantiate the Scraper class
        cls.scraper = IndeedScraper("offline", cls.test_files_path)
        # Expected output
        expected_output_dict = {
            "jobLink": [
                "https://www.indeed.com/rc/clk?jk=b03dc910761bd8c7&bb=mfJCwUfMVybas6Zkkv4fRijftvJqAklMfGPEsgvBIWWxxwg8IjanGIm3BCe1LVKfrzwsean-Bu7BjVH5o3EIKVRgBwFh_BZTDUddaP_-LF10sJfHwJ7qzP5hN63bC5DK&xkcb=SoCU67M34y1HzTyNnJ0KbzkdCdPP&fccid=86e9be6ce380173e&vjs=3"
            ],
            "jobTitle": ["Data Engineer"],
            "jobCompany": ["Tesla"],
            "minSalary": [80000],
            "maxSalary": [186000],
            "salaryUnit": ["YEAR"],
            "jobDetails": ["Job Details"],
            "jobLocation": ["Palo Alto, CA 94304"],
            "expirationStatus": [False],
        }

        cls.expected_output = JobListing(**expected_output_dict)

    def test_scrape_from_html(self):
        """
        Test scraping functionality using local HTML files.
        """

        result = self.scraper.get_search()
        self._print_result(result)
        # Assertions to compare actual and expected outputs
        self._assert_job_listing(result, self.expected_output)

    @staticmethod
    def _print_result(result):
        print("Results:")
        print(f"result[jobTitle]         : {result.jobTitle}")
        print(f"result[jobCompany]       : {result.jobCompany}")
        print(f"result[minSalary]        : {result.minSalary}")
        print(f"result[maxSalary]        : {result.maxSalary}")
        print(f"result[salaryUnit]       : {result.salaryUnit}")
        print(f"result[jobLocation]      : {result.jobLocation}")
        print(f"result[expirationStatus] : {result.expirationStatus}")

    @staticmethod
    def _assert_job_listing(actual: JobListing, expected: JobListing):
        """
        Assert that specific fields in the JobListing objects match and that jobDetails is not None.

        Args:
            expected (JobListing): The expected JobListing object.
            actual (JobListing): The actual JobListing object returned by the scraper.
        """

        errors = []

        # Check specific fields for equality
        if expected.jobLink != actual.jobLink:
            errors.append(f"jobLink mismatch: {expected.jobLink} != {actual.jobLink}")
        if expected.jobTitle != actual.jobTitle:
            errors.append(
                f"jobTitle mismatch: {expected.jobTitle} != {actual.jobTitle}"
            )
        if expected.jobCompany != actual.jobCompany:
            errors.append(
                f"jobCompany mismatch: {expected.jobCompany} != {actual.jobCompany}"
            )
        if expected.minSalary != actual.minSalary:
            errors.append(
                f"minSalary mismatch: {expected.minSalary} != {actual.minSalary}"
            )
        if expected.maxSalary != actual.maxSalary:
            errors.append(
                f"maxSalary mismatch: {expected.maxSalary} != {actual.maxSalary}"
            )
        if expected.salaryUnit != actual.salaryUnit:
            errors.append(
                f"salaryUnit mismatch: {expected.salaryUnit} != {actual.salaryUnit}"
            )
        if expected.jobLocation != actual.jobLocation:
            errors.append(
                f"jobLocation mismatch: {expected.jobLocation} != {actual.jobLocation}"
            )
        if actual.jobDetails == ["None"]:
            errors.append("jobDetails mismatch: job details is None")

        # Raise an exception if there are any errors
        if errors:
            error_message = "\n".join(errors)
            raise AssertionError(
                f"JobListing validation failed with the following mismatches:\n{error_message}"
            )
        print("All assertions passed.")


if __name__ == "__main__":
    unittest.main()
