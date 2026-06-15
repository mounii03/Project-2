/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product, Testimonial, Coupon } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // ================== ELECTRONICS ==================
  {
    id: 'elec-1',
    title: 'AeroSound Pro ANC Wireless Headphones',
    price: 249.99,
    originalPrice: 299.99,
    discountPercent: 17,
    category: Category.ELECTRONICS,
    description: 'Immerse yourself in flawless acoustics with industry-leading Active Noise Cancellation (ANC), 40-hour battery life, and high-resolution sound drivers. Ergonomically designed for long-wear luxury listening sessions.',
    features: [
      'Active Hybrid Noise Cancellation with Transparency Mode',
      'Ultra-efficient audio processor for near-zero latency latency',
      'Plush, sweat-resistant protein leather memory foam ear cups',
      'Quick charging: 10 minutes gives up to 5 hours of playback',
      'Dual multi-point connectivity'
    ],
    specs: {
      'Driver Unit': '40 mm Dynamic Dome',
      'Frequency Response': '4Hz - 40,000Hz',
      'Bluetooth Version': '5.3 Class 1',
      'Codec Support': 'LDAC, AAC, SBC',
      'Battery Life': 'Up to 40 hours (ANC Off), 30 hours (ANC On)'
    },
    images: [
      'https://files.catbox.moe/ewh7sy.htm',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 148,
    reviews: [
      {
        id: 'rev-e1-1',
        userName: 'Alex Carter',
        rating: 5,
        comment: 'Absolutely stunning audio clarity. Soundstage is broad, ANC is incredibly silent, and the comfort is unmatched. Worth every single penny!',
        date: '2026-05-18',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120'
      },
      {
        id: 'rev-e1-2',
        userName: 'Sophia Martinez',
        rating: 4,
        comment: 'Great sound and battery life. My only issue is they are a tad tight on my ears, but they did loosen slightly after a week. ANC is magical!',
        date: '2026-06-02',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'AeroSound',
    inStock: true,
    colors: ['Carbon Black', 'Platinium Silver', 'Midnight Blue'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'elec-2',
    title: 'Horizon Sync Pro Smart Watch',
    price: 189.99,
    originalPrice: 189.99,
    category: Category.ELECTRONICS,
    description: 'Track your fitness, track your sleep, and stay effortlessly connected. Horizon Sync Pro features a brilliant Always-on AMOLED display, over 80 sports modes, real-time blood-oxygen monitoring, and a sleek waterproof body.',
    features: [
      '1.43” Always-On AMOLED Touch Screen with scratch-resistant glass',
      'Precision biosensors for Heart Rate, SpO2, Sleep tracking',
      'Up to 10-day battery life per single full charge',
      '5 ATM Water Resistance suitable for swimming and rain tracking',
      'Built-in GPS for automatic workout mapping offline'
    ],
    specs: {
      'Display Size': '326 PPI AMOLED, 454x454 pixels',
      'Dimensions': '46 x 46 x 10.6 mm',
      'Sensors': 'Optical heart rate, Accelerometer, Gyroscope, Geomagnetic',
      'GPS': 'Dual-Band GNSS (GPS, GLONASS, Galileo)',
      'Storage': '4GB High-Speed Flash memory'
    },
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.6,
    reviewsCount: 92,
    reviews: [
      {
        id: 'rev-e2-1',
        userName: 'Jason Vance',
        rating: 5,
        comment: 'Best smartwatch I’ve ever owned. Battery actually lasts close to 9 days with regular use. AMOLED display is ridiculously vibrant.',
        date: '2026-04-29',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Horizon',
    inStock: true,
    colors: ['Stellar Gray', 'Rose Gold', 'Alpine Green'],
    isNewArrival: true
  },
  {
    id: 'elec-3',
    title: 'PrecisionKey Mechanical Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    discountPercent: 18,
    category: Category.ELECTRONICS,
    description: 'Engineered for dedicated coders and pro gamers alike. Features hot-swappable tactile linear yellow switches, full RGB dynamic backlighting with customizable macros, and dual sound-dampening foam inserts for acoustics.',
    features: [
      'Hot-swappable linear mechanical pre-lubed yellow switches',
      'Premium double-shot PBT cherry profile keycaps',
      'Solid CNC-machined aluminum heavy framing',
      'Bluetooth 5.1, 2.4Ghz dongle, and Type-C wired connectivity',
      'Full RGB programmable lighting effects'
    ],
    specs: {
      'Layout': '75% Layout (82 keys)',
      'Switches': 'Custom Lubed Linear Yellow Switches (45g actuate)',
      'Connection': 'Tri-Mode (Wired, 2.4G Wireless, 3x Bluetooth channels)',
      'Battery Capacity': '4000mAh rechargeable Lithium-Polymer',
      'Dimensions': '320 x 135 x 40 mm'
    },
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1626908013351-800ddd734b8a?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 61,
    reviews: [
      {
        id: 'rev-e3-1',
        userName: 'Elena Rostova',
        rating: 5,
        comment: 'The sound profiles are incredibly buttery and deep. Highly premium construct. This keyboard feels like it will last a lifetime.',
        date: '2026-05-25',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'PrecisionKey',
    inStock: true,
    colors: ['Chalk White', 'Slate Gray', 'Cosmic Cyberpunk'],
    isFeatured: true
  },
  {
    id: 'elec-4',
    title: 'Apex-Curved 34" Ultrawide Creator Monitor',
    price: 499.99,
    originalPrice: 599.99,
    discountPercent: 16,
    category: Category.ELECTRONICS,
    description: 'Elevate your visual space. The Apex-Curved ultrawide display offers stunning WQHD resolution, realistic HDR400 color gradients, and a fluid 144Hz refresh rate, crafted with an elegant ultra-thin ergonomic stand.',
    features: [
      '34" WQHD (3440 x 1440) resolution with 21:9 cinematic ultrawide aspect ratio',
      'Aggressive 1500R curvature for immersive gaming and expansive multitasking',
      '99% sRGB & 95% DCI-P3 professional creative color accuracy standards',
      '144Hz high-speed refresh rate and AMD FreeSync Premium',
      'Integrated USB-C docking with 90W power output'
    ],
    specs: {
      'Screen Size': '34 Inches Curved VA Panel',
      'Response Time': '1ms MPRT',
      'Brightness': '400 nits',
      'Inputs': '2x HDMI 2.0, 1x DisplayPort 1.4, 1x USB-C (90W DP charging)',
      'Stand Adjustments': 'Height, Tilt, Swivel, VESA Compatible'
    },
    images: [
      'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551645121-d1034da75057?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewsCount: 43,
    reviews: [
      {
        id: 'rev-e4-1',
        userName: 'Michael Thorne',
        rating: 5,
        comment: 'Colors are dead-accurate for color-grading design. Minimal black bleed and the curves are delightful to work on. 10/10.',
        date: '2026-06-03',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Apex',
    inStock: true,
    colors: ['Titanium Silver'],
    isFeatured: true
  },

  // ================== FASHION ==================
  {
    id: 'fash-1',
    title: 'Classic Wool-Blend Double Breasted Trench Coat',
    price: 179.99,
    originalPrice: 220.00,
    discountPercent: 18,
    category: Category.FASHION,
    description: 'Effortless style meets functional warmth. Crafted from premium heavyweight organic wool blends, this double-breasted coat offers structural lines, side welt pockets, adjustable sleeve cuffs, and a full inner satin lining.',
    features: [
      'Superior wool and cashmere soft-breathable blend material',
      'Classic storm-flaps and double-breasted high button layout',
      'Interior secure pocket for smartphone and passport holder',
      'Full premium windproof satin inner lining insulation',
      'Eco-friendly sustainable coloring materials used'
    ],
    specs: {
      'Material': '60% Recycled Wool, 30% Polyester, 10% Cashmere',
      'Care Instructions': 'Professional dry clean only',
      'Length': 'Below-knee length fitting',
      'Fit': 'Relaxed structured tailored tailoring'
    },
    images: [
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 88,
    reviews: [
      {
        id: 'rev-f1-1',
        userName: 'Diana Prince',
        rating: 5,
        comment: 'Very premium structure. Fits beautifully, blocks the chilled wind completely and commands compliments. Easily feels double the price.',
        date: '2026-03-12',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Nouveau',
    inStock: true,
    colors: ['Camel Beige', 'Charcoal Grey', 'Classic Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'fash-2',
    title: 'CityVent Urban Bomber Jacket',
    price: 119.99,
    originalPrice: 119.99,
    category: Category.FASHION,
    description: 'Perfect for transitional climates, this bomber jacket offers high wind resistance, durable water repellent (DWR) protection, and an agile athletic fit optimized for urban commuting.',
    features: [
      'Premium tear-resistant high-density nylon construction',
      'Water-repellent nanotech coating blocks showers',
      'Stretch rib-knit collar, cuffs, and bottom hem structure',
      'Dual zippered fleece-lined handwarmer pockets',
      'Inner tech-device pocket with integrated cord routing route'
    ],
    specs: {
      'Shell': '100% Recycled Ripstop Nylon',
      'Lining': 'Breathable microfleece dynamic core layer',
      'Water Resistance': 'DWR Grade 3',
      'Weight': 'Medium-light lightweight feel'
    },
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.5,
    reviewsCount: 37,
    reviews: [
      {
        id: 'rev-f2-1',
        userName: 'Austin Hayes',
        rating: 4,
        comment: 'Extremely durable. Keeps the rain off nicely during my bicycle commutes. Looks very sharp on slate colors.',
        date: '2026-05-10',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'UrbanCraft',
    inStock: true,
    colors: ['Slate Grey', 'Military Olive', 'Crimson Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNewArrival: true
  },
  {
    id: 'fash-3',
    title: 'Minimalist Prime Leather Sneakers',
    price: 139.99,
    originalPrice: 159.99,
    discountPercent: 12,
    category: Category.FASHION,
    description: 'The definitive luxury clean sneaker. Handcrafted from top-grain Italian calfskin leather, structured on ultra-durable Margom vulcanized rubber outsoles. Designed to pair seamlessly with formal tailoring or casual weekend denim.',
    features: [
      'Buttery-soft full top-grain Italian leather uppers',
      'Smooth breathable leather lining and cushioned footbeds',
      'Reinforced hand-stitched vulcanized rubber outsoles',
      'Waxed durable cotton laces matching upper hues',
      'Discreet golden heel stamp lettering detail'
    ],
    specs: {
      'Outer Upper': '100% Full-Grain Italian Calfskin Leather',
      'Sole': '100% Natural Margom Rubber Outsole',
      'Assembly': 'Hand-stitched in Florence, Italy',
      'Arch Support': 'Medium supportive comfort contour'
    },
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 114,
    reviews: [
      {
        id: 'rev-f3-1',
        userName: 'Nico Harris',
        rating: 5,
        comment: 'Unbeatable quality. The leather is unbelievably soft, almost no break-in period. Easily competes with luxury labels costing $400+.',
        date: '2026-06-01',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Atelier',
    inStock: true,
    colors: ['Chalk White', 'Saddle Tan', 'Jet Black'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    isFeatured: true
  },

  // ================== ACCESSORIES ==================
  {
    id: 'acc-1',
    title: 'AeroVue Polarized Wayfarer Sunglasses',
    price: 89.99,
    originalPrice: 110.00,
    discountPercent: 18,
    category: Category.ACCESSORIES,
    description: 'Safeguard your eyes in signature vintage style. AeroVue features high-precision multi-coat polarized lenses blocking 100% UVA/UVB waves, paired with super lightweight tortoise-acetate hand-polished framing.',
    features: [
      '9-layer polarizing filter reduces blinding glare by 99%',
      'Anti-reflective, anti-oil, and scratch-resistant coating',
      'Rich organic hand-polished cellulose acetate templates',
      'Sturdy heavy-duty 5-barrel metallic stainless hinges',
      'Protective leatherette designer casing and micro-pouch included'
    ],
    specs: {
      'Lens Technology': 'TAC Polarized UV400 Protect Category 3',
      'Bridge Width': '20 mm',
      'Lens Width': '52 mm',
      'Temple Length': '145 mm',
      'Frame Base': 'Tortoise Acetate or Matte Midnight'
    },
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.6,
    reviewsCount: 75,
    reviews: [
      {
        id: 'rev-a1-1',
        userName: 'Maya Lin',
        rating: 5,
        comment: 'Crystal clear definition in bright sunshine. Drives are way safer and they feel lightweight without slipping.',
        date: '2026-05-15',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'AeroVue',
    inStock: true,
    colors: ['Classic Tortoise', 'Matte Obsidian'],
    isBestSeller: true
  },
  {
    id: 'acc-2',
    title: 'Legacy Saffiano Leather RFID Wallet',
    price: 59.99,
    originalPrice: 59.99,
    category: Category.ACCESSORIES,
    description: 'Keep your vital details secure. Handcrafted from scratch-resistant Italian Saffiano cross-hatch leather, featuring modern RFID-blocking signal shields, multiple cards slots, and an ultra-thin pocket-perfect geometry.',
    features: [
      'Integrated RFID protection shield blocks wireless scanning standard frequencies',
      'Includes 6 snug card pockets, 2 hidden slots, large billfold',
      'Premium Saffiano finish resists scuffing, oil, and liquid splatters',
      'Slim profile thickness is optimized for front-pocket comfort',
      'Exquisite hand-turned corner borders detailing'
    ],
    specs: {
      'Material': '100% Genuine Italian Saffiano Calfskin Leather',
      'Dimensions': '110 x 85 x 12 mm folded',
      'Shield Rating': 'Blocks 13.56 MHz frequencies standard',
      'Packaging': 'Deluxe wooden gift slider box'
    },
    images: [
      'https://images.unsplash.com/photo-1627124118306-64a2c06e64d6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 131,
    reviews: [
      {
        id: 'rev-a2-1',
        userName: 'Robert K.',
        rating: 5,
        comment: 'The saffiano texture is outstanding. Cards fit secure but extract easy. Best wallet I’ve ever bought for travel.',
        date: '2026-04-18',
        avatarUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Legacy',
    inStock: true,
    colors: ['Cognac Brown', 'Carbon Black', 'Royal Navy'],
    isFeatured: true
  },
  {
    id: 'acc-3',
    title: 'Vanguard Chronograph Mechanical Watch',
    price: 349.99,
    originalPrice: 399.99,
    discountPercent: 12,
    category: Category.ACCESSORIES,
    description: 'A timeless mechanical statement. Housing a precise Japanese automatic self-winding movement underneath ultra-clear Sapphire crystal glass. Outfitted with dual stopwatch dials and an integrated luxury stainless steel oyster-link band.',
    features: [
      'Vibrant Japanese 24-jewel automatic self-winding movement',
      'Double-domed, scratch-proof Sapphire protective crystal with anti-reflective coating',
      'Fully functioning seconds and minute chronographs',
      '10 ATM / 100M water resistant depth, suitable for snorkelling',
      'Super-LumiNova glowing index indicators for night readability'
    ],
    specs: {
      'Movement': 'Seiko NH35a Automatic Hand-windable movement',
      'Case Diameter': '41 mm',
      'Case Thickness': '12.8 mm',
      'Band Material': '316L Solid Surgical Grade Stainless Steel',
      'Power Reserve': '41 fully wound hours'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.9,
    reviewsCount: 52,
    reviews: [
      {
        id: 'rev-a3-1',
        userName: 'Gavin Sterling',
        rating: 5,
        comment: 'Movement is incredibly precise. Sweeps cleanly, bezel action feels tight and crisp. Exceptional watch.',
        date: '2026-06-08',
        avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Vanguard',
    inStock: true,
    colors: ['Stellar Silver', 'Rose Gold Slate'],
    isFeatured: true,
    isNewArrival: true
  },

  // ================== LIFESTYLE ==================
  {
    id: 'life-1',
    title: 'Curated Ceramic Soy Aromatherapy Candle',
    price: 34.99,
    originalPrice: 45.00,
    discountPercent: 22,
    category: Category.LIFESTYLE,
    description: 'Transform your room atmosphere. Our limited edit hand-poured candle is crafted from ecological clean soy wax, essential oil pairings of Sandalwood, Fig, and Cedarwood. Encased in a beautiful reusable earthy rough-textured matte ceramic vessel.',
    features: [
      '100% natural, eco-friendly clean-burning biodegradable soy wax',
      'Long-lasting soothing double-cotton wick offering crackle ambiance',
      'Over 60 hours of curated scent dispersion burn time',
      'Completely paraffin-free, phthalate-free clean-air certified formula',
      'Vessel turns into a beautiful tea mug or succulent pot after burn'
    ],
    specs: {
      'Scent Profile': 'Top: Fresh Fig, Cedar. Heart: Amber, Pine. Base: Creamy Sandalwood.',
      'Wax Weight': '11 Ounces / 310 grams',
      'Vessel Material': 'Rough-textured earthenware handmade ceramic',
      'Scent Strength': 'Strong background aromatic throw'
    },
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582211594533-268f4f1edeb9?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 165,
    reviews: [
      {
        id: 'rev-l1-1',
        userName: 'Camila Rodriguez',
        rating: 5,
        comment: 'The sandalwood fig scent is luxurious, warm, and comforting. Doesn’t give an artificial headache like cheap drug store versions. Buying 3 more!',
        date: '2026-05-20',
        avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Curated',
    inStock: true,
    colors: ['Sandalwood Fig', 'Tobacco Moss', 'Vanilla Santal'],
    isBestSeller: true
  },
  {
    id: 'life-2',
    title: 'Glacier Double-Wall Thermal Flask',
    price: 29.99,
    originalPrice: 29.99,
    category: Category.LIFESTYLE,
    description: 'Keep your beverages ice cold for up to 24 hours or steaming hot for 12. Glacier flask features heavy triple-layered insulation under solid food-grade stainless structure and a leak-proof bamboo locking handle caps.',
    features: [
      'Advanced vacuum-trap triple insulation prevents outer sweating',
      'Constructed with inert premium 18/8 food-grade pro stainless steel',
      'Keeps Liquids: 24 Hours Cold / 12 Hours Hot insulated',
      'Ergonomic genuine bamboo handle cap for premium style touch',
      'BPA-Free, toxin-free rust-proof lifetime quality'
    ],
    specs: {
      'Volume': '32 Ounces / 950 ml',
      'Weight': '380 grams (empty)',
      'Cap Styles': 'Bamboo Steel Handle Cap & Sip Straw Action Cap',
      'Coating': 'Impact-resistant premium matte powder finish'
    },
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 110,
    reviews: [
      {
        id: 'rev-l2-1',
        userName: 'Brian Fletcher',
        rating: 5,
        comment: 'Unbelievably good insulation. Left it in my car in 90 degree weather, water inside stayed bone chillingly cold. Solid powder coat!',
        date: '2026-05-30',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120'
      }
    ],
    brand: 'Glacier',
    inStock: true,
    colors: ['Glacier Slate', 'Powder White', 'Silt Obsidian'],
    isFeatured: true
  }
];

export const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Emily Watson',
    role: 'Loyal customer since 2024',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    comment: 'The quality of curation at Trends is outstanding. Their tech products are reliable and stylish, and shipping takes less than two days to reach my door! Highly recommended.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Marcus Brody',
    role: 'Creative Director',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
    comment: 'I bought their minimalist sneakers and wool trench coat. The fits are customized to perfection, and the Italian top-grain calfskin leather wears incredibly well. A supreme shopping platform.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Sarah Jenkins',
    role: 'Eco-conscious Techie',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
    comment: 'Exceptional 24/7 customer service. I had an issue applying my sign-up coupon code, and the live agent resolved it in under 3 minutes! Security of checkout processes gives absolute peace of mind.',
    rating: 5
  }
];

export const VALID_COUPONS: Coupon[] = [
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    value: 20,
    description: 'Get 20% off all orders! No minimum spend.',
    minSpend: 0
  },
  {
    code: 'TRENDS50',
    discountType: 'fixed',
    value: 50,
    description: '$50 off on orders of $250 or more!',
    minSpend: 250
  },
  {
    code: 'FREESHIP',
    discountType: 'percentage',
    value: 0,
    description: 'Free logistics & express shipping on orders over $100.',
    minSpend: 100
  }
];

export const INSTANT_FAQ = [
  {
    q: 'How long does shipping standard delivery take?',
    a: 'We offer express processing! Domestic delivery typically takes 2 to 3 business days, while international distribution is processed and completed within 5 to 7 business days.'
  },
  {
    q: 'What is the return policy?',
    a: 'We provide a hassle-free 30-day return policy! If you are not 100% satisfied with your premium products, prepare a return label from the account dashboard for a complete full refund.'
  },
  {
    q: 'Are payments on Trends fully secure?',
    a: 'Yes, absolutely. We enforce industry-grade SSL encryption and comply fully with PCI-DSS protocols. Your financial credit card details are never saved or stored directly on our servers.'
  },
  {
    q: 'How can I tracking my dispatch order?',
    a: 'Once your transaction is checked and products leave the warehouse, a real-time tracking number is dispatched to your registered email containing direct logistics maps.'
  }
];
