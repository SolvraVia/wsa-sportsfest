import React, { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { VALID_WSA_NAMES } from "../data";

export default function LoginView({ isVotingOpen, navigateTo, setUser }) {
  const [nameInput, setNameInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isVotingOpen || isAuthenticating) return; 
    const enteredName = nameInput.trim();
    if (enteredName.length < 2) return setLoginError("Please enter your full name.");
    if (!VALID_WSA_NAMES.some((name) => name.toLowerCase() === enteredName.toLowerCase())) return setLoginError("ACCESS DENIED: Unrecognized Member.");
    
    setIsAuthenticating(true); setLoginError('');
    try {
      const exactName = VALID_WSA_NAMES.find((name) => name.toLowerCase() === enteredName.toLowerCase());
      const docSnap = await getDoc(doc(db, "wsa_votes", exactName));
      const newUser = { name: exactName, votedRealm: docSnap.exists() ? docSnap.data().realmId : null };
      setUser(newUser); localStorage.setItem('wsaVoter', JSON.stringify(newUser)); navigateTo('voting'); 
    } catch (error) { setLoginError("SYSTEM ERROR."); } finally { setIsAuthenticating(false); }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-y-2 border-slate-700 p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500/50"></div><div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/50"></div><div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/50"></div><div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500/50"></div>
        <button onClick={() => navigateTo('')} disabled={isAuthenticating} className={`absolute -top-12 left-0 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${isAuthenticating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}><span>←</span> Abort Sequence</button>
        <div className="text-center mt-2 mb-10 relative">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Terminal Access</h2>
          <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-widest">Identity Verification</p>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500/50 blur-sm rounded-full"></div>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between mb-2 pl-1 pr-1"><label className="block text-xs font-bold uppercase tracking-widest text-slate-300">Target Identity</label><span className="text-[9px] font-bold text-blue-400/80 uppercase tracking-widest font-mono">Format: (Surname) (Given Name)</span></div>
            <div className="relative group">
              <input type="text" placeholder="Ex: Dela Cruz Juan" value={nameInput} onChange={(e) => setNameInput(e.target.value)} disabled={isAuthenticating} className={`w-full bg-slate-950/50 border border-slate-700 rounded-none px-4 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all duration-500 uppercase tracking-wider ${isAuthenticating ? 'opacity-50 cursor-not-allowed' : ''}`} />
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 group-focus-within:w-full transition-all duration-500 ease-out"></div>
            </div>
          </div>
          {loginError && (<div className="bg-red-950/50 border-l-4 border-red-500 py-3 px-4 flex items-start gap-3"><span className="text-red-500 text-sm mt-0.5">⚠</span><p className="text-red-400 text-[10px] uppercase tracking-widest font-bold font-mono leading-relaxed">{loginError}</p></div>)}
          <button type="submit" disabled={isAuthenticating} className={`w-full text-white font-black uppercase tracking-[0.2em] py-5 shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 border border-blue-400/50 flex items-center justify-center gap-3 ${isAuthenticating ? 'bg-slate-800 text-slate-400 cursor-not-allowed border-slate-600' : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98] cursor-pointer'}`}>
            {isAuthenticating ? (<><div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>Verifying Database...</>) : ("Initiate Handshake")}
          </button>
        </form>
      </div>
    </div>
  );
}