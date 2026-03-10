import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Map, AlertTriangle, ShieldCheck, Database, Anchor, Lock, Server, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const locations = [
  {
    id: 'sg_facility',
    name: 'Neo-Singapur Bio-Hub',
    type: 'Reguliert (Klasse-1)',
    icon: ShieldCheck,
    color: '#00f0ff',
    desc: 'Hochsicherheitslabor. Vollständig legal, aber streng überwacht von der Globalen Genetik-Behörde.',
    pros: ['100% Legal', 'Modernste Technologie', 'Kein Risiko von Razzien'],
    cons: ['Jede Code-Änderung wird geloggt', 'Prometheus-Marker ist extrem schwer zu verbergen', 'Hohe Bürokratie'],
    stats: { sicherheit: 98, freiheit: 20, tech: 100 }
  },
  {
    id: 'offshore_rig',
    name: 'Atlas Seastead (Pazifik)',
    type: 'Unreguliert (Klasse-X)',
    icon: Anchor,
    color: '#ff0000',
    desc: 'Eine schwimmende Bohrinsel, umfunktioniert zu einem autonomen Klon-Labor. Außerhalb jeglicher Gerichtsbarkeit.',
    pros: ['Absolute Freiheit', 'Keine Behörden', 'Prometheus-Marker problemlos einsetzbar'],
    cons: ['Gefahr durch Interpol-Raids', 'Stürme stören manchmal Stromzufuhr', 'Schwarzmarkt-Ausrüstung'],
    stats: { sicherheit: 10, freiheit: 100, tech: 60 }
  },
  {
    id: 'eu_underground',
    name: 'Berlin Bunker-Anlage',
    type: 'Schwarzmarkt (Klasse-5)',
    icon: Lock,
    color: '#ff00e5',
    desc: 'Ein stillgelegter Kalte-Krieg-Bunker unter der streng regulierten Euro-Zone. Ein riskantes Versteckspiel.',
    pros: ['Nah an europäischen Spezialisten', 'Gute Tarnung im Stadtnetz'],
    cons: ['Bei Entdeckung: Lebenslange Haft', 'Hohes Risiko durch Spione', 'Mittelmäßige Hardware'],
    stats: { sicherheit: 40, freiheit: 70, tech: 75 }
  },
  {
    id: 'corp_zone',
    name: 'Ares Mega-Corp Campus (USA)',
    type: 'Kommerziell (Klasse-2)',
    icon: Server,
    color: '#9d00ff',
    desc: 'Gegen genügend Geld drückt die Ares Mega-Corp beide Augen zu und stellt private Server und Labore zur Verfügung.',
    pros: ['Sehr gute Ausrüstung', 'Unternehmens-Söldner als Schutz'],
    cons: ['Ares behält Kopien der DNA', 'Hohes Risiko von Industriespionage', 'Sehr teuer'],
    stats: { sicherheit: 70, freiheit: 60, tech: 90 }
  }
];

