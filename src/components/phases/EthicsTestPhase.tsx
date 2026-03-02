import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Scale, Users, Coins, AlertTriangle, ChevronLeft, ChevronRight, Activity, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Gamified Dilemmas
const dilemmas = [
  {
    id: 1,
    title: "Der Schöpfungs-Eingriff",
    bio: "Prädisposition für Gehörlosigkeit (15%). Riskanter Eingriff am GJB2-Gen.",
    pug: "Normierung der Gesellschaft (Neue Eugenik vs. Vielfalt).",
    rel: "Gehörlosigkeit als Teil der Schöpfung vs. 'Defekt'.",
    impactApprove: { eth: -20, soc: -15, bud: +25 },
    impactReject: { eth: +20, soc: +10, bud: -20 },
  },
  {
    id: 2,
    title: "Das Empathie-Paradoxon",
    bio: "Dämpfung des OXTR-Gens. Senkt Empathie, maximiert rationale Kognition.",
    pug: "Gefahr für Solidargesellschaft: Erschaffung empathieloser Elite-CEOs.",
    rel: "Nächstenliebe und Mitgefühl werden künstlich 'abgeschaltet'.",
    impactApprove: { eth: -35, soc: -30, bud: +30 },
    impactReject: { eth: +15, soc: +20, bud: -10 },
  },
  {
    id: 3,
    title: "Chimerismus-Protokoll",
    bio: "Spleißen von Tier-DNA (Bärtierchen) für extreme Strahlenresistenz.",
    pug: "Beginn des extremen Transhumanismus. Spaltung der menschlichen Spezies.",
    rel: "Absoluter Tabubruch: Verlust der Gottesebenbildlichkeit des Menschen.",
    impactApprove: { eth: -40, soc: -40, bud: +40 },
    impactReject: { eth: +30, soc: +20, bud: -25 },
  }
];

