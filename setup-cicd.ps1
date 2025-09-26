# Biomarine AI - CI/CD Setup Script (PowerShell)
# This script helps set up the complete CI/CD pipeline on Windows

param(
    [Parameter()]
    [string]$AwsRegion = "us-west-2",
    
    [Parameter()]
    [string]$ClusterName = "biomarine-ai",
    
    [Parameter()]
    [string]$GitHubRepo = "AyushChoudhary6/biomarine-ai"
)

# Set error action preference
$ErrorActionPreference = "Stop"

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Write-Header {
    param([string]$Title)
    Write-ColorOutput "`n🚀 $Title" $Blue
    Write-ColorOutput ("=" * ($Title.Length + 4)) $Blue
}

function Test-Prerequisites {
    Write-ColorOutput "`n📋 Checking prerequisites..." $Yellow
    
    $prerequisites = @("aws", "kubectl", "terraform", "docker")
    $missing = @()
    
    foreach ($cmd in $prerequisites) {
        try {
            $null = Get-Command $cmd -ErrorAction Stop
            Write-ColorOutput "✅ $cmd is installed" $Green
        }
        catch {
            Write-ColorOutput "❌ $cmd is not installed" $Red
            $missing += $cmd
        }
    }
    
    if ($missing.Count -gt 0) {
        Write-ColorOutput "`n❌ Missing prerequisites: $($missing -join ', ')" $Red
        Write-ColorOutput "Please install the missing tools and try again." $Red
        exit 1
    }
    
    Write-ColorOutput "`n✅ All prerequisites are installed" $Green
}

function Test-AwsCredentials {
    Write-ColorOutput "`n🔐 Checking AWS credentials..." $Yellow
    
    try {
        $identity = aws sts get-caller-identity --output json | ConvertFrom-Json
        $accountId = $identity.Account
        Write-ColorOutput "✅ AWS credentials configured for account: $accountId" $Green
        return $accountId
    }
    catch {
        Write-ColorOutput "❌ AWS credentials not configured. Please run 'aws configure' first." $Red
        exit 1
    }
}

function Update-ImageReferences {
    param([string]$AccountId)
    
    Write-ColorOutput "`n🔄 Updating Kubernetes manifests with ECR URLs..." $Yellow
    
    try {
        # Update backend deployment
        $backendContent = Get-Content "K8\backend-deployment.yaml" -Raw
        $backendContent = $backendContent -replace "ACCOUNT_ID", $AccountId
        Set-Content "K8\backend-deployment.yaml" -Value $backendContent
        
        # Update frontend deployment
        $frontendContent = Get-Content "K8\frontend-deployment.yaml" -Raw
        $frontendContent = $frontendContent -replace "ACCOUNT_ID", $AccountId
        Set-Content "K8\frontend-deployment.yaml" -Value $frontendContent
        
        Write-ColorOutput "✅ Kubernetes manifests updated" $Green
    }
    catch {
        Write-ColorOutput "❌ Failed to update Kubernetes manifests: $($_.Exception.Message)" $Red
        exit 1
    }
}

function Deploy-Infrastructure {
    Write-ColorOutput "`n🏗️ Deploying infrastructure with Terraform..." $Yellow
    
    try {
        Push-Location "terraform"
        
        # Initialize Terraform
        terraform init
        
        # Plan the deployment
        Write-ColorOutput "`n📋 Terraform plan:" $Blue
        terraform plan -var="github_repository=$GitHubRepo"
        
        # Ask for confirmation
        $confirm = Read-Host "Do you want to proceed with the deployment? (y/N)"
        if ($confirm -eq "y" -or $confirm -eq "Y") {
            terraform apply -var="github_repository=$GitHubRepo" -auto-approve
            Write-ColorOutput "✅ Infrastructure deployed successfully" $Green
        }
        else {
            Write-ColorOutput "⏸️ Deployment cancelled" $Yellow
            exit 0
        }
    }
    catch {
        Write-ColorOutput "❌ Infrastructure deployment failed: $($_.Exception.Message)" $Red
        exit 1
    }
    finally {
        Pop-Location
    }
}

function Configure-Kubectl {
    Write-ColorOutput "`n⚙️ Configuring kubectl..." $Yellow
    
    try {
        Push-Location "terraform"
        
        # Get the actual cluster name from Terraform output
        $actualClusterName = terraform output -raw cluster_name
        
        Pop-Location
        
        # Update kubeconfig
        aws eks update-kubeconfig --region $AwsRegion --name $actualClusterName
        
        # Test connection
        $null = kubectl cluster-info
        Write-ColorOutput "✅ kubectl configured successfully" $Green
    }
    catch {
        Write-ColorOutput "❌ Failed to configure kubectl: $($_.Exception.Message)" $Red
        exit 1
    }
}

