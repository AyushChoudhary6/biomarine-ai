# 🌊 BioMarine-AI

> Advanced AI-Powered Marine Species Identification & Biodiversity Analysis Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff.svg)](https://vitejs.dev/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22.0-ff6f00.svg)](https://www.tensorflow.org/js)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [DevOps & Deployment](#-devops--deployment)
- [Project Structure](#-project-structure)
- [AI Models Integration](#-ai-models-integration)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

**BioMarine-AI** is a cutting-edge web application designed to revolutionize marine biology research through artificial intelligence. The platform enables researchers, marine biologists, and conservationists to identify marine species, analyze biodiversity patterns, and contribute to ocean conservation efforts.

### Key Objectives

- **Species Identification**: Use AI/ML models to identify marine species from images
- **Biodiversity Analysis**: Track and analyze marine biodiversity metrics
- **Research Tools**: Provide comprehensive tools for marine research
- **Data Visualization**: Interactive dashboards and geographic mapping
- **Conservation Support**: Aid in marine conservation and ecosystem health monitoring

## ✨ Features

### 🔬 Core Features

- **AI-Powered Species Classification**
  - Real-time image analysis using TensorFlow.js
  - Support for 10+ Indian Ocean marine species
  - Confidence scoring and multiple predictions
  - Browser-based inference (no server required)

- **Interactive Dashboard**
  - Real-time biodiversity metrics
  - Species distribution visualization
  - Ecosystem health indicators
  - Custom analytics and reports

- **Data Upload & Management**
  - Drag-and-drop image upload
  - Batch processing capabilities
  - Image preprocessing and optimization
  - Historical data tracking

- **Otolith Gallery**
  - Specialized otolith analysis tools
  - Species identification from otoliths
  - Research database integration

- **Research Portal**
  - Access to marine research papers
  - Species information database
  - Conservation status tracking
  - Geographic distribution maps

- **Geographic Analysis**
  - Indian Ocean region focus
  - Species distribution mapping
  - Environmental parameters visualization
  - Habitat analysis tools

### 🎨 User Experience

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark/Light theme support
  - Smooth animations with Framer Motion
  - Accessible and intuitive interface

- **Performance Optimized**
  - Code splitting and lazy loading
  - Optimized bundle sizes
  - Fast page loads
  - Progressive Web App (PWA) ready

## 🛠 Technology Stack

### Frontend Framework
- **React 19.1.1** - Component-based UI library
- **Vite 7.1.2** - Next-generation frontend tooling
- **React Router 7.8.2** - Client-side routing

### AI/ML Stack
- **TensorFlow.js 4.22.0** - Browser-based machine learning
- **Custom ML Models** - Marine species classification models

### Styling & UI
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Headless UI 2.2.7** - Unstyled accessible components
- **Framer Motion 12.23.12** - Animation library
- **Lucide React** - Beautiful icon library

### Data & State Management
- **TanStack React Query 5.87.4** - Server state management
- **Context API** - Global state management
- **Axios 1.11.0** - HTTP client

### Visualization
- **Recharts 3.2.0** - Composable charting library

### Development Tools
- **ESLint 9.33.0** - Code linting
- **PostCSS 8.5.6** - CSS transformation
- **Autoprefixer** - CSS vendor prefixing

## 📦 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### System Requirements

- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 1GB free space for dependencies

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AyushChoudhary6/biomarine-ai.git
cd biomarine-ai
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React and related libraries
- TensorFlow.js
- Tailwind CSS and UI components
- Development tools

### 3. Environment Configuration

Create a `.env` file in the root directory (optional):

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# AI Model Configuration
VITE_MODEL_URL=/models/marine-species

# Feature Flags
VITE_ENABLE_ANALYTICS=true
```

### 4. Verify Installation

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the application running.

## 💻 Development

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:5173
- **Network**: http://[your-ip]:5173

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

Fix linting issues automatically:

```bash
npm run lint -- --fix
```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide clear description
   - Link related issues
   - Request reviews

## 🏗 Building for Production

### Create Production Build

```bash
npm run build
```

This command:
- Minifies JavaScript and CSS
- Optimizes images and assets
- Creates production-ready bundles
- Outputs to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

This starts a local server to preview the production build at `http://localhost:4173`.

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].css      # Compiled CSS
│   ├── index-[hash].js       # Main JavaScript bundle
│   └── [chunks]-[hash].js    # Code-split chunks
├── index.html                # Entry HTML file
└── [other assets]            # Images, fonts, etc.
```

### Build Optimization Tips

1. **Code Splitting**: Utilize dynamic imports for large components
2. **Image Optimization**: Use WebP format and lazy loading
3. **Bundle Analysis**: Use `vite-bundle-visualizer` to analyze bundle size
4. **Tree Shaking**: Remove unused code automatically

## 🚢 DevOps & Deployment

This section provides comprehensive guidance on deploying, maintaining, and scaling the BioMarine-AI application in production environments.

### 📊 DevOps Overview

DevOps (Development Operations) is a set of practices that combines software development and IT operations. For BioMarine-AI, implementing DevOps ensures:

- **Faster Deployment**: Automated pipelines reduce deployment time from hours to minutes
- **Reliability**: Automated testing catches issues before they reach production
- **Scalability**: Infrastructure as Code (IaC) enables easy scaling
- **Maintainability**: Monitoring and logging help identify and fix issues quickly
- **Security**: Automated security scans and best practices protect the application

### 🐳 Containerization with Docker

Docker enables consistent environments across development, testing, and production.

#### Dockerfile for Production

Create a `Dockerfile` in the root directory:

```dockerfile
# Multi-stage build for optimized production image
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/json application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (if needed)
    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Docker Compose for Development

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # Frontend application
  biomarine-frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - biomarine-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Optional: Backend API service
  # biomarine-backend:
  #   image: biomarine-api:latest
  #   ports:
  #     - "3000:3000"
  #   environment:
  #     - DATABASE_URL=postgresql://user:password@db:5432/biomarine
  #   networks:
  #     - biomarine-network
  #   depends_on:
  #     - db

  # Optional: Database service
  # db:
  #   image: postgres:15-alpine
  #   environment:
  #     POSTGRES_DB: biomarine
  #     POSTGRES_USER: user
  #     POSTGRES_PASSWORD: password
  #   volumes:
  #     - postgres-data:/var/lib/postgresql/data
  #   networks:
  #     - biomarine-network

networks:
  biomarine-network:
    driver: bridge

volumes:
  postgres-data:
```

#### Docker Commands

```bash
# Build the Docker image
docker build -t biomarine-ai:latest .

# Run the container
docker run -d -p 80:80 --name biomarine-app biomarine-ai:latest

# View logs
docker logs -f biomarine-app

# Stop and remove container
docker stop biomarine-app && docker rm biomarine-app

# Using Docker Compose
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs -f        # View logs
docker-compose ps             # Check status
```

### 🔄 CI/CD Pipeline

Continuous Integration and Continuous Deployment automate the build, test, and deployment process.

#### GitHub Actions Workflow

Create `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  # Job 1: Lint and Test
  test:
    name: Lint and Test
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests (if available)
        run: npm test
        continue-on-error: true

      - name: Upload test coverage
        uses: codecov/codecov-action@v3
        if: success()

  # Job 2: Build and Security Scan
  build:
    name: Build and Security Scan
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Run security audit
        run: npm audit --audit-level=moderate
        continue-on-error: true

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
          retention-days: 7

  # Job 3: Build and Push Docker Image
  docker:
    name: Build Docker Image
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: yourusername/biomarine-ai
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Job 4: Deploy to Production
  deploy:
    name: Deploy to Production
    needs: docker
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://biomarine-ai.com
    
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: ${{ secrets.DEPLOY_USER }}
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            cd /opt/biomarine-ai
            docker-compose pull
            docker-compose up -d
            docker system prune -af
```

#### Pipeline Explanation

1. **Test Stage**
   - Checks out code from repository
   - Installs dependencies using npm ci (faster, more reliable)
   - Runs linting to ensure code quality
   - Executes tests (when available)
   - Uploads coverage reports

2. **Build Stage**
   - Creates production build
   - Runs security audits
   - Saves build artifacts

3. **Docker Stage**
   - Builds optimized Docker image
   - Tags with version and commit SHA
   - Pushes to Docker registry
   - Uses layer caching for faster builds

4. **Deploy Stage**
   - Connects to production server via SSH
   - Pulls latest Docker images
   - Restarts services with zero downtime
   - Cleans up old images

### 🌐 Deployment Platforms

#### 1. Vercel (Recommended for Frontend)

**Advantages:**
- Zero configuration deployment
- Automatic HTTPS and CDN
- Preview deployments for PRs
- Built-in performance monitoring

**Setup:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

**vercel.json Configuration:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### 2. Netlify

**Setup:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

**netlify.toml Configuration:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### 3. AWS S3 + CloudFront

**Setup Steps:**

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://biomarine-ai-frontend
   aws s3 website s3://biomarine-ai-frontend --index-document index.html
   ```

2. **Upload Build Files**
   ```bash
   npm run build
   aws s3 sync dist/ s3://biomarine-ai-frontend --delete
   ```

3. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Enable HTTPS
   - Configure caching rules
   - Set up custom domain

4. **Automate with GitHub Actions**
   ```yaml
   - name: Deploy to S3
     run: |
       aws s3 sync dist/ s3://biomarine-ai-frontend --delete
       aws cloudfront create-invalidation --distribution-id ${{ secrets.CF_DIST_ID }} --paths "/*"
     env:
       AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
       AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
   ```

#### 4. Google Cloud Platform (Cloud Run)

**Deploy as Container:**

```bash
# Build and tag image
docker build -t gcr.io/PROJECT_ID/biomarine-ai .

# Push to Google Container Registry
docker push gcr.io/PROJECT_ID/biomarine-ai

# Deploy to Cloud Run
gcloud run deploy biomarine-ai \
  --image gcr.io/PROJECT_ID/biomarine-ai \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### 5. DigitalOcean App Platform

**app.yaml Configuration:**

```yaml
name: biomarine-ai
services:
  - name: frontend
    github:
      repo: AyushChoudhary6/biomarine-ai
      branch: main
      deploy_on_push: true
    build_command: npm run build
    run_command: npm run preview
    environment_slug: node-js
    instance_count: 1
    instance_size_slug: basic-xxs
    routes:
      - path: /
```

### 🔐 Environment Management

#### Environment Variables

Different environments require different configurations:

**Development (.env.development):**
```env
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=false
```

**Staging (.env.staging):**
```env
VITE_APP_ENV=staging
VITE_API_URL=https://staging-api.biomarine-ai.com
VITE_ENABLE_DEBUG=true
VITE_ENABLE_ANALYTICS=true
```

**Production (.env.production):**
```env
VITE_APP_ENV=production
VITE_API_URL=https://api.biomarine-ai.com
VITE_ENABLE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
```

#### Managing Secrets

**GitHub Secrets:**
1. Go to repository Settings → Secrets and variables → Actions
2. Add secrets:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `DEPLOY_HOST`
   - `DEPLOY_USER`
   - `DEPLOY_KEY`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

**Best Practices:**
- Never commit secrets to version control
- Use `.env.local` for local secrets (add to .gitignore)
- Rotate secrets regularly
- Use different secrets per environment
- Implement least-privilege access

### 📈 Monitoring & Logging

#### Application Performance Monitoring (APM)

**1. Google Analytics**

```javascript
// src/utils/analytics.js
export const initAnalytics = () => {
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    // Initialize Google Analytics
    window.gtag('config', import.meta.env.VITE_GA_ID)
  }
}

export const trackEvent = (category, action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label
    })
  }
}
```

**2. Sentry for Error Tracking**

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react"

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.VITE_APP_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay()
    ]
  })
}
```

