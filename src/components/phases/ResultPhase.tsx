import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Cpu, Activity, AlertTriangle, CheckCircle, Zap, Shield, Sparkles, Brain, Heart, Dumbbell, ShieldAlert, FileText, Globe, Fingerprint } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


interface GameState {
  budget?: number;
  trust?: number;
  selectedEmbryo?: { id: string; traits: string[] } | null;
  finalStats?: { int: number; phy: number; imm: number; life: number };
  psychology?: { empathy: number; ambition: number; resilience: number };
  ethicsScore?: number;
}

interface ResultPhaseProps {
  onRestart?: () => void;
  gameState?: GameState;
}

// Simulated API Call for calculation
const calculateOutcome = async (state: GameState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock calculation logic based on game state
      const baseScore = ((state.finalStats?.int || 0) + (state.finalStats?.phy || 0)) / 2;
      const ethicsMod = (state.ethicsScore || 50) > 60 ? 1.2 : 0.8;
      const finalScore = baseScore * ethicsMod;
      
      resolve({
        successRate: Math.min(99.9, Math.max(12.5, finalScore)),
        societalImpact: (state.trust || 50) > 70 ? "Positiv" : "Kritisch",
        anomaliesDetected: Math.random() > 0.7 ? 1 : 0,
        classification: finalScore > 85 ? "Alpha-Plus" : finalScore > 50 ? "Beta" : "Gamma",
        lifespanEstimate: (state.finalStats?.life || 80) + Math.floor(Math.random() * 20)
      });
    }, 3500); // 3.5s dramatic pause
  });
};

