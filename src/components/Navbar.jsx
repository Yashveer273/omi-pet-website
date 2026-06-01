import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import siteData from '../data/siteData.json';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  // ========================================================
  // ⚡ ADVANCED SCROLL DIRECTION & TOP POSITIONING TRACKER
  // ========================================================
  const [showNavbar, setShowNavbar] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true); // Track handles top condition check
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScrollVisibilityMatrix = () => {
      const currentScrollOffset = window.scrollY;
      
      // Check validation condition agar scroll position exact top par hai
      if (currentScrollOffset <= 10) {
        setIsAtTop(true);
        setShowNavbar(true);
      } else {
        setIsAtTop(false);
        // Niche scroll karne par navbar smoothly hide, upar scroll par visible transition active loops
        if (currentScrollOffset > lastScrollY && currentScrollOffset > 100) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      }
      
      setLastScrollY(currentScrollOffset);
    };

    window.addEventListener('scroll', handleScrollVisibilityMatrix, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibilityMatrix);
  }, [lastScrollY]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setSliderIndex((prev) => (prev + 1) % siteData.recommendedSlider.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setSliderIndex((prev) => (prev - 1 + siteData.recommendedSlider.length) % siteData.recommendedSlider.length);
  };

  const handlePageNavigation = (path) => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 💻 DESKTOP HEADER (Top Sticky Mode Layer) */}
      {/* ======================================================== */}
      {/* FIXED BORDER RADIUS & TOP BACKGROUND CONDITION HOOKS NATIVELY */}
      <div 
        className={`hidden md:block fixed top-6 inset-x-0 z-50 transition-all duration-500 ease-in-out py-2`}
        style={{
          transform: showNavbar ? 'translateY(0)' : 'translateY(-120px)',
          opacity: showNavbar ? 1 : 0
        }}
      >
        <header 
          className={`max-w-[760px] mx-auto text-black h-20 px-8 flex justify-between items-center transition-all duration-500 select-none
            ${isAtTop 
              ? 'bg-transparent border-transparent shadow-none rounded-none' // Ekdum top par background/shadow 100% clean clear blend
              : 'bg-white/95 backdrop-blur-md border border-slate-300/60 shadow-[0_12px_40px_rgba(0,0,0,0.06)] rounded-[20px]' // Thoda niche aate hi premium flat borders corners
            }`}
        >
          
          {/* Left: Search Action trigger handle icon */}
          <button 
            onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}
            className="text-black hover:opacity-60 transition-opacity focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Center: Main Branding Title Grid lines */}
          <div className="flex flex-col items-center select-none text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="font-serif text-[22px] tracking-[0.15em] font-medium text-black leading-none">
              {siteData.branding.title}
            </h1>
            <span className="text-[9px] tracking-widest text-gray-400 mt-1 font-sans uppercase">
              {siteData.branding.subtitle}
            </span>
          </div>

          {/* Right: Hamburger sheets triggers overlay strings */}
          <button 
            onClick={() => { setIsMenuOpen(true); setIsSearchOpen(false); }}
            className="text-black flex flex-col justify-center items-end space-y-1.5 w-5 h-5 group focus:outline-none"
          >
            <span className="w-5 h-[2px] bg-black rounded-full transition-transform"></span>
            <span className="w-3.5 h-[2px] bg-black rounded-full transition-transform"></span>
          </button>

        </header>
      </div>

      {/* ======================================================== */}
      {/* 📱 MOBILE FLOATING DOCK (Sticky Bottom Controls Dashboard) */}
      {/* ======================================================== */}
      {!isMenuOpen && !isSearchOpen && (
        <div className="md:hidden fixed bottom-6 inset-x-4 z-50 px-2 animate-fade-in">
          {/* Mobile docks updates border radius corners to match responsive rules templates styles */}
          <div className="bg-white/95 backdrop-blur-md rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200/80 px-6 py-4 flex justify-between items-center h-16">
            
            <button onClick={() => setIsSearchOpen(true)} className="text-slate-800 focus:outline-none">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <h1 className="font-serif text-lg tracking-[0.15em] font-medium text-slate-900 leading-none">
                {siteData.branding.title}
              </h1>
              <span className="text-[8px] tracking-wider text-slate-400 font-sans mt-1 uppercase">
                {siteData.branding.subtitle}
              </span>
            </div>

            <button onClick={() => setIsMenuOpen(true)} className="text-slate-800 flex flex-col justify-center items-end space-y-1.5 w-5 focus:outline-none">
              <span className="w-5 h-[2px] bg-slate-900 rounded-full"></span>
              <span className="w-3.5 h-[2px] bg-slate-900 rounded-full"></span>
            </button>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 📂 INTERACTIVE INTERFACES SHEET SLIDE-UPS */}
      {/* ======================================================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-50 flex justify-center items-end md:items-start md:p-6 p-0 transition-all duration-300">
          <div className="bg-white w-full max-w-[1400px] md:rounded-[20px] rounded-t-[20px] shadow-2xl p-6 md:p-12 relative flex flex-col h-[94vh] md:h-auto md:min-h-0 animate-slide-up">
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-5 w-full">
              <button onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }} className="text-black focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="flex flex-col items-center text-center">
                <h1 className="font-serif text-xl tracking-[0.15em] font-normal text-black leading-none">{siteData.branding.title}</h1>
                <span className="text-[9px] tracking-widest text-gray-400 mt-1 font-sans uppercase">{siteData.branding.subtitle}</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-black text-xl font-light focus:outline-none">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 flex-grow items-start overflow-y-auto pb-20 md:pb-0">
              <div className="flex flex-col space-y-2 md:space-y-3">
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mb-1 font-sans">Explore by</span>
                {siteData.navigation.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageNavigation(item.path)}
                    className="text-left font-serif text-3xl md:text-4xl text-slate-800 hover:text-[#0019FF] transition-colors duration-150 focus:outline-none"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="flex flex-col mt-4 md:mt-0">
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase mb-3 font-sans">Recommended</span>
                <div className="relative w-full aspect-[4/5] md:max-h-[350px] rounded-[20px] overflow-hidden shadow-md bg-gray-100">
                  <img 
                    src={siteData.recommendedSlider[sliderIndex].image} 
                    alt="Slider Visual" 
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                    <p className="font-sans text-xs md:text-sm font-normal leading-snug mb-3">
                      {siteData.recommendedSlider[sliderIndex].title}
                    </p>
                    <button className="self-start px-4 py-1 border border-white/40 rounded-full text-[9px] tracking-wider bg-white/10 backdrop-blur-sm font-sans uppercase">
                      {siteData.recommendedSlider[sliderIndex].tag}
                    </button>
                  </div>

                  <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow shadow-black/10 focus:outline-none">‹</button>
                  <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow shadow-black/10 focus:outline-none">›</button>
                </div>
              </div>

              <div className="hidden md:flex flex-col space-y-4 border-l border-gray-100 pl-8 h-full justify-start">
                <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase font-sans">{siteData.branding.title}</span>
                <h3 className="font-serif text-lg text-slate-950 leading-relaxed font-normal">{siteData.wepresentInfo.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-serif">{siteData.wepresentInfo.description}</p>
              </div>
            </div>

            <div className="flex md:hidden justify-between items-center pt-4 border-t border-gray-100 bg-white absolute bottom-0 inset-x-0 px-6 pb-6">
              <button onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }} className="text-black focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <h2 className="font-serif text-base tracking-widest font-bold text-black leading-none">{siteData.branding.title}</h2>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="text-black focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 🔍 SEARCH OVERLAY PANEL */}
      {/* ======================================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-50 flex justify-center items-end md:items-start md:p-6 p-0 transition-all duration-300">
          <div className="bg-white w-full max-w-[1400px] md:rounded-[20px] rounded-t-[20px] shadow-2xl p-6 md:p-12 relative flex flex-col h-[94vh] md:h-auto md:min-h-[500px] animate-slide-up">
            
            <div className="flex justify-between items-center w-full">
              <button onClick={() => setIsSearchOpen(false)} className="text-black text-xl font-light focus:outline-none">✕</button>
              <div className="flex flex-col items-center text-center">
                <h1 className="font-serif text-xl tracking-[0.15em] font-normal text-black leading-none">{siteData.branding.title}</h1>
                <span className="text-[9px] tracking-widest text-gray-400 mt-1 font-sans uppercase">{siteData.branding.subtitle}</span>
              </div>
              <button onClick={() => { setIsSearchOpen(false); setIsMenuOpen(true); }} className="text-black flex flex-col justify-center items-end space-y-1.5 w-5 focus:outline-none">
                <span className="w-5 h-[2px] bg-black rounded-full"></span>
                <span className="w-3.5 h-[2px] bg-black rounded-full"></span>
              </button>
            </div>

            <div className="w-full max-w-xl mx-auto text-center my-auto relative pt-12">
              <input 
                type="text" 
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-center font-serif text-4xl md:text-6xl text-slate-900 placeholder-gray-200 focus:outline-none bg-transparent"
                autoFocus
              />
            </div>

            <div className="w-full text-center mt-auto pb-20 md:pb-0">
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase block mb-3 font-sans">Explore the latest</span>
              <div className="flex justify-center space-x-2 overflow-hidden max-w-xs mx-auto">
                <div className="w-14 h-16 bg-slate-100 rounded-md transform -rotate-6 overflow-hidden flex-shrink-0 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100" className="w-full h-full object-cover" alt="rec" />
                </div>
                <div className="w-14 h-16 bg-slate-100 rounded-md transform translate-y-1 overflow-hidden flex-shrink-0 shadow-sm z-10 scale-105">
                  <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=100" className="w-full h-full object-cover" alt="rec" />
                </div>
                <div className="w-14 h-16 bg-slate-100 rounded-md transform rotate-6 overflow-hidden flex-shrink-0 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=100" className="w-full h-full object-cover" alt="rec" />
                </div>
              </div>
            </div>

            <div className="flex md:hidden justify-between items-center pt-4 border-t border-gray-100 bg-white absolute bottom-0 inset-x-0 px-6 pb-6">
              <button onClick={() => setIsSearchOpen(false)} className="text-black focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex flex-col items-center">
                <h2 className="font-serif text-base tracking-widest font-bold text-black leading-none">{siteData.branding.title}</h2>
              </div>
              <button onClick={() => { setIsSearchOpen(false); setIsMenuOpen(true); }} className="text-black flex flex-col justify-center items-end space-y-1.5 w-5 focus:outline-none">
                <span className="w-5 h-[2px] bg-slate-900 rounded-full"></span>
                <span className="w-3.5 h-[2px] bg-slate-900 rounded-full"></span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}