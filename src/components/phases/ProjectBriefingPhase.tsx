import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ShieldAlert, Terminal, Lock, PlayCircle, Eye, VolumeX, Volume2 } from 'lucide-react';

export function ProjectBriefingPhase({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const texts = [
    "VERBINDUNG ZUM GLOBAL HEALTH BOARD HERGESTELLT...",
    "Willkommen, Gen-Forscher. Dies ist ein Klasse-1 Protokoll.",
    "Die Familie Vance hat Sie persönlich für dieses Projekt ausgewählt.",
    "Ihr Auftrag: Die Erschaffung eines genetisch perfekten Erben.",
    "Kosten spielen keine Rolle. Die Konkurrenz ist brutal.",
    "Wir befinden uns in einer Zeit, in der natürliche Evolution obsolet geworden ist. Wer es sich leisten kann, optimiert.",
    "Sie werden am Rande des legal und ethisch Machbaren operieren. Versagen ist keine Option.",
    "Akzeptieren Sie die Bedingungen?"
  ];

  useEffect(() => {
    if (step < texts.length) {
      setIsTyping(true);
      setTypedText("");
      let i = 0;

      const audioContext = soundEnabled && window.AudioContext ? new window.AudioContext() : null;

      const playBeep = () => {
         if (!audioContext) return;
         const oscillator = audioContext.createOscillator();
         const gainNode = audioContext.createGain();
         oscillator.type = 'square';
         oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioContext.currentTime);
         gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
         oscillator.connect(gainNode);
         gainNode.connect(audioContext.destination);
         oscillator.start();
         oscillator.stop(audioContext.currentTime + 0.05);
      };

      const typingInterval = setInterval(() => {



        setTypedText(texts[step].substring(0, i + 1));
        if (i % 2 === 0) playBeep();
        i++;
        if (i === texts[step].length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 50);

      return () => {
         clearInterval(typingInterval);
      };
    }
  }, [step, soundEnabled]);

  const handleNextLine = () => {
    if (!isTyping && step < texts.length - 1) {
      setStep(s => s + 1);
    }
  };

  const skipTyping = () => {
    if (isTyping) {
      setTypedText(texts[step]);
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-4 min-h-[80vh] items-center justify-center font-mono relative"
    >
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-0 right-4 p-2 text-slate-500 hover:text-[#00f0ff] transition-colors flex items-center gap-2 text-xs uppercase"
      >
         {soundEnabled ? <Volume2 size={16}/> : <VolumeX size={16}/>}
         Sound {soundEnabled ? 'AN' : 'AUS'}
      </button>

      <div className="w-full relative z-10" onClick={isTyping ? skipTyping : handleNextLine}>
        <AnimatePresence mode="wait">
          {step === 0 && (
             <motion.div
                key="alert"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="flex flex-col items-center mb-12"
             >
                <ShieldAlert className="w-24 h-24 text-red-500 animate-pulse mb-4 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" />
                <h1 className="text-2xl text-red-500 font-black tracking-widest text-center">TOP SECRET - CLEARANCE LEVEL 5</h1>
             </motion.div>
          )}
        </AnimatePresence>

        <Card className="w-full bg-slate-950/80 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden relative min-h-[300px] flex flex-col cursor-pointer group hover:border-slate-600 transition-colors">
           <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center gap-3">
              <Terminal className="text-[#00f0ff] w-5 h-5" />
              <span className="text-[#00f0ff] font-bold text-xs uppercase tracking-widest">Incoming Transmission</span>
              <div className="ml-auto flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500" />
              </div>
           </div>

           <CardContent className="flex-1 p-8 md:p-12 flex flex-col">
              <div className="flex-1">
                 <p className="text-lg md:text-2xl font-light leading-relaxed text-slate-300">
                    {typedText}
                    {isTyping && <span className="w-3 h-6 bg-[#00f0ff] inline-block ml-1 animate-pulse align-middle" />}
                 </p>
              </div>

              {!isTyping && step < texts.length - 1 && (
                 <div className="mt-8 flex justify-center text-slate-500 animate-bounce">
                    <p className="text-xs tracking-widest uppercase flex items-center gap-2">Klicken zum Fortfahren <PlayCircle size={16} /></p>
                 </div>
              )}

              {!isTyping && step === texts.length - 1 && (
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
                 >
                    <Button
                       onClick={(e) => { e.stopPropagation(); onNext(); }}
                       className="py-6 px-12 bg-red-900/20 hover:bg-red-900/50 text-red-400 border border-red-900/50 text-lg font-black uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.2)] transition-all"
                    >
                       <Lock className="mr-3" /> Bedingungen Akzeptieren
                    </Button>
                 </motion.div>
              )}
           </CardContent>

           <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] opacity-30" />
        </Card>
      </div>
    </motion.div>
  );
}