**3. Custom Logging Solution**

```javascript
// src/utils/logger.js
class Logger {
  constructor() {
    this.isProduction = import.meta.env.PROD
  }

  info(message, data = {}) {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, data)
    }
    this.sendToService('info', message, data)
  }

  error(message, error = null) {
    console.error(`[ERROR] ${message}`, error)
    this.sendToService('error', message, { error })
  }

  sendToService(level, message, data) {
    if (this.isProduction) {
      // Send to logging service
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, message, data, timestamp: Date.now() })
      })
    }
  }
}

export default new Logger()
```

#### Infrastructure Monitoring

**1. Docker Health Checks**

Monitor container health:
```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
docker stats biomarine-app
```

**2. Nginx Logs**

Access and error logs:
```bash
docker logs biomarine-app --tail 100 -f
```

**3. Prometheus + Grafana (Advanced)**

Monitor application metrics:
- Request rates
- Response times
- Error rates
- Resource usage

### 🔒 Security Best Practices

#### 1. Dependency Security

```bash
# Regular security audits
npm audit

# Fix vulnerabilities
npm audit fix

# Use Snyk for advanced scanning
npx snyk test
npx snyk monitor
```

#### 2. Content Security Policy (CSP)

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' data:;">
```

#### 3. HTTPS Enforcement

In nginx configuration:
```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name biomarine-ai.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name biomarine-ai.com;
    
    ssl_certificate /etc/ssl/certs/biomarine-ai.crt;
    ssl_certificate_key /etc/ssl/private/biomarine-ai.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
}
```

#### 4. Rate Limiting

Prevent abuse:
```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

