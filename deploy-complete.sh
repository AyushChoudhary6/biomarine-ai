#!/bin/bash

set -e

REGION="us-west-2"
CLUSTER_NAME="biomarine-eks"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "🚀 Starting complete deployment process..."
echo "Account ID: $ACCOUNT_ID"
echo "Region: $REGION"

# Step 1: Create ECR repositories
echo "📦 Step 1: Creating ECR repositories..."
aws ecr create-repository --repository-name biomarine-backend --region $REGION 2>/dev/null || echo "Backend repo exists"
aws ecr create-repository --repository-name biomarine-frontend --region $REGION 2>/dev/null || echo "Frontend repo exists"

# Step 2: Build and push images to ECR
echo "🐳 Step 2: Building and pushing images to ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Build and push backend
docker build -t $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-backend:latest ./backend
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-backend:latest

# Build and push frontend
docker build -t $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-frontend:latest -f Dockerfile.frontend .
docker push $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-frontend:latest

echo "✅ Images pushed to ECR"

# Step 3: Create EKS cluster (if not exists)
echo "☸️ Step 3: Creating EKS cluster..."
if ! aws eks describe-cluster --name $CLUSTER_NAME --region $REGION >/dev/null 2>&1; then
    echo "Creating EKS cluster (this takes 10-15 minutes)..."
    eksctl create cluster --name $CLUSTER_NAME --region $REGION --nodes 2 --node-type t3.medium
else
    echo "EKS cluster already exists"
fi

# Update kubeconfig
aws eks update-kubeconfig --region $REGION --name $CLUSTER_NAME

# Step 4: Install ArgoCD
echo "🔄 Step 4: Installing ArgoCD..."
kubectl create namespace argocd 2>/dev/null || echo "ArgoCD namespace exists"
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

echo "Waiting for ArgoCD to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# Step 5: Update K8s manifests with actual ECR URIs
echo "📝 Step 5: Updating Kubernetes manifests..."
sed -i "s|image: .*biomarine-backend.*|image: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-backend:latest|g" K8/backend-deployment.yaml
sed -i "s|image: .*biomarine-frontend.*|image: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-frontend:latest|g" K8/frontend-deployment.yaml

# Step 6: Apply ArgoCD configurations
echo "⚙️ Step 6: Configuring ArgoCD..."
kubectl apply -f argocd/projects/biomarine-project.yaml
kubectl apply -f argocd/applications/biomarine-applications.yaml

# Step 7: Deploy application
echo "🚀 Step 7: Deploying application..."
kubectl apply -f K8/namespace.yaml
kubectl apply -f K8/configmap.yaml
kubectl apply -f K8/secrets.yaml
kubectl apply -f K8/backend-deployment.yaml
kubectl apply -f K8/frontend-deployment.yaml
kubectl apply -f K8/ingress.yaml

# Step 8: Wait for deployment
echo "⏳ Step 8: Waiting for deployment to be ready..."
kubectl rollout status deployment/biomarine-backend -n biomarine --timeout=300s
kubectl rollout status deployment/biomarine-frontend -n biomarine --timeout=300s

# Step 9: Show status
echo "📊 Step 9: Deployment status..."
kubectl get pods -n biomarine
kubectl get svc -n biomarine
kubectl get ingress -n biomarine

echo ""
echo "🎉 Deployment complete!"
echo "✅ ECR images pushed"
echo "✅ EKS cluster ready"
echo "✅ ArgoCD installed"
echo "✅ Application deployed"
echo ""
echo "🔍 Check ArgoCD UI:"
echo "kubectl port-forward svc/argocd-server -n argocd 8080:443"
echo "Then visit: https://localhost:8080"
