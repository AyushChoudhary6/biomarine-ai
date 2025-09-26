const { PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { getDocClient } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ResearchStats {
    constructor(statsData) {
        this.id = statsData.id || uuidv4();
        this.userId = statsData.userId;
        this.publications = statsData.publications || 0;
        this.citations = statsData.citations || 0;
        this.projects = statsData.projects || 0;
        this.lastUpdated = statsData.lastUpdated || new Date().toISOString();
    }

    // Save research stats to DynamoDB
    async save() {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats',
            Item: {
                id: this.id,
                userId: this.userId,
                publications: this.publications,
                citations: this.citations,
                projects: this.projects,
                lastUpdated: this.lastUpdated
            }
        };

        try {
            await docClient.send(new PutCommand(params));
            return this;
        } catch (error) {
            throw new Error(`Error saving research stats: ${error.message}`);
        }
    }

    // Find research stats by ID
    static async findById(id) {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats',
            Key: { id }
        };

        try {
            const result = await docClient.send(new GetCommand(params));
            return result.Item ? new ResearchStats(result.Item) : null;
        } catch (error) {
            throw new Error(`Error finding research stats by ID: ${error.message}`);
        }
    }

    // Find research stats by user ID
    static async findByUserId(userId) {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats',
            FilterExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        };

        try {
            const result = await docClient.send(new ScanCommand(params));
            return result.Items && result.Items.length > 0 ? new ResearchStats(result.Items[0]) : null;
        } catch (error) {
            throw new Error(`Error finding research stats by user ID: ${error.message}`);
        }
    }

    // Update research stats
    async update(updates) {
        const docClient = getDocClient();
        
        // Build update expression
        const updateExpressions = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};

        Object.keys(updates).forEach((key, index) => {
            const attrName = `#attr${index}`;
            const attrValue = `:val${index}`;
            
            updateExpressions.push(`${attrName} = ${attrValue}`);
            expressionAttributeNames[attrName] = key;
            expressionAttributeValues[attrValue] = updates[key];
        });

        // Always update lastUpdated
        const lastIndex = Object.keys(updates).length;
        updateExpressions.push(`#attr${lastIndex} = :val${lastIndex}`);
        expressionAttributeNames[`#attr${lastIndex}`] = 'lastUpdated';
        expressionAttributeValues[`:val${lastIndex}`] = new Date().toISOString();

        const params = {
            TableName: process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats',
            Key: { id: this.id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        };

        try {
            const result = await docClient.send(new UpdateCommand(params));
            return new ResearchStats(result.Attributes);
        } catch (error) {
            throw new Error(`Error updating research stats: ${error.message}`);
        }
    }

    // Delete research stats
    async delete() {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats',
            Key: { id: this.id }
        };

        try {
            await docClient.send(new DeleteCommand(params));
            return true;
        } catch (error) {
            throw new Error(`Error deleting research stats: ${error.message}`);
        }
    }

    // Get all research stats
    static async findAll() {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.RESEARCH_STATS_TABLE || 'biomarine-research-stats'
        };

        try {
            const result = await docClient.send(new ScanCommand(params));
            return result.Items ? result.Items.map(item => new ResearchStats(item)) : [];
        } catch (error) {
            throw new Error(`Error finding all research stats: ${error.message}`);
        }
    }
}

module.exports = ResearchStats;
