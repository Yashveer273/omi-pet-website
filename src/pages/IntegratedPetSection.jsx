import { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  MapPin,
  Clock,
  
  Star,
 
  ShoppingBag,
  Award
} from 'lucide-react';
import { SwiperSlide,Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const PET_DATA_STORE = {
  "heading": "Pets & Care Categories",
  "subheading": "Explore Dogs, Cats, Birds, Fish, Small Pets, and Trusted Veterinary Care Services",
  "speciesTabs": [
    { "id": "dog", "name": "🐕 Dog", "prefix": "Dog", "foodIcon": "🥩" },
    { "id": "cat", "name": "🐈 Cat", "prefix": "Cat", "foodIcon": "🐟" },
    { "id": "small", "name": "🐹 Small Animal", "prefix": "Small Pet", "foodIcon": "🥕" },
    { "id": "fish", "name": "🐟 Fish", "prefix": "Fish", "foodIcon": "🫙" },
    { "id": "bird", "name": "🦜 Bird", "prefix": "Bird", "foodIcon": "🌾" }
  ],
  "combinedBreedFilters":  [
  {
    id: "all",
    label: "All Breeds",
    description: "Browse all available dog breeds."
  },

  {
    id: "toy-breed",
    label: "🧸 Toy Breeds",
    description: "Tiny companion dogs that are easy to handle and perfect for small families."
  },

  {
    id: "small-size",
    label: "✨ Small Size",
    description: "Compact breeds that require less space and are suitable for most homes."
  },

  {
    id: "medium-size",
    label: "✨ Medium Size",
    description: "Balanced breeds with moderate exercise and space requirements."
  },

  {
    id: "giant-size",
    label: "🐕 Giant Size",
    description: "Large and powerful breeds that need ample space and regular activity."
  },

  {
    id: "apartment-breed",
    label: "🏠 Apartment Breeds",
    description: "Breeds well-suited for apartment living due to their size, temperament, and activity level."
  },

  {
    id: "office-breed",
    label: "💼 Office Breeds",
    description: "Calm, friendly, and social breeds that adapt well to office environments."
  },

  {
    id: "family-breed",
    label: "👨‍👩‍👧‍👦 Family Breeds",
    description: "Affectionate and gentle breeds that thrive around families and children."
  },

  {
    id: "gifting-breed",
    label: "🎁 Gifting Breeds",
    description: "Popular companion breeds often chosen as memorable gifts for loved ones."
  },

  {
    id: "farm-breed",
    label: "🚜 Farm Breeds",
    description: "Hard-working breeds known for herding, guarding livestock, and outdoor living."
  },

  {
    id: "alarming-breed",
    label: "🚨 Alert & Guard Breeds",
    description: "Naturally alert breeds that quickly notify owners of unfamiliar activity."
  },

  {
    id: "trending",
    label: "🔥 Trending Breeds",
    description: "Popular and highly sought-after breeds among pet lovers right now."
  }
],
  // Dynamic directory mock data mapped by species and layout type
  "serviceDirectories": {
    "dog": {
      "breeder": [
        { "id": "b1", "title": "Royal Golden Kennels", "sub": "KCI Certified Breeder", "rating": "4.9", "loc": "Delhi, NCR", "meta": "Specialty: Golden Retrievers & Labs", "badge": "Verified Champion Lines", "img": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500" },
        { "id": "b2", "title": "Elite Frenchie Haven", "sub": "Home-Raised Ethical Breeding", "rating": "4.8", "loc": "Mumbai", "meta": "Specialty: French Bulldogs", "badge": "Health Cleared Parents", "img": "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500" }
      ],
      "trainer": [
        { "id": "t1", "title": "Captain Rohit Sharma", "sub": "Certified Canine Behaviorist", "rating": "5.0", "loc": "In-Home & Center", "meta": "Obedience, Socialization, Agility", "badge": "12+ Yrs Experience", "img": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" },
        { "id": "t2", "title": "Bark Academy by Pooja", "sub": "Positive Reinforcement Specialist", "rating": "4.9", "loc": "Bangalore", "meta": "Puppy Potty Training & Leash Manners", "badge": "Fear-Free Certified", "img": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500" }
      ],
      "walker": [
        { "id": "w1", "title": "Happy Paws Daily Walks", "sub": "Professional Dog Walker Group", "rating": "4.7", "loc": "South Delhi", "meta": "30/60 Min Slots • Live GPS Tracking", "badge": "Insured & Background Checked", "img": "https://images.unsplash.com/photo-1551712702-4b7335dd8706?w=500" }
      ],
      "food": [
        { "id": "f1", "title": "Premium Puppy Salmon & Rice", "sub": "Orijen Superfood Nutrition", "price": "₹4,200", "meta": "High Protein, Grain-Free recipe", "tag": "Best Seller", "img": "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500" },
        { "id": "f2", "title": "Adult Fresh Chicken Meat Loaf", "sub": "Urban Aura Fresh Kitchen", "price": "₹1,800", "meta": "Freshly cooked human-grade food box", "tag": "100% Organic", "img": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500" }
      ],
      "accessories": [
        { "id": "a1", "title": "Ergonomic No-Pull Harness", "sub": "Durable Nylon with Reflective Strips", "price": "₹1,499", "meta": "Size: S, M, L, XL available", "tag": "Premium Build", "img": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500" }
      ],
      "stay": [
        { "id": "s1", "title": "Paws Luxury Resort & Spa", "sub": "Climate Controlled Boarding", "rating": "4.9", "loc": "Gurugram", "meta": "24/7 CCTV Access • Swimming Pool • Vet On Call", "badge": "5-Star Rating", "img": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500" }
      ],
      "medicine": [
        { "id": "m1", "title": "Advanced Hip & Joint Supplements", "sub": "Beaphar Glucosamine Chews", "price": "₹850", "meta": "Supports bone density and cartilage health", "tag": "Vet Recommended", "img": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500" }
      ]
    },
    "small": {
      "breeder": [
        { "id": "sb1", "title": "Tiny Paws Exotic Hamsteries", "sub": "Purebred Pedigree Specialist", "rating": "4.9", "loc": "Pune", "meta": "Syrian, Dwarf, and Roborovski setups", "badge": "Ethical Breeder", "img": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500" }
      ],
      "trainer": [
        { "id": "st1", "title": "Small Pet Habitats & Taming Clinic", "sub": "Small Mammal Expert Consultant", "rating": "4.8", "loc": "Virtual Consultation", "meta": "Handling advice, clicker training, bite corrections", "badge": "Rodent Expert", "img": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500" }
      ],
      "walker": [
        { "id": "sw1", "title": "Enclosure Maintenance & Play Foraging", "sub": "In-Home Enrichment Handlers", "rating": "4.9", "loc": "Mumbai Suburbs", "meta": "Deep cage cleaning & out-of-cage supervised exercise", "badge": "Certified Handlers", "img": "https://images.unsplash.com/photo-1516715094727-ec48be335d79?w=500" }
      ],
      "food": [
        { "id": "sf1", "title": "Gourmet Forage Seed & Fruit Mix", "sub": "Versele-Laga Hamster Nature", "price": "₹650", "meta": "Enriched with mealworms and premium nuts", "tag": "Top Pick", "img": "https://images.unsplash.com/photo-1608454504242-3b9579733de1?w=500" },
        { "id": "sf2", "title": "Organic Premium Timothy Hay", "sub": "Oxbow Animal Health", "price": "₹890", "meta": "High-fiber hand-selected hay for Guinea Pigs/Rabbits", "tag": "Essential Daily", "img": "https://images.unsplash.com/photo-1533152162573-53d7450343f0?w=500" }
      ],
      "accessories": [
        { "id": "sa1", "title": "Silent Running Spinner Wheel (11-inch)", "sub": "Exotic Nutrition Dual-Bearing", "price": "₹1,850", "meta": "Tail-safe wide track surface layout", "tag": "Super Quiet", "img": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500" }
      ],
      "stay": [
        { "id": "ss1", "title": "The Burrow Pocket-Pet Boarding", "sub": "Dedicated Small Rodent Safe Space", "rating": "5.0", "loc": "Noida", "meta": "Escape-proof quarantine rooms, customized fresh veggies diet", "badge": "Strict Safety Standards", "img": "https://images.unsplash.com/photo-1507682531662-421b17ac4f93?w=500" }
      ],
      "medicine": [
        { "id": "sm1", "title": "Stabilized Vitamin C Daily Drops", "sub": "Oxbow Natural Science Supplements", "price": "₹720", "meta": "Prevents scurvy and builds strong immunity profiles", "tag": "Crucial Formula", "img": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500" }
      ]
    }
  },
  "speciesRegistry": {
    "dog": [
      {
        "breedId": "DOG-001",
        "name": "French Bulldog",
        "sizeGroup": "small-size",
        "traitGroup": "apartment",
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
        "traitGroup": "trending",
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
      }
    ],
    "small": [
      {
        "breedId": "SMALL-001",
        "name": "Syrian Hamster",
        "sizeGroup": "small-size",
        "traitGroup": "apartment",
        "scaleAndType": "Pocket Size • Gentle & Solitary",
        "origin": "Syria",
        "lifespan": "2-3 Years",
        "temperament": "Curious, quiet, active at night, and loves exploring tunnels",
        "puppyImg": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600",
        "adultImg": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600",
        "phaseLabels": { "young": "Tiny Pup Phase", "mature": "Active Explorer Stage" },
        "developmentPhases": {
          "young": "Requires a safe nesting space, premium seed mix, and zero handling during the first two weeks.",
          "mature": "Enjoys running on solid exercise wheels, foraging for healthy treats, and burrowing deep into soft bedding."
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
  
  

  const activeSpeciesConfig = PET_DATA_STORE.speciesTabs.find(t => t.id === activeTab) || PET_DATA_STORE.speciesTabs[0];
  const activeLabelPrefix = activeSpeciesConfig.prefix;

  const computedServices = [
    { "id": "breed", "title": `${activeLabelPrefix} Breeds`, "desc": "Discover healthy breeds with loving personalities and complete family care metrics.", "icon": "🧬", "uiType": "breed" },
    { "id": "breeder", "title": `${activeLabelPrefix} Breeders`, "desc": "Trusted, verified professionals focusing on health, vaccination records, and genetics.", "icon": "🏡", "uiType": "serviceGrid" },
    { "id": "trainer", "title": `${activeLabelPrefix} Trainers`, "desc": "Professional coaches specializing in smart basic obedience, behavioral adjustments, and play.", "icon": "🎓", "uiType": "expertGrid" },
    { "id": "walker", "title": `${activeLabelPrefix} Walkers`, "desc": "Reliable background-checked handlers to keep your companions fit, energetic, and happy.", "icon": "🏃", "uiType": "expertGrid" },
    { "id": "shed", "title": `${activeLabelPrefix} Studs`, "desc": "Explore verified champion bloodlines with comprehensive medical and fitness clearances.", "icon": "⛺", "uiType": "serviceGrid" },
    { "id": "accessories", "title": `${activeLabelPrefix} Accessories`, "desc": "Shop elite items, ergonomic harnesses, custom enclosures, and high-end beds.", "icon": "💎", "uiType": "productGrid" },
    { "id": "food", "title": `${activeLabelPrefix} Food`, "desc": "Premium nutritional diets tailored perfectly to support optimal development and long lifespans.", "icon": activeSpeciesConfig.foodIcon, "uiType": "productGrid" },
    { "id": "stay", "title": `${activeLabelPrefix} Stay Centres`, "desc": "Premium climate-controlled luxury boarding spots with 24/7 CCTV surveillance feeds.", "icon": "🏨", "uiType": "serviceGrid" },
    { "id": "medicine", "title": `${activeLabelPrefix} Medicines`, "desc": "Expert prescription tracking, preventive essential vitamins, and targeted joint supplements.", "icon": "💊", "uiType": "productGrid" }
  ];

 

  const handleCategoryClick = (serviceItem) => {
    setSelectedService(serviceItem);
    setSelectedFilter('all');
    setSearchQuery('');
    setModalOpen(true);
  };

  // Safe fallback selection strategy to gracefully handle missing active species combinations
  const activeDataStoreKey = PET_DATA_STORE.serviceDirectories[activeTab] ? activeTab : 'dog';
  const directoryList = PET_DATA_STORE.serviceDirectories[activeDataStoreKey][selectedService?.id] || [];
  
  const currentRegistryList = PET_DATA_STORE.speciesRegistry[activeTab] || [];
  const filteredBreeds = currentRegistryList.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || b.sizeGroup === selectedFilter || b.traitGroup === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#EAF0F9] text-stone-700  font-sans  relative overflow-x-hidden  selection:text-black-900">
      
      <style>{`
        @keyframes scrollInfinite { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-infinite-marquee { display: flex; width: max-content; animation: scrollInfinite 25s linear infinite; }
        .animate-infinite-marquee:hover { animation-play-state: paused; }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Blocks */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-stone-800 tracking-tight mb-3">{PET_DATA_STORE.heading}</h2>
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
                  className={`px-6 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide transition-all border shadow-2xs flex items-center gap-2 mx-1.5 shrink-0
                    ${isSelected ? 'bg-pink-400 border-pink-400 text-white shadow-md scale-105' : 'bg-white text-stone-600 border-stone-200/60 hover:bg-pink-50/30'}`}
                >
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontally Scrollable Dynamic Service Grid Track */}
       {/* MOBILE/TABLET SLIDER */}
<div className="lg:hidden px-4">
  <Swiper
    slidesPerView={1.15}
    centeredSlides
    loop
    spaceBetween={18}
    modules={[Navigation]}
    navigation={{
      nextEl: ".service-next",
      prevEl: ".service-prev",
    }}
    breakpoints={{
      480: {
        slidesPerView: 1.4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.1,
        spaceBetween: 24,
      },
    }}
    className="!overflow-visible py-6"
  >
    {computedServices.map((service) => (
      <SwiperSlide key={service.id}>
        {({ isActive }) => (
          <div
            onClick={() => handleCategoryClick(service)}
            className={`
              bg-white rounded-[28px] p-6 cursor-pointer
              transition-all duration-500 ease-out
              border
              ${
                isActive
                  ? "scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-pink-200"
                  : "scale-95 opacity-80 border-stone-100"
              }
            `}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center text-2xl mb-5">
              {service.icon}
            </div>

            <h3 className="font-bold text-lg text-stone-800 mb-3">
              {service.title}
            </h3>

            <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
              {service.desc}
            </p>

            <div className="mt-6 flex items-center justify-between text-pink-500 font-semibold">
              <span>Explore</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        )}
      </SwiperSlide>
    ))}
  </Swiper>

  <div className="flex justify-center gap-3 mt-8">
    <button className="service-prev w-11 h-11 rounded-full bg-white border shadow-sm flex items-center justify-center">
      <ChevronLeft className="w-5 h-5" />
    </button>

    <button className="service-next w-11 h-11 rounded-full bg-white border shadow-sm flex items-center justify-center">
      <ChevronRight className="w-5 h-5" />
    </button>
  </div>
</div>

{/* DESKTOP GRID */}
<div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
  {computedServices.map((service) => (
    <div
      key={service.id}
      onClick={() => handleCategoryClick(service)}
      className="
        group
        bg-white
        rounded-[28px]
        border border-stone-200
        p-7
        cursor-pointer
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)]
        hover:border-pink-200
      "
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center text-2xl mb-5">
        {service.icon}
      </div>

      <h3 className="font-bold text-lg text-stone-800 mb-3">
        {service.title}
      </h3>

      <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
        {service.desc}
      </p>

      <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-pink-500 font-semibold">
        <span>Explore Catalog</span>

        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center transition-transform group-hover:translate-x-1">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  ))}
</div>

      </div>

      {/* Deep Component Portal Modal Engine */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-stone-900/10 backdrop-blur-xs" onClick={() => setModalOpen(false)} />

          <div className="relative bg-white border border-stone-150 w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
            
            {/* Modal Heading Control */}
            <div className="px-6 py-4 bg-stone-50/50 border-b border-stone-100 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 text-lg rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-2xs">{selectedService.icon}</div>
                <div>
                  <h4 className="text-base font-bold text-stone-800 capitalize">{selectedService.title}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{activeLabelPrefix} Specialized Portal</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-600"><X className="w-4 h-4" /></button>
            </div>

            {/* Core Modal Processing Switchboard */}
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              
              {/* LAYOUT 1: BREED SWITCH INTERFACE */}
              {selectedService.uiType === 'breed' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-4 border-b border-stone-100">
                    <h5 className="text-sm font-bold text-stone-800">Filter verified native breeds:</h5>
                    <input type="text" placeholder={`Search ${activeLabelPrefix.toLowerCase()} variants...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-64 bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-4 py-1.5 text-xs text-stone-700 font-medium focus:outline-none focus:border-pink-300" />
                  </div>
                  <div className="bg-amber-50/40 border border-amber-100 p-2 rounded-xl flex flex-wrap gap-1.5">
                    {PET_DATA_STORE.combinedBreedFilters.map((filter) => (
                      <button key={filter.id} onClick={() => setSelectedFilter(filter.id)} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all uppercase whitespace-nowrap ${selectedFilter === filter.id ? 'bg-pink-400 text-white shadow-2xs' : 'text-stone-500 bg-white border border-stone-200'}`}>{filter.label}</button>
                    ))}
                  </div>
                  <div className="space-y-6">
                    {filteredBreeds.length > 0 ? (filteredBreeds.map((breed) => (
                      <div key={breed.breedId} className="bg-white border border-stone-150 rounded-2xl p-5 flex flex-col lg:flex-row gap-6 shadow-2xs">
                        <div className="flex-1 space-y-3 text-left lg:max-w-xs border-b lg:border-b-0 lg:border-r border-stone-100 pb-4 lg:pb-0 lg:pr-5">
                          <div>
                            <h6 className="text-base sm:text-lg font-black text-stone-800 tracking-tight">{breed.name}</h6>
                            <span className="text-[10px] font-bold uppercase tracking-wide text-pink-500 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded mt-1 inline-block">{breed.scaleAndType}</span>
                          </div>
                          <div className="space-y-1.5 text-xs text-stone-400 font-medium">
                            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-stone-300" /> <span>Origin: <strong className="text-stone-600 font-semibold">{breed.origin}</strong></span></div>
                            <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-stone-300" /> <span>Expected Lifespan: <strong className="text-stone-600 font-semibold">{breed.lifespan}</strong></span></div>
                          </div>
                          <div className="text-xs bg-stone-50 p-3 rounded-xl border border-stone-150"><p className="text-stone-500 font-medium leading-relaxed">{breed.temperament}</p></div>
                        </div>
                        <div className="flex-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-stone-150 rounded-xl overflow-hidden bg-stone-50 flex flex-col justify-between">
                            <div className="h-36 bg-stone-100 overflow-hidden relative"><img src={breed.puppyImg} alt="puppy variant structural look" className="w-full h-full object-cover" /><div className="absolute top-2 left-2 bg-sky-400 text-white font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-md shadow-2xs">✨ {breed.phaseLabels?.young}</div></div>
                            <div className="p-3 text-left bg-white"><p className="text-xs text-stone-400 font-medium leading-relaxed">{breed.developmentPhases.young}</p></div>
                          </div>
                          <div className="border border-stone-150 rounded-xl overflow-hidden bg-stone-50 flex flex-col justify-between">
                            <div className="h-36 bg-stone-100 overflow-hidden relative"><img src={breed.adultImg} alt="mature variant structural look" className="w-full h-full object-cover" /><div className="absolute top-2 left-2 bg-emerald-400 text-white font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-md shadow-2xs">🌿 {breed.phaseLabels?.mature}</div></div>
                            <div className="p-3 text-left bg-white"><p className="text-xs text-stone-400 font-medium leading-relaxed">{breed.developmentPhases.mature}</p></div>
                          </div>
                        </div>
                      </div>
                    ))) : (
                      <div className="py-12 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50"><p className="text-xs text-stone-400 font-bold uppercase tracking-wider">No specific variants uploaded under this combination yet.</p></div>
                    )}
                  </div>
                </div>
              )}

              {/* LAYOUT 2: EXPERTS DIRECTORY (TRAINERS, WALKERS) */}
              {selectedService.uiType === 'expertGrid' && (
                <div className="space-y-6 text-left">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-bold text-stone-800">Available Certified Specialists</h5>
                      <p className="text-xs text-stone-400">Showing background verified partners ready to assist with your {activeLabelPrefix.toLowerCase()}.</p>
                    </div>
                    <span className="text-xs bg-pink-50 text-pink-500 font-bold px-2.5 py-1 rounded-md border border-pink-100">{directoryList.length} Experts Online</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {directoryList.map((expert) => (
                      <div key={expert.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col sm:flex-row shadow-2xs hover:shadow-sm transition-all">
                        <div className="w-full sm:w-32 h-36 bg-stone-100 shrink-0 relative">
                          <img src={expert.img} alt="expert profile headshot" className="w-full h-full object-cover" />
                          <div className="absolute bottom-2 left-2 bg-stone-900/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {expert.rating}</div>
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h6 className="text-sm font-bold text-stone-800">{expert.title}</h6>
                              <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wide whitespace-nowrap">{expert.badge}</span>
                            </div>
                            <p className="text-xs text-pink-500 font-medium mt-0.5">{expert.sub}</p>
                            <p className="text-xs text-stone-400 font-medium mt-2 leading-relaxed">{expert.meta}</p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-stone-50 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-stone-300" /> {expert.loc}</span>
                            <button className="bg-stone-900 hover:bg-pink-500 text-white font-bold px-3 py-1 rounded-lg transition-colors">Book Consultation</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LAYOUT 3: SERVICE STATIONS (BREEDERS, STUDS, STAY CENTRES) */}
              {selectedService.uiType === 'serviceGrid' && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {directoryList.map((center) => (
                      <div key={center.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs hover:border-pink-200 transition-all">
                        <div className="h-44 bg-stone-100 w-full relative">
                          <img src={center.img} alt="center architecture viewport" className="w-full h-full object-cover" />
                          <div className="absolute top-3 left-3 bg-white/95 border border-stone-150 rounded-md px-2 py-0.5 text-[10px] font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                            <Award className="w-3.5 h-3.5 text-pink-400" /> {center.badge}
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <h6 className="text-base font-bold text-stone-800">{center.title}</h6>
                            <div className="flex items-center gap-1 text-xs font-bold text-stone-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {center.rating}</div>
                          </div>
                          <p className="text-xs text-stone-400 font-semibold">{center.sub}</p>
                          <p className="text-xs text-stone-500 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-100 font-medium">{center.meta}</p>
                          <div className="pt-2 flex items-center justify-between text-xs text-stone-400 font-medium">
                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-stone-300" /> {center.loc}</span>
                            <button className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-4 py-1.5 rounded-lg shadow-3xs transition-colors">Contact Hub</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LAYOUT 4: PRODUCT TILES (FOOD, ACCESSORIES, MEDICINE) */}
              {selectedService.uiType === 'productGrid' && (
                <div className="space-y-6 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {directoryList.map((product) => (
                      <div key={product.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs flex flex-col justify-between hover:border-pink-200 transition-all">
                        <div>
                          <div className="h-40 bg-stone-50 overflow-hidden relative border-b border-stone-100">
                            <img src={product.img} alt="retail merchandise profile" className="w-full h-full object-cover" />
                            <span className="absolute top-2 right-2 bg-stone-900 text-white font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded">{product.tag}</span>
                          </div>
                          <div className="p-4 space-y-1">
                            <h6 className="text-sm font-bold text-stone-800 line-clamp-1">{product.title}</h6>
                            <p className="text-xs text-pink-500 font-medium">{product.sub}</p>
                            <p className="text-[11px] text-stone-400 font-medium leading-relaxed pt-1">{product.meta}</p>
                          </div>
                        </div>
                        <div className="p-4 pt-0">
                          <div className="pt-3 border-t border-stone-50 flex items-center justify-between">
                            <span className="text-sm font-black text-stone-800">{product.price}</span>
                            <button className="bg-stone-50 hover:bg-pink-50 border border-stone-200 text-stone-700 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                              <ShoppingBag className="w-3.5 h-3.5 text-stone-400" /> Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty Data Placeholder Validation Check */}
              {directoryList.length === 0 && selectedService.uiType !== 'breed' && (
                <div className="py-16 text-center border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                  <div className="text-2xl mb-2">📁</div>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">Deploying full structural catalog items for {activeLabelPrefix} soon.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}