import React, { useState } from 'react';
import contactData from '../data/contactData.json';
import siteData from '../data/siteData.json';

export default function Contact() {
  // Destructuring central contact parameters
  const { topBannerContext, topBannerImage, heroTitle, heroSubtitle, officeDetails, mapEmbedUrl } = contactData.contactContent;
  const { title: footerTitle, subtitle: footerSubtitle, linksGrid } = siteData.footerSectionData;

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [newsletterForm, setNewsletterForm] = useState({ firstName: '', lastName: '', email: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${contactForm.name}! Our response matrix nodes will connect shortly.`);
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Newsletter Registration Successful on Contact Page!\nWelcome: ${newsletterForm.firstName}`);
    setNewsletterForm({ firstName: '', lastName: '', email: '' });
  };

  return (
    <main className="w-full md:mt-[30px] lg:mt-[30px] min-h-screen bg-[#EAF0F9] pb-0 pt-24 selection:bg-black/5 selection:text-black overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 🖼️ UPGRADED: BIG & BOLD HERO ANNOUNCEMENT BANNER */}
      {/* ======================================================== */}
      {/* Height ko h-20 se badhakar h-56 md:h-64 kiya hai taaki image mast broad dikhe */}
      <div className="w-full h-56 md:h-64 relative overflow-hidden border-b border-slate-300/40 select-none animate-fade-in flex items-center justify-center shadow-md">
        <img 
          src={topBannerImage} 
          alt="Top Banner Backdrop" 
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.4] grayscale filter contrast-125 z-0"
        />
        {/* Soft dark overlay overlay to make text pop out beautifully */}
        <div className="absolute inset-0 bg-black/30 z-1" />
        
        <p className="font-sans text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white leading-none relative z-10 drop-shadow-lg text-center px-6 max-w-2xl">
          ✨ {topBannerContext}
        </p>
      </div>

      {/* 🎯 HERO HEADER */}
      {/* Clear vertical margin to avoid layout collision with logo pill */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex flex-col items-center text-center mt-20 md:mt-24 mb-20 select-none animate-fade-in">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-slate-900 tracking-tighter mb-5">
          {heroTitle}
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          {heroSubtitle}
        </p>
      </div>

      {/* 🌐 CORE SPLIT WORKSPACE */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start w-full">
          
          {/* LEFT AXIS: MESSAGE FORM & DETAILS */}
          <div className="lg:col-span-6 w-full flex flex-col text-left">
            
            <div className="bg-white rounded-[28px] border border-slate-300/40 p-8 sm:p-10 shadow-sm mb-12">
              <h3 className="font-serif text-2xl text-slate-900 mb-6 select-none">Send a Message</h3>
              
              <form onSubmit={handleContactSubmit} className="flex flex-col space-y-5">
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Full Name</label>
                  <input type="text" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Enter Yor Name" className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-400 transition-colors" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Email Address</label>
                  <input type="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} placeholder="Enter Your Email" className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-400 transition-colors" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Your Project Concept / Message</label>
                  <textarea required rows="4" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} placeholder="Description..." className="w-full px-6 py-4 rounded-[20px] border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-400 transition-colors resize-none" />
                </div>
                
                <button type="submit" className="w-full py-4 rounded-full bg-[#0019FF] text-white font-sans text-sm font-semibold tracking-wide hover:bg-blue-700 active:scale-[0.99] transition-all shadow-sm">
                  Send Connection Request ➔
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 select-none">
              <div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-2 block">Our Main Studio Hub</span>
                <p className="font-serif text-lg text-slate-800 leading-snug">{officeDetails.address}</p>
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1 block">Inquiries</span>
                  <p className="font-sans text-sm font-semibold text-slate-800">{officeDetails.phone}</p>
                  <p className="font-sans text-sm text-slate-500">{officeDetails.email}</p>
                </div>
                <div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-1 block">Studio Hours</span>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">{officeDetails.timings}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT AXIS: DYNAMIC INTERACTIVE GOOGLE MAP EMBED */}
          <div className="lg:col-span-6 w-full h-[450px] lg:h-[680px] sticky top-28 rounded-[32px] overflow-hidden bg-slate-200 border border-slate-300/40 shadow-sm animate-fade-in select-none">
            <iframe 
              title="Kryptons Office Map Space Locator" 
              src={mapEmbedUrl} 
              className="w-full h-full border-0 grayscale filter contrast-[1.05] brightness-[0.95]" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

      {/* 📋 MAPPED NEWSLETTER PANEL FOOTER BLOCK */}
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
              <button type="submit" className="px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-sm font-semibold tracking-wide hover:bg-black active:scale-[0.99] transition-all shadow-sm">Submit</button>
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

      {/* Copyright Line Strip */}
      <div className="w-full bg-[#EAF0F9] border-t border-slate-300/40 py-5 px-6 md:px-12 relative z-10 flex flex-col sm:flex-row justify-between items-center text-slate-400/80 font-sans text-[11px] tracking-widest uppercase font-medium">
        <div>© {new Date().getFullYear()} OMI PET || All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>

    </main>
  );
}