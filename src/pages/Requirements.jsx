import React, { useState } from 'react';
import reqData from '../data/requirementsData.json';
import siteData from '../data/siteData.json';

export default function Requirements() {
  // Destructuring updated database variables cleanly
  const { heroTitle, heroSubtitle, latestUpdates, technicalSpecs } = reqData.reqContent;
  const { title: footerTitle, subtitle: footerSubtitle, linksGrid } = siteData.footerSectionData;

  const [activeSpecTab, setActiveSpecTab] = useState('spec-1');
  const [newsletterForm, setNewsletterForm] = useState({ firstName: '', lastName: '', email: '' });

  // 📝 NEW LOCAL STATE: REQUIREMENT SUBMISSION INTAKE FORM
  const [intakeForm, setIntakeForm] = useState({
    clientName: '',
    projectTitle: '',
    priority: 'Medium',
    specNotes: ''
  });

  const handleIntakeSubmit = (e) => {
    e.preventDefault();
    alert(`Requirement Matrix Saved Successfully!\n\nPROJECT: ${intakeForm.projectTitle}\nCLIENT: ${intakeForm.clientName}\nPRIORITY: ${intakeForm.priority}\nNOTES: ${intakeForm.specNotes}`);
    setIntakeForm({ clientName: '', projectTitle: '', priority: 'Medium', specNotes: '' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Blueprint Alerts Activated! You will receive core log updates instantly.`);
    setNewsletterForm({ firstName: '', lastName: '', email: '' });
  };

  return (
    <main className="w-full min-h-screen bg-[#EAF0F9] pb-0 pt-28 selection:bg-black/5 selection:text-black overflow-x-hidden">
      
      {/* 🎯 HERO HEADER */}
      <div className="max-w-[1200px] md:mt-[30px] lg:mt-[30px] src/pages/Home.jsx mx-auto px-6 sm:px-8 flex flex-col items-center text-center mb-24 select-none animate-fade-in">
        <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-slate-400 uppercase mb-4 block">
          SYSTEM SPECIFICATIONS ARCHIVE
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-slate-900 tracking-tighter mb-4">
          {heroTitle}
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          {heroSubtitle}
        </p>
      </div>

      {/* 📊 SECTION 1: LATEST UPDATES SYSTEM GRID TRACK */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-32">
        <div className="w-full flex flex-col items-start mb-12 select-none">
          <h3 className="font-serif text-3xl text-slate-900 tracking-tight relative mb-2">
            Latest Project Iterations
            <span className="absolute bottom-[-8px] left-0 w-12 h-[3px] bg-[#0019FF] rounded-full" />
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-2">Realtime logging tracking parameters completed inside core framework nodes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {latestUpdates && latestUpdates.map((update) => (
            <div 
              key={update.id}
              className={`${update.bg} rounded-[24px] border border-slate-300/40 p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-left">
                <span className={`px-3 py-1 text-[9px] font-sans font-bold uppercase tracking-widest rounded-full inline-block mb-6 shadow-sm
                  ${update.tag === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-amber-50 text-amber-600 border border-amber-200'}`}>
                  {update.tag}
                </span>
                <h4 className="font-serif text-lg font-medium text-slate-900 mb-3 tracking-tight">
                  {update.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                  {update.desc}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end">
                <span className="text-[10px] font-sans font-bold tracking-wider text-slate-400 uppercase select-none">NODE COMPILER ✓</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛠️ SECTION 2: INTERACTIVE TECHNICAL REQUIREMENTS DECK */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-32">
        <div className="w-full bg-white rounded-[32px] border border-slate-300/40 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-start gap-12 shadow-sm">
          
          <div className="w-full md:w-1/3 flex flex-col space-y-3 text-left select-none">
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#0019FF] uppercase block mb-1">SPECIFICATION MATRIX</span>
            <h4 className="font-serif text-2xl text-slate-900 mb-6 tracking-tight">Technical Pillars</h4>
            
            {technicalSpecs && technicalSpecs.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setActiveSpecTab(spec.id)}
                className={`w-full px-6 py-4 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wide text-left border transition-all duration-300
                  ${activeSpecTab === spec.id 
                    ? 'bg-[#0019FF] text-white border-blue-700 shadow-md scale-[1.02]' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
              >
                {spec.category}
              </button>
            ))}
          </div>

          <div className="w-full md:w-2/3 text-left pt-2 border-t md:border-t-0 md:border-l border-slate-100 md:pl-12 flex flex-col justify-center h-full min-h-[220px]">
            <span className="text-[10px] font-sans font-bold tracking-widest text-slate-400 uppercase block mb-4 select-none">Active Requirements List</span>
            <ul className="space-y-4">
              {technicalSpecs.find(s => s.id === activeSpecTab)?.items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-700 font-sans text-sm sm:text-base leading-relaxed animate-fade-in">
                  <span className="text-[#0019FF] text-lg select-none">✦</span>
                  <span className="text-justify">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 📝 NEW SECTION 3: PREMIUM REQUIREMENT INTAKE FORM */}
      {/* ======================================================== */}
      {/* Minimalist white card layout block perfectly synced with Home/Contact component patterns */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-32">
        <div className="w-full bg-white rounded-[32px] border border-slate-300/40 p-8 sm:p-12 md:p-16 shadow-sm text-left animate-fade-in">
          
          <div className="mb-10 border-b border-slate-100 pb-5 select-none">
            <h3 className="font-serif text-3xl text-slate-900 tracking-tight">Submit New Requirement</h3>
            <p className="font-sans text-xs text-slate-400 mt-1.5">Define your custom scope parameters, execution tracking tags or digital blueprints</p>
          </div>

          <form onSubmit={handleIntakeSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Field 1: Client / Agency Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Client / Agency Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your Name or company" 
                  value={intakeForm.clientName} 
                  onChange={(e) => setIntakeForm({ ...intakeForm, clientName: e.target.value })} 
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-300/80 font-sans text-sm bg-slate-50/40 focus:outline-none focus:border-[#0019FF] transition-colors" 
                />
              </div>

              {/* Field 2: Project / Module Title */}
              <div className="flex flex-col">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Project / Module Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter Your Module" 
                  value={intakeForm.projectTitle} 
                  onChange={(e) => setIntakeForm({ ...intakeForm, projectTitle: e.target.value })} 
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-300/80 font-sans text-sm bg-slate-50/40 focus:outline-none focus:border-[#0019FF] transition-colors" 
                />
              </div>

              {/* Field 3: Priority Matrix Selector */}
              <div className="flex flex-col">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Execution Priority</label>
                <select 
                  value={intakeForm.priority} 
                  onChange={(e) => setIntakeForm({ ...intakeForm, priority: e.target.value })} 
                  className="w-full px-5 py-3.5 rounded-xl border border-slate-300/80 font-sans text-sm bg-slate-50/40 focus:outline-none focus:border-[#0019FF] transition-colors cursor-pointer"
                >
                  <option value="Low">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="High">Large</option>
                </select>
              </div>

            </div>

            {/* Field 4: Technical Description Spec Area */}
            <div className="flex flex-col">
              <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-2 select-none">Technical Specifications & Notes</label>
              <textarea 
                rows="4" 
                required 
                placeholder="Describe requirements in full details..." 
                value={intakeForm.specNotes} 
                onChange={(e) => setIntakeForm({ ...intakeForm, specNotes: e.target.value })} 
                className="w-full px-5 py-4 rounded-2xl border border-slate-300/80 font-sans text-sm bg-slate-50/40 focus:outline-none focus:border-[#0019FF] transition-colors resize-none" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-[#0019FF] hover:bg-blue-700 text-white font-sans text-sm font-semibold tracking-wider py-4 rounded-xl shadow-sm transition-all duration-300 active:scale-[0.99]"
            >
              COMPILE MODULE SPECIFICATION 📋
            </button>
          </form>

        </div>
      </section>

      {/* 📥 SECTION 4: MINIMAL DATA BLUEPRINT DOWNLOAD STRIP */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 mb-40">
        <div className="w-full bg-[#E1EBF5] border border-slate-300/30 rounded-[28px] py-10 px-8 sm:px-12 flex flex-col md:flex-row items-center justify-between select-none shadow-sm animate-fade-in">
          <div className="text-left mb-6 md:mb-0">
            <h4 className="font-serif text-xl font-medium text-slate-900 tracking-tight">Need Offline Specs?</h4>
            <p className="font-sans text-xs text-slate-500 mt-1">Download complete Omi Pet spreadsheet document</p>
          </div>
          <button 
            onClick={() => alert('Downloading source parameter nodes blueprint...')}
            className="px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-black active:scale-[0.98] transition-all shadow-md whitespace-nowrap"
          >
            DOWNLOAD SHEET 📋
          </button>
        </div>
      </section>

      {/* 📋 SECTION 5: NEWSLETTER FOOTER PANEL */}
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
              <button type="submit" className="px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-sm font-semibold tracking-wide hover:bg-black transition-all shadow-sm">Submit</button>
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
        <div>© {new Date().getFullYear()} OMI PET || All rights reserved.</div>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>

    </main>
  );
}