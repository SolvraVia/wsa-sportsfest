import React, { useState, useEffect } from 'react';
import { themeData, VOTING_DEADLINE } from './data';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RosterView from './views/RosterView'; 
import AdminView from './views/AdminView';

export default function App() {
  const [deviceType, setDeviceType] = useState('DESKTOP');
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', ''));
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // NEW: Session Loading State

  useEffect(() => {
    // Check local storage FIRST, then mark auth as ready
    const savedUser = localStorage.getItem('wsaVoter');
    if (savedUser) setUser(JSON.parse(savedUser));
    setIsAuthReady(true); 

    const checkDevice = () => setDeviceType(window.innerWidth < 768 ? 'MOBILE' : 'DESKTOP');
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const onHashChange = () => { setCurrentPath(window.location.hash.replace('#', '')); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  let currentView = 'home';
  if (['login', 'roster', 'admin'].includes(currentPath)) {
    currentView = currentPath;
  }

  const navigateTo = (hash) => { window.location.hash = hash; };

  // ROUTE PROTECTION: Only kicks you out IF auth has finished loading and you are still null
  useEffect(() => {
    if (isAuthReady && (currentView === 'roster' || currentView === 'admin') && !user) {
      navigateTo('login');
    }
  }, [currentView, user, isAuthReady]);

  const handleLogout = () => {
    setUser(null); localStorage.removeItem('wsaVoter'); navigateTo('');
  };

  // Prevent flashing white screen while checking session
  if (!isAuthReady) return <div className="bg-[#030712] min-h-screen"></div>;

  return (
    <div className="bg-[#030712] text-slate-50 font-sans selection:bg-blue-500/30 min-h-screen relative animate-in fade-in duration-700 ease-in-out overflow-x-hidden">
      
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_center,rgba(56,189,248,0.05)_0%,rgba(3,7,18,1)_60%)]"></div>
      
      <div className="fixed top-4 inset-x-4 md:inset-x-10 z-50 flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-700">
        <div className="flex flex-col">
          <span className="text-xs md:text-sm font-black tracking-widest uppercase text-white drop-shadow-md">
            WSA ROSTER HUB
          </span>
          <span className="text-[8px] md:text-[10px] font-mono text-blue-400/80 uppercase tracking-widest mt-0.5">
            Grand Line Operations
          </span>
        </div>
        
        <div className="flex gap-4">
          {user?.name === 'Test User' && (
            <button onClick={() => navigateTo('admin')} className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 transition-all">
              Admin Panel
            </button>
          )}
          {user ? (
            <button onClick={handleLogout} className="text-[10px] font-bold tracking-widest uppercase text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all">
              Sign Out
            </button>
          ) : (
            <button onClick={() => navigateTo('login')} className="text-[10px] font-bold tracking-widest uppercase text-white bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)] px-6 py-2 rounded-full transition-all">
              Authenticate
            </button>
          )}
        </div>
      </div>

      <div className="pt-24 min-h-screen">
        {currentView === 'home' && <HomeView navigateTo={navigateTo} />}
        {currentView === 'login' && <LoginView navigateTo={navigateTo} setUser={setUser} />}
        {currentView === 'roster' && <RosterView user={user} />} 
        {currentView === 'admin' && <AdminView user={user} navigateTo={navigateTo} />} 
      </div>

    </div>
  );
}