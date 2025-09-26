#!/bin/bash

set -e

REGION="us-west-2"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "🚀 Minimal deployment - ECR images already pushed!"
echo "Account ID: $ACCOUNT_ID"

# Update K8s manifests with actual ECR URIs
echo "📝 Updating Kubernetes manifests..."
sed -i "s|image: .*biomarine-backend.*|image: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-backend:latest|g" K8/backend-deployment.yaml
sed -i "s|image: .*biomarine-frontend.*|image: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-frontend:latest|g" K8/frontend-deployment.yaml

echo "✅ Manifests updated with ECR images:"
echo "Backend: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-backend:latest"
echo "Frontend: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/biomarine-frontend:latest"

echo ""
echo "🎉 Ready for deployment!"
echo "📋 Next steps:"
echo "1. Create EKS cluster: eksctl create cluster --name biomarine-eks --region us-west-2 --nodes 2"
echo "2. Install ArgoCD: kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml"
echo "3. Apply ArgoCD configs: kubectl apply -f argocd/"
echo "4. Deploy app: kubectl apply -f K8/"
