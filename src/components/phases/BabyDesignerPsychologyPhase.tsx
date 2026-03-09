import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Brain, AlertTriangle, Zap, Network, Lock, Fingerprint, Activity, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

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
    id: 'leader', name: 'Der Souverän', desc: 'Geborener Anführer. Hohe Ambition, mittlere Empathie, extrem resilient.',
    stats: { empathy: 40, ambition: 90, resilience: 95, conformity: 60 },
    icon: Shield, color: '#ffaa00'
  },
  { 
    id: 'visionary', name: 'Der Architekt', desc: 'Kreatives Genie. Niedrige Konformität, hohe Ambition, fragile Psyche.',
    stats: { empathy: 60, ambition: 85, resilience: 30, conformity: 10 },
    icon: Network, color: '#00f0ff'
  },
  { 
    id: 'guardian', name: 'Der Bewahrer', desc: 'Der ultimative Bürger. Hohe Empathie und Konformität, niedrige Ambition.',
    stats: { empathy: 95, ambition: 20, resilience: 70, conformity: 90 },
    icon: Heart, color: '#00ffaa'
  },
  { 
    id: 'ghost', name: 'Der Schatten', desc: 'Operativ perfekt. Keine Empathie, maximale Resilienz. Der perfekte Agent.',
    stats: { empathy: 5, ambition: 70, resilience: 100, conformity: 80 },
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
  // Determine color based on dominant trait
  let glowColor = '#00f0ff';
  if (stats.ambition > 80) glowColor = '#ffaa00';
  if (stats.empathy > 80) glowColor = '#00ffaa';
  if (stats.empathy < 10 && stats.resilience > 80) glowColor = '#ff00e5'; // Psycho mode

  // Procedural nodes
  const [nodes, setNodes] = useState<NodeData[]>([]);

  useEffect(() => {
    // We delay the node generation slightly to bypass the strict mode hydration checks
    const timeoutId = setTimeout(() => {
      setNodes(
        Array.from({ length: 20 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 3 + 2,
          duration: 3 + Math.random(),
          delay: Math.random() * 5,
          lineDuration: 2 + Math.random(),
          lineDelay: Math.random() * 2
        }))
      );
    }, 10);
    return () => clearTimeout(timeoutId);
  }, []);

  if (nodes.length === 0) return null;

  return (
    <div className="w-full h-full relative bg-slate-950/50 overflow-hidden rounded-xl border border-slate-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      {/* Dynamic Background Pulse */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${glowColor}20 0%, transparent 70%)` }}
      />
      
      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {nodes.map((node, i) => (
           nodes.slice(i + 1, i + 4).map((target, j) => (
             <motion.line 
               key={`${i}-${j}`}
               x1={`${node.x}%`} y1={`${node.y}%`}
               x2={`${target.x}%`} y2={`${target.y}%`}
               stroke={glowColor}
               strokeWidth="0.5"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ 
                 pathLength: 1, 
                 opacity: [0.1, 0.4 + (stats.ambition/200), 0.1], // Ambition makes it pulsate harder
               }}
               transition={{ 
                 duration: node.lineDuration, 
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
               scale: [1, 1.5, 1],
               fillOpacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: node.duration,
              repeat: Infinity,
              delay: node.delay
            }}
          />
        ))}
      </svg>
      
      {/* Brain Icon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-20">
        <Brain size={300} strokeWidth={0.5} className="text-white" />
      </div>

      {/* Warning Overlay for Extreme Stats */}
      {stats.empathy < 15 && (
        <div className="absolute top-4 left-0 right-0 flex justify-center z-30">
           <div className="bg-red-500/20 border border-red-500/50 px-3 py-1 rounded text-red-500 text-xs font-mono animate-pulse flex items-center gap-2">
              <AlertTriangle size={14} /> SOZIOPATHIE-WARNUNG
           </div>
        </div>
      )}
    </div>
  );
};

