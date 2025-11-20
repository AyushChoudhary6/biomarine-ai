# 🚀 Deployment Guide for BioMarine-AI

This guide provides detailed instructions for deploying BioMarine-AI to various platforms and environments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Platform-Specific Deployments](#platform-specific-deployments)
  - [Vercel](#vercel-deployment)
  - [Netlify](#netlify-deployment)
  - [AWS](#aws-deployment)
  - [Google Cloud](#google-cloud-deployment)
  - [DigitalOcean](#digitalocean-deployment)
  - [Docker/Self-Hosted](#docker-self-hosted)
- [Environment Configuration](#environment-configuration)
- [SSL/TLS Setup](#ssltls-setup)
- [Performance Optimization](#performance-optimization)
- [Monitoring Setup](#monitoring-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- [ ] Repository access and permissions
- [ ] Production build tested locally
- [ ] Environment variables configured
- [ ] Domain name (if using custom domain)
- [ ] SSL certificate (if self-hosting)
- [ ] CI/CD pipeline configured (optional but recommended)

## Platform-Specific Deployments

### Vercel Deployment

**Best for**: Quick deployments, serverless, automatic scaling

#### Setup

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

#### Configuration

Create `vercel.json`:
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
  ],
  "env": {
    "VITE_API_URL": "@api-url",
    "VITE_ENABLE_ANALYTICS": "true"
  }
}
```

#### Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records (provided by Vercel)
4. Wait for SSL certificate provisioning

---

### Netlify Deployment

**Best for**: Simple hosting, form handling, serverless functions

#### Setup via CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

#### Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"
  
[build.environment]
  NODE_VERSION = "18"
  VITE_API_URL = "https://api.biomarine-ai.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
    
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

#### GitHub Integration

1. Connect your GitHub repository
2. Configure build settings
3. Enable automatic deployments on push
4. Set up deploy previews for PRs

---

### AWS Deployment

**Best for**: Enterprise, full control, scalability

#### Option 1: S3 + CloudFront

**Step 1: Create S3 Bucket**
```bash
aws s3 mb s3://biomarine-ai-prod
aws s3 website s3://biomarine-ai-prod \
  --index-document index.html \
  --error-document index.html
```

**Step 2: Configure Bucket Policy**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::biomarine-ai-prod/*"
    }
  ]
}
```

**Step 3: Build and Upload**
```bash
npm run build
aws s3 sync dist/ s3://biomarine-ai-prod --delete
```

**Step 4: Create CloudFront Distribution**
1. Go to CloudFront console
2. Create distribution with S3 as origin
3. Configure caching behaviors
4. Add SSL certificate
5. Set custom domain (CNAME)

**Step 5: Invalidate Cache**
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

#### Option 2: ECS with Fargate

**Deploy containerized application**:

1. **Push Image to ECR**
   ```bash
   aws ecr get-login-password --region us-east-1 | \
     docker login --username AWS --password-stdin \
     ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
   
   docker build -t biomarine-ai .
   docker tag biomarine-ai:latest \
     ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/biomarine-ai:latest
   docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/biomarine-ai:latest
   ```

2. **Create ECS Task Definition**
3. **Create ECS Service**
4. **Configure Load Balancer**

---

### Google Cloud Deployment

**Best for**: Google ecosystem integration, Cloud Run

#### Cloud Run Deployment

1. **Build Container**
   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/biomarine-ai
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy biomarine-ai \
     --image gcr.io/PROJECT_ID/biomarine-ai \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars "NODE_ENV=production" \
     --memory 512Mi \
     --cpu 1
   ```

3. **Map Custom Domain**
   ```bash
   gcloud run domain-mappings create \
     --service biomarine-ai \
     --domain biomarine-ai.com \
     --region us-central1
   ```

#### Cloud Storage + CDN

1. **Create Bucket**
   ```bash
   gsutil mb gs://biomarine-ai-frontend
   gsutil web set -m index.html -e index.html gs://biomarine-ai-frontend
   ```

2. **Upload Files**
   ```bash
   npm run build
   gsutil -m cp -r dist/* gs://biomarine-ai-frontend
   ```

3. **Make Public**
   ```bash
   gsutil iam ch allUsers:objectViewer gs://biomarine-ai-frontend
   ```

4. **Enable Cloud CDN**

---

### DigitalOcean Deployment

**Best for**: Simple VPS hosting, affordable pricing

#### App Platform

1. **Connect GitHub Repository**
2. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add as needed

3. **Deploy**: Automatic on push to main branch

#### Droplet (VPS) Deployment

1. **Create Droplet**
   - Ubuntu 22.04
   - 2GB RAM minimum
   - Enable backups

2. **SSH into Droplet**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Dependencies**
   ```bash
   apt update && apt upgrade -y
   apt install -y nginx docker.io docker-compose
   ```

4. **Clone Repository**
   ```bash
   cd /opt
   git clone https://github.com/AyushChoudhary6/biomarine-ai.git
   cd biomarine-ai
   ```

5. **Deploy with Docker**
   ```bash
   docker-compose up -d
   ```

6. **Configure Nginx** (if not using Docker)
   ```nginx
   server {
       listen 80;
       server_name biomarine-ai.com;
       root /opt/biomarine-ai/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d biomarine-ai.com -d www.biomarine-ai.com
   ```

---

### Docker Self-Hosted

**Best for**: Full control, hybrid cloud, on-premises

#### Single Container Deployment

1. **Build Image**
   ```bash
   docker build -t biomarine-ai:latest .
   ```

2. **Run Container**
   ```bash
   docker run -d \
     -p 80:80 \
     --name biomarine-app \
     --restart unless-stopped \
     -e NODE_ENV=production \
     biomarine-ai:latest
   ```

3. **Check Logs**
   ```bash
   docker logs -f biomarine-app
   ```

#### Docker Compose Deployment

1. **Configure docker-compose.yml** (already created)

2. **Deploy**
   ```bash
   docker-compose up -d
   ```

3. **Scale Services**
   ```bash
   docker-compose up -d --scale biomarine-frontend=3
   ```

4. **Update**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

#### Docker Swarm (Multi-node)

1. **Initialize Swarm**
   ```bash
   docker swarm init
   ```

2. **Deploy Stack**
   ```bash
   docker stack deploy -c docker-compose.yml biomarine
   ```

3. **Scale Service**
   ```bash
   docker service scale biomarine_frontend=5
   ```

---

## Environment Configuration

### Production Environment Variables

Create `.env.production`:
```env
# Production settings
VITE_APP_ENV=production
VITE_API_URL=https://api.biomarine-ai.com

# Analytics
VITE_ENABLE_ANALYTICS=true
VITE_GA_ID=G-XXXXXXXXXX

# Error Tracking
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Feature Flags
VITE_ENABLE_DEBUG=false
VITE_ENABLE_OTOLITH_ANALYSIS=true

# CDN
VITE_CDN_URL=https://cdn.biomarine-ai.com
```

### Injecting Environment Variables

**Build Time** (Vite):
```bash
VITE_API_URL=https://api.example.com npm run build
```

**Runtime** (Docker):
```bash
docker run -e VITE_API_URL=https://api.example.com biomarine-ai
```

**CI/CD** (GitHub Actions):
```yaml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
```

---

## SSL/TLS Setup

### Let's Encrypt (Free SSL)

**For Nginx**:
```bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d biomarine-ai.com

# Auto-renewal
certbot renew --dry-run
```

**For Apache**:
```bash
apt install certbot python3-certbot-apache
certbot --apache -d biomarine-ai.com
```

### Custom SSL Certificate

**Nginx Configuration**:
```nginx
server {
    listen 443 ssl http2;
    server_name biomarine-ai.com;
    
    ssl_certificate /etc/ssl/certs/biomarine-ai.crt;
    ssl_certificate_key /etc/ssl/private/biomarine-ai.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000" always;
}
```

---

## Performance Optimization

### CDN Setup

**CloudFlare**:
1. Add site to CloudFlare
2. Update nameservers
3. Enable caching rules
4. Enable auto minification
5. Configure page rules

**AWS CloudFront**:
- Cache static assets
- Enable compression
- Set TTL policies
- Configure invalidations

### Caching Strategy

**Nginx**:
```nginx
# Static assets - long cache
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML - no cache
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}
```

### Compression

**Enable Gzip**:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript 
           application/x-javascript application/xml+rss 
           application/json application/javascript;
```

---

## Monitoring Setup

### Application Monitoring

**Sentry Integration**:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

**Google Analytics**:
```html
<!-- Global site tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Infrastructure Monitoring

**Uptime Monitoring**:
- UptimeRobot
- Pingdom
- StatusCake

**Log Aggregation**:
- ELK Stack (Elasticsearch, Logstash, Kibana)
- CloudWatch (AWS)
- Stackdriver (GCP)

---

## Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+
```

**404 on Refresh**:
- Configure server to serve `index.html` for all routes
- Update `.htaccess`, `nginx.conf`, or platform config

**Environment Variables Not Working**:
- Ensure variables start with `VITE_`
- Rebuild after changing env vars
- Check variable is imported correctly

**CORS Issues**:
```nginx
# Add CORS headers
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
```

**Performance Issues**:
- Enable compression
- Optimize images
- Enable CDN
- Check bundle size

### Health Check Endpoint

Create a simple health check:
```javascript
// public/health
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

## Rollback Strategy

### Quick Rollback

**Vercel/Netlify**:
- Use dashboard to rollback to previous deployment
- Or redeploy specific commit

**Docker**:
```bash
# Keep previous images
docker tag biomarine-ai:latest biomarine-ai:previous
docker-compose down
docker-compose up -d biomarine-ai:previous
```

**Git-based**:
```bash
git revert HEAD
git push origin main
```

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Dependencies updated
- [ ] Audit logs enabled
- [ ] Rate limiting configured
- [ ] Firewall rules set
- [ ] Backup strategy in place

---

## Support

For deployment assistance:
- Check the main [README.md](./README.md)
- Open an [issue](https://github.com/AyushChoudhary6/biomarine-ai/issues)
- Refer to platform-specific documentation

---

**Happy Deploying! 🚀**
