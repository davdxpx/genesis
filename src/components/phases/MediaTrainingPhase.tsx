import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Mic, TrendingDown, TrendingUp, Activity, Fingerprint, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Complex branching interview questions referencing previous phases
const interviewScript = [
  {
    id: 1,
    topic: "Der Leak (Der Prometheus-Marker)",
    reporter: "Dr., der Global Health Board hat heute Nacht die 'Vance-Akte' geleakt. Darin steht, Sie haben den illegalen 'Prometheus-Marker' injiziert, um künstlich ein Genie zu erschaffen. Ist Projekt Genesis außer Kontrolle?",
    options: [
      {
        text: "Aggressives Dementi: 'Diese Dokumente sind Fälschungen unserer Konkurrenten. Reine Desinformation.'",
        pugStrat: "Fake-News-Narrativ. Zerstört Medienvertrauen, schützt aber kurzfristig den Aktienkurs.",
        effect: { trust: -15, market: +20, stress: +10 },
        response: "Sie weichen aus. Aber unsere Experten haben die kryptographischen Signaturen der CRISPR-Logs verifiziert!"
      },
      {
        text: "Relativierung: 'Wir evaluieren in vitro lediglich theoretische Modelle. Es gab keine Implantation.'",
        pugStrat: "Juristische Nebelkerze. Vermeidet direkte Lügen, wirkt aber höchst verdächtig.",
        effect: { trust: -5, market: 0, stress: +5 },
        response: "Theoretische Modelle? Sie spielen in einer rechtlichen Grauzone mit menschlicher DNA!"
      },
      {
        text: "Bedingungslose Transparenz: 'Ja. Und es ist ein evolutionärer Durchbruch, der künftig allen Menschen helfen wird.'",
        pugStrat: "Flucht nach vorn (Visionär). Gewinnt die Massen, aber schockiert Investoren und Aufsichtsbehörden.",
        effect: { trust: +25, market: -30, stress: -5 },
        response: "Ein Durchbruch?! Sie brechen internationale Gesetze und nennen es Evolution!"
      }
    ]
  },
  {
    id: 2,
    topic: "Biologie & Sicherheit (Off-Target Mutationen)",
    reporter: "Lassen Sie uns über die Biologie reden. Die QA-Scans zeigen Genom-Instabilitäten. Die Cas9-Schere hat Off-Target-Mutationen verursacht. Riskieren Sie wissentlich Krebs bei einem ungeborenen Kind?",
    options: [
      {
        text: "Verharmlosung: 'Diese Mutationen liegen in nicht-kodierenden Introns. Sie haben keinerlei phänotypische Auswirkungen.'",
        pugStrat: "Technokratische Ablenkung. Nutzt biologisches Fachjargon, um Laien zu verwirren.",
        effect: { trust: -10, market: +10, stress: 0 },
        response: "Wissenschaftler warnen aber, dass auch Intron-Veränderungen die Genexpression langfristig stören können!"
      },
      {
        text: "Sündenbock: 'Ein fehlerhafter KI-Algorithmus unseres Zulieferers hat die RNA-Sequenz falsch berechnet.'",
        pugStrat: "Verantwortungsdiffusion. Schützt das eigene Labor auf Kosten Dritter.",
        effect: { trust: -20, market: +15, stress: +15 },
        response: "Sie machen eine Software verantwortlich? SIE sind der Leitende Genetiker!"
      },
      {
        text: "Ethischer Appell: 'Jeder Pionierschritt der Medizin – von Herztransplantationen bis Impfungen – barg anfangs Risiken.'",
        pugStrat: "Historische Legitimierung. Vergleicht sich mit großen Pionieren, um Fehler zu rechtfertigen.",
        effect: { trust: +15, market: -10, stress: -10 },
        response: "Aber hier geht es nicht um Heilung, sondern um elitäres Enhancement!"
      }
    ]
  },
  {
    id: 3,
    topic: "Politik & Gesellschaft (Die Zweiklassengesellschaft)",
    reporter: "Das bringt uns zum Kern: Die Familie Vance zahlt Milliarden für ein 'perfektes' Kind. Zementieren Sie hier nicht eine neue biologische Zweiklassengesellschaft? Reiche kaufen sich Super-Intelligenz, der Rest bleibt zurück?",
    options: [
      {
        text: "Kapitalistische Verteidigung: 'Innovation erfordert Kapital. Was heute Luxus ist, ist morgen Kassenleistung.'",
        pugStrat: "Trickle-Down-Argumentation. Stützt sich auf freie Marktwirtschaft, ignoriert soziale Ungleichheit.",
        effect: { trust: -25, market: +30, stress: +5 },
        response: "Das ist zynisch! Bis diese Technik billig wird, haben die Gen-Eliten den Planeten bereits unter sich aufgeteilt!"
      },
      {
        text: "Regulative Forderung: 'Wir als Wissenschaftler fordern selbst stärkere Subventionen der Politik, um die Technik allen zugänglich zu machen.'",
        pugStrat: "Verantwortungsumkehr. Schiebt den Ball an die Politik (PuG) zurück.",
        effect: { trust: +20, market: -5, stress: -5 },
        response: "Sie spielen den Ball an die Politik zurück, während Sie weiterhin Milliarden kassieren. Ein geschickter Spin."
      },
      {
        text: "Eugenik-Dementi: 'Wir erschaffen keine Klassen. Wir beseitigen biologisches Leid. Das ist unsere humanistische Pflicht.'",
        pugStrat: "Moralischer Schutzschild. Verdeckt kosmetisches Enhancement hinter einem medizinischen Deckmantel.",
        effect: { trust: +10, market: +5, stress: -10 },
        response: "Die Linie zwischen Heilung und Optimierung haben Sie heute endgültig verwischt, Dr."
      }
    ]
  }
];

