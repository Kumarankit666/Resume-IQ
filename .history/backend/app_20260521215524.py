from flask import Flask, request, jsonify

from flask_cors import CORS

import os

from datetime import datetime

from resume_parser import (
    extract_text_from_pdf
)

from ats_score import (
    calculate_ats_score
)

from resume_analyzer import (
    analyze_resume_structure
)

from database import (
    analysis_collection
)

# ================= APP =================

app = Flask(__name__)

CORS(app)

# ================= UPLOAD FOLDER =================

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

app.config[
    "UPLOAD_FOLDER"
] = UPLOAD_FOLDER

# ================= HOME =================

@app.route("/")

def home():

    return jsonify({

        "message":
        "ResumeIQ Backend Running 🚀"

    })

# ================= RESUME ANALYSIS =================

@app.route(
    "/analyze",
    methods=["POST"]
)

def analyze_resume():

    try:

        # ================= CHECK FILE =================

        if "resume" not in request.files:

            return jsonify({

                "error":
                "No resume uploaded"

            }), 400

        resume = request.files[
            "resume"
        ]

        # ================= JOB DESCRIPTION =================

        job_description = request.form.get(

            "job_description",

            ""

        )

        # ================= SAVE FILE =================

        file_path = os.path.join(

            app.config[
                "UPLOAD_FOLDER"
            ],

            resume.filename

        )

        resume.save(file_path)

        # ================= EXTRACT TEXT =================

        resume_text = extract_text_from_pdf(
            file_path
            
        )
        print(resume_text)

        # ================= ATS SCORE =================

        result = calculate_ats_score(

            resume_text,

            job_description

        )

        # ================= NLP ANALYSIS =================

        structure_analysis = (
            analyze_resume_structure(
                resume_text
            )
        )

        # ================= CANDIDATE DETAILS =================

        result["candidate_name"] = (
            structure_analysis.get(
                "candidate_name",
                "Not Found"
            )
        )

        result["email"] = (
            structure_analysis.get(
                "email",
                "Not Found"
            )
        )

        result["phone"] = (
            structure_analysis.get(
                "phone",
                "Not Found"
            )
        )

        result["structure_analysis"] = (
            structure_analysis
        )

        # ================= SAVE TO DATABASE =================

        analysis_collection.insert_one({

            "resume_name":
            resume.filename,

            "candidate_name":
            result["candidate_name"],

            "email":
            result["email"],

            "phone":
            result["phone"],

            "ats_score":
            result["ats_score"],

            "matched_skills":
            result["matched_skills"],

            "missing_skills":
            result["missing_skills"],

            "job_description":
            job_description,

            "date":
            datetime.now()

        })

        # ================= RETURN RESULT =================

        return jsonify(result)

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500

# ================= HISTORY API =================

@app.route(
    "/history",
    methods=["GET"]
)

def get_history():

    history = list(

        analysis_collection.find(
            {},
            {
                "_id": 0
            }
        )

    )

    history.reverse()

    return jsonify(history)

# ================= RUN APP =================

if __name__ == "__main__":

    app.run(

        debug=False,

        port=5000,

        threaded=True

    )