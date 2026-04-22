import React, { useState, useEffect } from 'react';
import { themeData, VOTING_DEADLINE } from './data';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import VotingView from './views/VotingView';
import ResultsView from './views/ResultsView';

export default function App() {
  const [deviceType, setDeviceType] = useState('DESKTOP');
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', ''));
  const [user, setUser] = useState(null);
  
  const [portalTheme, setPortalTheme] = useState(null);
  const [portalPhase, setPortalPhase] = useState('idle');

  const [isVotingOpen, setIsVotingOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Init Device, User, & Timer
  useEffect(() => {
    const savedUser = localStorage.getItem('wsaVoter');
    if (savedUser) setUser(JSON.parse(savedUser));

    const checkDevice = () => setDeviceType(window.innerWidth < 768 ? 'MOBILE' : 'DESKTOP');
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const timerInterval = setInterval(() => {
      const distance = VOTING_DEADLINE - new Date().getTime();
      if (distance <= 0) {
        clearInterval(timerInterval);
        setIsVotingOpen(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsVotingOpen(true);
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => { window.removeEventListener('resize', checkDevice); clearInterval(timerInterval); };
  }, []);

  // Hash Router
  useEffect(() => {
    const onHashChange = () => { setCurrentPath(window.location.hash.replace('#', '')); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  let currentView = 'home';
  let activeRealm = null;
  if (currentPath.startsWith('theme/')) {
    currentView = 'home';
    activeRealm = themeData.find(t => t.id === currentPath.split('/')[1]) || null;
  } else if (['login', 'voting', 'results'].includes(currentPath)) {
    currentView = currentPath;
  }

  const navigateTo = (hash) => { window.location.hash = hash; };

  const triggerPortal = (targetRealmId, portalThemeId) => {
    setPortalTheme(portalThemeId);
    setPortalPhase('entering');
    setTimeout(() => {
      targetRealmId ? navigateTo(`theme/${targetRealmId}`) : navigateTo('');
      setPortalPhase('exiting');
      setTimeout(() => { setPortalTheme(null); setPortalPhase('idle'); }, 700); 
    }, 700); 
  };

  const handleMainCTA = () => {
    if (!isVotingOpen) return navigateTo('results'); 
    user ? navigateTo('voting') : navigateTo('login');
  };

  const handleLogout = () => {
    setUser(null); localStorage.removeItem('wsaVoter'); navigateTo('');
  };

  return (
    <div className="bg-slate-950 bg-[url('/images/bg-desk.png')] bg-cover bg-center bg-fixed text-slate-50 font-sans selection:bg-blue-500/30 min-h-screen relative animate-in fade-in duration-700 ease-in-out">
      
      {/* Global Background Scanline */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%)', backgroundSize: '100% 4px' }}></div>

      <style>{`
        @keyframes cinematicFadeScale { 0% { transform: scale(1); opacity: 0; } 20% { transform: scale(1.05); opacity: 1; } 80% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1.15); opacity: 0; } }
        .portal-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: cinematicFadeScale 1.4s ease-in-out forwards; will-change: transform, opacity; z-index: 110; }
        @keyframes gateSlamLeft { 0% { transform: translateX(-100%); opacity: 0; } 20% { transform: translateX(0%); opacity: 1; } 80% { transform: translateX(0%); opacity: 1; } 100% { transform: translateX(-100%); opacity: 0; } }
        @keyframes gateSlamRight { 0% { transform: translateX(100%); opacity: 0; } 20% { transform: translateX(0%); opacity: 1; } 80% { transform: translateX(0%); opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
        .bleach-gate { position: absolute; height: 100%; width: 50%; object-fit: cover; will-change: transform, opacity; z-index: 110; }
        .bleach-left  { left: 0;  animation: gateSlamLeft 1.4s ease-in-out forwards; }
        .bleach-right { right: 0; animation: gateSlamRight 1.4s ease-in-out forwards; }
        @keyframes lightningFlash { 0% { opacity: 0; transform: scale(1); } 10% { opacity: 1; filter: brightness(2); transform: scale(1.02); } 20% { opacity: 0.5; transform: scale(1.02); } 30% { opacity: 1; filter: brightness(2); transform: scale(1.05); } 80% { opacity: 1; filter: brightness(1); transform: scale(1.1); } 100% { opacity: 0; transform: scale(1.15); } }
        .percy-flash { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; animation: lightningFlash 1.4s ease-out forwards; will-change: transform, opacity, filter; z-index: 110; }
      `}</style>

      {/* Global HUD */}
      <div className="fixed top-0 inset-x-0 h-1 z-50 animate-pulse transition-all duration-700 ease-in-out" style={{ backgroundImage: isVotingOpen ? 'linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)' : 'linear-gradient(to right, transparent, rgba(148,163,184,0.3), transparent)' }}></div>
      <div className="fixed top-0 w-full z-50 flex justify-between items-start px-4 md:px-8 py-3 pointer-events-none transition-all duration-700 ease-in-out">
        <div className="flex flex-col gap-1">
          <span className={`text-[10px] md:text-xs font-black tracking-widest uppercase ${isVotingOpen ? 'text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]' : 'text-slate-400 drop-shadow-md'}`}>
            WSA // {isVotingOpen ? 'SECURE.NET' : 'ARCHIVE MODE'}
          </span>
          <span className="text-[7px] md:text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isVotingOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
            {deviceType} UPLINK {isVotingOpen ? 'ESTABLISHED' : 'TERMINATED'}
          </span>
        </div>
        {user && (
          <button onClick={handleLogout} className="pointer-events-auto flex items-center gap-2 text-[9px] font-bold tracking-[0.3em] uppercase text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-sm border border-slate-700 backdrop-blur-md transition-all duration-300 ease-in-out cursor-pointer">
            <span>Sign Out</span><span className="font-mono text-slate-300">[{user.name.split(' ')[0]}]</span>
          </button>
        )}
      </div>

      {/* Global Timer Overlay */}
      {currentView !== 'results' && (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-90 pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-end animate-in slide-in-from-bottom-8 duration-1000 ease-out transition-transform hover:-translate-y-2">
            {isVotingOpen ? (
              <div className="bg-[#0a0a0a]/95 border border-slate-800 p-3 md:p-5 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-500"></div><div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-500"></div><div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-blue-500 via-purple-500 to-transparent"></div>
                <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] mb-2 font-mono flex items-center gap-2 justify-end">Network Closure <span className="w-1.5 h-1.5 bg-blue-500 animate-pulse rounded-sm"></span></p>
                <div className="flex gap-2 md:gap-4 justify-end items-center font-black text-white text-xl md:text-3xl tracking-tighter">
                  <div className="flex flex-col items-center"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-[6px] md:text-[8px] text-slate-500 tracking-[0.3em] uppercase mt-1">D</span></div><span className="text-slate-700 pb-2 md:pb-3">:</span>
                  <div className="flex flex-col items-center"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-[6px] md:text-[8px] text-slate-500 tracking-[0.3em] uppercase mt-1">H</span></div><span className="text-slate-700 pb-2 md:pb-3">:</span>
                  <div className="flex flex-col items-center"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-[6px] md:text-[8px] text-slate-500 tracking-[0.3em] uppercase mt-1">M</span></div><span className="text-slate-700 pb-2 md:pb-3">:</span>
                  <div className="flex flex-col items-center"><span className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-[6px] md:text-[8px] text-slate-500 tracking-[0.3em] uppercase mt-1">S</span></div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-slate-700 p-3 md:p-5 shadow-lg relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-full h-px bg-slate-600"></div><p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs font-mono flex items-center gap-3"><span className="w-2 h-2 bg-slate-500 rounded-sm"></span> VOTING CLOSED</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Portal Transition Overlays */}
      <div className={`fixed inset-0 z-100 flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-in-out bg-black/90 ${portalPhase !== 'idle' ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        {portalTheme === 'avatar' && <img src="/images/pandora-portal.jpg" alt="Pandora" className="portal-image" />}
        {portalTheme === 'onepiece' && <img src="/images/onepiece-portal.jpg" alt="One Piece" className="portal-image" />}
        {portalTheme === 'bleach' && ( <div className="absolute inset-0 flex h-full w-full"><img src="/images/bleach-portal.jpg" className="bleach-gate bleach-left" /><img src="/images/bleach-portal.jpg" className="bleach-gate bleach-right" /></div> )}
        {portalTheme === 'percy' && ( <><div className="absolute inset-0 bg-white animate-[lightningFlash_1.4s_ease-out_forwards] z-105"></div><img src="/images/percy-portal.jpg" className="percy-flash" /></> )}
      </div>

      {/* Dynamic View Router */}
      {currentView === 'home' && <HomeView activeRealm={activeRealm} isVotingOpen={isVotingOpen} handleMainCTA={handleMainCTA} triggerPortal={triggerPortal} />}
      {currentView === 'login' && <LoginView isVotingOpen={isVotingOpen} navigateTo={navigateTo} setUser={setUser} />}
      {currentView === 'voting' && <VotingView user={user} setUser={setUser} isVotingOpen={isVotingOpen} navigateTo={navigateTo} triggerPortal={triggerPortal} />}
      {currentView === 'results' && <ResultsView navigateTo={navigateTo} />}

    </div>
  );
}