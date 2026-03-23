import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Shield, ShieldAlert, ShieldCheck, Lock, Unlock, AlertTriangle, Fingerprint, Terminal, CheckCircle2, XCircle } from 'lucide-react';
import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from 'framer-motion';
const questions = [
  {
    id: 1,
    q: "Unter dem Genetic Integrity Act von 2038, welcher Eingriff wird in der Euro-Zone als 'Klasse-A Verbrechen' eingestuft?",
    options: [
      "Ausrottung erblicher tödlicher Krankheiten",
      "Unautorisierte kosmetische Verbesserungen",
      "Präimplantationsdiagnostik (PID)",
      "In-vitro-Fertilisation"
    ],
    correct: 1
  },
  {
    id: 2,
    q: "Die Pan-Asiatische Koalition verlangt die Übermittlung genetischer Daten an das biometrische Raster im Austausch für...",
    options: [
      "Steuerbefreiungen für Unternehmens-Kliniken",
      "Bedingungsloses Grundeinkommen",
      "Subventioniertes aggressives Enhancement",
      "Außerweltliche Reiseerlaubnisse"
    ],
    correct: 2
  },
  {
    id: 3,
    q: "Welche Gerichtsbarkeit ist weltweit als der 'Sichere Hafen' für elitäre, streng regulierte genetische Modifikationen anerkannt?",
    options: [
      "Internationale Gewässer (Seastead)",
      "Singapur Sonderzone",
      "Nordamerikanisches Konglomerat",
      "Euro-Zone"
    ],
    correct: 1
  },
  {
    id: 4,
    q: "Bei der CRISPR-Cas9-Technik, was ist die primäre Funktion des Cas9-Proteins?",
    options: [
      "Es agiert als 'molekulare Schere', um DNA zu zerschneiden",
      "Es synthetisiert neue künstliche DNA-Stränge",
      "Es führt die RNA zum Ziel-Genom",
      "Es verhindert Off-Target-Mutationen"
    ],
    correct: 0
  }
];
type QuizStep = 'intro' | 'quizzing' | 'evaluating' | 'result';
export function PoliticsQuizPhase({ onNext }: { onNext: () => void }) {
  const { playSfx, setMusicIntensity } = useAudio();
  const [step, setStep] = useState<QuizStep>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  useEffect(() => {
    if (step === 'intro') {
      const timer = setTimeout(() => {
        setStep('quizzing');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step]);
  const handleSelect = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedAnswer(index);
    setIsAnswerRevealed(true);
    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelectedAnswer(null);
        setIsAnswerRevealed(false);
      } else {
        setStep('evaluating');
        setTimeout(() => setStep('result'), 2500);
      }
    }, 1500);
  };
  const handleRetry = () => {
    setScore(0);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setStep('intro');
  };
  const passed = score >= 3;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto p-4 flex flex-col items-center justify-center min-min-h-[80vh]"
    >
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="relative">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 bg-[#00f0ff] rounded-full blur-xl"
               />
               <Fingerprint size={100} className="text-[#00f0ff] relative z-10" />
               <motion.div 
                 animate={{ top: ['0%', '100%', '0%'] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 w-full h-1 bg-white shadow-[0_0_10px_#fff] z-20"
               />
            </div>
            <h2 className="text-3xl font-black tracking-widest text-[#00f0ff]">BIOMETRISCHE VERIFIZIERUNG</h2>
            <div className="space-y-2 font-mono text-sm text-slate-400">
               <p className="animate-pulse">Greife auf Datenbank des Globalen Genetik-Rates zu...</p>
               <p>Überprüfe Berechtigungen des Leitenden Genetikers...</p>
               <p className="text-[#ff00e5]">WARNUNG: Lizenzierungsprüfung erforderlich.</p>
            </div>
          </motion.div>
        )}
        {step === 'quizzing' && (
          <motion.div
            key="quizzing"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full glass rounded-xl border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] overflow-hidden"
          >
            <CardHeader className="border-b border-slate-700/50 bg-slate-900/80">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-3 text-[#00f0ff] text-xl">
                  <Shield size={24} />
                  GGC LIZENZ-EXAMEN
                </CardTitle>
                <div className="flex items-center gap-2">
                   <span className="text-xs font-mono text-slate-400">FRAGE {currentQ + 1}/{questions.length}</span>
                   <div className="flex gap-1">
                     {questions.map((_, i) => (
                       <div key={i} className={`w-2 h-2 rounded-full ${i < currentQ ? 'bg-[#00f0ff]' : i === currentQ ? 'bg-[#ff00e5] animate-pulse' : 'bg-slate-700'}`} />
                     ))}
                   </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 md:p-8 space-y-8 bg-[#0f172a]/90">
              <h3 className="text-2xl font-bold leading-relaxed text-slate-100 min-h-[80px]">
                {questions[currentQ].q}
              </h3>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrectAns = i === questions[currentQ].correct;
                  let btnStateClass = "bg-slate-800/50 border-slate-600 hover:border-[#00f0ff] text-slate-300 hover:text-white";
                  let icon = <Terminal size={18} className="text-slate-500 opacity-50" />;
                  if (isAnswerRevealed) {
                    if (isCorrectAns) {
                      btnStateClass = "bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]";
                      icon = <CheckCircle2 size={18} className="text-[#00f0ff]" />;
                    } else if (isSelected && !isCorrectAns) {
                      btnStateClass = "bg-[#ff00e5]/20 border-[#ff00e5] text-white shadow-[0_0_15px_rgba(255,0,229,0.3)]";
                      icon = <XCircle size={18} className="text-[#ff00e5]" />;
                    } else {
                      btnStateClass = "bg-slate-800/20 border-slate-700/50 text-slate-500 opacity-50";
                    }
                  } else if (isSelected) {
                    btnStateClass = "bg-[#00f0ff]/20 border-[#00f0ff] text-white";
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={!isAnswerRevealed ? { scale: 1.01, x: 5 } : {}}
                      whileTap={!isAnswerRevealed ? { scale: 0.99 } : {}}
                      onClick={() => handleSelect(i)}
                      disabled={isAnswerRevealed}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${btnStateClass}`}
                    >
                      <span className="font-mono text-sm md:text-base pr-4">{opt}</span>
                      {icon}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </motion.div>
        )}
        {step === 'evaluating' && (
          <motion.div 
            key="evaluating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-6"
          >
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ShieldAlert size={80} className="text-slate-400" />
            </motion.div>
            <h2 className="text-2xl font-black tracking-widest text-slate-300 font-mono">BERECHNE ERGEBNIS</h2>
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: '0%' }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 2.5, ease: "easeInOut" }}
                 className="h-full bg-slate-400"
               />
            </div>
          </motion.div>
        )}
        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full glass rounded-xl border overflow-hidden ${passed ? 'border-[#00f0ff]/50 shadow-[0_0_40px_rgba(0,240,255,0.2)]' : 'border-[#ff00e5]/50 shadow-[0_0_40px_rgba(255,0,229,0.2)]'}`}
          >
            <div className={`h-2 w-full ${passed ? 'bg-[#00f0ff]' : 'bg-[#ff00e5]'}`} />
            <CardContent className="p-10 flex flex-col items-center text-center space-y-6 bg-slate-900/90">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${passed ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-[#00f0ff]' : 'border-[#ff00e5] bg-[#ff00e5]/10 text-[#ff00e5]'}`}
              >
                {passed ? <Unlock size={40} /> : <Lock size={40} />}
              </motion.div>
              <div className="space-y-2">
                <h2 className={`text-4xl font-black tracking-widest ${passed ? 'text-[#00f0ff] text-glow-cyan' : 'text-[#ff00e5] glow-pink'}`}>
                  {passed ? 'LIZENZ ERTEILT' : 'ZUGRIFF VERWEIGERT'}
                </h2>
                <p className="text-xl font-mono text-slate-300">
                  Punktzahl: {score} / {questions.length}
                </p>
                <p className="text-sm font-mono text-slate-500 uppercase tracking-widest pt-2">
                  {passed ? 'Autorisiert für Operationen in Klasse-1 Zonen' : 'Minimale ethische Anforderungen nicht erfüllt'}
                </p>
              </div>
              {passed ? (
                <div className="w-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-4 rounded-lg flex items-start gap-3 text-left">
                  <ShieldCheck className="text-[#00f0ff] shrink-0 mt-1" />
                  <p className="text-sm text-slate-300">
                    Ihre Zugangsdaten wurden aktualisiert. Sie sind nun rechtlich befugt, gezielte CRISPR-Modifikationen durchzuführen. 
                    Fahren Sie mit dem Klienten-Interview fort.
                  </p>
                </div>
              ) : (
                <div className="w-full bg-[#ff00e5]/10 border border-[#ff00e5]/30 p-4 rounded-lg flex items-start gap-3 text-left">
                  <AlertTriangle className="text-[#ff00e5] shrink-0 mt-1 animate-pulse" />
                  <p className="text-sm text-slate-300">
                    Ihr Mangel an regulatorischem Wissen stellt ein extremes Risiko dar. Sicherheitsprotokolle schreiben einen zwingenden Neustart vor.
                    <span className="block text-[#ff00e5] font-bold mt-2">ÜBERSCHREIBE SYSTEMSPERRE...</span>
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-slate-950 p-6 flex justify-center border-t border-slate-800">
              {passed ? (
                <Button variant="default" size="lg" onClick={() => { playSfx('click'); onNext(); }} className="w-full md:w-auto px-12">
                  Klienten-Akte initialisieren
                </Button>
              ) : (
                <Button variant="destructive" size="lg" onClick={() => { playSfx('click'); handleRetry(); }} className="w-full md:w-auto px-12">
                  Examen neu starten
                </Button>
              )}
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}