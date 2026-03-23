import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Cpu, Activity, AlertTriangle, CheckCircle, Zap, Shield, Sparkles, Brain, Dumbbell, ShieldAlert, FileText, Globe, Award, TrendingUp, Skull, Droplet, UserCheck, BookOpen, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from 'recharts';
interface GameState {
  budget: number;
  trust: number;
  selectedEmbryo: { id: string; traits: string[] } | null;
  finalStats: { int: number; phy: number; imm: number; life: number };
  psychology: { empathy: number; ambition: number; resilience: number };
  ethicsScore: number;
  selectedRole?: string | null;
}
interface ResultPhaseProps {
  onRestart?: () => void;
  gameState?: GameState;
}
const calculateOutcome = async (state: GameState) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const baseScore = ((state.finalStats?.int || 0) + (state.finalStats?.phy || 0)) / 2;
      const ethicsMod = (state.ethicsScore || 50) > 60 ? 1.2 : 0.8;
      const finalScore = baseScore * ethicsMod;

      let roleText = "Als neutraler Beobachter hast du ein interessantes Exemplar geschaffen.";
      if (state.selectedRole === "Pragmatic_Biologist") {
        roleText = "Dein pragmatischer Biologen-Ansatz trieb die Technologie an ihre Grenzen. Die Wissenschaft feiert dich, aber zu welchem Preis?";
      } else if (state.selectedRole === "Ethical_Guardian") {
        roleText = "Als ethischer Wächter hast du maßvoll gehandelt. Das Kind ist stabil, aber die Konkurrenz ist dir vielleicht voraus.";
      } else if (state.selectedRole === "Ambitious_Parent") {
        roleText = "Deine elterliche Ambition kannte keine Grenzen. Das Kind ist auf Erfolg getrimmt, der Leistungsdruck ist immens.";
      }

      let ethicsText = "Die ethischen Folgen deiner Arbeit sind noch umstritten.";
      if (state.ethicsScore > 80) {
          ethicsText = "Du hast enormen Respekt vor dem Leben bewiesen. Ein Vorbild für die Bioethik.";
      } else if (state.ethicsScore < 40) {
          ethicsText = "Dein rigoroser Utilitarismus ist erschreckend kaltblütig.";
      }

      let prText = "Das PR-Team bewertet deine Entscheidungen als durchschnittlich.";
      if (state.trust > 70) {
          prText = "Die Öffentlichkeit liebt dich, eine meisterhafte PR-Strategie!";
      } else if (state.trust < 40) {
          prText = "Ein PR-Desaster. Das öffentliche Vertrauen in das Projekt ist ruiniert.";
      }

      resolve({
        successRate: Math.min(99.9, Math.max(12.5, finalScore)),
        societalImpact: (state.trust || 50) > 70 ? "Positiv" : "Kritisch",
        anomaliesDetected: Math.random() > 0.7 ? 1 : 0,
        classification: finalScore > 120 ? "Alpha-Plus" : finalScore > 80 ? "Beta" : "Gamma",
        lifespanEstimate: (state.finalStats?.life || 80) + Math.floor(Math.random() * 20),
        marketValue: Math.floor(finalScore * 1000000),
        rebellionRisk: Math.max(0, 100 - state.psychology.empathy + (state.psychology.ambition * 0.5)),
        roleText: roleText,
        ethicsText: ethicsText,
        prText: prText
      });
    }, 4500);
  });
};
export function ResultPhase({ onRestart, gameState }: ResultPhaseProps) {
  const [isCalculating, setIsCalculating] = useState(true);
  const [outcome, setOutcome] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'psyche' | 'world'>('overview');
  const [randomId] = useState(() => "GNX-" + Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + new Date().getFullYear());
  const safeState = useMemo(() => gameState || {
      budget: 0,
      trust: 50,
      selectedEmbryo: null,
      finalStats: { int: 100, phy: 100, imm: 100, life: 100 },
      psychology: { empathy: 50, ambition: 50, resilience: 50 },
      ethicsScore: 50,
      selectedRole: null
  }, [gameState]);
  const stats = safeState.finalStats;
  const psyche = safeState.psychology;
  const budget = safeState.budget;
  const trust = safeState.trust;
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isCalculating) {
      progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) return 100;
          return prev + (Math.random() * 3);
        });
      }, 100);
      calculateOutcome(safeState).then((res) => {
        setOutcome(res);
        setIsCalculating(false);
        setScanProgress(100);
      });
    }
    return () => clearInterval(progressInterval);
  }, [safeState, isCalculating]);
  const psycheData = [
    { subject: 'Empathie', A: psyche.empathy, fullMark: 100 },
    { subject: 'Ambition', A: psyche.ambition, fullMark: 100 },
    { subject: 'Resilienz', A: psyche.resilience, fullMark: 100 },
  ];
  const barData = [
    { name: 'IQ', value: stats.int, color: '#3b82f6' },
    { name: 'PHY', value: stats.phy, color: '#f97316' },
    { name: 'IMM', value: stats.imm, color: '#22c55e' },
  ];
  if (isCalculating) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 space-y-12 min-h-[70vh]">
        <div className="relative">
            <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative w-32 h-32 md:w-48 md:h-48"
            >
            <div className="absolute inset-0 rounded-full border-t-2 border-[#00f0ff] opacity-50" />
            <div className="absolute inset-2 rounded-full border-r-2 border-[#9d00ff] opacity-70" />
            <div className="absolute inset-4 rounded-full border-b-2 border-[#ff00e5]" />
            <div className="absolute inset-6 rounded-full border-l-2 border-slate-500 opacity-30" />
            <div className="absolute inset-0 m-auto w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-full shadow-[0_0_30px_rgba(0,240,255,0.2)]" />
            </motion.div>
            <Database className="absolute inset-0 m-auto text-[#00f0ff] w-8 h-8 md:w-10 md:h-10 animate-pulse" />
        </div>
        <div className="text-center space-y-6 w-full max-w-lg">
          <div>
            <h2 className="text-2xl md:text-3xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff00e5] tracking-widest uppercase mb-2">
                Simulation Läuft
            </h2>
            <p className="text-slate-400 font-mono text-xs md:text-sm animate-pulse">
                Berechne lebenslange Trajektorie & Marktwert...
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-[#0A101D] rounded-full h-3 md:h-4 overflow-hidden border border-slate-800 p-0.5">
                <motion.div 
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#9d00ff] to-[#ff00e5] rounded-full relative"
                style={{ width: `\${scanProgress}%` }}
                transition={{ ease: "linear" }}
                >
                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_25%,rgba(255,255,255,0.2)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.2)_75%,rgba(255,255,255,0.2)_100%)] bg-[length:20px_20px] animate-[slide_1s_linear_infinite]" />
                </motion.div>
            </div>
            <div className="flex justify-between items-center px-1">
                <p className="text-[10px] md:text-xs font-mono text-slate-500">SYS.GENESIS.OS</p>
                <p className="text-[10px] md:text-xs font-mono font-bold text-[#00f0ff]">{Math.floor(scanProgress)}%</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg text-[10px] md:text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded border border-slate-800">
              {scanProgress > 20 ? <CheckCircle size={16} className="text-green-500" /> : <Activity size={16} className="text-slate-600 animate-spin" />} 
              <span>DNA Sequenzierung</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded border border-slate-800">
             {scanProgress > 40 ? <CheckCircle size={16} className="text-green-500" /> : <Activity size={16} className="text-slate-600 animate-spin" />} 
             <span>CRISPR Verifikation</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded border border-slate-800">
            {scanProgress > 70 ? <CheckCircle size={16} className="text-green-500" /> : <Activity size={16} className="text-[#00f0ff] animate-spin" />} 
            <span className={scanProgress > 70 ? "text-slate-300" : "text-[#00f0ff]"}>Phänotyp-Projektion</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded border border-slate-800">
            {scanProgress > 90 ? <CheckCircle size={16} className="text-green-500" /> : <Activity size={16} className="text-[#ff00e5] animate-spin" />} 
            <span className={scanProgress > 90 ? "text-slate-300" : "text-[#ff00e5]"}>Gesellschafts-Impact</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex flex-col space-y-6 pb-20 relative"
    >
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-[#0A101D] border border-slate-800 shadow-2xl p-6 md:p-10 mb-4 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f0ff]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff00e5]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="shrink-0 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#ff00e5] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-slate-950 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-4 z-10 overflow-hidden">
                <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                </div>
                <UserCheck className="w-12 h-12 text-[#00f0ff] mb-2 opacity-80" />
                <div className="text-center w-full bg-slate-900 border border-slate-800 py-1 rounded">
                    <p className="text-[10px] text-slate-500 font-mono uppercase">ID</p>
                    <p className="text-xs font-bold text-white font-mono">{randomId}</p>
                </div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-50" />
            </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-4 z-10 w-full">
            <div>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] font-mono tracking-widest uppercase mb-3"
                >
                    <Sparkles size={12} /> Projektion Erfolgreich
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tighter uppercase drop-shadow-sm leading-tight">
                    Produkt <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff00e5]">{outcome?.classification}</span>
                </h1>
                <p className="text-sm md:text-base text-slate-400 font-light mt-2 max-w-2xl">
                    Die lebenslange Simulation ist abgeschlossen. Ihr Design wurde analysiert und bewertet.
                </p>
                <p className="text-sm text-[#00f0ff] font-mono mt-2 p-2 bg-[#00f0ff]/10 rounded border border-[#00f0ff]/30 inline-block">
                    {outcome?.roleText}
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 mt-6">
                 <div className="bg-slate-900/80 border border-slate-700/50 p-3 rounded-lg flex flex-col justify-center items-center md:items-start">
                    <p className="text-[10px] text-slate-500 uppercase font-mono mb-1 flex items-center gap-1"><Award size={12}/> Rating</p>
                    <p className="text-lg md:text-xl font-bold text-white">{outcome?.classification}</p>
                 </div>
                 <div className="bg-slate-900/80 border border-slate-700/50 p-3 rounded-lg flex flex-col justify-center items-center md:items-start">
                    <p className="text-[10px] text-slate-500 uppercase font-mono mb-1 flex items-center gap-1"><TrendingUp size={12}/> Marktwert</p>
                    <p className="text-lg md:text-xl font-bold text-green-400">\${(outcome?.marketValue / 1000000).toFixed(1)}M</p>
                 </div>
                 <div className="bg-slate-900/80 border border-slate-700/50 p-3 rounded-lg flex flex-col justify-center items-center md:items-start">
                    <p className="text-[10px] text-slate-500 uppercase font-mono mb-1 flex items-center gap-1"><Skull size={12}/> Rebellion</p>
                    <p className="text-lg md:text-xl font-bold text-red-400">{outcome?.rebellionRisk.toFixed(0)}%</p>
                 </div>
                 <div className="bg-slate-900/80 border border-slate-700/50 p-3 rounded-lg flex flex-col justify-center items-center md:items-start">
                    <p className="text-[10px] text-slate-500 uppercase font-mono mb-1 flex items-center gap-1"><Droplet size={12}/> Lebenserwartung</p>
                    <p className="text-lg md:text-xl font-bold text-[#00f0ff]">{outcome?.lifespanEstimate} J.</p>
                 </div>
            </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[500px]">
        <div className="w-full lg:w-64 shrink-0 flex flex-col space-y-2">
           <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 custom-scrollbar sticky top-20">
              {[
                { id: 'overview', icon: FileText, label: 'Exekutivbericht' },
                { id: 'stats', icon: Activity, label: 'Genetisches Profil' },
                { id: 'psyche', icon: Brain, label: 'Psychometrie' },
                { id: 'world', icon: Globe, label: 'Makro-Impact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 lg:w-full flex items-center justify-center lg:justify-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl border transition-all duration-300 font-mono text-[10px] md:text-sm uppercase tracking-wider whitespace-nowrap relative overflow-hidden group \${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-[#00f0ff]/20 to-transparent border-[#00f0ff]/50 text-white' 
                      : 'bg-slate-900/30 border-slate-800/50 text-slate-400 hover:bg-slate-800/80 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {activeTab === tab.id && (
                     <motion.div layoutId="activeTabIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
                  )}
                  <tab.icon size={16} className={`md:w-[18px] md:h-[18px] shrink-0 transition-colors \${activeTab === tab.id ? 'text-[#00f0ff]' : 'group-hover:text-slate-300'}`} />
                  <span className="hidden sm:inline-block font-bold">{tab.label}</span>
                </button>
              ))}
              <div className="hidden lg:block h-px w-full bg-slate-800 my-4" />
              <div className="hidden lg:block pt-2 space-y-3">
                <Button 
                  onClick={() => window.location.href='/quellen'}
                  className="w-full py-6 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/50 text-[#00f0ff] hover:text-[#00f0ff] font-mono text-xs uppercase tracking-widest transition-all group"
                >
                  <BookOpen className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                  Wissenschaftliche Quellen
                </Button>
                <Button 
                  onClick={onRestart}
                  className="w-full py-6 bg-slate-900 hover:bg-red-950/50 border border-slate-800 hover:border-red-500/50 text-slate-400 hover:text-red-400 font-mono text-xs uppercase tracking-widest transition-all group"
                >
                  <Terminal className="mr-2 w-4 h-4 group-hover:animate-pulse" />
                  System Reset
                </Button>
            </div>
           </div>
        </div>
        <div className="flex-1 min-w-0 bg-[#0A101D]/50 border border-slate-800/80 rounded-2xl p-4 md:p-8 backdrop-blur-sm relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             {activeTab === 'overview' && <FileText size={200} />}
             {activeTab === 'stats' && <Dumbbell size={200} />}
             {activeTab === 'psyche' && <Brain size={200} />}
             {activeTab === 'world' && <Globe size={200} />}
          </div>
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full"
              >
                <div className="space-y-6 flex flex-col">
                    <h3 className="text-2xl font-mono text-white flex items-center gap-2">
                        <Terminal className="text-[#00f0ff]" /> Exekutivbericht
                    </h3>
                    <Card className="p-6 bg-slate-900/50 border-slate-700/50 flex-1 flex flex-col">
                        <p className="text-slate-300 leading-relaxed font-light mb-6">
                            Die Simulation prognostiziert eine <span className="text-[#00f0ff] font-bold">{(outcome?.successRate || 0).toFixed(1)}%</span> Wahrscheinlichkeit für die erfolgreiche Integration dieses Designs in die obere Gesellschaftsschicht.
                        </p>
                        <div className="space-y-4 flex-1">
                            <div className="bg-[#050A15] p-4 rounded-lg border border-slate-800 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                                <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Finanzieller Status</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-lg text-white">Budget Rest</span>
                                    <span className={`text-xl font-bold font-mono \${budget > 0 ? "text-green-400" : "text-red-400"}`}>{budget} CR</span>
                                </div>
                            </div>
                            <div className="bg-[#050A15] p-4 rounded-lg border border-slate-800 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Soziales Kapital</p>
                                <div className="flex items-end justify-between">
                                    <span className="text-lg text-white">Public Trust</span>
                                    <span className="text-xl font-bold font-mono text-blue-400">{trust}%</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="space-y-6 flex flex-col">
                    <h3 className="text-2xl font-mono text-white flex items-center gap-2">
                        <ShieldAlert className="text-red-500" /> Risikoanalyse
                    </h3>
                    <Card className="p-6 bg-slate-900/50 border-slate-700/50 flex-1 flex flex-col gap-4">
                        {outcome?.anomaliesDetected > 0 ? (
                            <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
                                <h4 className="text-red-400 font-bold flex items-center gap-2 mb-2"><AlertTriangle size={16}/> Genetische Anomalie</h4>
                                <p className="text-sm text-red-200/70">Kritische Off-Target-Mutationen im Bereich der neuronalen Plastizität detektiert. Langzeitfolgen unberechenbar.</p>
                            </div>
                        ) : (
                            <div className="p-4 bg-green-950/20 border border-green-900/30 rounded-lg">
                                <h4 className="text-green-400 font-bold flex items-center gap-2 mb-2"><CheckCircle size={16}/> Sequenz Stabil</h4>
                                <p className="text-sm text-green-200/70">Keine signifikanten Abweichungen vom Bauplan. Zellteilung verläuft nach Parametern.</p>
                            </div>
                        )}
                        <div className="p-4 bg-[#050A15] border border-slate-800 rounded-lg mt-auto">
                            <h4 className="text-slate-300 font-bold flex items-center gap-2 mb-4"><Skull size={16}/> Rebellions-Index</h4>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `\${outcome?.rebellionRisk}%` }}
                                    className={`h-full \${outcome?.rebellionRisk > 60 ? 'bg-red-500' : outcome?.rebellionRisk > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-slate-500">Konform</span>
                                <span className="text-xs text-slate-500">Kritisch</span>
                            </div>
                        </div>
                    </Card>
                </div>
              </motion.div>
            )}
            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col"
              >
                 <div className="mb-8">
                    <h3 className="text-2xl font-mono text-white mb-2 flex items-center gap-3">
                      <Cpu className="text-[#00f0ff]" /> Genetisches Leistungsprofil
                    </h3>
                    <p className="text-slate-400 text-sm">Quantifizierte Darstellung der physischen und kognitiven Modifikationen.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                    <div className="bg-[#050A15] rounded-xl border border-slate-800 p-4 h-[300px] md:h-full min-h-[300px] flex flex-col">
                         <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Metrik-Verteilung</h4>
                         <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis type="number" domain={[0, 200]} hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} width={50} />
                                    <RechartsTooltip 
                                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                        contentStyle={{ backgroundColor: '#0A101D', borderColor: '#1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                        {barData.map((entry, index) => (
                                            <Cell key={`cell-\${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                    </div>
                    <div className="space-y-4 flex flex-col justify-center">
                        {[
                            { label: 'Intelligenz-Quotient (IQ)', value: stats.int, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Brain, max: 200, desc: 'Kognitive Verarbeitungsgeschwindigkeit' },
                            { label: 'Physische Stärke', value: stats.phy, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: Dumbbell, max: 200, desc: 'Muskeldichte und metabolische Effizienz' },
                            { label: 'Immun-Resilienz', value: stats.imm, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', icon: Shield, max: 200, desc: 'Widerstand gegen pathogene Erreger' }
                        ].map((stat, i) => (
                            <div key={i} className={`p-4 rounded-xl border \${stat.bg} \${stat.border} flex items-center gap-4`}>
                                <div className={`p-3 rounded-lg bg-slate-900/50 \${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-mono text-slate-400 uppercase">{stat.label}</p>
                                    <p className="text-xl font-bold text-white">{stat.value} <span className="text-xs text-slate-500 font-normal">/ {stat.max}</span></p>
                                    <p className="text-[10px] text-slate-500 mt-1">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
              </motion.div>
            )}
            {activeTab === 'psyche' && (
              <motion.div
                key="psyche"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col"
              >
                <div className="mb-8">
                    <h3 className="text-2xl font-mono text-white mb-2 flex items-center gap-3">
                      <Brain className="text-[#ff00e5]" /> Psychometrisches Profil
                    </h3>
                    <p className="text-slate-400 text-sm">Analyse der neurologischen Veranlagung und Verhaltensmuster.</p>
                 </div>
                   <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 flex-1">
                     <div className="w-full max-w-[300px] h-[300px] bg-[#050A15] rounded-full border border-slate-800 p-4 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] relative">
                         <div className="absolute inset-0 rounded-full border border-[#ff00e5]/20 scale-110 pointer-events-none" />
                         <div className="absolute inset-0 rounded-full border border-[#ff00e5]/10 scale-125 pointer-events-none" />
                         <div className="absolute top-1/2 left-0 w-full h-px bg-[#ff00e5]/10 pointer-events-none" />
                         <div className="absolute left-1/2 top-0 h-full w-px bg-[#ff00e5]/10 pointer-events-none" />
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={psycheData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#e2e8f0', fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Psyche" dataKey="A" stroke="#ff00e5" strokeWidth={2} fill="url(#psycheGradient)" fillOpacity={0.6} />
                                <defs>
                                    <linearGradient id="psycheGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff00e5" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#9d00ff" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                            </RadarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="flex-1 space-y-4 w-full h-full flex flex-col justify-center">
                       <div className="bg-[#0A101D] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                           <h4 className="font-mono text-purple-400 mb-2 uppercase text-xs tracking-widest">Klinische Diagnose</h4>
                           <p className="text-slate-300 text-base leading-relaxed">
                               {psyche.ambition > 70 
                               ? "Das Subjekt zeigt stark ausgeprägte zielgerichtete Verhaltensmuster. In Kombination mit den Modifikationen besteht ein signifikantes Potenzial für Führungspositionen, jedoch gepaart mit rücksichtslosem Verhalten." 
                               : "Das Motivationsprofil ist ausbalanciert, was eine unauffällige soziale Integration begünstigt."}
                           </p>
                       </div>
                       <div className="bg-[#0A101D] border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500" />
                           <h4 className="font-mono text-pink-400 mb-2 uppercase text-xs tracking-widest">Emotionale Resonanz</h4>
                           <p className="text-slate-300 text-base leading-relaxed">
                               {psyche.empathy < 40 
                               ? <span className="text-red-400 font-bold">Kritischer Befund: Mangel an Empathie. Gefahr von soziopathischen Tendenzen erhöht.</span> 
                               : "Die neuronale Architektur unterstützt komplexe emotionale Bindungen und soziales Verständnis."}
                           </p>
                       </div>
                     </div>
                   </div>
              </motion.div>
            )}
            {activeTab === 'world' && (
              <motion.div
                key="world"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                 <div className="mb-8">
                    <h3 className="text-2xl font-mono text-white mb-2 flex items-center gap-3">
                      <Globe className="text-[#00f0ff]" /> Makro-Gesellschaftlicher Impact
                    </h3>
                    <p className="text-slate-400 text-sm">Prognostizierte Auswirkungen des Designs auf die Menschheit als Ganzes.</p>
                 </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    <div className="p-6 md:p-8 bg-[#050A15] border border-slate-800 rounded-2xl relative overflow-hidden group flex flex-col">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="p-3 bg-red-500/10 text-red-400 rounded-lg w-fit mb-6">
                        <ShieldAlert size={24} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">Soziales Paradigma</h4>
                      <p className="text-slate-300 leading-relaxed text-base flex-1">
                        Die Veröffentlichung dieser genetischen Konfiguration führte zu <span className="text-white font-bold">{outcome?.societalImpact === 'Kritisch' ? 'heftigen Protesten und Forderungen nach strikterer Regulierung' : 'einer breiten Akzeptanz und neuen Standards im Bereich der genetischen Optimierung'}</span>. 
                      </p>
                      <div className="mt-6 pt-6 border-t border-slate-800">
                          <p className="text-xs font-mono text-slate-500 mb-2 uppercase">Öffentliche Zustimmung</p>
                          <div className="flex items-center gap-4">
                              <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500" style={{width: `\${trust}%`}} />
                              </div>
                              <span className="font-mono text-blue-400 font-bold">{trust}%</span>
                          </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 bg-[#050A15] border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col">
                      <div className="absolute right-0 top-0 w-32 h-32 bg-yellow-900/20 rounded-full blur-3xl pointer-events-none" />
                      <div className="p-3 bg-yellow-500/10 text-yellow-400 rounded-lg w-fit mb-6">
                        <Zap size={24} />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">Evolutionäre Projektion</h4>
                      <p className="text-slate-300 leading-relaxed text-base flex-1">
                        Wenn dieses Profil der neue Standard wird, erwarten Modelle innerhalb von 3 Generationen eine 
                        <span className="text-yellow-400 font-medium">
                            {stats.int > 150 ? ' technologische Singularität getrieben durch hyperintelligente Individuen.' : ' graduelle Verbesserung der allgemeinen Lebensqualität, jedoch bei drastisch wachsender sozialer Ungleichheit.'}
                        </span>
                      </p>
                      <div className="mt-6 pt-6 border-t border-slate-800">
                           <p className="text-xs font-mono text-slate-500 mb-2 uppercase">Ethik Score Final</p>
                          <div className="flex items-center gap-4">
                              <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                                  <div className={`h-full \${safeState.ethicsScore < 40 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `\${safeState.ethicsScore}%`}} />
                              </div>
                              <span className="font-mono font-bold text-slate-300">{safeState.ethicsScore}/100</span>
                          </div>
                      </div>
                    </div>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="block lg:hidden mt-6 space-y-3">
        <Button 
            onClick={() => window.location.href='/quellen'}
            className="w-full py-6 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/50 text-[#00f0ff] font-mono text-sm uppercase tracking-widest transition-all"
        >
            <BookOpen className="mr-2 w-[18px] h-[18px]" />
            Wissenschaftliche Quellen
        </Button>
        <Button 
            onClick={onRestart}
            className="w-full py-6 bg-slate-900 hover:bg-red-950/50 border border-slate-800 hover:border-red-500/50 text-slate-400 hover:text-red-400 font-mono text-sm uppercase tracking-widest transition-all"
        >
            <Terminal className="mr-2 w-[18px] h-[18px]" />
            System Reset
        </Button>
      </div>
    </motion.div>
  );
}