location / {
    limit_req zone=mylimit burst=20 nodelay;
    try_files $uri /index.html;
}
```

### 🚀 Performance Optimization

#### 1. Code Splitting

```javascript
// Lazy load routes
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const AIModels = React.lazy(() => import('./pages/AIModels'))
```

#### 2. Bundle Analysis

```bash
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    visualizer({ open: true })
  ]
}
```

#### 3. Image Optimization

- Use WebP format
- Implement lazy loading
- Serve responsive images
- Use CDN for static assets

#### 4. Caching Strategy

```nginx
# Browser caching
location ~* \.(js|css)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 📊 Scaling Strategies

#### Horizontal Scaling

**Load Balancer Configuration:**

```nginx
upstream biomarine_frontend {
    least_conn;
    server frontend1:80 max_fails=3 fail_timeout=30s;
    server frontend2:80 max_fails=3 fail_timeout=30s;
    server frontend3:80 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    location / {
        proxy_pass http://biomarine_frontend;
    }
}
```

**Docker Swarm:**

```bash
docker swarm init
docker service create --name biomarine --replicas 3 -p 80:80 biomarine-ai:latest
docker service scale biomarine=5
```

**Kubernetes Deployment:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: biomarine-ai
spec:
  replicas: 3
  selector:
    matchLabels:
      app: biomarine-ai
  template:
    metadata:
      labels:
        app: biomarine-ai
    spec:
      containers:
      - name: frontend
        image: biomarine-ai:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### 🔄 Backup & Disaster Recovery

