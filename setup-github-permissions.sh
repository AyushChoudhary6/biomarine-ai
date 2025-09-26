#!/bin/bash

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-west-2"
ROLE_NAME="GitHubActionsRole"
POLICY_NAME="GitHubActionsPolicy"

echo "Setting up GitHub Actions permissions for account: $ACCOUNT_ID"

# Replace ACCOUNT_ID in trust policy
sed -i "s/ACCOUNT_ID/$ACCOUNT_ID/g" github-trust-policy.json

# Create OIDC provider (if not exists)
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 \
  --client-id-list sts.amazonaws.com \
  2>/dev/null || echo "OIDC provider already exists"

# Create IAM policy
aws iam create-policy \
  --policy-name $POLICY_NAME \
  --policy-document file://aws-iam-policy.json \
  2>/dev/null || echo "Policy already exists"

# Create IAM role
aws iam create-role \
  --role-name $ROLE_NAME \
  --assume-role-policy-document file://github-trust-policy.json

# Attach policy to role
aws iam attach-role-policy \
  --role-name $ROLE_NAME \
  --policy-arn arn:aws:iam::$ACCOUNT_ID:policy/$POLICY_NAME

# Output role ARN for GitHub secrets
ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME"
echo ""
echo "✅ Setup complete!"
echo "🔑 Add this to GitHub Secrets as AWS_ROLE_ARN:"
echo "$ROLE_ARN"
