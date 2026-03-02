import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Dna, Fingerprint, Eye, Zap, Info, Microscope, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA & LORE ---
const eyeColors = [
  { id: 'brown', name: 'Braun (OCA2 stark)', color: '#4b3621', hex: 'bg-[#4b3621]', cost: 0, lore: 'Hohe Melanin-Konzentration im vorderen Teil der Iris. Dominanter Ur-Typ der Menschheit.' },
  { id: 'blue', name: 'Blau (HERC2-Mutation)', color: '#4b90c2', hex: 'bg-[#4b90c2]', cost: 5, lore: 'Kein blaues Pigment! Entsteht durch Lichtbrechung (Rayleigh-Streuung) in einem melaninarmen Stroma. Eine Genmutation, die vor 6.000 Jahren entstand.' },
  { id: 'green', name: 'Grün (Lipochrom)', color: '#4c9a62', hex: 'bg-[#4c9a62]', cost: 10, lore: 'Kombination aus Rayleigh-Streuung und gelblichem Lipochrom-Pigment. Weltweit sehr selten (ca. 2%).' },
  { id: 'violet', name: 'Violett (Albinotisch)', color: '#8a2be2', hex: 'bg-[#8a2be2]', cost: 25, lore: 'Extremer Melaninmangel lässt rote Blutgefäße durch den blauen Tyndall-Effekt schimmern. Führt zu massiver UV-Empfindlichkeit.' },
  { id: 'gold', name: 'Gold-Meliert (Synthetisch)', color: '#ffd700', hex: 'bg-[#ffd700]', cost: 40, lore: 'Künstliche Biolumineszenz-Einschlüsse in der Iris. Ein reines Statussymbol der Elite von 2045. Streng reguliert.' }
];

interface ExoticMod {
  id: string;
  name: string;
  cost: number;
  type: string;
  desc: string;
  loreBio: string;
  lorePug: string;
  loreRel?: string;
}

const exoticMods: ExoticMod[] = [
  { 
    id: 'tetrachromacy', 
    name: 'Tetrachromatie (OPN1LW-Gen)', 
    cost: 30, 
    type: 'Biologie',
    desc: 'Integration eines vierten Zapfen-Typs in der Retina.', 
    loreBio: 'Das Kind wird 100 Millionen Farben statt 1 Million Farben sehen können (wie Vögel/Insekten).',
    lorePug: 'Verschafft extreme Vorteile in Kunst, Design und Analyse. Wird von Normalsterblichen als "unfaire biologische Überlegenheit" gewertet.'
  },
  { 
    id: 'dec2', 
    name: 'Kurzschläfer-Mutation (DEC2)', 
    cost: 35, 
    type: 'Effizienz',
    desc: 'Veränderung des zirkadianen Rhythmus.', 
    loreBio: 'Das Kind benötigt biologisch bedingt nur 4 Stunden Schlaf pro Nacht ohne kognitive Einbußen.',
    lorePug: 'Der ultimative feuchte Traum des Spätkapitalismus. Schafft eine Arbeitselite, die 20 Stunden pro Tag performt. Normale Menschen können nicht konkurrieren.'
  },
  { 
    id: 'myostatin', 
    name: 'Myostatin-Inhibition (MSTN)', 
    cost: 45, 
    type: 'Physis',
    desc: 'Blockiert das Protein, das das Muskelwachstum begrenzt.', 
    loreBio: 'Führt zu extrem hypertropher Muskelmasse ab dem Kleinkindalter ohne Training (bekannt von "Weißblauen Belgier"-Rindern).',
    loreRel: 'Die theologische Kritik ist massiv: Die Schöpfung wird hier zur Erschaffung eines "Herakles-Monsters" pervertiert. Der menschliche Körperbau wird auf reine Leistung degradiert.',
    lorePug: ''
  }
];