#### Backup Strategy

1. **Code Repository**: GitHub (automatic)
2. **User Data**: Regular database backups
3. **Configuration**: Version controlled
4. **Docker Images**: Registry backup

#### Disaster Recovery Plan

1. **Automated Backups**: Daily database snapshots
2. **Multi-region Deployment**: Reduce downtime
3. **Rollback Strategy**: Keep 5 previous versions
4. **Health Checks**: Automatic failover
5. **Documentation**: Recovery procedures

### 📝 DevOps Checklist

**Pre-Deployment:**
- [ ] All tests passing
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] SSL certificates ready
- [ ] Monitoring configured
- [ ] Backup strategy in place

**Deployment:**
- [ ] Build production version
- [ ] Run security scans
- [ ] Deploy to staging first
- [ ] Verify staging environment
- [ ] Deploy to production
- [ ] Verify production deployment
- [ ] Monitor for errors

**Post-Deployment:**
- [ ] Check application logs
- [ ] Verify all features working
- [ ] Monitor performance metrics
- [ ] Check error tracking
- [ ] Update documentation
- [ ] Notify stakeholders

## 📁 Project Structure

```
biomarine-ai/
├── .github/                    # GitHub Actions workflows
│   └── workflows/
│       └── ci-cd.yml          # CI/CD pipeline configuration
├── public/                     # Static public assets
│   ├── Bg.png                 # Background images
│   └── ...
├── src/                        # Source code
│   ├── assets/                # Project assets (images, fonts)
│   ├── components/            # React components
│   │   ├── layout/           # Layout components (Nav, Footer)
│   │   ├── ui/               # Reusable UI components
│   │   └── ...
│   ├── contexts/              # React Context providers
│   │   └── ThemeContext.jsx  # Theme management
│   ├── pages/                 # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Dashboard.jsx     # Analytics dashboard
│   │   ├── AIModels.jsx      # AI model interface
│   │   ├── DataUpload.jsx    # Data upload page
│   │   ├── OtolithGallery.jsx # Otolith gallery
│   │   ├── Research.jsx      # Research portal
│   │   ├── About.jsx         # About page
│   │   └── Contact.jsx       # Contact page
│   ├── utils/                 # Utility functions
│   │   ├── aiModel.js        # AI/ML model logic
│   │   └── modelDownloader.js # Model management
│   ├── App.jsx                # Main App component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── .gitignore                 # Git ignore rules
├── AI_INTEGRATION_GUIDE.md    # AI model integration guide
├── ENHANCED_AI_NOTES.md       # Enhanced AI documentation
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose configuration
├── nginx.conf                 # Nginx server configuration
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Project dependencies
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite build configuration
└── README.md                  # This file
```

