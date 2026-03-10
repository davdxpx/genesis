import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Users2, Check, FileText, Briefcase, Zap, ShieldAlert, Fingerprint, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const clientRequirements = [
  { id: 'iq', label: 'Ziel-IQ', value: '> 140 (Genie-Level)', icon: Zap, color: '#00f0ff' },
  { id: 'disease', label: 'Erbkrankheiten', value: '100% Elimination', icon: ShieldAlert, color: '#00f0ff' },
  { id: 'athletic', label: 'Athletik-Basis', value: 'Elite-Spezifikation', icon: Zap, color: '#9d00ff' },
];

interface Choice {
  text: string;
  tension: 'low' | 'high';
}

interface ScriptStep {
  type: 'client' | 'player' | 'action';
  text?: string;
  choices?: Choice[];
}

const scriptSteps: ScriptStep[] = [
  {
    type: 'client',
    text: "Wir wollen nur das absolut Beste. Geld spielt keine Rolle. Die Konkurrenz in dieser Welt ist brutal, und unser Kind darf keine biologischen Nachteile haben. Eliminiere alle Schwächen. Maximiere das Potenzial."
  },
  {
    type: 'player',
    choices: [
      { text: "Wir können die Grundlagen optimieren, aber absolute Perfektion birgt biologische Risiken.", tension: 'low' },
      { text: "Verstanden. Keine Kompromisse. Wir werden das genetische Limit ausreizen.", tension: 'high' }
    ]
  },
  {
    type: 'client',
    text: "Gut. Noch etwas: Wir haben von experimentellen kognitiven Erweiterungen gehört. Dem 'Prometheus-Marker'. Wir erwarten, dass Sie diesen integrieren. Um die rechtlichen Hürden und Ethikbehörden kümmern wir uns."
  },
  {
    type: 'player',
    choices: [
      { text: "Das ist hochgradig illegal und extrem riskant für die psychische Stabilität des Kindes.", tension: 'low' },
      { text: "Wenn das Budget stimmt, implementieren wir den Marker. Ihr Kind wird ein unübertroffenes Genie.", tension: 'high' }
    ]
  },
  {
    type: 'client',
    text: "Das Budget ist unbegrenzt. Enttäuschen Sie uns nicht. Die Vance-Sonderakte wird jetzt auf Ihr Terminal übertragen. Initiieren Sie den Smart-Contract."
  },
  {
    type: 'action',
    text: "CONTRACT_SIGNED"
  }
];

interface ChatMessage {
  type: 'client' | 'player';
  text: string;
  tension?: 'low' | 'high';
}

