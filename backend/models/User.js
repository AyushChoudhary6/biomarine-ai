const { PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { getDocClient } = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class User {
    constructor(userData) {
        this.id = userData.id || uuidv4();
        this.name = userData.name;
        this.email = userData.email;
        this.phone = userData.phone;
        this.password = userData.password;
        this.country = userData.country;
        this.userType = userData.userType;
        this.qualifications = userData.qualifications;
        this.popularArticle = userData.popularArticle;
        this.institute = userData.institute;
        this.specialization = userData.specialization;
        this.yearsOfExperience = userData.yearsOfExperience || 0;
        this.researchInterests = userData.researchInterests || [];
        this.createdAt = userData.createdAt || new Date().toISOString();
    }

    // Hash password
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    // Compare password
    async comparePassword(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    }

    // Save user to DynamoDB
    async save() {
        const docClient = getDocClient();
        
        // Hash password before saving
        await this.hashPassword();

        const params = {
            TableName: process.env.USERS_TABLE || 'biomarine-users',
            Item: {
                id: this.id,
                name: this.name,
                email: this.email,
                phone: this.phone,
                password: this.password,
                country: this.country,
                userType: this.userType,
                qualifications: this.qualifications,
                popularArticle: this.popularArticle,
                institute: this.institute,
                specialization: this.specialization,
                yearsOfExperience: this.yearsOfExperience,
                researchInterests: this.researchInterests,
                createdAt: this.createdAt
            }
        };

        try {
            await docClient.send(new PutCommand(params));
            return this;
        } catch (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }
    }

    // Find user by ID
    static async findById(id) {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.USERS_TABLE || 'biomarine-users',
            Key: { id }
        };

        try {
            const result = await docClient.send(new GetCommand(params));
            return result.Item ? new User(result.Item) : null;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    }

    // Find user by email
    static async findByEmail(email) {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.USERS_TABLE || 'biomarine-users',
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        };

        try {
            const result = await docClient.send(new ScanCommand(params));
            return result.Items && result.Items.length > 0 ? new User(result.Items[0]) : null;
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    // Update user
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

        const params = {
            TableName: process.env.USERS_TABLE || 'biomarine-users',
            Key: { id: this.id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        };

        try {
            const result = await docClient.send(new UpdateCommand(params));
            return new User(result.Attributes);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    // Delete user
    async delete() {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.USERS_TABLE || 'biomarine-users',
            Key: { id: this.id }
        };

        try {
            await docClient.send(new DeleteCommand(params));
            return true;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    // Get all users
    static async findAll() {
        const docClient = getDocClient();
        
        const params = {
            TableName: process.env.USERS_TABLE || 'biomarine-users'
        };

        try {
            const result = await docClient.send(new ScanCommand(params));
            return result.Items ? result.Items.map(item => new User(item)) : [];
        } catch (error) {
            throw new Error(`Error finding all users: ${error.message}`);
        }
    }
}

module.exports = User;