export function BabyDesignerPhenotypePhase({ onNext }: { onNext: () => void }) {
  // --- STATE ---
  // Skin & Hair uses continuous sliders based on real melanin types
  const [eumelanin, setEumelanin] = useState(50); // Brown/Black pigment
  const [pheomelanin, setPheomelanin] = useState(20); // Red/Yellow pigment
  
  const [eyeColor, setEyeColor] = useState(eyeColors[0]);
  const [activeMods, setActiveMods] = useState<string[]>([]);
  
  const [activeLoreTab, setActiveLoreTab] = useState<'bio' | 'pug' | 'rel'>('bio');
  const [hoveredMod, setHoveredMod] = useState<ExoticMod | null>(null);

  // --- DERIVED VALUES ---
  // Calculate Genomic Stability (starts at 100%, drops with extreme settings and mods)
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

  // Calculate Skin Color Hex using HSL (Real biology approximation)
  // Lightness is mostly determined by inverse of Eumelanin. Saturation by Pheomelanin.
  const skinLightness = 90 - (eumelanin * 0.6); 
  const skinSaturation = 20 + (pheomelanin * 0.5);
  const skinColor = `hsl(30, ${skinSaturation}%, ${skinLightness}%)`;

  // Calculate Hair Color
  const hairLightness = 80 - (eumelanin * 0.7);
  const hairSaturation = 10 + (pheomelanin * 0.8);
  const hairColor = `hsl(25, ${hairSaturation}%, ${hairLightness}%)`;

  const toggleMod = (modId: string) => {
    setActiveMods(prev => 
      prev.includes(modId) ? prev.filter(id => id !== modId) : [...prev, modId]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6 p-4 h-[85vh] xl:h-[80vh]"
    >
      {/* ==========================================
          LEFT PANE: HOLO-AVATAR & STABILITY
      ========================================== */}
      <Card className="w-full xl:w-5/12 glass border-[#00f0ff]/30 flex flex-col relative overflow-hidden h-full">
        {/* Decorative Sci-Fi Background */}
        <div className="absolute inset-0 bg-[#050A15] z-0" />
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #00f0ff 0%, transparent 70%)' }} />
        <motion.div animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, #00f0ff 4px, #00f0ff 5px)', backgroundSize: '100% 10px' }} />

        <CardHeader className="border-b border-slate-700/50 bg-slate-900/80 z-10 relative py-4">
          <div className="flex justify-between items-center">
             <CardTitle className="text-xl font-black tracking-widest text-white flex items-center gap-2">
                <Dna className="text-[#00f0ff]" /> PHÄNOTYP-KOMPILER
             </CardTitle>
             <span className="text-xs font-mono px-2 py-1 bg-[#00f0ff]/10 text-[#00f0ff] rounded border border-[#00f0ff]/30">
                RENDER_ENGINE_V9
             </span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col items-center justify-center relative p-6">
           
           {/* THE HOLOGRAM AVATAR */}
           <div className="relative w-64 h-80 flex flex-col items-center justify-center z-10">
              {/* Spinning Scanner Rings */}
              <motion.div animate={{ rotateX: 360, rotateY: 180 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-[#00f0ff]/20 rounded-full" style={{ transformStyle: 'preserve-3d' }} />
              <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] border border-dashed border-[#ff00e5]/20 rounded-full" />
              
              {/* Base Wireframe Glow */}
              <div className="absolute bottom-0 w-32 h-8 bg-[#00f0ff] blur-[30px] opacity-30 rounded-full" />

              {/* Head / Face Representation */}
              <motion.div 
                className="relative w-40 h-48 rounded-[40%] flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] border border-white/10 transition-colors duration-500 overflow-hidden"
                style={{ backgroundColor: skinColor, boxShadow: `0 0 40px ${skinColor}40` }}
              >
                 {/* Hair / Keratin Top */}
                 <div 
                   className="absolute top-0 w-full h-16 opacity-90 transition-colors duration-500 blur-sm"
                   style={{ backgroundColor: hairColor }}
                 />

                 {/* Eyes */}
                 <div className="flex gap-6 mt-4 relative z-10">
                    <motion.div className="w-8 h-4 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shadow-inner backdrop-blur-sm border border-black/20">
                       <motion.div 
                         className="w-4 h-4 rounded-full transition-colors duration-500 shadow-[inset_0_0_5px_rgba(0,0,0,0.8)]"
                         style={{ backgroundColor: eyeColor.color }}
                       />
                    </motion.div>
                    <motion.div className="w-8 h-4 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shadow-inner backdrop-blur-sm border border-black/20">
                       <motion.div 
                         className="w-4 h-4 rounded-full transition-colors duration-500 shadow-[inset_0_0_5px_rgba(0,0,0,0.8)]"
                         style={{ backgroundColor: eyeColor.color }}
                       />
                    </motion.div>
                 </div>
                 
                 {/* Visual effect for Myostatin (Wider neck/jaw hint) */}
                 {activeMods.includes('myostatin') && (
                    <div className="absolute bottom-0 w-full h-8 bg-black/20" />
                 )}
              </motion.div>

              {/* Data Overlay next to Avatar */}
              <div className="absolute right-[-60px] top-10 flex flex-col gap-2">
                 <div className="text-[9px] font-mono text-[#00f0ff] bg-slate-900/80 px-2 py-1 rounded border border-[#00f0ff]/30">EU: {eumelanin}%</div>
                 <div className="text-[9px] font-mono text-[#ffaa00] bg-slate-900/80 px-2 py-1 rounded border border-[#ffaa00]/30">PH: {pheomelanin}%</div>
                 <div className="text-[9px] font-mono text-[#ff00e5] bg-slate-900/80 px-2 py-1 rounded border border-[#ff00e5]/30">MODS: {activeMods.length}</div>
              </div>
           </div>

           {/* STABILITY METER */}
           <div className="w-full mt-auto pt-6 border-t border-slate-700/50">
              <div className="flex justify-between items-end mb-2">
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
                       <Activity size={14} className={genomeStability < 40 ? 'text-[#ff0000] animate-pulse' : 'text-[#00f0ff]'} />
                       Genom-Stabilität
                    </h4>
                    {genomeStability < 40 && <p className="text-[10px] text-[#ff0000] font-mono mt-1">KRITISCHE MUTATIONSLASST</p>}
                 </div>
                 <span className={`text-2xl font-black font-mono ${genomeStability < 40 ? 'text-[#ff0000]' : 'text-white'}`}>
                    {genomeStability}%
                 </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5 relative">
                 <motion.div 
                    animate={{ width: `${genomeStability}%` }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className={`h-full rounded-full ${
                       genomeStability > 70 ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]' : 
                       genomeStability > 39 ? 'bg-[#ffaa00] shadow-[0_0_10px_#ffaa00]' : 
                       'bg-[#ff0000] shadow-[0_0_10px_#ff0000] animate-pulse'
                    }`}
                 />
                 {/* Threshold markers */}
                 <div className="absolute top-0 left-[39%] w-px h-full bg-red-500/50" />
                 <div className="absolute top-0 left-[70%] w-px h-full bg-yellow-500/50" />
              </div>
           </div>
        </CardContent>
      </Card>

      {/* ==========================================
          RIGHT PANE: CONFIGURATION & LORE
      ========================================== */}
      <Card className="flex-1 glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden h-full">
        <CardHeader className="bg-slate-900/60 border-b border-slate-700/50 py-4">
          <CardTitle className="text-lg font-black tracking-widest text-slate-100 flex items-center gap-2">
            <Cpu className="text-[#00f0ff]" /> DESIGN-PARAMETER
          </CardTitle>
          <p className="text-xs font-mono text-slate-400">Verändern Sie Allele auf eigene Gefahr. Beachten Sie die ethischen Implikationen.</p>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
           
           {/* Top Controls Area - Scrollable */}
           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
              
              {/* 1. MELANIN SLIDERS */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center gap-2">
                    <Microscope size={16} /> Melanozyten-Synthese (Haut/Haar)
                 </h3>
                 
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                       <span className="text-slate-300">Eumelanin (Braun/Schwarz-Pigment)</span>
                       <span className="text-[#00f0ff]">{eumelanin}%</span>
                    </div>
                    <input 
                       type="range" min="0" max="100" value={eumelanin} onChange={(e) => setEumelanin(Number(e.target.value))}
                       className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00f0ff]"
                    />
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                       <span className="text-slate-300">Phäomelanin (Rot/Gelb-Pigment)</span>
                       <span className="text-[#ffaa00]">{pheomelanin}%</span>
                    </div>
                    <input 
                       type="range" min="0" max="100" value={pheomelanin} onChange={(e) => setPheomelanin(Number(e.target.value))}
                       className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ffaa00]"
                    />
                 </div>
                 <p className="text-[10px] text-slate-500 font-mono leading-relaxed mt-2">
                    *Biologie-Log: Haut- und Haarfarbe sind polygen. Eine Modifikation der MC1R-Rezeptoren beeinflusst die Balance dieser zwei Pigmente. Extreme Kombinationen erhöhen das UV-Risiko.
                 </p>
              </div>

              {/* 2. IRIS STRUCTURE */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center gap-2">
                    <Eye size={16} /> Iris-Struktur
                 </h3>
                 <div className="flex flex-wrap gap-3">
                    {eyeColors.map(eye => (
                       <button
                          key={eye.id}
                          onMouseEnter={() => setHoveredMod({ id: eye.id, name: eye.name, cost: eye.cost, type: 'Optik', desc: '', loreBio: eye.lore, lorePug: '', loreRel: '' })}
                          onMouseLeave={() => setHoveredMod(null)}
                          onClick={() => setEyeColor(eye)}
                          className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all flex items-center gap-2 ${
                             eyeColor.id === eye.id 
                               ? 'bg-slate-800 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                               : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'
                          }`}
                       >
                          <span className={`w-3 h-3 rounded-full ${eye.hex} border border-slate-900 shadow-sm`} />
                          {eye.name.split(' ')[0]}
                       </button>
                    ))}
                 </div>
              </div>

              {/* 3. EXOTIC MODS (ILLEGAL/PREMIUM) */}
              <div className="space-y-4">
                 <h3 className="text-sm font-bold text-[#ff00e5] uppercase tracking-widest border-b border-slate-700 pb-2 flex items-center gap-2">
                    <ShieldAlert size={16} /> Restriktive Modifikationen (Prometheus-Klasse)
                 </h3>
                 <div className="space-y-3">
                    {exoticMods.map(mod => {
                       const isActive = activeMods.includes(mod.id);
                       return (
                          <div 
                             key={mod.id}
                             onMouseEnter={() => setHoveredMod(mod)}
                             onMouseLeave={() => setHoveredMod(null)}
                             className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                                isActive ? 'bg-[#ff00e5]/10 border-[#ff00e5]/50' : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                             }`}
                          >
                             <div>
                                <h4 className={`font-bold text-sm ${isActive ? 'text-[#ff00e5]' : 'text-slate-300'}`}>{mod.name}</h4>
                                <p className="text-[10px] font-mono text-slate-500 mt-1">{mod.desc}</p>
                             </div>
                             <Button 
                                variant={isActive ? 'destructive' : 'outline'} 
                                size="sm" 
                                onClick={() => toggleMod(mod.id)}
                                className={isActive ? 'bg-[#ff00e5] hover:bg-[#ff00e5]/80 text-white' : 'border-slate-600 text-slate-400'}
                             >
                                {isActive ? 'Entfernen' : 'Injizieren'}
                             </Button>
                          </div>
                       )
                    })}
                 </div>
              </div>
           </div>

           {/* Bottom Lore/Info Panel (Dynamic based on hover/selection) */}
           <div className="h-48 bg-slate-950 border-t border-slate-800 p-4 flex flex-col">
              <div className="flex gap-2 border-b border-slate-800 pb-2 mb-3">
                 <button onClick={() => setActiveLoreTab('bio')} className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded ${activeLoreTab === 'bio' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-slate-500 hover:text-slate-300'}`}>Biologie</button>
                 <button onClick={() => setActiveLoreTab('pug')} className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded ${activeLoreTab === 'pug' ? 'bg-[#ff00e5]/20 text-[#ff00e5]' : 'text-slate-500 hover:text-slate-300'}`}>Politik & Ges.</button>
                 <button onClick={() => setActiveLoreTab('rel')} className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded ${activeLoreTab === 'rel' ? 'bg-[#ffaa00]/20 text-[#ffaa00]' : 'text-slate-500 hover:text-slate-300'}`}>Ethik / Rel.</button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                 <AnimatePresence mode="wait">
                    <motion.div 
                       key={hoveredMod ? hoveredMod.id + activeLoreTab : 'default' + activeLoreTab}
                       initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                       className="text-xs font-mono text-slate-400 leading-relaxed space-y-2"
                    >
                       {hoveredMod ? (
                          <>
                             <strong className="text-white block mb-1">{hoveredMod.name} - Analyse:</strong>
                             {activeLoreTab === 'bio' && <p className="text-[#00f0ff]">{hoveredMod.loreBio || "Reiner kosmetischer Eingriff. Keine massiven physiologischen Auswirkungen auf zellulärer Ebene."}</p>}
                             {activeLoreTab === 'pug' && <p className="text-[#ff00e5]">{hoveredMod.lorePug || "Kosmetische Genetik führt zu neuen Schönheitsidealen. Gesellschaftlicher Druck auf Unmodifizierte steigt."}</p>}
                             {activeLoreTab === 'rel' && <p className="text-[#ffaa00]">{hoveredMod.loreRel || "Kritiker sehen in jeder Design-Entscheidung einen Angriff auf die Einzigartigkeit des vom Schicksal/Gott gegebenen Lebens."}</p>}
                          </>
                       ) : (
                          <div className="flex items-center justify-center h-full text-slate-600 gap-2">
                             <Info size={16} /> Bewegen Sie den Cursor über Merkmale, um interdisziplinäre Akten zu laden.
                          </div>
                       )}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>

        </CardContent>

        <CardFooter className="bg-slate-900/90 p-4 border-t border-slate-700/50 flex justify-between items-center z-10">
           <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <Fingerprint size={14} />
              DNA-Profil {genomeStability < 40 ? 'Instabil' : 'Sicher'}
           </div>
           
           <Button 
              variant="sci-fi" 
              onClick={onNext}
              disabled={genomeStability < 20}
              className={`px-8 ${genomeStability < 20 ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_15px_rgba(0,240,255,0.3)]'}`}
           >
              {genomeStability < 20 ? 'GENOM ZU INSTABIL' : 'SYNTHETISIEREN & WEITER'} <Zap className="ml-2 w-4 h-4" />
           </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}