export function ParentInterviewPhase({ onNext }: { onNext: () => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [showChoices, setShowChoices] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentScriptStep = scriptSteps[currentStepIndex];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, typingText, showChoices]);

  useEffect(() => {
    if (!currentScriptStep) return;

    if (currentScriptStep.type === 'client') {
      setIsTyping(true);
      setShowChoices(false);
      let i = 0;
      const fullText = currentScriptStep.text as string;
      setTypingText("");

      const interval = setInterval(() => {
        setTypingText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
          setChatHistory(prev => [...prev, { type: 'client', text: fullText }]);
          setTypingText("");
          setCurrentStepIndex(idx => idx + 1);
        }
      }, 30); // Typing speed
      return () => clearInterval(interval);
    } 
    
    if (currentScriptStep.type === 'player') {
      setShowChoices(true);
    }
  }, [currentScriptStep, currentStepIndex]);

  const handleChoice = (choice: Choice) => {
    setShowChoices(false);
    setChatHistory(prev => [...prev, { type: 'player', text: choice.text, tension: choice.tension }]);
    setCurrentStepIndex(idx => idx + 1);
  };

  const isContractSigned = currentScriptStep?.type === 'action';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4 min-min-h-[85vh]"
    >
      {/* Left Column: Client Profile */}
      <Card className="w-full md:w-1/3 glass border-[#9d00ff]/30 flex flex-col relative overflow-hidden h-full">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9d00ff] to-transparent opacity-50" />
        
        <CardHeader className="bg-slate-900/80 border-b border-slate-700/50 pb-4">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-[#9d00ff]/20 border border-[#9d00ff] flex items-center justify-center">
                <Users2 className="text-[#9d00ff]" />
             </div>
             <div>
               <CardTitle className="text-[#9d00ff] tracking-widest text-lg">FAMILIE VANCE</CardTitle>
               <p className="text-xs text-slate-400 font-mono">Klienten-ID: VNC-2045-X</p>
             </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
             <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Status</p>
             <p className="font-mono text-slate-300">Ultra-High Net Worth (Klasse S)</p>
          </div>
          <div className="space-y-2">
             <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Budget</p>
             <p className="font-mono text-[#00f0ff] animate-pulse">Unlimitiert (Offshore Account)</p>
          </div>
          <div className="space-y-2">
             <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Risiko-Toleranz</p>
             <p className="font-mono text-[#ff00e5]">Extrem Hoch</p>
          </div>
          
          <div className="pt-4 border-t border-slate-700/50">
             <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
               <Briefcase size={14} /> Anforderungs-Profil
             </p>
             <div className="space-y-3">
                {clientRequirements.map(req => (
                  <div key={req.id} className="bg-slate-800/50 border border-slate-700 p-3 rounded-lg flex items-center gap-3">
                     <req.icon size={16} style={{ color: req.color }} />
                     <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{req.label}</p>
                        <p className="text-sm font-mono text-slate-200">{req.value}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Interaction Transcript */}
      <Card className="flex-1 glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden h-full">
        <CardHeader className="border-b border-slate-700/50 bg-slate-900/60 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-black tracking-widest text-slate-100 flex items-center gap-2">
            <FileText className="text-[#00f0ff]" /> KONSULTATIONS-TRANSKRIPT
          </CardTitle>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-xs font-mono text-slate-400">REC</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6 z-10 overflow-y-auto space-y-6 custom-scrollbar" ref={scrollRef}>
           <div className="flex flex-col space-y-6">
             {chatHistory.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.type === 'player' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 border ${msg.type === 'player' ? 'bg-[#00f0ff]/20 border-[#00f0ff]' : 'bg-[#9d00ff]/20 border-[#9d00ff]'}`}>
                     <span className={`text-xs font-bold ${msg.type === 'player' ? 'text-[#00f0ff]' : 'text-[#9d00ff]'}`}>
                       {msg.type === 'player' ? 'DU' : 'V'}
                     </span>
                  </div>
                  <div className={`p-4 rounded-xl relative max-w-[85%] ${
                    msg.type === 'player' 
                      ? msg.tension === 'high' 
                        ? 'bg-[#ff00e5]/10 border border-[#ff00e5]/50 rounded-tr-none' 
                        : 'bg-[#00f0ff]/10 border border-[#00f0ff]/50 rounded-tr-none'
                      : 'bg-slate-800/80 border border-slate-700/50 rounded-tl-none'
                  }`}>
                     <p className={`leading-relaxed font-mono text-sm ${msg.type === 'player' ? 'text-slate-100' : 'text-slate-300'}`}>
                        {msg.text}
                     </p>
                  </div>
                </motion.div>
             ))}

             {/* Typing Indicator / Active Typing */}
             {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9d00ff]/20 border border-[#9d00ff] shrink-0 flex items-center justify-center mt-1">
                     <span className="text-xs text-[#9d00ff] font-bold">V</span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-xl rounded-tl-none relative max-w-[85%]">
                     <p className="text-slate-300 leading-relaxed font-mono text-sm">
                        {typingText}
                        <span className="inline-block w-2 h-4 bg-[#00f0ff] animate-pulse ml-1 align-middle" />
                     </p>
                  </div>
                </div>
             )}

             {/* Player Choices */}
             {showChoices && currentScriptStep.type === 'player' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3 pt-6 border-t border-slate-700/50"
                >
                   <p className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-2">
                     <Activity size={14} className="text-[#00f0ff]" /> Antwortstrategie wählen:
                   </p>
                   {currentScriptStep.choices?.map((choice, idx) => (
                     <button 
                       key={idx}
                       onClick={() => handleChoice(choice)}
                       className={`text-left p-4 rounded-lg border transition-all duration-300 text-slate-300 font-mono text-sm relative overflow-hidden group ${
                         choice.tension === 'high' 
                           ? 'bg-[#0f172a] border-[#ff00e5]/50 hover:border-[#ff00e5] hover:bg-[#ff00e5]/10'
                           : 'bg-slate-800/50 border-slate-600 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10'
                       }`}
                     >
                       {choice.tension === 'high' && <span className="absolute inset-0 bg-[#ff00e5]/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
                       &quot;{choice.text}&quot;
                       {choice.tension === 'high' && (
                         <span className="block text-xs text-[#ff00e5] mt-2 opacity-80">* Akzeptiert experimentelles Risiko *</span>
                       )}
                     </button>
                   ))}
                </motion.div>
             )}

             {/* Contract Result */}
             {isContractSigned && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl border border-[#00f0ff]/50 bg-[#00f0ff]/10 text-center space-y-4 mt-8 max-w-[85%] mx-auto"
                >
                   <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-[#00f0ff] flex items-center justify-center mx-auto mb-4">
                     <Check size={30} className="text-[#00f0ff]" />
                   </div>
                   <h3 className="text-xl font-bold text-[#00f0ff] tracking-widest">AUFTRAG AKZEPTIERT</h3>
                   <p className="text-sm text-slate-300 font-mono">
                     Die Vance-Akte wurde verschlüsselt in Ihr Terminal geladen. Die Vertragsunterzeichnung ist biometrisch besiegelt.
                   </p>
                </motion.div>
             )}
           </div>
        </CardContent>

        {isContractSigned && (
           <CardFooter className="bg-slate-900/80 p-6 flex justify-between border-t border-slate-700/50">
             <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff]">
               <Fingerprint size={14} />
               Smart-Contract signiert
             </div>
             <Button variant="sci-fi" onClick={onNext} className="shadow-[0_0_15px_rgba(0,240,255,0.2)]">
               Zum Standort-Protokoll <Zap className="ml-2 w-4 h-4" />
             </Button>
           </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}