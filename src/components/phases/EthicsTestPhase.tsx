import React, { useState } from 'react';
import { RolePopup } from "../ui/RolePopup";
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Scale, Heart, AlertTriangle, Fingerprint, Cross, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const dilemmas = [
  {
    id: 1,
    title: "Die Gottesebenbildlichkeit (Imago Dei)",
    bio: "CRISPR-Eingriff zur massiven Erhöhung der Muskelmasse und Körpergröße über das menschliche Limit hinaus.",
    rel: "Gefährdet die künstliche 'Aufwertung' des Menschen unsere Gottesebenbildlichkeit? Sind wir Schöpfer oder Geschöpf?",
    options: [
      { text: "Ja, der Mensch maßt sich an, Gott zu spielen (Hubris).", ethScore: +30, msg: "Die christliche Ethik warnt vor der Selbstvergottung." },
      { text: "Nein, Gott hat uns den Verstand gegeben, um ihn zu nutzen.", ethScore: -10, msg: "Eine utilitaristische Sichtweise, die jedoch die Grenzen der Schöpfung ignoriert." }
    ]
  },
  {
    id: 2,
    title: "Therapie vs. Enhancement",
    bio: "Korrektur des HTT-Gens zur Verhinderung von Chorea Huntington (tödliche Erbkrankheit).",
    rel: "Darf der Mensch in die Keimbahn eingreifen, um schweres Leid zu verhindern?",
    options: [
      { text: "Heilen ist eine moralische Pflicht (Therapie).", ethScore: +20, msg: "Auch theologische Ethik befürwortet Heilung, sofern sie nicht zur Optimierung (Enhancement) wird." },
      { text: "Krankheit ist Teil des gottgegebenen Schicksals.", ethScore: -10, msg: "Eine extreme Position, die der ärztlichen Pflicht zur Leidensminderung widerspricht." }
    ]
  },
  {
    id: 3,
    title: "Der Wert des unperfekten Lebens",
    bio: "Selektion von Embryonen nach Präimplantationsdiagnostik (PID). Embryonen mit Down-Syndrom werden verworfen.",
    rel: "Welchen Wert hat ein Leben mit Behinderung in einer 'perfektionierten' Gesellschaft?",
    options: [
      { text: "Jedes Leben ist absolut schützenswert und gottgewollt.", ethScore: +40, msg: "Die Menschenwürde ist unabhängig von Gesundheit oder Leistung. Selektion fördert Ableismus." },
      { text: "Es erspart den Eltern und dem Kind zukünftiges Leid.", ethScore: -20, msg: "Ein Argument, das den inhärenten Wert des Lebens an eine 'Qualitätskontrolle' knüpft." }
    ]
  }
];
export function EthicsTestPhase({ onNext, updateGameState }: { onNext: () => void, updateGameState?: (data: Record<string, unknown>) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(50);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastFeedback, setLastFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);
  const activeDilemma = dilemmas[currentIndex];
  const handleChoice = (option: typeof dilemmas[0]['options'][0]) => {
    setScore(prev => Math.max(0, Math.min(100, prev + option.ethScore)));
    setLastFeedback(option.msg);
    setShowFeedback(true);
  };
  const proceedToNext = () => {
    setShowFeedback(false);
    if (currentIndex < dilemmas.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      if (updateGameState) {
        updateGameState({ ethicsScore: score });
      }
      setShowResult(true);
    }
  };
  const getResultStatus = () => {
    if (score > 80) return { title: 'TIEFES ETHISCHES VERSTÄNDNIS', color: '#00ffaa', desc: 'Sie haben eine differenzierte theologische und ethische Perspektive eingenommen. Der Wert des Lebens steht über der reinen Machbarkeit.' };
    if (score < 40) return { title: 'UTILITARISMUS', color: '#ffaa00', desc: 'Ihre Entscheidungen waren stark nutzensorientiert. Die christliche Perspektive auf die unantastbare Würde des Menschen trat in den Hintergrund.' };
    return { title: 'ZWISCHEN MACHBARKEIT & MORAL', color: '#00f0ff', desc: 'Sie schwanken zwischen dem Wunsch nach Heilung und dem Respekt vor der Schöpfung. Ein typisches Dilemma der modernen Bioethik.' };
  };
  const CrossIcon = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M5 8h14" />
    </svg>
  );
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto p-4 flex flex-col min-h-[85vh]"
    >
      <RolePopup title="Ethik-Evaluation" description="Die Ethikkommission pr00fcft Ihr Vorgehen. Verteidigen Sie Ihre Entscheidungen vor dem Hintergrund moralischer und religi00f6ser Werte. Jede Wahl hat Konsequenzen." />
      <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase flex items-center justify-center gap-4">
            <Heart className="text-[#ff00e5]" size={40} />
            Religion & Ethik
         </h1>
         <p className="text-slate-400 font-mono max-w-2xl mx-auto text-sm md:text-base">
            "Nicht alles, was technisch machbar ist, ist auch ethisch vertretbar." Bewerten Sie die folgenden Szenarien aus theologischer Perspektive.
         </p>
      </div>
      <Card className="flex-1 glass border-[#ff00e5]/30 flex flex-col relative overflow-hidden bg-slate-900/50">
        <CardContent className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
           <AnimatePresence mode="wait">
             {!showResult ? (
                <motion.div
                  key={activeDilemma.id + (showFeedback ? '-feedback' : '')}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="w-full max-w-2xl"
                >
                   {!showFeedback ? (
                     <div className="space-y-6">
                        <div className="text-center mb-6">
                            <span className="bg-[#ff00e5]/20 text-[#ff00e5] px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-[#ff00e5]/30">FALL {activeDilemma.id} / {dilemmas.length}</span>
                            <h2 className="text-2xl md:text-3xl font-black text-white mt-4">{activeDilemma.title}</h2>
                        </div>
                        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 space-y-4">
                            <div>
                                <h3 className="text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2 mb-2">
                                   <HelpCircle size={14} className="text-[#00f0ff]" /> Das Biologische Szenario
                                </h3>
                                <p className="text-white text-lg font-medium">{activeDilemma.bio}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-700/50">
                                <h3 className="text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2 mb-2">
                                   <CrossIcon size={14} className="text-[#ff00e5]" /> Die theologische Frage
                                </h3>
                                <p className="text-pink-100 text-lg font-medium">{activeDilemma.rel}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {activeDilemma.options.map((opt, i) => (
                               <Button 
                                  key={i}
                                  variant="outline" 
                                  className="h-auto p-4 border-slate-600 text-slate-300 hover:text-white hover:border-[#ff00e5] hover:bg-[#ff00e5]/10 whitespace-normal text-left flex flex-col items-start"
                                  onClick={() => handleChoice(opt)}
                               >
                                  <span className="text-sm font-bold">{opt.text}</span>
                               </Button>
                            ))}
                        </div>
                     </div>
                   ) : (
                     <div className="bg-slate-800 p-8 rounded-2xl border border-[#ff00e5]/50 text-center space-y-6">
                        <AlertTriangle size={48} className="text-[#ff00e5] mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-white">ETHISCHE REFLEXION</h3>
                        <p className="text-lg text-slate-300 leading-relaxed font-mono">
                           {lastFeedback}
                        </p>
                        <Button variant="default" onClick={proceedToNext} className="mt-8 px-8 bg-[#ff00e5] hover:bg-[#ff00e5]/80 text-white font-bold tracking-widest uppercase">
                           Verstanden <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                     </div>
                   )}
                </motion.div>
             ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center max-w-2xl flex flex-col items-center justify-center space-y-8"
                >
                   {(() => {
                      const res = getResultStatus();
                      return (
                         <>
                           <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center mb-4 bg-slate-900" style={{ borderColor: res.color }}>
                              <Scale size={40} style={{ color: res.color }} />
                           </div>
                           <h2 className="text-4xl font-black tracking-widest uppercase" style={{ color: res.color }}>
                              {res.title}
                           </h2>
                           <p className="text-slate-300 text-lg leading-relaxed bg-slate-800/80 p-8 rounded-xl border border-slate-700">
                              {res.desc}
                           </p>
                           <Button 
                              variant="default" 
                              onClick={onNext} 
                              className="mt-8 px-12 py-6 text-black font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)]" 
                              style={{ backgroundColor: res.color }}
                           >
                              Modul Abschließen <ArrowRight className="ml-2 w-5 h-5" />
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