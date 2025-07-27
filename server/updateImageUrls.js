const mongoose = require('mongoose');
require('dotenv').config();

async function updateImageUrls() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const Product = require('./models/Product');
    
    // Find products with old URLs
    const productsToUpdate = await Product.find({imageUrl: /\/uploads\//});
    console.log(`Found ${productsToUpdate.length} products to update`);
    
    // Update each product
    for (const product of productsToUpdate) {
      const oldUrl = product.imageUrl;
      const newUrl = oldUrl.replace('/uploads/', '/images/products/');
      
      await Product.findByIdAndUpdate(product._id, { imageUrl: newUrl });
      console.log(`Updated: ${product.name} - ${oldUrl} -> ${newUrl}`);
    }
    
    console.log('All products updated successfully');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateImageUrls();
