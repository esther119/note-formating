## Frontend

### Overview

The frontend application is built using Next.js.

### Installation

1. Clone the repository
2. Install dependencies:

```
   npm install
   # or
   yarn install
```

3. Running the Application: `npm run dev`

### Environment Variables:

`NEXT_PUBLIC_BACKEND_URL=http://localhost:5000`

### Pages and Components

Editor Page: Allows users to create and edit notes.
Table of Contents: Displays all notes with options to delete.
Note Display Page: Shows the content of a specific note.

## Backend

### Overview

The backend is built using Flask and integrates with Redis for data storage and Cloudinary for image handling.

### Prerequisites

- Python 3.x
- Redis server
- Cloudinary account

### Installation

1. Clone the repository
2. `cd backend`
3. pip install -r requirements.txt

### Set up environment variables

```

GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

### Run the APP

`python app.py`

### Endpoints

- `GET /health`: Health check and Redis connection status.
- `POST /submit`: Submit a new note.
- `GET /notes`: Retrieve all notes.
- `GET /notes/<id>`: Retrieve a specific note by ID.
- `DELETE /notes/<id>`: Delete a specific note by ID.
- `POST /upload`: Upload an image and get the URL.

# To do:

- the double indention for CSS display
- create code block and display a code blocks that doesn't exceed the notes
- Allow multiple images
- image results is terrible, the detailed of images get generated in markdown

