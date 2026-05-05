from pymongo import MongoClient
from dotenv import load_dotenv
import os

uri = os.environ.get("MONGO_URI")
db_name = os.environ.get("MONGO_DB_NAME")

client = MongoClient(uri)
db = client[db_name]
plants_collection = db["plants"]