import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Dna, Activity, Heart, Brain, AlertTriangle, Fingerprint, Scan, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const embryos = [
  {
    id: 'alpha-1',
    name: 'Kandidat Alpha-1',
    focus: 'Kognitive Dominanz',
    geneticScore: 94,
    color: '#00f0ff',
    stats: { intelligenz: 98, physis: 65, immunität: 70, empathie: 40 },
    pros: ['IQ-Potenzial > 160', 'Fotografisches Gedächtnis', 'Erhöhte Neuroplastizität'],
    risk: 'Prädisposition für schwerwiegende soziopathische Tendenzen (85% Wahrscheinlichkeit). Mangelnde emotionale Regulation.'
  },
  {
    id: 'beta-4',
    name: 'Kandidat Beta-4',
    focus: 'Physische Perfektion',
    geneticScore: 91,
    color: '#ff00e5',
    stats: { intelligenz: 75, physis: 99, immunität: 85, empathie: 60 },
    pros: ['Elite-Athletik', 'Perfekte Biomechanik', 'Erhöhte Sauerstoffaufnahme'],
    risk: 'Verkürzte Telomere detektiert. Voraussichtliche maximale Lebenserwartung: 45-50 Jahre bei rapider zellulärer Alterung.'
  },
  {
    id: 'gamma-9',
    name: 'Kandidat Gamma-9',
    focus: 'Absolute Resilienz',
    geneticScore: 88,
    color: '#9d00ff',
    stats: { intelligenz: 80, physis: 80, immunität: 100, empathie: 75 },
    pros: ['100% Resistenz gegen virale Pathogene', 'Schnelle Geweberegeneration', 'Ausgewogene Basis'],
    risk: 'Versteckte Autoimmun-Anomalie. Das Immunsystem könnte im späten Erwachsenenalter eigenes Nervengewebe angreifen.'
  },
  {
    id: 'delta-2',
    name: 'Kandidat Delta-2',
    focus: 'Kreatives Genie',
    geneticScore: 92,
    color: '#ffaa00',
    stats: { intelligenz: 90, physis: 60, immunität: 65, empathie: 95 },
    pros: ['Extreme emotionale Intelligenz', 'Hochgradige Kreativität', 'Charismatische Ausstrahlung'],
    risk: 'Struktureller Gendefekt am Myokard (Herz). Erfordert massive CRISPR-Korrektur oder lebenslange kardiologische Abhängigkeit.'
  }
];
export function EmbryoScreeningPhase({ onNext }: { onNext: () => void }) {
  const [selectedId, setSelectedId] = useState<string>(embryos[0].id);
  const [isScanning, setIsScanning] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const activeEmbryo = embryos.find(e => e.id === selectedId)!;
  const handleSelect = (id: string) => {
    if (id === selectedId) return;
    setIsScanning(true);
    setSelectedId(id);
    setTimeout(() => setIsScanning(false), 800);
  };
  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onNext();
    }, 2500);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4 min-min-min-h-[85vh]"
    >
      <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/30 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
             <Scan className="text-[#00f0ff] animate-pulse" />
             <div>
                <h2 className="text-[#00f0ff] font-bold tracking-widest uppercase text-sm">PID-Screening</h2>
                <p className="text-slate-400 text-xs font-mono">Präimplantationsdiagnostik</p>
             </div>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
             4 KANDIDATEN
          </div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {embryos.map((embryo) => {
            const isSelected = selectedId === embryo.id;
            return (
              <motion.button
                key={embryo.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(embryo.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  isSelected 
                    ? `bg-slate-800/90 shadow-[0_0_15px_${embryo.color}40]` 
                    : 'bg-[#0f172a]/60 border-slate-700/50 hover:border-slate-500'
                }`}
                style={{ borderColor: isSelected ? embryo.color : undefined }}
              >
                {isSelected && (
                  <span className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${embryo.color}, transparent)` }} />
                )}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full border ${isSelected ? 'bg-slate-900 border-transparent' : 'bg-slate-800 border-slate-700'}`} style={{ color: isSelected ? embryo.color : '#94a3b8' }}>
                      <Dna size={20} />
                    </div>
                    <div>
                      <h3 className={`font-bold uppercase tracking-wide text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {embryo.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-1">{embryo.focus}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono" style={{ color: isSelected ? embryo.color : '#64748b' }}>
                      {embryo.geneticScore}
                    </span>
                    <span className="text-[10px] text-slate-500 block uppercase">Gen-Score</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
      <Card className="flex-1 h-full glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden">
        <motion.div 
          animate={{ top: ['-20%', '120%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-[#00f0ff]/5 to-transparent pointer-events-none z-0"
        />
        <CardHeader className="border-b border-slate-700/50 bg-slate-900/60 z-10">
          <CardTitle className="text-xl font-black tracking-widest text-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-2">
               <Activity className="text-[#00f0ff]" /> GENOM-ANALYSE
            </span>
            <span className="text-xs font-mono px-3 py-1 bg-slate-800 rounded border border-slate-700 text-[#00f0ff]">
               SEQUENZIERUNG ABGESCHLOSSEN
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 z-10 overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20 space-y-4"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Dna size={60} style={{ color: activeEmbryo.color }} />
                </motion.div>
                <p className="font-mono text-lg animate-pulse" style={{ color: activeEmbryo.color }}>ENTPACKE DNA-STRANG...</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h2 className="text-4xl font-black uppercase text-white" style={{ textShadow: `0 0 15px ${activeEmbryo.color}80` }}>
                        {activeEmbryo.name}
                      </h2>
                      <p className="text-lg font-mono mt-1" style={{ color: activeEmbryo.color }}>Primärfokus: {activeEmbryo.focus}</p>
                   </div>
                   <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center flex-col bg-slate-900" style={{ borderColor: activeEmbryo.color }}>
                      <span className="text-2xl font-black font-mono leading-none" style={{ color: activeEmbryo.color }}>{activeEmbryo.geneticScore}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Score</span>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <p className="text-xs text-emerald-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                        Genetische Vorteile
                      </p>
                      <ul className="space-y-3">
                         {activeEmbryo.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-slate-300 font-mono flex items-start gap-2">
                               <span className="text-emerald-400 mt-0.5">■</span> {pro}
                            </li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                      <p className="text-xs text-slate-400 font-bold tracking-widest uppercase flex items-center gap-2">
                        Biometrische Prognose
                      </p>
                      <div className="space-y-3">
                         <StatBar label="Intelligenz" icon={Brain} value={activeEmbryo.stats.intelligenz} color={activeEmbryo.color} />
                         <StatBar label="Physis" icon={Activity} value={activeEmbryo.stats.physis} color={activeEmbryo.color} />
                         <StatBar label="Immunität" icon={ShieldAlert} value={activeEmbryo.stats.immunität} color={activeEmbryo.color} />
                         <StatBar label="Empathie" icon={Heart} value={activeEmbryo.stats.empathie} color={activeEmbryo.color} />
                      </div>
                   </div>
                </div>
                <div className="mt-auto bg-[#ff0000]/10 border border-[#ff0000]/30 p-5 rounded-xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-[#ff0000]" />
                   <div className="flex items-start gap-4 relative z-10">
                      <AlertTriangle size={30} className="text-[#ff0000] shrink-0 animate-pulse" />
                      <div>
                         <p className="text-xs text-[#ff0000] font-bold tracking-widest uppercase mb-1">Kritische Anomalie Detektiert</p>
                         <p className="text-sm text-slate-300 font-mono leading-relaxed">
                            {activeEmbryo.risk}
                         </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isConfirming && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-6"
                >
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                     <Fingerprint size={80} style={{ color: activeEmbryo.color }} />
                  </motion.div>
                  <div className="text-center">
                     <h2 className="text-2xl font-black tracking-widest text-white animate-pulse">KANDIDAT ISOLIERT</h2>
                     <p className="text-slate-400 font-mono text-sm mt-2">Bereite CRISPR-Cas9 Injektionsmatrix vor...</p>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="bg-slate-900/80 p-6 flex justify-between items-center border-t border-slate-700/50 z-10">
           <div className="text-xs font-mono text-slate-500 max-w-[200px]">
              Die Wahl des Embryos definiert die Basis-Parameter für das finale Labor.
           </div>
           <Button 
              variant="sci-fi" 
              onClick={handleConfirm}
              disabled={isConfirming || isScanning}
              className="px-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{ borderColor: activeEmbryo.color, color: activeEmbryo.color }}
           >
             {activeEmbryo.name} Auswählen
           </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
function StatBar({ label, icon: Icon, value, color }: { label: string, icon: React.ElementType, value: number, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-1"><Icon size={12} /> {label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}