const mongoose = require('mongoose');
const Product = require('./models/Product');

const moreProducts = [
  // More Electrical Goods
  {
    name: "Siemens 25A RCBO",
    description: "Residual Current Circuit Breaker with Overcurrent Protection for enhanced electrical safety.",
    category: "Electrical Goods",
    subcategory: "RCBO",
    price: 2450,
    mrp: 2680,
    stock: 30,
    unit: "piece",
    brand: "Siemens",
    model: "5SU1356-1KK25",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    isFeatured: false,
    specifications: {
      voltage: "230V AC",
      amperage: "25A",
      sensitivity: "30mA",
      certification: "ISI Marked",
      warranty: "3 Years"
    },
    tags: ["rcbo", "siemens", "safety", "protection"],
    supplier: {
      name: "Siemens Ltd",
      contact: "+91-22-3967-7000",
      location: "Mumbai, MH"
    }
  },

  // More Switches & Sockets
  {
    name: "Panasonic Karina 16A Socket",
    description: "Heavy duty universal socket with safety shutters and superior build quality.",
    category: "Switches & Sockets",
    subcategory: "Universal Socket",
    price: 175,
    mrp: 195,
    stock: 120,
    unit: "piece",
    brand: "Panasonic",
    model: "WNE10913",
    imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    specifications: {
      voltage: "250V AC",
      amperage: "16A",
      color: "White",
      material: "Polycarbonate",
      warranty: "2 Years"
    },
    tags: ["socket", "panasonic", "universal", "heavy duty"],
    supplier: {
      name: "Panasonic India Pvt Ltd",
      contact: "+91-124-459-7000",
      location: "Gurgaon, HR"
    }
  },

  // More Lighting Solutions
  {
    name: "Osram 18W LED Tube Light",
    description: "Energy efficient LED tube light with instant start and long lifespan for commercial use.",
    category: "Lighting Solutions",
    subcategory: "LED Tubes",
    price: 420,
    mrp: 460,
    stock: 85,
    unit: "piece",
    brand: "Osram",
    model: "LEDT8-18W-865",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specifications: {
      wattage: "18W",
      voltage: "220-240V AC",
      color: "Cool White (6500K)",
      length: "4 feet",
      lumens: "1800 lm"
    },
    tags: ["led tube", "osram", "energy efficient", "commercial"],
    supplier: {
      name: "Osram India Pvt Ltd",
      contact: "+91-124-459-1000",
      location: "Gurgaon, HR"
    }
  },

  // More Fans & Ventilation
  {
    name: "Havells Velocity Neo 1200mm Fan",
    description: "Premium ceiling fan with aerodynamic design and anti-dust coating for homes.",
    category: "Fans & Ventilation",
    subcategory: "Ceiling Fans",
    price: 3250,
    mrp: 3600,
    stock: 45,
    unit: "piece",
    brand: "Havells",
    model: "FHCVELNWH48",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "220-240V AC",
      power: "75W",
      speed: "400 RPM",
      sweep: "1200mm",
      warranty: "2 Years"
    },
    tags: ["ceiling fan", "havells", "premium", "anti-dust"],
    supplier: {
      name: "Havells India Ltd",
      contact: "+91-8000-446677",
      location: "Noida, UP"
    }
  },

  // More Wiring & Cables
  {
    name: "KEI 1.5sq mm FR House Wire",
    description: "Flame retardant house wire with copper conductor for residential and commercial wiring.",
    category: "Wiring & Cables",
    subcategory: "FR Wire",
    price: 165,
    mrp: 180,
    stock: 800,
    unit: "meter",
    brand: "KEI",
    model: "FR-1.5-BL",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "1100V",
      conductor: "Electrolytic Copper",
      insulation: "FR PVC",
      size: "1.5 sq mm",
      color: "Blue"
    },
    tags: ["house wire", "kei", "flame retardant", "copper"],
    supplier: {
      name: "KEI Industries Ltd",
      contact: "+91-11-4079-4079",
      location: "New Delhi"
    }
  },

  // More Hardware & Tools
  {
    name: "Dewalt Cordless Drill Driver",
    description: "Professional cordless drill with 18V battery and 13mm keyless chuck for versatile drilling.",
    category: "Hardware & Tools",
    subcategory: "Cordless Tools",
    price: 6850,
    mrp: 7200,
    stock: 20,
    unit: "piece",
    brand: "Dewalt",
    model: "DCD771C2",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "18V",
      chuckSize: "13mm",
      batteryType: "Li-ion",
      torqueSettings: "15+1",
      warranty: "3 Years"
    },
    tags: ["cordless drill", "dewalt", "professional", "battery"],
    supplier: {
      name: "Dewalt India Pvt Ltd",
      contact: "+91-124-459-8000",
      location: "Gurgaon, HR"
    }
  },

  // More Power Tools
  {
    name: "Hilti Rotary Hammer Drill",
    description: "Heavy duty rotary hammer drill for concrete drilling with SDS-Plus chuck system.",
    category: "Power Tools",
    subcategory: "Hammer Drills",
    price: 12500,
    mrp: 13200,
    stock: 15,
    unit: "piece",
    brand: "Hilti",
    model: "TE 6-A36",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      voltage: "36V",
      power: "850W",
      drillBitCapacity: "5-28mm",
      chuckType: "SDS-Plus",
      warranty: "2 Years"
    },
    tags: ["rotary hammer", "hilti", "heavy duty", "concrete"],
    supplier: {
      name: "Hilti India Pvt Ltd",
      contact: "+91-80-6750-4000",
      location: "Bangalore, KA"
    }
  },

  // More Safety Equipment
  {
    name: "Karam Safety Harness Full Body",
    description: "Full body safety harness with adjustable straps for working at heights.",
    category: "Safety Equipment",
    subcategory: "Fall Protection",
    price: 1850,
    mrp: 2000,
    stock: 50,
    unit: "piece",
    brand: "Karam",
    model: "PN-51",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      material: "Polyester Webbing",
      buckles: "Auto-lock",
      weightCapacity: "100kg",
      certification: "CE Marked",
      warranty: "1 Year"
    },
    tags: ["safety harness", "karam", "fall protection", "height safety"],
    supplier: {
      name: "Karam Safety Pvt Ltd",
      contact: "+91-11-4721-4721",
      location: "New Delhi"
    }
  },

  // More Building Materials
  {
    name: "UltraTech Ready Mix Concrete M25",
    description: "High grade ready mix concrete with superior strength and workability for construction.",
    category: "Building Materials",
    subcategory: "Concrete",
    price: 4200,
    mrp: 4350,
    stock: 50,
    unit: "cubic meter",
    brand: "UltraTech",
    model: "RMC-M25",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      grade: "M25",
      compressiveStrength: "25 N/mm²",
      slump: "75-100mm",
      aggregateSize: "20mm",
      warranty: "N/A"
    },
    tags: ["ready mix", "concrete", "ultratech", "construction"],
    supplier: {
      name: "UltraTech Cement Ltd",
      contact: "+91-22-6691-9000",
      location: "Mumbai, MH"
    }
  },

  // More Plumbing Supplies
  {
    name: "Prince PVC Pipe 2 inch",
    description: "High quality PVC pipe for drainage and sewage applications with smooth inner surface.",
    category: "Plumbing Supplies",
    subcategory: "Drainage Pipes",
    price: 285,
    mrp: 310,
    stock: 300,
    unit: "meter",
    brand: "Prince",
    model: "PVC-50mm-SWR",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "50mm (2 inch)",
      material: "uPVC",
      pressure: "4 kg/cm²",
      application: "Soil, Waste & Rain Water",
      warranty: "10 Years"
    },
    tags: ["pvc pipe", "prince", "drainage", "sewage"],
    supplier: {
      name: "Prince Pipes & Fittings Ltd",
      contact: "+91-22-6666-9999",
      location: "Mumbai, MH"
    }
  },

  // More Paint & Finishes
  {
    name: "Berger Easy Clean Interior Paint",
    description: "Washable interior emulsion paint with stain resistance and smooth finish.",
    category: "Paint & Finishes",
    subcategory: "Washable Paint",
    price: 890,
    mrp: 950,
    stock: 80,
    unit: "liter",
    brand: "Berger Paints",
    model: "Easy Clean Tintable",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      volume: "1 Liter",
      finish: "Silk",
      coverage: "130-150 sq ft",
      washability: "Up to 20,000 scrubs",
      warranty: "7 Years"
    },
    tags: ["interior paint", "berger", "washable", "stain resistant"],
    supplier: {
      name: "Berger Paints India Ltd",
      contact: "+91-33-2659-3200",
      location: "Kolkata, WB"
    }
  },

  // More Steel & Metal Products
  {
    name: "SAIL MS Angle 40x40x5mm",
    description: "Mild steel angle bar for structural applications with excellent strength and durability.",
    category: "Steel & Metal Products",
    subcategory: "Angles",
    price: 48,
    mrp: 52,
    stock: 500,
    unit: "kg",
    brand: "SAIL",
    model: "MS-L40405",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "40x40x5mm",
      material: "Mild Steel",
      length: "6 meters",
      weight: "2.98 kg/meter",
      grade: "IS 2062"
    },
    tags: ["ms angle", "sail", "structural", "mild steel"],
    supplier: {
      name: "Steel Authority of India Ltd",
      contact: "+91-11-2436-7481",
      location: "New Delhi"
    }
  },

  // More Pipes & Fittings
  {
    name: "Supreme PVC Ball Valve 1 inch",
    description: "Heavy duty PVC ball valve for water control with lever handle and full bore design.",
    category: "Pipes & Fittings",
    subcategory: "Valves",
    price: 285,
    mrp: 315,
    stock: 100,
    unit: "piece",
    brand: "Supreme",
    model: "PVC-BV-25mm",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "25mm (1 inch)",
      material: "uPVC",
      pressure: "10 kg/cm²",
      handle: "Lever Type",
      warranty: "5 Years"
    },
    tags: ["ball valve", "supreme", "pvc", "water control"],
    supplier: {
      name: "Supreme Industries Ltd",
      contact: "+91-22-4001-6666",
      location: "Mumbai, MH"
    }
  },

  // Hand Tools
  {
    name: "Pye Adjustable Wrench 10 inch",
    description: "Chrome vanadium steel adjustable wrench with non-slip grip for mechanical work.",
    category: "Hand Tools",
    subcategory: "Wrenches",
    price: 485,
    mrp: 520,
    stock: 80,
    unit: "piece",
    brand: "Pye",
    model: "ADJ-10",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "10 inch",
      material: "Chrome Vanadium Steel",
      finish: "Chrome Plated",
      jawCapacity: "32mm",
      warranty: "2 Years"
    },
    tags: ["adjustable wrench", "pye", "chrome vanadium", "mechanical"],
    supplier: {
      name: "Pye Tools Pvt Ltd",
      contact: "+91-11-2857-4000",
      location: "New Delhi"
    }
  }
];

// Connect to MongoDB and add even more products
mongoose.connect('mongodb://localhost:27017/electricstore').then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    const result = await Product.insertMany(moreProducts);
    console.log(`Successfully added ${result.length} more products`);
    
    const totalProducts = await Product.countDocuments();
    console.log(`Total products in database: ${totalProducts}`);
    
    // Show category wise count
    const categoryCount = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\nCategory wise product count:');
    categoryCount.forEach(cat => {
      console.log(`${cat._id}: ${cat.count} products`);
    });
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  }
}).catch(error => {
  console.error('Database connection error:', error);
});
