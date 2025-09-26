# 🚀 Biomarine AI Deployment Workflow

## Overview
This document describes the complete CI/CD workflow: **ECR → ArgoCD → EKS → App Deployment**

## 🔄 Workflow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Push   │───▶│  GitHub Actions │───▶│      ECR        │───▶│     ArgoCD      │
│   (main/DevOps) │    │   Build & Push  │    │  Image Storage  │    │  Auto Sync      │
└─────────────────┘    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                                                              │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐            │
│  App Running    │◀───│   EKS Cluster   │◀───│  K8s Manifests  │◀───────────┘
│   (Deployed)    │    │   Deployment    │    │    Updated      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Step-by-Step Process

### 1. **Code Push Trigger**
- Developer pushes code to `main` or `DevOps` branch
- GitHub Actions workflow triggers automatically

### 2. **Testing Phase**
- Run backend tests (Node.js 18)
- Run frontend tests (Node.js 20)
- Lint frontend code
- All tests must pass before proceeding

### 3. **Build & Push to ECR**
- Configure AWS credentials using OIDC
- Login to Amazon ECR
- Build Docker images:
  - **Backend**: `./backend/Dockerfile`
  - **Frontend**: `./Dockerfile.frontend`
- Tag images with:
  - `latest` for main branch
  - `develop` for develop branch
  - `{short-sha}` for other branches
- Push images to ECR repositories:
  - `biomarine-backend`
  - `biomarine-frontend`

### 4. **Update Kubernetes Manifests**
- Update `K8/backend-deployment.yaml` with new backend image
- Update `K8/frontend-deployment.yaml` with new frontend image
- Commit and push changes back to repository

### 5. **ArgoCD Auto-Sync**
- ArgoCD detects changes in Git repository
- Automatically syncs with EKS cluster
- Deploys updated applications:
  - `biomarine-ai-backend` application
  - `biomarine-ai-frontend` application

### 6. **EKS Deployment**
- Kubernetes applies updated manifests
- Pods are recreated with new images
- Services and ingress are updated
- Health checks ensure successful deployment

## 🔧 Configuration Files

### ECR Repositories
- **Backend**: `biomarine-backend`
- **Frontend**: `biomarine-frontend`
- **Region**: `us-west-2`
- **Lifecycle**: Keeps last 10 production images, 5 develop images

### ArgoCD Applications
- **Project**: `biomarine-ai`
- **Applications**:
  - `biomarine-ai-backend`
  - `biomarine-ai-frontend`
- **Sync Policy**: Automated with self-heal
- **Target Namespace**: `biomarine`

### Kubernetes Resources
- **Namespace**: `biomarine`
- **Deployments**: Backend (2 replicas), Frontend (2 replicas)
- **Services**: ClusterIP for internal communication
- **Ingress**: External access configuration
- **ConfigMaps & Secrets**: Environment configuration

## 🚦 Deployment Status Verification

### Check ECR Images
```bash
aws ecr describe-images --repository-name biomarine-backend --region us-west-2
aws ecr describe-images --repository-name biomarine-frontend --region us-west-2
```

### Check ArgoCD Applications
```bash
kubectl get applications -n argocd
kubectl describe application biomarine-ai-backend -n argocd
kubectl describe application biomarine-ai-frontend -n argocd
```

### Check EKS Deployment
```bash
kubectl get pods -n biomarine
kubectl get svc -n biomarine
kubectl get ingress -n biomarine
kubectl rollout status deployment/biomarine-backend -n biomarine
kubectl rollout status deployment/biomarine-frontend -n biomarine
```

## 🔐 Required Secrets

### GitHub Secrets
- `AWS_ROLE_ARN`: IAM role for OIDC authentication
- Additional secrets for database connections, API keys, etc.

### AWS IAM Permissions
The GitHub Actions role needs:
- ECR: `ecr:GetAuthorizationToken`, `ecr:BatchCheckLayerAvailability`, `ecr:GetDownloadUrlForLayer`, `ecr:BatchGetImage`, `ecr:PutImage`
- EKS: `eks:DescribeCluster`, `eks:UpdateKubeconfig`
- STS: `sts:GetCallerIdentity`

## 🎯 Benefits of This Workflow

1. **Automated**: No manual intervention required
2. **GitOps**: All changes tracked in Git
3. **Secure**: Uses OIDC for AWS authentication
4. **Scalable**: ECR handles image storage and distribution
5. **Reliable**: ArgoCD ensures desired state
6. **Observable**: Full visibility into deployment status

## 🔄 Rollback Strategy

### Automatic Rollback
- ArgoCD can automatically rollback on failed health checks
- Kubernetes deployment rollback: `kubectl rollout undo deployment/biomarine-backend -n biomarine`

### Manual Rollback
1. Revert Git commit with image changes
2. ArgoCD will sync to previous state
3. Or manually update image tags in manifests

## 📊 Monitoring & Alerts

- **ArgoCD UI**: Monitor application sync status
- **Kubernetes Dashboard**: Monitor pod health
- **AWS CloudWatch**: Monitor ECR and EKS metrics
- **GitHub Actions**: Monitor build and deployment status

## 🚨 Troubleshooting

### Common Issues
1. **ECR Push Failed**: Check AWS credentials and permissions
2. **ArgoCD Not Syncing**: Check repository access and sync policies
3. **Pod CrashLoopBackOff**: Check image availability and resource limits
4. **Service Unavailable**: Check service configuration and ingress

### Debug Commands
```bash
# Check ArgoCD sync status
kubectl logs -n argocd deployment/argocd-application-controller

# Check pod logs
kubectl logs -n biomarine deployment/biomarine-backend
kubectl logs -n biomarine deployment/biomarine-frontend

# Check events
kubectl get events -n biomarine --sort-by='.lastTimestamp'
```

## 🎉 Success Indicators

✅ **GitHub Actions**: All jobs pass with green checkmarks
✅ **ECR**: New images appear with correct tags
✅ **ArgoCD**: Applications show "Synced" and "Healthy" status
✅ **EKS**: Pods are running and ready
✅ **Application**: Accessible via ingress endpoint

---

**Note**: This workflow ensures your application follows modern DevOps practices with automated testing, building, and deployment while maintaining security and reliability.
