import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { ShieldAlert, Activity, Bug, CheckCircle2, AlertTriangle, Fingerprint, Microscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function OffTargetAnalysisPhase({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState<'intro' | 'scanning' | 'result'>('intro');
  const [timeLeft, setTimeLeft] = useState(15);
  const [activeMutations, setActiveMutations] = useState<number[]>([]);
  const [fixedCount, setFixedCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    let spawnInterval: NodeJS.Timeout;
    const gridSlots = Array.from({ length: 16 }, (_, i) => i);
    if (step === 'scanning') {
      timerInterval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setStep('result');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      spawnInterval = setInterval(() => {
        setActiveMutations(currentActive => {
          const availableSlots = gridSlots.filter(s => !currentActive.includes(s));
          if (availableSlots.length > 0) {
            const spawnCount = Math.floor(Math.random() * 2) + 1;
            const newMutations: number[] = [];
            for(let i=0; i<spawnCount; i++) {
               if(availableSlots.length > 0) {
                  const randIndex = Math.floor(Math.random() * availableSlots.length);
                  newMutations.push(availableSlots[randIndex]);
                  availableSlots.splice(randIndex, 1);
               }
            }
            newMutations.forEach(mut => {
              setTimeout(() => {
                setActiveMutations(current => {
                  if (current.includes(mut)) {
                    setMissedCount(m => m + 1);
                    return current.filter(m => m !== mut);
                  }
                  return current;
                });
              }, 1500);
            });
            return [...currentActive, ...newMutations];
          }
          return currentActive;
        });
      }, 1200);
    }
    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
    };
  }, [step]); 
  const handleFix = (slotIndex: number) => {
    if (activeMutations.includes(slotIndex)) {
      setActiveMutations(prev => prev.filter(m => m !== slotIndex));
      setFixedCount(f => f + 1);
    }
  };
  const getResultAssessment = () => {
    if (missedCount === 0) return { title: 'PERFEKTE INTEGRATION', desc: 'Keine Off-Target-Mutationen detektiert. Das Genom ist zu 100% stabil.', color: '#00f0ff' };
    if (missedCount <= 3) return { title: 'TOLERIERBARE ABWEICHUNG', desc: 'Leichte Genom-Instabilität. Mutationen liegen in nicht-kodierenden Bereichen (Introns).', color: '#ffaa00' };
    return { title: 'KRITISCHE SCHÄDEN', desc: 'Mehrere Off-Target-Schnitte in Exons. Stark erhöhtes Risiko für Onkogen-Aktivierung (Krebsrisiko).', color: '#ff0000' };
  };
  const result = getResultAssessment();
  const displaySlots = Array.from({ length: 16 }, (_, i) => i);
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center justify-center min-min-h-[85vh]"
    >
      <Card className="w-full glass border-[#00f0ff]/30 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 z-0" />
        <CardHeader className="border-b border-slate-700/50 bg-slate-900/90 z-10 relative">
          <div className="flex justify-between items-center">
             <CardTitle className="text-xl font-black tracking-widest text-[#00f0ff] flex items-center gap-2">
                <Microscope size={24} /> QUALITÄTSSICHERUNG: OFF-TARGET ANALYSE
             </CardTitle>
             <div className="px-3 py-1 bg-slate-800 rounded border border-slate-700 text-xs font-mono text-slate-400">
                FACHBEREICH: MOLEKULARBIOLOGIE
             </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-6 md:p-8 z-10 relative">
          <AnimatePresence mode="wait">
            {}
            {step === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                 <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0">
                       <ShieldAlert size={32} className="text-[#ff00e5]" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-2xl font-black text-white tracking-widest uppercase">Das Cas9-Risiko</h3>
                       <p className="text-sm font-mono text-slate-300 leading-relaxed">
                          CRISPR-Cas9 ist mächtig, aber nicht perfekt. Die <span className="text-[#00f0ff] font-bold">Guide-RNA (gRNA)</span> besitzt eine gewisse <em>Mismatch-Toleranz</em>. Das bedeutet, sie kann an DNA-Sequenzen binden, die der Zielsequenz nur ähneln. 
                       </p>
                       <p className="text-sm font-mono text-slate-300 leading-relaxed">
                          Schneidet die <span className="text-[#ff00e5] font-bold">Endonuklease (Cas9)</span> an diesen falschen Stellen, entstehen <strong className="text-white">Off-Target-Mutationen</strong>. Treffen diese Mutationen lebenswichtige Gene oder Tumor-Suppressor-Gene, kann dies zu schweren genetischen Defekten oder Krebs führen.
                       </p>
                    </div>
                 </div>
                 <div className="bg-[#ff00e5]/10 border border-[#ff00e5]/30 p-4 rounded-lg flex items-start gap-3 mt-6">
                    <Activity className="text-[#ff00e5] shrink-0 mt-1" />
                    <div>
                       <p className="text-xs font-bold text-[#ff00e5] tracking-widest uppercase">Gesetzliche Vorgabe (Global Health Board)</p>
                       <p className="text-sm text-slate-300 font-mono mt-1">
                          Vor der Zellteilung muss die DNA auf Fehlerschnitte gescannt werden. Isolieren Sie mutierte Sequenzen sofort. Sie haben 15 Sekunden Zeit, bevor die Zellteilung beginnt.
                       </p>
                    </div>
                 </div>
                 <div className="pt-6 flex justify-center">
                    <Button variant="sci-fi" size="lg" onClick={() => setStep('scanning')} className="border-[#ff00e5] text-[#ff00e5] hover:bg-[#ff00e5]/20">
                       DNA-Scan Starten <Bug className="ml-2 w-4 h-4" />
                    </Button>
                 </div>
              </motion.div>
            )}
            {}
            {step === 'scanning' && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="flex flex-col h-full space-y-6"
              >
                 {}
                 <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-center">
                       <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Zeit bis Zellteilung</p>
                       <p className={`text-3xl font-black font-mono ${timeLeft <= 5 ? 'text-[#ff0000] animate-pulse' : 'text-[#00f0ff]'}`}>
                          00:{timeLeft.toString().padStart(2, '0')}
                       </p>
                    </div>
                    <div className="flex gap-8 text-center">
                       <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gefixt</p>
                          <p className="text-2xl font-black font-mono text-[#00f0ff]">{fixedCount}</p>
                       </div>
                       <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Verfehlt</p>
                          <p className={`text-2xl font-black font-mono ${missedCount > 0 ? 'text-[#ff00e5]' : 'text-slate-400'}`}>{missedCount}</p>
                       </div>
                    </div>
                 </div>
                 {}
                 <div className="grid grid-cols-4 gap-3 md:gap-4 flex-1">
                    {displaySlots.map(slot => {
                       const isMutated = activeMutations.includes(slot);
                       return (
                          <button
                             key={slot}
                             onClick={() => handleFix(slot)}
                             className={`rounded-xl border h-20 md:h-24 flex flex-col items-center justify-center font-mono text-xs transition-colors duration-100 ${
                                isMutated 
                                  ? 'bg-[#ff00e5]/20 border-[#ff00e5] text-[#ff00e5] shadow-[0_0_15px_rgba(255,0,229,0.5)] cursor-crosshair' 
                                  : 'bg-slate-800/50 border-slate-700 text-slate-600 pointer-events-none'
                             }`}
                          >
                             {isMutated ? (
                                <>
                                   <Bug size={24} className="animate-bounce mb-1" />
                                   MUTATION
                                </>
                             ) : (
                                <>
                                   <Activity size={20} className="mb-1 opacity-20" />
                                   STABIL
                                </>
                             )}
                          </button>
                       )
                    })}
                 </div>
              </motion.div>
            )}
            {}
            {step === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center space-y-8 py-8"
              >
                 <div className="relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20%] border border-dashed rounded-full opacity-50" style={{ borderColor: result.color }} />
                    <div className="w-32 h-32 rounded-full flex items-center justify-center border-4 bg-slate-900" style={{ borderColor: result.color }}>
                       {missedCount === 0 ? <CheckCircle2 size={60} color={result.color} /> : <AlertTriangle size={60} color={result.color} />}
                    </div>
                 </div>
                 <div className="space-y-2 max-w-lg">
                    <h2 className="text-3xl font-black tracking-widest uppercase" style={{ color: result.color }}>
                       {result.title}
                    </h2>
                    <p className="text-slate-300 font-mono text-sm leading-relaxed">
                       {result.desc}
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Korrigierte Fehler</p>
                       <p className="text-2xl font-black text-[#00f0ff] font-mono">{fixedCount}</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Übersehene Fehler</p>
                       <p className="text-2xl font-black font-mono" style={{ color: missedCount > 0 ? '#ff00e5' : '#00f0ff' }}>{missedCount}</p>
                    </div>
                 </div>
                 {missedCount > 0 && (
                   <div className="bg-slate-800/50 border border-slate-600 p-4 rounded-lg max-w-lg text-left text-xs font-mono text-slate-400">
                     <span className="text-[#ff00e5] font-bold">ETHIK-LOG:</span> Die übersehenen Off-Target-Mutationen wurden von der Software protokolliert. Um rechtliche Konsequenzen zu vermeiden, wurden die Grenzwerte im Report nachträglich &quot;angepasst&quot;. Ein moralisch fragwürdiger Standard in der Industrie von 2045.
                   </div>
                 )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="bg-slate-900/90 p-6 flex justify-between items-center border-t border-slate-700/50 z-10 h-20">
           <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Fingerprint size={14} />
              DNA-Integrität geprüft
           </div>
           <AnimatePresence>
             {step === 'result' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Button variant="sci-fi" onClick={onNext} className="px-8" style={{ borderColor: result.color, color: result.color }}>
                    Prüfbericht signieren & Weiter <Activity className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
             )}
           </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}