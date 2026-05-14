import React from 'react';

export default function HomeView({ navigateTo }) {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center px-4 md:px-6 text-center py-20 min-h-[80vh]">
      
      {/* Glowing Ambient Core behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex items-center justify-center gap-8 mb-12 w-full max-w-lg mx-auto relative z-10">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl shrink-0 transition-transform duration-500 hover:-translate-y-2 p-3">
          <img src="/images/cu-logo.jpg" alt="CU Logo" className="w-full h-full object-contain mix-blend-screen" />
        </div>
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl shrink-0 transition-transform duration-500 hover:-translate-y-2 p-3">
          <img src="/images/wsa-logo.jpg" alt="WSA Logo" className="w-full h-full object-contain mix-blend-screen" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <p className="text-blue-400 font-mono text-xs md:text-sm uppercase tracking-[0.4em] mb-4 font-semibold">
          Working Scholars Association
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 drop-shadow-xl">
          Sports Fest '26
        </h1>
        
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 mt-10 shadow-2xl text-slate-300 text-sm md:text-base leading-relaxed text-center px-4 md:px-12">
          <p className="mb-6">
            The network has spoken. Voting is officially closed, and the arena has been set. This year, Capitol University is setting sail for the greatest fictional waters.
          </p>
          
          <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl text-center">
            <p className="text-blue-300 font-bold uppercase tracking-widest text-sm md:text-base">
              Welcome to the Grand Line.
            </p>
            <p className="text-slate-400 font-mono text-[10px] mt-3 tracking-widest leading-loose">
              The System Bot has finished compiling the official rosters. Authenticate your identity below to access the databank and find your assigned pirate crew.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigateTo('roster')} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:-translate-y-1"
          >
            Access Official Roster Hub
          </button>
        </div>
      </div>
    </section>
  );
}