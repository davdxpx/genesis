import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dna, Fingerprint, Eye, Zap, Info, Microscope, Activity, ShieldAlert, Plus, Minus, BookOpen, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- INTERFACES ---
interface LoreItem {
  id: string;
  name: string;
  type: string;
  desc: string;
  loreBio: string;
  lorePug: string;
  loreRel: string;
}

interface EyeColor extends LoreItem {
  color: string;
  hex: string;
  cost: number;
}

interface ExoticMod extends LoreItem {
  cost: number;
}

// --- DATA & LORE ---
const eyeColors: EyeColor[] = [
  { id: 'brown', name: 'Braun (OCA2 stark)', type: 'Iris-Struktur', color: '#4b3621', hex: 'bg-[#4b3621]', cost: 0, desc: 'Dominanter Phänotyp.', loreBio: 'Hohe Melanin-Konzentration im vorderen Teil der Iris. Absorbiert Licht effizient. Der dominante Ur-Typ der Menschheit.', lorePug: 'Wird oft als Standard betrachtet. In einer genetisch modifizierten elitären Gesellschaft gilt natürliche braune Augenfarbe bald als Zeichen von "niederem" Einkommen (da nicht modifiziert).', loreRel: 'Der unberührte Urzustand der menschlichen Schöpfung.' },
  { id: 'blue', name: 'Blau (HERC2-Mutation)', type: 'Iris-Struktur', color: '#4b90c2', hex: 'bg-[#4b90c2]', cost: 5, desc: 'Lichtbrechungs-Effekt.', loreBio: 'Es gibt kein blaues Pigment! Die Farbe entsteht durch Lichtbrechung (Rayleigh-Streuung) in einem melaninarmen Stroma. Eine natürliche Genmutation, die vor ca. 6.000 Jahren entstand.', lorePug: 'Historisch oft fälschlicherweise mystifiziert oder für rassistische Ideologien missbraucht. Heute ein beliebtes und einfaches kosmetisches Upgrade.', loreRel: 'Eine natürliche Variation, ethisch weitgehend unbedenklich.' },
  { id: 'green', name: 'Grün (Lipochrom)', type: 'Iris-Struktur', color: '#4c9a62', hex: 'bg-[#4c9a62]', cost: 10, desc: 'Seltene Kombination.', loreBio: 'Kombination aus Rayleigh-Streuung (Blau) und gelblichem Lipochrom-Pigment. Weltweit sehr selten (ca. 2% der unmodifizierten Weltbevölkerung).', lorePug: 'Gilt als ästhetisch wertvoll. Hohe Nachfrage in Premium-Kliniken führt zu einer künstlichen Inflation dieses Merkmals.', loreRel: 'Akzeptierte Variation.' },
  { id: 'violet', name: 'Violett (Albinotisch)', type: 'Iris-Struktur', color: '#8a2be2', hex: 'bg-[#8a2be2]', cost: 25, desc: 'Extremer Melaninmangel.', loreBio: 'Extremer Melaninmangel lässt die roten Blutgefäße der Netzhaut durch den blauen Tyndall-Effekt schimmern. Führt zu massiver UV-Empfindlichkeit und erfordert Cyber-Implantate als Schutz.', lorePug: 'Ein extremes Status-Symbol der Hyper-Reichen. Zeigt, dass man sich die Folgekosten (Schutzimplantate) leisten kann.', loreRel: 'Kritisch. Dem Kind wird bewusst ein biologischer Nachteil (Lichtempfindlichkeit) für rein ästhetische Zwecke der Eltern angezüchtet.' },
  { id: 'gold', name: 'Gold-Meliert (Synthetisch)', type: 'Iris-Struktur', color: '#ffd700', hex: 'bg-[#ffd700]', cost: 40, desc: 'Künstliche Biolumineszenz.', loreBio: 'Künstliche Biolumineszenz-Einschlüsse in der Iris, adaptiert aus marinen Mikroorganismen. Leuchtet schwach im Dunkeln.', lorePug: 'Ein reines Statussymbol der Elite von 2045. Streng reguliert, da es die visuelle Identifikation bei Gesichtsscannern stört.', loreRel: 'Absoluter Tabubruch. Die Modifikation des menschlichen Auges mit Tier-DNA zur reinen Dekoration entwertet das menschliche Leben zum Produkt.' }
];

const exoticMods: ExoticMod[] = [
  { id: 'tetrachromacy', name: 'Tetrachromatie (OPN1LW-Gen)', cost: 30, type: 'Biologie', desc: 'Integration eines 4. Zapfen-Typs in der Retina.', loreBio: 'Das Kind wird 100 Millionen Farben statt 1 Million Farben sehen können (wie Vögel/Insekten). Die visuelle Großhirnrinde muss dafür massiv umstrukturiert werden.', lorePug: 'Verschafft extreme Vorteile in Kunst, Design, Forensik und Analyse. Wird von Normalsterblichen als "unfaire biologische Überlegenheit" gewertet.', loreRel: 'Ethische Grauzone. Erweitert die menschliche Wahrnehmung, entfernt das Kind aber von der gemeinsamen menschlichen Erfahrungswelt.' },
  { id: 'dec2', name: 'Kurzschläfer-Mutation (DEC2)', cost: 35, type: 'Effizienz', desc: 'Veränderung des zirkadianen Rhythmus.', loreBio: 'Das Kind benötigt biologisch bedingt nur 4 Stunden Schlaf pro Nacht ohne kognitive oder physische Einbußen. Die REM-Phasen werden künstlich komprimiert.', lorePug: 'Der ultimative feuchte Traum des Spätkapitalismus. Schafft eine Arbeitselite, die 20 Stunden pro Tag performt. Normale Menschen können auf dem Arbeitsmarkt nicht mehr konkurrieren.', loreRel: 'Der Mensch verliert seine Rhythmik und seine Schwäche. Schlaf ist eine Phase der Verletzlichkeit und des Träumens, die hier ökonomisiert wird.' },
  { id: 'myostatin', name: 'Myostatin-Inhibition (MSTN)', cost: 45, type: 'Physis', desc: 'Blockiert Protein, das Muskelwachstum begrenzt.', loreBio: 'Führt zu extrem hypertropher Muskelmasse ab dem Kleinkindalter ohne spezifisches Training (bekannt von "Weißblauen Belgier"-Rindern). Hohe Belastung für das Herz-Kreislauf-System.', lorePug: 'Militärs und private Sicherheitsfirmen zahlen Millionen für solche Individuen. Zementiert die Vorstellung vom "gezüchteten Supersoldaten".', loreRel: 'Die theologische Kritik ist massiv: Die Schöpfung wird hier zur Erschaffung eines Herakles-Monsters pervertiert. Der menschliche Körperbau wird auf reine Gewaltausübung degradiert.' }
];

