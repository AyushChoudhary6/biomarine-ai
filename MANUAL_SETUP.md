# Manual Setup Steps for Biomarine AI Deployment

This document outlines the manual steps required to deploy the Biomarine AI application, excluding the automated CI/CD pipeline.

## Prerequisites

- AWS CLI installed and configured
- kubectl installed
- eksctl installed
- Docker installed (for local testing)

## 1. AWS IAM Setup

### Create GitHub Actions Role
```bash
# Create trust policy for GitHub Actions
aws iam create-role \
  --role-name GitHubActionsRole \
  --assume-role-policy-document file://github-trust-policy.json

# Add ECR permissions
aws iam put-role-policy \
  --role-name GitHubActionsRole \
  --policy-name ECRAccess \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:DescribeRepositories",
        "ecr:CreateRepository",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage"
      ],
      "Resource": "*"
    }]
  }'

# Add EKS permissions
aws iam put-role-policy \
  --role-name GitHubActionsRole \
  --policy-name EKSAccess \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": [
        "eks:DescribeCluster",
        "eks:ListClusters",
        "eks:DescribeNodegroup",
        "eks:ListNodegroups"
      ],
      "Resource": "*"
    }]
  }'

# Add Kubernetes access permissions
aws iam put-role-policy \
  --role-name GitHubActionsRole \
  --policy-name KubernetesAccess \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Action": [
        "eks:AccessKubernetesApi",
        "eks:DescribeCluster",
        "eks:ListClusters",
        "eks:DescribeNodegroup",
        "eks:ListNodegroups",
        "eks:DescribeAddon",
        "eks:ListAddons"
      ],
      "Resource": "*"
    }]
  }'
```

## 2. ECR Repository Setup

### Create ECR Repositories
```bash
# Create backend repository
aws ecr create-repository --repository-name biomarine-backend --region us-west-2

# Create frontend repository
aws ecr create-repository --repository-name biomarine-frontend --region us-west-2
```

## 3. EKS Cluster Setup

### Create EKS Cluster
```bash
eksctl create cluster \
  --name biomarine-eks \
  --region us-west-2 \
  --nodegroup-name biomarine-nodes \
  --node-type t3.medium \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3
```

### Add GitHub Actions Role to EKS
```bash
eksctl create iamidentitymapping \
  --cluster biomarine-eks \
  --region us-west-2 \
  --arn arn:aws:iam::245991315809:role/GitHubActionsRole \
  --group system:masters \
  --username github-actions
```

## 4. ArgoCD Installation

### Install ArgoCD
```bash
# Create ArgoCD namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Expose ArgoCD server
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
```

### Get ArgoCD Admin Password
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

## 5. Application Deployment

### Deploy Application Manifests
```bash
# Apply all Kubernetes manifests
kubectl apply -f K8/

# Expose frontend service
kubectl patch svc biomarine-frontend -n biomarine -p '{"spec": {"type": "LoadBalancer"}}'
```

### Update Image Tags (if needed)
```bash
# Update frontend image
kubectl set image deployment/biomarine-frontend \
  frontend=245991315809.dkr.ecr.us-west-2.amazonaws.com/biomarine-frontend:TAG \
  -n biomarine

# Update backend image
kubectl set image deployment/biomarine-backend \
  backend=245991315809.dkr.ecr.us-west-2.amazonaws.com/biomarine-backend:TAG \
  -n biomarine
```

## 6. Get Application URLs

### Check Service Status
```bash
# Get all services
kubectl get services --all-namespaces

# Get frontend URL
kubectl get svc biomarine-frontend -n biomarine

# Get ArgoCD URL
kubectl get svc argocd-server -n argocd
```

## 7. GitHub Repository Setup

### Required Secrets
Add these secrets to your GitHub repository:
- `AWS_ACCOUNT_ID`: Your AWS account ID (245991315809)
- `AWS_REGION`: us-west-2
- `GITHUB_ACTIONS_ROLE_ARN`: arn:aws:iam::245991315809:role/GitHubActionsRole

### Repository Settings
1. Go to Settings > Actions > General
2. Enable "Allow GitHub Actions to create and approve pull requests"
3. Set workflow permissions to "Read and write permissions"

## 8. Verification Steps

### Check Deployment Status
```bash
# Check pods
kubectl get pods -n biomarine

# Check services
kubectl get svc -n biomarine

# Check ingress
kubectl get ingress -n biomarine

# Check logs
kubectl logs -f deployment/biomarine-frontend -n biomarine
kubectl logs -f deployment/biomarine-backend -n biomarine
```

### Test Application
1. Access frontend URL from LoadBalancer
2. Verify ArgoCD dashboard access
3. Check application functionality

## 9. Cleanup (Optional)

### Delete Resources
```bash
# Delete EKS cluster
eksctl delete cluster --name biomarine-eks --region us-west-2

# Delete ECR repositories
aws ecr delete-repository --repository-name biomarine-backend --region us-west-2 --force
aws ecr delete-repository --repository-name biomarine-frontend --region us-west-2 --force

# Delete IAM role
aws iam delete-role-policy --role-name GitHubActionsRole --policy-name ECRAccess
aws iam delete-role-policy --role-name GitHubActionsRole --policy-name EKSAccess
aws iam delete-role-policy --role-name GitHubActionsRole --policy-name KubernetesAccess
aws iam delete-role --role-name GitHubActionsRole
```

## Troubleshooting

### Common Issues

1. **ImagePullBackOff**: Check ECR repository exists and image tag is correct
2. **LoadBalancer Pending**: Wait 2-3 minutes for AWS to provision
3. **ArgoCD Access**: Use admin username with generated password
4. **GitHub Actions Permissions**: Verify IAM role has correct policies

### Useful Commands
```bash
# Check pod logs
kubectl logs -f <pod-name> -n biomarine

# Describe pod for events
kubectl describe pod <pod-name> -n biomarine

# Check ECR images
aws ecr describe-images --repository-name biomarine-frontend --region us-west-2

# Update kubeconfig
aws eks update-kubeconfig --region us-west-2 --name biomarine-eks
```

## Notes

- Replace `245991315809` with your actual AWS account ID
- Ensure all commands are run in the correct AWS region (us-west-2)
- The pipeline automates image building and deployment, but these manual steps are required for initial setup
- Keep your GitHub secrets secure and rotate them regularly
