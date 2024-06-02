import redis

# Connect to the Redis server
client = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

note_id = "note:1"
new_markdown = "This is the content of the note."
creation_date = "2024-06-01"
topic = "Python and Redis"
image_url = "http://example.com/image.png"

# Create a dictionary with the new note data
new_note = {
    'id': note_id,
    'content': new_markdown,
    'creation_date': creation_date,
    'topic': topic,
    'image_url': image_url
}

# Use hset to set each field in the hash
for field, value in new_note.items():
    client.hset(note_id, field, value)
    print('Finished creating new note')


