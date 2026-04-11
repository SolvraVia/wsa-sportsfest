import React, { useState, useEffect } from 'react';

const themeData = [
  {
    id: 'avatar',
    title: 'Pandora',
    subtitle: 'The Avatar Theme',
    accent: 'emerald',
    textClass: 'text-emerald-400',
    borderClass: 'hover:border-emerald-500',
    image: '/images/10.jpg', 
    description: 'Awaken to a world pulsing with life. The Avatar Theme transforms the arena into a breath-taking bioluminescent sanctuary. Here, success isn\'t just about speed or strength—it\'s about forging an unbreakable bond with your teammates and the land itself, channelling the collective spirit of Pandora to dominate with fluid grace and relentless energy.',
    factions: [
      { 
        name: 'Omaticaya Clan', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C7 10 2 18 2 22C7 20 12 18 17 20C22 22 17 10 12 2Z"/><path d="M12 2C11 5 10 8 9 9C10 10 11 13 12 16C13 13 14 10 15 9C14 8 13 5 12 2Z" opacity="0.3"/></svg>, 
        style: 'Forest Masters', 
        desc: 'Descendants of the great forest, channelling an intricate dance of evasion and vertical dominance. They leverage the forest\'s flow, deliver unpredictable strikes from above, and dominate with unparalleled leaping agility.' 
      },
      { 
        name: 'Metkayina Clan', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 drop-shadow-md"><path d="M2 14C5 12 8 16 12 14C16 12 19 16 22 14M2 18C5 16 8 20 12 18C16 16 19 20 22 18" strokeLinecap="round"/></svg>, 
        style: 'Reef Riders', 
        desc: 'Forged in the limitless ocean, as relentless and adaptable as the tide. Their coordinated defense forms an impenetrable reef, channelling the sea\'s quiet strength and endless endurance to overwhelm any opponent.' 
      },
      { 
        name: 'Tayrangi Clan', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C15 8 22 10 12 18C2 10 9 8 12 2Z"/><path d="M12 2C11 5 8 8 5 9C8 10 11 13 12 16C13 13 16 10 19 9C16 8 13 5 12 2Z" opacity="0.3"/></svg>, 
        style: 'Eastern Sea Riders', 
        desc: 'Guardians of the eastern seas, traversing the arena with breathless urgency, channelling the wind\'s power and the ocean\'s expanse. Expect Fast-breaks as devastatingly powerful as a crashing wave.' 
      }
    ]
  },
  {
    id: 'onepiece',
    title: 'Grand Line',
    subtitle: 'The Pirate Theme',
    accent: 'red',
    textClass: 'text-red-400',
    borderClass: 'hover:border-red-500',
    image: '/images/9.jpg', 
    description: 'Hoist the sails and prepare to conquer the Grand Line! This Pirate Theme isn\'t just a competition; it\'s a daring voyage fueled by unyielding dreams and boundless freedom. In this arena, willpower is currency and passion is power. Rally your crew, embrace risk, and navigate every treacherous challenge to claim the ultimate treasure: victory.',
    factions: [
      { 
        name: 'Straw Hat Fleet', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C8.7 2 6 4.7 6 8C6 11.3 8.7 14 12 14C15.3 14 18 11.3 18 8C18 4.7 15.3 2 12 2ZM10 10C10 9.4 9.4 9 9 9C8.6 9 8 9.4 8 10C8 10.6 8.6 11 9 11C9.4 11 10 10.6 10 10ZM16 10C16 9.4 15.4 9 15 9C14.6 9 14 9.4 14 10C14 10.6 14.6 11 15 11C15.4 11 16 10.6 16 10Z"/><path d="M12 2H10V5H14V2H12Z"/></svg>, 
        style: 'Unorthodox Offense', 
        desc: 'Underdogs driven by an insatiable hunger for freedom and an unbreakable bond, thriving in the most desperate moments. Their playstyle is chaotic, passionate, and powered by pure, resolute willpower.' 
      },
      { 
        name: 'Whitebeard Commanders', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C11 2 10 3 10 4V16C10 17 11 18 12 18C13 18 14 17 14 16V4C14 3 13 2 12 2Z"/><path d="M6 10C5 10 4 11 4 12V18C4 19 5 20 6 20H18C19 20 20 19 20 18V12C20 11 19 10 18 10H6Z"/><path d="M12 22H10V20H14V22H12Z" opacity="0.3"/></svg>, 
        style: 'Absolute Power', 
        desc: 'Forged in the legendary battles of the past, they are resolute bastions of loyalty and crushing power. Expect calculated, devastating strikes and an unbreakable defense that holds every line.' 
      },
      { 
        name: 'Red Hair Crew', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8 drop-shadow-md"><path d="M4 6L8 18M12 6L16 18M20 6L16 18" strokeLinecap="round"/></svg>, 
        style: 'Elite Fundamentals', 
        desc: 'Commanders of the arena with an intimidating presence, built on elite fundamentals and Relentless Stamina. They dictate the pace of every play with unwavering precision and zero compromise.' 
      }
    ]
  },
  {
    id: 'bleach',
    title: 'Soul Society',
    subtitle: 'The Shinigami Theme',
    accent: 'purple',
    textClass: 'text-purple-400',
    borderClass: 'hover:border-purple-500',
    image: '/images/12.jpg', 
    description: 'Unleash your inner strength and prepare for battle! The Shinigami Theme brings tactical precision, focused spiritual pressure, and disciplined execution to the court. Every move is calculated, every strike decisive. Master your Zanpakuto\'s spirit, forge an unbreakable strategy with your squad, and purge the opposition with elegant, razor-sharp efficiency.',
    factions: [
      { 
        name: 'Squad 11', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C9 2 6 4 6 7C6 10 9 12 12 12C15 12 18 10 18 7C18 4 15 2 12 2ZM10 8C10 7.4 9.4 7 9 7C8.6 7 8 7.4 8 8C8 8.6 8.6 9 9 9C9.4 9 10 8.6 10 8ZM16 8C16 7.4 15.4 7 15 7C14.6 7 14 7.4 14 8C14 8.6 14.6 9 15 9C15.4 9 16 8.6 16 8Z"/><path d="M12 14C10 14 8 15 8 16H16C16 15 14 14 12 14ZM12 18C11 18 10 19 10 20H14C14 19 13 18 12 18Z"/><path d="M12 18C11 18 10 19 10 20H14C14 19 13 18 12 18Z" opacity="0.3"/></svg>, 
        style: 'Brute Force', 
        desc: 'Embodying raw, unadulterated battle aggression, they reject complex tactics in favor of overwhelming physical offense. Seek only to crush opponents through sheer, unrelenting force and battle-lust.' 
      },
      { 
        name: 'Squad 2', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2L8 10H16L12 2Z"/><path d="M11 10V20H13V10H11Z"/><path d="M10 20H14V22H10V20Z" opacity="0.3"/></svg>, 
        style: 'Stealth & Speed', 
        desc: 'Undisputed masters of speed, channelling lightning-fast transitions and unpredictable steals before opponents even realize the game has begun. Expect fast-breaks executed with breath-taking swiftness.' 
      },
      { 
        name: 'Squad 6', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C10 6 6 10 2 12C6 14 10 18 12 22C14 18 18 14 22 12C18 10 14 6 12 2Z"/><path d="M12 2C11 5 8 8 5 9C8 10 11 13 12 16C13 13 16 10 19 9C16 8 13 5 12 2Z" opacity="0.5"/></svg>, 
        style: 'Noble Discipline', 
        desc: 'Upholders of noble tradition and strict discipline, executing complex set plays with unwavering tactical precision. Coordinated efficiency channelling generations of strategic brilliance to dominate without comprise.' 
      }
    ]
  },
  {
    id: 'percy',
    title: 'Olympus',
    subtitle: 'The Demigod Theme',
    accent: 'yellow',
    textClass: 'text-yellow-400',
    borderClass: 'hover:border-yellow-500',
    image: '/images/11.jpg', 
    description: 'Claim your divine heritage and ascend to glory! The Demigod Theme radiates with mythic athleticism and epic rivalries. In this arena, you aren\'t just competing; you are channelling the powers of ancient gods. Command the track and court with elemental forces, leverage divine agility, and engrave your name in the stars through unforgettable, superhuman performances.',
    factions: [
      { 
        name: 'Cabin of Zeus', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><polygon points="12 2 4 14 11 14 10 22 18 10 11 10 12 2"/><polygon points="12 4 6 12 11 12 10 20 16 10 11 10 12 4" opacity="0.5"/></svg>, 
        style: 'Explosive Speed', 
        desc: 'Dominators of the arena, channelling the raw power of thunder and lightning with explosive sprints and high-flying acrobatics. Fast-breaks decisive and crackling with divine energy.' 
      },
      { 
        name: 'Cabin of Poseidon', 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 drop-shadow-md"><path d="M4 8C4 10 8 12 12 12C16 12 20 10 20 8M12 2V22M8 4V10M16 4V10M10 22H14" strokeLinecap="round" strokeLinejoin="round"/></svg>, 
        style: 'Fluid Adaptability', 
        desc: 'Fluid and adaptable, seamlessly shifting between offense and defense like the boundless, unpredictable tide. Coordinated strategy as constant and overwhelming as a force of nature.' 
      },
      { 
        name: 'Cabin of Ares', 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md"><path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2ZM10 12C10 11.4 9.4 11 9 11C8.6 11 8 11.4 8 12C8 12.6 8.6 13 9 13C9.4 13 10 12.6 10 12ZM16 12C16 11.4 15.4 11 15 11C14.6 11 14 11.4 14 12C14 12.6 14.6 13 15 13C15.4 13 16 12.6 16 12Z"/><path d="M12 18H10V22H14V18H12Z"/><path d="M12 18H10V22H14V18H12Z" opacity="0.3"/></svg>, 
        style: 'Physical Intimidation', 
        desc: 'Forged in battle, the arena\'s imposing enforcers. Relying on overwhelming physical dominance, constant crushing force, and unrelenting will to dominate the court without compromise.' 
      }
    ]
  }
];

