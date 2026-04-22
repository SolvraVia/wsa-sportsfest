import React from 'react';
import { themeData } from '../data';

export default function HomeView({ activeRealm, isVotingOpen, handleMainCTA, triggerPortal }) {
  const scrollToSelection = () => {
    const element = document.getElementById('selection-grid');
    if(element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {!activeRealm && (
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-20">
          <div className="flex items-center justify-center gap-10 md:gap-16 mb-8 md:mb-12 w-full max-w-md md:max-w-lg mx-auto">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.3)] bg-black z-10 shrink-0 transition-transform duration-700 ease-in-out hover:scale-105">
              <img src="/images/cu-logo.jpg" alt="CU Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
            </div>
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-black z-10 shrink-0 transition-transform duration-700 ease-in-out hover:scale-105">
              <img src="/images/wsa-logo.jpg" alt="WSA Logo" className="w-full h-full object-contain mix-blend-screen p-1 md:p-2" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 border-y-2 border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-700 ease-in-out hover:border-slate-500">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[70px] md:text-[140px] font-black uppercase tracking-tighter pointer-events-none -rotate-12 whitespace-nowrap transition-all duration-1000 ease-in-out ${isVotingOpen ? 'text-white/5' : 'text-slate-500/5'}`}>{isVotingOpen ? 'VOTING LIVE' : 'RESULTS'}</div>
            <p className="text-blue-400 font-mono text-[9px] md:text-[10px] uppercase tracking-widest mb-4 relative z-10 flex items-center justify-center gap-3"><span className="w-8 h-px bg-blue-400/50 block transition-all duration-500 ease-in-out"></span>Working Scholars Association<span className="w-8 h-px bg-blue-400/50 block transition-all duration-500 ease-in-out"></span></p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)] mb-6 md:mb-8 relative z-10 transition-all duration-700 ease-in-out">Sports Fest 2026</h1>
            <div className="space-y-6 text-slate-300 text-sm md:text-base font-medium leading-relaxed mb-12 relative z-10 text-justify md:text-center px-2">
              <p className="transition-opacity duration-700 ease-in-out">What's up, Working Scholars? It's that time of the year again. We know you've been grinding hard in your classes and balancing your shifts, but it is almost time to trade the textbooks for sneakers. This year, Sports Fest isn't going to be just another intramural event—we are entirely reinventing the arena.</p>
              <p className="transition-opacity duration-700 ease-in-out delay-100">We are bringing the greatest fictional universes straight to the CU campus. We have narrowed it down to four legendary worlds, but we are leaving the final decision up to you. Will we be mastering the wilds of Pandora, sailing the treacherous Grand Line, wielding our Zanpakutos, or claiming our godly heritage at Camp Half-Blood?</p>
              {isVotingOpen ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 md:p-6 text-center shadow-inner relative overflow-hidden transition-all duration-500 ease-in-out hover:bg-emerald-900/30">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transition-all duration-500 ease-in-out"></div><p className="text-emerald-400 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-500">The time has come to choose your battlefield. Review the official faction breakdowns below and decide where your allegiance lies. The official voting portal is now strictly online and awaiting your command.</p>
                </div>
              ) : (
                <div className="bg-slate-900/50 border border-slate-700 p-5 md:p-6 text-center shadow-inner relative overflow-hidden transition-all duration-500 ease-in-out">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-500 transition-all duration-500 ease-in-out"></div><p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-500">The voting period has officially concluded. The Global Database has been locked. The final victor has been decided by the Working Scholars Association.</p>
                </div>
              )}
            </div>
            <button onClick={scrollToSelection} className="group flex flex-col items-center justify-center gap-3 mx-auto text-slate-500 hover:text-blue-400 transition-all duration-500 ease-in-out cursor-pointer relative z-10"><span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold font-mono transition-colors duration-500">Access Directory</span><div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:border-blue-400 transition-all duration-500 ease-in-out animate-bounce">↓</div></button>
          </div>
        </section>
      )}

      <section id="selection-grid" className={`relative z-10 min-h-screen flex flex-col items-center px-4 md:px-6 ${!activeRealm ? 'justify-center py-16 md:py-24' : 'pt-24 pb-20'}`}>
        <div className="w-full max-w-6xl">
          {!activeRealm ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-10 md:mt-0">
              <div className="text-center mb-12 md:mb-20 transition-all duration-700 ease-in-out"><p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center justify-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-sm animate-pulse"></span> System Database</p><h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">The Four Realms</h2><p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.2em]">Select sector to view classified Faction Intel</p></div>
              <div className="flex flex-col md:flex-row w-full h-auto md:h-150 gap-4 md:gap-6">
                {themeData.map((theme) => (
                  <div key={theme.id} onClick={() => triggerPortal(theme.id, theme.id)} className="group relative flex-1 min-h-75 md:min-h-0 md:hover:flex-3 transition-[flex] duration-700 ease-in-out overflow-hidden bg-slate-950 cursor-pointer border-y border-slate-800 hover:border-y-2 hover:border-current" style={{ color: theme.hex }}>
                    <img src={theme.image} alt={theme.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 md:scale-100 md:group-hover:scale-105 opacity-80 md:opacity-40 md:group-hover:opacity-100 filter grayscale md:group-hover:grayscale-0" />
                    <div className="absolute bottom-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" style={{ backgroundColor: theme.hex }}></div>
                    <div className="absolute inset-0 transition-opacity duration-700 ease-in-out" style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)' }}></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 text-white">
                      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter w-max drop-shadow-[0_2px_10px_rgba(0,0,0,1)] transition-all duration-500 ease-in-out">{theme.title}</h2>
                      <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-3 w-70 md:w-87.5">
                            <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 font-mono transition-all duration-500" style={{ color: theme.glowHex }}>// {theme.subtitle}</p>
                            <p className="text-[11px] md:text-sm text-slate-300 leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 ease-in-out delay-150 drop-shadow-lg">{theme.description}</p>
                            <div className="mt-6 inline-block px-5 py-2 border text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold bg-slate-950/80 backdrop-blur-sm group-hover:text-slate-950 transition-colors duration-500 ease-in-out" style={{ borderColor: theme.hex, color: theme.glowHex, '--tw-hover-bg': theme.hex }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.hex} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(2,6,23,0.8)'}>Access Factions →</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-20 md:mt-32 text-center pb-10">
                {isVotingOpen ? (
                  <div className="inline-block p-0.5 rounded-full bg-linear-to-r from-emerald-500 via-blue-500 to-purple-500 animate-pulse transition-all duration-700"><button onClick={handleMainCTA} className="block bg-slate-950 px-8 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] md:text-xs text-white hover:bg-slate-900 transition-colors duration-300 ease-in-out shadow-2xl cursor-pointer">Access Official Voting Terminal</button></div>
                ) : (
                  <div className="inline-block p-0.5 bg-slate-700 shadow-[0_0_20px_rgba(148,163,184,0.2)] transition-all duration-700"><button onClick={handleMainCTA} className="block bg-slate-950 px-10 py-5 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs text-slate-300 hover:bg-slate-900 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer">View Official Results</button></div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-10 md:mt-0 pb-20">
              <div className="flex flex-col items-center text-center mb-16 relative transition-all duration-700 ease-in-out">
                <button onClick={() => triggerPortal(null, activeRealm.id)} className="absolute top-0 left-0 text-slate-400 hover:text-white transition-all duration-300 ease-in-out text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 border-l-2 border-slate-700 hover:border-slate-400 bg-slate-900/50 cursor-pointer">← Return</button>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold font-mono mb-4 mt-12 md:mt-0 flex items-center gap-2 transition-colors duration-500" style={{ color: activeRealm.glowHex }}><span className="w-2 h-2 rounded-sm" style={{ backgroundColor: activeRealm.hex }}></span> Sector Intel</p>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-xl transition-all duration-500">{activeRealm.title}</h2>
                <div className="max-w-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 backdrop-blur-xl relative transition-all duration-500 ease-in-out">
                  <div className="absolute top-0 left-0 w-full h-1 transition-colors duration-500" style={{ backgroundColor: activeRealm.hex }}></div><p className="text-slate-300 text-xs md:text-sm leading-relaxed text-justify md:text-center transition-colors duration-500">{activeRealm.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeRealm?.factions?.map((faction, idx) => (
                  <div key={idx} className="bg-slate-900/80 backdrop-blur-md p-8 border-y border-slate-800 transition-all duration-500 ease-in-out group relative overflow-hidden hover:border-current" style={{ color: activeRealm.hex }}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 transition-colors duration-500" style={{ backgroundColor: activeRealm.hex }}></div>
                    <div className="w-16 h-16 rounded-none flex items-center justify-center mb-8 relative z-10 border border-slate-700 bg-slate-950 shadow-lg group-hover:scale-110 transition-all duration-700 ease-out" style={{ color: activeRealm.glowHex }}>{faction.icon}</div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 relative z-10 transition-colors duration-500">{faction.name}</h3>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] font-mono mb-6 relative z-10 bg-black/30 inline-block px-2 py-1 transition-colors duration-500" style={{ color: activeRealm.glowHex }}>Tactic: {faction.style}</p>
                    <p className="text-slate-400 text-xs leading-relaxed relative z-10 transition-colors duration-500">{faction.desc}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-24 text-center">
                {isVotingOpen ? (
                  <button onClick={handleMainCTA} className="inline-block border px-10 py-5 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs cursor-pointer transition-all duration-500 ease-in-out hover:scale-105 bg-slate-950/80 backdrop-blur-sm" style={{ borderColor: activeRealm.hex, color: activeRealm.glowHex, boxShadow: `0 0 30px rgba(${activeRealm.hex.replace('#', '').match(/.{2}/g).map(c=>parseInt(c,16)).join(',')}, 0.2)` }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = activeRealm.hex; e.currentTarget.style.color = '#020617'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(2,6,23,0.8)'; e.currentTarget.style.color = activeRealm.glowHex; }}>Proceed to Voting Terminal →</button>
                ) : (
                  <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em]">Voting is officially closed. Return to main menu to view results.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}