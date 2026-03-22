import React, { useState, useEffect } from 'react';
import { Fingerprint, Dna, ShieldAlert, Terminal, Lock, Unlock, Activity, Database, Server, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
export function IntroPhase({ onNext }: { onNext: () => void }) {
  const [bootSequence, setBootSequence] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  useEffect(() => {
    const timers = [
      setTimeout(() => setBootSequence(1), 800),
      setTimeout(() => setBootSequence(2), 2000),
      setTimeout(() => setBootSequence(3), 3500),
      setTimeout(() => setBootSequence(4), 5000),
      setTimeout(() => setBootSequence(5), 6500)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onNext();
    }, 2000);
  };
  return (
    <div className="w-full h-full min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 md:p-8">
      {}
      <Link 
        href="/quellen" 
        className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center gap-2 text-slate-600 hover:text-[#00f0ff] font-mono text-[10px] md:text-xs uppercase tracking-widest transition-colors opacity-60 hover:opacity-100"
      >
        <BookOpen size={14} />
        Quellen & Doku
      </Link>
      {}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 overflow-hidden">
         {}
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border border-slate-700/50 border-t-[#00f0ff]/80" />
         <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full border border-dashed border-slate-700/30 border-b-[#ff00e5]/50" />
         <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_70%)] blur-[40px]" />
      </div>
      {}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <AnimatePresence mode="wait">
        {}
        {bootSequence < 5 && (
          <motion.div 
            key="booting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center space-y-6 z-10 font-mono text-[#00f0ff] w-full max-w-2xl h-full"
          >
            <div className="relative">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-dashed border-[#00f0ff]/50 rounded-full" />
               <Terminal size={64} className="m-8 animate-pulse text-[#00f0ff]" />
            </div>
            <div className="text-xl md:text-2xl tracking-widest uppercase text-center h-8">
              {bootSequence === 0 && "LOADING BIOS_v9.4..."}
              {bootSequence === 1 && "DECRYPTING BLACKSITE DATA..."}
              {bootSequence === 2 && "BYPASSING GLOBAL ETHICS PROTOCOL..."}
              {bootSequence === 3 && <span className="text-[#ff00e5]">ESTABLISHING NEURAL LINK...</span>}
              {bootSequence === 4 && "SYNC COMPLETE."}
            </div>
            {}
            <div className="w-full max-w-md h-2 bg-slate-800 rounded-full overflow-hidden mt-8 border border-slate-700 p-0.5">
               <motion.div 
                 initial={{ width: "0%" }} 
                 animate={{ width: `${(bootSequence / 4) * 100}%` }} 
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className={`h-full rounded-full shadow-[0_0_15px_rgba(0,240,255,0.8)] \${bootSequence >= 3 ? 'bg-[#ff00e5]' : 'bg-[#00f0ff]'}`} 
               />
            </div>
            {}
            <div className="w-full max-w-md mt-8 text-[10px] text-slate-500 opacity-70 space-y-1 h-32 overflow-hidden text-left flex flex-col justify-end">
               {bootSequence >= 1 && <p> {'>'} Loading module: /sys/genetics/crispr_core.dll ... [OK]</p>}
               {bootSequence >= 2 && <p> {'>'} Warning: International Bio-Laws override detected.</p>}
               {bootSequence >= 2 && <p> {'>'} Connecting to Singapore offshore proxy ... [SECURE]</p>}
               {bootSequence >= 3 && <p className="text-[#ff00e5]"> {'>'} Vance_Family_Dossier_Class_S.enc loaded.</p>}
               {bootSequence >= 4 && <p className="text-[#00f0ff]"> {'>'} Waiting for biometric authorization...</p>}
            </div>
          </motion.div>
        )}
        {}
        {bootSequence >= 5 && !isUnlocking && (
          <motion.div 
            key="main"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
            exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-5xl z-10 relative mt-10 md:mt-0"
          >
            {}
            <div className="absolute top-[-20px] md:top-[-60px] left-0 right-0 flex justify-between w-full opacity-80 px-4">
               <div className="flex gap-2 items-center text-xs md:text-sm font-mono text-[#ff00e5] bg-[#ff00e5]/10 px-3 py-1 rounded border border-[#ff00e5]/30">
                 <ShieldAlert size={16} /> CLASSIFIED
               </div>
               <div className="flex gap-2 items-center text-xs md:text-sm font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded border border-[#00f0ff]/30">
                 <Server size={16} /> SECURE UPLINK
               </div>
            </div>
            {}
            <div className="relative flex flex-col items-center justify-center w-full my-12 md:my-20 group">
               {}
               <motion.div 
                 animate={{ rotateY: 360 }} 
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute z-0 text-[#00f0ff] opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                 style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
               >
                 <Dna size={220} strokeWidth={1.5} className="drop-shadow-[0_0_30px_rgba(0,240,255,0.8)]" />
               </motion.div>
               {}
               <div className="z-10 text-center relative flex flex-col items-center mt-8">
                 <h2 className="text-2xl md:text-3xl font-mono text-slate-300 tracking-[0.6em] mb-[-15px] md:mb-[-20px] ml-6 opacity-90 drop-shadow-md">PROJECT</h2>
                 <h1 className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-[#00f0ff] to-[#050A15] drop-shadow-[0_0_40px_rgba(0,240,255,0.5)] relative">
                   <span className="relative z-10">GENESIS</span>
                   {}
                   <span className="absolute top-0 left-[3px] -z-10 text-[#ff00e5] opacity-60 mix-blend-screen animate-pulse">GENESIS</span>
                   {}
                   <span className="absolute top-0 -left-[3px] -z-10 text-[#00f0ff] opacity-60 mix-blend-screen animate-pulse delay-100">GENESIS</span>
                 </h1>
                 <p className="mt-4 text-[#00f0ff] font-mono tracking-widest text-sm md:text-base bg-slate-900/80 px-4 py-1 rounded-full border border-[#00f0ff]/30">
                    MENSCHLICHE EVOLUTION v2.0
                 </p>
               </div>
            </div>
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                 className="w-full bg-[#0A101D]/80 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-l-4 border-l-[#ff00e5] relative overflow-hidden"
               >
                  <div className="absolute top-0 left-10 bottom-0 w-px bg-slate-800" />
                  <div className="relative z-10 pl-6 space-y-4">
                     <div className="absolute left-[-10px] top-1 bg-[#ff00e5] p-1.5 rounded shadow-[0_0_10px_#ff00e5]">
                        <Lock size={14} className="text-white" />
                     </div>
                     <h3 className="text-[#ff00e5] font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                        <Activity size={16} /> Direktive Alpha-Prime
                     </h3>
                     <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                        Willkommen, Leitender Genetiker. Sie wurden autorisiert, das menschliche Genom jenseits der natürlichen Evolution zu manipulieren. 
                     </p>
                     <p className="text-slate-400 font-mono text-xs leading-relaxed">
                        <strong className="text-white">ZIEL:</strong> Erschaffung eines überlegenen Embryos.<br/>
                        <strong className="text-[#ff00e5]">RISIKO:</strong> Globale ethische & politische Verwerfungen.
                     </p>
                  </div>
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
                 className="w-full bg-[#0A101D]/80 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-r-4 border-r-[#00f0ff] relative overflow-hidden flex flex-col justify-center items-center text-center"
               >
                  <Database size={30} className="text-[#00f0ff] mb-4 opacity-50" />
                  <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
                     Das System erwartet Ihre biometrische Signatur, um den Eingriff zu autorisieren. Sie übernehmen die volle rechtliche Verantwortung.
                  </p>
                  {}
                  <div className="flex flex-col items-center">
                     <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 240, 255, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUnlock}
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-900 border-2 border-[#00f0ff] flex items-center justify-center text-[#00f0ff] group overflow-hidden cursor-pointer"
                     >
                        <div className="absolute top-[-100%] w-full h-[50%] bg-gradient-to-b from-transparent to-[#00f0ff]/30 group-hover:animate-scan" />
                        <Fingerprint size={36} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                        <svg className="absolute inset-0 w-full h-full -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity">
                          <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#00f0ff" strokeWidth="3" strokeDasharray="289" strokeDashoffset="289" className="group-hover:animate-circle-fill" />
                        </svg>
                     </motion.button>
                     <p className="text-[#00f0ff] font-mono text-[10px] md:text-xs mt-4 tracking-[0.2em] uppercase animate-pulse">
                        System-Uplink bestätigen
                     </p>
                  </div>
               </motion.div>
            </div>
          </motion.div>
        )}
        {}
        {isUnlocking && (
          <motion.div 
            key="unlocking"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#00f0ff] mix-blend-screen"
          >
             <Unlock size={120} className="text-white mb-6 animate-bounce drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">ACCESS GRANTED</h2>
             <p className="text-white font-mono mt-4 text-xl tracking-widest">INITIALIZING PROJECT GENESIS...</p>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes circle-fill {
          0% { stroke-dashoffset: 289; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-circle-fill {
          animation: circle-fill 1.5s ease-out forwards;
        }
      `}} />
    </div>
  );
}