export default function App() {
  const [deviceType, setDeviceType] = useState('DESKTOP');
  const [activeRealm, setActiveRealm] = useState(null);
  
  // PORTAL STATE
  const [portalTheme, setPortalTheme] = useState(null);
  const [portalPhase, setPortalPhase] = useState('idle');

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

  const triggerPortal = (targetRealm, themeId) => {
    setPortalTheme(themeId);
    setPortalPhase('entering');
    
    setTimeout(() => {
      setActiveRealm(targetRealm);
      setPortalPhase('exiting');
      
      setTimeout(() => {
        setPortalTheme(null);
        setPortalPhase('idle');
      }, 700); 
    }, 700); 
  };

  return (
    <div className="bg-slate-950 bg-[url('/images/bg-desk.png')] bg-cover bg-center bg-fixed text-slate-50 font-sans selection:bg-blue-500/30 min-h-screen">
      
      {/* THE CINEMATIC ANIMATED PORTAL OVERLAY */}
      <style>{`
        @keyframes rippleExpand {
          0%   { transform: translate(-50%, -50%) scale(0.1); opacity: 0; }
          10%  { transform: translate(-50%, -50%) scale(0.1); opacity: 1; }
          60%  { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.0); opacity: 0; }
        }
        .pandora-ripple {
          position: absolute; top: 50%; left: 50%; width: 200vw; height: 200vw;
          animation: rippleExpand 1s ease-in-out forwards;
          transform-origin: center center;
          mix-blend-mode: screen;
        }

        @keyframes waveWipe {
          0%   { transform: translateX(-100%); opacity: 1; }
          40%  { transform: translateX(0%); opacity: 1; }
          60%  { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 1; }
        }
        .onepiece-wipe {
          position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
          animation: waveWipe 1s ease-in-out forwards;
          mix-blend-mode: screen;
        }

        @keyframes gateSlamLeft {
          0% { transform: translateX(100%); opacity: 1; }
          40% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(0%); opacity: 1; }
        }
        @keyframes gateSlamRight {
          0% { transform: translateX(-100%); opacity: 1; }
          40% { transform: translateX(0%); opacity: 1; }
          100% { transform: translateX(0%); opacity: 1; }
        }
        .bleach-gate {
          position: absolute; height: 100%; width: 50%; object-fit: cover;
          mix-blend-mode: screen;
        }
        .bleach-left  { left: 0;  animation: gateSlamLeft 1s ease-in-out forwards; }
        .bleach-right { right: 0; animation: gateSlamRight 1s ease-in-out forwards; }

        @keyframes lightningFlash {
          0%   { opacity: 0; }
          10%  { opacity: 1; } 
          20%  { opacity: 1; }
          30%  { opacity: 0.2; } 
          40%  { opacity: 1; }
          100% { opacity: 0; } 
        }
        .percy-flash-bg {
          position: absolute; inset: 0; background: #fffbeb; animation: lightningFlash 1s ease-out forwards;
        }
        .percy-flash-image {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(2);
          width: 100%; object-fit: cover; animation: lightningFlash 1s ease-out forwards;
          mix-blend-mode: screen;
        }
      `}</style>

      <div className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${portalPhase !== 'idle' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        {portalTheme === 'avatar' && <img src="/images/pandora-portal.jpg" alt="Pandora Transition" className="pandora-ripple" />}
        {portalTheme === 'onepiece' && <img src="/images/onepiece-portal.jpg" alt="One Piece Transition" className="onepiece-wipe" />}
        {portalTheme === 'bleach' && (
          <div className="absolute inset-0 flex h-full w-full">
            <img src="/images/bleach-portal.jpg" alt="Bleach Gate Left" className="bleach-gate bleach-left" />
            <img src="/images/bleach-portal.jpg" alt="Bleach Gate Right" className="bleach-gate bleach-right" />
          </div>
        )}
        {portalTheme === 'percy' && (
          <>
            <div className="percy-flash-bg"></div>
            <img src="/images/percy-portal.jpg" alt="Lightning Transition" className="percy-flash-image" />
          </>
        )}
      </div>

      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none p-2 flex justify-center opacity-50">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-slate-400 bg-slate-900/80 px-4 py-1 rounded-b-lg border border-slate-700/50">
          {deviceType} TERMINAL ACTIVE
        </span>
      </div>

      <div className="fixed inset-0 bg-black/60 pointer-events-none z-0"></div>

      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-10 pb-20">
        <div className="flex items-center justify-center gap-10 md:gap-16 mb-8 md:mb-12 w-full max-w-md md:max-w-lg mx-auto">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.2)] bg-black z-10 shrink-0">
            <img src="/images/cu-logo.jpg" alt="CU Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
          </div>
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-black z-10 shrink-0">
            <img src="/images/wsa-logo.jpg" alt="WSA Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-950/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] md:text-[150px] font-black text-white/3 uppercase tracking-tighter pointer-events-none rotate-12 whitespace-nowrap">
            Sneak Peek
          </div>

          <p className="text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 relative z-10">
            Working Scholars Association • Capitol University
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] mb-6 md:mb-8 relative z-10">
            Sports Fest 2026
          </h1>
          
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

      <section id="selection-grid" className="relative z-10 min-h-screen py-16 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          
          {!activeRealm ? (
            <div className="animate-in fade-in duration-700">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-2">The Four Realms</h2>
                <p className="text-slate-400 text-xs md:text-sm uppercase tracking-widest">Click to view Faction Intel</p>
              </div>

              <div className="flex flex-col md:flex-row w-full h-auto md:h-150 gap-4">
                {themeData.map((theme) => (
                  <div 
                    key={theme.id} 
                    onClick={() => triggerPortal(theme, theme.id)} 
                    /* THE FIX: Replaced min-h-[320px] with min-h-80 to satisfy Tailwind v4 */
                    className={`group relative flex-1 min-h-80 md:min-h-0 md:hover:flex-3 transition-[flex] duration-700 ease-in-out overflow-hidden rounded-3xl border border-slate-700 ${theme.borderClass} cursor-pointer bg-slate-950`}
                  >
                    <img 
                      src={theme.image} 
                      alt={theme.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-105 md:scale-100 md:group-hover:scale-105 opacity-100 md:opacity-60 md:group-hover:opacity-100 grayscale-0 md:grayscale md:group-hover:grayscale-0"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                      <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter w-max drop-shadow-md">
                        {theme.title}
                      </h2>
                      <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-2 w-70 md:w-87.5">
                            <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${theme.textClass} mb-3`}>
                              {theme.subtitle}
                            </p>
                            <p className="text-xs md:text-sm text-slate-200 leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-150 drop-shadow-lg font-medium">
                              {theme.description}
                            </p>
                            <div className={`mt-4 inline-block px-4 py-1.5 rounded-full border border-current text-[10px] uppercase tracking-widest font-bold ${theme.textClass} animate-pulse bg-slate-950/50 backdrop-blur-sm`}>
                              Tap for Intel →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center text-center mb-12">
                <button 
                  onClick={() => triggerPortal(null, activeRealm.id)} 
                  className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/50 cursor-pointer"
                >
                  <span>←</span> Return to Realms
                </button>
                
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-2 drop-shadow-lg">
                  {activeRealm.title}
                </h2>
                <p className={`text-sm md:text-base font-bold uppercase tracking-widest ${activeRealm.textClass} mb-6`}>
                  Classified Faction Intel
                </p>
                <p className="max-w-2xl text-slate-300 text-sm md:text-base leading-relaxed mx-auto bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  {activeRealm.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activeRealm.factions.map((faction, idx) => (
                  <div key={idx} className={`bg-slate-900/60 backdrop-blur-md rounded-3xl p-8 border border-slate-700 ${activeRealm.borderClass} transition-colors group relative overflow-hidden`}>
                    
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 ${activeRealm.textClass}`}></div>
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-slate-700/80 bg-slate-950 shadow-[0_0_25px_rgba(currentColor,0.15)] group-hover:scale-110 transition-transform duration-500 ${activeRealm.textClass}`}>
                      {faction.icon}
                    </div>

                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1 relative z-10">
                      {faction.name}
                    </h3>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activeRealm.textClass} mb-4 relative z-10`}>
                      Playstyle: {faction.style}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                      {faction.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <div className="inline-block border border-yellow-500/30 bg-yellow-900/20 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">
                    Voting Portal Opening Soon 🔒
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
      
    </div>
  );
}