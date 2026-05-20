from flask import Flask, request, jsonify

from flask_cors import CORS

import os
import json

from datetime import datetime

from resume_parser import (
    extract_text_from_pdf
)

from ats_score import (
    calculate_ats_score
)

from ai_engine import (
    generate_ai_review
)

from resume_analyzer import (
    analyze_resume_structure
)

from grammar_checker import (
    check_grammar
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

        # ================= ATS SCORE =================

        result = calculate_ats_score(

            resume_text,

            job_description

        )

        # ================= AI REVIEW =================

        ai_review = generate_ai_review(

            resume_text,

            job_description

        )

        # ================= STRUCTURE ANALYSIS =================

        structure_analysis = (
            analyze_resume_structure(
                resume_text
            )
        )

        # ================= GRAMMAR CHECK =================

        grammar_issues = check_grammar(
            resume_text
        )

        # ================= ADD EXTRA DATA =================

        result["ai_review"] = ai_review

        result["structure_analysis"] = (
            structure_analysis
        )

        result["grammar_issues"] = (
            grammar_issues
        )

        # ================= SAVE HISTORY =================

        history_file = "history.json"

        history_data = []

        if os.path.exists(history_file):

            with open(
                history_file,
                "r"
            ) as file:

                try:

                    history_data = json.load(
                        file
                    )

                except:

                    history_data = []

        history_item = {

            "resume_name":
            resume.filename,

            "ats_score":
            result["ats_score"],

            "date":
            datetime.now().strftime(
                "%d-%m-%Y %H:%M"
            )

        }

        history_data.append(
            history_item
        )

        with open(
            history_file,
            "w"
        ) as file:

            json.dump(

                history_data,

                file,

                indent=4

            )

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

    history_file = "history.json"

    if not os.path.exists(
        history_file
    ):

        return jsonify([])

    with open(
        history_file,
        "r"
    ) as file:

        history = json.load(file)

    return jsonify(
        history[::-1]
    )

# ================= RUN APP =================

if __name__ == "__main__":

    app.run(

        debug=True,

        port=5000

    )