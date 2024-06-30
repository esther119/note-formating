
from groq import Groq
import os
from dotenv import load_dotenv


def format_note(note):
    try:
        client = Groq(
            api_key=os.getenv('GROQ_API_KEY'))
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

        # print('all chunks', all_chunks_content)
        return all_chunks_content
    except Exception as e:
        print(f"Error formating into new notes: {str(e)}")
        return None


def add_topic(note):
    print('add topic', note)
    client = Groq(
        api_key=os.getenv('GROQ_API_KEY'))
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
