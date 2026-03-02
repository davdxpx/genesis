import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Dna, Fingerprint, Activity, Beaker, CheckCircle2, Zap, Cpu, Search, CircleSlash, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// The mini-game sequence: Finding the right matching pairs for the guide-RNA
// User has to match Target DNA (e.g. A) with correct RNA (U), T -> A, C -> G, G -> C
const dnaSequence = ['A', 'T', 'G', 'C', 'A', 'T'];
const correctRnaSequence = ['U', 'A', 'C', 'G', 'U', 'A'];
const rnaOptions = ['A', 'U', 'C', 'G'];

export function BiologyLabPhase({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [userRna, setUserRna] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const [extractionProgress, setExtractionProgress] = useState(0);
  const [injectionProgress, setInjectionProgress] = useState(0);

  // Step 0: DNA Extraction Animation
  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(() => {
        setExtractionProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(1), 500);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Step 2: CRISPR Injection Animation
  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        setInjectionProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleRnaSelect = (base: string) => {
    if (base === correctRnaSequence[currentSlot]) {
      const newRna = [...userRna, base];
      setUserRna(newRna);
      if (currentSlot < dnaSequence.length - 1) {
        setCurrentSlot(s => s + 1);
      } else {
        setTimeout(() => setStep(2), 1000); // Sequence complete!
      }
    } else {
      setErrorCount(e => e + 1);
      // Brief red flash via CSS animation class logic
      const el = document.getElementById(`slot-${currentSlot}`);
      const dnaEl = document.getElementById(`dna-${currentSlot}`);
      if (el && dnaEl) {
        el.classList.add('animate-shake');
        dnaEl.classList.add('text-[#ff00e5]', 'animate-pulse');
        setTimeout(() => {
           el.classList.remove('animate-shake');
           dnaEl.classList.remove('text-[#ff00e5]', 'animate-pulse');
        }, 500);
      }
    }
  };

  const isComplete = injectionProgress === 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center justify-center min-h-[85vh]"
    >
      <Card className="w-full h-[80vh] glass border-[#00f0ff]/30 flex flex-col relative overflow-hidden">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-slate-900/60 z-0" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #00f0ff 0%, transparent 60%)' }} />
        
        <CardHeader className="border-b border-slate-700/50 bg-slate-900/80 z-10 relative">
          <div className="flex justify-between items-center">
             <CardTitle className="text-xl font-black tracking-widest text-[#00f0ff] flex items-center gap-2">
                <Beaker size={24} /> BIOLABOR: CRISPR-CAS9 SYNTHESE
             </CardTitle>
             <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                   <Activity size={14} className={step === 1 ? 'text-[#ff00e5] animate-pulse' : 'text-slate-500'} />
                   <span className={step === 1 ? 'text-[#ff00e5]' : ''}>GUIDE-RNA</span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-2">
                   <Zap size={14} className={step === 2 ? 'text-[#00f0ff] animate-pulse' : 'text-slate-500'} />
                   <span className={step === 2 ? 'text-[#00f0ff]' : ''}>INJEKTION</span>
                </div>
             </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 md:p-8 z-10 flex flex-col justify-center items-center relative overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">

            {/* STEP 0: EXTRACTION */}
            {step === 0 && (
              <motion.div 
                key="extraction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center w-full max-w-md space-y-8 text-center"
              >
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="relative">
                    <Dna size={80} className="text-[#00f0ff]" />
                 </motion.div>
                 <div>
                    <h3 className="text-2xl font-black text-white tracking-widest mb-2">ZYGOTEN-DNA EXTRAKTION</h3>
                    <p className="text-sm font-mono text-slate-400">Isoliere Ziel-Genom des ausgewählten Kandidaten...</p>
                 </div>
                 
                 <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700 p-0.5">
                    <motion.div 
                       className="h-full bg-gradient-to-r from-[#00f0ff] to-[#9d00ff] rounded-full"
                       style={{ width: `${extractionProgress}%`, boxShadow: '0 0 15px #00f0ff' }}
                    />
                 </div>
                 <p className="font-mono text-[#00f0ff] text-xl">{extractionProgress}%</p>
              </motion.div>
            )}

            {/* STEP 1: RNA SYNTHESIS MINIGAME */}
            {step === 1 && (
              <motion.div 
                key="rna"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col w-full max-w-3xl space-y-6"
              >
                 <div className="text-center space-y-2">
                    <h3 className="text-3xl font-black text-white tracking-widest flex items-center justify-center gap-3">
                       <Cpu className="text-[#ff00e5]" /> GUIDE-RNA DESIGN
                    </h3>
                    <p className="text-sm font-mono text-slate-400 max-w-lg mx-auto leading-relaxed">
                       Bilde den komplementären RNA-Strang zur vorliegenden Ziel-DNA. Wähle die passende Base für die <span className="text-[#00f0ff] font-bold">markierte Spalte</span>.
                    </p>
                    {errorCount > 0 && (
                       <p className="text-xs font-mono text-[#ff00e5] animate-pulse pt-2">Warnung: {errorCount} Fehlversuche detektiert. Genom-Instabilität steigt.</p>
                    )}
                 </div>

                 {/* BIOLOGY HELPER / CHEATSHEET */}
                 <div className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-lg p-4 mx-auto w-full max-w-lg">
                    <div 
                       className="flex items-center justify-between cursor-pointer"
                       onClick={() => setShowHint(!showHint)}
                    >
                       <p className="text-[#00f0ff] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                          <BookOpen size={16} /> Labor-Handbuch: Transkriptions-Regeln
                       </p>
                       <span className="text-[#00f0ff] font-mono text-xs">{showHint ? '[VERBERGEN]' : '[ANZEIGEN]'}</span>
                    </div>
                    {showHint && (
                       <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          className="mt-3 grid grid-cols-4 gap-2 text-center text-sm font-mono"
                       >
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded">
                             <span className="text-slate-400 text-xs block mb-1">DNA</span>
                             <strong className="text-white">A</strong> ➔ <strong className="text-[#ff00e5]">U</strong>
                          </div>
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded">
                             <span className="text-slate-400 text-xs block mb-1">DNA</span>
                             <strong className="text-white">T</strong> ➔ <strong className="text-[#ff00e5]">A</strong>
                          </div>
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded">
                             <span className="text-slate-400 text-xs block mb-1">DNA</span>
                             <strong className="text-white">C</strong> ➔ <strong className="text-[#ff00e5]">G</strong>
                          </div>
                          <div className="bg-slate-900 border border-slate-700 p-2 rounded">
                             <span className="text-slate-400 text-xs block mb-1">DNA</span>
                             <strong className="text-white">G</strong> ➔ <strong className="text-[#ff00e5]">C</strong>
                          </div>
                          <div className="col-span-4 text-left text-xs text-slate-400 mt-2">
                            *Hinweis: In der RNA wird Thymin (T) durch Uracil (U) ersetzt.
                          </div>
                       </motion.div>
                    )}
                 </div>

                 {/* The Sequence Matcher */}
                 <div className="flex flex-col space-y-6 bg-slate-900/80 p-6 md:p-8 rounded-xl border border-slate-700/50 relative overflow-hidden">
                    {/* DNA Row */}
                    <div className="flex justify-between items-center z-10">
                       <span className="text-[10px] md:text-xs font-mono text-slate-500 w-16 md:w-24">ZIEL-DNA</span>
                       <div className="flex gap-2 md:gap-4 flex-1 justify-center">
                          {dnaSequence.map((base, idx) => {
                             const isCurrent = idx === currentSlot;
                             return (
                               <div 
                                 key={`dna-${idx}`} 
                                 id={`dna-${idx}`}
                                 className={`w-10 h-12 md:w-14 md:h-16 flex flex-col items-center justify-center text-xl md:text-2xl font-black rounded border transition-all ${
                                    isCurrent 
                                      ? 'border-[#00f0ff] bg-slate-800 text-white shadow-[0_0_15px_#00f0ff] ring-2 ring-[#00f0ff] ring-offset-2 ring-offset-slate-900 scale-110 z-20' 
                                      : idx < currentSlot
                                        ? 'border-slate-600 bg-slate-800 text-slate-500' // Past
                                        : 'border-slate-600 bg-slate-800 text-slate-300' // Future
                                 }`}
                               >
                                  {base}
                               </div>
                             );
                          })}
                       </div>
                    </div>

                    {/* Connectors (Visual Links) */}
                    <div className="flex justify-between items-center z-10 opacity-70">
                       <span className="w-16 md:w-24"></span>
                       <div className="flex gap-2 md:gap-4 flex-1 justify-center">
                          {dnaSequence.map((_, idx) => (
                             <div key={`conn-${idx}`} className="w-10 md:w-14 flex justify-center">
                                <div className={`w-1 h-6 transition-all ${
                                   idx < currentSlot ? 'bg-[#00f0ff]' : idx === currentSlot ? 'bg-[#ff00e5] animate-pulse' : 'bg-slate-700'
                                }`} />
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* User RNA Row */}
                    <div className="flex justify-between items-center z-10">
                       <span className="text-[10px] md:text-xs font-mono text-[#ff00e5] w-16 md:w-24">NEUE RNA</span>
                       <div className="flex gap-2 md:gap-4 flex-1 justify-center">
                          {dnaSequence.map((_, idx) => {
                             const isFilled = idx < currentSlot;
                             const isCurrent = idx === currentSlot;
                             return (
                               <div 
                                 key={`rna-${idx}`} 
                                 id={`slot-${idx}`}
                                 className={`w-10 h-12 md:w-14 md:h-16 flex items-center justify-center text-xl md:text-2xl font-black rounded border transition-all duration-300 ${
                                    isFilled 
                                      ? 'border-[#00f0ff] bg-[#00f0ff]/20 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                                      : isCurrent 
                                        ? 'border-[#ff00e5] bg-[#ff00e5]/20 border-dashed animate-pulse text-transparent scale-110 z-20' 
                                        : 'border-slate-700/50 bg-transparent text-transparent'
                                 }`}
                               >
                                 {isFilled ? userRna[idx] : '?'}
                               </div>
                             );
                          })}
                       </div>
                    </div>
                    
                    {/* Active Target Indicator */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 w-full flex justify-center opacity-30 pointer-events-none">
                       <div className="h-40 w-16 bg-gradient-to-b from-[#00f0ff]/0 via-[#00f0ff]/50 to-[#ff00e5]/0" 
                            style={{ transform: `translateX(${(currentSlot - 2.5) * 60}px)` }} // Approximate sliding highlight
                       />
                    </div>
                 </div>

                 {/* Input Buttons */}
                 <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto w-full">
                    {rnaOptions.map(base => (
                       <button
                         key={base}
                         onClick={() => handleRnaSelect(base)}
                         className="h-16 md:h-20 rounded-xl border border-slate-600 bg-slate-800 text-3xl font-black text-white hover:bg-slate-700 hover:border-[#ff00e5] hover:text-[#ff00e5] hover:shadow-[0_0_20px_rgba(255,0,229,0.3)] transition-all duration-200 active:scale-95 flex flex-col items-center justify-center group"
                       >
                         {base}
                         <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#ff00e5]">
                           {base === 'A' ? 'Adenin' : base === 'U' ? 'Uracil' : base === 'C' ? 'Cytosin' : 'Guanin'}
                         </span>
                       </button>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* STEP 2: INJECTION */}
            {step === 2 && (
              <motion.div 
                key="injection"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center w-full max-w-lg space-y-8 text-center"
              >
                 <div className="relative w-40 h-40 flex items-center justify-center">
                    {isComplete ? (
                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring" }}>
                          <CheckCircle2 size={100} className="text-[#00f0ff] drop-shadow-[0_0_20px_#00f0ff]" />
                       </motion.div>
                    ) : (
                       <>
                          <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t-4 border-r-4 border-[#ff00e5] opacity-50" />
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border-b-4 border-l-4 border-[#00f0ff] opacity-80" />
                          <Search size={40} className="text-white animate-pulse" />
                       </>
                    )}
                 </div>

                 <div>
                    <h3 className={`text-3xl font-black tracking-widest mb-2 ${isComplete ? 'text-[#00f0ff]' : 'text-white'}`}>
                       {isComplete ? 'EDITIERUNG ERFOLGREICH' : 'INJIZIERE CAS9-PROTEIN'}
                    </h3>
                    <p className="text-sm font-mono text-slate-400 h-10">
                       {isComplete 
                         ? 'Die Zielsequenz wurde exakt modifiziert. Der Prometheus-Marker ist aktiv.' 
                         : 'Spalte Doppelhelix und integriere synthetische Sequenz...'}
                    </p>
                 </div>
                 
                 <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700 relative">
                    <motion.div 
                       className={`h-full rounded-full ${isComplete ? 'bg-[#00f0ff]' : 'bg-gradient-to-r from-[#ff00e5] to-[#00f0ff]'}`}
                       style={{ width: `${injectionProgress}%`, boxShadow: isComplete ? '0 0 20px #00f0ff' : '0 0 15px #ff00e5' }}
                    />
                    {/* Pulse overlay */}
                    {!isComplete && <div className="absolute inset-0 bg-white/20 animate-pulse" style={{ width: `${injectionProgress}%` }} />}
                 </div>

                 {!isComplete && (
                   <div className="flex items-center gap-2 text-xs font-mono text-[#ff00e5] bg-[#ff00e5]/10 px-3 py-1 rounded border border-[#ff00e5]/30">
                     <CircleSlash size={12} className="animate-spin" />
                     Spleißvorgang nicht unterbrechen
                   </div>
                 )}
              </motion.div>
            )}

          </AnimatePresence>
        </CardContent>

        <CardFooter className="bg-slate-900/80 p-6 flex justify-between items-center border-t border-slate-700/50 z-10 h-20">
           <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Fingerprint size={14} />
              Biolabor-ID: GENESIS-LAB-1
           </div>
           
           <AnimatePresence>
             {isComplete && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Button variant="sci-fi" onClick={onNext} className="px-8 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    Zur Off-Target Analyse <Zap className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
             )}
           </AnimatePresence>
        </CardFooter>

        {/* CSS for shake animation on wrong RNA pick */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px) rotate(-5deg); border-color: #ff00e5; color: #ff00e5; }
            50% { transform: translateX(5px) rotate(5deg); border-color: #ff00e5; color: #ff00e5; }
            75% { transform: translateX(-5px) rotate(-5deg); border-color: #ff00e5; color: #ff00e5; }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
            border-color: #ff00e5 !important;
            background-color: rgba(255,0,229,0.2) !important;
          }
        `}} />
      </Card>
    </motion.div>
  );
}