import React, { useState } from 'react';
import { VALID_WSA_NAMES, getDynamicUsers } from "../data";

export default function LoginView({ navigateTo, setUser }) {
  const [nameInput, setNameInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isAuthenticating) return; 
    
    const enteredName = nameInput.trim();
    if (enteredName.length < 2) return setLoginError("Please enter your full name.");

    const allValidNames = [...VALID_WSA_NAMES, ...getDynamicUsers()];

    if (!allValidNames.some((name) => name.toLowerCase() === enteredName.toLowerCase())) {
      return setLoginError("ACCESS DENIED: Unrecognized Data Signature.");
    }
    
    setIsAuthenticating(true); setLoginError('');
    
    setTimeout(() => {
      const exactName = allValidNames.find((name) => name.toLowerCase() === enteredName.toLowerCase());
      const newUser = { name: exactName };
      setUser(newUser); 
      localStorage.setItem('wsaVoter', JSON.stringify(newUser)); 
      
      if (exactName === 'Test User') {
        navigateTo('admin');
      } else {
        navigateTo('roster'); 
      }
      setIsAuthenticating(false);
    }, 800);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#030712]/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
        
        <button onClick={() => navigateTo('')} disabled={isAuthenticating} className="absolute top-6 left-6 text-slate-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
          <span>←</span> Cancel
        </button>
        
        <div className="text-center mt-6 mb-10">
          {/* REPLACED THE BLUE GLOW WITH THE OFFICIAL WSA LOGO */}
          <div className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 p-3 shadow-lg">
            <img src="/images/wsa-logo.jpg" alt="WSA Logo" className="w-full h-full object-contain mix-blend-screen" />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Secure Link</h2>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-mono">Identity Verification</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="flex items-baseline justify-between mb-3 px-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Target Identity</label>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-mono">Format: (Surname) (Given)</span>
            </div>
            <input 
              type="text" 
              placeholder="Ex: Dela Cruz Juan" 
              value={nameInput} 
              onChange={(e) => setNameInput(e.target.value)} 
              disabled={isAuthenticating} 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors uppercase tracking-wider placeholder-slate-600"
            />
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl py-3 px-4 flex items-center gap-3">
              <span className="text-red-400 text-sm">⚠</span>
              <p className="text-red-300 text-[9px] uppercase tracking-widest font-bold font-mono">{loginError}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isAuthenticating} 
            className="w-full text-white font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-3"
          >
            {isAuthenticating ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>) : ("Authenticate")}
          </button>
        </form>
      </div>
    </div>
  );
}