import React, { useState, useRef } from 'react';
import siteData from '../data/siteData.json';

// --- CORE SWIPER CAROUSEL ENGINE ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import mandatory underlying layout assets CSS cleanly
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
  // Centralized JSON Destructuring
  const { 
    artist, headline, heroImage, publishedDate, author, 
    articleParagraph, articleBlocks, firstGalleryImages, 
    secondGalleryCover, secondGalleryImages, lowerNarrativeBlocks,
    dualCardLeftImage, dualCardRightImage, thirdGalleryImages, footerParagraph
  } = siteData.homeContent;

  const { heading, subheading, speciesTabs, dogServices, breedSizes, dogSliderData, catSliderData, smallAnimalSliderData, fishSliderData, birdSliderData } = siteData.omiPetSection;

  const { heading: keepExploringHeading, pills: keepExploringPills, photographyData, somethingNewData } = siteData.keepExploringSection;

  const { heading: ourBlogHeading, blogsData } = siteData.ourBlogSliderSection;

  // Destructuring brand new Pro Promo Banner asset nodes
  const { upperContext, mainHeading, accentGraphicText, redirectUrl } = siteData.proBannerSectionData;

  const { title: footerTitle, subtitle: footerSubtitle, linksGrid } = siteData.footerSectionData;

  // Universal Lightbox Overlay Matrix States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGalleryScope, setActiveGalleryScope] = useState('first'); 
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Keep Exploring Active Pill Toggle State
  const [activeExplorePill, setActiveExplorePill] = useState('photography'); 

  // Local state loops to validate news input values natively
  const [newsletterForm, setNewsletterForm] = useState({ firstName: '', lastName: '', email: '' });

  // --- Independent Mouse Hover Tracker States per Canvas Section ---
  const [cursorPos1, setCursorPos1] = useState({ x: 0, y: 0 });
  const [isHovering1, setIsHovering1] = useState(false);
  const [exitAnimationActive1, setExitAnimationActive1] = useState(false);
  const imageContainerRef1 = useRef(null);

  const [cursorPos2, setCursorPos2] = useState({ x: 0, y: 0 });
  const [isHovering2, setIsHovering2] = useState(false);
  const [exitAnimationActive2, setExitAnimationActive2] = useState(false);
  const imageContainerRef2 = useRef(null);

  const [cursorPos3, setCursorPos3] = useState({ x: 0, y: 0 });
  const [isHovering3, setIsHovering3] = useState(false);
  const [exitAnimationActive3, setExitAnimationActive3] = useState(false);
  const imageContainerRef3 = useRef(null);

  const [cursorPos4, setCursorPos4] = useState({ x: 0, y: 0 });
  const [isHovering4, setIsHovering4] = useState(false);
  const [exitAnimationActive4, setExitAnimationActive4] = useState(false);
  const imageContainerRef4 = useRef(null);

  // ========================================================
  // ⚡ DYNAMIC PORTAL ENGINE SWITCHER STATES & REFS
  // ========================================================
  const [activeTab, setActiveTab] = useState('dog'); 
  const [selectedServiceId, setSelectedServiceId] = useState(null); 
  const [selectedBreedSize, setSelectedBreedSize] = useState(null); 
  const [selectedAgeNode, setSelectedAgeNode] = useState(null); 
  const [isTabAutoScrollPaused, setIsTabAutoScrollPaused] = useState(false);

  // 🎯 Slider Section ke liye Ref banaya auto-scroll target karne ke liye
  const sliderSectionRef = useRef(null);

  const [clinicForm, setClinicForm] = useState({
    petName: '', species: 'Dog', age: '', breed: '', sex: 'Male', observation: ''
  });

  // 🎯 Smooth Scroll Function
  const scrollToSlider = () => {
    if (sliderSectionRef.current) {
      sliderSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center' // Slider ko screen ke center mein scroll karega
      });
    }
  };

  const handleClinicSubmit = (e) => {
    e.preventDefault();
    alert(`Clinical Logbook Recorded Successfully!\nPET: ${clinicForm.petName}`);
    setClinicForm({ petName: '', species: 'Dog', age: '', breed: '', sex: 'Male', observation: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Newsletter Registration Successful!\nWelcome aboard: ${newsletterForm.firstName}`);
    setNewsletterForm({ firstName: '', lastName: '', email: '' });
  };

  const getLocalizedImagesArray = () => {
    if (activeGalleryScope === 'hero') return [heroImage];
    if (activeGalleryScope === 'leftCard') return [dualCardLeftImage];
    if (activeGalleryScope === 'rightCard') return [dualCardRightImage];
    if (activeGalleryScope === 'first') return firstGalleryImages;
    if (activeGalleryScope === 'second') return secondGalleryImages;
    if (activeGalleryScope === 'third') return thirdGalleryImages;
    return firstGalleryImages;
  };

  const localizedImagesArray = getLocalizedImagesArray();

  const handleMouseMove = (e, targetRef, coordinateSetter) => {
    if (!targetRef.current) return;
    const perimeterRect = targetRef.current.getBoundingClientRect();
    coordinateSetter({ x: e.clientX - perimeterRect.left, y: e.clientY - perimeterRect.top });
  };

  const executeGracefulExit = (animationFlagSetter, hoveringFlagSetter) => {
    animationFlagSetter(true);
    setTimeout(() => { hoveringFlagSetter(false); animationFlagSetter(false); }, 350);
  };

  const handleBlanketTapAdvance = (e) => {
    e.stopPropagation();
    if (localizedImagesArray && localizedImagesArray.length > 0) {
      setCurrentSlideIndex((prev) => (prev + 1) % localizedImagesArray.length);
    }
  };

  const bootModularSlider = (galleryContextKey) => {
    setActiveGalleryScope(galleryContextKey);
    setCurrentSlideIndex(0);
    setIsLightboxOpen(true);
  };

  const getActiveSliderDataset = () => {
    if (activeTab === 'cat') return catSliderData || [];
    if (activeTab === 'small') return smallAnimalSliderData || [];
    if (activeTab === 'fish') return fishSliderData || [];
    if (activeTab === 'bird') return birdSliderData || [];
    if (activeTab === 'dog' && selectedServiceId && selectedServiceId !== 'breed' && dogSliderData[selectedServiceId]) {
      return dogSliderData[selectedServiceId];
    }
    return [];
  };

  const activeSliderDataList = getActiveSliderDataset();
  const getKeepExploringDataset = () => {
    return activeExplorePill === 'photography' ? photographyData : somethingNewData;
  };

  return (
    <main className="w-full min-h-screen bg-[#EAF0F9] pb-16 relative selection:bg-black/5 selection:text-black overflow-x-hidden">
      
      {/* 🎯 SECTION 1: HERO TITLE & SLIDER 1 */}
      <div className="max-w-[1200px] md:mt-[30px] lg:mt-[30px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        <div className="text-center pt-16 md:pt-24 flex flex-col items-center w-full">
          <span className="font-serif text-lg md:text-xl text-slate-800 tracking-wide mb-3 block select-none">
            {artist}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-[1.2] max-w-4xl tracking-tight mb-12 select-none w-full">
            {headline}
          </h2>
        </div>

        <div 
          ref={imageContainerRef1}
          onClick={() => bootModularSlider('hero')}
          onMouseMove={(e) => handleMouseMove(e, imageContainerRef1, setCursorPos1)}
          onMouseEnter={() => { setIsHovering1(true); setExitAnimationActive1(false); }}
          onMouseLeave={() => executeGracefulExit(setExitAnimationActive1, setIsHovering1)}
          className="w-full rounded-[24px] overflow-hidden aspect-[14/10] md:aspect-[21/10] bg-slate-200 mb-16 relative cursor-pointer group select-none shadow-sm"
          title="Click to view full image"
        >
          <img src={heroImage} alt="Hero Display" className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700 ease-out" />
        </div>
      </div>

      {/* 📄 SECTION 2: EDITORIAL STORIES SPLIT */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:space-x-12 items-start justify-between w-full">
          <div className="w-full lg:w-[180px] flex flex-row lg:flex-col justify-between md:justify-start items-start md:space-y-8 border-b lg:border-b-0 border-slate-300/40 pb-6 lg:pb-0 mb-12 lg:mb-0 shrink-0 mx-auto lg:mx-0">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans font-medium mb-1.5">Published</span>
              <span className="text-sm text-slate-800 font-serif font-medium">{publishedDate}</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans font-medium mb-1.5">Words</span>
              <span className="text-sm text-slate-800 font-serif font-medium">{author}</span>
            </div>
          </div>

          <div className="w-full flex-1">
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-slate-900 leading-[1.65] md:leading-[1.7] text-left text-justify mb-12 max-w-[620px] lg:ml-auto w-full">
              {articleParagraph}
            </p>
            <div className="w-full max-w-[620px] flex flex-col space-y-8 text-left lg:ml-auto mb-16">
              {articleBlocks && articleBlocks.map((block) => (
                <p key={block.id} className={`font-sans text-base sm:text-[17px] text-slate-700 leading-relaxed text-justify ${block.isHighlight ? 'border-l-4 border-blue-600 pl-4 md:pl-6 py-1 text-slate-900 font-medium' : ''}`}>
                  {block.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 mb-16 mt-4 flex flex-col items-center">
        <div 
          ref={imageContainerRef2}
          onClick={() => bootModularSlider('second')}
          onMouseMove={(e) => handleMouseMove(e, imageContainerRef2, setCursorPos2)}
          onMouseEnter={() => { setIsHovering2(true); setExitAnimationActive2(false); }}
          onMouseLeave={() => executeGracefulExit(setExitAnimationActive2, setIsHovering2)}
          className="w-full rounded-[24px] overflow-hidden aspect-[14/10] md:aspect-[21/10] bg-slate-200 mb-16 relative cursor-default group select-none shadow-sm"
        >
          <img src={secondGalleryCover} alt="Slider 2" className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-700 ease-out" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-end w-full">
          <div className="w-full lg:w-[calc(100%-228px)] max-w-[620px] flex flex-col space-y-8 text-left mb-16">
            {lowerNarrativeBlocks && lowerNarrativeBlocks.map((block) => (
              <p key={block.id} className="font-sans text-base sm:text-[17px] text-slate-700 leading-relaxed text-justify">{block.text}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mt-4 mb-16">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            <div className="md:col-span-5 w-full">
              <div 
                ref={imageContainerRef3}
                onClick={() => bootModularSlider('leftCard')}
                onMouseMove={(e) => handleMouseMove(e, imageContainerRef3, setCursorPos3)}
                onMouseEnter={() => { setIsHovering3(true); setExitAnimationActive3(false); }}
                onMouseLeave={() => executeGracefulExit(setExitAnimationActive3, setIsHovering3)}
                className="w-full rounded-[24px] overflow-hidden aspect-[3/4] md:aspect-[2/3] bg-slate-200 relative cursor-pointer group select-none shadow-sm"
                title="Click to view full image"
              >
                <img src={dualCardLeftImage} alt="Left Card" className="w-full h-full object-cover transform group-hover:scale-[1.01] transition-transform duration-500 ease-out" />
              </div>
            </div>

            <div className="md:col-span-7 w-full">
              <div 
                ref={imageContainerRef4}
                onClick={() => bootModularSlider('rightCard')}
                onMouseMove={(e) => handleMouseMove(e, imageContainerRef4, setCursorPos4)}
                onMouseEnter={() => { setIsHovering4(true); setExitAnimationActive4(false); }}
                onMouseLeave={() => executeGracefulExit(setExitAnimationActive4, setIsHovering4)}
                className="w-full rounded-[24px] overflow-hidden aspect-[4/3] bg-slate-200 relative cursor-pointer group select-none shadow-sm"
                title="Click to view full image"
              >
                <img src={dualCardRightImage} alt="Right Card" className="w-full h-full object-cover transform group-hover:scale-[1.01] transition-transform duration-500 ease-out" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mb-24">
        <div className="w-full flex justify-end">
          <div className="w-full lg:w-[calc(100%-228px)] max-w-[620px] text-left">
            <p className="font-sans text-base sm:text-[17px] text-slate-700 leading-relaxed text-justify">{footerParagraph}</p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 🚀 PART 2: DYNAMIC OMI PET PORTAL ENGINE */}
      {/* ======================================================== */}
      <hr className="border-t border-slate-300/60 max-w-[1200px] mx-auto mb-20" />

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center flex flex-col items-center mb-12">
          <h3 className="font-serif text-2xl md:text-4xl text-slate-900 tracking-tight mb-3">{heading}</h3>
          <p className="font-sans text-sm text-slate-500 max-w-md leading-relaxed">{subheading}</p>
        </div>

        {/* Level 1: Tabs Selection */}
        <div className="w-full overflow-hidden pb-4 mb-12">
          <div
            onMouseEnter={() => setIsTabAutoScrollPaused(true)}
            onMouseLeave={() => setIsTabAutoScrollPaused(false)}
            className="inline-flex flex-nowrap items-center space-x-3"
            style={{ animation: `marquee 20s linear infinite`, animationPlayState: isTabAutoScrollPaused ? 'paused' : 'running' }}
          >
            {speciesTabs && speciesTabs.map((tab) => (
              <button
                key={`${tab.id}-1`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedServiceId(null);
                  setSelectedBreedSize(null);
                  setSelectedAgeNode(null);
                }}
                className={`px-6 py-3.5 rounded-full font-sans text-xs md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 border shadow-sm
                  ${activeTab === tab.id ? 'bg-[#0019FF] border-blue-700 text-white scale-105' : 'bg-white/80 text-slate-700 border-slate-300/40 hover:bg-white'}`}
              >
                {tab.name}
              </button>
            ))}
            {speciesTabs && speciesTabs.map((tab) => (
              <button
                key={`${tab.id}-2`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedServiceId(null);
                  setSelectedBreedSize(null);
                  setSelectedAgeNode(null);
                }}
                className={`px-6 py-3.5 rounded-full font-sans text-xs md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 border shadow-sm
                  ${activeTab === tab.id ? 'bg-[#0019FF] border-blue-700 text-white scale-105' : 'bg-white/80 text-slate-700 border-slate-300/40 hover:bg-white'}`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dog View Directory */}
        {activeTab === 'dog' && (
          <div className="w-full">
            {/* Main 4 Column Responsive Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              {dogServices && dogServices.map((srv) => (
                <div key={srv.id} className="w-full flex flex-col">
                  <div
                    onClick={() => {
                      setSelectedServiceId(selectedServiceId === srv.id ? null : srv.id);
                      setSelectedBreedSize(null);
                      setSelectedAgeNode(null);
                    }}
                    className={`group relative rounded-[20px] overflow-hidden bg-white border p-6 flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px] w-full
                      ${selectedServiceId === srv.id ? 'border-[#0019FF] ring-1 ring-[#0019FF] bg-blue-50/10' : 'border-slate-300/40'}`}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-3xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">{srv.icon}</span>
                      <h4 className="font-serif text-lg text-slate-900 font-medium tracking-tight mb-2">{srv.title}</h4>
                      <p className="font-sans text-xs text-slate-500 leading-relaxed text-justify">{srv.desc}</p>
                    </div>
                    <div className="w-full flex justify-end pt-4 border-t border-slate-100 mt-2">
                      <span className="text-xs font-bold tracking-widest uppercase text-[#0019FF]">
                        {selectedServiceId === srv.id ? 'Close ✕' : srv.triggerThirdLevel ? 'Configure 🧬' : 'Explore ➔'}
                      </span>
                    </div>
                  </div>

                  {/* ==================================================================== */}
                  {/* ⚡ FIXED MOBILE BREAKPOINT ACCORDION INLINE DROPDOWN BOX */}
                  {/* ==================================================================== */}
                  {selectedServiceId === srv.id && (
                    <div className="block lg:hidden w-full bg-white rounded-[20px] border border-[#0019FF] p-5 mt-4 text-left animate-slide-up shadow-lg">
                      
                      {srv.id === 'breed' && srv.triggerThirdLevel ? (
                        <>
                          <h4 className="font-serif text-base text-slate-900 mb-4">Select Dog Breed Scale Size Matrix</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {breedSizes && breedSizes.map((sz) => (
                              <button
                                key={sz.id}
                                onClick={() => { setSelectedBreedSize(sz.id); setSelectedAgeNode(null); }}
                                className={`px-3 py-2.5 rounded-xl font-sans text-xs font-medium border transition-all duration-200
                                  ${selectedBreedSize === sz.id ? 'bg-slate-900 text-white border-black' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                              >
                                {sz.name}
                              </button>
                            ))}
                          </div>

                          {selectedBreedSize && (
                            <div className="w-full border-t border-slate-200/60 pt-4 mt-4 flex flex-col space-y-2 animate-fade-in">
                              {['Puppy Choice', 'Adult Choices'].map((node, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => { setSelectedAgeNode(node); alert(`Selected Path: Dog ➔ Breed ➔ ${selectedBreedSize} ➔ ${node}`); }}
                                  className={`px-4 py-3 rounded-lg flex items-center justify-between font-serif text-xs font-medium w-full border bg-white ${selectedAgeNode === node ? 'border-[#0019FF] bg-blue-50/20' : 'border-slate-200'}`}
                                >
                                  <span>{node}</span>
                                  <span className="text-[#0019FF]">➔</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full p-2 text-center animate-fade-in">
                          <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-3">Quick Preview Hub</p>
                          {dogSliderData && dogSliderData[srv.id] && dogSliderData[srv.id].length > 0 ? (
                            <div className="space-y-3">
                              {dogSliderData[srv.id].slice(0, 2).map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left">
                                  <img src={item.image || heroImage} className="w-12 h-12 rounded-lg object-cover" alt="preview" />
                                  <div className="flex-1 min-w-0">
                                    <h6 className="font-serif text-xs font-semibold text-slate-900 truncate">{item.title || item.name}</h6>
                                    <p className="text-[10px] text-slate-400 truncate">{item.desc || item.meta}</p>
                                  </div>
                                </div>
                              ))}
                              
                              {/* 🎯 Is button par click karte hi slider section par smooth auto-scroll chalega */}
                              <button 
                                onClick={scrollToSlider} 
                                className="w-full mt-2 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest active:scale-95 transition-all"
                              >
                                View Full Directory ➔
                              </button>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 italic">Exploring full options database matrix successfully.</p>
                          )}
                        </div>
                      )}

                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Laptop Large Viewport Layout Dropdown */}
            {selectedServiceId === 'breed' && (
              <div className="hidden lg:block w-full max-w-[850px] mx-auto bg-white rounded-[24px] border border-slate-300/40 p-8 mt-12 text-left animate-fade-in shadow-sm">
                <h4 className="font-serif text-xl text-slate-900 mb-6">Select Dog Breed Scale Size Matrix</h4>
                <div className="grid grid-cols-4 gap-4">
                  {breedSizes && breedSizes.map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => { setSelectedBreedSize(sz.id); setSelectedAgeNode(null); }}
                      className={`px-4 py-3 rounded-xl font-sans text-xs font-medium tracking-wide border transition-all duration-200
                        ${selectedBreedSize === sz.id ? 'bg-slate-900 text-white border-black shadow-md' : 'bg-white text-slate-700 border-slate-300/60 hover:bg-slate-50'}`}
                    >
                      {sz.name}
                    </button>
                  ))}
                </div>

                {selectedBreedSize && (
                  <div className="w-full border-t border-slate-300/40 pt-6 mt-8 animate-fade-in">
                    <div className="flex space-x-4">
                      {['Puppy Choice', 'Adult Choices'].map((node, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setSelectedAgeNode(node); alert(`Selected Path: Dog ➔ Breed ➔ ${selectedBreedSize} ➔ ${node}`); }}
                          className={`px-6 py-4 rounded-xl flex items-center justify-between font-serif text-sm font-medium w-full md:w-1/2 border transition-all duration-300 bg-white shadow-sm hover:border-blue-600 group ${selectedAgeNode === node ? 'border-[#0019FF] ring-1 ring-[#0019FF]' : 'border-slate-300/40'}`}
                        >
                          <span className="text-slate-800">{node}</span>
                          <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-600 text-slate-500 group-hover:text-white flex items-center justify-center text-xs transition-colors">➔</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Inner Swiper Categories Track */}
        {/* 🎯 Ref attach kar diya hai slider track area par taaki screen yahan scroll ho */}
        <div ref={sliderSectionRef} className="w-full scroll-mt-24">
          {((activeTab !== 'dog' && activeTab !== 'clinic') || (activeTab === 'dog' && selectedServiceId && selectedServiceId !== 'breed')) && activeSliderDataList.length > 0 && (
            <div className="w-full mt-24 animate-slide-up flex flex-col items-center">
              <div className="w-full relative px-0 flex flex-col items-center group">
                <Swiper
                  slidesPerView={1}
                  centeredSlides={true}
                  spaceBetween={20}
                  loop={true}
                  modules={[Navigation]}
                  navigation={{ nextEl: '.swiper-button-next-omi', prevEl: '.swiper-button-prev-omi' }}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 32 }
                  }}
                  className="w-full overflow-visible"
                >
                  {activeSliderDataList.map((slide, idx) => (
                    <SwiperSlide key={idx} className="rounded-[24px] overflow-hidden">
                      <div className="bg-white rounded-[24px] border border-slate-300/40 overflow-hidden shadow-sm p-5 flex flex-col justify-between aspect-[4/5] sm:aspect-[3/4]">
                        <div className="w-full h-[62%] rounded-[18px] overflow-hidden bg-slate-100 relative">
                          <img src={slide.image || heroImage} alt={slide.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-[38%] pt-4 flex flex-col justify-between items-start bg-white">
                          <div>
                            <h5 className="font-serif font-medium text-slate-900 text-sm sm:text-base line-clamp-2 mb-1">{slide.title || slide.name}</h5>
                            <p className="font-sans text-xs text-slate-400 line-clamp-2">{slide.desc || slide.meta}</p>
                          </div>
                          <button onClick={() => alert(`Exploring: ${slide.id}`)} className="font-sans text-xs font-bold uppercase text-[#0019FF] hover:underline">Explore ➔</button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex space-x-3 mt-12 z-20">
                  <button className="w-12 h-12 rounded-full border bg-white shadow-sm swiper-button-prev-omi font-bold text-sm">‹</button>
                  <button className="w-12 h-12 rounded-full border bg-white shadow-sm swiper-button-next-omi font-bold text-sm">›</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clinic Module */}
        {activeTab === 'clinic' && (
          <div className="w-full max-w-[720px] mx-auto bg-white rounded-[24px] border border-slate-300/40 p-6 md:p-10 shadow-sm text-left">
            <h4 className="font-serif text-2xl text-slate-900 mb-6">Clinical Registration Logbook</h4>
            <form onSubmit={handleClinicSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[11px] font-sans uppercase font-bold text-slate-400 mb-2">Name of the PET</label>
                  <input type="text" required placeholder="Rocky" value={clinicForm.petName} onChange={(e) => setClinicForm({ ...clinicForm, petName: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-300/80 font-sans text-sm bg-slate-50/40" />
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-sans uppercase font-bold text-slate-400 mb-2">Species</label>
                  <select value={clinicForm.species} onChange={(e) => setClinicForm({ ...clinicForm, species: e.target.value })} className="w-full px-4 py-3.5 rounded-xl border border-slate-300/80 font-sans text-sm bg-slate-50/40">
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-[#0019FF] text-white py-4 rounded-xl font-sans font-semibold">SAVE CLINICAL RECORD 📋</button>
            </form>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 🚀 SECTION 3: KEEP EXPLORING INFINITE WIDE CAROUSEL */}
      {/* ======================================================== */}
      <hr className="border-t border-slate-300/60 max-w-[1200px] mx-auto mt-24 mb-20 relative z-10" />

      <section className="w-full mb-24 text-center flex flex-col items-center relative z-20">
        <h3 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-tight mb-6">{keepExploringHeading}</h3>
        <h1 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight mb-6">Dog & Cat Breed</h1>

        <div className="flex space-x-3 mb-12">
          {keepExploringPills && keepExploringPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveExplorePill(pill.id)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide border transition-all duration-300
                ${activeExplorePill === pill.id ? 'bg-white text-slate-900 border-slate-900 shadow-sm scale-105' : 'bg-transparent text-slate-500 border-slate-300 hover:text-slate-900 hover:border-slate-400'}`}
            >
              {pill.name}
            </button>
          ))}
        </div>

        <div className="w-full relative px-0 flex flex-col items-center">
          <Swiper
            slidesPerView={1.3} 
            centeredSlides={true} 
            spaceBetween={24}
            loop={true}
            modules={[Navigation]}
            navigation={{ nextEl: '.swiper-button-next-explore-omi', prevEl: '.swiper-button-prev-explore-omi' }}
            breakpoints={{
              480: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 28 },
              1440: { slidesPerView: 4.5, spaceBetween: 32 } 
            }}
            className="w-full !overflow-visible keep-exploring-swiper-master"
          >
            {getKeepExploringDataset().map((card) => (
              <SwiperSlide key={card.id} className="transition-all duration-500 py-4 select-none">
                {({ isActive }) => (
                  <div 
                    className={`w-full p-6 pb-8 rounded-[28px] flex flex-col justify-between shadow-sm border transition-all duration-500 ease-out text-left ${card.bg}
                      ${isActive ? 'scale-[1.06] shadow-[0_25px_50px_rgba(0,0,0,0.12)] border-slate-400/40 relative z-30 opacity-100' : 'scale-[0.95] opacity-95 border-transparent z-10'}`}
                    style={{ height: isActive ? '435px' : '400px' }}
                  >
                    <div className="w-full h-[65%] rounded-[20px] overflow-hidden bg-black/5">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="h-[35%] pt-5 flex flex-col justify-between items-center text-center px-2">
                      <div className="w-full">
                        <span className="font-serif text-sm font-bold text-slate-900 block mb-1.5">{card.author}</span>
                        <h5 className="font-sans font-medium text-slate-700 text-xs sm:text-[13px] leading-relaxed tracking-tight line-clamp-2">{card.title}</h5>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex space-x-3 mt-12 relative z-40">
            <button className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all swiper-button-prev-explore-omi text-sm font-bold shadow-md">‹</button>
            <button className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all swiper-button-next-explore-omi text-sm font-bold shadow-md">›</button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 🚀 SECTION 4: OUR BLOG FLAT CONTINUOUS SLIDER TRACK */}
      {/* ======================================================== */}
      <hr className="border-t border-slate-300/60 max-w-[1200px] mx-auto mt-15 mb-20 relative z-10" />

      <section className="w-full mb-24 text-center flex flex-col items-center relative z-20">
        <h3 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-tight mb-12 select-none">{ourBlogHeading}</h3>

        <div className="w-full relative px-0 flex flex-col items-center">
          <Swiper
            slidesPerView={1.3} 
            centeredSlides={true} 
            spaceBetween={24}
            loop={true}
            modules={[Navigation]}
            navigation={{ nextEl: '.swiper-button-next-ourblog-omi', prevEl: '.swiper-button-prev-ourblog-omi' }}
            breakpoints={{
              480: { slidesPerView: 1.8, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 28 },
              1440: { slidesPerView: 4.5, spaceBetween: 32 } 
            }}
            className="w-full !overflow-visible our-blog-swiper-master"
          >
            {blogsData && blogsData.map((blog) => (
              <SwiperSlide key={blog.id} className="transition-all duration-500 py-4 select-none">
                {({ isActive }) => (
                  <div 
                    className={`w-full p-6 pb-8 rounded-[28px] flex flex-col justify-between shadow-sm border transition-all duration-500 ease-out text-left ${blog.bg}
                      ${isActive ? 'scale-[1.06] shadow-[0_25px_50px_rgba(0,0,0,0.12)] border-slate-400/40 relative z-30 opacity-100' : 'scale-[0.95] opacity-95 border-transparent z-10'}`}
                    style={{ height: isActive ? '435px' : '400px' }}
                  >
                    <div className="w-full h-[65%] rounded-[20px] overflow-hidden bg-black/5">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="h-[35%] pt-5 flex flex-col justify-between items-center text-center px-2">
                      <div className="w-full">
                        <span className="font-serif text-sm font-bold text-slate-900 block mb-1.5">{blog.author}</span>
                        <h5 className="font-sans font-medium text-slate-700 text-xs sm:text-[13px] leading-relaxed tracking-tight line-clamp-2">{blog.title}</h5>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex space-x-3 mt-12 relative z-40">
            <button className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all swiper-button-prev-ourblog-omi text-sm font-bold shadow-md">‹</button>
            <button className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all swiper-button-next-ourblog-omi text-sm font-bold shadow-md">›</button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 🚀 SECTION 5: PRO ADVERTISEMENT BANNER BLOCK */}
      {/* ======================================================== */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 mb-24 relative z-20 animate-fade-in">
        <div 
        
          className="w-full bg-[#1E1E1E] rounded-[32px] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative  group shadow-xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex flex-col items-start text-left z-10 w-full md:w-1/2 mb-8 md:mb-0">
            <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-white/50 uppercase mb-4 block">
              {upperContext}
            </span>
            <h2 className="font-serif font-medium text-white text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
              {mainHeading}
            </h2>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end z-10 select-none relative h-28 sm:h-36">
            <div className="font-serif font-black text-7xl sm:text-8xl md:text-[11rem] flex items-center italic leading-none tracking-tighter">
              <span className="text-[#FF6B4A] transform -rotate-12 translate-x-4 block drop-shadow-lg group-hover:scale-105 transition-transform duration-500">P</span>
              <span className="text-[#B983FF] text-5xl sm:text-6xl md:text-[7rem] transform rotate-12 -translate-y-6 -translate-x-2 block font-sans font-light opacity-90">r</span>
              <span className="text-[#5977FF] transform rotate-[25deg] -translate-x-8 block drop-shadow-md group-hover:rotate-[30deg] transition-transform duration-700">o</span>
            </div>
          </div>
        </div>
      </section>

      {/* 📋 SECTION 6: HIGH-END NEWSLETTER CONTACT FOOTER PANEL */}
      <footer className="w-full bg-[#EAF0F9] pt-24 pb-16 border-t border-slate-300/60 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row justify-between items-start w-full gap-16 lg:gap-8">
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left max-w-[520px]">
            <h4 className="font-serif text-3xl sm:text-4xl text-slate-900 mb-2">{footerTitle}</h4>
            <p className="font-serif text-3xl sm:text-4xl text-slate-900 mb-10">{footerSubtitle}</p>
            <form onSubmit={handleNewsletterSubmit} className="w-full flex flex-col space-y-4">
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <input type="text" required placeholder="First name" value={newsletterForm.firstName} onChange={(e) => setNewsletterForm({ ...newsletterForm, firstName: e.target.value })} className="w-full sm:w-1/2 px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none" />
                <input type="text" required placeholder="Last name" value={newsletterForm.lastName} onChange={(e) => setNewsletterForm({ ...newsletterForm, lastName: e.target.value })} className="w-full sm:w-1/2 px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none" />
              </div>
              <input type="email" required placeholder="Your email address" value={newsletterForm.email} onChange={(e) => setNewsletterForm({ ...newsletterForm, email: e.target.value })} className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none" />
              <div className="w-full pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="button" className="px-6 py-4 rounded-full border font-sans text-sm" onClick={() => alert('Expanded Options')}>Tell us more +</button>
                <button type="submit" className="px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-sm font-semibold">Submit</button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-12 text-left pt-2">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase text-slate-400 mb-6 block">Explore by</span>
              <ul className="space-y-4">
                {linksGrid.exploreBy.map((link, idx) => (
                  <li key={idx}><a href={`/${link.toLowerCase()}`} className="font-serif text-xl sm:text-2xl text-slate-900">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[11px] font-sans font-bold uppercase text-slate-400 mb-6 block">WePresent</span>
              <ul className="space-y-4">
                {linksGrid.wePresent.map((link, idx) => (
                  <li key={idx}><a href={`/${link.toLowerCase()}`} className="font-serif text-xl sm:text-2xl text-slate-900">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX OVERLAY SLIDER MODAL */}
      {isLightboxOpen && localizedImagesArray && localizedImagesArray.length > 0 && (
        <div onClick={handleBlanketTapAdvance} className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer select-none">
          <button onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">✕</button>
          <div className="w-full h-full flex items-center justify-center">
            <img src={localizedImagesArray[currentSlideIndex]} alt="Immersive View" className="w-full h-full md:w-auto md:max-h-[90vh] object-contain" />
          </div>
        </div>
      )}

      <div className="w-full bg-[#EAF0F9] border-t border-slate-300/40 py-5 px-6 md:px-12 relative z-40 flex flex-col sm:flex-row justify-between items-center text-slate-400/80 font-sans text-[11px] tracking-widest uppercase font-medium">
        <div>© {new Date().getFullYear()} OMI PET || All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>
    </main>
  );
}