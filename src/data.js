export const navLinks = [
  { name: "Home", href: "home" },
  { name: "Shop", href: "shop" },
  { name: "Reviews", href: "reviews" },
  { name: "Contact", href: "contact" },
];

export const allPlants = [
  {
    id: "aglaonema-indoor",
    name: "Aglaonema Plant",
    category: "Indoor",
    price: "300",
    imageUrl: "/images/top_aglaonema.png",
    description: "Known as the Chinese Evergreen, this plant features stunning silver-green foliage that purifies indoor air.",
    sunlight: "Low to bright indirect light",
    water: "Every 1-2 weeks (allow soil to dry)",
    difficulty: "Easy",
    size: "12-18\" Tall in 6\" Pot",
    petFriendly: false,
    about: "The Aglaonema is highly praised as a foliage houseplant. It is native to tropical and subtropical regions of Asia and New Guinea. With its silver-green patterns and air-filtering capabilities, it makes for an ideal low-maintenance plant for offices and apartments."
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    category: "Indoor",
    price: "380",
    imageUrl: "/images/peace_lily.png",
    description: "A symbol of tranquility with dark green leaves and elegant white blooms. Perfect for low-light corners.",
    sunlight: "Medium to bright indirect light",
    water: "Once a week (keep soil moist but not soggy)",
    difficulty: "Easy to Medium",
    size: "14-22\" Tall in 6\" Pot",
    petFriendly: false,
    about: "Peace Lilies are excellent house plants. They are not only beautiful but also purge indoor spaces of toxic chemicals like formaldehyde and benzene. They wilt slightly when they need water, making them very communicative and easy to take care of."
  },
  {
    id: "golden-pothos",
    name: "Golden Pothos",
    category: "Desk Decor",
    price: "259",
    imageUrl: "/images/golden_pothos.png",
    description: "The ultimate survivor plant. Its trailing vines and heart-shaped leaves add a lush feel to any shelf.",
    sunlight: "Low to high indirect light",
    water: "Every 1-2 weeks (drought tolerant)",
    difficulty: "Easy",
    size: "10-15\" Trailing in 4\" Pot",
    petFriendly: false,
    about: "Golden Pothos is one of the most popular and hardy houseplants. Its beautiful vines can grow multiple feet long, draping elegantly over shelves, mantels, or plant stands. It is remarkably resilient to neglected watering."
  },
  {
    id: "aloe-vera",
    name: "Premium Aloe Vera",
    category: "Desk Decor",
    price: "599",
    imageUrl: "/images/aloe_vera.png",
    description: "A compact desk companion that not only looks great but also helps monitor air quality.",
    sunlight: "Bright direct to indirect light",
    water: "Every 2-3 weeks (succulent care)",
    difficulty: "Easy",
    size: "6-10\" Tall in 4\" Pot",
    petFriendly: false,
    about: "Aloe Vera is a stemless succulent plant known for its medicinal qualities. The thick, fleshy leaves contain a soothing gel used for burns and skin care. It requires very little water and thrives on windowsills with high sunlight."
  },
  {
    id: "mini-cactus",
    name: "Miniature Cactus",
    category: "Succulents",
    price: "399",
    imageUrl: "/images/mini_cactus.png",
    description: "The perfect low-maintenance decoration for busy professionals. Adds a sharp, modern aesthetic.",
    sunlight: "Full sun / Bright direct light",
    water: "Once a month (extremely dry soil)",
    difficulty: "Easy",
    size: "4-6\" Tall in 3\" Pot",
    petFriendly: true,
    about: "This Miniature Cactus is custom-grown to fit tight office spaces. It features gorgeous spines and is incredibly hardy. It is native to desert environments and requires minimal intervention to grow and blossom."
  },
  {
    id: "snake-plant",
    name: "Snake Plant (O2)",
    category: "Indoor",
    price: "450",
    imageUrl: "/images/o2_plant.png",
    description: "Known as Mother-in-Law's Tongue, this upright sword-leaved plant is a legendary night-time oxygen producer.",
    sunlight: "Low to full sun",
    water: "Every 2-3 weeks (allow soil to dry fully)",
    difficulty: "Easy",
    size: "16-24\" Tall in 6\" Pot",
    petFriendly: false,
    about: "The Snake Plant (Sansevieria) is one of the best air-purifying plants verified by NASA. Unlike most plants which absorb oxygen at night, the Snake Plant continues to release oxygen throughout the night, making it the perfect bedroom companion."
  }
];

export const topSellingPlants = allPlants.slice(0, 3);
export const deskDecorations = allPlants.filter(p => p.category === "Desk Decor");

export const reviews = [
  {
    name: "Shelly Rus",
    rating: 5,
    comment: "Just got my hands on some absolutely awesome plants! They bring such fresh energy to my home.",
    avatar: "https://i.pravatar.cc/150?img=32",
    badge: true
  },
  {
    name: "Lula Rolfson",
    rating: 5,
    comment: "Each one has its own unique charm. They've already started brightening up my office space.",
    avatar: "https://i.pravatar.cc/150?img=47",
    badge: false
  },
  {
    name: "Carol Huels",
    rating: 4.5,
    comment: "It's like bringing a little piece of nature indoors. My plant collection has never looked better!",
    avatar: "https://i.pravatar.cc/150?img=44",
    badge: true
  }
];