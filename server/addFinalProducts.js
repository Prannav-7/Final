const mongoose = require('mongoose');
const Product = require('./models/Product');

const finalProducts = [
  // More Electrical Motors
  {
    name: "Crompton Greaves 1HP Motor",
    description: "Single phase induction motor with high efficiency and low maintenance for industrial use.",
    category: "Electrical Motors",
    subcategory: "Single Phase Motor",
    price: 4850,
    mrp: 5200,
    stock: 25,
    unit: "piece",
    brand: "Crompton Greaves",
    model: "CG-1HP-SP",
    imageUrl: "https://images.unsplash.com/photo-1581092795442-48c81e3b48e2?w=400&h=400&fit=crop",
    isFeatured: true,
    specifications: {
      voltage: "220V AC",
      power: "1 HP (0.75 kW)",
      speed: "1440 RPM",
      efficiency: "85%",
      warranty: "18 Months"
    },
    tags: ["motor", "crompton", "single phase", "industrial"],
    supplier: {
      name: "Crompton Greaves Consumer Electricals Ltd",
      contact: "+91-22-6665-8282",
      location: "Mumbai, MH"
    }
  },

  {
    name: "Bharat Bijlee 3HP Three Phase Motor",
    description: "Three phase squirrel cage induction motor for heavy duty industrial applications.",
    category: "Electrical Motors",
    subcategory: "Three Phase Motor",
    price: 8950,
    mrp: 9500,
    stock: 15,
    unit: "piece",
    brand: "Bharat Bijlee",
    model: "BB-3HP-TP",
    imageUrl: "https://images.unsplash.com/photo-1581092795442-48c81e3b48e2?w=400&h=400&fit=crop",
    specifications: {
      voltage: "415V AC",
      power: "3 HP (2.2 kW)",
      speed: "1440 RPM",
      efficiency: "87%",
      warranty: "12 Months"
    },
    tags: ["motor", "bharat bijlee", "three phase", "heavy duty"],
    supplier: {
      name: "Bharat Bijlee Ltd",
      contact: "+91-22-2570-2570",
      location: "Mumbai, MH"
    }
  },

  {
    name: "ABB 5HP VFD Motor",
    description: "Variable frequency drive motor with precise speed control for automation applications.",
    category: "Electrical Motors",
    subcategory: "VFD Motor",
    price: 18500,
    mrp: 19500,
    stock: 8,
    unit: "piece",
    brand: "ABB",
    model: "M2BA-5HP-VFD",
    imageUrl: "https://images.unsplash.com/photo-1581092795442-48c81e3b48e2?w=400&h=400&fit=crop",
    specifications: {
      voltage: "415V AC",
      power: "5 HP (3.7 kW)",
      speed: "Variable 0-1450 RPM",
      efficiency: "92%",
      warranty: "24 Months"
    },
    tags: ["vfd motor", "abb", "variable speed", "automation"],
    supplier: {
      name: "ABB India Ltd",
      contact: "+91-80-2294-9150",
      location: "Bangalore, KA"
    }
  },

  // More Pipes & Fittings
  {
    name: "Astral CPVC Pipe 3/4 inch",
    description: "Chlorinated PVC pipe for hot and cold water applications with superior chemical resistance.",
    category: "Pipes & Fittings",
    subcategory: "CPVC Pipes",
    price: 195,
    mrp: 215,
    stock: 250,
    unit: "meter",
    brand: "Astral",
    model: "CPVC-20mm-SDR11",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "20mm (3/4 inch)",
      material: "CPVC",
      pressure: "25 kg/cm²",
      temperature: "Up to 93°C",
      warranty: "10 Years"
    },
    tags: ["cpvc pipe", "astral", "hot water", "chemical resistant"],
    supplier: {
      name: "Astral Ltd",
      contact: "+91-79-2980-0800",
      location: "Ahmedabad, GJ"
    }
  },

  {
    name: "Finolex PVC Elbow 2 inch",
    description: "90 degree PVC elbow fitting for plumbing connections with smooth flow design.",
    category: "Pipes & Fittings",
    subcategory: "Fittings",
    price: 85,
    mrp: 95,
    stock: 200,
    unit: "piece",
    brand: "Finolex",
    model: "PVC-ELB-50-90",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "50mm (2 inch)",
      material: "uPVC",
      angle: "90 degrees",
      pressure: "10 kg/cm²",
      warranty: "5 Years"
    },
    tags: ["pvc elbow", "finolex", "fitting", "90 degree"],
    supplier: {
      name: "Finolex Industries Ltd",
      contact: "+91-2652-273001",
      location: "Pune, MH"
    }
  },

  {
    name: "Jindal Galvanized Pipe 1 inch",
    description: "Hot dip galvanized steel pipe for water supply with excellent corrosion resistance.",
    category: "Pipes & Fittings",
    subcategory: "GI Pipes",
    price: 285,
    mrp: 310,
    stock: 150,
    unit: "meter",
    brand: "Jindal",
    model: "GI-25NB-HD",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      size: "25 NB (1 inch)",
      material: "Galvanized Steel",
      coating: "Hot Dip Galvanized",
      pressure: "21 kg/cm²",
      warranty: "5 Years"
    },
    tags: ["gi pipe", "jindal", "galvanized", "water supply"],
    supplier: {
      name: "Jindal Steel & Power Ltd",
      contact: "+91-11-4151-5555",
      location: "New Delhi"
    }
  },

  // More Hand Tools
  {
    name: "Stanley Screwdriver Set 6 Piece",
    description: "Professional screwdriver set with chrome vanadium steel shafts and ergonomic handles.",
    category: "Hand Tools",
    subcategory: "Screwdriver Sets",
    price: 650,
    mrp: 720,
    stock: 100,
    unit: "set",
    brand: "Stanley",
    model: "STHT60028",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      pieces: "6 Piece Set",
      material: "Chrome Vanadium Steel",
      handle: "Ergonomic Bi-material",
      types: "Phillips & Slotted",
      warranty: "Lifetime"
    },
    tags: ["screwdriver set", "stanley", "professional", "ergonomic"],
    supplier: {
      name: "Stanley Black & Decker India Pvt Ltd",
      contact: "+91-124-459-7000",
      location: "Gurgaon, HR"
    }
  },

  {
    name: "Taparia Plier Set 3 Piece",
    description: "High carbon steel plier set with induction hardened cutting edges for electrical work.",
    category: "Hand Tools",
    subcategory: "Pliers",
    price: 850,
    mrp: 920,
    stock: 75,
    unit: "set",
    brand: "Taparia",
    model: "PL-SET-3PC",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      pieces: "3 Piece Set",
      material: "High Carbon Steel",
      finish: "Black Oxide",
      sizes: "6\", 8\", 10\"",
      warranty: "2 Years"
    },
    tags: ["plier set", "taparia", "electrical", "high carbon steel"],
    supplier: {
      name: "Taparia Tools Ltd",
      contact: "+91-11-2637-3737",
      location: "New Delhi"
    }
  },

  {
    name: "Bosch Spirit Level 24 inch",
    description: "Aluminum spirit level with precision ground vials for accurate measurements.",
    category: "Hand Tools",
    subcategory: "Measuring Tools",
    price: 1450,
    mrp: 1580,
    stock: 40,
    unit: "piece",
    brand: "Bosch",
    model: "BST-60-24",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      length: "24 inch (600mm)",
      material: "Aluminum",
      vials: "3 (Horizontal, Vertical, 45°)",
      accuracy: "±0.5mm/m",
      warranty: "2 Years"
    },
    tags: ["spirit level", "bosch", "measuring", "precision"],
    supplier: {
      name: "Bosch Ltd",
      contact: "+91-80-6749-2222",
      location: "Bangalore, KA"
    }
  },

  // Additional Building Materials
  {
    name: "ACC Cement Portland Pozzolana",
    description: "High quality blended cement with fly ash for enhanced durability and strength.",
    category: "Building Materials",
    subcategory: "Cement",
    price: 385,
    mrp: 400,
    stock: 200,
    unit: "bag",
    brand: "ACC",
    model: "PPC-53-Grade",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      grade: "53 Grade",
      type: "Portland Pozzolana Cement",
      weight: "50 kg",
      compressiveStrength: "53 N/mm²",
      warranty: "N/A"
    },
    tags: ["cement", "acc", "ppc", "construction"],
    supplier: {
      name: "ACC Ltd",
      contact: "+91-22-6692-0001",
      location: "Mumbai, MH"
    }
  },

  {
    name: "Birla White Putty 40kg",
    description: "Premium wall putty for smooth and durable interior wall finishing.",
    category: "Building Materials",
    subcategory: "Wall Putty",
    price: 850,
    mrp: 900,
    stock: 120,
    unit: "bag",
    brand: "Birla White",
    model: "WP-40-Premium",
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
    specifications: {
      weight: "40 kg",
      coverage: "240-280 sq ft",
      dryingTime: "4-6 hours",
      recoatTime: "12 hours",
      warranty: "7 Years"
    },
    tags: ["wall putty", "birla white", "interior", "finishing"],
    supplier: {
      name: "UltraTech Cement Ltd",
      contact: "+91-22-6691-9000",
      location: "Mumbai, MH"
    }
  }
];

// Connect to MongoDB and add final products
mongoose.connect('mongodb://localhost:27017/electricstore').then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    const result = await Product.insertMany(finalProducts);
    console.log(`Successfully added ${result.length} final products`);
    
    const totalProducts = await Product.countDocuments();
    console.log(`Total products in database: ${totalProducts}`);
    
    // Show final category wise count
    const categoryCount = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\nFinal category wise product count:');
    categoryCount.forEach(cat => {
      console.log(`${cat._id}: ${cat.count} products`);
    });
    
    // Show featured products count
    const featuredCount = await Product.countDocuments({ isFeatured: true });
    console.log(`\nFeatured products: ${featuredCount}`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
    console.log('\n🎉 Product catalog is now complete with comprehensive inventory!');
  } catch (error) {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  }
}).catch(error => {
  console.error('Database connection error:', error);
});
