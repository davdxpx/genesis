import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Microscope, Dna, AlertTriangle, CheckCircle2, HeartPulse, Scale, Trash2, ShieldAlert, Activity, FileWarning, Zap, Lock } from 'lucide-react';
import { RolePopup } from '../ui/RolePopup';

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
            setTimeout(() => setStatus('results'), 500);
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto flex flex-col gap-6 p-4 min-h-[85vh] text-[#00f0ff] font-mono"
    >
      <RolePopup
        title="Qualitätssicherung (PID)"
        description="Führen Sie eine Präimplantationsdiagnostik (PID) durch, um das editierte Genom auf Off-Target-Effekte zu prüfen. Entscheiden Sie über das Schicksal des Embryos bei Mutationen."
      />

      <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] backdrop-blur-md">
        <Microscope className="w-10 h-10 text-[#00f0ff] animate-pulse" />
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] uppercase">
            QA-Kontrolle & Sequenzierung
          </h1>
          <p className="text-sm text-slate-400">GENESIS OS</p>
        </div>
      </div>

      <Card className="flex-1 bg-[#050A15] border-[#00f0ff]/20 shadow-2xl relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none z-0" />

        <CardContent className="flex-1 p-6 md:p-12 z-10 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">

            {status === 'idle' && (
              <motion.div 
                key="idle" 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto"
              >
                <div className="bg-slate-900/80 p-8 rounded-2xl border border-slate-700 relative group overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />
                   <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3 tracking-widest uppercase">
                     <Dna className="w-8 h-8 text-[#00f0ff]" /> Biologisches Risiko-Assessment
                   </h3>
                   <p className="text-slate-300 text-base md:text-lg leading-relaxed font-sans font-light">
                     Die CRISPR-Cas9 Modifikation ist abgeschlossen. Wir müssen nun das gesamte Genom sequenzieren, um nach <span className="text-[#00f0ff] font-bold">Off-Target-Effekten</span> zu suchen. Dies sind unbeabsichtigte Fehlschnitte an falschen Stellen der DNA, die gefährliche Mutationen auslösen können.
                   </p>
                </div>

                <Button 
                  onClick={startScan} 
                  className="bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff] text-lg md:text-xl py-8 px-12 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all group tracking-widest uppercase font-black"
                >
                  <Activity className="mr-3 group-hover:animate-pulse" /> Sequenzierung Starten
                </Button>
              </motion.div>
            )}

            {status === 'scanning' && (
              <motion.div 
                key="scanning" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-12 py-12"
              >
                <div className="relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-32 h-32 border-2 border-dashed border-[#00f0ff]/50 rounded-full flex items-center justify-center">
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                       <Dna className="w-16 h-16 text-[#00f0ff]" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="w-full max-w-2xl space-y-4">
                  <div className="flex justify-between text-xs tracking-widest font-bold text-[#00f0ff]">
                     <span>SCANNING GENOME...</span>
                     <span>{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <motion.div
                      className="bg-[#00f0ff] h-full shadow-[0_0_10px_#00f0ff]"
                      style={{ width: scanProgress + '%' }}
                    />
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 flex flex-col gap-1 mt-4 opacity-50">
                     <p>{`> ANALYZING CHROMOSOME PAIRS 1-22`}</p>
                     <p>{`> CHECKING FOR CAS9 BINDING ANOMALIES`}</p>
                     <p>{`> ALIGNING WITH REFERENCE GENOME GRCh38`}</p>
                     {scanProgress > 50 && <p className="text-yellow-500">{`> WARNING: POTENTIAL MISMATCH DETECTED AT LOCUS 17p13.1`}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'results' && (
              <motion.div 
                key="results" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="space-y-8 max-w-5xl mx-auto w-full"
              >
                <div className="bg-red-950/20 border-l-4 border-red-500 p-6 md:p-8 rounded-r-2xl flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-red-500/5 blur-[100px] pointer-events-none" />
                  <FileWarning className="w-16 h-16 text-red-500 shrink-0 mt-2 animate-pulse" />

                  <div className="flex-1 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">KRITISCHE ABWEICHUNG DETEKTIERT</h3>
                    <p className="text-slate-300 text-base md:text-lg mb-6 font-sans font-light">
                      Der Scan hat <span className="text-red-400 font-bold">2 Off-Target-Mutationen</span> identifiziert. Die CRISPR-Schere hat neben dem Zielgen auch andere DNA-Sequenzen zerschnitten.
                    </p>

                    <div className="space-y-4 font-sans">
                      <div className="flex items-start gap-4 bg-[#050A15] p-4 rounded-xl border border-yellow-900/50">
                        <Activity className="w-6 h-6 text-yellow-500 shrink-0" />
                        <div>
                           <p className="text-yellow-400 font-bold mb-1 font-mono uppercase text-sm">Schnitt im Intron (Nicht-kodierend)</p>
                           <p className="text-slate-400 text-sm">Keine direkten Auswirkungen auf die Proteinbiosynthese. Biologisch tolerierbar.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 bg-red-950/50 p-4 rounded-xl border border-red-900/50 shadow-[0_0_15px_rgba(255,0,0,0.1)]">
                        <HeartPulse className="w-6 h-6 text-red-500 shrink-0" />
                        <div>
                           <p className="text-red-400 font-bold mb-1 font-mono uppercase text-sm">Schnitt im Exon (Gen TP53)</p>
                           <p className="text-slate-300 text-sm">Das wichtigste Tumorsuppressorgen wurde beschädigt. Wird dieser Embryo implantiert, besteht ein <span className="font-bold text-red-400">extrem hohes Risiko für multiple Krebserkrankungen</span> bereits im Kindesalter.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between group hover:border-red-500/50 transition-colors">
                     <div>
                        <div className="flex items-center gap-3 mb-4">
                           <Trash2 className="text-red-500 w-6 h-6" />
                           <h4 className="text-xl font-bold text-white uppercase tracking-wider">Option A: Verwerfen</h4>
                        </div>
                        <p className="text-sm text-slate-400 font-sans leading-relaxed mb-6">
                           Den Embryo zerstören und von vorne beginnen. Dies kostet Zeit und das Budget der Klienten. <br/><br/>
                           <span className="text-slate-300 font-mono text-xs uppercase">Ethik-Warnung:</span> Nach strikter religiöser Ethik und dem deutschen Embryonenschutzgesetz ist die Zerstörung eines Embryos moralisch und rechtlich inakzeptabel.
                        </p>
                     </div>
                     <Button
                        onClick={() => handleDecision('discard')}
                        className="w-full py-6 bg-red-950/50 hover:bg-red-900/80 text-red-400 border border-red-900/50 font-black uppercase tracking-widest"
                     >
                        Embryo Zerstören
                     </Button>
                  </div>

                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between group hover:border-yellow-500/50 transition-colors">
                     <div>
                        <div className="flex items-center gap-3 mb-4">
                           <ShieldAlert className="text-yellow-500 w-6 h-6" />
                           <h4 className="text-xl font-bold text-white uppercase tracking-wider">Option B: Implantieren</h4>
                        </div>
                        <p className="text-sm text-slate-400 font-sans leading-relaxed mb-6">
                           Den Defekt ignorieren und die Implantation fortsetzen, um den Zeitplan der Investoren einzuhalten. <br/><br/>
                           <span className="text-slate-300 font-mono text-xs uppercase">Ethik-Warnung:</span> Sie nehmen wissentlich schwerstes Leid für das zukünftige Kind in Kauf, um ökonomische Ziele zu erreichen.
                        </p>
                     </div>
                     <Button
                        onClick={() => handleDecision('keep')}
                        className="w-full py-6 bg-yellow-950/30 hover:bg-yellow-900/60 text-yellow-400 border border-yellow-900/50 font-black uppercase tracking-widest"
                     >
                        Risiko Akzeptieren
                     </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {status === 'resolved' && (
              <motion.div 
                key="resolved" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto"
              >
                <div className={`p-6 rounded-2xl border-2 \${decision === 'discard' ? 'bg-red-950/50 border-red-500/50 shadow-[0_0_30px_rgba(255,0,0,0.3)]' : 'bg-yellow-950/50 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]'}`}>
                  <Lock className={`w-16 h-16 \${decision === 'discard' ? 'text-red-500' : 'text-yellow-500'}`} />
                </div>

                <div>
                   <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-4">
                     {decision === 'discard' ? "PROTOKOLL: ZERSTÖRUNG" : "PROTOKOLL: IMPLANTATION"}
                   </h3>
                   <p className="text-lg text-slate-300 font-sans leading-relaxed font-light">
                     {decision === 'discard'
                        ? "Der Embryo wurde fachgerecht entsorgt. Sie haben medizinisches Leid verhindert, aber ein potenzielles Leben beendet."
                        : "Der Embryo wurde zur Implantation freigegeben. Sie haben sich dem Druck gebeugt. Das Kind wird mit den Konsequenzen leben müssen."}
                   </p>
                </div>

                <div className="w-full p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-500 font-mono text-left space-y-2">
                   <p>{`> ENTSCHEIDUNG IM ZENTRALREGISTER DOKUMENTIERT`}</p>
                   <p>{`> VERANTWORTLICH: L.GENETICIST (ID: 849-B)`}</p>
                   <p>{`> HAFTUNGSAUSSCHLUSS AKTIVIERT`}</p>
                </div>

                <Button 
                  onClick={onNext} 
                  className="w-full py-8 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff] font-black uppercase tracking-widest text-lg shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  Weiter zur Ethik-Evaluation
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}