const { connectDB } = require('./config/database');
const { setupDynamoDB } = require('./setup-dynamodb');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('Testing DynamoDB connection...');
        console.log('Region:', process.env.AWS_REGION || 'us-west-2');
        
        // Connect to DynamoDB
        await connectDB();
        console.log('✅ DynamoDB connected successfully!');
        
        // Setup tables
        await setupDynamoDB();
        console.log('✅ DynamoDB tables setup complete!');
        
        console.log('🎉 Database setup complete! Your DynamoDB is ready to use.');
        console.log('💡 Tables created with PAY_PER_REQUEST billing (free tier friendly)');
        
    } catch (error) {
        console.error('❌ DynamoDB setup failed:', error.message);
        console.log('\n📋 Troubleshooting steps:');
        console.log('1. Check your AWS credentials in the .env file');
        console.log('2. Verify your AWS user has DynamoDB permissions');
        console.log('3. Ensure you are using the correct AWS region (us-west-2)');
        console.log('4. Check your internet connection');
        console.log('\n💡 AWS Free Tier includes:');
        console.log('   - 25 GB of DynamoDB storage');
        console.log('   - 25 RCU and 25 WCU per month');
        console.log('   - Perfect for development and small applications');
        process.exit(1);
    }
};

testConnection();
