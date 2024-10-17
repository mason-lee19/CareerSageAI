class StringUtil:
    @staticmethod
    def format_search(search:str):
        """Formats Indeed job search if contains spaces"""
        return search.replace(' ','+')
    
    @staticmethod
    def extract_text(element, default='None'):
        """Helper function to extract text or return a default value."""
        return element.get_text().strip() if element else default

    @staticmethod
    def extract_salary(job_salary):
        """Helper function to split and clean salary into min and max."""
        if job_salary != 'Not Specified' and len(job_salary.split(' ')) > 2:
            min_salary = job_salary.split('-')[0].replace('$', '').strip()
            max_salary = job_salary.split('-')[1].split(' ')[1].replace('$', '').strip()
            return min_salary, max_salary
        return 'None', 'None'
    
    @staticmethod
    def get_indeed_url(href):
        """Helper function to build full Indeed link from href"""
        return 'https://www.indeed.com' + href