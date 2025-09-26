#!/bin/bash

# Biomarine AI - CI/CD Setup Script
# This script helps set up the complete CI/CD pipeline

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="us-west-2"
CLUSTER_NAME="biomarine-ai"
GITHUB_REPO="AyushChoudhary6/biomarine-ai"

echo -e "${BLUE}🚀 Biomarine AI CI/CD Setup${NC}"
echo "=================================="

# Check prerequisites
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}❌ Terraform is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites are installed${NC}"

# Check AWS credentials
echo -e "${YELLOW}🔐 Checking AWS credentials...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS credentials configured for account: ${ACCOUNT_ID}${NC}"

# Function to update image references with actual account ID
update_image_refs() {
    echo -e "${YELLOW}🔄 Updating Kubernetes manifests with ECR URLs...${NC}"
    
    # Update backend deployment
    sed -i.bak "s|ACCOUNT_ID|${ACCOUNT_ID}|g" K8/backend-deployment.yaml
    
    # Update frontend deployment
    sed -i.bak "s|ACCOUNT_ID|${ACCOUNT_ID}|g" K8/frontend-deployment.yaml
    
    echo -e "${GREEN}✅ Kubernetes manifests updated${NC}"
}

# Function to deploy infrastructure
deploy_infrastructure() {
    echo -e "${YELLOW}🏗️  Deploying infrastructure with Terraform...${NC}"
    
    cd terraform
    
    # Initialize Terraform
    terraform init
    
    # Plan the deployment
    echo -e "${BLUE}📋 Terraform plan:${NC}"
    terraform plan -var="github_repository=${GITHUB_REPO}"
    
    # Ask for confirmation
    read -p "Do you want to proceed with the deployment? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        terraform apply -var="github_repository=${GITHUB_REPO}" -auto-approve
        echo -e "${GREEN}✅ Infrastructure deployed successfully${NC}"
    else
        echo -e "${YELLOW}⏸️  Deployment cancelled${NC}"
        exit 0
    fi
    
    cd ..
}

# Function to configure kubectl
configure_kubectl() {
    echo -e "${YELLOW}⚙️  Configuring kubectl...${NC}"
    
    # Get the actual cluster name from Terraform output
    ACTUAL_CLUSTER_NAME=$(cd terraform && terraform output -raw cluster_name)
    
    # Update kubeconfig
    aws eks update-kubeconfig --region ${AWS_REGION} --name ${ACTUAL_CLUSTER_NAME}
    
    # Test connection
    if kubectl cluster-info &> /dev/null; then
        echo -e "${GREEN}✅ kubectl configured successfully${NC}"
    else
        echo -e "${RED}❌ Failed to configure kubectl${NC}"
        exit 1
    fi
}

# Function to setup ArgoCD access
setup_argocd_access() {
    echo -e "${YELLOW}🔧 Setting up ArgoCD access...${NC}"
    
    # Wait for ArgoCD to be ready
    echo "Waiting for ArgoCD to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
    
    # Get ArgoCD admin password
    ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
    
    echo -e "${GREEN}✅ ArgoCD is ready${NC}"
    echo -e "${BLUE}🔑 ArgoCD Admin Password: ${ARGOCD_PASSWORD}${NC}"
    echo -e "${BLUE}🌐 To access ArgoCD, run: kubectl port-forward svc/argocd-server -n argocd 8080:443${NC}"
    echo -e "${BLUE}📱 Then visit: https://localhost:8080 (admin/${ARGOCD_PASSWORD})${NC}"
}

# Function to display GitHub Actions setup instructions
github_actions_setup() {
    echo -e "${YELLOW}⚙️  GitHub Actions setup...${NC}"
    
    # Get the GitHub Actions role ARN from Terraform
    GITHUB_ACTIONS_ROLE_ARN=$(cd terraform && terraform output -raw github_actions_role_arn)
    
    echo -e "${BLUE}📋 GitHub Actions Setup Instructions:${NC}"
    echo "1. Go to your GitHub repository: https://github.com/${GITHUB_REPO}"
    echo "2. Navigate to Settings > Secrets and variables > Actions"
    echo "3. Add the following repository secrets:"
    echo "   - AWS_REGION: ${AWS_REGION}"
    echo "   - AWS_ROLE_ARN: ${GITHUB_ACTIONS_ROLE_ARN}"
    echo ""
    echo "4. The workflow will use OIDC to assume the IAM role (no need for access keys)"
    echo ""
    echo -e "${GREEN}✅ GitHub Actions is configured to use OIDC authentication${NC}"
}

# Function to display ECR repositories
show_ecr_repos() {
    echo -e "${YELLOW}📦 ECR Repositories:${NC}"
    
    # Get ECR repository URLs from Terraform
    BACKEND_ECR_URL=$(cd terraform && terraform output -raw ecr_backend_repository_url)
    FRONTEND_ECR_URL=$(cd terraform && terraform output -raw ecr_frontend_repository_url)
    
    echo -e "${BLUE}Backend ECR:${NC} ${BACKEND_ECR_URL}"
    echo -e "${BLUE}Frontend ECR:${NC} ${FRONTEND_ECR_URL}"
}

# Function to test the pipeline
test_pipeline() {
    echo -e "${YELLOW}🧪 Testing the pipeline...${NC}"
    
    echo "To test the complete CI/CD pipeline:"
    echo "1. Make a change to your code"
    echo "2. Commit and push to the main branch"
    echo "3. Check GitHub Actions for the build process"
    echo "4. Check ArgoCD for the deployment process"
    echo "5. Verify the application is running: kubectl get pods -n biomarine"
}

# Main menu
show_menu() {
    echo -e "${BLUE}📋 Setup Options:${NC}"
    echo "1. Full setup (recommended for first time)"
    echo "2. Update image references only"
    echo "3. Deploy infrastructure only"
    echo "4. Configure kubectl only"
    echo "5. Setup ArgoCD access only"
    echo "6. Show GitHub Actions setup"
    echo "7. Show ECR repositories"
    echo "8. Test pipeline instructions"
    echo "9. Exit"
    echo
}

# Main execution
main() {
    show_menu
    
    read -p "Select an option (1-9): " choice
    
    case $choice in
        1)
            update_image_refs
            deploy_infrastructure
            configure_kubectl
            setup_argocd_access
            github_actions_setup
            show_ecr_repos
            test_pipeline
            ;;
        2)
            update_image_refs
            ;;
        3)
            deploy_infrastructure
            ;;
        4)
            configure_kubectl
            ;;
        5)
            setup_argocd_access
            ;;
        6)
            github_actions_setup
            ;;
        7)
            show_ecr_repos
            ;;
        8)
            test_pipeline
            ;;
        9)
            echo -e "${GREEN}👋 Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid option${NC}"
            main
            ;;
    esac
}

# Run main function
main