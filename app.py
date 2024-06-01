from flask import Flask, request, jsonify, render_template
from llm_formating import format_note, add_topic
from flask_cors import CORS
import uuid
import redis
from datetime import datetime
import os


app = Flask(__name__)
CORS(app)

# Create a connection to the Redis server
client = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

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
        
        note_id = str(uuid.uuid4())
        creation_date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        new_markdown = format_note(note['content'])
        topic = add_topic(note['content'])
        new_note = {'id': note_id, 'content': new_markdown, 'creation_date': creation_date, "topic": topic}
        print('new note', new_note)
        client.hmset(note_id, new_note)
        return jsonify(new_note), 201
        # return { id: "123", content: "Your note content" }
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
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

@app.route('/upload', methods=['POST'])
def upload_image():
    print('ping the image endpoint')
    image = request.files['image']
    print('image', image)
    path = os.path.join('uploads', image.filename)
    image.save(path)
    return jsonify({"url": f"http://127.0.0.1:5000/{path}"})
    
if __name__ == '__main__':
    app.run(debug=True)