function Setup-ArgoCdAccess {
    Write-ColorOutput "`n🔧 Setting up ArgoCD access..." $Yellow
    
    try {
        # Wait for ArgoCD to be ready
        Write-ColorOutput "Waiting for ArgoCD to be ready..." $Yellow
        kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd
        
        # Get ArgoCD admin password
        $passwordB64 = kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}"
        $password = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($passwordB64))
        
        Write-ColorOutput "✅ ArgoCD is ready" $Green
        Write-ColorOutput "🔑 ArgoCD Admin Password: $password" $Blue
        Write-ColorOutput "🌐 To access ArgoCD, run: kubectl port-forward svc/argocd-server -n argocd 8080:443" $Blue
        Write-ColorOutput "📱 Then visit: https://localhost:8080 (admin/$password)" $Blue
    }
    catch {
        Write-ColorOutput "❌ Failed to setup ArgoCD access: $($_.Exception.Message)" $Red
    }
}

function Show-GitHubActionsSetup {
    Write-ColorOutput "`n⚙️ GitHub Actions setup..." $Yellow
    
    try {
        Push-Location "terraform"
        
        # Get the GitHub Actions role ARN from Terraform
        $githubActionsRoleArn = terraform output -raw github_actions_role_arn
        
        Pop-Location
        
        Write-ColorOutput "`n📋 GitHub Actions Setup Instructions:" $Blue
        Write-Host "1. Go to your GitHub repository: https://github.com/$GitHubRepo"
        Write-Host "2. Navigate to Settings > Secrets and variables > Actions"
        Write-Host "3. Add the following repository secrets:"
        Write-Host "   - AWS_REGION: $AwsRegion"
        Write-Host "   - AWS_ROLE_ARN: $githubActionsRoleArn"
        Write-Host ""
        Write-Host "4. The workflow will use OIDC to assume the IAM role (no need for access keys)"
        Write-Host ""
        Write-ColorOutput "✅ GitHub Actions is configured to use OIDC authentication" $Green
    }
    catch {
        Write-ColorOutput "❌ Failed to get GitHub Actions setup info: $($_.Exception.Message)" $Red
    }
}

function Show-EcrRepositories {
    Write-ColorOutput "`n📦 ECR Repositories:" $Yellow
    
    try {
        Push-Location "terraform"
        
        # Get ECR repository URLs from Terraform
        $backendEcrUrl = terraform output -raw ecr_backend_repository_url
        $frontendEcrUrl = terraform output -raw ecr_frontend_repository_url
        
        Pop-Location
        
        Write-ColorOutput "Backend ECR: $backendEcrUrl" $Blue
        Write-ColorOutput "Frontend ECR: $frontendEcrUrl" $Blue
    }
    catch {
        Write-ColorOutput "❌ Failed to get ECR repository info: $($_.Exception.Message)" $Red
    }
}

function Show-TestInstructions {
    Write-ColorOutput "`n🧪 Testing the pipeline..." $Yellow
    
    Write-Host "To test the complete CI/CD pipeline:"
    Write-Host "1. Make a change to your code"
    Write-Host "2. Commit and push to the main branch"
    Write-Host "3. Check GitHub Actions for the build process"
    Write-Host "4. Check ArgoCD for the deployment process"
    Write-Host "5. Verify the application is running: kubectl get pods -n biomarine"
}

function Show-Menu {
    Write-ColorOutput "`n📋 Setup Options:" $Blue
    Write-Host "1. Full setup (recommended for first time)"
    Write-Host "2. Update image references only"
    Write-Host "3. Deploy infrastructure only"
    Write-Host "4. Configure kubectl only"
    Write-Host "5. Setup ArgoCD access only"
    Write-Host "6. Show GitHub Actions setup"
    Write-Host "7. Show ECR repositories"
    Write-Host "8. Test pipeline instructions"
    Write-Host "9. Exit"
    Write-Host ""
}

function Main {
    Write-Header "Biomarine AI CI/CD Setup"
    
    # Check prerequisites and AWS credentials
    Test-Prerequisites
    $accountId = Test-AwsCredentials
    
    # Show menu and get user choice
    Show-Menu
    $choice = Read-Host "Select an option (1-9)"
    
    switch ($choice) {
        "1" {
            Update-ImageReferences -AccountId $accountId
            Deploy-Infrastructure
            Configure-Kubectl
            Setup-ArgoCdAccess
            Show-GitHubActionsSetup
            Show-EcrRepositories
            Show-TestInstructions
        }
        "2" { Update-ImageReferences -AccountId $accountId }
        "3" { Deploy-Infrastructure }
        "4" { Configure-Kubectl }
        "5" { Setup-ArgoCdAccess }
        "6" { Show-GitHubActionsSetup }
        "7" { Show-EcrRepositories }
        "8" { Show-TestInstructions }
        "9" {
            Write-ColorOutput "👋 Goodbye!" $Green
            exit 0
        }
        default {
            Write-ColorOutput "❌ Invalid option" $Red
            Main
        }
    }
}

# Run main function
Main