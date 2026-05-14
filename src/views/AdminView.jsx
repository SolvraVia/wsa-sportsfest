import React, { useState, useEffect } from 'react';
import { getDynamicUsers, setShuffleSeed } from '../data';

export default function AdminView({ user, navigateTo }) {
  const [newRecruit, setNewRecruit] = useState('');
  const [history, setHistory] = useState([]);
  const [sysMessage, setSysMessage] = useState('');

  useEffect(() => {
    if (user?.name !== 'Test User') {
      navigateTo('');
    } else {
      setHistory(getDynamicUsers());
    }
  }, [user, navigateTo]);

  const handleAddRecruit = (e) => {
    e.preventDefault();
    const name = newRecruit.trim();
    if (name.length < 2) return;

    const updatedHistory = [name, ...history];
    localStorage.setItem('wsaDynamicUsers', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setNewRecruit('');
    
    setSysMessage(`[SUCCESS] Data Signature '${name}' injected to Global Roster.`);
    setTimeout(() => setSysMessage(''), 3000);
  };

  const handleClearHistory = () => {
    if(window.confirm("WARNING: This will purge all manually added recruits. Proceed?")) {
      localStorage.removeItem('wsaDynamicUsers');
      setHistory([]);
      setSysMessage(`[PURGE] Manual recruits data wiped.`);
      setTimeout(() => setSysMessage(''), 3000);
    }
  }

  // THE NEW SHUFFLE FUNCTION
  const handleReshuffle = () => {
    if(window.confirm("DANGER: This will instantly randomize ALL team assignments for ALL users. The teams will remain balanced, but players will switch fleets. Proceed?")) {
      // Generate a random string as the new seed
      const newSeed = Math.random().toString(36).substring(2, 10);
      setShuffleSeed(newSeed);
      setSysMessage(`[OVERRIDE] Global Roster successfully reshuffled.`);
      setTimeout(() => setSysMessage(''), 3000);
    }
  };

  if (user?.name !== 'Test User') return null;

  return (
    <div className="absolute inset-0 z-40 flex flex-col pt-24 pb-8 px-4 md:px-8">
      
      <div className="w-full text-center z-40 relative flex-shrink-0 mb-10">
         <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-700 uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
           Admin Control Panel
         </h2>
         <p className="text-emerald-500/70 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2">
           System Overrides & Data Injection
         </p>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto z-10 relative flex flex-col md:flex-row gap-6">
        
        {/* LEFT COLUMN: Controls */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
            
            {/* INJECTION FORM */}
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
               <h3 className="text-white font-black uppercase tracking-widest text-sm md:text-lg mb-4 flex items-center gap-3">
                 <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                 Inject New Recruit
               </h3>
               <form onSubmit={handleAddRecruit} className="flex flex-col gap-4">
                 <input 
                   type="text" 
                   value={newRecruit}
                   onChange={(e) => setNewRecruit(e.target.value)}
                   placeholder="Enter Full Name (Surname Given)"
                   className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors uppercase font-mono placeholder-slate-600"
                 />
                 <button 
                   type="submit" 
                   className="bg-emerald-600 hover:bg-emerald-500 text-white font-black w-full py-4 rounded-xl uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer"
                 >
                   Execute Injection
                 </button>
               </form>
               {sysMessage && !sysMessage.includes('OVERRIDE') && <p className="text-emerald-400 font-mono text-[10px] mt-4 uppercase animate-pulse bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg">{sysMessage}</p>}
            </div>

            {/* NEW: DANGER ZONE / SHUFFLE */}
            <div className="bg-red-950/20 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-6 md:p-8 shadow-2xl">
               <h3 className="text-red-400 font-black uppercase tracking-widest text-sm md:text-lg mb-2 flex items-center gap-3">
                 <span className="text-xl">⚠</span>
                 System Override
               </h3>
               <p className="text-slate-400 text-xs mb-6 font-mono leading-relaxed">Execute a complete randomization of the Global Roster. Team balance will be maintained.</p>
               <button 
                 onClick={handleReshuffle}
                 className="bg-red-600 hover:bg-red-500 text-white font-black w-full py-4 rounded-xl uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer"
               >
                 Global Reshuffle Teams
               </button>
               {sysMessage && sysMessage.includes('OVERRIDE') && <p className="text-red-400 font-mono text-[10px] mt-4 uppercase animate-pulse bg-red-900/20 border border-red-500/30 p-3 rounded-lg">{sysMessage}</p>}
            </div>

        </div>

        {/* RIGHT COLUMN: HISTORY LOG */}
        <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl h-[60vh] md:h-auto">
           <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
             <h3 className="text-white font-black uppercase tracking-widest text-sm md:text-lg">
               System History Log
             </h3>
             <button onClick={handleClearHistory} className="text-slate-400 hover:text-white hover:bg-white/10 text-[9px] uppercase tracking-widest font-mono cursor-pointer border border-white/10 bg-black/40 px-4 py-2 rounded-full transition-colors">
               Purge Log
             </button>
           </div>
           
           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
             {history.length === 0 ? (
               <div className="h-full flex items-center justify-center">
                 <p className="text-slate-500 font-mono text-xs uppercase tracking-widest text-center">No manual injections detected.</p>
               </div>
             ) : (
               <ul className="space-y-2">
                 {history.map((name, i) => (
                   <li key={i} className="flex justify-between items-center text-xs md:text-sm text-slate-300 font-mono border border-white/5 px-4 py-3 bg-black/40 rounded-xl">
                     <span className="uppercase tracking-wider">{name}</span>
                     <span className="text-[8px] text-emerald-400 tracking-widest bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 rounded-full">INJECTED</span>
                   </li>
                 ))}
               </ul>
             )}
           </div>
        </div>

      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
}