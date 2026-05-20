from sklearn.feature_extraction.text import CountVectorizer

from sklearn.metrics.pairwise import cosine_similarity


# ================= SKILL EXTRACTION =================

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


# ================= FEEDBACK =================

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


# ================= ATS SCORE =================

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

    # ================= SKILLS =================

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

    # ================= FEEDBACK =================

    feedback = generate_feedback(
        ats_score,
        missing_skills
    )

    # ================= STRENGTH ANALYSIS =================

    strengths = []

    weaknesses = []

    if ats_score >= 80:

        strengths.append(
            "Strong ATS compatibility"
        )

    if len(matched_skills) >= 5:

        strengths.append(
            "Good technical skill match"
        )

    if "projects" in resume_text.lower():

        strengths.append(
            "Projects section detected"
        )

    if "experience" in resume_text.lower():

        strengths.append(
            "Experience section detected"
        )

    if ats_score < 60:

        weaknesses.append(
            "Low ATS score"
        )

    if len(missing_skills) > 3:

        weaknesses.append(
            "Multiple important skills missing"
        )

    if "certification" not in resume_text.lower():

        weaknesses.append(
            "Certifications section missing"
        )

    if "education" not in resume_text.lower():

        weaknesses.append(
            "Education details missing"
        )

    # ================= RETURN =================

    return {

        "ats_score": ats_score,

        "resume_skills": resume_skills,

        "job_description_skills": jd_skills,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "feedback": feedback,

        "strengths": strengths,

        "weaknesses": weaknesses,

        "resume_preview": resume_text[:1000]

    }