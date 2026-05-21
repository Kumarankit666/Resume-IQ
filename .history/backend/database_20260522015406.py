from pymongo import MongoClient

client = MongoClient(

    "mongodb+srv://resumeiq:GdLy3cZJjOlHC5@resumeiq.sgp8f34.mongodb.net/?retryWrites=true&w=majority&tls=true",

    tlsAllowInvalidCertificates=True

)

db = client["ResumeIQ"]

analysis_collection = db["analysis"]