import React, { useState, useEffect } from 'react';
import { VALID_WSA_NAMES, getDynamicUsers, getDeletedUsers, themeData, getShuffleSeed } from '../data';

export default function RosterView({ user, navigateTo }) {
  const [isSorting, setIsSorting] = useState(true);
  const [roster, setRoster] = useState({ strawHat: [], whitebeard: [], redHair: [] });
  const [userFaction, setUserFaction] = useState(null);

  const onepieceTheme = themeData.find(t => t.id === 'onepiece');
  const strawHatLogo = onepieceTheme.factions[0].icon;
  const whitebeardLogo = onepieceTheme.factions[1].icon;
  const redHairLogo = onepieceTheme.factions[2].icon;

  // A sleek fallback if the image file isn't found in public/images/
  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
    e.target.classList.add('opacity-30', 'p-2');
  };

  useEffect(() => {
    if (!user) return;

    const sortMembers = () => {
      const baseUsers = VALID_WSA_NAMES.filter(n => n !== "Test User");
      const dynamicUsers = getDynamicUsers();
      const deletedUsers = getDeletedUsers();
      const seed = getShuffleSeed();

      // 1. HASH & SORT BASE USERS (Creates a deterministic shuffle based on the seed)
      const hashedBase = baseUsers.map(name => {
        const saltedName = name + seed;
        let hash = 0x811c9dc5;
        for (let i = 0; i < saltedName.length; i++) {
          hash ^= saltedName.charCodeAt(i);
          hash = (hash * 0x01000193) >>> 0;
        }
        return { name, hash };
      });
      hashedBase.sort((a, b) => a.hash - b.hash);

      let sh = [];
      let wb = [];
      let rh = [];

      // 2. DEAL BASE USERS (Guarantees PERFECT balance for the base roster)
      hashedBase.forEach((userObj, index) => {
        const teamIndex = index % 3;
        if (teamIndex === 0) sh.push(userObj.name);
        else if (teamIndex === 1) wb.push(userObj.name);
        else rh.push(userObj.name);
      });

      // 3. REMOVE DEPORTED USERS (Admin deletes)
      sh = sh.filter(name => !deletedUsers.includes(name));
      wb = wb.filter(name => !deletedUsers.includes(name));
      rh = rh.filter(name => !deletedUsers.includes(name));

      // 4. SMART ASSIGN NEW RECRUITS (Fills the smallest team first, ensuring stability)
      dynamicUsers.forEach(name => {
        if (deletedUsers.includes(name)) return; 

        // Find which team is currently the smallest
        const sizes = [
          { id: 'sh', size: sh.length },
          { id: 'wb', size: wb.length },
          { id: 'rh', size: rh.length }
        ];
        sizes.sort((a, b) => a.size - b.size);
        const smallest = sizes[0].id;

        if (smallest === 'sh') sh.push(name);
        else if (smallest === 'wb') wb.push(name);
        else rh.push(name);
      });

      // 5. IDENTIFY CURRENT USER'S FACTION
      let loggedInUserFaction = null;
      if (sh.includes(user.name)) {
        loggedInUserFaction = { name: 'Straw Hat Fleet', colorClass: 'text-yellow-400', borderClass: 'border-yellow-400/50', bgClass: 'bg-yellow-400/5', logo: strawHatLogo };
      } else if (wb.includes(user.name)) {
        loggedInUserFaction = { name: 'Whitebeard Commanders', colorClass: 'text-white', borderClass: 'border-white/50', bgClass: 'bg-white/5', logo: whitebeardLogo };
      } else if (rh.includes(user.name)) {
        loggedInUserFaction = { name: 'Red Hair Crew', colorClass: 'text-red-500', borderClass: 'border-red-500/50', bgClass: 'bg-red-500/5', logo: redHairLogo };
      }

      // 6. ALPHABETIZE AND RENDER
      sh.sort(); wb.sort(); rh.sort();
      setRoster({ strawHat: sh, whitebeard: wb, redHair: rh });
      setUserFaction(loggedInUserFaction);
    };

    const timer = setTimeout(() => { sortMembers(); setIsSorting(false); }, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen w-full flex flex-col pt-10 pb-20 px-4 md:px-8 relative z-10">
      
      <div className="w-full text-center z-40 relative flex-shrink-0 mb-10">
         <h2 className="text-4xl md:text-6xl font-onepiece text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 uppercase tracking-wider drop-shadow-xl">
           Global Operations Roster
         </h2>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto z-10 relative flex flex-col">
        {isSorting ? (
          <div className="flex-1 flex flex-col items-center justify-center mt-20">
            <div className="relative w-24 h-24 flex items-center justify-center mb-8">
              <div className="absolute inset-0 border-2 border-dashed border-slate-700 rounded-full animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute inset-2 border-2 border-blue-500/30 rounded-full border-t-blue-500 animate-[spin_2s_linear_reverse_infinite]"></div>
            </div>
            <p className="text-blue-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] animate-pulse">Balancing Network Operations...</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col w-full h-full animate-in fade-in duration-1000 zoom-in-[0.98]">
            
            {/* USER'S PERSONAL FACTION ID BANNER */}
            {userFaction && (
              <div className={`w-full max-w-4xl mx-auto mb-10 border rounded-3xl backdrop-blur-2xl relative overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ${userFaction.borderClass} ${userFaction.bgClass}`}>
                
                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  <p className="text-[10px] text-slate-400 font-mono tracking-[0.3em] uppercase mb-1">Identity Signature Confirmed</p>
                  <h3 className="text-3xl md:text-5xl font-onepiece text-white uppercase tracking-wider drop-shadow-md">{user.name}</h3>
                </div>

                <div className="relative z-10 flex items-center gap-4 md:gap-6 bg-black/40 px-6 py-4 rounded-2xl border border-white/5">
                  <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <p className="text-[9px] text-slate-400 font-mono tracking-[0.3em] uppercase mb-1">Assigned Fleet</p>
                    <h3 className={`text-2xl md:text-4xl font-onepiece leading-none tracking-wider whitespace-nowrap drop-shadow-md ${userFaction.colorClass}`}>
                      {userFaction.name}
                    </h3>
                  </div>
                  
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-black/50 rounded-full border border-white/10 flex items-center justify-center p-2 overflow-hidden shadow-inner">
                    <img 
                      src={userFaction.logo} 
                      alt="Faction Logo"
                      onError={handleImageError} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* THREE COLUMNS */}
            <div className="flex flex-col xl:flex-row gap-6 w-full flex-1 min-h-[60vh]">
              
              {/* STRAW HAT FLEET */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full xl:w-1/3 relative overflow-hidden h-[60vh] xl:h-auto shadow-2xl transition-transform hover:-translate-y-1">
                <div className="bg-gradient-to-b from-yellow-500/20 to-transparent p-5 md:p-6 border-b border-white/5 flex justify-between items-start relative z-10">
                  <div className="flex-1 overflow-hidden pr-2">
                    <h3 className="text-2xl md:text-3xl font-onepiece leading-none text-yellow-400 tracking-wider drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                      Straw Hat Fleet
                    </h3>
                    <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] mt-2">
                      {roster.strawHat.length} Members
                    </p>
                  </div>
                  <div className="w-10 h-10 shrink-0 opacity-80 flex items-center justify-center bg-black/20 rounded-full border border-white/5 overflow-hidden">
                    <img src={strawHatLogo} alt="Logo" onError={handleImageError} className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
                  <ul className="space-y-2">
                    {roster.strawHat.map((name, i) => (
                      <li key={i} className={`text-xs md:text-sm font-mono rounded-xl px-4 py-3 transition-colors flex justify-between items-center ${name === user?.name ? 'bg-yellow-500/20 border border-yellow-500/50 text-white font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 'bg-black/30 border border-transparent text-slate-300 hover:bg-yellow-500/10 hover:border-yellow-500/30 hover:text-white'}`}>
                        <span className="uppercase tracking-wider">{name}</span>
                        {name === user?.name && <span className="text-[8px] text-yellow-400 animate-pulse tracking-widest bg-black/50 px-2 py-1 rounded-full border border-yellow-500/30">YOU</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* WHITEBEARD COMMANDERS */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full xl:w-1/3 relative overflow-hidden h-[60vh] xl:h-auto shadow-2xl transition-transform hover:-translate-y-1">
                <div className="bg-gradient-to-b from-white/20 to-transparent p-5 md:p-6 border-b border-white/5 flex justify-between items-start relative z-10">
                  <div className="flex-1 overflow-hidden pr-2">
                    <h3 className="text-2xl md:text-3xl font-onepiece leading-none text-white tracking-wider drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                      Whitebeard Cmdrs
                    </h3>
                    <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] mt-2">
                      {roster.whitebeard.length} Members
                    </p>
                  </div>
                  <div className="w-10 h-10 shrink-0 opacity-80 flex items-center justify-center bg-black/20 rounded-full border border-white/5 overflow-hidden">
                    <img src={whitebeardLogo} alt="Logo" onError={handleImageError} className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
                  <ul className="space-y-2">
                    {roster.whitebeard.map((name, i) => (
                      <li key={i} className={`text-xs md:text-sm font-mono rounded-xl px-4 py-3 transition-colors flex justify-between items-center ${name === user?.name ? 'bg-white/20 border border-white/50 text-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-black/30 border border-transparent text-slate-300 hover:bg-white/10 hover:border-white/30 hover:text-white'}`}>
                        <span className="uppercase tracking-wider">{name}</span>
                        {name === user?.name && <span className="text-[8px] text-white animate-pulse tracking-widest bg-black/50 px-2 py-1 rounded-full border border-white/30">YOU</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RED HAIR CREW */}
              <div className="flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl w-full xl:w-1/3 relative overflow-hidden h-[60vh] xl:h-auto shadow-2xl transition-transform hover:-translate-y-1">
                <div className="bg-gradient-to-b from-red-500/20 to-transparent p-5 md:p-6 border-b border-white/5 flex justify-between items-start relative z-10">
                  <div className="flex-1 overflow-hidden pr-2">
                    <h3 className="text-2xl md:text-3xl font-onepiece leading-none text-red-400 tracking-wider drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                      Red Hair Crew
                    </h3>
                    <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em] mt-2">
                      {roster.redHair.length} Members
                    </p>
                  </div>
                  <div className="w-10 h-10 shrink-0 opacity-80 flex items-center justify-center bg-black/20 rounded-full border border-white/5 overflow-hidden">
                    <img src={redHairLogo} alt="Logo" onError={handleImageError} className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
                  <ul className="space-y-2">
                    {roster.redHair.map((name, i) => (
                      <li key={i} className={`text-xs md:text-sm font-mono rounded-xl px-4 py-3 transition-colors flex justify-between items-center ${name === user?.name ? 'bg-red-500/20 border border-red-500/50 text-white font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-black/30 border border-transparent text-slate-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-white'}`}>
                        <span className="uppercase tracking-wider">{name}</span>
                        {name === user?.name && <span className="text-[8px] text-red-400 animate-pulse tracking-widest bg-black/50 px-2 py-1 rounded-full border border-red-500/30">YOU</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');
        .font-onepiece { font-family: 'Pirata One', cursive !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}