import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { themeData } from "../data";

export default function ResultsView({ navigateTo }) {
  const [isSyncing, setIsSyncing] = useState(true);
  const [finalResults, setFinalResults] = useState(null);
  const [totalVotesCast, setTotalVotesCast] = useState(0);

  // LOOP-FREE DATA FETCH
  useEffect(() => {
    let mounted = true;
    let timeoutId;
    
    const fetchResults = async () => {
      setIsSyncing(true);

      // Failsafe: Kill loading after 3 seconds if blocked
      timeoutId = setTimeout(() => {
        if (mounted) {
          setFinalResults({ avatar: 0, onepiece: 0, bleach: 0, percy: 0 });
          setTotalVotesCast(0);
          setIsSyncing(false);
        }
      }, 3000);

      try {
        const querySnapshot = await getDocs(collection(db, "wsa_votes"));
        clearTimeout(timeoutId); 

        let tallies = { avatar: 0, onepiece: 0, bleach: 0, percy: 0 };
        let total = 0;
        
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (tallies[data.realmId] !== undefined) { tallies[data.realmId]++; total++; }
        });

        if (mounted) { 
          setFinalResults(tallies); 
          setTotalVotesCast(total); 
          setIsSyncing(false); 
        }
      } catch (error) {
        clearTimeout(timeoutId);
        if (mounted) { 
          setFinalResults({ avatar: 0, onepiece: 0, bleach: 0, percy: 0 }); 
          setTotalVotesCast(0); 
          setIsSyncing(false); 
        }
      }
    };

    fetchResults();
    return () => { mounted = false; clearTimeout(timeoutId); };
  }, []); 

  const sortedThemes = finalResults ? [...themeData].sort((a, b) => finalResults[b.id] - finalResults[a.id]) : themeData;
  const maxVotes = finalResults ? Math.max(...sortedThemes.map(t => finalResults[t.id] || 0)) : 100;

  return (
    <div className="absolute inset-0 z-50 bg-[#020202] text-slate-50 font-sans min-h-screen w-full flex flex-col justify-between overflow-hidden">
      
      {/* TECH BACKGROUND: Cybernetic Blueprint Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15] z-0"
        style={{ 
          backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      ></div>
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #020202 90%)' }}></div>

      {/* TECH HUD HEADER */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-50">
         <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-3">
           <span className="text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">WSA // SYSTEM.OVERRIDE</span>
           <span className="text-[8px] font-mono tracking-widest text-slate-500">DATABANK: RESULTS_TALLY_FINAL</span>
         </div>
         <button 
           onClick={() => navigateTo('')} 
           className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-mono border border-slate-700 bg-slate-900/50 hover:bg-slate-800 px-4 py-2 transition-colors cursor-pointer"
           style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
         >
           [ TERMINATE_CONNECTION ]
         </button>
      </div>

      <div className="w-full text-center mt-24 z-50">
         <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
           Final Extraction
         </h2>
         <div className="inline-flex items-center gap-4 mt-4 border border-slate-700 bg-black/50 px-6 py-2">
            <span className="w-2 h-2 bg-blue-500 animate-pulse"></span>
            <p className="text-slate-300 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] m-0">
              {totalVotesCast} Valid Signatures
            </p>
         </div>
      </div>

      {isSyncing || !finalResults ? (
        <div className="flex-1 flex flex-col items-center justify-center z-10">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-2 border-slate-800 rounded-none animate-spin" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
            <div className="absolute inset-2 border-2 border-blue-500 rounded-none animate-[spin_2s_linear_reverse_infinite]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mt-8 animate-pulse font-mono">Decrypting Database...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-row items-end justify-center gap-4 md:gap-12 w-full max-w-7xl mx-auto px-4 pb-10 z-10">
          
          {sortedThemes.map((theme, index) => {
            const votes = finalResults[theme.id] || 0;
            const percentage = totalVotesCast > 0 ? Math.round((votes / totalVotesCast) * 100) : 0;
            const isWinner = index === 0 && votes > 0 && totalVotesCast > 0;
            
            // FIX: Minimum height set to 50% so data is NEVER cut off, even if they have 0 votes.
            const relativeHeight = maxVotes > 0 ? Math.max(50, Math.round((votes / maxVotes) * 90)) : 50;

            return (
              <div key={theme.id} className="w-28 md:w-60 flex flex-col items-center justify-end relative group" style={{ height: '60vh' }}>
                
                {/* FLOATING CHARACTER ASSET */}
                <div 
                  className={`absolute bottom-full -mb-5 w-32 h-40 md:w-56 md:h-64 z-30 flex items-end justify-center transition-all duration-1000 
                  ${isWinner ? 'scale-110 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]' : 'opacity-30 filter grayscale sepia brightness-50'}`}
                >
                  {/* FIX: onError hides the broken image alt text if network fails */}
                  <img 
                    src={theme.characterAsset} 
                    alt={theme.title} 
                    onError={(e) => e.target.style.display = 'none'}
                    className="max-w-full max-h-full object-contain object-bottom relative z-10" 
                  />
                  
                  {isWinner && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 z-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)' }}></div>
                  )}
                </div>

                {/* SHARP EDGE TECH PILLAR */}
                <div 
                   className={`relative w-full flex flex-col items-center justify-start pt-8 transition-all duration-1000 ease-out z-20
                     ${isWinner ? 'bg-[#0a0a0a]' : 'bg-[#050505]'}`}
                   style={{ 
                     height: `${relativeHeight}%`, 
                     borderTop: `2px solid ${isWinner ? theme.hex : '#334155'}`,
                     borderBottom: `4px solid ${isWinner ? theme.hex : '#1e293b'}`,
                     clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
                     boxShadow: isWinner ? `inset 0 40px 60px -20px ${theme.hex}40` : 'inset 0 10px 20px -10px rgba(0,0,0,0.9)'
                   }}
                >
                   
                   {/* INTERNAL SCANLINES - Dropped opacity so text is readable */}
                   <div 
                     className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
                     style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #fff 2px, #fff 4px)' }}
                   ></div>

                   {/* WINNER: Glowing Core */}
                   {isWinner && (
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t to-transparent opacity-30 z-0" style={{ from: theme.hex }}></div>
                   )}

                   {/* LOSER: Disconnected Node Styling */}
                   {!isWinner && (
                      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex items-center justify-center">
                        <div className="w-full border-t border-dashed border-slate-700 -rotate-45"></div>
                        <div className="w-full border-t border-dashed border-slate-700 rotate-45 absolute"></div>
                      </div>
                   )}

                   {/* TEXT DATA OVERLAY (FIXED READABILITY) */}
                   <div className="relative z-50 flex flex-col items-center text-center w-full mt-2 h-full px-2 pb-4">
                      
                      {/* Tactical Winner Badge */}
                      {isWinner ? (
                        <div 
                          className="mb-4 px-3 py-1 bg-black text-[8px] md:text-[10px] font-black tracking-widest uppercase" 
                          style={{ color: theme.glowHex, borderLeft: `2px solid ${theme.hex}`, borderRight: `2px solid ${theme.hex}` }}
                        >
                          [ PRIME_NODE ]
                        </div>
                      ) : (
                        <div className="mb-4 px-3 py-1 text-[7px] md:text-[8px] font-mono tracking-widest text-slate-400 uppercase border border-slate-700 bg-[#0a0a0a]">
                          SEVERED
                        </div>
                      )}

                      {/* FIX: Brightened loser text */}
                      <h3 className={`text-xs md:text-xl font-black uppercase tracking-[0.2em] ${isWinner ? 'text-white' : 'text-slate-300'}`}>
                        {theme.title}
                      </h3>
                      
                      {/* FIX: Gave the number a solid background so it blocks scanline noise */}
                      <div className="mt-4 w-full py-4 border-y border-slate-700 bg-[#0a0a0a] relative">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-500"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-500"></div>
                        
                        <p 
                          className={`text-4xl md:text-7xl font-black font-mono tracking-tighter ${isWinner ? 'text-white' : 'text-slate-200'}`} 
                          style={{ filter: isWinner ? `drop-shadow(0 0 10px ${theme.hex}80)` : 'none' }}
                        >
                          {votes}
                        </p>
                      </div>
                      
                      <p className={`text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-mono mt-3 ${isWinner ? 'text-white/70' : 'text-slate-500'}`}>
                        Total Output
                      </p>

                      {/* FIX: Percentage is now ALWAYS rendered, placed perfectly at the bottom */}
                      <div className="mt-auto w-full flex flex-col md:flex-row justify-between items-center md:items-end px-2 pt-4 border-t border-slate-800">
                        <p className="text-[6px] md:text-[8px] text-slate-500 uppercase tracking-[0.3em] font-mono text-center md:text-left mb-1 md:mb-0">Network<br/>Share</p>
                        <p className={`text-xl md:text-3xl font-black font-mono tracking-tighter text-center md:text-right ${isWinner ? 'text-white' : 'text-slate-300'}`}>
                           {percentage}%
                        </p>
                      </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}