# AI Model Integration Guide

## Marine Species Classification System

This document explains how to integrate real pretrained models for marine species identification in the BioMarine-AI platform.

## Current Implementation

### Mock AI Model Integration
The current system includes:
- **TensorFlow.js integration** for browser-based inference
- **Marine Species Classifier** with Indian Ocean species database
- **Real-time image analysis** with biodiversity metrics
- **Geographical mapping** of species distribution

### Features Implemented

1. **Image Upload & Analysis**
   - Drag & drop image upload
   - Real-time image preprocessing
   - Species identification with confidence scores
   - Biodiversity analysis

2. **Species Database**
   - 10+ Indian Ocean marine species
   - Scientific names and classifications
   - Habitat and distribution information
   - Conservation status

3. **Geographical Analysis**
   - Indian Ocean region mapping
   - Species distribution visualization
   - Environmental parameters (temperature, salinity, depth)

4. **Biodiversity Metrics**
   - Ecosystem health assessment
   - Species diversity indices
   - Endemic and threatened species counts

## Integrating Real Pretrained Models

### Option 1: TensorFlow.js Pretrained Models

```javascript
// Replace the mock model in aiModel.js with a real pretrained model
async loadModel() {
  try {
    // Load your actual marine species classification model
    this.model = await tf.loadLayersModel('https://your-model-host.com/models/marine-species/model.json')
    
    // Or load from local files
    this.model = await tf.loadLayersModel('/models/marine-species-classifier/model.json')
    
    this.isLoaded = true
    return true
  } catch (error) {
    console.error('Failed to load model:', error)
    return false
  }
}
```

### Option 2: API-based Models

```javascript
// Use external AI services like Google Vision API, AWS Rekognition, or custom APIs
async classifyImage(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  
  const response = await fetch('https://api.your-service.com/classify', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  })
  
  const result = await response.json()
  return this.processAPIResult(result)
}
```

### Option 3: Hugging Face Models

```javascript
// Use Hugging Face Transformers.js for browser-based inference
import { pipeline } from '@xenova/transformers'

async loadModel() {
  this.classifier = await pipeline('image-classification', 'your-model/marine-species-classifier')
  this.isLoaded = true
}

async classifyImage(imageElement) {
  const results = await this.classifier(imageElement)
  return this.processHuggingFaceResults(results)
}
```

## Recommended Pretrained Models

### 1. General Vision Models (Fine-tuned)
- **ResNet50** - Good for general image classification
- **MobileNetV3** - Lightweight for mobile/web deployment
- **EfficientNet** - Balance of accuracy and efficiency

### 2. Marine-specific Models
- **PlanktonNet** - For plankton classification
- **FishNet** - Fish species identification
- **Custom CNN** - Trained on Indian Ocean species

### 3. Available Datasets for Training
- **FishCLEF** - Fish species classification dataset
- **Fish4Knowledge** - Underwater fish species
- **Marine Species Database** - Global marine biodiversity data

## Implementation Steps

### Step 1: Model Preparation
1. Choose or train your model
2. Convert to TensorFlow.js format if needed
3. Host model files (JSON + binary weights)

### Step 2: Update aiModel.js
```javascript
// Update the MarineSpeciesClassifier class
export class MarineSpeciesClassifier {
  async loadModel() {
    // Your real model loading code here
    this.model = await tf.loadLayersModel('path/to/your/model.json')
  }
  
  async classifyImage(imageElement) {
    // Your real classification code here
    const predictions = await this.model.predict(preprocessed)
    return this.processResults(predictions)
  }
}
```

### Step 3: Update Species Database
```javascript
// Expand the species database with real data
const speciesDB = {
  'Rastrelliger kanagurta': {
    commonName: 'Indian Mackerel',
    scientificName: 'Rastrelliger kanagurta',
    // Add comprehensive species data
  },
  // Add more species...
}
```

### Step 4: Configure Geographic Data
```javascript
// Update coordinates and regions with real data
const coordinates = {
  'Indian Mackerel': { 
    lat: 13.0827, 
    lng: 80.2707, 
    region: 'Bay of Bengal',
    depth: '10-200m',
    temperature: '24-30°C'
  }
}
```

## Performance Optimization

### 1. Model Size
- Use quantized models for faster loading
- Consider model pruning for web deployment

### 2. Preprocessing
- Implement efficient image resizing
- Use Web Workers for heavy processing

### 3. Caching
- Cache model files in browser
- Store analysis results locally

## Testing & Validation

### 1. Accuracy Testing
```javascript
// Test with known species images
const testImages = [
  { image: 'mackerel.jpg', expectedSpecies: 'Indian Mackerel' },
  // Add more test cases
]

testImages.forEach(async (test) => {
  const result = await classifier.classifyImage(test.image)
  console.log('Expected:', test.expectedSpecies, 'Got:', result.species)
})
```

### 2. Performance Monitoring
- Track inference time
- Monitor memory usage
- Log classification confidence scores

## Security Considerations

1. **API Keys** - Store securely, never in client code
2. **Image Data** - Ensure proper data handling and privacy
3. **Model Files** - Verify integrity and authenticity

## Deployment

### Production Checklist
- [ ] Model files hosted on CDN
- [ ] Error handling for network failures
- [ ] Fallback mechanisms implemented
- [ ] Performance monitoring setup
- [ ] User feedback collection enabled

## Future Enhancements

1. **Real-time Video Analysis** - Process live video streams
2. **Batch Processing** - Handle multiple images at once
3. **Advanced Metrics** - Implement more biodiversity indices
4. **User Training** - Allow users to improve model accuracy
5. **Mobile App** - Native mobile implementation

## Support

For technical support or questions about model integration:
- Check the TensorFlow.js documentation
- Review marine biology databases
- Contact the development team

## References

- [TensorFlow.js Guide](https://www.tensorflow.org/js)
- [Marine Species Databases](https://www.fishbase.org/)
- [Computer Vision for Marine Biology](https://oceanexplorer.noaa.gov/)
- [Indian Ocean Marine Life](https://www.ioraims.org/)
