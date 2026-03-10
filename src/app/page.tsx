"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroPhase } from "@/components/phases/IntroPhase";
import { WorldStatusPhase } from "@/components/phases/WorldStatusPhase";
import { PoliticsQuizPhase } from "@/components/phases/PoliticsQuizPhase";
import { ParentInterviewPhase } from "@/components/phases/ParentInterviewPhase";
import { LegalPuzzlePhase } from "@/components/phases/LegalPuzzlePhase";
import { EmbryoScreeningPhase } from "@/components/phases/EmbryoScreeningPhase";
import { BiologyLabPhase } from "@/components/phases/BiologyLabPhase";
import { OffTargetAnalysisPhase } from "@/components/phases/OffTargetAnalysisPhase";
import { EthicsTestPhase } from "@/components/phases/EthicsTestPhase";
import { MediaTrainingPhase } from "@/components/phases/MediaTrainingPhase";
import { BabyDesignerPhenotypePhase } from "@/components/phases/BabyDesignerPhenotypePhase";
import { BabyDesignerStatsPhase } from "@/components/phases/BabyDesignerStatsPhase";
import { BabyDesignerPsychologyPhase } from "@/components/phases/BabyDesignerPsychologyPhase";
import { ResultPhase } from "@/components/phases/ResultPhase";
import { Terminal, Cpu, Network, Shield, Fingerprint, Activity, Database, Server, Zap, Radio, Menu, X } from "lucide-react";

// Sidebar Pipeline Definitions
const pipelineSteps = [
  { id: 0, name: "SYS_INIT", icon: Terminal },
  { id: 1, name: "GEO_SCAN", icon: Network },
  { id: 2, name: "AUTH_REQ", icon: Shield },
  { id: 3, name: "CLIENT_IO", icon: Fingerprint },
  { id: 4, name: "LOC_SELECT", icon: Server },
  { id: 5, name: "PID_SCREEN", icon: Database },
  { id: 6, name: "CRISPR_LAB", icon: Activity },
  { id: 7, name: "QA_CHECK", icon: Zap },
  { id: 8, name: "ETHICS_EVAL", icon: Activity }, 
  { id: 9, name: "PR_CONTROL", icon: Radio },
  { id: 10, name: "PHENOTYPE", icon: Cpu },
  { id: 11, name: "ATTRIBUTES", icon: Cpu },
  { id: 12, name: "PSYCHE", icon: Cpu },
  { id: 13, name: "PROGNOSIS", icon: Database },
];

