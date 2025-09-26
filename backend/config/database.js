const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

let dynamoClient;
let docClient;

const connectDB = async () => {
    try {
        // Configure DynamoDB client for us-west-2 region
        dynamoClient = new DynamoDBClient({
            region: 'us-west-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        // Create document client for easier operations
        docClient = DynamoDBDocumentClient.from(dynamoClient);
        
        console.log('DynamoDB connected successfully in us-west-2 region');
        return { dynamoClient, docClient };
    } catch (error) {
        console.error('DynamoDB connection error:', error);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

const getDynamoClient = () => dynamoClient;
const getDocClient = () => docClient;

module.exports = { connectDB, getDynamoClient, getDocClient };
