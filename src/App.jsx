import React, { useState, useEffect } from 'react';

const themeData = [
  {
    id: 'avatar',
    title: 'Avatar',
    subtitle: 'War for the Elemental Clans',
    accent: 'emerald',
    textClass: 'text-emerald-400',
  },
  {
    id: 'onepiece',
    title: 'One Piece',
    subtitle: 'Grand Line Gates of Victory',
    accent: 'red',
    textClass: 'text-red-400',
  },
  {
    id: 'bleach',
    title: 'Bleach',
    subtitle: 'War of the Three Realms',
    accent: 'purple',
    textClass: 'text-purple-400',
  },
  {
    id: 'percy',
    title: 'Percy Jackson',
    subtitle: 'Clash of the Big Three',
    accent: 'yellow',
    textClass: 'text-yellow-400',
  }
];

export default function App() {
  const [deviceType, setDeviceType] = useState('DESKTOP');

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth < 768) {
        setDeviceType('MOBILE');
      } else {
        setDeviceType('DESKTOP');
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const scrollToSelection = () => {
    document.getElementById('selection-grid').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 bg-[url('/images/bg-desk.png')] bg-cover bg-center bg-fixed text-slate-50 font-sans selection:bg-blue-500/30">
      
      {/* Dynamic Device HUD Indicator */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none p-2 flex justify-center opacity-50">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-400 bg-slate-900/80 px-4 py-1 rounded-b-lg border border-slate-700/50">
          {deviceType} TERMINAL ACTIVE
        </span>
      </div>

      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0"></div>

      {/* SECTION 1: CINEMATIC HERO INTRODUCTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-10 pb-20">
        
        {/* =========================================
            THE LOGOS (Empty Middle Space)
            ========================================= */}
        <div className="flex items-center justify-center gap-10 md:gap-16 mb-8 md:mb-12 w-full max-w-md md:max-w-lg mx-auto">
          
          {/* Left: Capitol University Logo */}
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)] bg-black z-10 shrink-0">
            <img src="/images/cu-logo.jpg" alt="CU Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
          </div>

          {/* Right: WSA Logo */}
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-black z-10 shrink-0">
            <img src="/images/wsa-logo.jpg" alt="WSA Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
          </div>
          
        </div>

        <div className="max-w-3xl mx-auto bg-slate-950/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
          {/* Top Secret Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] md:text-[150px] font-black text-white/3 uppercase tracking-tighter pointer-events-none rotate-12 whitespace-nowrap">
            Sneak Peek
          </div>

          <p className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 relative z-10">
            Working Scholars Association • Capitol University
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-6 md:mb-8 relative z-10">
            Sports Fest 2026
          </h1>
          
          {/* Human-like, Engaging Description (Fixed Lore) */}
          <div className="space-y-5 text-slate-200 text-sm md:text-base font-medium leading-relaxed mb-10 relative z-10 text-justify md:text-center">
            <p>
              What's up, Working Scholars? It's that time of the year again. We know you've been grinding hard in your classes and balancing your shifts, but it is almost time to trade the textbooks for sneakers. This year, Sports Fest isn't going to be just another intramural event—we are entirely reinventing the arena.
            </p>
            <p>
              We are bringing the greatest fictional universes straight to the CU campus. We have narrowed it down to four legendary worlds, but we are leaving the final decision up to you. Will we be mastering the wilds of Pandora, sailing the treacherous Grand Line, wielding our Zanpakutos, or claiming our godly heritage at Camp Half-Blood?
            </p>
            <p className="text-yellow-400 font-bold text-center bg-yellow-900/20 p-4 rounded-xl border border-yellow-500/20 shadow-inner">
              Take a look at the proposed themes below. Start talking it over with your friends and forming your dream teams. Official faction breakdowns and the voting portal will be dropping soon!
            </p>
          </div>

          <button onClick={scrollToSelection} className="group flex flex-col items-center justify-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors cursor-pointer relative z-10">
            <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold">Preview the Realms</span>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-600 flex items-center justify-center group-hover:border-white transition-colors animate-bounce mt-2">↓</div>
          </button>
        </div>
      </section>

      {/* SECTION 2: THE 4-PILLAR SNEAK PEEK GRID */}
      <section id="selection-grid" className="relative z-10 min-h-screen py-16 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl">
          
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-2">The Four Realms</h2>
            <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest">Prepare Your Allegiance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {themeData.map((theme) => (
              <div key={theme.id} className="relative aspect-4/3 sm:aspect-3/4 w-full group max-w-md mx-auto">
                <div className="absolute inset-0 transition-all duration-500 overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900/50 backdrop-blur-md border border-slate-700 flex flex-col justify-center items-center text-center shadow-xl group-hover:bg-slate-800/60 group-hover:border-slate-500/50">
                  <div className="p-4 md:p-6">
                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-1 md:mb-2">
                      {theme.title}
                    </h2>
                    <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${theme.textClass}`}>
                      {theme.subtitle}
                    </p>
                    
                    {/* "Locked" Visual Indicator */}
                    <div className="mt-4 md:mt-8 flex flex-col items-center gap-2 opacity-50">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-slate-500 flex items-center justify-center">
                        <span className="text-xs md:text-sm">🔒</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 font-bold">Factions Locked</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
    </div>
  );
}