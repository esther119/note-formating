import os
from dotenv import load_dotenv
import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

load_dotenv()
cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
api_key = os.getenv('CLOUDINARY_API_KEY')
api_secret = os.getenv('CLOUDINARY_API_SECRET')

cloudinary.config(
  cloud_name=cloud_name, 
  api_key=api_key, 
  api_secret=api_secret
)

def upload_image_from_url(image_url):
    """
    Upload image url to cloudinary
    """
    try: 
        result = cloudinary.uploader.upload(image_url, tags=['til'])
        return result['secure_url']
    except Exception as e:
        print(f"Error uploading to cloudinary: {str(e)}")
        return None 


# if __name__ == "__main__":
#     secure_url = upload_image_from_url()
#     print('secure_url', secure_url)