export function BabyDesignerPhenotypePhase({ onNext }: { onNext: () => void }) {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<'pigment' | 'iris' | 'mods'>('pigment');
  
  // Design Variables
  const [eumelanin, setEumelanin] = useState(60); 
  const [pheomelanin, setPheomelanin] = useState(25);
  const [eyeColor, setEyeColor] = useState<EyeColor>(eyeColors[0]);
  const [activeMods, setActiveMods] = useState<string[]>([]);
  
  // Lore Terminal State (Crucial for iPad - updates on click, not hover)
  const [activeLoreTab, setActiveLoreTab] = useState<'bio' | 'pug' | 'rel'>('bio');
  const [inspectedItem, setInspectedItem] = useState<LoreItem | null>(null);

  // --- DERIVED VALUES ---
  // Calculate Genomic Stability (starts at 100%, drops with extreme settings)
  const calculateStability = () => {
    let stability = 100;
    stability -= eyeColor.cost;
    activeMods.forEach(modId => {
      const mod = exoticMods.find(m => m.id === modId);
      if(mod) stability -= mod.cost;
    });
    // Extreme melanin combinations cause slight instability
    if (eumelanin < 10 && pheomelanin < 10) stability -= 15; // Albinism risk
    if (eumelanin > 90 && pheomelanin > 90) stability -= 10; // Unnatural hyper-pigmentation
    return Math.max(0, stability);
  };
  const genomeStability = calculateStability();
  const isCritical = genomeStability < 25;

  // Real biology approximation for HSL colors
  const skinLightness = 90 - (eumelanin * 0.6); 
  const skinSaturation = 20 + (pheomelanin * 0.5);
  const skinColor = `hsl(30, ${skinSaturation}%, ${skinLightness}%)`;

  const hairLightness = 80 - (eumelanin * 0.7);
  const hairSaturation = 10 + (pheomelanin * 0.8);
  const hairColor = `hsl(25, ${hairSaturation}%, ${hairLightness}%)`;

  // --- ACTIONS ---
  const handleModToggle = (mod: ExoticMod) => {
    setActiveMods(prev => 
      prev.includes(mod.id) ? prev.filter(id => id !== mod.id) : [...prev, mod.id]
    );
    setInspectedItem(mod); // Update lore panel explicitly
  };

  const handleEyeSelect = (eye: EyeColor) => {
    setEyeColor(eye);
    setInspectedItem(eye); // Update lore panel explicitly
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 p-2 md:p-4 min-h-[85vh] lg:min-h-[80vh]"
    >
      {/* ==========================================
          LEFT PANE: HOLOGRAM INCUBATOR
      ========================================== */}
      <Card className={`w-full lg:w-5/12 glass flex flex-col relative overflow-hidden h-[400px] lg:h-full transition-colors duration-500 shrink-0 ${isCritical ? 'border-[#ff0000]/50 shadow-[0_0_30px_rgba(255,0,0,0.2)]' : 'border-[#00f0ff]/30'}`}>
        {/* Background & Warnings */}
        <div className="absolute inset-0 bg-[#050A15] z-0" />
        <div className={`absolute inset-0 z-0 opacity-10 pointer-events-none transition-colors duration-500 ${isCritical ? 'bg-[radial-gradient(circle_at_center,#ff0000_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,#00f0ff_0%,transparent_70%)]'}`} />
        
        {isCritical && (
           <div className="absolute inset-0 z-0 bg-[#ff0000]/10 animate-pulse pointer-events-none" />
        )}

        <CardHeader className="border-b border-slate-700/50 bg-slate-900/80 z-10 relative py-3 md:py-4">
          <div className="flex justify-between items-center">
             <CardTitle className={`text-base md:text-xl font-black tracking-widest flex items-center gap-2 ${isCritical ? 'text-[#ff0000]' : 'text-white'}`}>
                {isCritical ? <AlertTriangle className="animate-pulse" /> : <Dna className="text-[#00f0ff]" />} 
                INKUBATOR V.9
             </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col items-center justify-center relative p-4 md:p-6 overflow-hidden">
           
           {/* THE 3D HOLOGRAM AVATAR */}
           <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] flex flex-col items-center justify-center z-10">
              
              {/* High-Tech Rings */}
              <motion.div animate={{ rotateX: 360, rotateY: 180 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className={`absolute inset-0 border rounded-full transition-colors duration-500 ${isCritical ? 'border-[#ff0000]/40' : 'border-[#00f0ff]/30'}`} style={{ transformStyle: 'preserve-3d' }} />
              <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className={`absolute inset-[-10%] border-2 border-dashed rounded-full transition-colors duration-500 ${isCritical ? 'border-[#ff0000]/20' : 'border-[#ff00e5]/20'}`} />
              
              {/* Base Pedestal Glow */}
              <div className={`absolute bottom-[-10%] w-[60%] h-[10%] blur-[20px] rounded-full transition-colors duration-500 ${isCritical ? 'bg-[#ff0000]' : 'bg-[#00f0ff]'}`} />

              {/* Abstract Fetus / Head Representation */}
              <motion.div 
                className="relative w-[45%] h-[60%] rounded-[45%] flex flex-col items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] border border-white/10 transition-colors duration-500 overflow-hidden"
                style={{ backgroundColor: skinColor, boxShadow: `0 0 50px ${skinColor}30` }}
              >
                 {/* Hair Gradient Top */}
                 <div 
                   className="absolute top-0 w-full h-[30%] opacity-90 transition-colors duration-500 blur-md"
                   style={{ backgroundColor: hairColor }}
                 />

                 {/* Eyes */}
                 <div className="flex gap-3 md:gap-4 mt-2 relative z-10">
                    <div className="w-4 h-2 md:w-6 md:h-4 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shadow-inner backdrop-blur-sm border border-black/30">
                       <motion.div className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-500 shadow-[inset_0_0_3px_rgba(0,0,0,0.8)]" style={{ backgroundColor: eyeColor.color }} />
                    </div>
                    <div className="w-4 h-2 md:w-6 md:h-4 rounded-full bg-white/20 flex items-center justify-center overflow-hidden shadow-inner backdrop-blur-sm border border-black/30">
                       <motion.div className="w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-500 shadow-[inset_0_0_3px_rgba(0,0,0,0.8)]" style={{ backgroundColor: eyeColor.color }} />
                    </div>
                 </div>
                 
                 {/* Visual effect for Myostatin (Thick neck) */}
                 {activeMods.includes('myostatin') && (
                    <div className="absolute bottom-0 w-full h-[20%] bg-black/30" />
                 )}
                 {/* Visual effect for DEC2 (Brain glow) */}
                 {activeMods.includes('dec2') && (
                    <div className="absolute top-[10%] w-[50%] h-[20%] bg-[#00f0ff]/40 blur-md rounded-full animate-pulse" />
                 )}
              </motion.div>

              {/* Data Overlay HUD */}
              <div className="absolute right-[-5%] md:right-[-20%] top-[10%] flex flex-col gap-1 md:gap-2">
                 <div className="text-[8px] md:text-[10px] font-mono text-[#00f0ff] bg-slate-900/80 px-1 md:px-2 py-0.5 md:py-1 rounded border border-[#00f0ff]/30 shadow-lg">EU: {eumelanin}%</div>
                 <div className="text-[8px] md:text-[10px] font-mono text-[#ffaa00] bg-slate-900/80 px-1 md:px-2 py-0.5 md:py-1 rounded border border-[#ffaa00]/30 shadow-lg">PH: {pheomelanin}%</div>
              </div>
           </div>

           {/* STABILITY METER */}
           <div className="w-full mt-auto pt-4 md:pt-6 border-t border-slate-700/50 relative z-10">
              <div className="flex justify-between items-end mb-1 md:mb-2">
                 <div>
                    <h4 className={`text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 ${isCritical ? 'text-[#ff0000]' : 'text-slate-400'}`}>
                       <Activity size={14} className={isCritical ? 'animate-pulse' : ''} />
                       Genom-Stabilität
                    </h4>
                    {isCritical && <p className="text-[8px] md:text-[10px] text-[#ff0000] font-mono mt-1 font-bold">KRITISCHER ZERFALL! MUTATIONEN ENTFERNEN!</p>}
                 </div>
                 <span className={`text-xl md:text-3xl font-black font-mono ${isCritical ? 'text-[#ff0000] animate-pulse' : 'text-white'}`}>
                    {genomeStability}%
                 </span>
              </div>
              <div className="w-full h-3 md:h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-0.5 relative shadow-inner">
                 <motion.div 
                    animate={{ width: `${genomeStability}%` }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className={`h-full rounded-full ${
                       genomeStability > 60 ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]' : 
                       genomeStability >= 25 ? 'bg-[#ffaa00] shadow-[0_0_10px_#ffaa00]' : 
                       'bg-[#ff0000] shadow-[0_0_15px_#ff0000]'
                    }`}
                 />
                 {/* Danger Line */}
                 <div className="absolute top-0 left-[25%] w-0.5 h-full bg-red-500 z-10" />
              </div>
           </div>
        </CardContent>
      </Card>

      {/* ==========================================
          RIGHT PANE: CONFIGURATION & LORE
      ========================================== */}
      <div className="flex-1 flex flex-col gap-4 h-full relative z-20">
         
         {/* TOP: Configuration Tabs & Controls */}
         <Card className="flex-1 glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden min-h-[300px]">
            
            {/* iPad friendly Tabs */}
            <div className="flex w-full bg-slate-900/80 border-b border-slate-700/50">
               <button onClick={() => setActiveTab('pigment')} className={`flex-1 py-3 md:py-4 text-[10px] md:text-xs font-bold tracking-widest uppercase border-b-2 transition-colors ${activeTab === 'pigment' ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Pigmente</button>
               <button onClick={() => setActiveTab('iris')} className={`flex-1 py-3 md:py-4 text-[10px] md:text-xs font-bold tracking-widest uppercase border-b-2 transition-colors ${activeTab === 'iris' ? 'border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Augen</button>
               <button onClick={() => setActiveTab('mods')} className={`flex-1 py-3 md:py-4 text-[10px] md:text-xs font-bold tracking-widest uppercase border-b-2 transition-colors ${activeTab === 'mods' ? 'border-[#ff00e5] text-[#ff00e5] bg-[#ff00e5]/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Erweiterungen</button>
            </div>

            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-20">
               <AnimatePresence mode="wait">
                  
                  {/* TAB 1: PIGMENTATION */}
                  {activeTab === 'pigment' && (
                     <motion.div key="pigment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 md:space-y-8">
                        <div className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-3 md:p-4 rounded-xl flex items-start gap-3">
                           <Microscope className="text-[#00f0ff] shrink-0" size={20} />
                           <p className="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed">
                              Passen Sie die Melanozyten-Aktivität an. Extreme Abweichungen vom natürlichen Gleichgewicht kosten Genom-Stabilität.
                           </p>
                        </div>

                        {/* iPad Friendly Slider Eumelanin */}
                        <div className="space-y-3 bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700">
                           <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                              <span className="text-white">Eumelanin (Dunkelpigment)</span>
                              <span className="text-[#00f0ff] font-mono text-base md:text-lg">{eumelanin}%</span>
                           </div>
                           <div className="flex items-center gap-2 md:gap-4">
                              <Button variant="outline" size="icon" onClick={() => setEumelanin(e => Math.max(0, e - 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#00f0ff]/20 active:border-[#00f0ff]"><Minus /></Button>
                              <input type="range" min="0" max="100" value={eumelanin} onChange={(e) => setEumelanin(Number(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none accent-[#00f0ff]" />
                              <Button variant="outline" size="icon" onClick={() => setEumelanin(e => Math.min(100, e + 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#00f0ff]/20 active:border-[#00f0ff]"><Plus /></Button>
                           </div>
                        </div>

                        {/* iPad Friendly Slider Pheomelanin */}
                        <div className="space-y-3 bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700">
                           <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                              <span className="text-white">Phäomelanin (Hell/Rotpigment)</span>
                              <span className="text-[#ffaa00] font-mono text-base md:text-lg">{pheomelanin}%</span>
                           </div>
                           <div className="flex items-center gap-2 md:gap-4">
                              <Button variant="outline" size="icon" onClick={() => setPheomelanin(e => Math.max(0, e - 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#ffaa00]/20 active:border-[#ffaa00]"><Minus /></Button>
                              <input type="range" min="0" max="100" value={pheomelanin} onChange={(e) => setPheomelanin(Number(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none accent-[#ffaa00]" />
                              <Button variant="outline" size="icon" onClick={() => setPheomelanin(e => Math.min(100, e + 5))} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#ffaa00]/20 active:border-[#ffaa00]"><Plus /></Button>
                           </div>
                        </div>
                     </motion.div>
                  )}

                  {/* TAB 2: IRIS */}
                  {activeTab === 'iris' && (
                     <motion.div key="iris" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {eyeColors.map(eye => {
                           const isSelected = eyeColor.id === eye.id;
                           return (
                              <button
                                 key={eye.id}
                                 onClick={() => handleEyeSelect(eye)}
                                 className={`p-3 md:p-4 rounded-xl border text-left transition-all duration-300 flex flex-col gap-2 md:gap-3 ${
                                    isSelected 
                                      ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                                      : 'bg-slate-900/50 border-slate-700 text-slate-400 active:bg-slate-800'
                                 }`}
                              >
                                 <div className="flex items-center gap-3 w-full">
                                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-slate-900 shadow-sm shrink-0`} style={{ backgroundColor: eye.color }} />
                                    <h4 className={`font-bold text-xs md:text-sm flex-1 ${isSelected ? 'text-white' : ''}`}>{eye.name}</h4>
                                 </div>
                                 <div className="flex justify-between items-center w-full text-[9px] md:text-[10px] font-mono border-t border-slate-700/50 pt-2">
                                    <span>Tippen für Infos</span>
                                    <span className={eye.cost > 10 ? 'text-[#ff00e5]' : 'text-slate-500'}>Stabilität: -{eye.cost}%</span>
                                 </div>
                              </button>
                           )
                        })}
                     </motion.div>
                  )}

                  {/* TAB 3: EXOTIC MODS */}
                  {activeTab === 'mods' && (
                     <motion.div key="mods" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div className="bg-[#ff00e5]/10 border border-[#ff00e5]/30 p-3 md:p-4 rounded-xl flex items-start gap-3 mb-4 md:mb-6">
                           <ShieldAlert className="text-[#ff00e5] shrink-0" size={20} />
                           <p className="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed">
                              <strong className="text-[#ff00e5]">PROMETHEUS-KLASSE:</strong> Diese Modifikationen verändern die menschliche Natur tiefgreifend. Sie kosten massiv Genom-Stabilität.
                           </p>
                        </div>
                        
                        {exoticMods.map(mod => {
                           const isActive = activeMods.includes(mod.id);
                           return (
                              <div 
                                 key={mod.id}
                                 className={`p-3 md:p-4 rounded-xl border flex flex-col gap-3 transition-colors ${
                                    isActive ? 'bg-[#ff00e5]/10 border-[#ff00e5] shadow-[0_0_20px_rgba(255,0,229,0.2)]' : 'bg-slate-900/50 border-slate-700'
                                 }`}
                              >
                                 <div className="flex justify-between items-start w-full">
                                    <div className="flex-1 pr-2">
                                       <h4 className={`font-bold text-xs md:text-sm ${isActive ? 'text-[#ff00e5]' : 'text-slate-200'}`}>{mod.name}</h4>
                                       <p className="text-[9px] md:text-[10px] font-mono text-slate-400 mt-1">{mod.desc}</p>
                                    </div>
                                    <Button 
                                       variant={isActive ? 'destructive' : 'outline'} 
                                       size="sm" 
                                       onClick={() => handleModToggle(mod)}
                                       className={`h-8 text-xs ${isActive ? 'bg-[#ff00e5] hover:bg-[#ff00e5]/80 text-white' : 'border-slate-600 text-slate-300'}`}
                                    >
                                       {isActive ? 'Entfernen' : 'Injizieren'}
                                    </Button>
                                 </div>
                                 <div className="flex justify-between items-center w-full text-[9px] md:text-[10px] font-mono border-t border-slate-700/50 pt-2">
                                    <button onClick={() => setInspectedItem(mod)} className="text-[#00f0ff] underline">Akten lesen</button>
                                    <span className="text-[#ff0000] font-bold">Stabilität: -{mod.cost}%</span>
                                 </div>
                              </div>
                           )
                        })}
                     </motion.div>
                  )}

               </AnimatePresence>
            </CardContent>
         </Card>

         {/* BOTTOM: Touch-Friendly Lore Terminal */}
         <Card className="h-[180px] md:h-[220px] shrink-0 glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden z-20">
            <div className="flex w-full bg-slate-950 border-b border-slate-800">
               <button onClick={() => setActiveLoreTab('bio')} className={`flex-1 py-2 md:py-3 text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors flex justify-center items-center gap-1 md:gap-2 ${activeLoreTab === 'bio' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-slate-500 active:bg-slate-800'}`}><Microscope size={12}/> Biologie</button>
               <button onClick={() => setActiveLoreTab('pug')} className={`flex-1 py-2 md:py-3 text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors flex justify-center items-center gap-1 md:gap-2 border-l border-r border-slate-800 ${activeLoreTab === 'pug' ? 'bg-[#ff00e5]/20 text-[#ff00e5]' : 'text-slate-500 active:bg-slate-800'}`}><Fingerprint size={12}/> Politik & Ges.</button>
               <button onClick={() => setActiveLoreTab('rel')} className={`flex-1 py-2 md:py-3 text-[9px] md:text-[10px] font-bold tracking-widest uppercase transition-colors flex justify-center items-center gap-1 md:gap-2 ${activeLoreTab === 'rel' ? 'bg-[#ffaa00]/20 text-[#ffaa00]' : 'text-slate-500 active:bg-slate-800'}`}><BookOpen size={12}/> Ethik/Religion</button>
            </div>
            
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-5 bg-[#050A15]">
               <AnimatePresence mode="wait">
                  <motion.div 
                     key={inspectedItem ? inspectedItem.id + activeLoreTab : 'default' + activeLoreTab}
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                     className="text-xs md:text-sm font-mono leading-relaxed"
                  >
                     {inspectedItem ? (
                        <>
                           <div className="flex items-center gap-2 mb-2 md:mb-3 border-b border-slate-800 pb-2">
                              <Info size={14} className={activeLoreTab === 'bio' ? 'text-[#00f0ff]' : activeLoreTab === 'pug' ? 'text-[#ff00e5]' : 'text-[#ffaa00]'} />
                              <strong className="text-white uppercase tracking-widest">{inspectedItem.name}</strong>
                           </div>
                           
                           {activeLoreTab === 'bio' && <p className="text-[#00f0ff]/90">{inspectedItem.loreBio}</p>}
                           {activeLoreTab === 'pug' && <p className="text-[#ff00e5]/90">{inspectedItem.lorePug || "Keine massiven Auswirkungen auf gesellschaftliche Strukturen dokumentiert."}</p>}
                           {activeLoreTab === 'rel' && <p className="text-[#ffaa00]/90">{inspectedItem.loreRel || "Von theologischer Seite wird dieser spezifische Eingriff als weitgehend kosmetisch und tolerierbar eingestuft."}</p>}
                        </>
                     ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 md:gap-3 mt-2 md:mt-4">
                           <Eye size={24} className="opacity-20" />
                           <p className="text-center text-[10px] md:text-xs">Tippen Sie auf &quot;Akten lesen&quot; bei einer Mutation oder tippen Sie auf eine Augenfarbe, um die interdisziplinäre Lore zu laden.</p>
                        </div>
                     )}
                  </motion.div>
               </AnimatePresence>
            </CardContent>
         </Card>

      </div>

      {/* FIXED BOTTOM NAVIGATION FOR NEXT PHASE */}
      <div className="fixed bottom-2 right-2 md:bottom-6 md:right-6 z-50">
         <Button 
            variant="sci-fi" 
            size="lg"
            onClick={onNext}
            disabled={isCritical}
            className={`px-4 py-4 md:px-8 md:py-6 text-[10px] md:text-sm font-black tracking-widest ${isCritical ? 'opacity-50 cursor-not-allowed bg-red-950 border-red-500 text-red-500' : 'shadow-[0_0_30px_rgba(0,240,255,0.4)]'}`}
         >
            {isCritical ? 'GENOM KRITISCH' : 'SYNTHESE ABSCHLIESSEN'} <Zap className="ml-2 w-4 h-4 md:w-5 md:h-5" />
         </Button>
      </div>

    </motion.div>
  );
}