const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
    try {
        console.log('Testing MongoDB connection...');
        console.log('Connection string:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected successfully!');
        
        // Test creating a simple document
        const testSchema = new mongoose.Schema({ test: String });
        const TestModel = mongoose.model('Test', testSchema);
        
        const testDoc = new TestModel({ test: 'connection test' });
        await testDoc.save();
        console.log('✅ Database write test successful!');
        
        await TestModel.deleteOne({ test: 'connection test' });
        console.log('✅ Database delete test successful!');
        
        console.log('🎉 Database setup complete! Your MongoDB is ready to use.');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        console.log('\n📋 Troubleshooting steps:');
        console.log('1. Check if MongoDB is running locally (if using local MongoDB)');
        console.log('2. Verify your MONGODB_URI in the .env file');
        console.log('3. If using MongoDB Atlas, check your network access settings');
        console.log('4. Ensure your database user has proper permissions');
        console.log('\n💡 Consider using MongoDB Atlas (free cloud database):');
        console.log('   https://www.mongodb.com/atlas');
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

testConnection();
