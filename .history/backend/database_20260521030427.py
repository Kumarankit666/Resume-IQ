from pymongo import MongoClient

# ================= CONNECT =================

client = MongoClient(

    "mongodb://localhost:27017/"

)

# ================= DATABASE =================

db = client["resumeiq"]

# ================= COLLECTION =================

analysis_collection = db["analysis"]