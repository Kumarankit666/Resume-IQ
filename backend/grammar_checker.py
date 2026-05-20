import language_tool_python

tool = language_tool_python.LanguageTool(
    'en-US'
)


def check_grammar(text):

    matches = tool.check(text)

    mistakes = []

    for match in matches[:10]:

        mistakes.append({

            "message": match.message,

            "sentence": text[
                match.offset:
                match.offset + match.errorLength
            ]

        })

    return mistakes