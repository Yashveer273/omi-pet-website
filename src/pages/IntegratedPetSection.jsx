import { useState, useEffect } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ContactActions from "../components/ContactActions";



import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const DEFAULT_BREED_FILTERS = [
  { id: 'all', label: 'All Breeds' },
  { id: 'toy-breed', label: '🧸 Toy Breeds' },
  { id: 'small-size', label: '✨ Small Size' },
  { id: 'medium-size', label: '⚡ Medium Size' },
  { id: 'giant-size', label: '🐕 Giant Size' },
  { id: 'apartment-breed', label: '🏠 Apartment Breeds' },
  { id: 'office-breed', label: '💼 Office Breeds' },
  { id: 'family-breed', label: '👨‍👩‍👧‍👦 Family Breeds' },
  { id: 'gifting-breed', label: '🎁 Gifting Breeds' },
  { id: 'farm-breed', label: '🚜 Farm Breeds' },
  { id: 'alarming-breed', label: '🚨 Alert & Guard' },
  { id: 'trending', label: '🔥 Trending Breeds' },
];

const BREED_STAGE_OPTIONS = [
  { id: 'adult', label: 'Adult' },
  { id: 'puppy', label: 'Puppy' },
  { id: 'new-breed', label: 'New Breed' },
];

const mergeBreedFilters = (filters = []) => {
  const combined = [...DEFAULT_BREED_FILTERS, ...(Array.isArray(filters) ? filters : [])];
  const seen = new Set();

  return combined.filter((filter) => {
    if (!filter || !filter.id || seen.has(filter.id)) return false;
    seen.add(filter.id);
    return true;
  });
};

