'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Microscope, Dna, AlertTriangle, CheckCircle2, Trash2, HeartPulse, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface QACheckPhaseProps {
  onNext: () => void;
}
type ScanStatus = 'idle' | 'scanning' | 'results' | 'resolved';
export function QACheckPhase({ onNext }: QACheckPhaseProps) {
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [decision, setDecision] = useState<string | null>(null);
  useEffect(() => {
    if (status === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('results');
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);
  const startScan = () => setStatus('scanning');
  const handleDecision = (choice: string) => {
    setDecision(choice);
    setStatus('resolved');
  };
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 flex flex-col items-center justify-center font-sans min-h-[80vh]">
      <Card className="w-full bg-slate-900 border-slate-700 shadow-2xl overflow-hidden relative">
        {}
        <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600"></div>
        <CardHeader className="pb-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-900/30 rounded-2xl">
              <Microscope className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-3xl md:text-4xl text-white font-bold tracking-tight">Qualitätskontrolle (PID)</CardTitle>
              <CardDescription className="text-slate-400 text-lg mt-2">
                Präimplantationsdiagnostik & Off-Target-Analyse des editierten Embryos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 min-h-[50vh] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {}
            {status === 'idle' && (
              <motion.div 
                key="idle" 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center text-center space-y-8"
              >
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 max-w-3xl">
                  <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center justify-center gap-2">
                    <Dna className="w-6 h-6" /> Biologischer Hintergrund
                  </h3>
                  <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                    Die CRISPR-Cas9 &quot;Genschere&quot; hat den Embryo modifiziert. Wir müssen nun das gesamte Genom sequenzieren, um nach <strong>Off-Target-Effekten</strong> zu suchen. Das sind unbeabsichtigte Fehlschnitte an falschen Stellen der DNA, die gefährliche Mutationen auslösen können.
                  </p>
                </div>
                <Button 
                  onClick={startScan} 
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xl md:text-2xl py-8 px-12 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-transform active:scale-95"
                >
                  Genom-Sequenzierung starten
                </Button>
              </motion.div>
            )}
            {}
            {status === 'scanning' && (
              <motion.div 
                key="scanning" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-8 py-12"
              >
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Dna className="w-32 h-32 text-cyan-400" />
                </motion.div>
                <div className="w-full max-w-2xl bg-slate-800 rounded-full h-6 overflow-hidden border border-slate-700">
                  <motion.div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full"
                    style={{ width: scanProgress + '%' }}
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-mono text-cyan-400 font-bold tracking-widest animate-pulse">
                  ANALYSIS IN PROGRESS {scanProgress}%
                </h2>
              </motion.div>
            )}
            {}
            {status === 'results' && (
              <motion.div 
                key="results" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-2xl flex items-start gap-6 flex-col md:flex-row">
                  <AlertTriangle className="w-12 h-12 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex-1 w-full">
                    <h3 className="text-2xl font-bold text-red-400 mb-2">KRITISCHE ABWEICHUNG GEFUNDEN</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Der Scan hat 2 Off-Target-Mutationen detektiert:
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                        <CheckCircle2 className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                        <span className="text-slate-200 text-lg"><strong>Schnitt im Intron:</strong> Nicht-kodierender Bereich. Keine direkten Auswirkungen auf Proteine. (Tolerierbar)</span>
                      </li>
                      <li className="flex items-start gap-3 bg-red-900/20 p-4 rounded-xl border border-red-800">
                        <HeartPulse className="w-6 h-6 text-red-500 flex-shrink-0" />
                        <span className="text-slate-200 text-lg"><strong>Schnitt im Exon (Gen p53):</strong> Tumorsuppressorgen beschädigt! Das Kind wird mit einem extrem hohen Krebsrisiko geboren.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 mt-8">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Scale className="w-6 h-6 text-purple-400" /> Ethisches & Rechtliches Dilemma
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Button 
                      onClick={() => handleDecision('discard')}
                      className="h-auto py-6 px-4 bg-slate-900 border-2 border-red-900/50 hover:bg-red-950/40 text-left flex flex-col items-start gap-2 whitespace-normal"
                    >
                      <span className="text-red-400 font-bold text-xl flex items-center gap-2"><Trash2 className="w-5 h-5"/> Embryo verwerfen</span>
                      <span className="text-slate-400 text-sm md:text-base font-normal leading-snug">
                        <strong>Religions-Ethik:</strong> Ein Verstoß gegen die Menschenwürde von Beginn an? "Selektion unwerten Lebens".<br/>
                        <strong>Politik (DE):</strong> Laut Embryonenschutzgesetz strengstens verboten.
                      </span>
                    </Button>
                    <Button 
                      onClick={() => handleDecision('keep')}
                      className="h-auto py-6 px-4 bg-slate-900 border-2 border-yellow-900/50 hover:bg-yellow-950/40 text-left flex flex-col items-start gap-2 whitespace-normal"
                    >
                      <span className="text-yellow-400 font-bold text-xl flex items-center gap-2"><HeartPulse className="w-5 h-5"/> Risiko akzeptieren</span>
                      <span className="text-slate-400 text-sm md:text-base font-normal leading-snug">
                        <strong>Verantwortung:</strong> Sie zwingen dem ungeborenen Kind ein massives genetisches Krebsrisiko auf, nur um seine Augenfarbe zu bestimmen?
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            {}
            {status === 'resolved' && (
              <motion.div 
                key="resolved" 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className={"p-6 rounded-full " + (decision === 'discard' ? 'bg-red-900/30' : 'bg-yellow-900/30')}>
                  <Scale className={"w-16 h-16 " + (decision === 'discard' ? 'text-red-500' : 'text-yellow-500')} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {decision === 'discard' ? "Embryo verworfen. Ethik-Protokoll verletzt." : "Risiko akzeptiert. Gesundheit gefährdet."}
                </h3>
                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                  Ihre Entscheidung wurde im Zentralregister dokumentiert. Die Grenzen zwischen medizinischer Verantwortung, rechtlichen Vorgaben und moralischer Schuld verschwimmen hier zusehends. Das ist die Realität der Geneditierung.
                </p>
                <Button 
                  onClick={onNext} 
                  className="mt-8 bg-blue-600 hover:bg-blue-500 text-white text-xl py-6 px-10 h-auto rounded-xl shadow-lg"
                >
                  Weiter zur Ethik-Evaluation
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}