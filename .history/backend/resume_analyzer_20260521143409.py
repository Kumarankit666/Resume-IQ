import re


# ================= EMAIL =================

def extract_email(text):

    try:

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

        lines = text.split("\n")

        blacklist = [

            "resume",
            "linkedin",
            "github",
            "profile",
            "developer",
            "engineer",
            "curriculum vitae",
            "email",
            "phone",
            "contact",

        ]

        # CHECK FIRST 10 LINES

        for line in lines[:10]:

            clean_line = line.strip()

            lower_line = clean_line.lower()

            # SKIP BAD WORDS

            if any(
                word in lower_line
                for word in blacklist
            ):

                continue

            # REMOVE SYMBOLS

            clean_line = re.sub(

                r'[^a-zA-Z\s]',

                '',

                clean_line

            )

            words = clean_line.split()

            # VALID HUMAN NAME

            if (

                len(words) >= 2 and

                len(words) <= 4

            ):

                valid = all(

                    word[0].isupper()

                    for word in words

                    if len(word) > 1

                )

                if valid:

                    return clean_line

        return "Not Found"

    except:

        return "Not Found"


# ================= STRUCTURE =================

def analyze_resume_structure(
    resume_text
):

    try:

        text = resume_text.lower()

        experience = []

        education = []

        projects = []

        # EXPERIENCE

        if (

            "experience" in text or

            "worked" in text or

            "intern" in text or

            "developer" in text

        ):

            experience.append(
                "Experience Section Found"
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
                "Education Section Found"
            )

        # PROJECTS

        if (

            "project" in text or

            "developed" in text or

            "built" in text or

            "created" in text

        ):

            projects.append(
                "Projects Section Found"
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

    except:

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