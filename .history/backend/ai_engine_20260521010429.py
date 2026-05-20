import google.generativeai as genai

import os

from dotenv import load_dotenv


load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-1.5-flash"
)


def generate_ai_review(
    resume_text,
    job_description
):

    prompt = f"""

    Analyze this resume against the job description.

    Resume:
    {resume_text}

    Job Description:
    {job_description}

    Give:

    1. Resume summary
    2. Strengths
    3. Weaknesses
    4. Improvement suggestions
    5. Hiring recommendation

    """

    response = model.generate_content(
        prompt
    )

    return response.text