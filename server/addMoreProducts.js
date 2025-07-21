const mongoose = require('mongoose');
const Product = require('./models/Product');

const additionalProducts = [
  // More Electrical Goods
  {
    name: "L&T 63A Triple Pole MCB",
    description: "Heavy duty miniature circuit breaker for industrial applications with magnetic trip mechanism.",
    category: "Electrical Goods",
    subcategory: "MCB",
    price: 850,
    mrp: 920,
    stock: 35,
    unit: "piece",
    brand: "L&T",
    model: "L&T-TP-63A",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    specifications: {
      voltage: "415V AC",
      amperage: "63A",
      poles: "3 Pole",
      breakingCapacity: "10kA",
      warranty: "2 Years"
    },
    tags: ["mcb", "triple pole", "industrial", "l&t"],
    supplier: {
      name: "L&T Electrical & Automation",
      contact: "+91-44-2496-2425",
      location: "Chennai, TN"
    }
  },
  {
    name: "ABB Earth Leakage Circuit Breaker",
    description: "ELCB for protection against earth leakage and electric shock in residential and commercial installations.",
    category: "Electrical Goods",
    subcategory: "ELCB",
    price: 1450,
    mrp: 1580,
    stock: 20,
    unit: "piece",
    brand: "ABB",
    model: "FH202 AC-25",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    specifications: {
      voltage: "230V AC",
      amperage: "25A",
      sensitivity: "30mA",
      poles: "2 Pole",
      warranty: "3 Years"
    },
    tags: ["elcb", "earth leakage", "abb", "safety"],
    supplier: {
      name: "ABB India Ltd",
      contact: "+91-80-2294-9150",
      location: "Bangalore, KA"
    }
  },

  // More Switches & Sockets
  {
    name: "Havells Crabtree Athena 6A Switch",
    description: "Premium range modular switch with sleek design and superior finish for luxury homes.",
    category: "Switches & Sockets",
    subcategory: "Premium Switches",
    price: 295,
    mrp: 325,
    stock: 150,
    unit: "piece",
    brand: "Havells Crabtree",
    model: "ACWSXXW061",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "250V AC",
      amperage: "6A",
      color: "Sparkling White",
      material: "Polycarbonate",
      warranty: "12 Years"
    },
    tags: ["premium switch", "havells", "athena", "luxury"],
    supplier: {
      name: "Havells India Ltd",
      contact: "+91-8000-446677",
      location: "Noida, UP"
    }
  },
  {
    name: "GM USB Charging Socket 2.1A",
    description: "Modular USB charging socket with dual ports for fast charging of mobile devices and tablets.",
    category: "Switches & Sockets",
    subcategory: "USB Sockets",
    price: 485,
    mrp: 520,
    stock: 80,
    unit: "piece",
    brand: "GM Modular",
    model: "USB-2.1A-WH",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    specifications: {
      voltage: "100-240V AC",
      output: "5V DC, 2.1A",
      ports: "Dual USB",
      color: "White",
      warranty: "2 Years"
    },
    tags: ["usb socket", "charging", "gm modular", "mobile"],
    supplier: {
      name: "GM Modular Pvt Ltd",
      contact: "+91-124-4005000",
      location: "Faridabad, HR"
    }
  },

  // More Lighting Solutions
  {
    name: "Syska 20W LED Panel Light",
    description: "Ultra-slim LED panel light with uniform light distribution, perfect for false ceilings in offices.",
    category: "Lighting Solutions",
    subcategory: "Panel Lights",
    price: 650,
    mrp: 720,
    stock: 100,
    unit: "piece",
    brand: "Syska",
    model: "SSK-PL-20W-4K",
    imageUrl: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    specifications: {
      wattage: "20W",
      voltage: "220-240V AC",
      color: "Cool White (4000K)",
      size: "300x300mm",
      warranty: "2 Years"
    },
    tags: ["panel light", "led", "syska", "office lighting"],
    supplier: {
      name: "Syska LED Lights Pvt Ltd",
      contact: "+91-22-4979-2222",
      location: "Mumbai, MH"
    }
  },
  {
    name: "Wipro 50W LED Flood Light",
    description: "High power LED flood light for outdoor applications with IP65 rating and die-cast aluminum body.",
    category: "Lighting Solutions",
    subcategory: "Flood Lights",
    price: 1250,
    mrp: 1400,
    stock: 45,
    unit: "piece",
    brand: "Wipro",
    model: "D531065",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specifications: {
      wattage: "50W",
      voltage: "220-240V AC",
      color: "Cool White (6500K)",
      lumens: "4000 lm",
      ipRating: "IP65"
    },
    tags: ["flood light", "outdoor", "wipro", "waterproof"],
    supplier: {
      name: "Wipro Consumer Lighting",
      contact: "+91-80-8468-4848",
      location: "Bangalore, KA"
    }
  },

  // More Fans & Ventilation
  {
    name: "Orient Electric Table Fan 400mm",
    description: "High speed table fan with aerodynamic blades and powerful motor for maximum air throw.",
    category: "Fans & Ventilation",
    subcategory: "Table Fans",
    price: 1850,
    mrp: 2000,
    stock: 60,
    unit: "piece",
    brand: "Orient Electric",
    model: "Electric Neo 400",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "220-240V AC",
      power: "55W",
      speed: "1400 RPM",
      sweep: "400mm",
      warranty: "2 Years"
    },
    tags: ["table fan", "orient", "portable", "high speed"],
    supplier: {
      name: "Orient Electric Ltd",
      contact: "+91-11-4711-8000",
      location: "New Delhi"
    }
  },

  // More Power Tools
  {
    name: "Black & Decker Jigsaw 400W",
    description: "Compact jigsaw for cutting wood, metal and plastic with variable speed control and orbital action.",
    category: "Power Tools",
    subcategory: "Cutting Tools",
    price: 2850,
    mrp: 3200,
    stock: 20,
    unit: "piece",
    brand: "Black & Decker",
    model: "JS20-IN",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "220-240V AC",
      power: "400W",
      strokeLength: "18mm",
      strokeRate: "3000 SPM",
      warranty: "2 Years"
    },
    tags: ["jigsaw", "black decker", "cutting", "variable speed"],
    supplier: {
      name: "Black & Decker India",
      contact: "+91-124-4968000",
      location: "Gurgaon, HR"
    }
  },

  // Hand Tools
  {
    name: "Taparia Combination Plier 8 inch",
    description: "Heavy duty combination plier with hardened jaws for gripping, cutting and bending wires.",
    category: "Hardware & Tools",
    subcategory: "Pliers",
    price: 385,
    mrp: 420,
    stock: 150,
    unit: "piece",
    brand: "Taparia",
    model: "1043-8",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "8 inch",
      material: "Carbon Steel",
      finish: "Nickel Plated",
      hardness: "HRC 58-62",
      warranty: "1 Year"
    },
    tags: ["plier", "taparia", "hand tool", "combination"],
    supplier: {
      name: "Taparia Tools Ltd",
      contact: "+91-22-2570-2481",
      location: "Mumbai, MH"
    }
  },

  // Building Materials
  {
    name: "ACC Cement OPC 53 Grade",
    description: "High quality Ordinary Portland Cement for construction with superior strength and durability.",
    category: "Building Materials",
    subcategory: "Cement",
    price: 385,
    mrp: 400,
    stock: 200,
    unit: "bag",
    brand: "ACC",
    model: "OPC-53",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      grade: "53 Grade",
      weight: "50 kg",
      compressiveStrength: "53 N/mm²",
      setting: "Initial: 30 min, Final: 600 min",
      warranty: "N/A"
    },
    tags: ["cement", "acc", "construction", "opc"],
    supplier: {
      name: "ACC Ltd",
      contact: "+91-22-6692-9494",
      location: "Mumbai, MH"
    }
  },

  // Plumbing Supplies
  {
    name: "Astral CPVC Pipe 1/2 inch",
    description: "High quality CPVC pipe for hot and cold water supply with excellent chemical resistance.",
    category: "Plumbing Supplies",
    subcategory: "Pipes",
    price: 145,
    mrp: 160,
    stock: 500,
    unit: "meter",
    brand: "Astral",
    model: "CPVC-15mm",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "15mm (1/2 inch)",
      material: "CPVC",
      pressure: "16 kg/cm²",
      temperature: "Up to 93°C",
      warranty: "10 Years"
    },
    tags: ["cpvc pipe", "astral", "plumbing", "hot water"],
    supplier: {
      name: "Astral Poly Technik Ltd",
      contact: "+91-79-2589-2589",
      location: "Ahmedabad, GJ"
    }
  },

  // Paint & Finishes
  {
    name: "Asian Paints Tractor Emulsion",
    description: "Premium quality interior emulsion paint with excellent coverage and smooth finish.",
    category: "Paint & Finishes",
    subcategory: "Interior Paint",
    price: 685,
    mrp: 750,
    stock: 100,
    unit: "liter",
    brand: "Asian Paints",
    model: "Tractor Emulsion",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      volume: "1 Liter",
      finish: "Matt",
      coverage: "120-140 sq ft",
      dryingTime: "4-6 hours",
      warranty: "5 Years"
    },
    tags: ["paint", "emulsion", "asian paints", "interior"],
    supplier: {
      name: "Asian Paints Ltd",
      contact: "+91-22-6218-8888",
      location: "Mumbai, MH"
    }
  },

  // Steel & Metal Products
  {
    name: "Tata Steel TMT Bar 12mm",
    description: "High strength TMT reinforcement bar with superior bendability and corrosion resistance.",
    category: "Steel & Metal Products",
    subcategory: "TMT Bars",
    price: 52,
    mrp: 55,
    stock: 1000,
    unit: "kg",
    brand: "Tata Steel",
    model: "SD500D-12mm",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      diameter: "12mm",
      grade: "Fe 500D",
      length: "12 meters",
      weight: "0.888 kg/meter",
      warranty: "N/A"
    },
    tags: ["tmt bar", "tata steel", "reinforcement", "construction"],
    supplier: {
      name: "Tata Steel Ltd",
      contact: "+91-657-665-4444",
      location: "Jamshedpur, JH"
    }
  }
];

// Connect to MongoDB and add more products
mongoose.connect('mongodb://localhost:27017/electricstore').then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    const result = await Product.insertMany(additionalProducts);
    console.log(`Successfully added ${result.length} more products`);
    
    const totalProducts = await Product.countDocuments();
    console.log(`Total products in database: ${totalProducts}`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  }
}).catch(error => {
  console.error('Database connection error:', error);
});
