from sklearn.feature_extraction.text import CountVectorizer

from sklearn.metrics.pairwise import cosine_similarity


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
        "css",
        "firebase",
        "tailwind",
        "git",
        "github"

    ]

    text = text.lower()

    found_skills = []

    for skill in skills_db:

        if skill in text:

            found_skills.append(skill)

    return list(set(found_skills))


def generate_feedback(
    ats_score,
    missing_skills
):

    feedback = []

    # ATS SCORE FEEDBACK

    if ats_score >= 85:

        feedback.append(
            "Excellent ATS compatibility."
        )

    elif ats_score >= 70:

        feedback.append(
            "Good resume match but can be improved."
        )

    elif ats_score >= 50:

        feedback.append(
            "Average ATS match. Add more relevant skills."
        )

    else:

        feedback.append(
            "Low ATS score. Resume needs optimization."
        )

    # MISSING SKILLS FEEDBACK

    if missing_skills:

        feedback.append(
            "Add missing skills mentioned in job description."
        )

        feedback.append(
            "Focus on improving technical keyword matching."
        )

    else:

        feedback.append(
            "Great skill alignment with job description."
        )

    return feedback


def calculate_ats_score(
    resume_text,
    job_description
):

    documents = [
        resume_text,
        job_description
    ]

    cv = CountVectorizer()

    matrix = cv.fit_transform(documents)

    similarity = cosine_similarity(
        matrix
    )[0][1]

    ats_score = round(
        similarity * 100
    )

    # EXTRACT SKILLS

    resume_skills = extract_skills(
        resume_text
    )

    jd_skills = extract_skills(
        job_description
    )

    # MATCHED

    matched_skills = list(

        set(jd_skills).intersection(
            set(resume_skills)
        )

    )

    # MISSING

    missing_skills = list(

        set(jd_skills) - set(resume_skills)

    )

    # AI FEEDBACK

    feedback = generate_feedback(
        ats_score,
        missing_skills
    )

    return {

        "ats_score": ats_score,

        "resume_skills": resume_skills,

        "job_description_skills": jd_skills,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "feedback": feedback,

        "resume_preview": resume_text[:1000]

    }