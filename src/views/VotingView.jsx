import React, { useState, useRef } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { themeData } from "../data";

export default function VotingView({ user, setUser, isVotingOpen, navigateTo }) {
  const [voteStatus, setVoteStatus] = useState(user?.votedRealm ? 'secured' : 'idle');
  const [chargingRealmId, setChargingRealmId] = useState(null);
  const [selectedRealm, setSelectedRealm] = useState(user?.votedRealm ? themeData.find(t => t.id === user.votedRealm) : null);
  const [chargeProgress, setChargeProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false); 
  
  const requestRef = useRef();
  const chargeValue = useRef(0);

  const startCharge = (theme) => {
    if (voteStatus !== 'idle' || user?.votedRealm || !isVotingOpen) return;
    setChargingRealmId(theme.id); chargeValue.current = 0;
    const animate = () => {
      chargeValue.current += 1.5;
      if (chargeValue.current >= 100) {
        setChargeProgress(100); setSelectedRealm(theme); setChargingRealmId(null); setVoteStatus('confirming');
      } else { setChargeProgress(chargeValue.current); requestRef.current = requestAnimationFrame(animate); }
    };
    requestRef.current = requestAnimationFrame(animate);
  };
  const stopCharge = () => { if (voteStatus !== 'idle') return; cancelAnimationFrame(requestRef.current); setChargeProgress(0); setChargingRealmId(null); chargeValue.current = 0; };

  const confirmVote = async () => {
    setIsSyncing(true); const updatedUser = { ...user, votedRealm: selectedRealm.id };
    try {
      await setDoc(doc(db, "wsa_votes", updatedUser.name), { name: updatedUser.name, realmId: selectedRealm.id, realmName: selectedRealm.title, timestamp: new Date().toISOString() });
      setUser(updatedUser); localStorage.setItem('wsaVoter', JSON.stringify(updatedUser)); setVoteStatus('secured');
    } catch (error) { alert("System Error."); setVoteStatus('idle'); } finally { setIsSyncing(false); }
  };
  const cancelVote = () => { setVoteStatus('idle'); setSelectedRealm(null); setChargeProgress(0); };

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none transition-colors duration-700 ease-in-out" style={{ backgroundImage: 'radial-gradient(ellipse at center, var(--tw-gradient-stops))', color: selectedRealm ? selectedRealm.hex : '#3b82f6' }}></div>
      {voteStatus === 'idle' && (
        <div className="absolute top-16 left-4 md:top-20 md:left-8 z-50 animate-in fade-in duration-700 ease-out">
          <button onClick={() => navigateTo('')} className="text-slate-400 hover:text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border-l-2 border-slate-700 hover:border-slate-400 bg-slate-900/50 transition-all duration-300 ease-in-out cursor-pointer">← Terminate Session</button>
        </div>
      )}
      {voteStatus === 'idle' && (
        <div className="w-full max-w-5xl flex flex-col items-center mt-20 md:mt-0 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="text-center mb-10 transition-all duration-700 ease-in-out">
            <div className="inline-flex items-center justify-center gap-3 bg-blue-950/30 border border-blue-500/30 px-6 py-2 mb-6 rounded-full"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div><p className="text-blue-400 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] m-0 leading-none">Identity Lock: {user?.name}</p></div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] mb-2">Declare Allegiance</h2>
            <p className="text-slate-400 uppercase tracking-[0.2em] text-[10px] md:text-xs">Press and hold a sector to initiate energy transfer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {themeData.map((theme) => {
              const isChargingThisCard = chargingRealmId === theme.id;
              return (
                <div key={theme.id} onMouseDown={() => startCharge(theme)} onMouseUp={stopCharge} onMouseLeave={stopCharge} onTouchStart={() => startCharge(theme)} onTouchEnd={stopCharge} className={`group relative h-48 md:h-64 rounded-none overflow-hidden select-none touch-none cursor-crosshair bg-slate-900 transition-all duration-500 ease-in-out border-t border-x border-slate-800 border-b-4 hover:border-current ${isChargingThisCard ? 'scale-[1.02] border-white/80' : ''}`} style={{ color: theme.hex, borderBottomColor: isChargingThisCard ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)' }}>
                  <img src={theme.image} alt={theme.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isChargingThisCard ? 'grayscale-0 opacity-100 scale-110' : 'filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105'}`} />
                  <div className="absolute bottom-0 left-0 w-full transition-all duration-75 ease-linear opacity-70" style={{ height: isChargingThisCard ? `${chargeProgress}%` : '0%', backgroundColor: theme.hex }}></div>
                  <div className={`absolute inset-0 transition-colors duration-700 ease-in-out ${isChargingThisCard ? 'bg-transparent' : 'bg-slate-950/60 group-hover:bg-slate-950/20'}`}></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center drop-shadow-2xl z-10 pointer-events-none">
                    <h3 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2 transition-colors duration-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] ${isChargingThisCard ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{theme.title}</h3>
                    {!isChargingThisCard ? ( <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 border border-current bg-slate-950/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-y-2 group-hover:translate-y-0" style={{ color: theme.glowHex }}>Hold to Pledge</span>
                    ) : ( <span className="text-[12px] font-black uppercase tracking-[0.3em] text-white mt-2 animate-pulse drop-shadow-lg bg-black/50 px-4 py-1 rounded-sm">Transferring {Math.floor(chargeProgress)}%</span> )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {voteStatus === 'confirming' && selectedRealm && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-md z-50 animate-in fade-in zoom-in-95 duration-500 ease-out p-6">
          <div className="max-w-2xl w-full bg-slate-900 border-y-2 p-8 md:p-12 text-center shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden transition-all duration-700 ease-in-out" style={{ borderTopColor: selectedRealm.hex, borderBottomColor: selectedRealm.hex }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2 transition-colors duration-700" style={{ backgroundColor: selectedRealm.hex }}></div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-8 relative z-10 drop-shadow-md">Final Protocol</h2>
            <div className="text-slate-300 text-sm md:text-base leading-relaxed mb-12 space-y-6 relative z-10 text-justify md:text-center px-4">
              <p>Identity <span className="text-white font-black font-mono tracking-widest bg-black/50 px-2 py-0.5">{user.name.toUpperCase()}</span>, the network awaits your command. You stand at the precipice, about to permanently bind your data signature to the <span className="font-black" style={{ color: selectedRealm.glowHex }}>{selectedRealm.title}</span> sector in the Global WSA Database.</p>
              <p className="text-red-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Warning: This action is irreversible. The network does not forgive errors.</p>
            </div>
            {isSyncing ? (
              <div className="flex flex-col items-center justify-center py-6 relative z-10 animate-in fade-in duration-300"><div className="w-12 h-12 border-4 border-slate-800 rounded-full animate-spin" style={{ borderTopColor: selectedRealm.hex }}></div><p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mt-6 animate-pulse font-mono">Writing to Global Database...</p></div>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
                <button onClick={cancelVote} className="w-full md:w-auto px-6 py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 ease-in-out cursor-pointer">Abort Connection</button>
                <button onClick={confirmVote} className="w-full md:w-auto px-8 py-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-slate-950 hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer border border-white/30" style={{ backgroundColor: selectedRealm.hex, boxShadow: `0 0 30px ${selectedRealm.hex}` }}>Execute Command</button>
              </div>
            )}
          </div>
        </div>
      )}
      {voteStatus === 'secured' && selectedRealm && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-sm z-60 animate-in fade-in duration-700 ease-out">
          <div className="border-4 md:border-8 border-current p-6 md:p-12 text-center -rotate-12 bg-slate-950/80 transition-all duration-700 ease-in-out" style={{ color: selectedRealm.glowHex, filter: `drop-shadow(0 0 50px ${selectedRealm.hex})` }}>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">Vote</h1><h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">Secured</h1>
          </div>
          <div className="mt-20 text-center flex flex-col items-center animate-in slide-in-from-bottom-8 duration-700 delay-300 ease-out">
            <div className="bg-black/50 border border-slate-800 px-6 py-4 mb-8 transition-all duration-700"><p className="text-white text-xs md:text-sm font-mono tracking-widest uppercase mb-3">Identity <span className="text-blue-400">{user.name}</span></p><p className="text-slate-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">Assigned Sector: <span style={{ color: selectedRealm.glowHex }}>{selectedRealm.title}</span></p></div>
            <p className="text-emerald-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-12 drop-shadow-md flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>Global Database Synced</p>
            <button onClick={() => { navigateTo(''); }} className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-[0.3em] px-8 py-4 border border-slate-800 hover:border-slate-500 bg-slate-950 transition-all duration-500 ease-in-out cursor-pointer">Return to Directory</button>
          </div>
        </div>
      )}
    </div>
  );
}