export function BabyDesignerPsychologyPhase({ onNext, gameState }: { onNext: () => void, gameState: GameStateProps }) {
  const [psyche, setPsyche] = useState<PsycheState>({ empathy: 50, ambition: 50, resilience: 50, conformity: 50 });
  const [activeArchetype, setActiveArchetype] = useState<string | null>(null);

  const handleSliderChange = (key: keyof PsycheState, val: number) => {
    setPsyche(prev => ({ ...prev, [key]: val }));
    setActiveArchetype(null); // Custom changes break the archetype preset
  };

  const applyArchetype = (arch: Archetype) => {
    setPsyche(arch.stats);
    setActiveArchetype(arch.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 p-2 md:p-4 min-h-[85vh] lg:min-h-[80vh]"
    >
      
      {/* ==========================================
          LEFT PANE: VISUALIZER & ARCHETYPES
      ========================================== */}
      <div className="w-full lg:w-5/12 flex flex-col gap-4 h-full shrink-0">
         
         {/* Neural Net Visualizer */}
         <div className="flex-1 min-h-[300px] relative">
            <NeuralNet stats={psyche} />
            
            {/* Overlay Info */}
            <div className="absolute bottom-4 left-4 z-30">
               <h3 className="text-2xl font-black text-white tracking-widest uppercase drop-shadow-md">
                  {activeArchetype ? archetypes.find(a => a.id === activeArchetype)?.name : "BENUTZER-DEFINIERT"}
               </h3>
               <p className="text-xs text-[#00f0ff] font-mono mt-1">NEURAL-KONFIGURATION AKTIV</p>
            </div>
         </div>

         {/* Archetype Selector */}
         <Card className="shrink-0 glass border-slate-700/50">
            <CardHeader className="py-3 border-b border-slate-700/50 bg-slate-900/50">
               <CardTitle className="text-sm font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
                  <Fingerprint size={16} className="text-[#00f0ff]" /> Persönlichkeits-Archetyp wählen
               </CardTitle>
            </CardHeader>
            <CardContent className="p-3 grid grid-cols-2 gap-2">
               {archetypes.map(arch => (
                  <button
                    key={arch.id}
                    onClick={() => applyArchetype(arch)}
                    className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden group ${
                       activeArchetype === arch.id 
                       ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                       : 'bg-slate-900/40 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                     <div className={`absolute right-[-10px] top-[-10px] opacity-10 group-hover:opacity-20 transition-opacity ${activeArchetype === arch.id ? 'opacity-30' : ''}`}>
                        <arch.icon size={60} />
                     </div>
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                           <arch.icon size={16} style={{ color: arch.color }} />
                           <span className={`font-bold text-xs uppercase ${activeArchetype === arch.id ? 'text-white' : 'text-slate-300'}`}>{arch.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight line-clamp-2">{arch.desc}</p>
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
         <Card className="flex-1 glass border-[#ff00e5]/20 flex flex-col relative overflow-hidden">
            <CardHeader className="bg-slate-900/60 border-b border-slate-700/50 py-4">
               <CardTitle className="text-lg font-black tracking-widest text-slate-100 flex items-center gap-2">
                  <Activity className="text-[#ff00e5]" /> PSYCHE-MODULATION
               </CardTitle>
               <p className="text-xs text-slate-400 font-mono mt-1">Warnung: Extreme Einstellungen können zu sozialer Dysfunktion führen.</p>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
               
               {/* SLIDER 1: EMPATHIE */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <label className="text-sm font-bold text-[#00ffaa] uppercase tracking-wider flex items-center gap-2">
                        <Heart size={16} /> Empathie & Spiegelneuronen
                     </label>
                     <span className="font-mono text-xl font-bold text-white">{psyche.empathy}%</span>
                  </div>
                  <input 
                     type="range" min="0" max="100" value={psyche.empathy} 
                     onChange={(e) => handleSliderChange('empathy', parseInt(e.target.value))}
                     className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00ffaa]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                     <span>Psychopathie</span>
                     <span>Altruismus</span>
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border-l-2 border-[#00ffaa]">
                     {psyche.empathy < 20 ? "Subjekt zeigt keinerlei emotionale Resonanz. Perfekt für rationale Entscheidungen, hohes Risiko für Kriminalität." : 
                      psyche.empathy > 80 ? "Hypersensibel. Spürt den Schmerz anderer physisch. Gefahr von emotionalem Burnout." : 
                      "Ausgewogene emotionale Intelligenz."}
                  </p>
               </div>

               {/* SLIDER 2: AMBITION */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <label className="text-sm font-bold text-[#ffaa00] uppercase tracking-wider flex items-center gap-2">
                        <Zap size={16} /> Dopamin-Antrieb (Ambition)
                     </label>
                     <span className="font-mono text-xl font-bold text-white">{psyche.ambition}%</span>
                  </div>
                  <input 
                     type="range" min="0" max="100" value={psyche.ambition} 
                     onChange={(e) => handleSliderChange('ambition', parseInt(e.target.value))}
                     className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ffaa00]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                     <span>Zufriedenheit</span>
                     <span>Machtgier</span>
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border-l-2 border-[#ffaa00]">
                     {psyche.ambition < 30 ? "Niedriger Dopamin-Level. Subjekt wird ein glückliches, einfaches Leben führen, aber nichts Großes erreichen." : 
                      psyche.ambition > 85 ? "Unstillbarer Hunger nach Erfolg. Wird nie zufrieden sein, egal wie viel Macht erlangt wird." : 
                      "Gesunder Karriere-Trieb."}
                  </p>
               </div>

               {/* SLIDER 3: RESILIENZ */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <label className="text-sm font-bold text-[#ff00e5] uppercase tracking-wider flex items-center gap-2">
                        <Shield size={16} /> Stress-Resistenz (Cortisol)
                     </label>
                     <span className="font-mono text-xl font-bold text-white">{psyche.resilience}%</span>
                  </div>
                  <input 
                     type="range" min="0" max="100" value={psyche.resilience} 
                     onChange={(e) => handleSliderChange('resilience', parseInt(e.target.value))}
                     className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ff00e5]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                     <span>Fragil</span>
                     <span>Unbrechbar</span>
                  </div>
                  <p className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded border-l-2 border-[#ff00e5]">
                     {psyche.resilience < 30 ? "Hohe Cortisol-Ausschüttung bei Stress. Neigt zu Panikattacken und Angststörungen." : 
                      psyche.resilience > 90 ? "Emotionale Kälte. Verarbeitet Traumata sofort, wirkt aber roboterhaft." : 
                      "Kann Krisen bewältigen, ohne abzustumpfen."}
                  </p>
               </div>

               {/* SLIDER 4: KONFORMITÄT */}
               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <label className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider flex items-center gap-2">
                        <Lock size={16} /> Soziale Konformität
                     </label>
                     <span className="font-mono text-xl font-bold text-white">{psyche.conformity}%</span>
                  </div>
                  <input 
                     type="range" min="0" max="100" value={psyche.conformity} 
                     onChange={(e) => handleSliderChange('conformity', parseInt(e.target.value))}
                     className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                     <span>Rebell</span>
                     <span>Konformist</span>
                  </div>
               </div>

            </CardContent>
         </Card>

         {/* FIXED BOTTOM NAVIGATION */}
         <div className="fixed bottom-2 right-2 md:bottom-6 md:right-6 z-50">
            <Button 
               variant="sci-fi" 
               size="lg"
               onClick={() => {
                  if(gameState.updateGameState) {
                     gameState.updateGameState({ psychology: psyche });
                  }
                  onNext();
               }}
               className="px-6 py-4 md:px-8 md:py-6 text-[10px] md:text-sm font-black tracking-widest shadow-[0_0_30px_rgba(255,0,229,0.4)] bg-[#ff00e5] hover:bg-[#ff00e5]/80 text-white border-none"
            >
               PERSÖNLICHKEIT INITIALISIEREN <ArrowRightIcon className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
         </div>
      </div>

    </motion.div>
  );
}

// Icon helper
function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
   )
}