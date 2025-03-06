class StringUtil:
    @staticmethod
    def format_search(search: str):
        """Formats Indeed job search if contains spaces"""
        return search.replace(" ", "+")

    @staticmethod
    def extract_text(element, default="None"):
        """Helper function to extract text or return a default value."""
        return element.get_text().strip() if element else default
