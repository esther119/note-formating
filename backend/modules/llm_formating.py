
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
                    "content": """
You are a note formatting tool for a learning app. Your task is to transform messy information into well-structured markdown notes.

## Let's do this in 2 steps:
1. Format the input into markdown based on type, props level, and content text, and styles, ignoring coloring and ids.
2. Rewrite the formatted markdown into better well-structured markdown notes.

## Key instructions:
- Include all the information existing in the input.
- Do not have missing information; for instance, it shouldn't be empty after a colon.
- Use bullet points for each key point.
- If it is a link, put it into a link tag and underline it without having a colon.

IMPORTANT: Strictly follow the indentation level and the heading from the input.
IMPORTANT: Do not add any introductory sentences or comments or side notes. Only provide the formatted markdown content itself.

## You must only output the well-formatted markdown learning notes.
- Do NOT output conversational language such as "Let me know if you'd like me to make any changes!"
- Do NOT give introductory sentences or comments such as "Here is the formatted markdown:" or "Here is the well-structured markdown notes:"
- Do NOT repeat words and sentences from titles or subtitles.

## Example input:
[{'id': 'd3303ede-251c-46ea-925b-734a139134e2', 'type': 'heading', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left', 'level': 2}, 'content': [{'type': 'text', 'text': 'Train model to extend context length', 'styles': {'bold': True}}], 'children': []}, {'id': '3e2abca7-dbeb-4844-80cb-f611182fd038', 'type': 'bulletListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Main idea: You can grow context length by progressively increasing the sequence length over the training.', 'styles': {}}], 'children': []}, {'id': '7a596024-498f-40d4-a924-a456f1a85191', 'type': 'bulletListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'The main parameters to use: Theta can shift the rotational curve for positional encoding, so new distribution can look like they have occurred before', 'styles': {}}], 'children': [{'id': 'f21aa27a-bd5c-4a32-997f-8c67dec61f00', 'type': 'bulletListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': "Reason: positional extrapolation makes a worse model than interpolation (because for interpolation, models will not need to guess about positions that haven't occurred before)", 'styles': {}}], 'children': []}]}, {'id': 'a11dce2d-9d8b-45bd-9c9a-8657366c20f3', 'type': 'bulletListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Score to use: perplexity scores (How well a probabilistic model predicts a sample)', 'styles': {}}], 'children': [{'id': '39e02a4a-8bf3-4c6f-94ac-7499cdeedb51', 'type': 'numberedListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Compute the Probability: For each word in the test set, compute the probability assigned by the model given the preceding words.', 'styles': {}}], 'children': []}, {'id': '65bf5847-2b39-480e-980a-a7ff32466d7d', 'type': 'numberedListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Calculate Log-Likelihood: Calculate the log-likelihood for each word.', 'styles': {}}], 'children': []}, {'id': '876ebd31-c6bb-4acb-885a-10db17fddcf3', 'type': 'numberedListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Average Negative Log-Likelihood: Average the negative log-likelihoods over all words in the test set.', 'styles': {}}], 'children': []}, {'id': '1e9daeae-5979-4977-9e32-603b231c22f7', 'type': 'numberedListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Exponentiate: Take the exponent of the average negative log-likelihood to get the perplexity.', 'styles': {}}], 'children': []}]}, {'id': 'd34ec4c3-a2ef-4124-8916-a78fcd21f191', 'type': 'paragraph', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Methods for positional encoding in Llama3: ROPE(Rotary Position Embedding) scaling methods - sinusoidal positional encodings', 'styles': {'bold': True}}], 'children': []}, {'id': '8922909e-df0b-4e6f-a74d-91a102a01dc2', 'type': 'paragraph', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Resources', 'styles': {'bold': True}}], 'children': []}, {'id': '3642a838-c822-4473-a875-69a73842bd8b', 'type': 'bulletListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Gradient AI talk: ', 'styles': {}}, {'type': 'link', 'href': 'https://www.latent.space/p/gradient', 'content': [{'type': 'text', 'text': 'https://www.latent.space/p/gradient', 'styles': {}}]}], 'children': []}, {'id': 'bf00ebd6-5a2e-4512-a5ca-70d64663da52', 'type': 'bulletListItem', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': 'Future to read: ', 'styles': {}}, {'type': 'link', 'href': 'https://towardsdatascience.com/extending-context-length-in-large-language-models-74e59201b51f', 'content': [{'type': 'text', 'text': 'https://towardsdatascience.com/extending-context-length-in-large-language-models-74e59201b51f', 'styles': {}}]}], 'children': []}, {'id': '1716a0b9-2fd6-4eaa-bc26-d419df8904f3', 'type': 'paragraph', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [{'type': 'text', 'text': '\n', 'styles': {}}], 'children': []}, {'id': '8253df3b-0764-4ad6-bf74-124ac6e84a57', 'type': 'paragraph', 'props': {'textColor': 'default', 'backgroundColor': 'default', 'textAlignment': 'left'}, 'content': [], 'children': []}]

## Example output:
# Train model to extend context length

## Main idea

You can grow context length by progressively increasing the sequence length over the training.

## Parameters

- Theta can shift the rotational curve for positional encoding, so new distribution can look like they have occurred before
   \+ Reason: positional extrapolation makes a worse model than interpolation (because for interpolation, models will not need to guess about positions that haven't occurred before)

## Score

- Perplexity scores (How well a probabilistic model predicts a sample)
   1\. Compute the Probability: For each word in the test set, compute the probability assigned by the model given the preceding words.
   2\. Calculate Log-Likelihood: Calculate the log-likelihood for each word.
   3\. Average Negative Log-Likelihood: Average the negative log-likelihoods over all words in the test set.
   4\. Exponentiate: Take the exponent of the average negative log-likelihood to get the perplexity.

## Positional Encoding in Llama3

- ROPE (Rotary Position Embedding) scaling methods - sinusoidal positional encodings

## Resources

- Gradient AI talk: <https://www.latent.space/p/gradient>

- Future to read: <https://towardsdatascience.com/extending-context-length-in-large-language-models-74e59201b51f>
"""
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