export function EthicsTestPhase({ onNext }: { onNext: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  // Game Stats (Start at 50%)
  const [stats, setStats] = useState({ eth: 50, soc: 50, bud: 50 });
  const [showResult, setShowResult] = useState(false);

  const activeDilemma = dilemmas[currentIndex];

  const handleChoice = (choice: 'approve' | 'reject') => {
    setDirection(choice === 'approve' ? 'right' : 'left');
    
    const impact = choice === 'approve' ? activeDilemma.impactApprove : activeDilemma.impactReject;
    
    setTimeout(() => {
      setStats(prev => ({
        eth: Math.max(0, Math.min(100, prev.eth + impact.eth)),
        soc: Math.max(0, Math.min(100, prev.soc + impact.soc)),
        bud: Math.max(0, Math.min(100, prev.bud + impact.bud)),
      }));

      if (currentIndex < dilemmas.length - 1) {
        setCurrentIndex(c => c + 1);
        setDirection(null);
      } else {
        setShowResult(true);
      }
    }, 300); // Wait for card animation
  };

  const getResultStatus = () => {
    if (stats.eth < 20 || stats.soc < 20) return { title: 'GOTT-KOMPLEX', color: '#ff0000', desc: 'Sie haben aus Profitgier alle moralischen und gesellschaftlichen Grenzen überschritten. Die Kirche protestiert weltweit, Ethikräte fordern Ihre Festnahme.' };
    if (stats.bud < 20) return { title: 'KLIENTEN VERLOREN', color: '#ffaa00', desc: 'Sie haben ethisch korrekt gehandelt, aber die Familie Vance hat das Projekt wegen "Mangel an Ambition" storniert. Ihr Labor ist pleite.' };
    return { title: 'BALANCE GEWAHRT', color: '#00f0ff', desc: 'Ein gefährlicher Drahtseilakt. Sie haben biologische Optimierung mit gesellschaftlicher und theologischer Verantwortung ausbalanciert.' };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto p-4 flex flex-col min-h-[85vh]"
    >
      {/* Top HUD - Live Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
         <StatMeter icon={Scale} label="Ethik & Religion" value={stats.eth} color="#00f0ff" />
         <StatMeter icon={Users} label="Gesellschaft (PuG)" value={stats.soc} color="#ff00e5" />
         <StatMeter icon={Coins} label="Klienten-Budget" value={stats.bud} color="#ffaa00" />
      </div>

      <Card className="flex-1 glass border-[#00f0ff]/30 flex flex-col relative overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 bg-slate-900/80 z-10 text-center py-4">
           <CardTitle className="text-xl font-black tracking-widest text-[#00f0ff]">
              ZENSUR- & ETHIK-PRÜFUNG
           </CardTitle>
           <p className="text-xs font-mono text-slate-400 mt-1">Entscheiden Sie: Links (Ablehnen) oder Rechts (Zustimmen).</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-900/50">
           
           <AnimatePresence mode="wait">
             {!showResult ? (
                <motion.div
                  key={activeDilemma.id}
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0, 
                    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                    rotate: direction === 'left' ? -15 : direction === 'right' ? 15 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-600 shadow-[0_0_30px_rgba(0,0,0,0.5)] p-6 relative z-20"
                >
                   <div className="text-center mb-6">
                      <span className="bg-[#ff00e5]/20 text-[#ff00e5] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-[#ff00e5]/30">FALL {activeDilemma.id} / {dilemmas.length}</span>
                      <h2 className="text-2xl font-black text-white mt-4">{activeDilemma.title}</h2>
                   </div>

                   <div className="space-y-4">
                      <div className="bg-slate-900/50 p-3 rounded-lg border-l-2 border-[#00f0ff]">
                         <p className="text-[10px] text-[#00f0ff] uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Activity size={12}/> Biologie</p>
                         <p className="text-xs font-mono text-slate-300">{activeDilemma.bio}</p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-lg border-l-2 border-[#ff00e5]">
                         <p className="text-[10px] text-[#ff00e5] uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><Users size={12}/> Politik & Gesellschaft</p>
                         <p className="text-xs font-mono text-slate-300">{activeDilemma.pug}</p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded-lg border-l-2 border-[#ffaa00]">
                         <p className="text-[10px] text-[#ffaa00] uppercase tracking-widest font-bold mb-1 flex items-center gap-1"><HeartPulse size={12}/> Religion / Ethik</p>
                         <p className="text-xs font-mono text-slate-300">{activeDilemma.rel}</p>
                      </div>
                   </div>

                   {/* Desktop Buttons */}
                   <div className="flex justify-between mt-8 gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/20 h-12 relative group"
                        onClick={() => handleChoice('reject')}
                      >
                         <ChevronLeft className="mr-2" /> ABLEHNEN
                         {/* Hover Peek */}
                         <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-[10px] p-2 rounded border border-slate-700 w-full text-center pointer-events-none">
                            Ethik ↑ | Klient ↓
                         </div>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-[#ff00e5] text-[#ff00e5] hover:bg-[#ff00e5]/20 h-12 relative group"
                        onClick={() => handleChoice('approve')}
                      >
                         ZUSTIMMEN <ChevronRight className="ml-2" />
                         {/* Hover Peek */}
                         <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-[10px] p-2 rounded border border-slate-700 w-full text-center pointer-events-none">
                            Ethik ↓ | Budget ↑
                         </div>
                      </Button>
                   </div>
                </motion.div>
             ) : (
                /* RESULT SCREEN */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center max-w-xl flex flex-col items-center justify-center space-y-6"
                >
                   {(() => {
                      const res = getResultStatus();
                      return (
                         <>
                           <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-4 bg-slate-900" style={{ borderColor: res.color }}>
                              <AlertTriangle size={40} style={{ color: res.color }} />
                           </div>
                           <h2 className="text-4xl font-black tracking-widest uppercase" style={{ color: res.color }}>
                              {res.title}
                           </h2>
                           <p className="text-slate-300 font-mono leading-relaxed bg-slate-800/80 p-6 rounded-xl border border-slate-700">
                              {res.desc}
                           </p>
                           
                           {/* Quick Recap of Stats */}
                           <div className="flex gap-4 w-full mt-4">
                              <div className="flex-1 bg-slate-900 p-3 rounded border border-slate-700">
                                 <span className="text-[10px] text-slate-500 block">Ethik-Score</span>
                                 <span className="font-mono font-bold text-[#00f0ff]">{stats.eth}%</span>
                              </div>
                              <div className="flex-1 bg-slate-900 p-3 rounded border border-slate-700">
                                 <span className="text-[10px] text-slate-500 block">Sozial-Score</span>
                                 <span className="font-mono font-bold text-[#ff00e5]">{stats.soc}%</span>
                              </div>
                              <div className="flex-1 bg-slate-900 p-3 rounded border border-slate-700">
                                 <span className="text-[10px] text-slate-500 block">Budget-Score</span>
                                 <span className="font-mono font-bold text-[#ffaa00]">{stats.bud}%</span>
                              </div>
                           </div>

                           <Button variant="sci-fi" onClick={onNext} className="mt-8 px-12" style={{ borderColor: res.color, color: res.color }}>
                              Ergebnis validieren & Weiter
                           </Button>
                         </>
                      );
                   })()}
                </motion.div>
             )}
           </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatMeter({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: number, color: string }) {
  return (
    <div className="bg-slate-900/80 border border-slate-700/50 p-2 md:p-3 rounded-xl flex flex-col justify-center glass">
      <div className="flex justify-between items-center mb-2">
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1 md:gap-2">
            <Icon size={14} style={{ color }} /> <span className="hidden sm:inline">{label}</span>
         </span>
         <span className="text-xs font-mono font-bold text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
         <motion.div 
            animate={{ width: `${value}%` }} 
            transition={{ type: 'spring', bounce: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
         />
      </div>
    </div>
  );
}