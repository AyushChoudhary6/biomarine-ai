#!/bin/bash

echo "Installing ArgoCD on EKS cluster..."

# Create argocd namespace and install
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
echo "Waiting for ArgoCD to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# Apply your ArgoCD project and applications
kubectl apply -f argocd/projects/biomarine-project.yaml
kubectl apply -f argocd/applications/biomarine-applications.yaml

echo "✅ ArgoCD installed and configured!"
echo "🔍 Check status: kubectl get pods -n argocd"
