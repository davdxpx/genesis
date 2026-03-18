import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Brain, AlertTriangle, Zap, Network, Lock, Fingerprint, Activity, Heart, Shield, Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- INTERFACES ---
interface PsycheState {
  empathy: number; // 0 (Psychopath) - 100 (Saint)
  ambition: number; // 0 (Zen/Lazy) - 100 (Machiavellian)
  resilience: number; // 0 (Fragile) - 100 (Stoic)
  conformity: number; // 0 (Rebel) - 100 (Soldier)
}

interface Archetype {
  id: string;
  name: string;
  desc: string;
  stats: PsycheState;
  icon: React.ElementType;
  color: string;
}

// --- LORE & DATA ---
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

// --- NEURAL NETWORK VISUALIZATION ---
const NeuralNet = ({ stats }: { stats: PsycheState }) => {
  let glowColor = '#00f0ff'; // Default / Balance
  if (stats.ambition > 80 && stats.empathy > 30) glowColor = '#ffaa00'; // High Drive
  if (stats.empathy > 80) glowColor = '#00ffaa'; // Pure empathy
  if (stats.empathy < 15) glowColor = '#ff0000'; // Danger / Psychopathy
  if (stats.resilience > 90 && stats.conformity > 80 && stats.empathy < 30) glowColor = '#ff00e5'; // Solider/Drone

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
      {/* Dynamic Background Pulse */}
      <motion.div 
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${glowColor}30 0%, transparent 60%)` }}
      />
      
      {/* SVG Connections */}
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
                 duration: node.lineDuration - (stats.ambition/100), // Faster if highly ambitious
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
      
      {/* Brain Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-30 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
        <Brain size={250} strokeWidth={0.5} style={{ color: glowColor }} />
      </div>

      {/* Warnings & Real Bio-Feedback based on stats */}
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
      className="w-full max-w-7xl mx-auto flex flex-col xl:flex-row gap-6 p-4 min-h-[85vh] text-[#00f0ff] font-mono"
    >
      
      {/* ==========================================
          LEFT PANE: VISUALIZER & ARCHETYPES
      ========================================== */}
      <div className="w-full xl:w-5/12 flex flex-col gap-6 h-full shrink-0">
         
         {/* Neural Net Visualizer (IPAD BIG) */}
         <Card className="flex-1 min-h-[400px] xl:min-h-[500px] bg-[#050A15] border-[#00f0ff]/30 shadow-2xl relative p-1 overflow-hidden">
            <NeuralNet stats={psyche} />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 z-30 pointer-events-none">
               <h3 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  {activeArchetype ? archetypes.find(a => a.id === activeArchetype)?.name : "CUSTOM ENGRAM"}
               </h3>
               <p className="text-sm text-[#00f0ff] font-mono mt-1 bg-black/50 inline-block px-2 py-1 rounded">
                 NEURONALES MAPPING AKTIV
               </p>
            </div>
         </Card>

         {/* Archetype Selector (Touch Targets) */}
         <Card className="shrink-0 bg-slate-900 border-slate-700 shadow-xl">
            <CardHeader className="py-4 border-b border-slate-800 bg-slate-900/80">
               <CardTitle className="text-sm font-bold tracking-widest text-slate-300 uppercase flex items-center gap-2">
                  <Fingerprint size={18} className="text-[#00f0ff]" /> Quick-Load: Vorlagen
               </CardTitle>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
               {archetypes.map(arch => (
                  <button
                    key={arch.id}
                    onClick={() => applyArchetype(arch)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${
                       activeArchetype === arch.id 
                       ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]' 
                       : 'bg-slate-900/50 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                     <div className={`absolute right-[-15px] top-[-15px] opacity-10 group-hover:opacity-20 transition-opacity ${activeArchetype === arch.id ? 'opacity-30' : ''}`}>
                        <arch.icon size={80} />
                     </div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                           <arch.icon size={20} style={{ color: arch.color }} />
                           <span className={`font-bold text-sm uppercase ${activeArchetype === arch.id ? 'text-white' : 'text-slate-300'}`}>{arch.name}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed h-10 line-clamp-2 font-sans">{arch.desc}</p>
                     </div>
                  </button>
               ))}
            </CardContent>
         </Card>
      </div>

      {/* ==========================================
          RIGHT PANE: SLIDERS & FINE TUNING
      ========================================== */}
      <div className="flex-1 flex flex-col h-full relative z-20">
         <Card className="flex-1 bg-slate-900 border-[#ff00e5]/30 shadow-2xl flex flex-col relative overflow-hidden">
            <CardHeader className="bg-slate-900/80 border-b border-slate-800 py-6">
               <CardTitle className="text-2xl font-black tracking-widest text-white flex items-center gap-3">
                  <Activity className="text-[#ff00e5] w-8 h-8" /> PSYCHE-MODULATION (CRISPR-N)
               </CardTitle>
               <div className="mt-3 p-3 bg-blue-950/30 border border-blue-900/50 rounded-lg flex gap-3 text-slate-300 text-sm font-sans">
                 <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
                 <p>Veränderungen an Neurotransmittern (Dopamin, Serotonin) sind hochkomplex. <strong>Biologische Pleiotropie</strong> bedeutet, dass die Erhöhung eines Merkmals oft unerwünschte Nebenwirkungen auf ein anderes hat.</p>
               </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 space-y-10 pb-32">
               
               {/* SLIDER 1: EMPATHIE */}
               <div className="space-y-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-end mb-2">
                     <label className="text-lg font-bold text-[#00ffaa] uppercase tracking-wider flex items-center gap-2">
                        <Heart size={20} /> Empathie (Spiegelneuronen-Dichte)
                     </label>
                     <span className="font-mono text-3xl font-black text-white">{psyche.empathy}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('empathy', Math.max(0, psyche.empathy - 5))} className="w-12 h-12 shrink-0 border-slate-600"><Minus /></Button>
                     <input type="range" min="0" max="100" value={psyche.empathy} onChange={(e) => handleSliderChange('empathy', parseInt(e.target.value))} className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#00ffaa]" />
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('empathy', Math.min(100, psyche.empathy + 5))} className="w-12 h-12 shrink-0 border-slate-600"><Plus /></Button>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono uppercase mt-2">
                     <span>Psychopathie (0%)</span>
                     <span>Altruismus (100%)</span>
                  </div>
                  {psyche.empathy < 20 && <p className="text-sm font-bold text-red-400 mt-2">Warnung: Subjekt zeigt stark soziopathische Tendenzen.</p>}
               </div>

               {/* SLIDER 2: AMBITION */}
               <div className="space-y-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-end mb-2">
                     <label className="text-lg font-bold text-[#ffaa00] uppercase tracking-wider flex items-center gap-2">
                        <Zap size={20} /> Dopamin-Antrieb (Ambition)
                     </label>
                     <span className="font-mono text-3xl font-black text-white">{psyche.ambition}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('ambition', Math.max(0, psyche.ambition - 5))} className="w-12 h-12 shrink-0 border-slate-600"><Minus /></Button>
                     <input type="range" min="0" max="100" value={psyche.ambition} onChange={(e) => handleSliderChange('ambition', parseInt(e.target.value))} className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ffaa00]" />
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('ambition', Math.min(100, psyche.ambition + 5))} className="w-12 h-12 shrink-0 border-slate-600"><Plus /></Button>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono uppercase mt-2">
                     <span>Zufrieden/Passiv</span>
                     <span>Machtgier/Manisch</span>
                  </div>
               </div>

               {/* SLIDER 3: RESILIENZ */}
               <div className="space-y-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                  <div className="flex justify-between items-end mb-2">
                     <label className="text-lg font-bold text-[#ff00e5] uppercase tracking-wider flex items-center gap-2">
                        <Shield size={20} /> Stress-Resistenz (Cortisol-Hemmer)
                     </label>
                     <span className="font-mono text-3xl font-black text-white">{psyche.resilience}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('resilience', Math.max(0, psyche.resilience - 5))} className="w-12 h-12 shrink-0 border-slate-600"><Minus /></Button>
                     <input type="range" min="0" max="100" value={psyche.resilience} onChange={(e) => handleSliderChange('resilience', parseInt(e.target.value))} className="w-full h-4 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#ff00e5]" />
                     <Button variant="outline" size="icon" onClick={() => handleSliderChange('resilience', Math.min(100, psyche.resilience + 5))} className="w-12 h-12 shrink-0 border-slate-600"><Plus /></Button>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono uppercase mt-2">
                     <span>Fragil/Sensibel</span>
                     <span>Trauma-Resistent</span>
                  </div>
               </div>

            </CardContent>
         </Card>

         {/* FIXED BOTTOM NAVIGATION */}
         <div className="absolute bottom-0 right-0 left-0 p-4 md:p-6 bg-gradient-to-t from-[#050A15] to-transparent flex justify-end">
            <Button 
               size="lg"
               disabled={isEthicallyBlocked}
               onClick={() => {
                  if(gameState.updateGameState) {
                     gameState.updateGameState({ psychology: psyche });
                  }
                  onNext();
               }}
               className={`py-8 px-10 text-lg font-black tracking-widest uppercase transition-all ${
                 isEthicallyBlocked 
                   ? 'bg-red-950 text-red-500 border-2 border-red-500 cursor-not-allowed opacity-80'
                   : 'bg-[#ff00e5] hover:bg-[#ff00e5]/80 text-white shadow-[0_0_30px_rgba(255,0,229,0.5)] border-none'
               }`}
            >
               {isEthicallyBlocked ? (
                 <span className="flex items-center gap-2"><Lock className="w-6 h-6"/> ETHIK-SPERRE: ILLEGALE PARAMETER</span>
               ) : (
                 <span className="flex items-center gap-2">PSYCHE ABSCHLIESSEN <ArrowRightIcon className="ml-2 w-6 h-6" /></span>
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

// Icon helper
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
   )
}