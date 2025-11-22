from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import sys
import numpy as np
from PIL import Image
import io
import base64
import logging

# Add models directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'models-ai'))

from inference import EmbeddingClassifier


# Configure logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Global classifier variable
classifier = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def initialize_classifier():
    """Initialize the EmbeddingClassifier with model and data paths"""
    global classifier
    try:
        model_path = os.path.join(os.path.dirname(__file__), 'models-ai', 'model.ts')
        data_path = os.path.join(os.path.dirname(__file__), 'models-ai', 'database.pt')
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        if not os.path.exists(data_path):
            raise FileNotFoundError(f"Database file not found: {data_path}")
            
        classifier = EmbeddingClassifier(model_path=model_path, data_set_path=data_path)
        logging.info("Classifier initialized successfully")
        return True
    except Exception as e:
        logging.error(f"Failed to initialize classifier: {str(e)}")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'classifier_loaded': classifier is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Predict fish species from uploaded image"""
    global classifier
    
    if classifier is None:
        return jsonify({'error': 'Classifier not initialized'}), 500
    
    try:
        # Check if image was uploaded
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed types: png, jpg, jpeg, gif, bmp'}), 400
        
        # Read image data
        image_data = file.read()
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert to numpy array
        image_np = np.array(image)
        
        # Get prediction from classifier
        results = classifier.inference_numpy(image_np)
        
        # Format results for frontend
        formatted_results = []
        for result in results:
            formatted_results.append({
                'name': result['name'],
                'species_id': result.get('species_id', 'Unknown'),
                'accuracy': result.get('accuracy', 0.0),
                'confidence': result.get('distance', 0.0),
                'times': result.get('times', 0)
            })
        
        return jsonify({
            'success': True,
            'predictions': formatted_results,
            'top_prediction': formatted_results[0] if formatted_results else None
        })
        
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/predict_base64', methods=['POST'])
def predict_base64():
    """Predict fish species from base64 encoded image"""
    global classifier
    
    if classifier is None:
        return jsonify({'error': 'Classifier not initialized'}), 500
    
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image']
        
        # Remove data:image/jpeg;base64, prefix if present
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        # Decode base64
        image_bytes = base64.b64decode(image_data)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert to numpy array
        image_np = np.array(image)
        
        # Get prediction from classifier
        results = classifier.inference_numpy(image_np)
        
        # Format results for frontend
        formatted_results = []
        for result in results:
            formatted_results.append({
                'name': result['name'],
                'species_id': result.get('species_id', 'Unknown'),
                'accuracy': result.get('accuracy', 0.0),
                'confidence': result.get('distance', 0.0),
                'times': result.get('times', 0)
            })
        
        return jsonify({
            'success': True,
            'predictions': formatted_results,
            'top_prediction': formatted_results[0] if formatted_results else None
        })
        
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("Initializing Fish Classification API...")
    
    if initialize_classifier():
        print("✓ Classifier initialized successfully")
        print("Starting Flask server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("✗ Failed to initialize classifier. Please check model files.")
        sys.exit(1)