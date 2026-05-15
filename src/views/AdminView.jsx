import React, { useState, useEffect } from 'react';
import { VALID_WSA_NAMES } from '../data';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../Firebase';

export default function AdminView({ user, navigateTo }) {
  const [newRecruit, setNewRecruit] = useState('');
  const [sysMessage, setSysMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.name !== 'Test User') return navigateTo('');

    const docRef = doc(db, "wsa_db", "global_state");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const dynamic = data.dynamicUsers || [];
        const deleted = data.deletedUsers || [];
        const allActive = [...VALID_WSA_NAMES, ...dynamic].filter(n => !deleted.includes(n) && n !== 'Test User');
        setActiveUsers(allActive.sort());
      }
    });

    return () => unsubscribe();
  }, [user, navigateTo]);

  const handleAddRecruit = async (e) => {
    e.preventDefault();
    const name = newRecruit.trim();
    if (name.length < 2) return;

    const docRef = doc(db, "wsa_db", "global_state");
    await updateDoc(docRef, { dynamicUsers: arrayUnion(name) });
    
    setNewRecruit('');
    setSysMessage(`[SUCCESS] Data Signature '${name}' injected.`);
    setTimeout(() => setSysMessage(''), 3000);
  };

  const handleRemoveUser = async (nameToRemove) => {
    if(window.confirm(`Are you sure you want to completely deport ${nameToRemove} from the Live Server?`)) {
      const docRef = doc(db, "wsa_db", "global_state");
      await updateDoc(docRef, { deletedUsers: arrayUnion(nameToRemove) });
      
      setSysMessage(`[PURGED] ${nameToRemove} has been deported.`);
      setTimeout(() => setSysMessage(''), 3000);
    }
  };

  const handleReshuffle = async () => {
    if(window.confirm("DANGER: This will instantly randomize ALL team assignments for ALL connected users. Proceed?")) {
      const newSeed = Math.random().toString(36).substring(2, 10);
      const docRef = doc(db, "wsa_db", "global_state");
      
      await updateDoc(docRef, { shuffleSeed: newSeed });
      
      setSysMessage(`[OVERRIDE] Global Server successfully reshuffled.`);
      setTimeout(() => setSysMessage(''), 3000);
    }
  };

  if (user?.name !== 'Test User') return null;
  const filteredUsers = activeUsers.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="absolute inset-0 z-40 flex flex-col pt-24 pb-8 px-4 md:px-8">
      <div className="w-full text-center z-40 relative flex-shrink-0 mb-10">
         <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-700 uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
           Admin Control Panel
         </h2>
         <p className="text-emerald-500/70 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mt-2">Live Server Operations</p>
      </div>
      <div className="flex-1 w-full max-w-6xl mx-auto z-10 relative flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-6 w-full md:w-1/3 shrink-0">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
               <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>Inject Recruit</h3>
               <form onSubmit={handleAddRecruit} className="flex flex-col gap-4">
                 <input type="text" value={newRecruit} onChange={(e) => setNewRecruit(e.target.value)} placeholder="Ex: Dela Cruz Juan" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors uppercase font-mono placeholder-slate-600" />
                 <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black w-full py-4 rounded-xl uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer">Execute Injection</button>
               </form>
               {sysMessage && !sysMessage.includes('OVERRIDE') && !sysMessage.includes('PURGED') && <p className="text-emerald-400 font-mono text-[10px] mt-4 uppercase animate-pulse bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg">{sysMessage}</p>}
               {sysMessage && sysMessage.includes('PURGED') && <p className="text-red-400 font-mono text-[10px] mt-4 uppercase animate-pulse bg-red-900/20 border border-red-500/30 p-3 rounded-lg">{sysMessage}</p>}
            </div>
            <div className="bg-red-950/20 backdrop-blur-2xl border border-red-500/30 rounded-3xl p-6 shadow-2xl">
               <h3 className="text-red-400 font-black uppercase tracking-widest text-sm mb-2 flex items-center gap-3"><span className="text-xl">⚠</span> Server Override</h3>
               <p className="text-slate-400 text-[10px] mb-6 font-mono leading-relaxed">Execute a complete randomization of the Global Roster across all connected devices.</p>
               <button onClick={handleReshuffle} className="bg-red-600 hover:bg-red-500 text-white font-black w-full py-4 rounded-xl uppercase tracking-widest text-xs transition-colors shadow-[0_0_20px_rgba(239,68,68,0.3)] cursor-pointer">Live Reshuffle</button>
               {sysMessage && sysMessage.includes('OVERRIDE') && <p className="text-red-400 font-mono text-[10px] mt-4 uppercase animate-pulse bg-red-900/20 border border-red-500/30 p-3 rounded-lg">{sysMessage}</p>}
            </div>
        </div>
        <div className="flex-1 flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl h-[60vh] md:h-auto overflow-hidden">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-4">
             <div className="flex flex-col">
               <h3 className="text-white font-black uppercase tracking-widest text-sm md:text-lg">Live Directory</h3>
               <p className="text-[10px] text-emerald-400 font-mono mt-1">{activeUsers.length} Online Signatures</p>
             </div>
             <div className="relative w-full md:w-64">
               <input type="text" placeholder="Search personnel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-full px-4 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors uppercase font-mono placeholder-slate-600" />
             </div>
           </div>
           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
             <ul className="space-y-2">
               {filteredUsers.map((name, i) => (
                 <li key={i} className="flex justify-between items-center text-xs md:text-sm text-slate-300 font-mono border border-white/5 px-4 py-3 bg-black/40 rounded-xl hover:bg-white/5 transition-colors group">
                   <span className="uppercase tracking-wider truncate mr-4">{name}</span>
                   <div className="flex items-center gap-3 shrink-0">
                     {!VALID_WSA_NAMES.includes(name) && <span className="text-[8px] text-emerald-400 tracking-widest bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 rounded-full hidden md:block">INJECTED</span>}
                     <button onClick={() => handleRemoveUser(name)} className="text-slate-500 hover:text-white bg-red-500/10 hover:bg-red-500 border border-transparent hover:border-red-400 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all opacity-100 md:opacity-0 group-hover:opacity-100 cursor-pointer">Deport</button>
                   </div>
                 </li>
               ))}
             </ul>
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