export function ResultPhase({ onRestart, gameState = {} }: ResultPhaseProps) {
  const [isCalculating, setIsCalculating] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [outcome, setOutcome] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'psyche' | 'world'>('overview');
  
  // Create id on component mount without updating state in an effect. Using useState initializer function.
  const [randomId] = useState(() => "GENESIS-" + Math.random().toString(36).substring(2, 6).toUpperCase());

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (isCalculating) {
      // Progress bar animation
      progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) return 100;
          return prev + (Math.random() * 5);
        });
      }, 150);

      // Fetch results
      calculateOutcome(gameState).then((res) => {
        setOutcome(res);
        setIsCalculating(false);
        setScanProgress(100);
      });
    }

    return () => clearInterval(progressInterval);
  }, [gameState, isCalculating]);

  // Fallback values if gameState is missing parts
  const stats = gameState.finalStats || { int: 85, phy: 90, imm: 95, life: 120 };
  const psyche = gameState.psychology || { empathy: 40, ambition: 95, resilience: 80 };
  const budget = gameState.budget || 0;
  const trust = gameState.trust || 50;
  
  const psycheData = [
    { subject: 'Empathie', A: psyche.empathy, fullMark: 100 },
    { subject: 'Ambition', A: psyche.ambition, fullMark: 100 },
    { subject: 'Resilienz', A: psyche.resilience, fullMark: 100 },
  ];

  if (isCalculating) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 space-y-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative w-24 h-24 md:w-32 md:h-32"
        >
          <div className="absolute inset-0 rounded-full border-t-4 border-[#00f0ff] opacity-50" />
          <div className="absolute inset-2 rounded-full border-r-4 border-[#9d00ff] opacity-70" />
          <div className="absolute inset-4 rounded-full border-b-4 border-[#ff00e5]" />
          <Cpu className="absolute inset-0 m-auto text-white w-8 h-8 md:w-10 md:h-10 animate-pulse" />
        </motion.div>
        
        <div className="text-center space-y-4 w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-mono font-bold text-[#00f0ff] tracking-widest uppercase">
            Berechne Zukunftssimulation
          </h2>
          <p className="text-slate-400 font-mono text-xs md:text-sm">
            Kompiliere genetische Daten, Ethik-Parameter und Weltzustand...
          </p>
          
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#00f0ff] via-[#9d00ff] to-[#ff00e5]"
              style={{ width: `${scanProgress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="text-right text-[10px] md:text-xs font-mono text-[#00f0ff]">{Math.floor(scanProgress)}%</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md text-[10px] md:text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> DNA Sequenzierung</div>
          <div className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> CRISPR Verifikation</div>
          <div className="flex items-center gap-2">
            {scanProgress > 50 ? <CheckCircle size={14} className="text-green-500" /> : <Activity size={14} className="animate-spin" />} 
            Phänotyp-Projektion
          </div>
          <div className="flex items-center gap-2">
            {scanProgress > 80 ? <CheckCircle size={14} className="text-green-500" /> : <Activity size={14} className="animate-spin" />} 
            Gesellschafts-Impact
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto space-y-6 md:space-y-8 pb-10"
    >
      {/* Header Section */}
      <div className="text-center space-y-2 md:space-y-4 mb-6 md:mb-12">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center p-3 md:p-4 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#9d00ff]/20 border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.2)] mb-2 md:mb-4"
        >
          <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#00f0ff]" />
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff00e5] tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Projektion Abgeschlossen
        </h1>
        <p className="text-sm md:text-xl text-slate-300 max-w-2xl mx-auto font-light px-4">
          Die Simulation des Lebenszyklus Ihres Designs ist beendet. Hier sind die finalen Parameter und Konsequenzen.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 xl:w-72 shrink-0 flex flex-col space-y-2">
           <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 custom-scrollbar">
              {[
                { id: 'overview', icon: FileText, label: 'Zusammenfassung' },
                { id: 'stats', icon: Activity, label: 'Attribute' },
                { id: 'psyche', icon: Brain, label: 'Psyche' },
                { id: 'world', icon: Globe, label: 'Impact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl border transition-all duration-300 font-mono text-[10px] md:text-sm uppercase tracking-wider whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-[#00f0ff] shadow-[inset_0_0_20px_rgba(0,240,255,0.1)]' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <tab.icon size={16} className="md:w-[18px] md:h-[18px] shrink-0" />
                  <span className="hidden sm:inline-block">{tab.label}</span>
                </button>
              ))}
           </div>
          
          {/* Action Button */}
          <div className="pt-4 lg:pt-8 mt-auto">
             <Button 
               onClick={onRestart}
               className="w-full py-4 md:py-6 bg-gradient-to-r from-red-600/80 to-red-900/80 hover:from-red-500 hover:to-red-800 border border-red-500/50 text-white font-mono text-xs md:text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all"
             >
               <Terminal className="mr-2 w-4 h-4 md:w-[18px] md:h-[18px]" />
               Neue Simulation
             </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
              >
                {/* ID Card */}
                <Card className="p-4 md:p-6 bg-gradient-to-br from-slate-900 to-[#0A101D] border-slate-700/50 flex flex-col items-center text-center space-y-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Fingerprint size={100} className="text-slate-500" />
                  </div>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-800 border-2 border-[#00f0ff] flex items-center justify-center p-2 z-10 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                     <div className="w-full h-full rounded-full bg-slate-700 animate-pulse" /> {/* Placeholder for face/avatar */}
                  </div>
                  <div className="z-10 space-y-1">
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">Subjekt-Alpha</h3>
                    <p className="text-[#00f0ff] font-mono text-[10px] md:text-xs">ID: {randomId}</p>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-6 z-10">
                    <div className="bg-slate-800/50 p-2 md:p-3 rounded border border-slate-700">
                      <p className="text-slate-400 text-[8px] md:text-[10px] uppercase font-mono">Klassifizierung</p>
                      <p className="text-base md:text-lg font-bold text-[#ff00e5]">{outcome?.classification}</p>
                    </div>
                    <div className="bg-slate-800/50 p-2 md:p-3 rounded border border-slate-700">
                      <p className="text-slate-400 text-[8px] md:text-[10px] uppercase font-mono">Erfolgsrate</p>
                      <p className="text-base md:text-lg font-bold text-green-400">{outcome?.successRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </Card>

                {/* System Status */}
                <Card className="p-4 md:p-6 bg-slate-900/80 border-slate-700/50 flex flex-col justify-center space-y-4 md:space-y-6">
                  <h3 className="text-lg md:text-xl font-mono text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Database className="text-[#00f0ff]" size={18} /> System Status
                  </h3>
                  <div className="space-y-4">
                     <div>
                        <div className="flex justify-between text-xs md:text-sm mb-1">
                          <span className="text-slate-400 font-mono">Verbleibendes Budget</span>
                          <span className={budget > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{budget} CR</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className={`h-full ${budget > 50 ? 'bg-green-500' : budget > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.max(5, Math.min(100, budget))}%` }} />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs md:text-sm mb-1">
                          <span className="text-slate-400 font-mono">Öffentliches Vertrauen</span>
                          <span className="text-[#00f0ff] font-bold">{trust}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-[#00f0ff]" style={{ width: `${trust}%` }} />
                        </div>
                     </div>
                     
                     <div className="p-3 md:p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2 md:gap-3 mt-4">
                       <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                       <div>
                         <p className="text-red-400 text-xs md:text-sm font-bold uppercase tracking-wider">Anomalien Detektiert</p>
                         <p className="text-slate-300 text-[10px] md:text-xs mt-1 leading-relaxed">
                           {outcome?.anomaliesDetected > 0 
                             ? "Mögliche Off-Target-Effekte in Chromosom 14. Langzeitüberwachung empfohlen." 
                             : "Keine kritischen genetischen Abweichungen festgestellt. Stabile Sequenz."}
                         </p>
                       </div>
                     </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                 <Card className="p-4 md:p-8 bg-slate-900/80 border-slate-700/50">
                    <h3 className="text-xl md:text-2xl font-mono text-white mb-6 flex items-center gap-2 md:gap-3">
                      <Dumbbell className="text-[#00f0ff]" size={24} /> Physische Metriken
                    </h3>
                    
                    <div className="space-y-6 md:space-y-8">
                      {[
                        { label: 'Intelligenz-Quotient (IQ)', value: stats.int, color: 'from-blue-600 to-blue-400', icon: Brain, max: 200 },
                        { label: 'Physische Stärke & Ausdauer', value: stats.phy, color: 'from-orange-600 to-orange-400', icon: Dumbbell, max: 200 },
                        { label: 'Immunsystem-Resilienz', value: stats.imm, color: 'from-green-600 to-green-400', icon: Shield, max: 200 },
                        { label: 'Projizierte Lebensspanne (Jahre)', value: outcome?.lifespanEstimate || stats.life, color: 'from-purple-600 to-purple-400', icon: Heart, max: 150 }
                      ].map((stat, i) => (
                        <div key={i} className="relative">
                          <div className="flex justify-between items-end mb-2">
                             <div className="flex items-center gap-2">
                               <stat.icon size={16} className="text-slate-400" />
                               <span className="font-mono text-slate-300 uppercase tracking-wider text-[10px] md:text-sm">{stat.label}</span>
                             </div>
                             <span className="font-black text-lg md:text-xl text-white">{stat.value}</span>
                          </div>
                          <div className="h-2 md:h-3 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                               transition={{ duration: 1, delay: i * 0.1 }}
                               className={`h-full bg-gradient-to-r ${stat.color} shadow-[0_0_10px_currentColor]`}
                             />
                          </div>
                          {stat.value > stat.max * 0.8 && (
                             <p className="absolute -bottom-4 md:-bottom-5 right-0 text-[8px] md:text-[10px] text-[#00f0ff] font-mono">Warnung: Grenzwert überschritten</p>
                          )}
                        </div>
                      ))}
                    </div>
                 </Card>
              </motion.div>
            )}

            {activeTab === 'psyche' && (
              <motion.div
                key="psyche"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 h-full"
              >
                <Card className="p-4 md:p-8 bg-slate-900/80 border-slate-700/50 min-h-[400px] flex flex-col">
                   <h3 className="text-xl md:text-2xl font-mono text-white mb-4 md:mb-8 flex items-center gap-2 md:gap-3">
                      <Brain className="text-[#ff00e5]" size={24} /> Neuro-Psychologisches Profil
                   </h3>
                   
                   <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 justify-center flex-1">
                     
                     <div className="w-full max-w-[250px] md:max-w-[300px] h-[250px] md:h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={psycheData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Psyche" dataKey="A" stroke="#ff00e5" fill="#ff00e5" fillOpacity={0.3} />
                            </RadarChart>
                        </ResponsiveContainer>
                     </div>

                     <div className="flex-1 space-y-4 md:space-y-6 w-full lg:max-w-sm bg-slate-800/30 p-4 md:p-6 rounded-xl border border-slate-700/50">
                       <div>
                         <p className="text-xs md:text-sm font-mono text-slate-400 mb-2 uppercase tracking-widest border-b border-slate-700 pb-2">Diagnose-Zusammenfassung:</p>
                         <p className="text-slate-200 text-sm md:text-base font-light leading-relaxed">
                           {psyche.ambition > 70 
                             ? "Stark zielgerichtetes Verhalten. Hohes Risiko für rücksichtsloses Handeln zur Zielerreichung." 
                             : "Ausgeglichenes Motivationsprofil."}
                           {" "}
                           {psyche.empathy < 40 
                             ? <span className="text-red-400 font-medium">Auffälliger Mangel an emotionaler Resonanz.</span> 
                             : "Normale bis hohe emotionale Intelligenz."}
                            {" "}
                            {psyche.resilience > 80 ? "Exzellente Stressresistenz." : "Durschnittliche Belastbarkeit."}
                         </p>
                       </div>
                     </div>

                   </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'world' && (
              <motion.div
                key="world"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <Card className="p-4 md:p-8 bg-slate-900/80 border-slate-700/50 min-h-[400px]">
                  <h3 className="text-xl md:text-2xl font-mono text-white mb-6 flex items-center gap-2 md:gap-3">
                     <Globe className="text-[#00f0ff]" size={24} /> Globale Auswirkungen
                  </h3>

                  <div className="space-y-4 md:space-y-6">
                    <div className="p-4 md:p-6 bg-[#0A101D] border border-slate-700 rounded-xl relative overflow-hidden group">
                      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-red-900/20 to-transparent pointer-events-none" />
                      <h4 className="text-base md:text-lg font-bold text-white flex items-center gap-2 mb-2">
                        <ShieldAlert className="text-red-500" size={20} /> Gesellschaftliche Reaktion
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        Die Veröffentlichung dieser genetischen Konfiguration führte zu {outcome?.societalImpact === 'Kritisch' ? 'heftigen Protesten und Forderungen nach strikterer Regulierung.' : 'einer breiten Akzeptanz und neuen Standards im Bereich der genetischen Optimierung.'} 
                        Das Vertrauen in Ihre Institution liegt bei <span className="font-mono text-[#00f0ff]">{trust}%</span>.
                      </p>
                    </div>

                    <div className="p-4 md:p-6 bg-[#0A101D] border border-slate-700 rounded-xl relative overflow-hidden">
                      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#00f0ff]/10 to-transparent pointer-events-none" />
                      <h4 className="text-base md:text-lg font-bold text-white flex items-center gap-2 mb-2">
                        <Zap className="text-yellow-500" size={20} /> Evolutionärer Ausblick
                      </h4>
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        Wenn dieses Profil der neue Standard wird, erwarten Modelle innerhalb von 3 Generationen eine 
                        {stats.int > 150 ? ' technologische Singularität getrieben durch hyperintelligente Individuen.' : ' graduelle Verbesserung der allgemeinen Lebensqualität, jedoch bei wachsender sozialer Ungleichheit.'}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
