import spacy

import re

nlp = spacy.load(
    "en_core_web_sm"
)

# ================= EMAIL =================

def extract_email(text):

    try:

        # REMOVE LINE BREAKS

        text = text.replace(
            "\n",
            " "
        )

        emails = re.findall(

            r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',

            text

        )

        if emails:

            return emails[0]

        return "Not Found"

    except:

        return "Not Found"


# ================= PHONE =================

def extract_phone(text):

    try:

        text = text.replace(
            "\n",
            " "
        )

        phones = re.findall(

            r'(?:\+91[\-\s]?)?[6-9]\d{9}',

            text

        )

        if phones:

            return phones[0]

        return "Not Found"

    except:

        return "Not Found"


# ================= NAME =================

def extract_name(text):

    try:

        doc = nlp(text)

        for ent in doc.ents:

            if ent.label_ == "PERSON":

                if len(ent.text) > 2:

                    return ent.text

        return "Not Found"

    except:

        return "Not Found"


# ================= STRUCTURE ANALYSIS =================

def analyze_resume_structure(
    resume_text
):

    try:

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

                "intern" in text or

                "developer" in text

            ):

                experience.append(
                    sent.text
                )

            # EDUCATION

            if (

                "b.tech" in text or

                "bachelor" in text or

                "master" in text or

                "education" in text or

                "mca" in text or

                "bca" in text

            ):

                education.append(
                    sent.text
                )

            # PROJECTS

            if (

                "project" in text or

                "developed" in text or

                "built" in text or

                "created" in text

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

    except Exception as e:

        return {

            "experience": [],

            "education": [],

            "projects": [],

            "candidate_name":
            "Not Found",

            "email":
            "Not Found",

            "phone":
            "Not Found"

        }