// Mock live comments
const generateComments = (trust: number) => {
  if (trust > 70) return ["Endlich jemand, der die Wahrheit sagt!", "Wissenschaft lässt sich nicht aufhalten 🚀", "Er hat Recht, die Politik hat versagt!"];
  if (trust < 30) return ["Was für ein Lügner!! 🤬", "Boykottiert Genesis!", "Verhaftet diesen Frankenstein!", "Geld regiert die Welt... traurig."];
  return ["Klingt wie typisches PR-Gerede.", "Ich weiß nicht, wem ich glauben soll.", "Die Technologie macht mir trotzdem Angst."];
};

interface ChatMessage {
  speaker: string;
  text: string;
}

interface CommentMessage {
  id: number;
  userId: number;
  text: string;
}

export function MediaTrainingPhase({ onNext }: { onNext: () => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [trust, setTrust] = useState(50);
  const [market, setMarket] = useState(50);
  const [stress, setStress] = useState(20);
  const [isAnswering, setIsAnswering] = useState(false);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [liveComments, setLiveComments] = useState<CommentMessage[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [commentIdCounter, setCommentIdCounter] = useState(0);

  // Initial prompt
  useEffect(() => {
    if (currentQ === 0 && chatLog.length === 0) {
      setTimeout(() => {
        setChatLog([{ speaker: 'Reporter', text: interviewScript[0].reporter }]);
      }, 1000);
    }
  }, [currentQ, chatLog]);

  // Live comment ticker
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      const possibleComments = generateComments(trust);
      const randomComment = possibleComments[Math.floor(Math.random() * possibleComments.length)];
      const randomUserId = Math.floor(Math.random() * 9000);
      
      setCommentIdCounter(prev => {
        const newId = prev + 1;
        setLiveComments(current => [...current.slice(-3), { id: newId, userId: randomUserId, text: randomComment }]);
        return newId;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [trust, isFinished]);

  const handleAnswer = (option: typeof interviewScript[0]['options'][0]) => {
    setIsAnswering(true);
    
    // Add player answer
    const answerText = option.text.split(':')[1]?.replace(/'/g, "") || option.text;
    setChatLog(prev => [...prev, { speaker: 'Du', text: answerText }]);
    
    // Apply effects
    setTrust(prev => Math.max(0, Math.min(100, prev + option.effect.trust)));
    setMarket(prev => Math.max(0, Math.min(100, prev + option.effect.market)));
    setStress(prev => Math.max(0, Math.min(100, prev + option.effect.stress)));

    // Reporter reaction delay
    setTimeout(() => {
      setChatLog(prev => [...prev, { speaker: 'Reporter', text: option.response }]);
      
      // Move to next question after reaction
      setTimeout(() => {
        if (currentQ < interviewScript.length - 1) {
          setCurrentQ(c => c + 1);
          setChatLog(prev => [...prev, { speaker: 'Reporter', text: interviewScript[currentQ + 1].reporter }]);
          setIsAnswering(false);
        } else {
          setIsFinished(true);
        }
      }, 3000);
    }, 2000);
  };

  const getEnding = () => {
    if (trust < 30 && market > 60) return { title: "DER CORPORATE VILLAIN", desc: "Die Öffentlichkeit hasst Sie und das Projekt gilt als moralisch bankrott. Aber die Aktienkurse sind durch die Decke gegangen. Die Vance-Familie ist zufrieden. Sie haben Ihre Seele für den Profit verkauft.", color: "#ffaa00" };
    if (trust > 60 && market < 40) return { title: "DER MÄRTYRER", desc: "Sie haben die Wahrheit gesagt. Die Gesellschaft feiert Sie als Whistleblower der Gen-Industrie. Leider hat die Vance-Familie ihre Gelder abgezogen und Ares Corp verklagt Sie. Ein Pyrrhussieg.", color: "#00f0ff" };
    if (trust < 30 && market < 40) return { title: "TOTALES DESASTER", desc: "Eine katastrophale PR-Leistung. Sie wurden beim Lügen erwischt, die Investoren fliehen und Interpol untersucht Ihr Labor. Das Projekt steht vor dem Aus.", color: "#ff0000" };
    return { title: "MEISTERHAFTER SPIN-DOKTOR", desc: "Sie haben souverän auf der Rasierklinge navigiert. Weder hat der Markt das Vertrauen verloren, noch hat die Gesellschaft das Labor niedergebrannt. Das Gen-Projekt geht weiter.", color: "#ff00e5" };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4 h-[85vh]"
    >
      {/* LEFT PANE: Live Broadcast & Sentiment */}
      <Card className="w-full md:w-5/12 glass border-[#00f0ff]/30 flex flex-col relative overflow-hidden h-full">
        {/* On-Air Indicator */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse z-20" />
        
        <CardHeader className="bg-slate-900/80 border-b border-slate-700/50 pb-4 z-10">
          <div className="flex justify-between items-center">
             <CardTitle className="text-xl font-black tracking-widest text-white flex items-center gap-2">
                <Radio className="text-red-500 animate-pulse" /> LIVE-BROADCAST
             </CardTitle>
             <span className="text-xs font-mono bg-red-500/20 text-red-500 px-2 py-1 rounded border border-red-500/50">
                ON AIR - 14.2M Viewers
             </span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col overflow-hidden relative bg-[#050A15]">
           {/* Live Video Feed Mockup */}
           <div className="h-1/2 border-b border-slate-700/50 relative overflow-hidden flex flex-col justify-end p-4 bg-gradient-to-t from-slate-900 via-transparent to-transparent">
              {/* Background silhouette/camera effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #000 120%)' }} />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <Mic size={120} />
              </div>
              
              {/* Teleprompter / Subtitles */}
              <div className="relative z-10 w-full">
                 <AnimatePresence mode="popLayout">
                    {chatLog.map((log, idx) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                         className={`mb-2 p-3 rounded-lg backdrop-blur-md border ${
                           log.speaker === 'Reporter' 
                             ? 'bg-slate-800/80 border-slate-600 text-slate-200' 
                             : 'bg-[#00f0ff]/20 border-[#00f0ff]/50 text-white ml-8'
                         }`}
                       >
                         <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${log.speaker === 'Reporter' ? 'text-[#ff00e5]' : 'text-[#00f0ff]'}`}>
                           {log.speaker}
                         </span>
                         <p className="text-sm font-mono leading-relaxed">{log.text}</p>
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </div>
           </div>

           {/* Metrics & Social Stream */}
           <div className="h-1/2 p-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between">
                       Öffentl. Vertrauen
                       {trust > 50 ? <TrendingUp size={12} className="text-[#00f0ff]" /> : <TrendingDown size={12} className="text-[#ff0000]" />}
                    </p>
                    <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                       <motion.div animate={{ width: `${trust}%` }} className={`h-full ${trust > 50 ? 'bg-[#00f0ff]' : 'bg-[#ff0000]'}`} />
                    </div>
                 </div>
                 <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex justify-between">
                       Markt-Wert (Aktie)
                       {market > 50 ? <TrendingUp size={12} className="text-[#ffaa00]" /> : <TrendingDown size={12} className="text-[#ff0000]" />}
                    </p>
                    <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                       <motion.div animate={{ width: `${market}%` }} className={`h-full ${market > 50 ? 'bg-[#ffaa00]' : 'bg-[#ff0000]'}`} />
                    </div>
                 </div>
              </div>

              {/* Fake Live Comments */}
              <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800 p-3 overflow-hidden relative">
                 <p className="text-[10px] text-slate-500 font-mono mb-2 border-b border-slate-800 pb-1">LIVE CHAT FEED</p>
                 <div className="space-y-2">
                    <AnimatePresence>
                       {liveComments.map((comment) => (
                          <motion.div key={comment.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-400 font-mono">
                             <span className="text-slate-600">User{comment.userId}:</span> {comment.text}
                          </motion.div>
                       ))}
                    </AnimatePresence>
                 </div>
                 {/* Gradient fade out at bottom */}
                 <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#050A15] to-transparent" />
              </div>
           </div>
        </CardContent>
      </Card>

      {/* RIGHT PANE: PR Control Room (Teleprompter) */}
      <Card className="flex-1 glass border-[#ff00e5]/20 flex flex-col relative overflow-hidden h-full">
        <CardHeader className="bg-slate-900/60 border-b border-slate-700/50 pb-4">
          <CardTitle className="text-xl font-black tracking-widest text-slate-100 flex items-center gap-2">
            <Mic className="text-[#ff00e5]" /> PRESSEKONFERENZ (LIVE)
          </CardTitle>
          <p className="text-xs font-mono text-slate-400">Strategische Rhetorik-Analyse. Antworten Sie der Presse und lenken Sie das Narrativ.</p>
        </CardHeader>

        <CardContent className="flex-1 p-6 z-10 overflow-y-auto custom-scrollbar">
           <AnimatePresence mode="wait">
              
              {!isFinished ? (
                 <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                    
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-[#ff00e5] uppercase tracking-widest">FRAGE {currentQ + 1} VON {interviewScript.length}</span>
                       <span className="text-[10px] font-mono text-slate-500">STRESSLEVEL: {stress}%</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[#ff00e5] pl-4">
                       {interviewScript[currentQ].topic}
                    </h3>

                    <div className="space-y-4">
                       {interviewScript[currentQ].options.map((opt, idx) => (
                          <button
                             key={idx}
                             disabled={isAnswering}
                             onClick={() => handleAnswer(opt)}
                             className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative group ${
                                isAnswering 
                                  ? 'bg-slate-900/50 border-slate-800 opacity-50 cursor-not-allowed' 
                                  : 'bg-slate-800/80 border-slate-600 hover:border-[#00f0ff] hover:bg-slate-800 cursor-pointer hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                             }`}
                          >
                             <p className="text-sm text-slate-200 font-bold leading-relaxed mb-3">
                                {opt.text}
                             </p>
                             <div className="bg-slate-900 p-2 rounded text-[10px] font-mono text-slate-400 border-l-2 border-[#ff00e5]">
                                <span className="text-[#ff00e5] font-bold">PuG-Strategie: </span>{opt.pugStrat}
                             </div>
                             
                             {/* Predictive HUD on Hover */}
                             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                {opt.effect.trust > 0 && <span className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded">Vertrauen ↑</span>}
                                {opt.effect.trust < 0 && <span className="text-[10px] bg-[#ff0000]/20 text-[#ff0000] px-2 py-0.5 rounded">Vertrauen ↓</span>}
                                {opt.effect.market > 0 && <span className="text-[10px] bg-[#ffaa00]/20 text-[#ffaa00] px-2 py-0.5 rounded">Markt ↑</span>}
                                {opt.effect.market < 0 && <span className="text-[10px] bg-[#ff0000]/20 text-[#ff0000] px-2 py-0.5 rounded">Markt ↓</span>}
                             </div>
                          </button>
                       ))}
                    </div>

                 </motion.div>
              ) : (
                 <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    {(() => {
                       const ending = getEnding();
                       return (
                          <>
                             <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center bg-slate-900" style={{ borderColor: ending.color }}>
                                <Activity size={40} style={{ color: ending.color }} />
                             </div>
                             <h2 className="text-3xl font-black tracking-widest uppercase" style={{ color: ending.color }}>
                                {ending.title}
                             </h2>
                             <p className="text-sm text-slate-300 font-mono leading-relaxed bg-slate-800/80 p-6 rounded-xl border border-slate-700">
                                {ending.desc}
                             </p>
                          </>
                       );
                    })()}
                 </motion.div>
              )}

           </AnimatePresence>
        </CardContent>

        <CardFooter className="bg-slate-900/80 p-6 flex justify-between items-center border-t border-slate-700/50 z-10 h-20">
           <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Fingerprint size={14} />
              Öffentliche Akzeptanz berechnet
           </div>
           
           <AnimatePresence>
             {isFinished && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <Button variant="sci-fi" onClick={onNext} className="px-8 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    Zum Baby Designer (Phänotyp) <Activity className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
             )}
           </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  );
}