import spacy

import re

nlp = spacy.load(
    "en_core_web_sm"
)


def extract_email(text):

    match = re.search(

        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",

        text

    )

    return match.group(0) if match else "Not Found"


def extract_phone(text):

    match = re.search(

        r"(\+91[-\s]?)?[0]?(91)?[6789]\d{9}",

        text

    )

    return match.group(0) if match else "Not Found"


def extract_name(text):

    doc = nlp(text)

    for ent in doc.ents:

        if ent.label_ == "PERSON":

            return ent.text

    return "Not Found"


def analyze_resume_structure(
    resume_text
):

    doc = nlp(resume_text)

    experience = []

    education = []

    projects = []

    for sent in doc.sents:

        text = sent.text.lower()

        # EXPERIENCE

        if (

            "experience" in text or

            "worked" in text or

            "intern" in text

        ):

            experience.append(
                sent.text
            )

        # EDUCATION

        if (

            "b.tech" in text or

            "bachelor" in text or

            "master" in text or

            "education" in text

        ):

            education.append(
                sent.text
            )

        # PROJECTS

        if (

            "project" in text or

            "developed" in text or

            "built" in text

        ):

            projects.append(
                sent.text
            )

    return {

        "experience":
        experience,

        "education":
        education,

        "projects":
        projects,

        "candidate_name":
        extract_name(
            resume_text
        ),

        "email":
        extract_email(
            resume_text
        ),

        "phone":
        extract_phone(
            resume_text
        )

    }