export default function IntegratedPetSection() {
  const [activeTab, setActiveTab] = useState('dog');

  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  // States to hold the Firebase Data
  const [registryData, setRegistryData] = useState([]);
  const [servicesData, setServicesData] = useState({});
  const [metaConfig, setMetaConfig] = useState({ combinedBreedFilters: DEFAULT_BREED_FILTERS });

  // 1. Fetching Registry Data (Breeds)
  // Dashboard ke logic ke hisaab se: registry_{species} collection
  useEffect(() => {
    const registryRef = collection(firestore, `registry_${activeTab}`);
    const unsubscribe = onSnapshot(registryRef, (snapshot) => {
      const breeds = snapshot.docs.map(doc => ({
        breedId: doc.id,
        ...doc.data()
      }));
      setRegistryData(breeds);
    });
    return () => unsubscribe();
  }, [activeTab]);

  // 2. Fetching Services Data
  // Dashboard ke logic ke hisaab se: serviceDirectories document -> {speciesId} field
  useEffect(() => {
    const servicesRef = doc(firestore, "serviceDirectories", activeTab);
    const unsubscribe = onSnapshot(servicesRef, (docSnap) => {
      if (docSnap.exists()) {
        setServicesData(docSnap.data());
      } else {
        setServicesData({});
      }
    });
    return () => unsubscribe();
  }, [activeTab]);

  useEffect(() => {
    const loadMetaConfig = async () => {
      try {
        const metaDoc = await getDoc(doc(firestore, 'metadata', 'configuration'));
        if (metaDoc.exists()) {
          const metaData = metaDoc.data();
          setMetaConfig({
            ...metaData,
            combinedBreedFilters: mergeBreedFilters(metaData.combinedBreedFilters),
          });
        }
      } catch (error) {
        console.error('Unable to load metadata filters:', error);
      }
    };

    loadMetaConfig();
  }, []);

  // COMBINED DATA VARIABLE (Jo aapke purane PET_DATA_STORE format ko mimic karega)
  const PET_DATA_STORE = {
    "heading": "Pets & Cat Categories",
    "subheading": "Explore Dogs, Cats, Birds, Fish, Small Pets, and Trusted Veterinary Care Services",
    "speciesTabs": [
      { "id": "dog", "name": "🐕 Dog", "prefix": "Dog", "foodIcon": "🥩" },
      { "id": "cat", "name": "🐈 Cat", "prefix": "Cat", "foodIcon": "🐟" },
      { "id": "small", "name": "🐹 Small Animal", prefix: "Small Pet", "foodIcon": "🥕" },
      { "id": "fish", "name": "🐟 Fish", "prefix": "Fish", "foodIcon": "🫙" },
      { "id": "bird", "name": "🦜 Bird", "prefix": "Bird", "foodIcon": "🌾" }
    ],
    "combinedBreedFilters": mergeBreedFilters(metaConfig.combinedBreedFilters),

    // Dynamic Data Mapped Here
    "serviceDirectories": {
      [activeTab]: servicesData
    },
    "speciesRegistry": {
      [activeTab]: registryData
    }
  };

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

  const currentRegistryList = PET_DATA_STORE.speciesRegistry[activeTab] || [];
  const getBreedLabel = (id) => (PET_DATA_STORE.combinedBreedFilters.find((item) => item.id === id)?.label || id);
  const getBreedStageLabel = (id) => (BREED_STAGE_OPTIONS.find((item) => item.id === id)?.label || id);
  const filteredBreeds = currentRegistryList.filter((b) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || (b.name || '').toLowerCase().includes(query) || (b.breedId || '').toLowerCase().includes(query);
    const matchesFilter =
      selectedFilter === 'all' ||
      b.traitGroup === selectedFilter ||
      b.breedId === selectedFilter ||
      b.id === selectedFilter;

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
                    {/* Fallback agar activeLabelPrefix define na ho */}
                    {activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : "Pet"} Professional Workspace
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
                    {/* STATIC_UI_DATA access karna zaroori hai */}
                    {PET_DATA_STORE.combinedBreedFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap border ${selectedFilter === filter.id
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
                                <span className="text-stone-400">Stage</span>
                                <strong className="text-stone-800 font-semibold">{getBreedStageLabel(breed.breedStage)}</strong>
                              </div>
                              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                                <span className="text-stone-400">Breed</span>
                                <strong className="text-stone-800 font-semibold">{getBreedLabel(breed.traitGroup)}</strong>
                              </div>
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
                                <strong className="text-stone-800 font-semibold capitalize">{breed.sizeGroup?.replace('-', ' ')}</strong>
                              </div>
                            </div>

                            <div className="text-xs bg-white p-4 rounded-xl border border-stone-200 shadow-3xs">
                              <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 block mb-1">Temperament Matrix</span>
                              <p className="text-stone-600 font-medium leading-relaxed">{breed.temperament}</p>
                            </div>
                          </div>

                          {/* Right Panel: Single Breed Snapshot */}
                          <div className="flex-2">
                            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white flex flex-col justify-between group shadow-3xs h-full">
                              <div className="h-48 bg-stone-100 overflow-hidden relative">
                                <img src={breed.puppyImg || breed.adultImg} alt={breed.name} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                                  Stage: {getBreedStageLabel(breed.breedStage) || "Adult"}
                                </div>
                              </div>
                              <div className="p-4 text-left bg-stone-50/50 border-t border-stone-200 flex-1 space-y-2">
                                <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Classified Breed</p>
                                <p className="text-xs text-stone-600 font-medium">{breed.description || "Pending..."}</p>
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

              {/* DYNAMIC LISTS: EXPERTS / SERVICES / PRODUCTS */}
              {selectedService.uiType !== 'breed' && (
                (() => {
                  // Dynamic data extraction based on selected tab and service
                  const directoryList = servicesData[selectedService.id] || [];

                  return (
                    <>
                      {/* INTERFACE: EXPERTS */}
                      {selectedService.uiType === 'expertGrid' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          {directoryList.map((expert) => (
                            <div key={expert.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-3xs hover:border-stone-300 transition-all">
                              <img
                                src={expert.img}
                                alt={expert.title}
                                className="w-full h-56 object-cover"
                              />
                              <div className="p-5">
                                <h6 className="font-black text-xl text-stone-900">{expert.title}</h6>

                                <p className="text-sm text-stone-500 mt-2">
                                  {expert.sub}
                                </p>

                                {expert.rating && (
                                  <p className="text-sm text-amber-500 font-semibold mt-3">
                                    ⭐ {expert.rating}
                                  </p>
                                )}

                                {expert.loc && (
                                  <p className="text-sm text-stone-500 mt-2">
                                    📍 {expert.loc}
                                  </p>
                                )}

                                <ContactActions
                                  title={expert.title}
                                  category={selectedService.title}
                                  whatsappNumber={expert.whatsapp}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* INTERFACE: SERVICES */}
                      {selectedService.uiType === 'serviceGrid' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          {directoryList.map((center) => (
                            <div
                              key={center.id}
                              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-3xs"
                            >
                              {/* Image */}
                              {center.img && (
                                <img
                                  src={center.img}
                                  alt={center.title}
                                  className="w-full h-56 object-cover"
                                />
                              )}

                              <div className="p-5">
                                {/* Title */}
                                <h6 className="font-black text-xl text-stone-900">
                                  {center.title}
                                </h6>

                                {/* Subtitle */}
                                <p className="text-sm text-stone-500 mt-2">
                                  {center.sub}
                                </p>

                                {/* Rating */}
                                {center.rating && (
                                  <p className="text-sm text-amber-500 mt-3 font-semibold">
                                    ⭐ {center.rating}
                                  </p>
                                )}

                                {/* Location */}
                                {center.loc && (
                                  <p className="text-sm text-stone-500 mt-2">
                                    📍 {center.loc}
                                  </p>
                                )}
                                <ContactActions
                                  title={center.title}
                                  category={selectedService.title}
                                  whatsappNumber={center.whatsapp}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* INTERFACE: PRODUCTS */}
                      {selectedService.uiType === 'productGrid' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                          {directoryList.map((product) => (
                            <div key={product.id} className="bg-white border border-stone-200 rounded-2xl p-4">
                              <img src={product.img} className="w-full h-32 object-cover rounded-xl mb-3" />
                              <h6 className="font-bold text-sm">{product.title}</h6>
                              <p className="text-sm text-stone-500 mt-2">{product.sub}</p>
                              {product.rating && (
                                <p className="text-sm text-amber-500 font-semibold mt-4">
                                  ⭐ {product.rating}
                                </p>
                              )}
                              {product.price && (
                                <p className="text-green-600 font-bold mt-2">
                                  {product.price}
                                </p>
                              )}
                              {product.loc && (
                                <p className="text-sm text-stone-500 mt-1">
                                  📍 {product.loc}
                                </p>
                              )}
                              <p className="text-xs text-stone-400">{product.meta}</p>
                              <ContactActions
                                title={product.title}
                                category={selectedService.title}
                                whatsappNumber={product.whatsapp}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {directoryList.length === 0 && (
                        <div className="py-24 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50">
                          <p className="text-xs text-stone-400 font-bold uppercase">Preparing catalog records...</p>
                        </div>
                      )}
                    </>
                  );
                })()
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 