import React, { useState } from 'react';
import blogData from '../data/blogData.json';
import siteData from '../data/siteData.json';

export default function Blog() {
  const { heroTitle, heroSubtitle, categories, featuredPost, posts } = blogData.blogContent;
  const { title: footerTitle, subtitle: footerSubtitle, linksGrid } = siteData.footerSectionData;

  const [activeCategory, setActiveCategory] = useState('All');
  const [newsletterForm, setNewsletterForm] = useState({ firstName: '', lastName: '', email: '' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Blog Subscription Active! Welcome aboard.`);
    setNewsletterForm({ firstName: '', lastName: '', email: '' });
  };

  // Logic to filter posts based on selected category pill
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.tag === activeCategory);

  return (
    <main className="w-full min-h-screen md:mt-[30px] lg:mt-[30px] bg-[#EAF0F9] pb-0 pt-28 selection:bg-black/5 selection:text-black overflow-x-hidden">
      
      {/* 🎯 HERO HEADER */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex flex-col items-center text-center mb-16 animate-fade-in">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-slate-900 tracking-tighter mb-4">
          {heroTitle}
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
          {heroSubtitle}
        </p>
      </div>

      {/* 🏷️ CATEGORY PILLS */}
      <div className="w-full flex justify-center space-x-3 mb-20 px-6 overflow-x-auto no-scrollbar">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wide border transition-all duration-300 whitespace-nowrap
              ${activeCategory === cat 
                ? 'bg-white text-slate-900 border-slate-900 shadow-sm scale-105' 
                : 'bg-transparent text-slate-400 border-slate-300 hover:text-slate-900 hover:border-slate-400'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🌟 FEATURED POST (Bleed Layout) */}
      {activeCategory === 'All' && (
        <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-24 animate-fade-in">
          <div className="w-full bg-white rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-sm border border-slate-300/30 group cursor-pointer hover:shadow-xl transition-all duration-500">
            {/* Featured Image */}
            <div className="lg:w-1/2 h-[350px] lg:h-auto overflow-hidden">
              <img src={featuredPost.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Featured" />
            </div>
            {/* Featured Content */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center items-start">
              <span className="px-4 py-1.5 bg-[#0019FF] text-white text-[10px] uppercase font-bold tracking-widest rounded-full mb-6">
                {featuredPost.tag}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="font-sans text-slate-500 text-sm mb-8 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">{featuredPost.author}</span>
                  <span className="text-[10px] text-slate-400">{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 📰 BLOG GRID SECTION */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="flex flex-col group cursor-pointer animate-slide-up"
            >
              {/* Post Thumbnail */}
              <div className="w-full aspect-[4/5] rounded-[24px] overflow-hidden mb-6 bg-slate-200 shadow-sm border border-slate-300/20">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
              </div>
              {/* Post Info */}
              <span className="font-sans text-[10px] font-bold text-[#0019FF] uppercase tracking-widest mb-2">
                {post.tag}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-slate-900 leading-snug mb-4 group-hover:text-[#0019FF] transition-colors">
                {post.title}
              </h3>
              <div className="mt-auto flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-400">
                <span>By {post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📋 FOOTER NEWSLETTER PANEL */}
      <footer className="w-full bg-[#EAF0F9] pt-24 pb-16 border-t border-slate-300/60 relative z-10">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row justify-between items-start w-full gap-16 lg:gap-8">
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left max-w-[520px]">
            <h4 className="font-serif text-3xl sm:text-4xl text-slate-900 mb-2">{footerTitle}</h4>
            <p className="font-serif text-3xl sm:text-4xl text-slate-900 mb-10">{footerSubtitle}</p>
            <form onSubmit={handleNewsletterSubmit} className="w-full flex flex-col space-y-4">
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <input type="text" required placeholder="First name" value={newsletterForm.firstName} onChange={(e) => setNewsletterForm({ ...newsletterForm, firstName: e.target.value })} className="w-full sm:w-1/2 px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-500/80 transition-colors" />
                <input type="text" required placeholder="Last name" value={newsletterForm.lastName} onChange={(e) => setNewsletterForm({ ...newsletterForm, lastName: e.target.value })} className="w-full sm:w-1/2 px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-500/80 transition-colors" />
              </div>
              <input type="email" required placeholder="Your email address" value={newsletterForm.email} onChange={(e) => setNewsletterForm({ ...newsletterForm, email: e.target.value })} className="w-full px-6 py-4 rounded-full border border-slate-400/60 bg-transparent text-slate-800 font-sans text-sm focus:outline-none focus:border-black placeholder-slate-500/80 transition-colors" />
              <button type="submit" className="w-full sm:w-40 py-4 rounded-full bg-slate-900 text-white font-sans text-sm font-semibold hover:bg-black transition-all shadow-sm">Submit</button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-12 text-left pt-2">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-6 block">Explore by</span>
              <ul className="space-y-4">
                {linksGrid && linksGrid.exploreBy.map((link, idx) => (
                  <li key={idx}><a href={`/${link.toLowerCase()}`} className="font-serif text-xl sm:text-2xl text-slate-900 hover:text-[#0019FF] transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-slate-400 mb-6 block">WePresent</span>
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