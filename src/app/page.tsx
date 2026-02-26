"use client";

import { useState } from "react";
import { IntroPhase } from "@/components/phases/IntroPhase";
import { WorldStatusPhase } from "@/components/phases/WorldStatusPhase";
import { PoliticsQuizPhase } from "@/components/phases/PoliticsQuizPhase";
import { ParentInterviewPhase } from "@/components/phases/ParentInterviewPhase";
import { LegalPuzzlePhase } from "@/components/phases/LegalPuzzlePhase";
import { EmbryoScreeningPhase } from "@/components/phases/EmbryoScreeningPhase";

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(0);

  const phases = [
    <IntroPhase key="intro" onNext={() => setCurrentPhase(1)} />,
    <WorldStatusPhase key="world" onNext={() => setCurrentPhase(2)} />,
    <PoliticsQuizPhase key="quiz" onNext={() => setCurrentPhase(3)} />,
    <ParentInterviewPhase key="interview" onNext={() => setCurrentPhase(4)} />,
    <LegalPuzzlePhase key="puzzle" onNext={() => setCurrentPhase(5)} />,
    <EmbryoScreeningPhase key="embryo" onNext={() => setCurrentPhase(6)} />,
    // Placeholders for the other 8 phases
    <div key="lab" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 7: Biology Lab</h2><button onClick={() => setCurrentPhase(7)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="offtarget" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 8: Off-Target Analysis</h2><button onClick={() => setCurrentPhase(8)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="ethics" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 9: Ethics Test</h2><button onClick={() => setCurrentPhase(9)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="media" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 10: Media Training</h2><button onClick={() => setCurrentPhase(10)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="design1" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 11: Designer - Phenotyp</h2><button onClick={() => setCurrentPhase(11)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="design2" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 12: Designer - Stats</h2><button onClick={() => setCurrentPhase(12)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="design3" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#00f0ff] mb-4 text-glow-cyan">Phase 13: Designer - Persönlichkeit</h2><button onClick={() => setCurrentPhase(13)} className="text-[#ff00e5] underline hover:text-[#ff00e5]/80">Nächste Sequenz einleiten</button></div>,
    <div key="result" className="text-center p-20 glass rounded-xl"><h2 className="text-4xl text-[#9d00ff] mb-4 glow-purple">Phase 14: Resultat</h2><p className="text-slate-400 animate-pulse">KI berechnet Zukunftssimulation...</p></div>,
  ];

  return (
    <main className="min-h-screen relative flex flex-col justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-[#0f172a] text-slate-100 font-sans">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 1) 100%)' }} />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00f0ff]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#9d00ff]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Progress Bar Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]" />
           <span className="text-xs uppercase tracking-widest text-[#00f0ff] font-bold">Genesis Protokoll</span>
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-lg mx-auto">
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700 relative">
             <div 
               className="h-full bg-gradient-to-r from-[#00f0ff] via-[#9d00ff] to-[#ff00e5] shadow-[0_0_10px_#ff00e5] transition-all duration-700 ease-out"
               style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
             />
          </div>
          <span className="text-xs text-slate-400 min-w-[60px] font-mono">PHASE {currentPhase + 1}/14</span>
        </div>
        <div className="text-xs text-slate-500 uppercase font-mono tracking-widest border border-slate-700 px-2 py-1 rounded bg-slate-800/50 shadow-inner">
           2045.SYS.ON
        </div>
      </header>

      {/* Phase Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
         {phases[currentPhase]}
      </div>
    </main>
  );
}