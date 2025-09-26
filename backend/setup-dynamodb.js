const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { 
    CreateTableCommand, 
    DescribeTableCommand, 
    ListTablesCommand 
} = require('@aws-sdk/client-dynamodb');
require('dotenv').config();

const dynamoClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-west-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const createUsersTable = async () => {
    const tableName = process.env.USERS_TABLE || 'biomarine-users';
    
    const params = {
        TableName: tableName,
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH' // Partition key
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S'
            }
        ],
        BillingMode: 'PAY_PER_REQUEST' // Use on-demand billing for free tier
    };

    try {
        const result = await dynamoClient.send(new CreateTableCommand(params));
        console.log(`✅ Users table created successfully: ${tableName}`);
        return result;
    } catch (error) {
        if (error.name === 'ResourceInUseException') {
            console.log(`ℹ️  Users table already exists: ${tableName}`);
        } else {
            console.error('❌ Error creating users table:', error);
            throw error;
        }
    }
};

const createResearchStatsTable = async () => {
    const tableName = process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats';
    
    const params = {
        TableName: tableName,
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH' // Partition key
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S'
            }
        ],
        BillingMode: 'PAY_PER_REQUEST' // Use on-demand billing for free tier
    };

    try {
        const result = await dynamoClient.send(new CreateTableCommand(params));
        console.log(`✅ Research stats table created successfully: ${tableName}`);
        return result;
    } catch (error) {
        if (error.name === 'ResourceInUseException') {
            console.log(`ℹ️  Research stats table already exists: ${tableName}`);
        } else {
            console.error('❌ Error creating research stats table:', error);
            throw error;
        }
    }
};

const waitForTableActive = async (tableName) => {
    console.log(`⏳ Waiting for table ${tableName} to become active...`);
    
    let tableStatus = 'CREATING';
    while (tableStatus !== 'ACTIVE') {
        try {
            const result = await dynamoClient.send(new DescribeTableCommand({ TableName: tableName }));
            tableStatus = result.Table.TableStatus;
            
            if (tableStatus !== 'ACTIVE') {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
            }
        } catch (error) {
            console.error(`Error checking table status for ${tableName}:`, error);
            break;
        }
    }
    
    console.log(`✅ Table ${tableName} is now active`);
};

const setupDynamoDB = async () => {
    console.log('🚀 Setting up DynamoDB tables...');
    console.log(`📍 Region: ${process.env.AWS_REGION || 'us-west-2'}`);
    
    try {
        // List existing tables
        const listResult = await dynamoClient.send(new ListTablesCommand({}));
        console.log('📋 Existing tables:', listResult.TableNames);
        
        // Create tables
        await createUsersTable();
        await createResearchStatsTable();
        
        // Wait for tables to become active
        const usersTable = process.env.USERS_TABLE || 'biomarine-users';
        const statsTable = process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats';
        
        await waitForTableActive(usersTable);
        await waitForTableActive(statsTable);
        
        console.log('🎉 DynamoDB setup completed successfully!');
        console.log('💡 Tables are configured with PAY_PER_REQUEST billing mode for free tier usage');
        
    } catch (error) {
        console.error('❌ Error setting up DynamoDB:', error);
        process.exit(1);
    }
};

// Run setup if this file is executed directly
if (require.main === module) {
    setupDynamoDB();
}

module.exports = { setupDynamoDB };
