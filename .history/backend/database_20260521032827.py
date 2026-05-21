from pymongo import MongoClient

client = MongoClient(
    "mongodb://localhost:27017/"
)

db = client["resumeiq"]

analysis_collection =
db["analysis"]

profiles_collection =
db["profiles"]