const fs = require('fs');
const path = require('path');

// Create a simple SVG image generator
function createSVGImage(productName, category, color, filename) {
  const svg = `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.secondary};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#grad)" rx="20" ry="20"/>
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">${productName}</text>
  <text x="200" y="220" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">${category}</text>
  <circle cx="200" cy="280" r="40" fill="rgba(255,255,255,0.2)" />
  <rect x="180" y="260" width="40" height="40" fill="rgba(255,255,255,0.3)" rx="5" ry="5"/>
</svg>`;

  const imagePath = path.join(__dirname, '..', 'client', 'public', 'images', filename);
  fs.writeFileSync(imagePath, svg);
  console.log(`Created image: ${filename}`);
}

// Color schemes for different product categories
const productImages = [
  // Electrical Goods
  { name: 'MCB', category: 'Circuit Breaker', color: { primary: '#2196F3', secondary: '#1976D2' }, filename: 'mcb.svg' },
  { name: 'MCCB', category: 'Circuit Breaker', color: { primary: '#4CAF50', secondary: '#2E7D32' }, filename: 'mccb.svg' },
  { name: 'Contactor', category: 'Electrical', color: { primary: '#FF5722', secondary: '#D84315' }, filename: 'contactor.svg' },
  { name: 'Relay', category: 'Control Device', color: { primary: '#9C27B0', secondary: '#6A1B9A' }, filename: 'relay.svg' },
  { name: 'Breaker', category: 'Protection', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'breaker.svg' },

  // Switches & Sockets
  { name: 'Switch', category: 'Electrical Switch', color: { primary: '#FF9800', secondary: '#F57C00' }, filename: 'switch.svg' },
  { name: 'Socket', category: 'Power Socket', color: { primary: '#9C27B0', secondary: '#6A1B9A' }, filename: 'socket.svg' },
  { name: 'Dimmer', category: 'Light Control', color: { primary: '#3F51B5', secondary: '#283593' }, filename: 'dimmer.svg' },
  { name: 'Modular Switch', category: 'Modern Switch', color: { primary: '#00BCD4', secondary: '#0097A7' }, filename: 'modular-switch.svg' },
  { name: 'Power Socket', category: 'Heavy Duty', color: { primary: '#795548', secondary: '#5D4037' }, filename: 'power-socket.svg' },

  // Lighting Solutions
  { name: 'LED Bulb', category: 'Energy Efficient', color: { primary: '#FFEB3B', secondary: '#F9A825' }, filename: 'led-bulb.svg' },
  { name: 'Tube Light', category: 'Fluorescent', color: { primary: '#00BCD4', secondary: '#0097A7' }, filename: 'tube-light.svg' },
  { name: 'Panel Light', category: 'Modern Lighting', color: { primary: '#9E9E9E', secondary: '#616161' }, filename: 'panel-light.svg' },
  { name: 'Flood Light', category: 'Outdoor Lighting', color: { primary: '#FF5722', secondary: '#D84315' }, filename: 'flood-light.svg' },
  { name: 'Street Light', category: 'Public Lighting', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'street-light.svg' },

  // Fans & Ventilation
  { name: 'Ceiling Fan', category: 'Room Ventilation', color: { primary: '#795548', secondary: '#5D4037' }, filename: 'ceiling-fan.svg' },
  { name: 'Exhaust Fan', category: 'Air Circulation', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'exhaust-fan.svg' },
  { name: 'Table Fan', category: 'Personal Cooling', color: { primary: '#2196F3', secondary: '#1976D2' }, filename: 'table-fan.svg' },
  { name: 'Wall Fan', category: 'Wall Mounted', color: { primary: '#4CAF50', secondary: '#2E7D32' }, filename: 'wall-fan.svg' },

  // Wiring & Cables
  { name: 'Wire', category: 'Electrical Wire', color: { primary: '#FF5722', secondary: '#D84315' }, filename: 'electrical-wire.svg' },
  { name: 'Armoured Cable', category: 'Heavy Duty Cable', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'armoured-cable.svg' },
  { name: 'Flex Cable', category: 'Flexible Wire', color: { primary: '#9C27B0', secondary: '#6A1B9A' }, filename: 'flex-cable.svg' },

  // Tools
  { name: 'Drill Machine', category: 'Power Tool', color: { primary: '#E91E63', secondary: '#AD1457' }, filename: 'drill-machine.svg' },
  { name: 'Screwdriver Set', category: 'Hand Tools', color: { primary: '#FF9800', secondary: '#F57C00' }, filename: 'screwdriver-set.svg' },
  { name: 'Tool Kit', category: 'Complete Set', color: { primary: '#795548', secondary: '#5D4037' }, filename: 'tool-kit.svg' },
  { name: 'Measuring Tape', category: 'Measurement', color: { primary: '#FFEB3B', secondary: '#F9A825' }, filename: 'measuring-tape.svg' },

  // Power Tools
  { name: 'Angle Grinder', category: 'Cutting Tool', color: { primary: '#F44336', secondary: '#C62828' }, filename: 'angle-grinder.svg' },
  { name: 'Impact Drill', category: 'Heavy Drill', color: { primary: '#9C27B0', secondary: '#6A1B9A' }, filename: 'impact-drill.svg' },
  { name: 'Circular Saw', category: 'Cutting Tool', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'circular-saw.svg' },

  // Safety Equipment
  { name: 'Safety Helmet', category: 'Head Protection', color: { primary: '#FF9800', secondary: '#F57C00' }, filename: 'safety-helmet.svg' },
  { name: 'Safety Harness', category: 'Fall Protection', color: { primary: '#4CAF50', secondary: '#2E7D32' }, filename: 'safety-harness.svg' },

  // Building Materials
  { name: 'Cement', category: 'Construction', color: { primary: '#9E9E9E', secondary: '#616161' }, filename: 'cement.svg' },
  { name: 'Concrete', category: 'Building Material', color: { primary: '#795548', secondary: '#5D4037' }, filename: 'concrete.svg' },
  { name: 'Wall Putty', category: 'Wall Finish', color: { primary: '#FFEB3B', secondary: '#F9A825' }, filename: 'wall-putty.svg' },
  { name: 'Building Blocks', category: 'Construction', color: { primary: '#FF5722', secondary: '#D84315' }, filename: 'building-blocks.svg' },

  // Plumbing
  { name: 'PVC Pipe', category: 'Plumbing', color: { primary: '#2196F3', secondary: '#1976D2' }, filename: 'pvc-pipe.svg' },
  { name: 'Water Tap', category: 'Faucet', color: { primary: '#00BCD4', secondary: '#0097A7' }, filename: 'water-tap.svg' },

  // Paint
  { name: 'Wall Paint', category: 'Interior Paint', color: { primary: '#E91E63', secondary: '#AD1457' }, filename: 'wall-paint.svg' },
  { name: 'Primer', category: 'Base Coat', color: { primary: '#9E9E9E', secondary: '#616161' }, filename: 'primer.svg' },

  // Steel & Metal
  { name: 'Steel Rod', category: 'Reinforcement', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'steel-rod.svg' },
  { name: 'Metal Angle', category: 'Structural Steel', color: { primary: '#795548', secondary: '#5D4037' }, filename: 'metal-angle.svg' },

  // Pipes & Fittings
  { name: 'CPVC Pipe', category: 'Hot Water Pipe', color: { primary: '#FF5722', secondary: '#D84315' }, filename: 'cpvc-pipe.svg' },
  { name: 'Pipe Fitting', category: 'Plumbing Fitting', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'pipe-fitting.svg' },
  { name: 'Valve', category: 'Flow Control', color: { primary: '#3F51B5', secondary: '#283593' }, filename: 'valve.svg' },
  { name: 'GI Pipe', category: 'Galvanized Pipe', color: { primary: '#9E9E9E', secondary: '#616161' }, filename: 'gi-pipe.svg' },

  // Motors
  { name: 'Motor', category: 'Electric Motor', color: { primary: '#3F51B5', secondary: '#283593' }, filename: 'motor.svg' },
  { name: '3-Phase Motor', category: 'Industrial Motor', color: { primary: '#4CAF50', secondary: '#2E7D32' }, filename: 'three-phase-motor.svg' },
  { name: 'VFD Motor', category: 'Variable Speed', color: { primary: '#9C27B0', secondary: '#6A1B9A' }, filename: 'vfd-motor.svg' },

  // Hand Tools
  { name: 'Pliers', category: 'Hand Tool', color: { primary: '#FF9800', secondary: '#F57C00' }, filename: 'pliers.svg' },
  { name: 'Wrench Set', category: 'Tool Set', color: { primary: '#795548', secondary: '#5D4037' }, filename: 'wrench-set.svg' },
  { name: 'Spirit Level', category: 'Measuring Tool', color: { primary: '#00BCD4', secondary: '#0097A7' }, filename: 'spirit-level.svg' },
  { name: 'Hand Tools', category: 'Tool Collection', color: { primary: '#607D8B', secondary: '#455A64' }, filename: 'hand-tools.svg' },

  // Default
  { name: 'Product', category: 'Default', color: { primary: '#757575', secondary: '#424242' }, filename: 'default-product.svg' }
];

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'client', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate all images
console.log('Generating product images...');
productImages.forEach(product => {
  createSVGImage(product.name, product.category, product.color, product.filename);
});

console.log(`\n✅ Generated ${productImages.length} product images successfully!`);
console.log('Images saved to:', imagesDir);
