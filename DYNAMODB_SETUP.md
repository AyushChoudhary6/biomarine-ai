# DynamoDB Setup Guide

This project has been migrated from MongoDB to AWS DynamoDB using the free tier in the `us-west-2` region.

## Prerequisites

1. **AWS Account**: Create a free AWS account at https://aws.amazon.com/
2. **AWS CLI**: Install AWS CLI (optional but recommended)
3. **AWS Credentials**: Set up your AWS access keys

## Setup Steps

### 1. Configure AWS Credentials

Create AWS access keys in your AWS Console:
1. Go to AWS Console → IAM → Users → Your User → Security Credentials
2. Create Access Key
3. Copy the Access Key ID and Secret Access Key

Update your `.env` file:
```env
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
USERS_TABLE=biomarine-users
RESEARCH_STATS_TABLE=biomarine-research-stats
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Create DynamoDB Tables

Run the setup script to create the required tables:

```bash
npm run setup-db
```

This will create two tables:
- `biomarine-users` - Stores user information
- `biomarine-research-stats` - Stores research statistics

### 4. Start the Server

```bash
npm start
```

## DynamoDB Free Tier

The setup uses DynamoDB's free tier which includes:
- 25 GB of storage
- 25 provisioned read capacity units (RCU)
- 25 provisioned write capacity units (WCU)
- 2.5 million stream read requests per month

The tables are configured with **PAY_PER_REQUEST** billing mode, which is perfect for development and low-traffic applications.

## Table Structure

### Users Table
- **Partition Key**: `id` (String)
- **Attributes**: name, email, phone, password, country, userType, qualifications, etc.

### Research Stats Table
- **Partition Key**: `id` (String)
- **Attributes**: userId, publications, citations, projects, lastUpdated

## Migration Notes

- User IDs are now UUIDs instead of MongoDB ObjectIds
- All Mongoose schemas have been replaced with DynamoDB document client operations
- Password hashing and JWT authentication remain the same
- All API endpoints work exactly the same as before

## Troubleshooting

### Common Issues

1. **AWS Credentials Error**
   - Ensure your AWS credentials are correctly set in the `.env` file
   - Check that your AWS user has DynamoDB permissions

2. **Region Issues**
   - Make sure you're using `us-west-2` region
   - Verify the region in your AWS Console matches the `.env` file

3. **Table Creation Fails**
   - Check if tables already exist in your AWS Console
   - Ensure your AWS user has `dynamodb:CreateTable` permission

### Useful AWS CLI Commands

```bash
# List all tables
aws dynamodb list-tables --region us-west-2

# Describe a table
aws dynamodb describe-table --table-name biomarine-users --region us-west-2

# Delete a table (if needed)
aws dynamodb delete-table --table-name biomarine-users --region us-west-2
```

## Cost Monitoring

- Monitor your usage in AWS Console → DynamoDB → Tables
- Set up billing alerts to avoid unexpected charges
- The free tier should be sufficient for development and small-scale production

## Security Best Practices

1. **Never commit AWS credentials** to version control
2. **Use IAM roles** in production instead of access keys
3. **Enable encryption at rest** for production tables
4. **Set up proper backup policies** for production data
