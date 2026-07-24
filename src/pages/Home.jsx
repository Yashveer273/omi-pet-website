import { useState, useRef, useEffect } from 'react';
import siteData from '../data/siteData.json';

// --- FIREBASE CONNECTION MODULES ---
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// --- CORE SWIPER CAROUSEL ENGINE ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import mandatory underlying layout assets CSS cleanly
import 'swiper/css';
import 'swiper/css/navigation';
import SimpleCutePetSection from './IntegratedPetSection';
import { useNavigate } from "react-router-dom";
export default function Home() {
  // Centralized JSON Destructuring
  const { 
    artist, headline, heroImage, publishedDate, author, 
    articleParagraph, articleBlocks, firstGalleryImages, 
    secondGalleryCover, secondGalleryImages, lowerNarrativeBlocks,
    dualCardLeftImage, dualCardRightImage, thirdGalleryImages, footerParagraph
  } = siteData.homeContent;

  const { heading: keepExploringHeading } = siteData.keepExploringSection;

  const { heading: ourBlogHeading, blogsData } = siteData.ourBlogSliderSection;
const navigate =useNavigate();
  // Destructuring brand new Pro Promo Banner asset nodes
  const { upperContext, mainHeading } = siteData.proBannerSectionData;

  const { title: footerTitle, subtitle: footerSubtitle, linksGrid } = siteData.footerSectionData;

  // Universal Lightbox Overlay Matrix States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeGalleryScope, setActiveGalleryScope] = useState('first'); 
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Keep Exploring Dynamic Database State Matrix
  const [keepExploringList, setKeepExploringList] = useState([]);

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

  // Synchronized Hook to Populate Dynamic Keep Exploring Cards Feed
  useEffect(() => {
    const fetchExploringCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'keep_exploring'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setKeepExploringList(items);
      } catch (error) {
        console.error("Error retrieving dataset configurations from cloud infrastructure: ", error);
      }
    };

    void fetchExploringCards();
  }, []);

const handleNewsletterSubmit = (e) => {
  e.preventDefault();

  const firstName = newsletterForm.firstName.trim();
  const lastName = newsletterForm.lastName.trim();
  const email = newsletterForm.email.trim();

  const whatsappNumber = "917300526177";

  const message = `
Hello,

I would like to connect with you.

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
  `.trim();

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  setNewsletterForm({
    firstName: "",
    lastName: "",
    email: "",
  });
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
<hr className="border-t border-slate-300/60 max-w-[1200px] mx-auto mb-20" />

      <SimpleCutePetSection/>
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
      

      {/* ======================================================== */}
      {/* 🚀 SECTION 3: KEEP EXPLORING INFINITE WIDE CAROUSEL */}
    
      <hr className="border-t border-slate-300/60 max-w-[1200px] mx-auto mb-20 relative z-10" />

      <section className="w-full mb-2 text-center flex flex-col items-center relative z-20">
        <h3 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-tight mb-6">{keepExploringHeading}</h3>
        <h1 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight mb-0">Dog & Cat Breed</h1>
        <div className="w-full relative px-0 flex flex-col items-center">
          <Swiper
            slidesPerView={1.3} 
            centeredSlides={true} 
            spaceBetween={24}
            loop={keepExploringList.length > 0}
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
            {keepExploringList.map((card) => (
              <SwiperSlide key={card.id} className="transition-all duration-500 py-4 select-none">
                {({ isActive }) => (
                  <div 
                    className={`w-full p-6 pb-8 rounded-[28px] flex flex-col justify-between shadow-sm border transition-all duration-500 ease-out text-left ${card.bg}`}
                    style={{ 
                      height: isActive ? '435px' : '400px',
                      transform: isActive ? 'scale(1.06)' : 'scale(0.95)',
                      boxShadow: isActive ? '0 25px 50px rgba(0,0,0,0.12)' : 'none',
                      borderColor: isActive ? 'rgba(148, 163, 184, 0.4)' : 'transparent',
                      zIndex: isActive ? 30 : 10,
                      opacity: isActive ? 1 : 0.95,
                      position: 'relative',
                      transition: 'all 500s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
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
        <div className="w-full bg-[#1E1E1E] rounded-[32px] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative group shadow-xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-all duration-500">
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
     <footer className="w-full bg-[#EAF0F9] border-t border-slate-300/60 relative z-10">
  <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
    <div className="w-full text-center mb-10">
      <h4 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-3">
        {footerTitle}
      </h4>

      <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-slate-900">
        {footerSubtitle}
      </p>
    </div>

    <form
      onSubmit={handleNewsletterSubmit}
      className="w-full flex flex-col gap-4"
    >
      {/* Name fields */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder="First name"
          value={newsletterForm.firstName}
          onChange={(e) =>
            setNewsletterForm({
              ...newsletterForm,
              firstName: e.target.value,
            })
          }
          className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm placeholder:text-slate-500 focus:outline-none focus:border-slate-800 transition-colors"
        />

        <input
          type="text"
          required
          placeholder="Last name"
          value={newsletterForm.lastName}
          onChange={(e) =>
            setNewsletterForm({
              ...newsletterForm,
              lastName: e.target.value,
            })
          }
          className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm placeholder:text-slate-500 focus:outline-none focus:border-slate-800 transition-colors"
        />
      </div>

      {/* Email */}
      <input
        type="email"
        required
        placeholder="Your email address"
        value={newsletterForm.email}
        onChange={(e) =>
          setNewsletterForm({
            ...newsletterForm,
            email: e.target.value,
          })
        }
        className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm placeholder:text-slate-500 focus:outline-none focus:border-slate-800 transition-colors"
      />

      {/* Actions */}
      <div className="w-full flex flex-col sm:flex-row gap-4 pt-2">
        <button
          type="button"
          onClick={() => alert("Expanded Options")}
          className="w-full sm:flex-1 px-6 py-4 rounded-full border border-slate-400/60 text-slate-900 font-sans text-sm hover:border-slate-900 transition-colors"
        >
          Tell us more +
        </button>

        <button
          type="submit"
          className="w-full sm:flex-1 px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</footer>
<a
  href="https://wa.me/917300526177"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat with us on WhatsApp"
  className="fixed right-5 bottom-5 sm:right-7 sm:bottom-7 z-[100] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:scale-110 active:scale-95 transition-transform duration-200"
>
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-8 h-8 sm:w-9 sm:h-9"
    aria-hidden="true"
  >
    <path d="M16.04 3C8.87 3 3.04 8.83 3.04 16c0 2.29.6 4.53 1.73 6.5L3 29l6.67-1.75A12.94 12.94 0 0 0 16.04 29C23.21 29 29 23.17 29 16S23.21 3 16.04 3Zm0 23.82c-2.04 0-4.04-.55-5.78-1.59l-.41-.24-3.96 1.04 1.06-3.86-.27-.42A10.76 10.76 0 0 1 5.22 16c0-5.97 4.85-10.82 10.82-10.82S26.86 10.03 26.86 16s-4.85 10.82-10.82 10.82Zm5.94-8.11c-.32-.16-1.91-.94-2.21-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.91-1.79-2.23-.19-.32-.02-.49.14-.65.15-.14.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.69s1.16 3.12 1.32 3.34c.16.21 2.28 3.49 5.53 4.89.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.09 1.91-.78 2.18-1.54.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38Z" />
  </svg>
</a>
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