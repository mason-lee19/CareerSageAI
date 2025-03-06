# logger_config.py
import logging
from logging.handlers import RotatingFileHandler
import os
from datetime import datetime

# Log file path
now = datetime.now()
file_name = now.strftime("%Y-%m-%d_%H-%M-%S_run.log")
log_file_path = os.path.join(os.path.dirname(__file__), "../logs", file_name)

# Ensure the logs directory exists
os.makedirs(os.path.dirname(log_file_path), exist_ok=True)

# Configure logger
logger = logging.getLogger("app_logger")
logger.setLevel(logging.DEBUG)  # Set to DEBUG to capture all types of logs

# File handler with rotation
handler = RotatingFileHandler(log_file_path, maxBytes=5 * 1024 * 1024, backupCount=3)
handler.setLevel(logging.DEBUG)

# Formatter
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)

# Add handler to logger
logger.addHandler(handler)

# Prevents logging duplication if logger is imported in multiple places
logger.propagate = False


def log_and_print(message, log_level="info"):
    """
    Method to log and print messages for better consistency.
    """
    print(f"{message}")
    if log_level == "info":
        logger.info(message)
    elif log_level == "error":
        logger.error(message)
