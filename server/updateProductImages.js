const mongoose = require('mongoose');
const Product = require('./models/Product');

// Map of product categories to appropriate image names
const categoryImages = {
  'Electrical Goods': [
    '/images/mcb.svg',
    '/images/mccb.svg', 
    '/images/contactor.svg',
    '/images/relay.svg',
    '/images/breaker.svg'
  ],
  'Switches & Sockets': [
    '/images/switch.svg',
    '/images/socket.svg',
    '/images/dimmer.svg',
    '/images/modular-switch.svg',
    '/images/power-socket.svg'
  ],
  'Lighting Solutions': [
    '/images/led-bulb.svg',
    '/images/tube-light.svg',
    '/images/panel-light.svg',
    '/images/flood-light.svg',
    '/images/street-light.svg'
  ],
  'Fans & Ventilation': [
    '/images/ceiling-fan.svg',
    '/images/exhaust-fan.svg',
    '/images/table-fan.svg',
    '/images/wall-fan.svg'
  ],
  'Wiring & Cables': [
    '/images/electrical-wire.svg',
    '/images/armoured-cable.svg',
    '/images/flex-cable.svg'
  ],
  'Hardware & Tools': [
    '/images/drill-machine.svg',
    '/images/screwdriver-set.svg',
    '/images/tool-kit.svg',
    '/images/measuring-tape.svg'
  ],
  'Power Tools': [
    '/images/angle-grinder.svg',
    '/images/impact-drill.svg',
    '/images/circular-saw.svg'
  ],
  'Safety Equipment': [
    '/images/safety-helmet.svg',
    '/images/safety-harness.svg'
  ],
  'Building Materials': [
    '/images/cement.svg',
    '/images/concrete.svg',
    '/images/wall-putty.svg',
    '/images/building-blocks.svg'
  ],
  'Plumbing Supplies': [
    '/images/pvc-pipe.svg',
    '/images/water-tap.svg'
  ],
  'Paint & Finishes': [
    '/images/wall-paint.svg',
    '/images/primer.svg'
  ],
  'Steel & Metal Products': [
    '/images/steel-rod.svg',
    '/images/metal-angle.svg'
  ],
  'Pipes & Fittings': [
    '/images/cpvc-pipe.svg',
    '/images/pipe-fitting.svg',
    '/images/valve.svg',
    '/images/gi-pipe.svg'
  ],
  'Electrical Motors': [
    '/images/motor.svg',
    '/images/three-phase-motor.svg',
    '/images/vfd-motor.svg'
  ],
  'Hand Tools': [
    '/images/pliers.svg',
    '/images/wrench-set.svg',
    '/images/spirit-level.svg',
    '/images/hand-tools.svg'
  ]
};

async function updateProductImages() {
  try {
    await mongoose.connect('mongodb://localhost:27017/electricstore');
    console.log('Connected to MongoDB');

    const products = await Product.find();
    console.log(`Found ${products.length} products to update`);

    for (let product of products) {
      const categoryImageList = categoryImages[product.category];
      if (categoryImageList && categoryImageList.length > 0) {
        // Get a random image from the category
        const randomIndex = Math.floor(Math.random() * categoryImageList.length);
        const newImageUrl = categoryImageList[randomIndex];
        
        // Update the product with the new image URL
        await Product.findByIdAndUpdate(product._id, { 
          imageUrl: newImageUrl 
        });
        
        console.log(`Updated ${product.name} with image: ${newImageUrl}`);
      } else {
        // Fallback to default image
        await Product.findByIdAndUpdate(product._id, { 
          imageUrl: '/images/default-product.svg' 
        });
        console.log(`Updated ${product.name} with default image`);
      }
    }

    console.log('✅ All products updated with local image URLs');
    mongoose.connection.close();

  } catch (error) {
    console.error('Error updating product images:', error);
    mongoose.connection.close();
  }
}

updateProductImages();
