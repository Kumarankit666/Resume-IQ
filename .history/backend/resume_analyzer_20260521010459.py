import spacy

nlp = spacy.load(
    "en_core_web_sm"
)


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

        "experience": experience,

        "education": education,

        "projects": projects

    }