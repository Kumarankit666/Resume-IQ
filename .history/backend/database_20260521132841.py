from pymongo import MongoClient

client = MongoClient(

    "mongodb+srv://resumeiq:Ank816102@@resumeiq.sgp8f34.mongodb.net/?appName=ResumeIQ"

)

db = client["resumeiq"]

analysis_collection = db["analysis"]

profiles_collection = db["profiles"]