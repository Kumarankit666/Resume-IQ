from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from resume_parser import extract_text_from_pdf
from ats_score import calculate_ats_score

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# ================= HOME =================

@app.route("/")

def home():

    return jsonify({
        "message": "ResumeIQ Backend Running 🚀"
    })


# ================= RESUME ANALYSIS =================

@app.route("/analyze", methods=["POST"])

def analyze_resume():

    try:

        # GET FILE

        if "resume" not in request.files:

            return jsonify({
                "error": "No resume uploaded"
            }), 400

        resume = request.files["resume"]

        job_description = request.form.get(
            "job_description",
            ""
        )

        # SAVE FILE

        file_path = os.path.join(
            app.config["UPLOAD_FOLDER"],
            resume.filename
        )

        resume.save(file_path)

        # EXTRACT TEXT

        resume_text = extract_text_from_pdf(
            file_path
        )

        # ATS SCORE

        result = calculate_ats_score(
            resume_text,
            job_description
        )

        return jsonify(result)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ================= RUN =================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )