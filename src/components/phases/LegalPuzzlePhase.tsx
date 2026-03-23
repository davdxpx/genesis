import React, { useState } from 'react';
import { RolePopup } from "../ui/RolePopup";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Globe2, Scale, ShieldAlert, CheckCircle2, Lock, AlertTriangle, Fingerprint, Crosshair, MapPin, Database } from 'lucide-react';
import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from 'framer-motion';
interface Region {
  id: string;
  name: string;
  coords: { x: number, y: number };
  status: 'locked' | 'warning' | 'available';
  law: string;
  desc: string;
  bioHack: string;
}
const regions: Region[] = [
  {
    id: 'eu',
    name: 'Europa (DE)',
    coords: { x: 52, y: 28 },
    status: 'locked',
    law: 'Embryonenschutzgesetz (ESchG § 5)',
    desc: 'Laut ESchG ist jegliche künstliche Veränderung der menschlichen Keimbahn eine Straftat (bis zu 5 Jahre Haft). Die deutsche Ethik pocht streng auf den Schutz der Menschenwürde und warnt vor der Selektion von "unwertem Leben".',
    bioHack: 'INTERPOL-ÜBERWACHUNG AKTIV. OPERATION ILLEGAL.'
  },
  {
    id: 'usa',
    name: 'Nordamerika (USA)',
    coords: { x: 20, y: 35 },
    status: 'warning',
    law: 'FDA Rider & Dickey-Wicker Amendment',
    desc: 'Es gibt kein explizites Bundesgesetz gegen private Genmanipulation, ABER die FDA blockiert jegliche klinischen Studien an modifizierten Embryonen. Ein unberechenbares Risiko für unsere Wall-Street-Investoren durch Klagen.',
    bioHack: 'GRAUZONE. HOHE STRAFKOMPENSATION ZU ERWARTEN.'
  },
  {
    id: 'asia',
    name: 'Asien (China)',
    coords: { x: 75, y: 40 },
    status: 'locked',
    law: 'Bio-Security Law (Post-2018)',
    desc: '2018 erschuf He Jiankui hier die ersten CRISPR-Babys. Nach einem globalen Aufschrei verschärfte die Regierung die Gesetze massiv. He wurde zu 3 Jahren Haft verurteilt. Die staatliche Überwachung ist lückenlos.',
    bioHack: 'ZULASSUNG BLOCKIERT. STAATLICHE KONTROLLE.'
  },
  {
    id: 'sea',
    name: 'Internat. Gewässer (Seastead)',
    coords: { x: 88, y: 65 },
    status: 'available',
    law: 'Keine nationale Jurisdiktion',
    desc: 'Ein privates Forschungsschiff (Seasteading) außerhalb der 12-Meilen-Zone. Hier greifen keine nationalen Ethikgesetze. Ein ethisches Schlupfloch: Reiche Eliten können globale Regularien mit genug Kapital einfach umgehen.',
    bioHack: 'STANDORT VERIFIZIERT. SICHERER HAFEN.'
  }
];
export function LegalPuzzlePhase({ onNext }: { onNext: () => void }) {
  const { playSfx, setMusicIntensity } = useAudio();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const handleSelect = (region: Region) => {
    setSelectedRegion(region);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1800);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-7xl mx-auto flex flex-col gap-6 p-4 min-h-[85vh] text-[#00f0ff] font-mono"
    >
      <RolePopup title="Jurisdiktion" description="W00e4hlen Sie einen legalen Standort f00fcr die Operation aus. CRISPR-Genmanipulation an Embryonen ist fast 00fcberall weltweit verboten. Finden Sie eine Gesetzesl00fccke." />
      <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-[#00f0ff]/30 shadow-[0_0_30px_rgba(0,240,255,0.1)] backdrop-blur-md">
        <Globe2 className="w-10 h-10 text-[#00f0ff] animate-pulse" />
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
            GEO-JURISDIKTION SCANNER
          </h1>
          <p className="text-sm text-slate-400">GLOBAL HEALTH BOARD TACTICAL MAP</p>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 flex-1">
        <Card className="w-full xl:w-2/3 bg-[#050A15] border-[#00f0ff]/20 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none z-10"></div>
          <CardContent className="flex-1 p-0 relative min-h-[400px] h-[400px] md:h-[500px] xl:h-[600px] flex items-center justify-center bg-[#02050a] overflow-hidden">
            <div className="absolute inset-0 z-0 flex items-center justify-center w-full h-full p-4 md:p-8">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                 alt="World Map" 
                 className="w-full h-full object-contain opacity-80 pointer-events-none drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]"
                 style={{ filter: 'brightness(0) sepia(1) hue-rotate(150deg) saturate(400%) brightness(1.2)' }} 
               />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-[200vw] h-[200vw] max-w-[2000px] max-h-[2000px] -mt-[100vw] md:-mt-[1000px] -ml-[100vw] md:-ml-[1000px] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,240,255,0.2)_90deg,transparent_90deg)] rounded-full pointer-events-none z-0"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center w-full h-full p-4 md:p-8">
              <div className="relative w-full h-full max-w-[1200px] max-h-[800px]">
                {regions.map((region) => {
                  const isSelected = selectedRegion?.id === region.id;
                  return (
                    <motion.button
                      key={region.id}
                      onClick={() => handleSelect(region)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                      style={{ left: region.coords.x + "%", top: region.coords.y + "%" }}
                    >
                      {isSelected && (
                        <motion.div 
                          animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`absolute w-12 h-12 rounded-full \${region.status === 'locked' ? 'bg-red-500' : region.status === 'warning' ? 'bg-yellow-500' : 'bg-[#00f0ff]'}`}
                        />
                      )}
                      <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 \${
                        region.status === 'locked' ? 'border-red-500 bg-red-950/80 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' :
                        region.status === 'warning' ? 'border-yellow-500 bg-yellow-950/80 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]' :
                        'border-[#00f0ff] bg-cyan-950/80 text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]'
                      } \${isSelected ? 'bg-opacity-100 scale-125' : 'backdrop-blur-sm'}`}>
                        <Crosshair className="w-5 h-5" />
                      </div>
                      <span className={`mt-2 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded bg-slate-900/80 border \${
                          isSelected ? 'border-[#00f0ff] text-white shadow-[0_0_10px_rgba(0,240,255,0.5)]' : 'border-slate-700 text-slate-400 group-hover:text-white'
                      }`}>
                        {region.name.split(' ')[0]}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full xl:w-1/3 bg-[#050A15] border-[#00f0ff]/20 shadow-2xl overflow-hidden flex flex-col relative">
          <CardHeader className="border-b border-slate-800 bg-slate-900/80 z-10">
             <CardTitle className="text-sm font-bold tracking-widest text-[#ff00e5] flex items-center gap-2">
               <Database className="w-4 h-4" /> REGIONALE RECHTSANALYSE
             </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 z-10 flex flex-col relative overflow-y-auto">
            <AnimatePresence mode="wait">
              {!selectedRegion ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                   <MapPin className="w-16 h-16 mb-4 animate-bounce" />
                   <p className="text-sm">ZIELGEBIET AUF DER KARTE WÄHLEN</p>
                </motion.div>
              ) : isScanning ? (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center space-y-4">
                   <div className="w-16 h-16 border-4 border-[#00f0ff]/20 border-t-[#00f0ff] rounded-full animate-spin"></div>
                   <p className="text-[#00f0ff] font-bold tracking-widest animate-pulse">EXTRAHIERE GESETZE...</p>
                </motion.div>
              ) : (
                <motion.div key="data" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                        {selectedRegion.status === 'locked' && <Lock className="w-8 h-8 text-red-500" />}
                        {selectedRegion.status === 'warning' && <AlertTriangle className="w-8 h-8 text-yellow-500" />}
                        {selectedRegion.status === 'available' && <CheckCircle2 className="w-8 h-8 text-[#00f0ff]" />}
                        <h2 className="text-2xl font-black text-white">{selectedRegion.name}</h2>
                     </div>
                     <p className={`text-xs font-bold uppercase p-2 border rounded-md \${
                        selectedRegion.status === 'locked' ? 'bg-red-950/30 text-red-400 border-red-900' :
                        selectedRegion.status === 'warning' ? 'bg-yellow-950/30 text-yellow-400 border-yellow-900' :
                        'bg-cyan-950/30 text-[#00f0ff] border-[#00f0ff]/50'
                     }`}>
                        <span className="opacity-50 mr-2">GESETZ:</span> {selectedRegion.law}
                     </p>
                   </div>
                   <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                     <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        {selectedRegion.desc}
                     </p>
                   </div>
                   <div className="bg-[#050A15] p-3 rounded-lg border border-slate-800">
                      <p className={`text-xs font-bold font-mono flex items-start gap-2 \${
                         selectedRegion.status === 'locked' ? 'text-red-500' :
                         selectedRegion.status === 'warning' ? 'text-yellow-500' :
                         'text-[#00f0ff]'
                      }`}>
                         <Fingerprint className="w-4 h-4 flex-shrink-0" /> {selectedRegion.bioHack}
                      </p>
                   </div>
                   {selectedRegion.status === 'available' ? (
                     <Button 
                       onClick={() => { playSfx('click'); onNext(); }}
                       className="w-full py-6 mt-4 text-sm font-black bg-[#00f0ff]/10 border border-[#00f0ff] hover:bg-[#00f0ff]/20 text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                     >
                       STANDORT BESTÄTIGEN & FORTFAHREN
                     </Button>
                   ) : (
                     <div className="w-full py-4 mt-4 text-center text-red-500/50 font-mono text-xs border border-red-900/50 border-dashed rounded-lg">
                       OPERATION HIER NICHT MÖGLICH.
                     </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}