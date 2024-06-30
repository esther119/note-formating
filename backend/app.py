from flask import Flask, request, jsonify, render_template
from modules.llm_formating import format_note, add_topic
from modules.cloudinary_helper import upload_image_from_url
from flask_cors import CORS
import uuid
import redis
from datetime import datetime
import os


app = Flask(__name__)
# Allow CORS for requests from http://localhost:3000
CORS(app, resources={
     r"/*": {"origins": ["http://localhost:3000", "http://localhost:3001"]}})

# Create a connection to the Redis server
client = redis.StrictRedis(host='localhost', port=6379,
                           db=0, decode_responses=True)


# Route to render the HTML form
@app.route('/')
def index():
    return "hello"


@app.route('/health', methods=['GET'])
def health_check():
    try:
        # Ping the Redis server to check the connection
        client.ping()
        return jsonify({'status': 'Connected to Redis!'}), 200
    except redis.ConnectionError:
        return jsonify({'status': 'Connection to Redis failed!'}), 500


@app.route('/submit', methods=['POST'])
def submit():
    try:
        note = request.json  # Assuming the data is sent as JSON
        if not isinstance(note, dict) or 'content' not in note:
            return jsonify({'error': 'Missing or invalid "content" key'}), 400

        # Simulating expected structure check
        if not isinstance(note['content'], (str, list)):
            return jsonify({'error': 'Content must be a string or a list'}), 400
        print('note data from fornt end', note)
        print('')
        image_url = ''
        if note['url']:
            print('image url', image_url)
            image_url = note['url']

        content = str(note['content'])
        note_id = str(uuid.uuid4())
        creation_date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        print('start to new markdown', content)
        new_markdown = format_note(content)
        print('finish markdown')
        topic = add_topic(new_markdown)
        print('finish topic')
        new_note = {'id': note_id, 'content': new_markdown,
                    'creation_date': creation_date, "topic": topic, "image_url": image_url}
        print('finish new note')
        # client.hset(note_id, new_note)
        print('')
        print(new_note)
        for field, value in new_note.items():
            client.hset(note_id, field, value)
        print('finish database')
        return jsonify(new_note), 201
    except Exception as e:
        print('error occurs in submission', e)
        return jsonify({'error in submission': str(e)}), 500

# Function to process the data


def process_data(data):
    # Example processing logic
    result = {'message': 'Data received successfully', 'data': data}
    return result


@app.route('/notes/<id>', methods=['GET'])
def get_note_by_id(id):
    try:
        # Retrieve the note from Redis
        note = client.hgetall(id)
        print('got the note from redis', note)
        if not note:
            return jsonify({'error': 'Note not found'}), 404

        return jsonify(note)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/notes', methods=['GET'])
def get_all_notes():
    try:
        keys = client.keys('*')  # Get all keys
        notes = []
        for key in keys:
            note = client.hgetall(key)  # Get all fields for the key
            notes.append({
                'id': key,
                'topic': note['topic'],
                'content': note['content'],
                'creation_date': note['creation_date']
            })
        return jsonify(notes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/notes/<id>', methods=['DELETE'])
def delete_note(id):
    try:
        if client.exists(id):
            client.delete(id)
            return jsonify({'message': 'Note deleted successfully'}), 200
        else:
            return jsonify({'error': 'Note not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        data = request.json
        image_url = data.get('url')
        cloudinary_url = upload_image_from_url(image_url)
        return jsonify({"url": cloudinary_url}), 200
    except Exception as e:
        return jsonify({'error upload image': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
