# Biomarine AI - CI/CD Pipeline Setup

This document provides comprehensive instructions for setting up a complete CI/CD pipeline for the Biomarine AI application using GitHub Actions, AWS ECR, and ArgoCD on Amazon EKS.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  GitHub Actions │───▶│    AWS ECR      │───▶│    ArgoCD       │
│   (CI Pipeline) │    │ (Image Registry)│    │ (CD Pipeline)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Amazon EKS    │
                                               │    Cluster      │
                                               └─────────────────┘
```

### Pipeline Flow

1. **Developer pushes code** to GitHub repository
2. **GitHub Actions** triggers the CI pipeline:
   - Runs tests and linting
   - Builds Docker images for frontend and backend
   - Pushes images to AWS ECR with appropriate tags
   - Updates Kubernetes manifests with new image tags
3. **ArgoCD** detects changes in the repository:
   - Pulls updated Kubernetes manifests
   - Deploys applications to EKS cluster
   - Monitors application health and sync status

## 🛠️ Prerequisites

Before setting up the CI/CD pipeline, ensure you have the following tools installed:

### Required Tools

- **AWS CLI** (v2.x) - For AWS service interactions
- **kubectl** (v1.28+) - For Kubernetes cluster management
- **Terraform** (v1.5+) - For infrastructure as code
- **Docker** - For container operations
- **Git** - For version control

### Installation Commands

#### Windows (PowerShell)
```powershell
# Install using Chocolatey
choco install awscli kubernetes-cli terraform docker-desktop git

# Or install using winget
winget install Amazon.AWSCLI
winget install Kubernetes.kubectl
winget install HashiCorp.Terraform
winget install Docker.DockerDesktop
winget install Git.Git
```

#### macOS
```bash
# Install using Homebrew
brew install awscli kubectl terraform docker git
```

#### Linux (Ubuntu/Debian)
```bash
# AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Docker
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

#### For Windows:
```powershell
# Run the PowerShell setup script
.\setup-cicd.ps1
```

#### For Linux/macOS:
```bash
# Make the script executable and run it
chmod +x setup-cicd.sh
./setup-cicd.sh
```

### Option 2: Manual Setup

If you prefer to set up everything manually, follow the detailed steps below.

## 📋 Manual Setup Instructions

### Step 1: AWS Configuration

1. **Configure AWS CLI:**
   ```bash
   aws configure
   ```
   Provide your AWS Access Key ID, Secret Access Key, Default region (us-west-2), and Default output format (json).

2. **Verify AWS configuration:**
   ```bash
   aws sts get-caller-identity
   ```

### Step 2: Infrastructure Deployment

1. **Navigate to the Terraform directory:**
   ```bash
   cd terraform
   ```

2. **Initialize Terraform:**
   ```bash
   terraform init
   ```

3. **Review the deployment plan:**
   ```bash
   terraform plan -var="github_repository=AyushChoudhary6/biomarine-ai"
   ```

4. **Deploy the infrastructure:**
   ```bash
   terraform apply -var="github_repository=AyushChoudhary6/biomarine-ai" -auto-approve
   ```
   
   This will create:
   - EKS cluster with managed node groups
   - VPC with public and private subnets
   - ECR repositories for frontend and backend
   - IAM roles for GitHub Actions (OIDC)
   - ArgoCD installation

### Step 3: Configure kubectl

1. **Update kubeconfig:**
   ```bash
   # Get the cluster name from Terraform output
   CLUSTER_NAME=$(terraform output -raw cluster_name)
   aws eks update-kubeconfig --region us-west-2 --name $CLUSTER_NAME
   ```

2. **Verify cluster connection:**
   ```bash
   kubectl cluster-info
   kubectl get nodes
   ```

### Step 4: Update Kubernetes Manifests

1. **Get your AWS Account ID:**
   ```bash
   ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
   ```

2. **Update image references:**
   ```bash
   # Update backend deployment
   sed -i "s|ACCOUNT_ID|${ACCOUNT_ID}|g" K8/backend-deployment.yaml
   
   # Update frontend deployment
   sed -i "s|ACCOUNT_ID|${ACCOUNT_ID}|g" K8/frontend-deployment.yaml
   ```

### Step 5: GitHub Actions Configuration

1. **Get the GitHub Actions Role ARN:**
   ```bash
   cd terraform
   GITHUB_ACTIONS_ROLE_ARN=$(terraform output -raw github_actions_role_arn)
   echo "GitHub Actions Role ARN: $GITHUB_ACTIONS_ROLE_ARN"
   ```

2. **Configure GitHub Repository Secrets:**
   - Go to your GitHub repository: `https://github.com/AyushChoudhary6/biomarine-ai`
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Add the following repository secrets:
     - `AWS_REGION`: `us-west-2`
     - `AWS_ROLE_ARN`: `<the ARN from step 1>`

### Step 6: ArgoCD Access Setup

1. **Wait for ArgoCD to be ready:**
   ```bash
   kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
   ```

2. **Get ArgoCD admin password:**
   ```bash
   ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
   echo "ArgoCD Admin Password: $ARGOCD_PASSWORD"
   ```

