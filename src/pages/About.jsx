import React, { useState } from 'react';
import aboutData from '../data/aboutData.json';
import siteData from '../data/siteData.json';

export default function About() {
  // Destructuring overhauled structural layouts
  const { bannerTitle, bannerHeadline, mainHeading, storyCoverImage, paragraphs, companyValues, statistics } = aboutData.aboutContent;

  // Destructuring shared footer layouts properties from siteData
  const { title: footerTitle, subtitle: footerSubtitle, linksGrid } = siteData.footerSectionData;

  const [newsletterForm, setNewsletterForm] = useState({ firstName: '', lastName: '', email: '' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Newsletter Registration Successful on About Page!\nWelcome: ${newsletterForm.firstName}`);
    setNewsletterForm({ firstName: '', lastName: '', email: '' });
  };

  return (
    <main className="w-full min-h-screen bg-[#EAF0F9] pb-0 pt-28 selection:bg-black/5 selection:text-black overflow-x-hidden">
      
      {/* 🎯 HEADER BANNER SECTION */}
      <div className="max-w-[1200px] mx-auto px-6 md:mt-[30px] lg:mt-[30px] sm:px-8 flex flex-col items-center text-center mb-24 select-none animate-fade-in">
        <span className="font-serif text-xs md:text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4 block">
          {bannerTitle}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-[1.25] max-w-4xl tracking-tight">
          {bannerHeadline}
        </h2>
      </div>

      {/* 📄 SECTION 1: MODERN EDITORIAL STORY SPREAD */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-20">
        <div className="flex flex-col lg:flex-row lg:space-x-16 items-start justify-between w-full">
          
          {/* Left Side: Editorial Typography Title */}
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 select-none">
            <h3 className="font-serif text-4xl md:text-5xl text-slate-900 tracking-tight relative">
              {mainHeading}
              <span className="absolute bottom-[-10px] left-0 w-16 h-[3px] bg-[#0019FF] rounded-full" />
            </h3>
          </div>

          {/* Right Side: Clean Paragraph Cascades */}
          <div className="w-full lg:w-2/3 flex flex-col space-y-8 text-left">
            {paragraphs && paragraphs.map((para, idx) => (
              <p 
                key={idx} 
                className={`font-sans text-base sm:text-[18px] text-slate-700 leading-relaxed text-justify
                  ${idx === 0 ? 'text-xl sm:text-2xl text-slate-900 font-serif leading-relaxed italic text-left' : ''}`}
              >
                {para}
              </p>
            ))}
          </div>

        </div>
      </section>

      {/* 🖼️ NEW DYNAMIC ASSET: WIDE STORY CORE ROW IMAGE CARD */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-28 select-none animate-fade-in">
        <div className="w-full rounded-[28px] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-slate-200 shadow-sm relative group">
          <img 
            src={storyCoverImage} 
            alt="Our Story Cinematic Background" 
            className="w-full h-full object-cover object-center transform group-hover:scale-[1.01] transition-transform duration-[1000ms] ease-out" 
          />
        </div>
      </section>

      {/* 📊 SECTION 2: MODERNISED PASTEL LIGHT BLUE STATS STRIP */}
      {/* FIXED: Muted background panel color hex maps out cleaner modern contrast setups */}
      <section className="w-full bg-[#E1EBF5] border-y border-slate-300/30 py-16 mb-32 select-none shadow-sm relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statistics && statistics.map((stat, idx) => (
            <div key={idx} className="flex flex-col space-y-2 animate-slide-up">
              <span className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500/90">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 🏡 SECTION 3: CLEAN MINIMAL VALUES GRID */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-40 text-center flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-16 select-none">
          <hr className="border-t border-slate-300/60 w-32 mb-6" />
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-slate-400 uppercase">
            Our Core Values
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1140px]">
          {companyValues && companyValues.map((val) => (
            <div 
              key={val.id} 
              className="bg-white rounded-[24px] border border-slate-300/40 p-8 flex flex-col items-start text-left shadow-sm hover:shadow-md transition-all duration-300"
            >
              <span className="text-4xl mb-5 block select-none">{val.icon}</span>
              <h4 className="font-serif text-xl font-medium text-slate-900 mb-3 tracking-tight select-none">
                {val.title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 📋 SECTION 4: NEWSLETTER CONTACT FOOTER PANEL */}
      <footer className="w-full bg-[#EAF0F9] pt-24 pb-16 border-t border-slate-300/60 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row justify-between items-start w-full gap-16 lg:gap-8">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left max-w-[520px]">
            <h4 className="font-serif text-3xl sm:text-4xl text-slate-900 mb-2 select-none">{footerTitle}</h4>
            <p className="font-serif text-3xl sm:text-4xl text-slate-900 mb-10 select-none">{footerSubtitle}</p>
            
            <form onSubmit={handleNewsletterSubmit} className="w-full flex flex-col space-y-4">
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <input type="text" required placeholder="First name" value={newsletterForm.firstName} onChange={(e) => setNewsletterForm({ ...newsletterForm, firstName: e.target.value })} className="w-full sm:w-1/2 px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-500/80 transition-colors" />
                <input type="text" required placeholder="Last name" value={newsletterForm.lastName} onChange={(e) => setNewsletterForm({ ...newsletterForm, lastName: e.target.value })} className="w-full sm:w-1/2 px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-500/80 transition-colors" />
              </div>
              <input type="email" required placeholder="Your email address" value={newsletterForm.email} onChange={(e) => setNewsletterForm({ ...newsletterForm, email: e.target.value })} className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-500/80 transition-colors" />
              <div className="w-full pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="button" className="px-6 py-4 rounded-full border border-slate-400/60 text-slate-800 bg-transparent font-sans text-sm font-medium hover:border-black transition-colors" onClick={() => alert('About feedback active.')}>Tell us more +</button>
                <button type="submit" className="px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-sm font-semibold tracking-wide hover:bg-black active:scale-[0.99] transition-all shadow-sm">Submit</button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-12 text-left pt-2">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-6 block select-none">Explore by</span>
              <ul className="space-y-4">
                {linksGrid && linksGrid.exploreBy.map((link, idx) => (
                  <li key={idx}><a href={`/${link.toLowerCase()}`} className="font-serif text-xl sm:text-2xl text-slate-900 hover:text-[#0019FF] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-6 block select-none">WePresent</span>
              <ul className="space-y-4">
                {linksGrid && linksGrid.wePresent.map((link, idx) => (
                  <li key={idx}><a href={`/${link.toLowerCase()}`} className="font-serif text-xl sm:text-2xl text-slate-900 hover:text-[#0019FF] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </footer>

      {/* Corporate Copyright Strip */}
      <div className="w-full bg-[#EAF0F9] border-t border-slate-300/40 py-5 px-6 md:px-12 relative z-10 flex flex-col sm:flex-row justify-between items-center text-slate-400/80 font-sans text-[11px] tracking-widest uppercase font-medium">
        <div>© {new Date().getFullYear()} OMI PET || All rights reserved. All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>

    </main>
  );
}