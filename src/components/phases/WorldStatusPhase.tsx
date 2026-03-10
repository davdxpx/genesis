import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Globe, ShieldAlert, ShieldCheck, MapPin, AlertTriangle, Activity, Lock, Unlock, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const regions = [
  {
    id: 'eu',
    name: 'Euro-Zone',
    classification: 'Klasse-5 Restriktiv',
    status: 'Streng Reguliert',
    risk: 'Gering',
    cost: 'Hoch',
    color: '#ff00e5', // Pink
    glowClass: 'glow-pink',
    icon: Lock,
    description: 'Der Genetic Integrity Act von 2038 verbietet alle nicht essenziellen genetischen Veränderungen. Die Präimplantationsdiagnostik (PID) ist nur bei unheilbaren Erbkrankheiten zulässig. Unautorisiertes "Enhancement" wird mit bis zu 20 Jahren Haft bestraft.',
    stats: { kontrolle: 98, markt: 12, innovation: 35 }
  },
  {
    id: 'na',
    name: 'Nordamerikanisches Konglomerat',
    classification: 'Klasse-2 Kommerziell',
    status: 'Flickenteppich / Kapitalistisch',
    risk: 'Mittel',
    cost: 'Extrem',
    color: '#00f0ff', // Cyan
    glowClass: 'glow-cyan',
    icon: Unlock,
    description: 'Eine umfassende Deregulierung führte zu einem hyper-kommerzialisierten Genetik-Markt. Kosmetische und leichte kognitive Verbesserungen sind völlig legal, aber extrem teuer. Es toben ständige Patentkriege um DNA-Sequenzen.',
    stats: { kontrolle: 45, markt: 100, innovation: 85 }
  },
  {
    id: 'pac',
    name: 'Pan-Asiatische Koalition',
    classification: 'Klasse-3 Staatlich Gelenkt',
    status: 'Aggressives Enhancement',
    risk: 'Hoch',
    cost: 'Subventioniert',
    color: '#9d00ff', // Purple
    glowClass: 'glow-purple',
    icon: Database,
    description: 'Staatlich geförderte Enhancement-Programme konzentrieren sich auf Intelligenz und Konformität. Private Kliniken operieren mit minimaler Aufsicht, solange sie alle Daten an das zentrale biometrische Raster übermitteln.',
    stats: { kontrolle: 80, markt: 60, innovation: 95 }
  },
  {
    id: 'sg',
    name: 'Singapur Sonderzone',
    classification: 'Klasse-1 Sicherer Hafen',
    status: 'Reguliert Progressiv',
    risk: 'Gering',
    cost: 'Sehr Hoch',
    color: '#00f0ff', // Cyan
    glowClass: 'glow-cyan',
    icon: ShieldCheck,
    description: 'Der globale Knotenpunkt für Elite-Genetiker. Streng reguliert, aber fortschrittliche Gesetze erlauben signifikante Eingriffe, sofern klinische Studien und Ethikkommissionen zustimmen. Die bevorzugte Wahl für VIP-Klienten.',
    stats: { kontrolle: 95, markt: 70, innovation: 90 }
  },
  {
    id: 'int',
    name: 'Internationale Gewässer',
    classification: 'Klasse-X Kartell',
    status: 'Gesetzlos / Schwarzmarkt',
    risk: 'Extrem',
    cost: 'Gering',
    color: '#ff0000', // Red
    glowClass: 'shadow-[0_0_15px_rgba(255,0,0,0.5)]',
    icon: AlertTriangle,
    description: 'Offshore-Kliniken, die außerhalb jeder globalen Gerichtsbarkeit operieren. Keine Regulierung, ungetestete CRISPR-Ladungen und häufige ungewollte Mutationen. Genutzt von Verzweifelten oder skrupellosen Forschern, die das absolute Limit testen.',
    stats: { kontrolle: 5, markt: 40, innovation: 100 }
  }
];