3. **Access ArgoCD UI:**
   ```bash
   # Port forward to ArgoCD server
   kubectl port-forward svc/argocd-server -n argocd 8080:443
   ```
   
   Open your browser and go to: `https://localhost:8080`
   - Username: `admin`
   - Password: `<password from step 2>`

## 🔧 Configuration Details

### GitHub Actions Workflows

#### Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

This workflow triggers on pushes to `main`, `develop`, and `DevOps` branches:

1. **Test Job**: Runs tests and linting for both frontend and backend
2. **Build and Push Job**: 
   - Builds Docker images
   - Pushes to ECR with appropriate tags
   - Updates Kubernetes manifests
3. **Deploy Job**: Deploys to EKS (only for `main` branch)

#### ECR Setup (`.github/workflows/setup-ecr.yml`)

Creates ECR repositories with lifecycle policies if they don't exist.

### ECR Repositories

Two repositories are created:
- `biomarine-backend`: For the Node.js backend application
- `biomarine-frontend`: For the React frontend application

Both repositories include:
- Image vulnerability scanning
- Lifecycle policies to manage image retention
- AES256 encryption

### ArgoCD Applications

Two ArgoCD applications are configured:
- `biomarine-ai-backend`: Manages backend deployment
- `biomarine-ai-frontend`: Manages frontend deployment

Both applications:
- Use automated sync with self-healing
- Monitor the `main` branch of your repository
- Deploy to the `biomarine` namespace

## 🧪 Testing the Pipeline

### 1. Trigger the Pipeline

Make a change to your code and push to the `main` branch:

```bash
# Make a small change
echo "# Pipeline test" >> README.md

# Commit and push
git add README.md
git commit -m "Test CI/CD pipeline"
git push origin main
```

### 2. Monitor GitHub Actions

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. Watch the CI/CD pipeline execution

### 3. Monitor ArgoCD

1. Access ArgoCD UI (see Step 6 above)
2. Check the status of `biomarine-ai-backend` and `biomarine-ai-frontend` applications
3. Watch for sync and health status

### 4. Verify Deployment

```bash
# Check if pods are running
kubectl get pods -n biomarine

# Check services
kubectl get svc -n biomarine

# Check ingress
kubectl get ingress -n biomarine
```

## 🔍 Troubleshooting

### Common Issues

#### 1. GitHub Actions OIDC Issues
```bash
# Verify the OIDC provider exists
aws iam list-open-id-connect-providers

# Check the GitHub Actions role
aws iam get-role --role-name biomarine-ai-github-actions-role
```

#### 2. ECR Authentication Issues
```bash
# Test ECR login
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com
```

#### 3. EKS Access Issues
```bash
# Update kubeconfig
aws eks update-kubeconfig --region us-west-2 --name $(cd terraform && terraform output -raw cluster_name)

# Check cluster status
kubectl get nodes
kubectl cluster-info
```

#### 4. ArgoCD Sync Issues
```bash
# Check ArgoCD applications
kubectl get applications -n argocd

# Get application details
kubectl describe application biomarine-ai-backend -n argocd
kubectl describe application biomarine-ai-frontend -n argocd
```

### Logs and Debugging

#### GitHub Actions Logs
- Check the Actions tab in your GitHub repository
- Look for failed steps and error messages

#### ArgoCD Logs
```bash
# ArgoCD server logs
kubectl logs deployment/argocd-server -n argocd

# ArgoCD application controller logs
kubectl logs deployment/argocd-application-controller -n argocd
```

#### Application Logs
```bash
# Backend logs
kubectl logs deployment/biomarine-backend -n biomarine

# Frontend logs
kubectl logs deployment/biomarine-frontend -n biomarine
```

## 🔄 Updating the Pipeline

### Adding New Environments

1. Create new branches (e.g., `staging`, `production`)
2. Update the GitHub Actions workflow to handle new branches
3. Create separate ArgoCD applications for each environment
4. Update Terraform to create environment-specific resources

### Modifying Build Process

1. Update the Dockerfiles in `backend/Dockerfile` and `Dockerfile.frontend`
2. Modify the GitHub Actions workflow in `.github/workflows/ci-cd.yml`
3. Update ArgoCD application configurations if needed

### Scaling Deployments

1. Modify the replica counts in Kubernetes deployment files
2. Update resource requests and limits
3. Consider implementing Horizontal Pod Autoscaler (HPA)

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [AWS ECR User Guide](https://docs.aws.amazon.com/ecr/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

## 🤝 Contributing

When contributing to this project:

1. Create a feature branch from `develop`
2. Make your changes
3. Test locally using Docker Compose
4. Create a pull request to `develop`
5. After review, merge to `main` for production deployment

## 📞 Support

If you encounter issues with the CI/CD pipeline:

1. Check the troubleshooting section above
2. Review the logs from GitHub Actions and ArgoCD
3. Ensure all prerequisites are properly installed and configured
4. Verify AWS permissions and credentials

## 🏷️ Version Tags

The pipeline supports the following tagging strategy:

- `latest`: Images from the `main` branch
- `develop`: Images from the `develop` branch  
- `<commit-sha>`: Images from other branches (first 7 characters of commit SHA)

This ensures proper image versioning and rollback capabilities.