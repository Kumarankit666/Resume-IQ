from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import re


def extract_skills(text):

    skills_db = [

        "python",
        "java",
        "react",
        "node",
        "mongodb",
        "sql",
        "aws",
        "docker",
        "kubernetes",
        "flask",
        "django",
        "machine learning",
        "ai",
        "data analysis",
        "javascript",
        "typescript",
        "html",
        "css"

    ]

    text = text.lower()

    found_skills = []

    for skill in skills_db:

        if skill in text:

            found_skills.append(skill)

    return list(set(found_skills))


def calculate_ats_score(
    resume_text,
    job_description
):

    # TEXT SIMILARITY

    documents = [
        resume_text,
        job_description
    ]

    cv = CountVectorizer()

    matrix = cv.fit_transform(documents)

    similarity = cosine_similarity(
        matrix
    )[0][1]

    ats_score = round(similarity * 100)

    # SKILLS

    resume_skills = extract_skills(
        resume_text
    )

    jd_skills = extract_skills(
        job_description
    )

    missing_skills = list(
        set(jd_skills) - set(resume_skills)
    )

    matched_skills = list(
        set(jd_skills).intersection(
            set(resume_skills)
        )
    )

    return {

        "ats_score": ats_score,

        "resume_skills": resume_skills,

        "job_description_skills": jd_skills,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "resume_preview": resume_text[:1000]

    }