export function WorldStatusPhase({ onNext }: { onNext: () => void }) {
  const [selectedRegion, setSelectedRegion] = useState(regions[3]); // Default to SG
  const [isScanning, setIsScanning] = useState(false);

  const handleSelect = (region: typeof regions[0]) => {
    setIsScanning(true);
    setSelectedRegion(region);
    setTimeout(() => setIsScanning(false), 500); // Simulate scan delay
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 p-4 min-h-[80vh]"
    >
      {/* Left Column: Map/Node Selection */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/30 flex items-center gap-3 bg-slate-900/80">
          <Globe className="text-[#00f0ff] animate-pulse" />
          <div>
             <h2 className="text-[#00f0ff] font-bold tracking-widest uppercase text-sm">Geopolitischer Scan</h2>
             <p className="text-slate-400 text-xs font-mono">Gerichtsbarkeit auswählen</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {regions.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            const Icon = region.icon;
            
            return (
              <motion.button
                key={region.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(region)}
                className={`w-full text-left p-4 rounded-xl border backdrop-blur-md transition-all duration-300 relative overflow-hidden group ${
                  isSelected 
                    ? `border-[${region.color}] bg-slate-800/90 shadow-[0_0_15px_${region.color}40]` 
                    : 'border-slate-700/50 bg-[#0f172a]/60 hover:border-slate-500'
                }`}
                style={{ borderColor: isSelected ? region.color : undefined }}
              >
                {isSelected && (
                  <span 
                    className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ background: `linear-gradient(90deg, transparent, ${region.color}, transparent)` }} 
                  />
                )}
                
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`p-2 rounded-lg ${isSelected ? 'bg-slate-900' : 'bg-slate-800'}`}
                      style={{ color: isSelected ? region.color : '#94a3b8' }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className={`font-bold uppercase tracking-wide text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {region.name}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 mt-1">{region.classification}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: region.color, boxShadow: `0 0 10px ${region.color}` }}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Holographic Details */}
      <Card className="flex-1 h-full glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Radar Scanner Overlay */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[10%] bg-gradient-to-b from-transparent via-[#00f0ff]/10 to-transparent pointer-events-none z-0"
        />

        <CardHeader className="border-b border-slate-700/50 bg-slate-900/60 z-10">
          <div className="flex justify-between items-center">
             <CardTitle className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
               JURISDIKTIONS-DOSSIER
             </CardTitle>
             <span className="text-xs font-mono px-3 py-1 bg-slate-800 rounded border border-slate-700 text-[#00f0ff]">
               LIVE_UPLINK_HERGESTELLT
             </span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6 z-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center space-y-4"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-slate-700 border-t-[#00f0ff] rounded-full"
                />
                <p className="text-[#00f0ff] font-mono animate-pulse">ENTSCHLÜSSELE REGIONALE DATEN...</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Header Info */}
                <div className="flex items-center gap-4 border-l-4 pl-4" style={{ borderColor: selectedRegion.color }}>
                  <selectedRegion.icon size={40} style={{ color: selectedRegion.color }} />
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white">{selectedRegion.name}</h2>
                    <p className="text-lg font-mono" style={{ color: selectedRegion.color }}>[{selectedRegion.classification}]</p>
                  </div>
                </div>

                {/* Lore/Description */}
                <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700 relative">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-400" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-400" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-400" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-400" />
                  <p className="text-slate-300 leading-relaxed font-mono text-sm">
                    {selectedRegion.description}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Operatives Risiko</p>
                    <p className="text-xl font-mono" style={{ color: selectedRegion.risk === 'Extrem' ? '#ff0000' : selectedRegion.risk === 'Hoch' ? '#ff00e5' : '#00f0ff' }}>
                      {selectedRegion.risk}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Kapitalbedarf</p>
                    <p className="text-xl font-mono text-white">
                      {selectedRegion.cost}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Rechtlicher Status</p>
                    <p className="text-lg font-mono text-slate-300">
                      {selectedRegion.status}
                    </p>
                  </div>
                </div>

                {/* Stats Bars */}
                <div className="space-y-4 pt-4 border-t border-slate-700/50">
                  <h4 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <Activity size={14} /> Regionale Metriken
                  </h4>
                  
                  {Object.entries(selectedRegion.stats).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono uppercase">
                        <span className="text-slate-300">{key}</span>
                        <span style={{ color: selectedRegion.color }}>{value}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full"
                          style={{ backgroundColor: selectedRegion.color, boxShadow: `0 0 10px ${selectedRegion.color}` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <div className="p-6 border-t border-slate-700/50 bg-slate-900/80 z-10 flex justify-between items-center">
           <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <ShieldAlert size={14} className="text-[#ff00e5]"/>
              <span>Rechtliche Parameter vor Fortsetzung bestätigen</span>
           </div>
           <Button variant="sci-fi" onClick={onNext} className="shadow-[0_0_15px_rgba(0,240,255,0.2)]">
             Bestätigen & Weiter <MapPin className="ml-2 w-4 h-4" />
           </Button>
        </div>
      </Card>
    </motion.div>
  );
}