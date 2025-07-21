const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // Electrical Goods
  {
    name: "Havells 32A MCB Single Pole",
    description: "High quality miniature circuit breaker for electrical protection. Suitable for residential and commercial applications.",
    category: "Electrical Goods",
    subcategory: "Circuit Breakers",
    price: 285,
    mrp: 320,
    stock: 50,
    unit: "piece",
    brand: "Havells",
    model: "HMB-SP-32A",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "240V AC",
      amperage: "32A",
      material: "High Grade Plastic",
      certification: "ISI Marked",
      warranty: "2 Years"
    },
    tags: ["mcb", "circuit breaker", "electrical protection", "havells"],
    supplier: {
      name: "Havells India Ltd",
      contact: "+91-8000-446677",
      location: "Noida, UP"
    }
  },
  {
    name: "Schneider Electric TPN MCCB 100A",
    description: "Molded Case Circuit Breaker with thermal magnetic protection for industrial applications.",
    category: "Electrical Goods",
    subcategory: "MCCB",
    price: 4850,
    mrp: 5200,
    stock: 25,
    unit: "piece",
    brand: "Schneider Electric",
    model: "NSX100F-TM100",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "415V AC",
      amperage: "100A",
      poles: "3 Pole + Neutral",
      breakingCapacity: "36kA",
      warranty: "3 Years"
    },
    tags: ["mccb", "schneider", "industrial", "circuit breaker"],
    supplier: {
      name: "Schneider Electric India",
      contact: "+91-124-6736000",
      location: "Gurgaon, HR"
    }
  },
  
  // Switches & Sockets
  {
    name: "Legrand Arteor 6A 2-Way Switch",
    description: "Premium modular switch with elegant design and superior functionality for modern homes.",
    category: "Switches & Sockets",
    subcategory: "Modular Switches",
    price: 165,
    mrp: 185,
    stock: 100,
    unit: "piece",
    brand: "Legrand",
    model: "572001",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "250V AC",
      amperage: "6A",
      color: "White",
      material: "PC Material",
      warranty: "10 Years"
    },
    tags: ["switch", "modular", "legrand", "2-way"],
    supplier: {
      name: "Legrand India Pvt Ltd",
      contact: "+91-80-67933000",
      location: "Bangalore, KA"
    }
  },
  {
    name: "Anchor Roma 16A Universal Socket",
    description: "Heavy duty universal socket suitable for high power appliances with child safety shutters.",
    category: "Switches & Sockets",
    subcategory: "Power Sockets",
    price: 145,
    mrp: 160,
    stock: 80,
    unit: "piece",
    brand: "Anchor",
    model: "35695",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    specifications: {
      voltage: "250V AC",
      amperage: "16A",
      color: "White",
      features: "Child Safety Shutters",
      warranty: "2 Years"
    },
    tags: ["socket", "universal", "anchor", "16A"],
    supplier: {
      name: "Anchor Electricals Pvt Ltd",
      contact: "+91-33-2357-9000",
      location: "Kolkata, WB"
    }
  },

  // Lighting Solutions
  {
    name: "Philips 9W LED Bulb Warm White",
    description: "Energy efficient LED bulb with warm white light, perfect for homes and offices. 10x longer life than traditional bulbs.",
    category: "Lighting Solutions",
    subcategory: "LED Bulbs",
    price: 195,
    mrp: 220,
    stock: 200,
    unit: "piece",
    brand: "Philips",
    model: "9W-E27-3000K",
    imageUrl: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      wattage: "9W",
      voltage: "220-240V AC",
      color: "Warm White (3000K)",
      lumens: "806 lm",
      warranty: "2 Years"
    },
    tags: ["led", "bulb", "philips", "energy saver"],
    supplier: {
      name: "Philips Lighting India",
      contact: "+91-124-4147000",
      location: "Gurgaon, HR"
    }
  },
  {
    name: "Bajaj 36W LED Tube Light",
    description: "High efficiency LED tube light with instant start and flicker-free operation. Ideal for offices and commercial spaces.",
    category: "Lighting Solutions",
    subcategory: "Tube Lights",
    price: 485,
    mrp: 540,
    stock: 75,
    unit: "piece",
    brand: "Bajaj",
    model: "BLD-36W-6500K",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specifications: {
      wattage: "36W",
      voltage: "220-240V AC",
      color: "Cool White (6500K)",
      length: "4 feet",
      warranty: "3 Years"
    },
    tags: ["tube light", "led", "bajaj", "commercial"],
    supplier: {
      name: "Bajaj Electricals Ltd",
      contact: "+91-22-6196-7777",
      location: "Mumbai, MH"
    }
  },

  // Fans & Ventilation
  {
    name: "Crompton Greaves 1200mm Ceiling Fan",
    description: "High speed ceiling fan with aerodynamically designed blades for maximum air delivery and energy efficiency.",
    category: "Fans & Ventilation",
    subcategory: "Ceiling Fans",
    price: 2450,
    mrp: 2800,
    stock: 40,
    unit: "piece",
    brand: "Crompton",
    model: "Aura Prime 1200",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "220-240V AC",
      power: "75W",
      speed: "390 RPM",
      size: "1200mm",
      warranty: "2 Years"
    },
    tags: ["ceiling fan", "crompton", "energy efficient"],
    supplier: {
      name: "Crompton Greaves Consumer Electricals",
      contact: "+91-22-6663-8888",
      location: "Mumbai, MH"
    }
  },
  {
    name: "Usha Exhaust Fan 6 inch",
    description: "Powerful exhaust fan for kitchens and bathrooms with high suction capacity and low noise operation.",
    category: "Fans & Ventilation",
    subcategory: "Exhaust Fans",
    price: 890,
    mrp: 950,
    stock: 60,
    unit: "piece",
    brand: "Usha",
    model: "Crisp Air 6-inch",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "220-240V AC",
      power: "30W",
      size: "6 inch",
      airflow: "210 CFM",
      warranty: "2 Years"
    },
    tags: ["exhaust fan", "usha", "ventilation"],
    supplier: {
      name: "Usha International Ltd",
      contact: "+91-11-4371-5000",
      location: "New Delhi"
    }
  },

  // Wiring & Cables
  {
    name: "Finolex 2.5sq mm PVC Insulated Wire",
    description: "High quality copper conductor wire with PVC insulation, suitable for domestic and industrial wiring.",
    category: "Wiring & Cables",
    subcategory: "House Wire",
    price: 245,
    mrp: 270,
    stock: 500,
    unit: "meter",
    brand: "Finolex",
    model: "FR-2.5-Red",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "1100V",
      conductor: "Copper",
      insulation: "PVC",
      size: "2.5 sq mm",
      color: "Red"
    },
    tags: ["wire", "copper", "finolex", "electrical"],
    supplier: {
      name: "Finolex Cables Ltd",
      contact: "+91-22-6786-8686",
      location: "Pune, MH"
    }
  },
  {
    name: "Polycab 4 Core Flexible Cable",
    description: "Multi-core flexible cable for power distribution and control applications with high flexibility.",
    category: "Wiring & Cables",
    subcategory: "Power Cables",
    price: 485,
    mrp: 520,
    stock: 200,
    unit: "meter",
    brand: "Polycab",
    model: "FRLS-4C-2.5",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "1100V",
      cores: "4 Core",
      conductor: "Copper",
      size: "2.5 sq mm each",
      insulation: "FRLS PVC"
    },
    tags: ["cable", "multi-core", "polycab", "flexible"],
    supplier: {
      name: "Polycab India Ltd",
      contact: "+91-22-4270-0000",
      location: "Mumbai, MH"
    }
  },

  // Hardware & Tools
  {
    name: "Bosch Professional Impact Drill Machine",
    description: "Heavy duty impact drill with 13mm chuck capacity, perfect for drilling in concrete, wood, and metal.",
    category: "Hardware & Tools",
    subcategory: "Power Tools",
    price: 4850,
    mrp: 5200,
    stock: 15,
    unit: "piece",
    brand: "Bosch",
    model: "GSB 13 RE",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "230V AC",
      power: "600W",
      chuckCapacity: "13mm",
      noLoadSpeed: "2800 RPM",
      warranty: "1 Year"
    },
    tags: ["drill", "impact", "bosch", "power tool"],
    supplier: {
      name: "Bosch India Ltd",
      contact: "+91-80-6752-3000",
      location: "Bangalore, KA"
    }
  },
  {
    name: "Stanley Tool Kit 94 Pieces",
    description: "Complete tool kit with essential hand tools for home and professional use. Includes screwdrivers, pliers, wrenches.",
    category: "Hardware & Tools",
    subcategory: "Hand Tools",
    price: 2950,
    mrp: 3200,
    stock: 30,
    unit: "set",
    brand: "Stanley",
    model: "STMT74393",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      pieces: "94 pieces",
      material: "Chrome Vanadium Steel",
      case: "Blow Molded Case",
      warranty: "Lifetime"
    },
    tags: ["tool kit", "stanley", "hand tools", "professional"],
    supplier: {
      name: "Stanley Black & Decker",
      contact: "+91-124-4968000",
      location: "Gurgaon, HR"
    }
  },

  // Power Tools
  {
    name: "Makita Angle Grinder 4 inch",
    description: "Compact and lightweight angle grinder for cutting and grinding applications with high performance motor.",
    category: "Power Tools",
    subcategory: "Angle Grinders",
    price: 3450,
    mrp: 3800,
    stock: 25,
    unit: "piece",
    brand: "Makita",
    model: "9557NB",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "220-240V AC",
      power: "840W",
      discSize: "100mm (4 inch)",
      noLoadSpeed: "11000 RPM",
      warranty: "6 Months"
    },
    tags: ["angle grinder", "makita", "cutting", "grinding"],
    supplier: {
      name: "Makita India Pvt Ltd",
      contact: "+91-124-4614500",
      location: "Gurgaon, HR"
    }
  },

  // Safety Equipment
  {
    name: "3M Safety Helmet with Chin Strap",
    description: "High impact resistance safety helmet with adjustable suspension and chin strap for construction sites.",
    category: "Safety Equipment",
    subcategory: "Head Protection",
    price: 485,
    mrp: 520,
    stock: 100,
    unit: "piece",
    brand: "3M",
    model: "H-700N",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      material: "HDPE",
      color: "White",
      adjustment: "Ratchet Suspension",
      certification: "ISI Approved",
      warranty: "6 Months"
    },
    tags: ["safety helmet", "3m", "construction", "ppe"],
    supplier: {
      name: "3M India Ltd",
      contact: "+91-80-2223-6644",
      location: "Bangalore, KA"
    }
  }
];

// Connect to MongoDB and add products
mongoose.connect('mongodb://localhost:27017/electricstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const result = await Product.insertMany(products);
    console.log(`Successfully added ${result.length} products`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  }
}).catch(error => {
  console.error('Database connection error:', error);
});
