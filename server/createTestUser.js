const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/electric_store')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@test.com' });
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);

    // Create test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@test.com',
      password: hashedPassword,
      role: 'user'
    });

    await testUser.save();
    console.log('Test user created successfully');
    console.log('Email: test@test.com');
    console.log('Password: test123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
