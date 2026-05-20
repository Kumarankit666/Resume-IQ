import re

# ================= CLEAN TEXT =================

def clean_text(text):

    text = text.lower()

    text = re.sub(
        r"[^a-zA-Z0-9\s]",
        " ",
        text
    )

    return text


# ================= SKILL EXTRACTION =================

def extract_skills(text):

    skills_db = [

        # PROGRAMMING

        "python",
        "java",
        "javascript",
        "typescript",
        "c++",
        "c",
        "react",
        "node",
        "django",
        "flask",

        # DATABASE

        "mysql",
        "postgresql",
        "mongodb",
        "sql",

        # CLOUD

        "aws",
        "azure",
        "gcp",
        "docker",
        "kubernetes",

        # AI/ML

        "machine learning",
        "deep learning",
        "nlp",
        "tensorflow",
        "pytorch",

        # TOOLS

        "git",
        "github",
        "linux",
        "excel",
        "power bi",

    ]

    found_skills = []

    text = clean_text(text)

    for skill in skills_db:

        if skill.lower() in text:

            found_skills.append(
                skill
            )

    return list(
        set(found_skills)
    )


# ================= EXPERIENCE SCORE =================

def calculate_experience_score(
    resume_text
):

    score = 0

    experience_keywords = [

        "experience",
        "worked",
        "internship",
        "intern",
        "developer",
        "engineer",
        "manager",

    ]

    for word in experience_keywords:

        if word in resume_text.lower():

            score += 5

    return min(score, 20)


# ================= EDUCATION SCORE =================

def calculate_education_score(
    resume_text
):

    score = 0

    education_keywords = [

        "b.tech",
        "bachelor",
        "master",
        "mca",
        "bca",
        "computer science",

    ]

    for word in education_keywords:

        if word in resume_text.lower():

            score += 5

    return min(score, 15)


# ================= PROJECT SCORE =================

def calculate_project_score(
    resume_text
):

    score = 0

    project_keywords = [

        "project",
        "developed",
        "built",
        "created",
        "designed",

    ]

    for word in project_keywords:

        if word in resume_text.lower():

            score += 4

    return min(score, 15)


# ================= FORMAT SCORE =================

def calculate_format_score(
    resume_text
):

    score = 0

    sections = [

        "skills",
        "education",
        "experience",
        "projects",
        "summary",

    ]

    for section in sections:

        if section in resume_text.lower():

            score += 4

    return min(score, 20)


# ================= MAIN ATS =================

def calculate_ats_score(

    resume_text,

    job_description

):

    resume_text_clean = clean_text(
        resume_text
    )

    jd_clean = clean_text(
        job_description
    )

    # ================= SKILLS =================

    resume_skills = extract_skills(
        resume_text_clean
    )

    jd_skills = extract_skills(
        jd_clean
    )

    matched_skills = list(

        set(resume_skills).intersection(
            set(jd_skills)
        )

    )

    missing_skills = list(

        set(jd_skills) - set(
            resume_skills
        )

    )

    # ================= SKILL SCORE =================

    if len(jd_skills) > 0:

        skill_score = int(

            (
                len(matched_skills)
                / len(jd_skills)
            ) * 40

        )

    else:

        skill_score = 0

    # ================= OTHER SCORES =================

    experience_score = (
        calculate_experience_score(
            resume_text
        )
    )

    education_score = (
        calculate_education_score(
            resume_text
        )
    )

    project_score = (
        calculate_project_score(
            resume_text
        )
    )

    format_score = (
        calculate_format_score(
            resume_text
        )
    )

    # ================= FINAL ATS =================

    final_score = (

        skill_score +

        experience_score +

        education_score +

        project_score +

        format_score

    )

    final_score = min(
        final_score,
        100
    )

    # ================= FEEDBACK =================

    feedback = []

    if len(matched_skills) < 5:

        feedback.append(
            "Add more relevant skills from JD"
        )

    if experience_score < 10:

        feedback.append(
            "Add more work experience"
        )

    if project_score < 10:

        feedback.append(
            "Add more strong projects"
        )

    if format_score < 10:

        feedback.append(
            "Improve resume formatting"
        )

    return {

        "ats_score":
        final_score,

        "matched_skills":
        matched_skills,

        "missing_skills":
        missing_skills,

        "resume_skills":
        resume_skills,

        "skill_score":
        skill_score,

        "experience_score":
        experience_score,

        "education_score":
        education_score,

        "project_score":
        project_score,

        "format_score":
        format_score,

        "feedback":
        feedback,

    }