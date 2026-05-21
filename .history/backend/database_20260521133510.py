from pymongo import MongoClient

client = MongoClient(

    "mongodb+srv://resumeiq:GdLy3cZJjOlHC5@resumeiq.sgp8f34.mongodb.net/?retryWrites=true&w=majority&appName=ResumeIQ"

)

db = client["resumeiq"]

analysis_collection = db["analysis"]

profiles_collection = db["profiles"]