## 🤖 AI Models Integration

The platform uses TensorFlow.js for browser-based machine learning. See [AI_INTEGRATION_GUIDE.md](./AI_INTEGRATION_GUIDE.md) for detailed instructions on:

- Loading pretrained models
- Custom model integration
- API-based model services
- Performance optimization
- Testing and validation

### Quick Start with AI Models

```javascript
import { MarineSpeciesClassifier } from './utils/aiModel'

const classifier = new MarineSpeciesClassifier()
await classifier.loadModel()

const results = await classifier.classifyImage(imageElement)
console.log('Species:', results.species)
console.log('Confidence:', results.confidence)
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- **Bug Reports**: Open an issue with detailed reproduction steps
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests with enhancements
- **Documentation**: Improve docs, add examples, fix typos
- **Testing**: Help test new features and report issues

### Contribution Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/AyushChoudhary6/biomarine-ai.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

4. **Commit Your Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Test additions/changes
   - `chore:` Maintenance tasks

5. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description
   - Link related issues
   - Request reviews from maintainers

### Code Style

- Use ESLint for code quality
- Follow React best practices
- Write meaningful variable names
- Add comments for complex logic
- Keep components small and focused

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

- **Author**: Ayush Choudhary
- **GitHub**: [@AyushChoudhary6](https://github.com/AyushChoudhary6)
- **Project**: [biomarine-ai](https://github.com/AyushChoudhary6/biomarine-ai)

### Support

- **Issues**: [GitHub Issues](https://github.com/AyushChoudhary6/biomarine-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AyushChoudhary6/biomarine-ai/discussions)

## 🙏 Acknowledgments

- **TensorFlow.js Team** - For the amazing ML framework
- **React Team** - For the powerful UI library
- **Vite Team** - For the blazing fast build tool
- **Open Source Community** - For the incredible tools and libraries
- **Marine Biology Community** - For domain expertise and data

---

<div align="center">

**Built with ❤️ for Marine Conservation**

[⭐ Star this repo](https://github.com/AyushChoudhary6/biomarine-ai) | [🐛 Report Bug](https://github.com/AyushChoudhary6/biomarine-ai/issues) | [✨ Request Feature](https://github.com/AyushChoudhary6/biomarine-ai/issues)

</div>