export function LegalPuzzlePhase({ onNext }: { onNext: () => void }) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const activeLoc = locations.find(l => l.id === selectedLocation);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      onNext();
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-6xl mx-auto flex flex-col gap-6 p-4 min-min-h-[85vh]"
    >
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-700/50">
         <div className="flex items-center gap-3">
            <Map className="text-[#00f0ff] animate-pulse" />
            <div>
               <h2 className="text-[#00f0ff] font-bold tracking-widest uppercase text-lg">Labor-Standortwahl</h2>
               <p className="text-slate-400 text-xs font-mono">Die Familie Vance benötigt einen physischen Ort für die Synthese.</p>
            </div>
         </div>
         <div className="px-3 py-1 bg-[#ff00e5]/10 border border-[#ff00e5]/30 rounded text-[#ff00e5] text-xs font-mono flex items-center gap-2">
            <AlertTriangle size={14} /> Wähle weise. Dies bestimmt das Risiko der Operation.
         </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
         {/* Map / Grid Selection */}
         <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto custom-scrollbar content-start">
            {locations.map((loc) => {
               const isSelected = selectedLocation === loc.id;
               const Icon = loc.icon;

               return (
                  <motion.button
                     key={loc.id}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={() => setSelectedLocation(loc.id)}
                     className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                        isSelected 
                          ? `bg-slate-800/90 shadow-[0_0_20px_${loc.color}30]` 
                          : 'bg-[#0f172a]/60 border-slate-700/50 hover:border-slate-500'
                     }`}
                     style={{ borderColor: isSelected ? loc.color : undefined }}
                  >
                     {isSelected && (
                        <span className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `linear-gradient(135deg, transparent, ${loc.color}, transparent)` }} />
                     )}
                     <div className="flex items-center justify-between mb-4 z-10">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-slate-900' : 'bg-slate-800'}`} style={{ color: isSelected ? loc.color : '#94a3b8' }}>
                           <Icon size={24} />
                        </div>
                        {isSelected && <span className="text-xs font-mono px-2 py-1 bg-slate-900 rounded border" style={{ borderColor: loc.color, color: loc.color }}>AKTIV</span>}
                     </div>
                     <h3 className={`font-bold tracking-wide text-lg z-10 ${isSelected ? 'text-white' : 'text-slate-300'}`}>{loc.name}</h3>
                     <p className="text-xs font-mono text-slate-500 mt-1 z-10">{loc.type}</p>
                  </motion.button>
               )
            })}
         </div>

         {/* Details Panel */}
         <Card className="flex-1 glass border-[#00f0ff]/20 flex flex-col h-full overflow-hidden">
            <CardHeader className="bg-slate-900/60 border-b border-slate-700/50 pb-4">
               <CardTitle className="text-slate-100 font-black tracking-widest text-lg flex items-center gap-2">
                  <Database className="text-[#00f0ff]" /> STANDORT-ANALYSE
               </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
               <AnimatePresence mode="wait">
                  {!activeLoc ? (
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-slate-500 font-mono text-sm space-y-4"
                     >
                        <Map size={48} className="opacity-20" />
                        <p>Wähle einen Standort auf dem Raster für detaillierte Spezifikationen.</p>
                     </motion.div>
                  ) : (
                     <motion.div 
                        key={activeLoc.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                     >
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black uppercase text-white" style={{ textShadow: `0 0 10px ${activeLoc.color}` }}>{activeLoc.name}</h3>
                           <p className="text-sm font-mono text-slate-400">{activeLoc.desc}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-700/50">
                              <p className="text-xs text-emerald-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">Vorteile</p>
                              <ul className="space-y-2">
                                 {activeLoc.pros.map((pro, i) => (
                                    <li key={i} className="text-xs text-slate-300 font-mono flex items-start gap-2">
                                       <span className="text-emerald-400 mt-0.5">+</span> {pro}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-700/50">
                              <p className="text-xs text-red-400 font-bold tracking-widest uppercase mb-3 flex items-center gap-2">Risiken</p>
                              <ul className="space-y-2">
                                 {activeLoc.cons.map((con, i) => (
                                    <li key={i} className="text-xs text-slate-300 font-mono flex items-start gap-2">
                                       <span className="text-red-400 mt-0.5">-</span> {con}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>

                        <div className="pt-4 border-t border-slate-700/50 space-y-4">
                           <p className="text-xs text-slate-400 font-bold tracking-widest uppercase flex items-center gap-2">
                              <Cpu size={14} /> Infrastruktur-Werte
                           </p>
                           {Object.entries(activeLoc.stats).map(([key, val]) => (
                              <div key={key} className="space-y-1">
                                 <div className="flex justify-between text-xs font-mono uppercase">
                                    <span className="text-slate-400">{key}</span>
                                    <span style={{ color: activeLoc.color }}>{val}%</span>
                                 </div>
                                 <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: `${val}%` }}
                                       transition={{ duration: 0.8 }}
                                       className="h-full"
                                       style={{ backgroundColor: activeLoc.color, boxShadow: `0 0 10px ${activeLoc.color}` }}
                                    />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               {/* Lock Screen Overlay during confirmation */}
               <AnimatePresence>
                  {isConfirming && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4"
                     >
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                           <Server size={60} style={{ color: activeLoc?.color || '#00f0ff' }} />
                        </motion.div>
                        <h2 className="text-2xl font-black tracking-widest text-white animate-pulse">ALLOKIERE RESSOURCEN...</h2>
                        <p className="text-slate-400 font-mono text-sm">Laborprotokolle werden initiiert. Bitte warten.</p>
                     </motion.div>
                  )}
               </AnimatePresence>
            </CardContent>

            <CardFooter className="bg-slate-900/80 p-6 flex justify-end border-t border-slate-700/50">
               <Button 
                  variant="sci-fi" 
                  disabled={!activeLoc || isConfirming} 
                  onClick={handleConfirm}
                  className="w-full md:w-auto px-8"
                  style={{ 
                     borderColor: activeLoc ? activeLoc.color : undefined,
                     color: activeLoc ? activeLoc.color : undefined
                  }}
               >
                  {isConfirming ? 'Initialisiere...' : 'Standort Fixieren & Weiter'}
               </Button>
            </CardFooter>
         </Card>
      </div>
    </motion.div>
  );
}