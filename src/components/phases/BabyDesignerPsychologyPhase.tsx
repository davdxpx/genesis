import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Brain, AlertTriangle, Zap, Network, Lock, Fingerprint, Activity, Heart, Shield, Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RolePopup } from '../ui/RolePopup';
interface PsycheState {
  empathy: number;
  ambition: number;
  resilience: number;
  conformity: number;
}
interface Archetype {
  id: string;
  name: string;
  desc: string;
  stats: PsycheState;
  icon: React.ElementType;
  color: string;
}
const archetypes: Archetype[] = [
  { 
    id: 'leader', name: 'Der Souverän (Manager)', desc: 'Hohe Ambition, mittlere Empathie, extrem resilient.',
    stats: { empathy: 40, ambition: 90, resilience: 95, conformity: 60 },
    icon: Shield, color: '#ffaa00'
  },
  { 
    id: 'visionary', name: 'Das kreative Genie', desc: 'Niedrige Konformität, hohe Ambition, fragile Psyche.',
    stats: { empathy: 60, ambition: 85, resilience: 30, conformity: 10 },
    icon: Network, color: '#00f0ff'
  },
  { 
    id: 'guardian', name: 'Der Altruist', desc: 'Extrem hohe Empathie, niedrige Ambition. (Gefahr von Burnout).',
    stats: { empathy: 95, ambition: 20, resilience: 70, conformity: 90 },
    icon: Heart, color: '#00ffaa'
  },
  { 
    id: 'ghost', name: 'Der Supersoldat', desc: 'Keine Empathie, maximale Resilienz. Der perfekte operative Befehlsempfänger.',
    stats: { empathy: 5, ambition: 70, resilience: 100, conformity: 100 },
    icon: Lock, color: '#ff00e5'
  }
];
interface GameStateProps {
  updateGameState?: (data: Record<string, unknown>) => void;
}
interface NodeData {
  id: number;
  x: number;
  y: number;
  r: number;
  duration: number;
  delay: number;
  lineDuration: number;
  lineDelay: number;
}
const NeuralNet = ({ stats }: { stats: PsycheState }) => {
  let glowColor = '#00f0ff';
  if (stats.ambition > 80 && stats.empathy > 30) glowColor = '#ffaa00';
  if (stats.empathy > 80) glowColor = '#00ffaa';
  if (stats.empathy < 15) glowColor = '#ff0000';
  if (stats.resilience > 90 && stats.conformity > 80 && stats.empathy < 30) glowColor = '#ff00e5';
  const [nodes, setNodes] = useState<NodeData[]>([]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNodes(
        Array.from({ length: 25 }).map((_, i) => ({
          id: i,
          x: 5 + Math.random() * 90,
          y: 5 + Math.random() * 90,
          r: Math.random() * 4 + 2,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 2,
          lineDuration: 1.5 + Math.random() * 2,
          lineDelay: Math.random() * 1
        }))
      );
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);
  if (nodes.length === 0) return null;
  return (
    <div className="w-full h-full relative bg-[#02050a] overflow-hidden rounded-xl border border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      <motion.div 
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${glowColor}30 0%, transparent 60%)` }}
      />
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
        {nodes.map((node, i) => (
           nodes.slice(i + 1, i + 3).map((target, j) => (
             <motion.line 
               key={`${i}-${j}`}
               x1={`${node.x}%`} y1={`${node.y}%`}
               x2={`${target.x}%`} y2={`${target.y}%`}
               stroke={glowColor}
               strokeWidth={stats.ambition > 80 ? "1.5" : "0.5"}
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ 
                 pathLength: 1, 
                 opacity: [0.1, 0.5 + (stats.ambition/200), 0.1],
               }}
               transition={{ 
                 duration: node.lineDuration - (stats.ambition/100),
                 repeat: Infinity, 
                 repeatType: "reverse",
                 delay: node.lineDelay
               }}
             />
           ))
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={`${node.x}%`} cy={`${node.y}%`} r={node.r}
            fill={glowColor}
            animate={{ 
               scale: [1, 1.8, 1],
               fillOpacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: node.duration - (stats.resilience/200),
              repeat: Infinity,
              delay: node.delay
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-30 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
        <Brain size={250} strokeWidth={0.5} style={{ color: glowColor }} />
      </div>
      <AnimatePresence>
         {stats.empathy < 15 && (
           <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-4 left-0 right-0 flex justify-center z-30">
              <div className="bg-red-950/80 border border-red-500 p-2 rounded text-red-400 text-xs md:text-sm font-bold animate-pulse flex items-center gap-2 shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                 <AlertTriangle size={16} /> SOZIOPATHIE-WARNUNG (MAOA-Gen Extremwert)
              </div>
           </motion.div>
         )}
         {stats.ambition > 85 && stats.resilience < 40 && (
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
              <div className="bg-yellow-950/80 border border-yellow-500 p-2 rounded text-yellow-400 text-xs md:text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                 <Activity size={16} /> PLEIOTROPIE: Erhöhtes Depressions/Burnout-Risiko.
              </div>
           </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};
export function BabyDesignerPsychologyPhase({ onNext, gameState }: { onNext: () => void, gameState: GameStateProps }) {
  const [psyche, setPsyche] = useState<PsycheState>({ empathy: 50, ambition: 50, resilience: 50, conformity: 50 });
  const [activeArchetype, setActiveArchetype] = useState<string | null>(null);
  const handleSliderChange = (key: keyof PsycheState, val: number) => {
    setPsyche(prev => ({ ...prev, [key]: val }));
    setActiveArchetype(null);
  };
  const applyArchetype = (arch: Archetype) => {
    setPsyche(arch.stats);
    setActiveArchetype(arch.id);
  };
  const isEthicallyBlocked = psyche.empathy < 10 && psyche.resilience > 90;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-2 md:p-4 min-h-[85vh] text-[#00f0ff] font-mono"
    >
      <RolePopup
        title="Psychologie-Modulation"
        description="Justieren Sie Neurotransmitter (Dopamin, Serotonin), um das Verhaltensprofil zu formen. Achten Sie auf Pleiotropie: Das Erhöhen eines Merkmals kann extreme Auswirkungen auf ein anderes haben!"
      />
      <div className="w-full lg:w-5/12 flex flex-col gap-4 md:gap-6 lg:h-full shrink-0">
         <Card className="flex-1 min-h-[300px] lg:min-h-[500px] bg-[#050A15] border-[#00f0ff]/30 shadow-2xl relative p-1 overflow-hidden">
            <NeuralNet stats={psyche} />
            <div className="absolute bottom-6 left-6 z-30 pointer-events-none">
               <h3 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  {activeArchetype ? archetypes.find(a => a.id === activeArchetype)?.name : "CUSTOM ENGRAM"}
               </h3>
               <p className="text-sm text-[#00f0ff] font-mono mt-1 bg-black/50 inline-block px-2 py-1 rounded">
                 NEURONALES MAPPING AKTIV
               </p>
            </div>
         </Card>
         <Card className="shrink-0 bg-[#0A101D] border-[#00f0ff]/20 shadow-xl">
            <CardHeader className="py-3 md:py-4 border-b border-slate-800 bg-slate-900/80">
               <CardTitle className="text-xs md:text-sm font-bold tracking-widest text-slate-300 uppercase flex items-center gap-2">
                  <Fingerprint size={16} className="text-[#00f0ff]" /> Vorlagen (Engramme)
               </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-h-[40vh] overflow-y-auto lg:max-h-none custom-scrollbar">
               {archetypes.map(arch => (
                  <button
                    key={arch.id}
                    onClick={() => applyArchetype(arch)}
                    className={`p-3 md:p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                       activeArchetype === arch.id 
                       ? 'bg-slate-800/80 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                       : 'bg-slate-900/40 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60'
                    }`}
                  >
                     <div className={`absolute -right-4 -top-4 opacity-[0.05] group-hover:opacity-10 transition-opacity ${activeArchetype === arch.id ? 'opacity-20' : ''}`}>
                        <arch.icon size={100} />
                     </div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1 md:mb-2">
                           <div className={`p-1.5 rounded bg-slate-950/50 ${activeArchetype === arch.id ? 'shadow-[0_0_10px_rgba(0,240,255,0.2)]' : ''}`}>
                             <arch.icon size={14} style={{ color: arch.color }} className="md:w-[16px] md:h-[16px]" />
                           </div>
                           <span className={`font-bold text-[10px] md:text-xs uppercase tracking-wider ${activeArchetype === arch.id ? 'text-white' : 'text-slate-300'}`}>{arch.name}</span>
                        </div>
                        <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed font-sans">{arch.desc}</p>
                     </div>
                  </button>
               ))}
            </CardContent>
         </Card>
      </div>
      <div className="flex-1 flex flex-col relative z-20">
         <Card className="flex-1 bg-[#0A101D] border-[#ff00e5]/20 shadow-2xl flex flex-col relative overflow-hidden">
            <CardHeader className="bg-slate-900/60 border-b border-slate-800/50 py-4 md:py-6 z-10">
               <CardTitle className="text-xl md:text-2xl font-black tracking-widest text-white flex items-center gap-2 md:gap-3">
                  <Activity className="text-[#ff00e5] w-6 h-6 md:w-8 md:h-8" /> PSYCHE-MODULATION (CRISPR-N)
               </CardTitle>
               <div className="mt-3 md:mt-4 p-3 md:p-4 bg-blue-950/20 border border-blue-900/30 rounded-xl flex gap-3 text-slate-300 text-xs md:text-sm font-sans shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                 <Info className="text-blue-400 shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                 <p className="leading-relaxed">Veränderungen an Neurotransmittern sind hochkomplex. <strong>Biologische Pleiotropie</strong> bedeutet, dass die Erhöhung eines Merkmals oft unerwünschte Nebenwirkungen auf ein anderes hat.</p>
               </div>
            </CardHeader>
            <CardContent className="overflow-visible custom-scrollbar p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 pb-32">

               <div className="space-y-4 bg-slate-900/40 p-4 md:p-6 rounded-2xl border border-slate-800/50 hover:border-[#00ffaa]/30 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffaa]/5 blur-3xl rounded-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4 relative z-10">
                     <label className="text-base md:text-lg font-bold text-[#00ffaa] uppercase tracking-wider flex items-center gap-2">
                        <Heart size={18} className="md:w-[20px] md:h-[20px]" /> Empathie (Spiegelneuronen)
                     </label>
                     <span className="font-mono text-2xl md:text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(0,255,170,0.5)]">{psyche.empathy}%</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 relative z-10">
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('empathy', Math.max(0, psyche.empathy - 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-950 border-slate-700 text-slate-400 hover:text-[#00ffaa] hover:border-[#00ffaa]/50 hover:bg-[#00ffaa]/10"><Minus size={16} /></Button>
                     <div className="relative w-full h-2 md:h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-slate-700 to-[#00ffaa]" style={{ width: `${psyche.empathy}%` }} />
                        <input type="range" min="0" max="100" value={psyche.empathy} onChange={(e) => handleSliderChange('empathy', parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                     </div>
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('empathy', Math.min(100, psyche.empathy + 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-950 border-slate-700 text-slate-400 hover:text-[#00ffaa] hover:border-[#00ffaa]/50 hover:bg-[#00ffaa]/10"><Plus size={16} /></Button>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs text-slate-500 font-mono uppercase mt-2 relative z-10">
                     <span>Psychopathie</span>
                     <span>Altruismus</span>
                  </div>
                  {psyche.empathy < 20 && <p className="text-xs md:text-sm font-bold text-red-400 mt-2 bg-red-950/30 p-2 rounded inline-block border border-red-900/50">Warnung: Subjekt zeigt soziopathische Tendenzen.</p>}
               </div>

               <div className="space-y-4 bg-slate-900/40 p-4 md:p-6 rounded-2xl border border-slate-800/50 hover:border-[#ffaa00]/30 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffaa00]/5 blur-3xl rounded-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4 relative z-10">
                     <label className="text-base md:text-lg font-bold text-[#ffaa00] uppercase tracking-wider flex items-center gap-2">
                        <Zap size={18} className="md:w-[20px] md:h-[20px]" /> Dopamin-Antrieb (Ambition)
                     </label>
                     <span className="font-mono text-2xl md:text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,170,0,0.5)]">{psyche.ambition}%</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 relative z-10">
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('ambition', Math.max(0, psyche.ambition - 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-950 border-slate-700 text-slate-400 hover:text-[#ffaa00] hover:border-[#ffaa00]/50 hover:bg-[#ffaa00]/10"><Minus size={16} /></Button>
                     <div className="relative w-full h-2 md:h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-slate-700 to-[#ffaa00]" style={{ width: `${psyche.ambition}%` }} />
                        <input type="range" min="0" max="100" value={psyche.ambition} onChange={(e) => handleSliderChange('ambition', parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                     </div>
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('ambition', Math.min(100, psyche.ambition + 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-950 border-slate-700 text-slate-400 hover:text-[#ffaa00] hover:border-[#ffaa00]/50 hover:bg-[#ffaa00]/10"><Plus size={16} /></Button>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs text-slate-500 font-mono uppercase mt-2 relative z-10">
                     <span>Zufrieden/Passiv</span>
                     <span>Machtgierig/Manisch</span>
                  </div>
               </div>

               <div className="space-y-4 bg-slate-900/40 p-4 md:p-6 rounded-2xl border border-slate-800/50 hover:border-[#ff00e5]/30 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00e5]/5 blur-3xl rounded-full pointer-events-none" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4 relative z-10">
                     <label className="text-base md:text-lg font-bold text-[#ff00e5] uppercase tracking-wider flex items-center gap-2">
                        <Shield size={18} className="md:w-[20px] md:h-[20px]" /> Stress-Resistenz (Cortisol)
                     </label>
                     <span className="font-mono text-2xl md:text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,0,229,0.5)]">{psyche.resilience}%</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 relative z-10">
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('resilience', Math.max(0, psyche.resilience - 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-950 border-slate-700 text-slate-400 hover:text-[#ff00e5] hover:border-[#ff00e5]/50 hover:bg-[#ff00e5]/10"><Minus size={16} /></Button>
                     <div className="relative w-full h-2 md:h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-slate-700 to-[#ff00e5]" style={{ width: `${psyche.resilience}%` }} />
                        <input type="range" min="0" max="100" value={psyche.resilience} onChange={(e) => handleSliderChange('resilience', parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                     </div>
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('resilience', Math.min(100, psyche.resilience + 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-slate-950 border-slate-700 text-slate-400 hover:text-[#ff00e5] hover:border-[#ff00e5]/50 hover:bg-[#ff00e5]/10"><Plus size={16} /></Button>
                  </div>
                  <div className="flex justify-between text-[10px] md:text-xs text-slate-500 font-mono uppercase mt-2 relative z-10">
                     <span>Fragil/Sensibel</span>
                     <span>Trauma-Resistent</span>
                  </div>
               </div>

            </CardContent>
         </Card>

         <div className="fixed sm:sticky bottom-0 right-0 left-0 p-4 md:p-6 bg-gradient-to-t from-[#050A15] via-[#050A15]/90 to-transparent flex justify-center sm:justify-end z-40 sm:z-30 border-t sm:border-none border-slate-800 sm:bg-transparent">
            <Button 
               size="lg"
               disabled={isEthicallyBlocked}
               onClick={() => {
                  if(gameState.updateGameState) {
                     gameState.updateGameState({ psychology: psyche });
                  }
                  onNext();
               }}
               className={`w-full sm:w-auto py-6 sm:py-8 px-6 sm:px-10 text-sm sm:text-lg font-black tracking-widest uppercase transition-all ${
                 isEthicallyBlocked 
                   ? 'bg-red-950 text-red-500 border-2 border-red-500 cursor-not-allowed opacity-80'
                   : 'bg-[#ff00e5] hover:bg-[#ff00e5]/80 text-white shadow-[0_0_20px_rgba(255,0,229,0.5)] border border-[#ff00e5]'
               }`}
            >
               {isEthicallyBlocked ? (
                 <span className="flex items-center justify-center gap-2 w-full"><Lock className="w-4 h-4 sm:w-6 sm:h-6"/> ILLEGALE PARAMETER</span>
               ) : (
                 <span className="flex items-center justify-center gap-2 w-full">PSYCHE ABSCHLIESSEN <ArrowRightIcon className="ml-1 sm:ml-2 w-4 h-4 sm:w-6 sm:h-6" /></span>
               )}
            </Button>
         </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 20px; }
      `}</style>
    </motion.div>
  );
}
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M5 12h14" />
         <path d="m12 5 7 7-7 7" />
      </svg>
   )
}