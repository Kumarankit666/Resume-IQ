from pymongo import MongoClient

# ================= CONNECT =================

client = MongoClient(

    "mongodb://localhost:27017/"

)

# ================= DATABASE =================

db = client["resumeiq"]

# ================= COLLECTIONS =================

analysis_collection = db["analysis"]

profiles_collection = db["profiles"]