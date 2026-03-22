import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Brain, Activity, ShieldAlert, HeartPulse, Zap, Database, Hexagon, Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameState } from '@/lib/GameStateContext';
interface StatCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  max: number;
  bioDesc: string;
  pugDesc: string;
  relDesc: string;
}
const statCategories: Record<string, StatCategory> = {
  int: {
    id: 'int', name: 'Kognition (IQ)', icon: Brain, color: '#00f0ff', max: 180,
    bioDesc: 'Stimulation von Neurogenese und Synapsendichte im Neocortex. Ab einem Wert von 140 steigt der Kalorienbedarf des Gehirns massiv an (Cluster-Kopfschmerzen möglich).',
    pugDesc: 'Eine kognitive Elite würde die wirtschaftliche und technologische Kontrolle an sich reißen. Normale Menschen könnten auf dem Arbeitsmarkt nicht mehr konkurrieren.',
    relDesc: 'Wissen ist Macht, aber Intelligenz ohne Weisheit führt zur Hybris. Erschaffen wir Götter oder Werkzeuge?'
  },
  phy: {
    id: 'phy', name: 'Physis (Athletik)', icon: Activity, color: '#ff00e5', max: 150,
    bioDesc: 'Optimierung der Sarkomer-Struktur und Sauerstoffbindungskapazität (EPO-Genspleiß). Knochendichte wird um 40% erhöht.',
    pugDesc: 'Perfekt für Militär und Schwerindustrie. Zementiert die körperliche Überlegenheit und das "Supersoldaten"-Narrativ.',
    relDesc: 'Der menschliche Körper wird als reine Maschine betrachtet. Die theologische Würde der menschlichen Verletzlichkeit geht verloren.'
  },
  imm: {
    id: 'imm', name: 'Immunsystem', icon: ShieldAlert, color: '#ffaa00', max: 150,
    bioDesc: 'Hyperaktive Makrophagen und T-Zellen. Fast 100% Resistenz gegen virale Pathogene. WARNUNG: Ab 120 drohen lebensgefährliche Autoimmunreaktionen.',
    pugDesc: 'Eine elitäre Klasse, die gegen zukünftige Pandemien immun ist, während die "Unmodifizierten" sterben. Massive Ungerechtigkeit im Gesundheitswesen.',
    relDesc: '"Krankheit und Leiden sind Teil der menschlichen Erfahrung." Wer den Schmerz abschafft, verliert laut vielen Theologen die Fähigkeit zur Demut.'
  },
  life: {
    id: 'life', name: 'Telomer-Länge (Alter)', icon: HeartPulse, color: '#00ffaa', max: 200,
    bioDesc: 'Reaktivierung der Telomerase in allen somatischen Zellen. Biologische Zellalterung wird drastisch verlangsamt. Erhöhtes Risiko für unkontrollierte Zellteilung (Krebs).',
    pugDesc: 'Führt zu einer Gerontokratie (Herrschaft der Alten). Wenn Milliardäre 150 Jahre leben und Vermögen horten, kollabiert der Generationenvertrag.',
    relDesc: 'Der Tod gibt dem Leben seinen Rahmen und Sinn. Die künstliche Unsterblichkeit ist der ultimative Griff nach der göttlichen Macht.'
  }
};
const baseEmbryoStats: Record<string, Record<string, number>> = {
  'alpha-1': { int: 130, phy: 70, imm: 80, life: 80 },
  'beta-4':  { int: 85, phy: 130, imm: 90, life: 60 },
  'gamma-9': { int: 90, phy: 90, imm: 130, life: 90 },
  'delta-2': { int: 110, phy: 75, imm: 70, life: 75 },
  'default': { int: 90, phy: 90, imm: 90, life: 80 }
};
interface GameStateProps extends GameState {
  updateGameState?: (data: Partial<GameState>) => void;
}
export function BabyDesignerStatsPhase({ onNext, gameState }: { onNext: () => void, gameState: GameStateProps }) {
  const startingStats = baseEmbryoStats[gameState.selectedEmbryo?.id || 'default'];
  const budgetBonus = Math.floor((gameState.budget - 50) / 2);
  const initialAvailablePoints = Math.max(5, 15 + budgetBonus);
  const [stats, setStats] = useState<Record<string, number>>({ ...startingStats });
  const [availablePoints, setAvailablePoints] = useState(initialAvailablePoints);
  const [selectedStat, setSelectedStat] = useState<string>('int');
  const activeStatObj = statCategories[selectedStat];
  const handleAdd = (statId: string) => {
    if (availablePoints > 0 && stats[statId] < statCategories[statId].max) {
      setStats(prev => ({ ...prev, [statId]: prev[statId] + 5 }));
      setAvailablePoints(p => p - 1);
      setSelectedStat(statId);
    }
  };
  const handleSub = (statId: string) => {
    if (stats[statId] > startingStats[statId]) {
      setStats(prev => ({ ...prev, [statId]: prev[statId] - 5 }));
      setAvailablePoints(p => p + 1);
      setSelectedStat(statId);
    }
  };
  const scaleStat = (val: number) => (val / 200) * 120;
  const ptInt = `150,${150 - scaleStat(stats.int)}`;
  const ptPhy = `${150 + scaleStat(stats.phy)},150`;
  const ptLife = `150,${150 + scaleStat(stats.life)}`;
  const ptImm = `${150 - scaleStat(stats.imm)},150`;
  const polygonPoints = `${ptInt} ${ptPhy} ${ptLife} ${ptImm}`;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 p-2 md:p-4 min-min-h-[85vh] lg:min-min-h-[80vh]"
    >
      <Card className="w-full lg:w-1/2 glass border-[#00f0ff]/30 flex flex-col relative overflow-hidden h-[450px] lg:h-full shrink-0">
        <div className="absolute inset-0 bg-[#050A15] z-0" />
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #fff 0%, transparent 70%)' }} />
        <CardHeader className="border-b border-slate-700/50 bg-slate-900/80 z-10 relative py-3 md:py-4">
          <div className="flex justify-between items-center">
             <CardTitle className="text-base md:text-xl font-black tracking-widest text-white flex items-center gap-2">
                <Hexagon className="text-[#00f0ff]" /> EPIGENETISCHE MATRIX
             </CardTitle>
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-mono">VERFÜGBARE PUNKTE</span>
                <span className={`text-2xl font-black font-mono ${availablePoints > 0 ? 'text-[#ff00e5] animate-pulse' : 'text-slate-500'}`}>
                   {availablePoints}
                </span>
             </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center relative p-0 overflow-hidden">
           <div className="absolute top-4 left-4 right-4 bg-slate-800/80 border border-slate-600 rounded-lg p-3 z-20 shadow-lg backdrop-blur-md flex items-start gap-3">
              <Database className="text-[#00f0ff] shrink-0" size={16} />
              <div>
                 <p className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-widest">System-Log: Konsequenz-Analyse</p>
                 <p className="text-xs text-slate-300 font-mono mt-1">
                    Basis-Werte importiert von Embryo-Kandidat: <strong className="text-white">{gameState.selectedEmbryo?.id || 'Standard'}</strong>. <br/>
                    Ihr PR- und Budget-Status generierte <strong className="text-[#ff00e5]">{initialAvailablePoints} Epigenetik-Punkte</strong> zur Verteilung.
                 </p>
              </div>
           </div>
           <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center mt-12 md:mt-8 z-10">
              <svg width="300" height="300" className="absolute drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                 <polygon points="150,30 270,150 150,270 30,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <polygon points="150,70 230,150 150,230 70,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <polygon points="150,110 190,150 150,190 110,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <line x1="150" y1="30" x2="150" y2="270" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <line x1="30" y1="150" x2="270" y2="150" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <motion.polygon 
                    animate={{ points: polygonPoints }}
                    transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                    fill="rgba(0, 240, 255, 0.2)"
                    stroke="#00f0ff"
                    strokeWidth="3"
                 />
                 <motion.circle animate={{ cx: 150, cy: 150 - scaleStat(stats.int) }} r="4" fill={statCategories.int.color} />
                 <motion.circle animate={{ cx: 150 + scaleStat(stats.phy), cy: 150 }} r="4" fill={statCategories.phy.color} />
                 <motion.circle animate={{ cx: 150, cy: 150 + scaleStat(stats.life) }} r="4" fill={statCategories.life.color} />
                 <motion.circle animate={{ cx: 150 - scaleStat(stats.imm), cy: 150 }} r="4" fill={statCategories.imm.color} />
              </svg>
              <div className="absolute top-0 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest flex flex-col items-center"><Brain size={14} color={statCategories.int.color}/> IQ</div>
              <div className="absolute right-0 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest flex flex-col items-center"><Activity size={14} color={statCategories.phy.color}/> Physis</div>
              <div className="absolute bottom-0 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest flex flex-col items-center"><HeartPulse size={14} color={statCategories.life.color}/> Alter</div>
              <div className="absolute left-0 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest flex flex-col items-center"><ShieldAlert size={14} color={statCategories.imm.color}/> Immun</div>
           </div>
        </CardContent>
      </Card>
      <div className="flex-1 flex flex-col gap-4 h-full relative z-20">
         <Card className="flex-1 glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden">
            <CardHeader className="bg-slate-900/60 border-b border-slate-700/50 py-3 md:py-4">
              <CardTitle className="text-lg font-black tracking-widest text-slate-100 flex items-center gap-2">
                <Zap className="text-[#ff00e5]" /> ATTRIBUT-ALLOKATION
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-6 space-y-4">
               {Object.values(statCategories).map(cat => {
                  const isSelected = selectedStat === cat.id;
                  const isMaxed = stats[cat.id] >= cat.max;
                  const isBase = stats[cat.id] <= startingStats[cat.id];
                  return (
                     <div 
                        key={cat.id} 
                        onClick={() => setSelectedStat(cat.id)}
                        className={`p-3 md:p-4 rounded-xl border transition-colors cursor-pointer ${
                           isSelected ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'bg-slate-900/50 border-slate-700'
                        }`}
                     >
                        <div className="flex justify-between items-center mb-3">
                           <div className="flex items-center gap-2">
                              <cat.icon size={20} style={{ color: cat.color }} />
                              <span className="font-bold text-sm md:text-base text-white uppercase tracking-wider">{cat.name}</span>
                           </div>
                           <span className="text-xl md:text-2xl font-black font-mono" style={{ color: cat.color }}>
                              {stats[cat.id]}
                           </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                           <Button 
                              variant="outline" 
                              onClick={(e) => { e.stopPropagation(); handleSub(cat.id); }}
                              disabled={isBase}
                              className="flex-1 h-12 md:h-14 border-slate-600 bg-slate-900 active:bg-slate-800 text-white disabled:opacity-30 text-lg"
                           >
                              <Minus size={24} />
                           </Button>
                           <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden hidden sm:block">
                              <motion.div animate={{ width: `${(stats[cat.id] / cat.max) * 100}%` }} className="h-full rounded-full" style={{ backgroundColor: cat.color }} />
                           </div>
                           <Button 
                              variant="outline" 
                              onClick={(e) => { e.stopPropagation(); handleAdd(cat.id); }}
                              disabled={availablePoints <= 0 || isMaxed}
                              className="flex-1 h-12 md:h-14 border-slate-600 bg-slate-900 active:bg-slate-800 text-white disabled:opacity-30 text-lg"
                              style={{ borderColor: (!isMaxed && availablePoints > 0 && isSelected) ? cat.color : undefined }}
                           >
                              <Plus size={24} />
                           </Button>
                        </div>
                     </div>
                  )
               })}
            </CardContent>
         </Card>
         <Card className="h-[200px] shrink-0 glass border-[#ff00e5]/20 flex flex-col relative overflow-hidden z-20">
            <div className="bg-[#ff00e5]/10 border-b border-[#ff00e5]/30 p-2 md:p-3 flex items-center gap-2">
               <Info size={16} className="text-[#ff00e5]" />
               <span className="text-xs font-bold uppercase tracking-widest text-[#ff00e5]">Auswirkungs-Prognose: {activeStatObj.name}</span>
            </div>
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-4 bg-[#050A15] space-y-3">
               <AnimatePresence mode="wait">
                  <motion.div 
                     key={selectedStat}
                     initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                     className="text-[10px] md:text-xs font-mono leading-relaxed space-y-3"
                  >
                     <div className="border-l-2 border-[#00f0ff] pl-3">
                        <strong className="text-[#00f0ff] uppercase block mb-1">Biologie-Log:</strong>
                        <span className="text-slate-300">{activeStatObj.bioDesc}</span>
                     </div>
                     <div className="border-l-2 border-[#ff00e5] pl-3">
                        <strong className="text-[#ff00e5] uppercase block mb-1">Politik & Gesellschaft:</strong>
                        <span className="text-slate-300">{activeStatObj.pugDesc}</span>
                     </div>
                     <div className="border-l-2 border-[#ffaa00] pl-3">
                        <strong className="text-[#ffaa00] uppercase block mb-1">Ethik & Religion:</strong>
                        <span className="text-slate-300">{activeStatObj.relDesc}</span>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </CardContent>
         </Card>
      </div>
      <div className="fixed bottom-2 right-2 md:bottom-6 md:right-6 z-50">
         <Button 
            variant="sci-fi" 
            size="lg"
            onClick={() => {
               if(gameState.updateGameState) {
                  gameState.updateGameState({ finalStats: stats as { int: number; phy: number; imm: number; life: number; } });
               }
               onNext();
            }}
            className="px-6 py-4 md:px-8 md:py-6 text-[10px] md:text-sm font-black tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.4)]"
         >
            ATTRIBUTE FIXIEREN & WEITER <Zap className="ml-2 w-4 h-4 md:w-5 md:h-5" />
         </Button>
      </div>
    </motion.div>
  );
}