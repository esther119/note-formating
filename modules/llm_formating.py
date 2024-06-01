
from groq import Groq

def format_note(note): 
    # if not note: 
    #     note = "## Step 1 - Understand the problem and establish design scope\n\n- Who is going to use it?\n- How are they going to use it?\n- How many users does the product have?\n- What does the system do?\n    - What specific features are we going to build?\n    - What are the inputs and outputs of the system?\n- How fast does the company anticipate to scale up? What are the anticipated scales in 3 months, 6 months, and a year?\n    - How much data do we expect to handle?\n    - How many requests per second do we expect?\n    - What is the expected read to write ratio?\n- What is the company’s technology stack? What existing services you might leverage to simplify the design?\n\nFunctional vs non functional requirement\n\n- functional: which features do we want to build?\n- non functional: scale, performance, availability,  accuracy, consistency, freshness"
    client = Groq(api_key='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')
    # print('input note', note)
    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "system",
                "content": "You are a note taker. You rewrite messy information into structural notes in markdown format. Don't mention rewritten text or markdown format."
            },
            {
                "role": "user",
                "content": note
            }
        ],
        temperature=0.5,
        max_tokens=20484,
        top_p=1,
        stream=True,
        stop=None,
    )
    all_chunks_content = ""
    with open("output.md", "w") as f:
        for chunk in completion:
            f.write(chunk.choices[0].delta.content or "")
            all_chunks_content += chunk.choices[0].delta.content or ""


    print('all chunks', all_chunks_content)
    return all_chunks_content

def add_topic(note): 
    print('add topic', note)
    client = Groq(api_key='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')
    completion = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {
                "role": "system",
                "content": "Give the note a short title in plain text."
            },
            {
                "role": "user",
                "content": note
            }
        ],
        temperature=0.5,
        max_tokens=20484,
        top_p=1,
        stream=False,
        stop=None,
    )

    print('topic response', completion.choices[0].message.content)
    # topic = completion.choices[0].delta.conten
    return completion.choices[0].message.content