export default function Home() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [sysTime, setSysTime] = useState("");
  const [hexStream, setHexStream] = useState("0x0000");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  
  // GLOBAL GAME STATE FOR PERSISTENCE
  const [gameState, setGameState] = useState({
     budget: 100, trust: 50, // Starts with standard budget
     selectedEmbryo: null,
     finalStats: { int: 100, phy: 100, imm: 100, life: 100 },
     psychology: { empathy: 50, ambition: 50, resilience: 50 }
  });

  const updateGameState = (newData: Record<string, unknown>) => {
     setGameState(prev => ({ ...prev, ...newData }));
  };

  const handleRestart = () => {
    setGameState({
      budget: 100, trust: 50,
      selectedEmbryo: null,
      finalStats: { int: 100, phy: 100, imm: 100, life: 100 },
      psychology: { empathy: 50, ambition: 50, resilience: 50 }
    });
    setCurrentPhase(0);
  };

  // Glitchy Hex Stream & Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setSysTime(`${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${Math.floor(d.getMilliseconds()/100)}`);
      
      if (Math.random() > 0.5) {
        setHexStream("0x" + Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0'));
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const phases = [
    <IntroPhase key="intro" onNext={() => setCurrentPhase(1)} />,
    <WorldStatusPhase key="world" onNext={() => setCurrentPhase(2)} />,
    <PoliticsQuizPhase key="quiz" onNext={() => setCurrentPhase(3)} />,
    <ParentInterviewPhase key="interview" onNext={() => setCurrentPhase(4)} />,
    <LegalPuzzlePhase key="puzzle" onNext={() => setCurrentPhase(5)} />,
    <EmbryoScreeningPhase key="embryo" onNext={() => setCurrentPhase(6)} />,
    <BiologyLabPhase key="lab" onNext={() => setCurrentPhase(7)} />,
    <OffTargetAnalysisPhase key="offtarget" onNext={() => setCurrentPhase(8)} />,
    <EthicsTestPhase key="ethics" onNext={() => setCurrentPhase(9)} />,
    <MediaTrainingPhase key="media" onNext={() => setCurrentPhase(10)} gameState={{...gameState, updateGameState}} />,
    <BabyDesignerPhenotypePhase key="pheno" onNext={() => setCurrentPhase(11)} />,
    <BabyDesignerStatsPhase key="stats" onNext={() => setCurrentPhase(12)} gameState={{...gameState, updateGameState}} />,
    <BabyDesignerPsychologyPhase key="psyche" onNext={() => setCurrentPhase(13)} gameState={{...gameState, updateGameState}} />,
    <ResultPhase key="result" gameState={gameState} onRestart={handleRestart} />
  ];

  return (
    <div className="flex min-h-[100dvh] w-full bg-[#050A15] text-slate-100 font-sans overflow-x-hidden overflow-y-auto relative selection:bg-[#00f0ff]/30">
      
      {/* --- GLOBAL IMMERSIVE BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />
      <div className="absolute inset-0 pointer-events-none z-40 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00f0ff]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#9d00ff]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* --- SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
           <motion.aside 
             initial={{ x: '-100%' }}
             animate={{ x: 0 }}
             exit={{ x: '-100%' }}
             transition={{ type: "spring", bounce: 0, duration: 0.4 }}
             className="absolute md:relative left-0 top-0 bottom-0 w-64 flex flex-col border-r border-slate-800/80 bg-[#0A101D]/95 backdrop-blur-xl z-50 shadow-[20px_0_50px_rgba(0,0,0,0.5)]"
           >
             <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3 text-[#00f0ff]">
                   <Activity className="animate-pulse" />
                   <span className="font-black tracking-widest text-lg text-glow-cyan">GENESIS OS</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white p-1 rounded bg-slate-800/50 md:hidden">
                   <X size={20} />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-1 relative">
                <div className="absolute left-[33px] top-10 bottom-10 w-px bg-slate-800" />
                
                {pipelineSteps.map((step, idx) => {
                   const isActive = currentPhase === idx;
                   const isPast = currentPhase > idx;

                   return (
                      <div key={step.id} className="relative flex items-center gap-4 py-2 group">
                         <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                            isActive ? 'bg-[#00f0ff] border-[#00f0ff] shadow-[0_0_10px_#00f0ff]' : 
                            isPast ? 'bg-slate-800 border-[#ff00e5]' : 'bg-[#0A101D] border-slate-700'
                         }`}>
                            {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                         </div>
                         <span className={`font-mono text-xs tracking-wider transition-all duration-300 ${
                            isActive ? 'text-white font-bold translate-x-1' : 
                            isPast ? 'text-[#ff00e5] opacity-80' : 'text-slate-500'
                         }`}>
                            {step.name}
                         </span>
                      </div>
                   )
                })}
             </div>

             <div className="p-6 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 space-y-1">
                <p>USER: L.GENETICIST</p>
                <p>CLEARANCE: LEVEL 5</p>
                <p className="text-[#ff00e5]">{hexStream}</p>
             </div>
           </motion.aside>
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col relative z-20 w-full">
         
         <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800/80 bg-[#0A101D]/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                 className={`p-2 rounded transition-colors flex items-center gap-2 ${isSidebarOpen ? 'bg-slate-800 text-white' : 'bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/20'}`}
               >
                  <Menu size={18} />
                  <span className="hidden sm:block text-xs font-bold tracking-widest">PIPELINE</span>
               </button>

               <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  REC_ACTIVE
               </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                  <p className="text-[#00f0ff] font-mono text-xs tracking-widest">PHASE {currentPhase + 1} / 14</p>
                  <p className="text-slate-500 font-mono text-[10px] uppercase">{pipelineSteps[currentPhase]?.name}</p>
               </div>
               <div className="bg-slate-900 border border-slate-700 px-3 md:px-4 py-1.5 rounded-lg text-[#ff00e5] font-mono text-sm tracking-wider shadow-[inset_0_0_10px_rgba(255,0,229,0.1)]">
                  {sysTime}
               </div>
            </div>
         </header>

         <div className="flex-1 overflow-y-auto custom-scrollbar relative p-2 md:p-8 flex flex-col items-center">
            
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00f0ff]/50 pointer-events-none hidden lg:block" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00f0ff]/50 pointer-events-none hidden lg:block" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00f0ff]/50 pointer-events-none hidden lg:block" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00f0ff]/50 pointer-events-none hidden lg:block" />

            <div className="w-full max-w-7xl mx-auto flex flex-col justify-start md:justify-center py-4 min-h-full">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={currentPhase}
                     initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                     animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                     exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                     className="w-full flex-1 flex flex-col justify-start"
                  >
                     {phases[currentPhase]}
                  </motion.div>
               </AnimatePresence>
            </div>

         </div>

      </main>
    </div>
  );
}