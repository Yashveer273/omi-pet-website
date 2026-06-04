import { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  MapPin,

  Award,
  Search,
  SlidersHorizontal,

  ShoppingBag
} from 'lucide-react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const PET_DATA_STORE = {
  "heading": "Pets & Cat Categories",
  "subheading": "Explore Dogs, Cats, Birds, Fish, Small Pets, and Trusted Veterinary Care Services",
  "speciesTabs": [
    { "id": "dog", "name": "🐕 Dog", "prefix": "Dog", "foodIcon": "🥩" },
    { "id": "cat", "name": "🐈 Cat", "prefix": "Cat", "foodIcon": "🐟" },
    { "id": "small", "name": "🐹 Small Animal", "prefix": "Small Pet", "foodIcon": "🥕" },
    { "id": "fish", "name": "🐟 Fish", "prefix": "Fish", "foodIcon": "🫙" },
    { "id": "bird", "name": "🦜 Bird", "prefix": "Bird", "foodIcon": "🌾" }
  ],
  "combinedBreedFilters": [
    { id: "all", label: "All Breeds" },
    { id: "toy-breed", label: "🧸 Toy Breeds" },
    { id: "small-size", label: "✨ Small Size" },
    { id: "medium-size", label: "⚡ Medium Size" },
    { id: "giant-size", label: "🐕 Giant Size" },
    { id: "apartment-breed", label: "🏠 Apartment Breeds" },
    { id: "office-breed", label: "💼 Office Breeds" },
    { id: "family-breed", label: "👨‍👩‍👧‍👦 Family Breeds" },
    { id: "gifting-breed", label: "🎁 Gifting Breeds" },
    { id: "farm-breed", label: "🚜 Farm Breeds" },
    { id: "alarming-breed", label: "🚨 Alert & Guard" },
    { id: "trending", label: "🔥 Trending Breeds" }
  ],
  "serviceDirectories": {
    "dog": {
      "breeder": [
        { "id": "b1", "title": "Royal Golden Kennels", "sub": "KCI Certified Breeder", "rating": "4.9", "loc": "Delhi, NCR", "meta": "Specialty: Golden Retrievers & Labs", "badge": "Verified Champion Lines", "img": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500" },
        { "id": "b2", "title": "Elite Frenchie Haven", "sub": "Home-Raised Ethical Breeding", "rating": "4.8", "loc": "Mumbai", "meta": "Specialty: French Bulldogs", "badge": "Health Cleared Parents", "img": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500" },
        { "id": "b3", "title": "Vanguard Rottweilers", "sub": "KCI Working Class Registered", "rating": "4.9", "loc": "Punjab", "meta": "Specialty: Protection Line Rottweilers", "badge": "Import Lines", "img": "https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=500" },
        { "id": "b4", "title": "Majestic GSD Empire", "sub": "Schutzhund Titled Lineage", "rating": "4.7", "loc": "Bangalore", "meta": "Specialty: Working Line German Shepherds", "badge": "X-Ray Screened", "img": "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500" },
        { "id": "b5", "title": "Pocket Paws Boutique", "sub": "Premium Toy & Teacup Breeds", "rating": "4.6", "loc": "Goa", "meta": "Specialty: Chihuahuas & Pomeranians", "badge": "Home Environment", "img": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500" }
      ],
      "trainer": [
        { "id": "t1", "title": "Captain Rohit Sharma", "sub": "Certified Canine Behaviorist", "rating": "5.0", "loc": "In-Home & Center", "meta": "Obedience, Socialization, Agility", "badge": "12+ Yrs Experience", "img": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" },
        { "id": "t2", "title": "Bark Academy by Pooja", "sub": "Positive Reinforcement Specialist", "rating": "4.9", "loc": "Bangalore", "meta": "Puppy Potty Training & Leash Manners", "badge": "Fear-Free Certified", "img": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500" },
        { "id": "t3", "title": "K9 Elite Command", "sub": "Protection & Guard Duty Coach", "rating": "4.8", "loc": "Hyderabad", "meta": "Advanced Protection, Tracker training", "badge": "Ex-Military Handler", "img": "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=500" },
        { "id": "t4", "title": "Zen Dog Behavior Clinic", "sub": "Aggression Correction Specialist", "rating": "4.9", "loc": "Pune", "meta": "Rehabilitation for Reactive Dogs", "badge": "IAABC Certified", "img": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500" },
        { "id": "t5", "title": "Smart Paws Agility Club", "sub": "Sports & Trick Training", "rating": "4.7", "loc": "Chennai", "meta": "Frisbee, Flyball, and Advanced Focus", "badge": "Competition Winner", "img": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=500" }
      ],
      "walker": [
        { "id": "w1", "title": "Happy Paws Daily Walks", "sub": "Professional Dog Walker Group", "rating": "4.7", "loc": "South Delhi", "meta": "30/60 Min Slots • Live GPS Tracking", "badge": "Insured Checked", "img": "https://images.unsplash.com/photo-1551712702-4b7335dd8706?w=500" },
        { "id": "w2", "title": "Wagging Tails Pack Walks", "sub": "Social Pack Walk Experts", "rating": "4.8", "loc": "West Mumbai", "meta": "Includes basic outdoor discipline training", "badge": "First-Aid Trained", "img": "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=500" },
        { "id": "w3", "title": "The Daily Strut Co.", "sub": "Solo Walkers for Sensitive Dogs", "rating": "4.9", "loc": "Kolkata", "meta": "One-on-One focused attention walks", "badge": "Verified Criminal Check", "img": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500" },
        { "id": "w4", "title": "Paws & Paths Fitness", "sub": "High-Energy Running Partner", "rating": "4.6", "loc": "Chandigarh", "meta": "Trail runs and intense exercise sessions", "badge": "Athletic Handlers", "img": "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=500" },
        { "id": "w5", "title": "Little Paws Easy Strolls", "sub": "Tailored Walks for Senior Dogs", "rating": "4.9", "loc": "Ahmedabad", "meta": "Slow pacing, medication administration if needed", "badge": "Senior Care Certified", "img": "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?w=500" }
      ],
      "food": [
        { "id": "f1", "title": "Premium Puppy Salmon & Rice", "sub": "Orijen Superfood Nutrition", "meta": "High Protein, Grain-Free recipe", "tag": "Best Seller", "img": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500" },
        { "id": "f2", "title": "Adult Fresh Chicken Meat Loaf", "sub": "Urban Aura Fresh Kitchen", "meta": "Freshly cooked human-grade food box", "tag": "100% Organic", "img": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500" },
        { "id": "f3", "title": "Active Adult Dry Kibble", "sub": "Royal Canin Breed Nutrition", "meta": "Formulated for high-stamina breeds", "tag": "Vet Choice", "img": "https://images.unsplash.com/photo-1608454504242-a422278694d8?w=500" },
        { "id": "f4", "title": "Hypoallergenic Insect Protein", "sub": "Yora Eco Friendly Food", "meta": "For dogs with extreme meat allergies", "tag": "Eco Awarded", "img": "https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=500" },
        { "id": "f5", "title": "Raw Freeze-Dried Feast", "sub": "Primal Ancestral Diet", "meta": "90% Meat, Organ, and Bone blend", "tag": "Premium Grade", "img": "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500" }
      ],
      "accessories": [
        { "id": "a1", "title": "Ergonomic No-Pull Harness", "sub": "Durable Nylon with Reflective Strips", "meta": "Size: S, M, L, XL available", "tag": "Premium Build", "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500" },
        { "id": "a2", "title": "Orthopedic Memory Foam Bed", "sub": "Spine Support Therapeutic Mattress", "meta": "Washable plush outer cover", "tag": "Top Rated", "img": "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500" },
        { "id": "a3", "title": "Automatic Interactive Ball Launcher", "sub": "iFetch Electronic Toy", "meta": "Adjustable distance up to 30 feet", "tag": "Tech Award", "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500" },
        { "id": "a4", "title": "GPS Smart Tracker Collar", "sub": "Tractive Waterproof Locator", "meta": "Real-time tracking & health metrics", "tag": "Trending", "img": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500" },
        { "id": "a5", "title": "Heavy-Duty Stainless Steel Bowls", "sub": "Yeti Boomer Non-Slip Dishes", "meta": "Double-wall insulated food grade", "tag": "Lifetime Guard", "img": "https://images.unsplash.com/photo-1553901753-215db31720be?w=500" }
      ],
      "stay": [
        { "id": "s1", "title": "Paws Luxury Resort & Spa", "sub": "Climate Controlled Boarding", "rating": "4.9", "loc": "Gurugram", "meta": "24/7 CCTV Access • Swimming Pool • Vet On Call", "badge": "5-Star Rating", "img": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500" },
        { "id": "s2", "title": "The Bark Hotel", "sub": "Cage-Free Social Living", "rating": "4.8", "loc": "North Bangalore", "meta": "Large indoor play park, dynamic groups", "badge": "Verified Eco-Friendly", "img": "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500" },
        { "id": "s3", "title": "Cozy Home Boarding", "sub": "Family-Style Private Care", "rating": "5.0", "loc": "South Mumbai", "meta": "Max 3 dogs at a time, sleeps in bed", "badge": "Top Host", "img": "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?w=500" },
        { "id": "s4", "title": "Camp Canine Wilderness", "sub": "Farm & Field Adventure Stay", "rating": "4.7", "loc": "Karjat Ranch", "meta": "Acre of running space, agility run trials", "badge": "Nature Lover Pick", "img": "https://images.unsplash.com/photo-1444212477490-ca407925329e?w=500" },
        { "id": "s5", "title": "Silver Paws Retirement Suite", "sub": "Specialized Geriatric Dog Stay", "rating": "4.9", "loc": "Noida", "meta": "Orthopedic bedding, medical schedule supervision", "badge": "Medical Staffed", "img": "https://images.unsplash.com/photo-1544568100-847a948585b9?w=500" }
      ],
      "medicine": [
        { "id": "m1", "title": "Advanced Hip & Joint Supplements", "sub": "Beaphar Glucosamine Chews", "meta": "Supports bone density and cartilage health", "tag": "Vet Recommended", "img": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500" },
        { "id": "m2", "title": "Broad Spectrum Anti-Tick Spot-On", "sub": "Bravecto Chewable Tablet", "meta": "3 Months full flea & tick systemic shield", "tag": "Clinically Proven", "img": "https://images.unsplash.com/photo-1628771065518-0d82f1113871?w=500" },
        { "id": "m3", "title": "Organic Calming Hemp Oils", "sub": "CannaPaw Stress relief drops", "meta": "Reduces separation anxiety & thunderstorm fear", "tag": "100% Natural", "img": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500" },
        { "id": "m4", "title": "Probiotic Digestive Balance Powder", "sub": "FortiFlora Canine Formula", "meta": "Stops acute diarrhea, fixes gut microflora", "tag": "Global No. 1", "img": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500" },
        { "id": "m5", "title": "Medicated Chlorhexidine Shampoo", "sub": "Ketochem Anti-Fungal Formula", "meta": "Cures ringworm, hot spots, and heavy flaking", "tag": "Fast Acting", "img": "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=500" }
      ]
    }
  },
  "speciesRegistry": {
    "dog": [
      {
        "breedId": "DOG-001",
        "name": "French Bulldog",
        "sizeGroup": "small-size",
        "traitGroup": "apartment-breed",
        "scaleAndType": "Small Size • Cozy & Adaptable",
        "origin": "France",
        "lifespan": "10-12 Years",
        "temperament": "Playful, loving, easygoing, and very quiet",
        "puppyImg": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600", 
        "adultImg": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600",
        "phaseLabels": { "young": "Adorable Puppy Days", "mature": "Happy Adult Life" },
        "developmentPhases": {
          "young": "Needs simple, gentle play times, basic training, and a cool room when it gets hot outside.",
          "mature": "Enjoys short walks, loves long afternoon naps, and thrives as your ultimate indoor companion."
        }
      },
      {
        "breedId": "DOG-002",
        "name": "Golden Retriever",
        "sizeGroup": "medium-size",
        "traitGroup": "family-breed",
        "scaleAndType": "Medium Size • Ultimate Family Pet",
        "origin": "Scotland",
        "lifespan": "10-12 Years",
        "temperament": "Smart, gentle, trustworthy, and incredibly affectionate",
        "puppyImg": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
        "adultImg": "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
        "phaseLabels": { "young": "Sweet Puppy Steps", "mature": "Beautiful Grown Friend" },
        "developmentPhases": {
          "young": "Full of bright energy! Needs soft chew toys and lots of positive, rewarding praise.",
          "mature": "Loves playing backyard catch, swimming, and receiving a regular coat brushing to stay shiny."
        }
      },
      {
        "breedId": "DOG-003",
        "name": "Chihuahua",
        "sizeGroup": "toy-breed",
        "traitGroup": "gifting-breed",
        "scaleAndType": "Toy Breed • Tiny Pack Leader",
        "origin": "Mexico",
        "lifespan": "12-20 Years",
        "temperament": "Devoted, lively, alert, and quick-witted",
        "puppyImg": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
        "adultImg": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600",
        "phaseLabels": { "young": "Tiny Pup Steps", "mature": "Vigilant Guard Companion" },
        "developmentPhases": {
          "young": "Needs gentle handling and careful warmth management during early stages.",
          "mature": "Requires small-scale mental tracking games and structured socialization spaces."
        }
      },
      {
        "breedId": "DOG-004",
        "name": "Tibetan Mastiff",
        "sizeGroup": "giant-size",
        "traitGroup": "alarming-breed",
        "scaleAndType": "Giant Size • Majestic & Protective",
        "origin": "Tibet",
        "lifespan": "10-12 Years",
        "temperament": "Tenacious, aloof, stubborn, and highly intelligent guardian",
        "puppyImg": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600",
        "adultImg": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600",
        "phaseLabels": { "young": "Fluffy Colossus Pup", "mature": "Absolute Alpha Sentinel" },
        "developmentPhases": {
          "young": "Demands strict firm discipline boundary training combined with extensive socialization setups.",
          "mature": "Thrives best when patrolling large territorial properties with consistent leadership parameters."
        }
      },
      {
        "breedId": "DOG-005",
        "name": "Border Collie",
        "sizeGroup": "medium-size",
        "traitGroup": "office-breed",
        "scaleAndType": "Medium Size • Brain & Work Leader",
        "origin": "United Kingdom",
        "lifespan": "12-15 Years",
        "temperament": "Intelligent, energetic, alert, and responsive",
        "puppyImg": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600",
        "adultImg": "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600",
        "phaseLabels": { "young": "Agile Learner Puppy", "mature": "Focused Workspace Exec" },
        "developmentPhases": {
          "young": "Demands consistent cognitive puzzles, agility training, and dynamic clicker reinforcement.",
          "mature": "Excels at tactical spatial coordination, routine problem-solving, and high-focus assignments."
        }
      }
    ],
    "cat": [
      {
        "breedId": "CAT-001",
        "name": "Persian Cat",
        "sizeGroup": "small-size",
        "traitGroup": "apartment-breed",
        "scaleAndType": "Small Size • Regal Luxury",
        "origin": "Iran",
        "lifespan": "12-17 Years",
        "temperament": "Quiet, dignified, sweet, and peaceful",
        "puppyImg": "https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?w=600",
        "adultImg": "https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?w=600",
        "phaseLabels": { "young": "Silk Kitten Phase", "mature": "Majestic Lounge Sovereign" },
        "developmentPhases": {
          "young": "Requires delicate daily coat detailing, tier-one nutrition mixes, and low-impact spaces.",
          "mature": "Thrives beautifully in luxury silent spots, showcasing a calm demeanor and peak elegance."
        }
      },
      {
        "breedId": "CAT-002",
        "name": "Maine Coon",
        "sizeGroup": "giant-size",
        "traitGroup": "family-breed",
        "scaleAndType": "Giant Size • Gentle Forest Monarch",
        "origin": "United States",
        "lifespan": "12-15 Years",
        "temperament": "Friendly, loving, curious, and gentle giant",
        "puppyImg": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600",
        "adultImg": "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600",
        "phaseLabels": { "young": "Fluffy Colossus Kitten", "mature": "Grand Domestic Guardian" },
        "developmentPhases": {
          "young": "Exhibits rapid bone development; requires heavy calcium monitoring and interaction matrices.",
          "mature": "Possesses supreme water-resistant double coats; shows highly interactive and dog-like behavior."
        }
      },
      {
        "breedId": "CAT-003",
        "name": "Siamese Cat",
        "sizeGroup": "small-size",
        "traitGroup": "office-breed",
        "scaleAndType": "Small Size • Vocal Dynast",
        "origin": "Thailand",
        "lifespan": "12-20 Years",
        "temperament": "Vocal, affectionate, active, social, and demanding",
        "puppyImg": "https://images.unsplash.com/photo-1513360309081-36f20c28596f?w=600",
        "adultImg": "https://images.unsplash.com/photo-1513360309081-36f20c28596f?w=600",
        "phaseLabels": { "young": "Chatty Blue-Eyed Sprite", "mature": "Sleek Interactive Executive" },
        "developmentPhases": {
          "young": "Demands intensive vocal tracking stimulation and clicker training structures.",
          "mature": "Thrives on complex interactive puzzle trees and constants of human communication."
        }
      },
      {
        "breedId": "CAT-004",
        "name": "Bengal Cat",
        "sizeGroup": "medium-size",
        "traitGroup": "trending",
        "scaleAndType": "Medium Size • Domestic Leopard",
        "origin": "United States",
        "lifespan": "12-16 Years",
        "temperament": "High-energy, confident, highly wild-natured, athletic",
        "puppyImg": "https://images.unsplash.com/photo-1574158622643-69d34d72650a?w=600",
        "adultImg": "https://images.unsplash.com/photo-1574158622643-69d34d72650a?w=600",
        "phaseLabels": { "young": "Wild Spotted Speedster", "mature": "Apex Vertical Explorer" },
        "developmentPhases": {
          "young": "Requires structural cat-wheel dynamic conditioning and high vertical climbing pillars.",
          "mature": "Loves processing water toys, fishing simulations, and complex leash-walking maps."
        }
      },
      {
        "breedId": "CAT-005",
        "name": "Ragdoll Cat",
        "sizeGroup": "medium-size",
        "traitGroup": "gifting-breed",
        "scaleAndType": "Medium Size • Plush Velvet Companion",
        "origin": "United States",
        "lifespan": "13-18 Years",
        "temperament": "Docile, gentle, placid, exceptionally affectionate",
        "puppyImg": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
        "adultImg": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
        "phaseLabels": { "young": "Fluffy Pillow Fledgling", "mature": "The Complete Living Plush" },
        "developmentPhases": {
          "young": "Prone to floor-drop relaxation habits; needs ultra-soft padded landing pads.",
          "mature": "Perfect lap partner; acts with extreme trust models and low stress metrics."
        }
      }
    ],
    "small": [
      {
        "breedId": "SMP-001",
        "name": "Syrian Hamster",
        "sizeGroup": "toy-breed",
        "traitGroup": "apartment-breed",
        "scaleAndType": "Toy Variant • Solitary Architect",
        "origin": "Syria",
        "lifespan": "2-3 Years",
        "temperament": "Solitary, active, territorial, and curious",
        "puppyImg": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600",
        "adultImg": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600",
        "phaseLabels": { "young": "Micro Forager", "mature": "Night-Shift Master Builder" },
        "developmentPhases": {
          "young": "Needs specialized high-wheel security checks and complex burrow bedding setups.",
          "mature": "Highly active tunnel network manager; loves independent processing matrices."
        }
      },
      {
        "breedId": "SMP-002",
        "name": "Abyssinian Guinea Pig",
        "sizeGroup": "small-size",
        "traitGroup": "family-breed",
        "scaleAndType": "Small Size • Rosetted Vocalist",
        "origin": "Andes Mountains",
        "lifespan": "5-7 Years",
        "temperament": "Social, expressive, gentle, conversational",
        "puppyImg": "https://images.unsplash.com/photo-1534833219166-d830b501174d?w=600",
        "adultImg": "https://images.unsplash.com/photo-1534833219166-d830b501174d?w=600",
        "phaseLabels": { "young": "Wheeking Tiny Popcorn", "mature": "Herbal Foraging Maestro" },
        "developmentPhases": {
          "young": "Demands massive structural Vitamin C injections and social alignment pairings.",
          "mature": "Thrives on high-volume Timothy hay diets and predictable family interaction loops."
        }
      },
      {
        "breedId": "SMP-003",
        "name": "Holland Lop Rabbit",
        "sizeGroup": "medium-size",
        "traitGroup": "trending",
        "scaleAndType": "Medium Size • Floppy-Eared Charmer",
        "origin": "Netherlands",
        "lifespan": "7-12 Years",
        "temperament": "Docile, intelligent, energetic, deeply affectionate",
        "puppyImg": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600",
        "adultImg": "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600",
        "phaseLabels": { "young": "Bounding Velvet Kit", "mature": "Free-Roam Territory King" },
        "developmentPhases": {
          "young": "Needs strict environmental chew-proofing and gentle physical handling safety protocols.",
          "mature": "Excels inside litter-trained free-roam rooms with intense cardboard puzzle grids."
        }
      },
      {
        "breedId": "SMP-004",
        "name": "Long-Tailed Chinchilla",
        "sizeGroup": "small-size",
        "traitGroup": "gifting-breed",
        "scaleAndType": "Small Size • High-Density Cloud",
        "origin": "Andes Region",
        "lifespan": "10-15 Years",
        "temperament": "Skittish, highly energetic, nocturnal, fast-moving",
        "puppyImg": "https://images.unsplash.com/photo-1588612140445-91ff800fc482?w=600",
        "adultImg": "https://images.unsplash.com/photo-1588612140445-91ff800fc482?w=600",
        "phaseLabels": { "young": "Micro-Fur Lightning Bolt", "mature": "Volcanic Dust-Bath Acrobat" },
        "developmentPhases": {
          "young": "Strict zero-moisture framework required; needs specialized volcanic ash bath setups.",
          "mature": "Demands strict climate control under 23°C to completely avoid heat exhaustion loops."
        }
      },
      {
        "breedId": "SMP-005",
        "name": "Marshall Ferret",
        "sizeGroup": "medium-size",
        "traitGroup": "office-breed",
        "scaleAndType": "Medium Size • Elongated Shadow Rogue",
        "origin": "Europe",
        "lifespan": "6-9 Years",
        "temperament": "Mischievous, hyper-curious, silent, deeply playful",
        "puppyImg": "https://images.unsplash.com/photo-1615089728254-8e10086bc57a?w=600",
        "adultImg": "https://images.unsplash.com/photo-1615089728254-8e10086bc57a?w=600",
        "phaseLabels": { "young": "Hissing Micro-Weasel", "mature": "Master Plastic-Tube Navigator" },
        "developmentPhases": {
          "young": "Requires complex bite-inhibition tracking protocols and early harness alignment.",
          "mature": "Thrives on sleeping 18 hours and spending 6 hours executing structural maze sprints."
        }
      }
    ],
    "fish": [
      {
        "breedId": "FSH-001",
        "name": "Super Delta Betta",
        "sizeGroup": "toy-breed",
        "traitGroup": "office-breed",
        "scaleAndType": "Toy Variant • Aquatic Masterpiece",
        "origin": "Southeast Asia",
        "lifespan": "3-5 Years",
        "temperament": "Territorial, elegant, prideful, and visually responsive",
        "puppyImg": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600",
        "adultImg": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600",
        "phaseLabels": { "young": "Vibrant Fry Growth", "mature": "Chromatic Desk Sovereign" },
        "developmentPhases": {
          "young": "Requires highly monitored micro-filtration systems and warm steady water variables.",
          "mature": "Displays grand scale fin flare patterns; perfectly fine inside peaceful standalone desktop tanks."
        }
      },
      {
        "breedId": "FSH-002",
        "name": "Red Tiger Discus",
        "sizeGroup": "medium-size",
        "traitGroup": "trending",
        "scaleAndType": "Medium Size • King of Fresh Water",
        "origin": "Amazon Basin",
        "lifespan": "10-15 Years",
        "temperament": "Peaceful, timid, high-maintenance, schooling",
        "puppyImg": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
        "adultImg": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
        "phaseLabels": { "young": "Striated Cryptic Fry", "mature": "Grand Discus Monarch" },
        "developmentPhases": {
          "young": "Demands daily 50% automated water updates and high temperature parameter tracking.",
          "mature": "Requires complex planted community tanks with low-flow filtration configurations."
        }
      },
      {
        "breedId": "FSH-003",
        "name": "Oranda Goldfish",
        "sizeGroup": "small-size",
        "traitGroup": "family-breed",
        "scaleAndType": "Small Size • Bubble-Crowned Swimmer",
        "origin": "East Asia",
        "lifespan": "10-20 Years",
        "temperament": "Docile, highly social, slow-moving, food-motivated",
        "puppyImg": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600",
        "adultImg": "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600",
        "phaseLabels": { "young": "Sleek Orange Starter", "mature": "Grand Velvet Wen Sovereign" },
        "developmentPhases": {
          "young": "Needs clean sand substrates to prevent delicate mouth injuries during floor feeding.",
          "mature": "Develops a prominent head growth (Wen); demands completely smooth decoration elements to avoid tears."
        }
      },
      {
        "breedId": "FSH-004",
        "name": "Neon Tetra",
        "sizeGroup": "toy-breed",
        "traitGroup": "apartment-breed",
        "scaleAndType": "Toy Variant • Electric Schooler",
        "origin": "South America",
        "lifespan": "5-8 Years",
        "temperament": "Peaceful, energetic, hyper-communal, shoaling",
        "puppyImg": "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600",
        "adultImg": "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600",
        "phaseLabels": { "young": "Micro-Translucent Line", "mature": "Neon Light Synchronization" },
        "developmentPhases": {
          "young": "Requires strict protection from filter intake currents using sponge guards.",
          "mature": "Thrives best in schools of 10+ inside dark-water planted display arrangements."
        }
      },
      {
        "breedId": "FSH-005",
        "name": "Electric Blue Ram",
        "sizeGroup": "small-size",
        "traitGroup": "gifting-breed",
        "scaleAndType": "Small Size • Neon Cichlid Sentinel",
        "origin": "Orinoco River",
        "lifespan": "3-4 Years",
        "temperament": "Territorial but peaceful, loyal pair-bonding",
        "puppyImg": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600",
        "adultImg": "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600",
        "phaseLabels": { "young": "Pale Sapphire Juvenile", "mature": "Iridescent Terrestrial Guard" },
        "developmentPhases": {
          "young": "Extremely susceptible to nitrates; demands premium chemical resin filtration matrices.",
          "mature": "Establishes small structural flat-stone breeding nests; highly active defender of young."
        }
      }
    ],
    "bird": [
      {
        "breedId": "BRD-001",
        "name": "Indian Ringneck",
        "sizeGroup": "small-size",
        "traitGroup": "trending",
        "scaleAndType": "Small Size • Vocal Mastermind",
        "origin": "India",
        "lifespan": "20-30 Years",
        "temperament": "Intelligent, charismatic, vocal, and deeply expressive",
        "puppyImg": "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600",
        "adultImg": "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=600",
        "phaseLabels": { "young": "Fledgling Linguistic Scholar", "mature": "High-Fidelity Vocal Leader" },
        "developmentPhases": {
          "young": "Demands intensive direct human handling, step-up coordination training, and vocal modeling.",
          "mature": "Possesses incredible vocabulary recollection and highly complex puzzle-solving capacity."
        }
      },
      {
        "breedId": "BRD-002",
        "name": "Hyacinth Macaw",
        "sizeGroup": "giant-size",
        "traitGroup": "alarming-breed",
        "scaleAndType": "Giant Size • Cobalt Cobalt Titan",
        "origin": "South America",
        "lifespan": "50-60 Years",
        "temperament": "Gentle giant, highly social, exceptionally strong, loyal",
        "puppyImg": "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600",
        "adultImg": "https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600",
        "phaseLabels": { "young": "Destructive Beak Nestling", "mature": "Majestic Blue Aviary King" },
        "developmentPhases": {
          "young": "Requires heavy raw macadamia oil nutrition and intense structure-chewing redirection.",
          "mature": "Demands massive custom alloy enclosures and constant multi-hour socialization blocks."
        }
      },
      {
        "breedId": "BRD-003",
        "name": "Cockatiel",
        "sizeGroup": "small-size",
        "traitGroup": "family-breed",
        "scaleAndType": "Small Size • Crested Whistler",
        "origin": "Australia",
        "lifespan": "15-20 Years",
        "temperament": "Gentle, cheerful, highly musical, easygoing",
        "puppyImg": "https://images.unsplash.com/photo-1522850959403-e28d1c9ef007?w=600",
        "adultImg": "https://images.unsplash.com/photo-1522850959403-e28d1c9ef007?w=600",
        "phaseLabels": { "young": "Hissing Tufted Fledgling", "mature": "Melodic Household Whistle-Pro" },
        "developmentPhases": {
          "young": "Requires consistent hand-feeding temperature matching and basic wing safety monitoring.",
          "mature": "Thrives on mimicking household tunes, whistle cues, and regular head-scratch bonding loops."
        }
      },
      {
        "breedId": "BRD-004",
        "name": "African Grey Parrot",
        "sizeGroup": "medium-size",
        "traitGroup": "office-breed",
        "scaleAndType": "Medium Size • Cognitive Elite",
        "origin": "Equatorial Africa",
        "lifespan": "40-60 Years",
        "temperament": "Analytical, highly intelligent, sensitive, quiet observer",
        "puppyImg": "https://images.unsplash.com/photo-1522745343448-6c5b620022ec?w=600",
        "adultImg": "https://images.unsplash.com/photo-1522745343448-6c5b620022ec?w=600",
        "phaseLabels": { "young": "Observational Charcoal Chick", "mature": "Contextual Language Oracle" },
        "developmentPhases": {
          "young": "Needs absolute avoidance of emotional isolation to completely eliminate feather-plucking loops.",
          "mature": "Capable of structural label association, logic puzzles, and complete sentence formation."
        }
      },
      {
        "breedId": "BRD-005",
        "name": "Sun Conure",
        "sizeGroup": "small-size",
        "traitGroup": "gifting-breed",
        "scaleAndType": "Small Size • Solar Flare Acrobat",
        "origin": "South America",
        "lifespan": "15-25 Years",
        "temperament": "Playful, high-volume, bold, expressive, cuddly",
        "puppyImg": "https://images.unsplash.com/photo-1601991401345-d85c4f2ae867?w=600",
        "adultImg": "https://images.unsplash.com/photo-1601991401345-d85c4f2ae867?w=600",
        "phaseLabels": { "young": "Green-Winged Fire Cracker", "mature": "Vivid Golden Sun Sentinel" },
        "developmentPhases": {
          "young": "Requires sound-dampening positive reinforcement to manage extreme volume peaks.",
          "mature": "Thrives when doing physical rolling tricks, playing with bright wood toys, and nesting in shirts."
        }
      }
    ]
  }
};
export default function SimpleCutePetSection() {
  const [activeTab, setActiveTab] = useState('dog'); 
  const [selectedService, setSelectedService] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Prevent background scroll when the full screen popup layout is mounted
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const activeSpeciesConfig = PET_DATA_STORE.speciesTabs.find(t => t.id === activeTab) || PET_DATA_STORE.speciesTabs[0];
  const activeLabelPrefix = activeSpeciesConfig.prefix;

  const computedServices = [
    { "id": "breed", "title": `${activeLabelPrefix} Breeds`, "desc": "Discover healthy breeds with loving personalities and complete family care metrics.", "icon": "🧬", "uiType": "breed" },
    { "id": "breeder", "title": `${activeLabelPrefix} Breeders`, "desc": "Trusted, verified professionals focusing on health, vaccination records, and genetics.", "icon": "🏡", "uiType": "serviceGrid" },
    { "id": "trainer", "title": `${activeLabelPrefix} Trainers`, "desc": "Professional coaches specializing in smart basic obedience, behavioral adjustments, and play.", "icon": "🎓", "uiType": "expertGrid" },
    { "id": "walker", "title": `${activeLabelPrefix} Walkers`, "desc": "Reliable background-checked handlers to keep your companions fit, energetic, and happy.", "icon": "🏃", "uiType": "expertGrid" },
    { "id": "food", "title": `${activeLabelPrefix} Food`, "desc": "Premium nutritional diets tailored perfectly to support optimal development and long lifespans.", "icon": activeSpeciesConfig.foodIcon, "uiType": "productGrid" },
    { "id": "accessories", "title": `${activeLabelPrefix} Accessories`, "desc": "Shop elite items, ergonomic harnesses, custom enclosures, and high-end beds.", "icon": "💎", "uiType": "productGrid" },
    { "id": "stay", "title": `${activeLabelPrefix} Stay Centres`, "desc": "Premium climate-controlled luxury boarding spots with 24/7 CCTV surveillance feeds.", "icon": "🏨", "uiType": "serviceGrid" },
    { "id": "medicine", "title": `${activeLabelPrefix} Medicines`, "desc": "Expert prescription tracking, preventive essential vitamins, and targeted joint supplements.", "icon": "💊", "uiType": "productGrid" }
  ];

  const handleCategoryClick = (serviceItem) => {
    setSelectedService(serviceItem);
    setSelectedFilter('all');
    setSearchQuery('');
    setModalOpen(true);
  };

  const activeDataStoreKey = PET_DATA_STORE.serviceDirectories[activeTab] ? activeTab : 'dog';
  const directoryList = PET_DATA_STORE.serviceDirectories[activeDataStoreKey]?.[selectedService?.id] || [];
  
  const currentRegistryList = PET_DATA_STORE.speciesRegistry[activeTab] || [];
  const filteredBreeds = currentRegistryList.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || b.sizeGroup === selectedFilter || b.traitGroup === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#EAF0F9] text-stone-700 font-sans relative py-12">
      <style>{`
        @keyframes scrollInfinite { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-infinite-marquee { display: flex; width: max-content; animation: scrollInfinite 30s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F4F4F5; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4D4D8; border-radius: 9999px; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        {/* Title Blocks */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight mb-3">{PET_DATA_STORE.heading}</h2>
          <p className="text-sm text-stone-500 font-medium leading-relaxed">{PET_DATA_STORE.subheading}</p>
        </div>

        {/* Top Species Multi-Tab System */}
        <div className="w-full relative overflow-hidden mb-14 py-2">
          <div className="animate-infinite-marquee gap-3">
            {[...PET_DATA_STORE.speciesTabs, ...PET_DATA_STORE.speciesTabs].map((tab, index) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={`${tab.id}-${index}`}
                  onClick={() => { setActiveTab(tab.id); setSelectedService(null); }}
                  className={`px-6 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all border shadow-xs flex items-center gap-2 mx-1.5 shrink-0
                    ${isSelected ? 'bg-stone-900 border-stone-900 text-white shadow-md scale-105' : 'bg-white text-stone-600 border-stone-200/60 hover:bg-stone-50'}`}
                >
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MOBILE SLIDER */}
        <div className="lg:hidden">
          <Swiper
            slidesPerView={1.15}
            centeredSlides
            loop
            spaceBetween={18}
            modules={[Navigation]}
            navigation={{ nextEl: ".service-next", prevEl: ".service-prev" }}
            breakpoints={{
              480: { slidesPerView: 1.4, spaceBetween: 20 },
              768: { slidesPerView: 2.1, spaceBetween: 24 },
            }}
            className="!overflow-visible py-6"
          >
            {computedServices.map((service) => (
              <SwiperSlide key={service.id}>
                {({ isActive }) => (
                  <div
                    onClick={() => handleCategoryClick(service)}
                    className={`bg-white rounded-3xl p-6 cursor-pointer transition-all duration-500 border
                      ${isActive ? "scale-100 shadow-xl border-stone-300" : "scale-95 opacity-70 border-stone-100"}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center text-xl mb-5">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-lg text-stone-900 mb-2">{service.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{service.desc}</p>
                    <div className="mt-6 flex items-center justify-between text-stone-900 font-bold text-xs uppercase tracking-wider">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-3 mt-4">
            <button className="service-prev w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center"><ChevronLeft className="w-4 h-4" /></button>
            <button className="service-next w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6">
          {computedServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCategoryClick(service)}
              className="group bg-white rounded-2xl border border-stone-200/80 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-stone-400 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-center text-xl mb-4 transition-transform group-hover:scale-105">
                  {service.icon}
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-2">{service.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">{service.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-stone-900 font-bold text-xs uppercase tracking-wider">
                <span>Explore Catalog</span>
                <div className="w-7 h-7 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ULTRA PROFESSIONAL FULL SCREEN LIGHT WHITE ARCHITECTURE POPUP MODAL */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden w-full h-full min-h-screen">
          
          {/* Pure Full Screen Panel Layout */}
          <div className="w-full h-full flex flex-col bg-white">
            
            {/* Elegant Fixed White Header Container */}
            <div className="px-6 py-5 sm:px-10 bg-white border-b border-stone-200 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 text-2xl rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center shadow-3xs">{selectedService.icon}</div>
                <div>
                  <h4 className="text-lg font-black text-stone-900 tracking-tight">{selectedService.title}</h4>
                  <p className="text-[10px] text-stone-400 font-bold tracking-widest uppercase flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-pulse"></span>
                    {activeLabelPrefix} Professional Workspace
                  </p>
                </div>
              </div>
              
              {/* Close Window Command */}
              <button 
                onClick={() => setModalOpen(false)} 
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-xs font-bold transition-all hover:bg-stone-900 hover:text-white hover:border-stone-900"
              >
                <span>Close Workspace</span>
                <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Expansive Full Screen Custom Scroll Body Area */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white custom-scrollbar max-w-7xl mx-auto w-full">
              
              {/* INTERFACE: BREED SWITCH LAYOUT */}
              {selectedService.uiType === 'breed' && (
                <div className="space-y-8">
                  {/* Filters & Search Header */}
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-stone-200">
                    <div className="flex items-center gap-2 text-stone-800 text-xs font-bold">
                      <SlidersHorizontal className="w-4 h-4 text-stone-500" />
                      <span>Filter Active Taxonomic Lineages:</span>
                    </div>
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input 
                        type="text" 
                        placeholder={`Search verified variants...`} 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs text-stone-800 placeholder-stone-400 font-medium focus:outline-none focus:border-stone-900 focus:bg-white focus:ring-1 focus:ring-stone-900 transition-all" 
                      />
                    </div>
                  </div>

                  {/* Filter Badges Horizontal Track */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {PET_DATA_STORE.combinedBreedFilters.map((filter) => (
                      <button 
                        key={filter.id} 
                        onClick={() => setSelectedFilter(filter.id)} 
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap border ${
                          selectedFilter === filter.id 
                            ? 'bg-stone-900 border-stone-900 text-white shadow-xs' 
                            : 'text-stone-600 bg-stone-50 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Output Grid */}
                  <div className="space-y-6 pt-2">
                    {filteredBreeds.length > 0 ? (
                      filteredBreeds.map((breed) => (
                        <div key={breed.breedId} className="bg-[#FCFCFD] border border-stone-200 rounded-2xl p-6 flex flex-col lg:flex-row gap-8 hover:border-stone-300 transition-all shadow-3xs">
                          {/* Left Panel: Stats */}
                          <div className="flex-1 space-y-4 text-left lg:max-w-xs lg:border-r lg:border-stone-200 lg:pr-8 pb-4 lg:pb-0">
                            <div>
                              <h6 className="text-2xl font-black text-stone-900 tracking-tight">{breed.name}</h6>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-md mt-2 inline-block">
                                {breed.scaleAndType}
                              </span>
                            </div>
                            
                            <div className="space-y-2.5 text-xs text-stone-600 bg-white p-4 rounded-xl border border-stone-200 shadow-3xs">
                              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                                <span className="text-stone-400">Origin</span>
                                <strong className="text-stone-800 font-semibold">{breed.origin}</strong>
                              </div>
                              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                                <span className="text-stone-400">Lifespan</span>
                                <strong className="text-stone-800 font-semibold">{breed.lifespan}</strong>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-stone-400">Group</span>
                                <strong className="text-stone-800 font-semibold capitalize">{breed.sizeGroup.replace('-', ' ')}</strong>
                              </div>
                            </div>

                            <div className="text-xs bg-white p-4 rounded-xl border border-stone-200 shadow-3xs">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block mb-1">Temperament Matrix</span>
                              <p className="text-stone-600 font-medium leading-relaxed">{breed.temperament}</p>
                            </div>
                          </div>

                          {/* Right Panel: Dual Phase Cards */}
                          <div className="flex-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Young Card */}
                            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white flex flex-col justify-between group hover:border-stone-300 transition-all shadow-3xs">
                              <div className="h-48 bg-stone-100 overflow-hidden relative">
                                <img src={breed.puppyImg} alt="young variant" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                                  ✨ {breed.phaseLabels?.young}
                                </div>
                              </div>
                              <div className="p-4 text-left bg-stone-50/50 border-t border-stone-200 flex-1 flex items-center">
                                <p className="text-xs text-stone-600 font-medium leading-relaxed">{breed.developmentPhases.young}</p>
                              </div>
                            </div>

                            {/* Mature Card */}
                            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white flex flex-col justify-between group hover:border-stone-300 transition-all shadow-3xs">
                              <div className="h-48 bg-stone-100 overflow-hidden relative">
                                <img src={breed.adultImg} alt="mature variant" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                                  🌿 {breed.phaseLabels?.mature}
                                </div>
                              </div>
                              <div className="p-4 text-left bg-stone-50/50 border-t border-stone-200 flex-1 flex items-center">
                                <p className="text-xs text-stone-600 font-medium leading-relaxed">{breed.developmentPhases.mature}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">No configurations discovered matching search.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* INTERFACE: EXPERTS DIRECTORY (TRAINERS, WALKERS) */}
              {selectedService.uiType === 'expertGrid' && (
                <div className="space-y-6 text-left">
                  <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h5 className="text-sm font-bold text-stone-900 tracking-wide">Available Certified Specialists</h5>
                      <p className="text-xs text-stone-500 mt-0.5">Verified expert partners operating inside premium care networks.</p>
                    </div>
                    <span className="text-xs bg-white text-stone-800 font-bold px-3 py-1.5 rounded-lg border border-stone-200 shrink-0 self-start sm:self-auto">
                      {directoryList.length} Active Consultants
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {directoryList.map((expert) => (
                      <div key={expert.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-stone-300 hover:shadow-sm transition-all group">
                        <div className="w-full sm:w-40 h-40 bg-stone-100 shrink-0 relative overflow-hidden">
                          <img src={expert.img} alt="expert portrait" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h6 className="text-base font-bold text-stone-900 tracking-wide">{expert.title}</h6>
                              <span className="text-[9px] bg-stone-100 text-stone-700 font-bold px-2 py-0.5 rounded border border-stone-200 uppercase tracking-wider whitespace-nowrap">{expert.badge}</span>
                            </div>
                            <p className="text-xs text-stone-500 font-semibold mt-0.5">{expert.sub}</p>
                            <p className="text-xs text-stone-400 font-medium mt-3 leading-relaxed">{expert.meta}</p>
                          </div>
                          <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-stone-400" /> {expert.loc}</span>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INTERFACE: SERVICE STATIONS (BREEDERS, STAY) */}
              {selectedService.uiType === 'serviceGrid' && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {directoryList.map((center) => (
                      <div key={center.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 transition-all group shadow-3xs">
                        <div className="h-56 bg-stone-100 w-full relative overflow-hidden border-b border-stone-200">
                          <img src={center.img} alt="center layout" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute top-4 left-4 bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-[10px] font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                            <Award className="w-3.5 h-3.5 text-stone-900" /> {center.badge}
                          </div>
                        </div>
                        <div className="p-5 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <h6 className="text-lg font-black text-stone-900 tracking-wide">{center.title}</h6>
                            <span className="text-xs font-bold text-stone-600 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">⭐ {center.rating}</span>
                          </div>
                          <p className="text-xs text-stone-500 font-semibold">{center.sub}</p>
                          <p className="text-xs text-stone-400 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-150 font-medium">{center.meta}</p>
                          <div className="pt-3 flex items-center justify-between text-xs text-stone-500">
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-stone-400" /> {center.loc}</span>
                            <button className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs shadow-3xs">Contact Hub</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INTERFACE: PRODUCT TILES (FOOD, ACCESSORIES, MEDICINE) */}
              {selectedService.uiType === 'productGrid' && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {directoryList.map((product) => (
                      <div key={product.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-300 transition-all group shadow-3xs pb-4">
                        <div>
                          <div className="h-48 bg-stone-50 overflow-hidden relative border-b border-stone-200">
                            <img src={product.img} alt="product display" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <span className="absolute top-3 right-3 bg-white/95 border border-stone-200 text-stone-800 font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-3xs">{product.tag}</span>
                          </div>
                          <div className="p-4 space-y-1.5">
                            <h6 className="text-sm font-bold text-stone-900 tracking-wide line-clamp-1">{product.title}</h6>
                            <p className="text-xs text-stone-500 font-semibold">{product.sub}</p>
                            <p className="text-[11px] text-stone-400 font-medium leading-relaxed pt-1">{product.meta}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty Data Placeholder Guard */}
              {directoryList.length === 0 && selectedService.uiType !== 'breed' && (
                <div className="py-24 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">Preparing inventory catalog records shortly.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}