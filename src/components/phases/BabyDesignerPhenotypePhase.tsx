import React, { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Dna, Fingerprint, Eye, Zap, Info, Microscope, Activity, ShieldAlert,
  Plus, Minus, BookOpen, AlertTriangle, Scissors, Ruler, Ear,
  Heart, Sparkles, Hexagon, Compass, Waves, Flame, Shield, User
} from 'lucide-react';
import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from 'framer-motion';
import { RolePopup } from '../ui/RolePopup';

// ── INTERFACES ──────────────────────────────────────────────
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
interface HairType extends LoreItem {
  cost: number;
  pattern: 'straight' | 'wavy' | 'curly' | 'coily' | 'synthetic';
}
interface HeightRange extends LoreItem {
  min: number;
  max: number;
  cost: number;
}
interface BuildOption extends LoreItem {
  cost: number;
}
interface FaceOption extends LoreItem {
  cost: number;
}
interface ExoticMod extends LoreItem {
  cost: number;
}
type TabId = 'pigment' | 'iris' | 'hair' | 'morpho' | 'mods' | 'sensory';
interface DesignerState {
  activeMods: string[];
  build: string;
  eyeColor: EyeColor;
  height: number;
}
interface GeneWarning {
  condition: (state: DesignerState) => boolean;
  message: string;
  severity: 'info' | 'warning' | 'critical';
}
// ── AUGENFARBEN (9) ─────────────────────────────────────────
const eyeColors: EyeColor[] = [
  {
    id: 'brown', name: 'Braun (OCA2 stark)', type: 'Iris-Struktur',
    color: '#4b3621', hex: 'bg-[#4b3621]', cost: 0,
    desc: 'Dominanter Phänotyp.',
    loreBio: 'Hohe Melanin-Konzentration im vorderen Stroma der Iris. Absorbiert kurzwelliges Licht effizient. Der dominante Ur-Typ der Menschheit, verbreitet bei über 55% der Weltbevölkerung.',
    lorePug: 'In einer genetisch modifizierten Gesellschaft gilt natürliche braune Augenfarbe als Zeichen von niedrigem Einkommen, da nicht modifiziert. Ein perverser sozialer Umkehreffekt.',
    loreRel: 'Der unberührte Urzustand der menschlichen Schöpfung. Theologisch betrachtet: Das Naturbelassene als Ausdruck göttlichen Willens.'
  },
  {
    id: 'grey', name: 'Grau (HERC2-Variante)', type: 'Iris-Struktur',
    color: '#8e9aaf', hex: 'bg-[#8e9aaf]', cost: 3,
    desc: 'Reduziertes Stroma-Melanin.',
    loreBio: 'Noch weniger Melanin als bei blauen Augen. Die Rayleigh-Streuung wird durch minimal erhöhte Kollagen-Dichte im Stroma gedämpft, was den silbrigen Grauton erzeugt.',
    lorePug: 'Gilt als elegant und intellektuell. In skandinavischen Elite-Kliniken der beliebteste dezente Eingriff - unauffällig genug, um natürlich zu wirken.',
    loreRel: 'Eine natürliche Variation, die kaum ethische Bedenken aufwirft. Der Eingriff ist minimal.'
  },
  {
    id: 'blue', name: 'Blau (HERC2-Mutation)', type: 'Iris-Struktur',
    color: '#4b90c2', hex: 'bg-[#4b90c2]', cost: 5,
    desc: 'Lichtbrechungs-Effekt.',
    loreBio: 'Es gibt kein blaues Pigment! Die Farbe entsteht durch Rayleigh-Streuung in einem melaninarmen Stroma. Eine natürliche Genmutation, die vor ca. 6.000 Jahren am Schwarzen Meer entstand.',
    lorePug: 'Historisch mystifiziert und für rassistische Ideologien missbraucht. Heute ein beliebtes und einfaches kosmetisches Upgrade mit geringem Risiko.',
    loreRel: 'Eine natürliche Variation, ethisch weitgehend unbedenklich. Die Grenze zwischen Kosmetik und Schöpfungseingriff ist hier fließend.'
  },
  {
    id: 'amber', name: 'Amber (Lipofuszin-Dominant)', type: 'Iris-Struktur',
    color: '#cf8a2e', hex: 'bg-[#cf8a2e]', cost: 8,
    desc: 'Goldbraune Pigmentation.',
    loreBio: 'Erhöhte Lipofuszin-Ablagerung bei gleichzeitig reduziertem Eumelanin. Extrem selten in der Natur (< 0.1%). Die bernsteinfarbene Iris reflektiert Licht in einem warmen, kupfrigen Ton.',
    lorePug: 'Wird als "exotisch aber natürlich" vermarktet. Die beliebteste Option bei Eltern, die Modifikation wünschen, aber nicht als solche erkannt werden wollen.',
    loreRel: 'Leichter Eingriff in die Pigmentchemie. Ethisch tolerabel, da das Ergebnis im Spektrum natürlicher Variationen liegt.'
  },
  {
    id: 'green', name: 'Grün (Lipochrom)', type: 'Iris-Struktur',
    color: '#4c9a62', hex: 'bg-[#4c9a62]', cost: 10,
    desc: 'Seltene Kombination.',
    loreBio: 'Kombination aus Rayleigh-Streuung und gelblichem Lipochrom-Pigment. Weltweit sehr selten (ca. 2%). Erfordert präzise Dosierung beider Pigmentsysteme.',
    lorePug: 'Gilt als ästhetisch wertvoll. Hohe Nachfrage in Premium-Kliniken führt zu künstlicher Inflation dieses Merkmals. Ein Markt von 12 Milliarden Euro jährlich.',
    loreRel: 'Akzeptierte Variation. Die Modifikation bewegt sich noch im Rahmen der natürlichen Schöpfungsvarianz.'
  },
  {
    id: 'violet', name: 'Violett (Albinotisch)', type: 'Iris-Struktur',
    color: '#8a2be2', hex: 'bg-[#8a2be2]', cost: 25,
    desc: 'Extremer Melaninmangel.',
    loreBio: 'Extremer Melaninmangel lässt rote Blutgefäße der Netzhaut durch den blauen Tyndall-Effekt schimmern. Massive UV-Empfindlichkeit, erfordert Schutzimplantate.',
    lorePug: 'Extremes Status-Symbol der Hyper-Reichen. Zeigt, dass man sich die Folgekosten (Implantate, Spezialbrillen) leisten kann. Reine Klassendemonstration.',
    loreRel: 'Kritisch. Dem Kind wird bewusst ein biologischer Nachteil für rein ästhetische Zwecke angezüchtet. Das Leid des Kindes wird zum Accessoire.'
  },
  {
    id: 'heterochromia', name: 'Heterochromie (Mosaik-Spleiß)', type: 'Iris-Struktur',
    color: '#4b90c2', hex: 'bg-[#4b90c2]', cost: 20,
    desc: 'Zwei verschiedene Augenfarben.',
    loreBio: 'Gezielte somatische Mosaik-Mutation in einem Auge. Die Melanozytenpopulation wird in nur einer Iris modifiziert. Komplex, da die Veränderung exakt auf ein Auge begrenzt werden muss.',
    lorePug: 'Der "Designer-Look" schlechthin. Sofort als künstlich erkennbar. In Social-Media-Kreisen ein Trend mit Wartelisten von 2 Jahren.',
    loreRel: 'Bricht mit der natürlichen Symmetrie des Körpers. Ethisch grenzwertig, da rein kosmetisch und mit erheblichen Risiken verbunden.'
  },
  {
    id: 'gold', name: 'Gold-Meliert (Synthetisch)', type: 'Iris-Struktur',
    color: '#ffd700', hex: 'bg-[#ffd700]', cost: 40,
    desc: 'Künstliche Biolumineszenz.',
    loreBio: 'Biolumineszenz-Einschlüsse in der Iris, adaptiert aus marinen Dinoflagellaten. Leuchtet schwach im Dunkeln. Hohe Abstoßungsrate (15%) im ersten Lebensjahr.',
    lorePug: 'Reines Statussymbol der Elite. Streng reguliert, da es die Gesichtserkennung bei Sicherheitssystemen stört. In 14 Ländern verboten.',
    loreRel: 'Tabubruch. Modifikation des menschlichen Auges mit Meeres-DNA zur Dekoration entwertet das menschliche Leben zum Designobjekt.'
  },
  {
    id: 'bioluminescent', name: 'Biolumineszent (Aequorin)', type: 'Iris-Struktur',
    color: '#00ffcc', hex: 'bg-[#00ffcc]', cost: 50,
    desc: 'Aktive Lichtemission der Iris.',
    loreBio: 'Integration von Aequorin-Protein (Aequorea victoria-Qualle) in die Iris-Muskulatur. Augen leuchten bei Erregung oder Dunkelheit aktiv türkis-grün. Massive neurologische Nebenwirkungen möglich.',
    lorePug: 'Das ultimative transhumane Statement. Träger werden als "Leuchtende" bezeichnet und bilden eigene soziale Kaste. In 31 Ländern als "nicht-menschlich" klassifiziert.',
    loreRel: 'Absoluter Extremfall. Die Grenze zwischen Homo sapiens und synthetischem Organismus verschwimmt. Massive theologische Opposition weltweit.'
  }
];
// ── HAARTYPEN (5) ───────────────────────────────────────────
const hairTypes: HairType[] = [
  {
    id: 'straight', name: 'Typ I: Glatt (TCHH-Gen)', type: 'Haarstruktur',
    pattern: 'straight', cost: 0,
    desc: 'Runder Follikelquerschnitt.',
    loreBio: 'Symmetrischer, runder Haarfollikel produziert gerade Keratinfasern. Dominiert in ostasiatischen Populationen. Das TCHH-Gen (Trichohyalin) reguliert die Follikelform.',
    lorePug: 'Gilt in vielen Kulturen als pflegeleicht und professionell. Die Standardoption bei den meisten Gen-Kliniken - kein Aufpreis.',
    loreRel: 'Unveränderte Standardvariante. Ethisch unbedenklich.'
  },
  {
    id: 'wavy', name: 'Typ II: Wellig (WNT10A)', type: 'Haarstruktur',
    pattern: 'wavy', cost: 0,
    desc: 'Leicht ovaler Follikel.',
    loreBio: 'Das WNT10A-Signalmolekül formt einen leicht ovalen Follikelquerschnitt. Das Haar wächst mit einer natürlichen S-Kurve. Häufig in europäischen Populationen.',
    lorePug: 'Wird als "europäisch-attraktiv" vermarktet, was rassistische Schönheitsnormen reproduziert. Die Gen-Industrie profitiert von kulturellen Biases.',
    loreRel: 'Natürliche Variation. Ethisch unbedenklich, solange die Wahl nicht von rassistischen Motiven getrieben wird.'
  },
  {
    id: 'curly', name: 'Typ III: Lockig (OFCD1)', type: 'Haarstruktur',
    pattern: 'curly', cost: 5,
    desc: 'Stark ovaler Follikel.',
    loreBio: 'Asymmetrische Keratinverteilung im stark ovalen Follikel erzwingt Spiralbildung. Disulfidbrücken im Cortex sind ungleichmäßig verteilt. Erfordert CRISPR-Modifikation an OFCD1.',
    lorePug: 'In einer Welt der designten Perfektion wird "natürlich lockig" zum Luxus-Statement. Paradox: Natürlichkeit wird zum teuersten Designprodukt.',
    loreRel: 'Leichter Eingriff in die Haarstruktur-Gene. Die Modifikation des Erscheinungsbilds für rein ästhetische Zwecke wirft erste ethische Fragen auf.'
  },
  {
    id: 'coily', name: 'Typ IV: Afrotextur (KRT75)', type: 'Haarstruktur',
    pattern: 'coily', cost: 5,
    desc: 'Flacher, spiraliger Follikel.',
    loreBio: 'Extrem flacher Follikelquerschnitt mit spiraliger Wachstumsachse. Das KRT75-Gen (Keratin 75) bestimmt die enge Windung. Bietet natürlichen UV-Schutz für die Kopfhaut.',
    lorePug: 'Die politisch sensibelste Option. Die gezielte Wahl oder Abwahl dieser Textur reproduziert rassistische Strukturen und biologischen Determinismus.',
    loreRel: 'Jede Haartextur ist gleichwertig. Die bewusste Wahl nach ästhetischen Kriterien offenbart gesellschaftliche Vorurteile, die genetisch zementiert werden.'
  },
  {
    id: 'synthetic', name: 'Synthetische Keratinfaser (KRT-X)', type: 'Haarstruktur',
    pattern: 'synthetic', cost: 25,
    desc: 'Transgen-modifiziertes Keratin.',
    loreBio: 'Synthetisches Keratin mit eingewebten Spinnenseide-Proteinen (Nephila clavipes). 5x reißfester als normales Haar, metallischer Schimmer. Wächst 3x schneller.',
    lorePug: 'Das "Haarmaterial der Zukunft". Von der Modeindustrie als Revolution gefeiert. Normale Friseure können es nicht schneiden - nur Spezialkliniken.',
    loreRel: 'Vermischung menschlicher und tierischer DNA für Kosmetik. Spinnen-Gene in menschlichem Haar sind für viele Theologen ein klarer Grenzübertritt.'
  }
];

// ── HÖHENBEREICHE (4) ───────────────────────────────────────
const heightRanges: HeightRange[] = [
  {
    id: 'h-compact', name: 'Kompakt (155-165cm)', type: 'Morphologie',
    min: 150, max: 165, cost: 5,
    desc: 'Unter dem globalen Durchschnitt.',
    loreBio: 'Reduzierte GH-Rezeptor-Expression und HMGA2-Suppression. Kompakter Körperbau mit niedrigerem Schwerpunkt. Vorteil: Geringere Gelenkbelastung, höhere Agilität.',
    lorePug: 'Studien zeigen: Größe korreliert mit Gehalt und Führungsposition. Kleinere Menschen werden systematisch benachteiligt - die Gen-Industrie verstärkt diesen Bias.',
    loreRel: 'Gezielte Größenreduktion wirft Fragen auf: Wählen Eltern bewusst einen gesellschaftlichen Nachteil? Oder lehnen sie den Größenwahn ab?'
  },
  {
    id: 'h-standard', name: 'Standard (170-180cm)', type: 'Morphologie',
    min: 166, max: 180, cost: 0,
    desc: 'Im globalen Durchschnittsbereich.',
    loreBio: 'Standard-Expression der Wachstumsachse (GH/IGF-1). Keine genetische Modifikation erforderlich. Optimales Verhältnis von Körpermasse zu Energieverbrauch.',
    lorePug: 'Die sichere Wahl. Keinerlei gesellschaftliche Auffälligkeiten. Wird von Kliniken als Basis vermarktet, von der aus Upgrades verkauft werden.',
    loreRel: 'Der natürliche Zustand. Ethisch unbedenklich.'
  },
  {
    id: 'h-tall', name: 'Groß (185-195cm)', type: 'Morphologie',
    min: 181, max: 195, cost: 5,
    desc: 'Über dem globalen Durchschnitt.',
    loreBio: 'Erhöhte GH-Expression und verlängerte Wachstumsplatten-Aktivität. Größerer Bewegungsradius. Nachteil: Erhöhtes Bandscheiben- und Gelenkrisiko ab dem 40. Lebensjahr.',
    lorePug: 'Größe wird mit Macht, Kompetenz und Attraktivität assoziiert. Die beliebteste Modifikation bei männlichen Embryonen. Ein 6-Milliarden-Euro-Markt.',
    loreRel: 'Gezielte Größenoptimierung für sozialen Vorteil. Das Kind wird nach dem Karrierewunsch der Eltern geformt, nicht nach eigenem Willen.'
  },
  {
    id: 'h-extreme', name: 'Extrem (200-210cm)', type: 'Morphologie',
    min: 196, max: 210, cost: 15,
    desc: 'Weit über Durchschnitt. Gesundheitsrisiken.',
    loreBio: 'Massive GH-Überexpression. Extreme Körperlänge belastet Herz-Kreislauf-System (Marfan-ähnlich). Lebenserwartung: -5 bis -15 Jahre.',
    lorePug: 'Basketball-Scouts und Modelagenturen als Hauptkunden. Das Kind wird als Investition betrachtet. Scheitert die Karriere, bleibt ein übergroßer Körper mit Gesundheitsproblemen.',
    loreRel: 'Bewusste Inkaufnahme gesundheitlicher Schäden für Karrierechancen. Das Kind trägt die Konsequenzen elterlicher Ambitionen ein Leben lang.'
  }
];

// ── KÖRPERBAU (4) ───────────────────────────────────────────
const buildOptions: BuildOption[] = [
  {
    id: 'ecto', name: 'Ektomorph (Leptosom)', type: 'Körperbau', cost: 0,
    desc: 'Schlanker, langgliedriger Körperbau.',
    loreBio: 'Niedrige Myostatin-Expression, hohe Leptinsensitivität. Geringe Muskelmasse bei schnellem Stoffwechsel. Vorteil: Ausdauer und Thermoregulation.',
    lorePug: 'Der "Denkertyp" - wird oft für intellektuelle Berufe vorselektiert. Reproduziert das Klischee, dass körperliche Schwäche mit Intelligenz korreliert.',
    loreRel: 'Natürliche Variation des menschlichen Körperbaus. Der Eingriff ist minimal.'
  },
  {
    id: 'meso', name: 'Mesomorph (Athletisch)', type: 'Körperbau', cost: 5,
    desc: 'Ausgewogener, muskulöser Körperbau.',
    loreBio: 'Optimierte Balance zwischen IGF-1 und Myostatin. Breite Schultern, schmale Hüften, effiziente Muskelhypertrophie. Der "griechische Athlet"-Typ.',
    lorePug: 'Der meistverkaufte Körperbau in Premium-Kliniken. Eltern wählen ihn für Status und Sportkarrieren. Ein Milliarden-Dollar-Markt.',
    loreRel: 'Gezielte Optimierung nach Schönheitsideal. Wo endet "gesund" und wo beginnt "designt"? Eine ethische Grauzone.'
  },
  {
    id: 'endo', name: 'Endomorph (Robust)', type: 'Körperbau', cost: 0,
    desc: 'Breiter, kräftiger Körperbau.',
    loreBio: 'Erhöhte Fettspeicherkapazität und effiziente Kalorienverwendung. Historisch ein Überlebensvorteil. Stärkere Knochenstruktur und höhere Grundstabilität.',
    lorePug: 'Wird gesellschaftlich stigmatisiert, obwohl biologisch effizient. Fast nie gewählt, was die Diskriminierung robuster Körpertypen genetisch manifestiert.',
    loreRel: 'Die bewusste Abwahl dieses Körperbaus zeigt die Tyrannei des Schönheitsideals. Jeder Körperbau hat seinen Wert in der Schöpfung.'
  },
  {
    id: 'enhanced', name: 'Transgen-Enhanced (GH/IGF+)', type: 'Körperbau', cost: 20,
    desc: 'Hypertrophierter Wachstumsfaktor.',
    loreBio: 'Massiv erhöhte GH/IGF-1-Achse kombiniert mit Myostatin-Suppression. Überdimensionaler, extrem muskulöser Körperbau. Hohe kardiovaskuläre Belastung.',
    lorePug: 'Militärs und Sicherheitsfirmen bestellen diesen Typ gezielt. Der "Supersoldat-Körper" wird zur Handelsware. Private Armeen mit genetisch designten Kämpfern.',
    loreRel: 'Der menschliche Körper als Kriegswerkzeug. Die Schöpfung wird pervertiert, das Kind zum Objekt fremder Machtinteressen.'
  }
];

// ── GESICHTSSTRUKTUR (4) ────────────────────────────────────
const faceOptions: FaceOption[] = [
  {
    id: 'narrow', name: 'Schmal (Leprosop)', type: 'Gesichtsstruktur', cost: 0,
    desc: 'Schmale Kieferlinie, hohe Stirn.',
    loreBio: 'Reduzierte Mandibula-Expression durch BMP4-Modulation. Schmaler Unterkiefer, ausgeprägte Wangenknochen, hohe Stirnpartie.',
    lorePug: 'Assoziiert mit "aristokratischer" Ästhetik. Die Gen-Industrie bedient bewusst historische Klassen-Stereotype.',
    loreRel: 'Geringfügiger kosmetischer Eingriff. Ethisch noch im Rahmen.'
  },
  {
    id: 'oval', name: 'Oval (Standard)', type: 'Gesichtsstruktur', cost: 0,
    desc: 'Ausgewogene Proportionen.',
    loreBio: 'Standard-Genexpression der kraniofazialen Knochen. Keine Modifikation nötig. Symmetrische Proportionen im natürlichen Varianzbereich.',
    lorePug: 'Die Null-Option - wird von Kliniken oft als langweilig dargestellt, um Upgrades zu verkaufen. Ein klassischer Upselling-Trick.',
    loreRel: 'Unveränderte Schöpfung. Ethisch ideal.'
  },
  {
    id: 'angular', name: 'Kantisch (Prognath)', type: 'Gesichtsstruktur', cost: 5,
    desc: 'Markanter Kiefer, breite Stirn.',
    loreBio: 'Verstärkte BMP4/Wnt-Signalgebung in der Mandibula. Breiterer Unterkiefer, prominentere Augenbrauen-Knochenleiste. Der "Krieger-Phänotyp".',
    lorePug: 'Der "CEO-Look" - Studien zeigen, dass kantische Gesichter in Führungspositionen bevorzugt werden. Gene werden zum Karriere-Tool.',
    loreRel: 'Gezielter Eingriff in die Gesichtsbildung für sozialen Vorteil. Das Kind wird nach dem Karrierewunsch der Eltern geformt.'
  },
  {
    id: 'symmetric', name: 'Symmetrie-Optimiert (Golden Ratio)', type: 'Gesichtsstruktur', cost: 15,
    desc: 'Mathematisch perfekte Proportionen.',
    loreBio: 'Algorithmus-gesteuerte Feinjustierung von 47 kraniofazialen Genen für die Phi-Proportion (1:1.618). Extrem komplex und fehleranfällig.',
    lorePug: 'Das "perfekte Gesicht" als Produkt. Instagram-Ästhetik wird genetisch codiert. Führt zu visueller Uniformität: Alle designten Kinder sehen sich ähnlich.',
    loreRel: 'Göttliche Schönheit algorithmisch erzeugen? Die Reduktion des Gesichts auf eine Formel negiert die Einzigartigkeit jedes Menschen.'
  }
];

// ── EXOTIC MODS (9) ─────────────────────────────────────────
const exoticMods: ExoticMod[] = [
  {
    id: 'tetrachromacy', name: 'Tetrachromatie (OPN1LW-Gen)', cost: 30, type: 'Sensorik',
    desc: 'Integration eines 4. Zapfen-Typs in der Retina.',
    loreBio: 'Das Kind sieht 100 Millionen statt 1 Million Farben (wie Vögel/Schmetterlinge). Die visuelle Großhirnrinde muss massiv umstrukturiert werden. Migräne-Risiko: 40%.',
    lorePug: 'Extreme Vorteile in Kunst, Design, Forensik. "Unfaire biologische Überlegenheit" - Normalsterbliche können in visuellen Berufen nicht mehr konkurrieren.',
    loreRel: 'Erweitert die Wahrnehmung, entfernt das Kind aber von der gemeinsamen menschlichen Erfahrungswelt. Es sieht eine Welt, die niemand teilen kann.'
  },
  {
    id: 'dec2', name: 'Kurzschläfer-Mutation (DEC2)', cost: 35, type: 'Effizienz',
    desc: 'Nur 4h Schlaf ohne kognitive Einbußen.',
    loreBio: 'Biologisch nur 4 Stunden Schlaf pro Nacht nötig. REM-Phasen werden künstlich komprimiert. Langzeitfolgen für die Neuroplastizität sind unerforscht.',
    lorePug: 'Der feuchte Traum des Spätkapitalismus. Eine Arbeitselite, die 20 Stunden performt. Normale Menschen können nicht mehr konkurrieren.',
    loreRel: 'Schlaf ist eine Phase der Verletzlichkeit und des Träumens. Wer den Schlaf ökonomisiert, verliert einen wesentlichen Teil des Menschseins.'
  },
  {
    id: 'myostatin', name: 'Myostatin-Inhibition (MSTN)', cost: 45, type: 'Physis',
    desc: 'Extreme Muskelhypertrophie ohne Training.',
    loreBio: 'Blockiert das Protein, das Muskelwachstum begrenzt. Hypertrophe Muskelmasse ab dem Kleinkindalter (bekannt von Weißblauen Belgier-Rindern). Hohe Herzbelastung.',
    lorePug: 'Militärs zahlen Millionen für diese Individuen. Zementiert das Narrativ vom "gezüchteten Supersoldaten". Private Sicherheitsfirmen als Hauptkunden.',
    loreRel: 'Die Schöpfung wird zur Erschaffung eines Monstrums pervertiert. Der menschliche Körper wird auf Gewaltausübung reduziert.'
  },
  {
    id: 'echolocation', name: 'Echolokalisation (FOXP2-Mod)', cost: 35, type: 'Sensorik',
    desc: 'Ultraschall-Orientierung wie Fledermäuse.',
    loreBio: 'Modifiziertes FOXP2 und verstärkter Larynx für hochfrequente Klicklaute. Der auditorische Cortex wird umgebaut, um Echos als 3D-Karte zu interpretieren.',
    lorePug: 'Militärischer Einsatz in Dunkelmissionen. Aber auch: Überwachung durch "hörende" Agenten, die Räume durch Wände wahrnehmen können.',
    loreRel: 'Die Integration tierischer Sinne in den Menschen. Wo endet der Mensch, wo beginnt die Chimäre? Ein fundamentaler Eingriff in die menschliche Natur.'
  },
  {
    id: 'infrared', name: 'Infrarot-Vision (PIT-Organ)', cost: 40, type: 'Sensorik',
    desc: 'Wärmebild-Wahrnehmung wie Grubenottern.',
    loreBio: 'Transgen-Integration von TRPA1-Rezeptoren (Grubenotter) in die Retina. Das Kind nimmt thermische Strahlung als visuelles Signal wahr. Risiko: Chronische Überstimulation.',
    lorePug: 'Militär, Geheimdienste und Jäger als Hauptinteressenten. Ein Kind, das Wärme sieht, wird zum lebenden Überwachungsinstrument.',
    loreRel: 'Schlangensinne im Menschen - ein biblischer Albtraum. Vermischung von Mensch und Reptil für taktische Vorteile ist für die meisten Theologen inakzeptabel.'
  },
  {
    id: 'regeneration', name: 'Axolotl-Regeneration (P21/LIN28)', cost: 50, type: 'Physis',
    desc: 'Gliedmaßen-Regeneration wie Axolotl.',
    loreBio: 'Reaktivierung embryonaler Regenerationsprogramme via P21-Suppression. Verlorene Finger, Gewebe oder Organe können nachwachsen. Krebsrisiko: Extrem erhöht.',
    lorePug: 'Der heilige Gral der Militärmedizin. Soldaten, die Gliedmaßen regenerieren. Aber auch: Organhandel wird obsolet, die Transplantationsmedizin kollabiert.',
    loreRel: 'Prometheus stahl den Göttern das Feuer, und seine Leber wuchs nach. Regeneration war das Privileg der Götter - der Mensch greift nach göttlicher Macht.'
  },
  {
    id: 'photosynthesis', name: 'Chloroplast-Haut (SYNTH-C)', cost: 55, type: 'Biologie',
    desc: 'Photosynthese in menschlichen Hautzellen.',
    loreBio: 'Integration von Chloroplasten-ähnlichen Organellen in die Melanozyten. Haut produziert bei Sonnenlicht Glucose (ca. 5% des Energiebedarfs). Haut wird leicht grünlich.',
    lorePug: 'Könnte Hungerkrisen lösen - aber nur für die, die es sich leisten. Eine grünhäutige Elite ernährt sich von Sonnenlicht, während andere hungern.',
    loreRel: 'Der Mensch wird zur Pflanze. Die Grenze zwischen Tier- und Pflanzenreich wird überschritten. Ein Affront gegen die natürliche Ordnung der Schöpfung.'
  },
  {
    id: 'magnetoreception', name: 'Magnetorezeption (CRY1-Mod)', cost: 30, type: 'Sensorik',
    desc: 'Erdmagnetfeld-Wahrnehmung wie Zugvögel.',
    loreBio: 'Modifiziertes Cryptochrom-1 in der Retina ermöglicht visuelle Wahrnehmung von Magnetfeldern. Das Kind "sieht" Norden als schwaches Overlay. Relativ risikoarm.',
    lorePug: 'Navigation ohne Technik. Militärischer Einsatz bei EMP-Szenarien. Philosophisch: Ein neuer Sinn verändert die gesamte Weltwahrnehmung.',
    loreRel: 'Der am wenigsten kontroverse Tier-zu-Mensch-Transfer. Dennoch: Jeder neue Sinn verändert das Bewusstsein auf unvorhersehbare Weise.'
  },
  {
    id: 'bone-density', name: 'Adamantium-Skelett (LRP5-Mod)', cost: 40, type: 'Physis',
    desc: 'Knochendichte 8x höher als normal.',
    loreBio: 'Mutation des LRP5-Gens erhöht Osteoblasten-Aktivität extrem. Knochen werden praktisch unzerbrechlich. Nachteil: 20-30kg zusätzliches Gewicht, Schwimmen fast unmöglich.',
    lorePug: 'Der "unverwüstliche Arbeiter" für Schwerindustrie und Militär. Das Kind wird zur lebenden Rüstung. Arbeitgeber bevorzugen LRP5-Modifizierte.',
    loreRel: 'Die natürliche Fragilität des Körpers - die Vorsicht und Mitgefühl lehrt - wird eliminiert. Was lernt ein unverwundbares Kind über Empathie?'
  }
];
// ── SENSORIK-MODS (4) ───────────────────────────────────────
const sensoryMods: ExoticMod[] = [
  {
    id: 'ultrahearing', name: 'Ultraschall-Gehör (Prestin-Mod)', cost: 25, type: 'Sensorik',
    desc: 'Hörbereich bis 100 kHz (normal: 20 kHz).',
    loreBio: 'Überexpression des Prestin-Proteins in den äußeren Haarzellen der Cochlea. Das Kind hört Fledermaus-Rufe, elektrische Leitungen und Ultraschall-Kommunikation.',
    lorePug: 'Einsatz in Qualitätskontrolle, Maschinendiagnose und Überwachung. Das Kind wird zum lebenden Abhörgerät. Geheimdienste finanzieren 60% der Forschung.',
    loreRel: 'Das Kind hört Dinge, die nicht für menschliche Ohren bestimmt sind. Philosophisch: Ist Ignoranz manchmal ein Schutz?'
  },
  {
    id: 'supertaste', name: 'Hyper-Gustation (TAS2R38+)', cost: 15, type: 'Sensorik',
    desc: 'Geschmacksrezeptoren-Dichte 10x erhöht.',
    loreBio: 'Massive Vermehrung der Geschmacksknospen und Überexpression von Bitterrezeptoren. Das Kind schmeckt Giftstoffe und Pestizide in Nanogramm-Konzentrationen.',
    lorePug: 'Einsatz als lebender Gifttester in Lebensmittelindustrie und Forensik. Aber: Normales Essen wird zur Qual, da alles extrem intensiv schmeckt.',
    loreRel: 'Ein zweischneidiges Schwert. Der verstärkte Sinn ist gleichzeitig Gabe und Fluch. Das Kind leidet an der Intensität seiner Wahrnehmung.'
  },
  {
    id: 'pain-null', name: 'Schmerzunempfindlichkeit (SCN9A-KO)', cost: 35, type: 'Sensorik',
    desc: 'Vollständige Deaktivierung des Schmerzempfindens.',
    loreBio: 'Knockout des SCN9A-Natriumkanals eliminiert nozizeptive Signalweiterleitung komplett. WARNUNG: Schwere Selbstverletzungen, da Gefahrensignale fehlen. Lebenserwartung: -30%.',
    lorePug: 'Militärs träumen von schmerzfreien Soldaten. Real: Kinder ohne Schmerz beißen sich die Zunge ab, brechen Knochen ohne es zu merken.',
    loreRel: 'Schmerz ist der ultimative Lehrmeister. Ihn zu entfernen erscheint barmherzig, ist aber grausam: Das Kind verliert den Schutz vor sich selbst.'
  },
  {
    id: 'proprioception', name: 'Hyper-Propriozeption (PIEZO2+)', cost: 20, type: 'Sensorik',
    desc: 'Perfekte Körperwahrnehmung im Raum.',
    loreBio: 'Überexpression des PIEZO2-Mechanorezeptors in Gelenken und Muskeln. Perfekte Balance, kann komplexe Bewegungen nach einmaligem Sehen replizieren.',
    lorePug: 'Tänzer, Chirurgen, Kampfsportler - perfekte Körperkontrolle als genetisches Produkt. Sportwettkämpfe werden zur Farce.',
    loreRel: 'Vergleichsweise unbedenklich, da bestehende Fähigkeit verstärkt wird. Dennoch: unfairer Vorteil im Wettbewerb.'
  }
];

// ── GEN-INTERAKTIONS-WARNUNGEN ──────────────────────────────
const geneInteractions: GeneWarning[] = [
  {
    condition: (s) => s.activeMods.includes('myostatin') && s.build === 'ecto',
    message: 'KONFLIKT: Myostatin-Inhibition inkompatibel mit ektomorphem Körperbau. Gewebe-Abstoßungsrisiko 80%.',
    severity: 'critical'
  },
  {
    condition: (s) => s.activeMods.includes('tetrachromacy') && s.activeMods.includes('infrared'),
    message: 'SENSORISCHE ÜBERLAST: Tetrachromatie + Infrarot-Vision überlasten den visuellen Cortex. Epilepsie-Risiko.',
    severity: 'critical'
  },
  {
    condition: (s) => s.activeMods.includes('pain-null') && s.activeMods.includes('myostatin'),
    message: 'GEFÄHRLICH: Schmerzfreiheit + Hypertrophie. Das Kind beschädigt den eigenen Körper ohne Warnsignal.',
    severity: 'critical'
  },
  {
    condition: (s) => s.activeMods.includes('bone-density') && s.build === 'ecto',
    message: 'BIOMECHANIK: Schweres Skelett auf schmalem Rahmen. Gelenkschäden wahrscheinlich.',
    severity: 'warning'
  },
  {
    condition: (s) => s.eyeColor.id === 'bioluminescent' && s.activeMods.includes('photosynthesis'),
    message: 'SYNERGIE: Biolumineszenz + Photosynthese-Haut nutzen ähnliche Protein-Pfade.',
    severity: 'info'
  },
  {
    condition: (s) => s.activeMods.includes('echolocation') && s.activeMods.includes('ultrahearing'),
    message: 'AKUSTISCHE SYNERGIE: Echolokalisation + Ultraschall-Gehör. Aber: Chronisches Tinnitus-Risiko.',
    severity: 'warning'
  },
  {
    condition: (s) => s.height > 200 && s.activeMods.includes('bone-density'),
    message: 'STATIK: Extreme Größe + dichtes Skelett = massive Herzbelastung. Kardiomyopathie-Risiko.',
    severity: 'warning'
  },
  {
    condition: (s) => s.activeMods.length >= 5,
    message: 'MULTI-MOD: 5+ aktive Modifikationen. Pleiotrope Wechselwirkungen unberechenbar. Off-Target-Mutationen wahrscheinlich.',
    severity: 'critical'
  }
];

// ── TAB-DEFINITIONEN ────────────────────────────────────────
const tabs: { id: TabId; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'pigment', label: 'Pigmente', icon: Fingerprint, color: '#00f0ff' },
  { id: 'iris', label: 'Iris', icon: Eye, color: '#00f0ff' },
  { id: 'hair', label: 'Haar', icon: Scissors, color: '#00f0ff' },
  { id: 'morpho', label: 'Morpho', icon: Ruler, color: '#00f0ff' },
  { id: 'mods', label: 'Mods', icon: Dna, color: '#ff00e5' },
  { id: 'sensory', label: 'Sensorik', icon: Waves, color: '#ff00e5' },
];

// ── BIOSAFETY-HELPER ────────────────────────────────────────
function getBiosafetyLevel(stability: number) {
  if (stability > 70) return { level: 'I', label: 'STANDARD', color: '#00ff88' };
  if (stability > 45) return { level: 'II', label: 'MODERAT', color: '#ffaa00' };
  if (stability > 20) return { level: 'III', label: 'GEFÄHRLICH', color: '#ff6600' };
  return { level: 'IV', label: 'KRITISCH', color: '#ff0000' };
}

export function BabyDesignerPhenotypePhase({ onNext }: { onNext: () => void }) {
  const { playSfx } = useAudio();

  // ── STATE ───────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TabId>('pigment');
  const [eumelanin, setEumelanin] = useState(60);
  const [pheomelanin, setPheomelanin] = useState(25);
  const [eyeColor, setEyeColor] = useState<EyeColor>(eyeColors[0]);
  const [hairType, setHairType] = useState<HairType>(hairTypes[0]);
  const [height, setHeight] = useState(175);
  const [build, setBuild] = useState<string>('meso');
  const [face, setFace] = useState<string>('oval');
  const [activeMods, setActiveMods] = useState<string[]>([]);
  const [activeLoreTab, setActiveLoreTab] = useState<'bio' | 'pug' | 'rel'>('bio');
  const [inspectedItem, setInspectedItem] = useState<LoreItem | null>(null);

  // ── DERIVED VALUES ──────────────────────────────────────
  const activeHeightRange = heightRanges.find(r => height >= r.min && height <= r.max) || heightRanges[1];

  const genomeStability = useMemo(() => {
    let stability = 100;
    stability -= eyeColor.cost;
    stability -= hairType.cost;
    stability -= activeHeightRange.cost;
    stability -= (buildOptions.find(b => b.id === build)?.cost || 0);
    stability -= (faceOptions.find(f => f.id === face)?.cost || 0);
    const allMods = [...exoticMods, ...sensoryMods];
    activeMods.forEach(modId => {
      const mod = allMods.find(m => m.id === modId);
      if (mod) stability -= mod.cost;
    });
    if (eumelanin < 10 && pheomelanin < 10) stability -= 15;
    if (eumelanin > 90 && pheomelanin > 90) stability -= 10;
    return Math.max(0, stability);
  }, [eyeColor, hairType, activeHeightRange, build, face, activeMods, eumelanin, pheomelanin]);

  const isCritical = genomeStability < 20;
  const biosafety = getBiosafetyLevel(genomeStability);

  const skinLightness = 90 - (eumelanin * 0.6);
  const skinSaturation = 20 + (pheomelanin * 0.5);
  const skinColor = `hsl(30, ${skinSaturation}%, ${skinLightness}%)`;
  const hairLightness = 80 - (eumelanin * 0.7);
  const hairSaturation = 10 + (pheomelanin * 0.8);
  const hairColor = `hsl(25, ${hairSaturation}%, ${hairLightness}%)`;

  const activeWarnings = useMemo(() => {
    const state: DesignerState = { activeMods, build, eyeColor, height };
    return geneInteractions.filter(w => w.condition(state));
  }, [activeMods, build, eyeColor, height]);

  // ── EVENT HANDLERS ──────────────────────────────────────
  const handleModToggle = (mod: ExoticMod) => {
    setActiveMods(prev =>
      prev.includes(mod.id) ? prev.filter(id => id !== mod.id) : [...prev, mod.id]
    );
    setInspectedItem(mod);
  };
  const handleEyeSelect = (eye: EyeColor) => {
    setEyeColor(eye);
    setInspectedItem(eye);
  };
  const handleHairSelect = (hair: HairType) => {
    setHairType(hair);
    setInspectedItem(hair);
  };
  const handleBuildSelect = (opt: BuildOption) => {
    setBuild(opt.id);
    setInspectedItem(opt);
  };
  const handleFaceSelect = (opt: FaceOption) => {
    setFace(opt.id);
    setInspectedItem(opt);
  };
  const handleHeightChange = (h: number) => {
    setHeight(h);
    const range = heightRanges.find(r => h >= r.min && h <= r.max) || heightRanges[1];
    setInspectedItem(range);
  };
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 p-2 md:p-4"
    >
      <RolePopup
        title="Phänotyp Design"
        description="Designen Sie das vollständige Erscheinungsbild: Pigmente, Iris, Haartyp, Körperbau und exotische Modifikationen. Jede Änderung kostet Genom-Stabilität. Achten Sie auf Gen-Interaktions-Warnungen!"
      />
      {/* ── LEFT PANEL: INKUBATOR ──────────────────────────── */}
      <Card className={`w-full lg:w-5/12 glass flex flex-col relative overflow-hidden lg:h-full transition-colors duration-500 shrink-0 ${isCritical ? 'border-[#ff0000]/50 shadow-[0_0_30px_rgba(255,0,0,0.2)]' : 'border-[#00f0ff]/30'}`}>
        <div className="absolute inset-0 bg-[#050A15] z-0" />
        <div className={`absolute inset-0 z-0 opacity-10 pointer-events-none transition-colors duration-500 ${isCritical ? 'bg-[radial-gradient(circle_at_center,#ff0000_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,#00f0ff_0%,transparent_70%)]'}`} />
        {isCritical && <div className="absolute inset-0 z-0 bg-[#ff0000]/10 animate-pulse pointer-events-none" />}

        <CardHeader className="border-b border-slate-700/50 bg-slate-900/80 z-10 relative py-3 md:py-4">
          <div className="flex justify-between items-center">
            <CardTitle className={`text-base md:text-xl font-black tracking-widest flex items-center gap-2 ${isCritical ? 'text-[#ff0000]' : 'text-white'}`}>
              {isCritical ? <AlertTriangle className="animate-pulse" /> : <Dna className="text-[#00f0ff]" />}
              INKUBATOR V.9
            </CardTitle>
            <div className="px-2 py-1 rounded text-[9px] font-bold font-mono border" style={{ color: biosafety.color, borderColor: `${biosafety.color}50`, backgroundColor: `${biosafety.color}15` }}>
              BSL-{biosafety.level}: {biosafety.label}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col items-center justify-between relative p-4 md:p-6 overflow-hidden">
          {/* ── 3D BABY MODEL (SVG) ─────────────────────────── */}
          <div className="relative w-full max-w-[320px] aspect-[3/4] flex items-center justify-center z-10">

            {/* DNA Helix Orbit Ring 1 */}
            <motion.div animate={{ rotateX: 360, rotateY: 180 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className={`absolute inset-[5%] border rounded-full transition-colors duration-500 ${isCritical ? 'border-[#ff0000]/30' : 'border-[#00f0ff]/20'}`} style={{ transformStyle: 'preserve-3d' }} />
            {/* DNA Helix Orbit Ring 2 */}
            <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className={`absolute inset-[-2%] border-2 border-dashed rounded-full transition-colors duration-500 ${isCritical ? 'border-[#ff0000]/15' : 'border-[#ff00e5]/15'}`} />
            {/* DNA Helix Orbit Ring 3 */}
            <motion.div animate={{ rotateY: 360, rotateZ: 90 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className={`absolute inset-[10%] border border-dotted rounded-full transition-colors duration-500 ${isCritical ? 'border-[#ff0000]/10' : 'border-[#00f0ff]/10'}`} style={{ transformStyle: 'preserve-3d' }} />

            {/* Ambient Glow */}
            <div className={`absolute bottom-[5%] w-[50%] h-[8%] blur-[25px] rounded-full transition-colors duration-500 ${isCritical ? 'bg-[#ff0000]' : 'bg-[#00f0ff]'}`} />

            {/* SVG Baby Model */}
            <svg viewBox="0 0 300 400" className="w-[75%] h-[90%] drop-shadow-[0_0_30px_rgba(0,240,255,0.15)]" style={{ filter: activeMods.includes('photosynthesis') ? 'hue-rotate(40deg) saturate(1.2)' : undefined }}>
              <defs>
                <radialGradient id="skinGrad" cx="45%" cy="40%">
                  <stop offset="0%" stopColor={skinColor} stopOpacity="1" />
                  <stop offset="100%" stopColor={skinColor} stopOpacity="0.85" />
                </radialGradient>
                <radialGradient id="cheekGrad">
                  <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ff6b6b" stopOpacity="0" />
                </radialGradient>
                {hairType.pattern === 'synthetic' && (
                  <linearGradient id="synthHair" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={hairColor} />
                    <stop offset="50%" stopColor="#c0c0c0" stopOpacity="0.6" />
                    <stop offset="100%" stopColor={hairColor} />
                  </linearGradient>
                )}
                {(eyeColor.id === 'bioluminescent' || eyeColor.id === 'gold') && (
                  <radialGradient id="eyeGlow">
                    <stop offset="0%" stopColor={eyeColor.color} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={eyeColor.color} stopOpacity="0" />
                  </radialGradient>
                )}
              </defs>

              {/* ── HEAD ──────────────────────────────────────── */}
              <ellipse cx="150" cy={face === 'narrow' ? '135' : '140'}
                rx={face === 'narrow' ? 62 : face === 'angular' ? 74 : 70}
                ry={face === 'narrow' ? 90 : face === 'angular' ? 82 : 85}
                fill="url(#skinGrad)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Jaw line for angular face */}
              {face === 'angular' && (
                <path d="M95,175 Q150,230 205,175" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
              )}
              {/* Golden ratio guides for symmetric face */}
              {face === 'symmetric' && (
                <>
                  <line x1="150" y1="55" x2="150" y2="225" stroke="#ffd700" strokeWidth="0.3" opacity="0.3" />
                  <line x1="80" y1="140" x2="220" y2="140" stroke="#ffd700" strokeWidth="0.3" opacity="0.3" />
                </>
              )}

              {/* ── EARS ─────────────────────────────────────── */}
              <ellipse cx={face === 'narrow' ? 86 : 78} cy="150" rx="10" ry="16" fill="url(#skinGrad)" />
              <ellipse cx={face === 'narrow' ? 214 : 222} cy="150" rx="10" ry="16" fill="url(#skinGrad)" />
              <ellipse cx={face === 'narrow' ? 88 : 80} cy="150" rx="5" ry="10" fill="rgba(0,0,0,0.08)" />
              <ellipse cx={face === 'narrow' ? 212 : 220} cy="150" rx="5" ry="10" fill="rgba(0,0,0,0.08)" />

              {/* ── HAIR ─────────────────────────────────────── */}
              {hairType.pattern === 'straight' && (
                <path d="M78,100 Q85,50 150,40 Q215,50 222,100 L222,125 Q150,95 78,125 Z"
                  fill={hairColor} opacity="0.95" />
              )}
              {hairType.pattern === 'wavy' && (
                <path d="M78,100 Q85,50 150,40 Q215,50 222,100 L222,125 Q200,110 180,120 Q160,130 140,118 Q120,108 100,120 Q88,128 78,125 Z"
                  fill={hairColor} opacity="0.95" />
              )}
              {hairType.pattern === 'curly' && (
                <g>
                  <path d="M78,100 Q85,50 150,40 Q215,50 222,100 L222,115 Q150,85 78,115 Z" fill={hairColor} opacity="0.95" />
                  {[85,100,115,130,145,160,175,190,205].map((x, i) => (
                    <circle key={i} cx={x} cy={115 + (i % 2) * 6} r={6 + (i % 3)} fill={hairColor} opacity="0.9" />
                  ))}
                </g>
              )}
              {hairType.pattern === 'coily' && (
                <g>
                  <path d="M78,100 Q85,50 150,40 Q215,50 222,100 L222,112 Q150,85 78,112 Z" fill={hairColor} opacity="0.95" />
                  {Array.from({ length: 20 }).map((_, i) => (
                    <circle key={i} cx={85 + (i % 7) * 20 + (Math.floor(i / 7) % 2) * 10} cy={105 + Math.floor(i / 7) * 10} r={4 + (i % 3)} fill={hairColor} opacity="0.85" />
                  ))}
                </g>
              )}
              {hairType.pattern === 'synthetic' && (
                <g>
                  <path d="M78,100 Q85,50 150,40 Q215,50 222,100 L222,130 Q150,100 78,130 Z"
                    fill="url(#synthHair)" opacity="0.95" />
                  {[90,110,130,150,170,190,210].map((x, i) => (
                    <line key={i} x1={x} y1={60 + i * 2} x2={x + (i % 2 ? 3 : -3)} y2={125} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  ))}
                </g>
              )}

              {/* ── EYES ─────────────────────────────────────── */}
              {/* Bioluminescent / Gold glow behind eyes */}
              {(eyeColor.id === 'bioluminescent' || eyeColor.id === 'gold') && (
                <>
                  <circle cx="120" cy="155" r="22" fill="url(#eyeGlow)" />
                  <circle cx="180" cy="155" r="22" fill="url(#eyeGlow)" />
                </>
              )}

              {/* Eye whites */}
              <ellipse cx="120" cy="155" rx="18" ry="13" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
              <ellipse cx="180" cy="155" rx="18" ry="13" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />

              {/* Iris - left eye (heterochromia: brown) */}
              <circle cx="120" cy="155" r="9" fill={eyeColor.id === 'heterochromia' ? '#4b3621' : eyeColor.color} />
              <circle cx="120" cy="155" r="8" fill={eyeColor.id === 'heterochromia' ? '#4b3621' : eyeColor.color} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
              {/* Iris pattern ring */}
              <circle cx="120" cy="155" r="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

              {/* Iris - right eye */}
              <circle cx="180" cy="155" r="9" fill={eyeColor.color} />
              <circle cx="180" cy="155" r="8" fill={eyeColor.color} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
              <circle cx="180" cy="155" r="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

              {/* Pupils */}
              <circle cx="120" cy="155" r="4" fill="#0a0a0a" />
              <circle cx="180" cy="155" r="4" fill="#0a0a0a" />

              {/* Highlights */}
              <circle cx="115" cy="151" r="2.5" fill="white" opacity="0.85" />
              <circle cx="175" cy="151" r="2.5" fill="white" opacity="0.85" />
              <circle cx="123" cy="158" r="1.2" fill="white" opacity="0.4" />
              <circle cx="183" cy="158" r="1.2" fill="white" opacity="0.4" />

              {/* Eyebrows */}
              <path d="M100,135 Q120,128 140,133" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
              <path d="M160,133 Q180,128 200,135" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

              {/* ── NOSE ──────────────────────────────────────── */}
              <path d="M146,168 Q150,178 154,168" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="143" cy="172" r="2.5" fill="rgba(0,0,0,0.06)" />
              <circle cx="157" cy="172" r="2.5" fill="rgba(0,0,0,0.06)" />

              {/* ── MOUTH ─────────────────────────────────────── */}
              <path d="M128,195 Q140,205 150,203 Q160,205 172,195" fill="none" stroke="rgba(120,60,60,0.4)" strokeWidth="2" strokeLinecap="round" />
              <path d="M135,195 Q150,200 165,195" fill="rgba(180,80,80,0.15)" />

              {/* ── CHEEKS ────────────────────────────────────── */}
              <circle cx="100" cy="175" r="14" fill="url(#cheekGrad)" />
              <circle cx="200" cy="175" r="14" fill="url(#cheekGrad)" />

              {/* ── NECK ──────────────────────────────────────── */}
              <rect x="135" y="220" width="30" height="25" rx="8" fill="url(#skinGrad)" />

              {/* ── BODY SILHOUETTE ────────────────────────────── */}
              {build === 'ecto' && (
                <path d="M115,245 Q150,238 185,245 L180,380 Q150,385 120,380 Z" fill="url(#skinGrad)" opacity="0.9" />
              )}
              {build === 'meso' && (
                <path d="M100,245 Q150,232 200,245 L190,380 Q150,388 110,380 Z" fill="url(#skinGrad)" opacity="0.9" />
              )}
              {build === 'endo' && (
                <path d="M95,245 Q150,232 205,245 L200,380 Q150,390 100,380 Z" fill="url(#skinGrad)" opacity="0.9" />
              )}
              {build === 'enhanced' && (
                <g>
                  <path d="M85,245 Q150,225 215,245 L200,380 Q150,390 100,380 Z" fill="url(#skinGrad)" opacity="0.9" />
                  <path d="M85,245 Q150,225 215,245 L200,380 Q150,390 100,380 Z" fill="none" stroke="#ff00e5" strokeWidth="0.5" opacity="0.4" />
                </g>
              )}

              {/* ── MOD EFFECTS ────────────────────────────────── */}
              {activeMods.includes('photosynthesis') && (
                <rect x="85" y="245" width="130" height="135" rx="15" fill="#22c55e" opacity="0.08" />
              )}
              {activeMods.includes('myostatin') && (
                <>
                  <ellipse cx="115" cy="280" rx="18" ry="12" fill="rgba(0,0,0,0.15)" />
                  <ellipse cx="185" cy="280" rx="18" ry="12" fill="rgba(0,0,0,0.15)" />
                </>
              )}
              {activeMods.includes('bone-density') && (
                <path d="M150,245 L150,380" stroke="rgba(255,255,255,0.1)" strokeWidth="3" strokeDasharray="4 6" />
              )}
              {activeMods.includes('dec2') && (
                <circle cx="150" cy="110" r="25" fill="#00f0ff" opacity="0.08">
                  <animate attributeName="opacity" values="0.08;0.2;0.08" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              {activeMods.includes('regeneration') && (
                <circle cx="150" cy="300" r="40" fill="#22d3ee" opacity="0.06">
                  <animate attributeName="r" values="35;45;35" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
            </svg>

            {/* ── STAT LABELS (floating) ───────────────────── */}
            <div className="absolute right-0 md:right-[-10%] top-[8%] flex flex-col gap-1.5">
              <div className="text-[7px] md:text-[9px] font-mono text-[#00f0ff] bg-slate-900/90 px-1.5 py-0.5 rounded border border-[#00f0ff]/30 shadow-lg">EU: {eumelanin}%</div>
              <div className="text-[7px] md:text-[9px] font-mono text-[#ffaa00] bg-slate-900/90 px-1.5 py-0.5 rounded border border-[#ffaa00]/30 shadow-lg">PH: {pheomelanin}%</div>
              <div className="text-[7px] md:text-[9px] font-mono text-slate-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-600/50 shadow-lg">{height}cm</div>
            </div>
          </div>

          {/* ── GENE WARNINGS ──────────────────────────────── */}
          <AnimatePresence>
            {activeWarnings.length > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="w-full space-y-1.5 mt-2 z-10 relative">
                {activeWarnings.slice(0, 3).map((warning, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className={`text-[8px] md:text-[9px] font-mono p-1.5 md:p-2 rounded border flex items-start gap-1.5 ${
                      warning.severity === 'critical' ? 'bg-red-950/80 border-red-500/50 text-red-400' :
                      warning.severity === 'warning' ? 'bg-amber-950/80 border-amber-500/50 text-amber-400' :
                      'bg-blue-950/80 border-blue-500/50 text-blue-400'
                    }`}>
                    {warning.severity === 'critical' && <AlertTriangle size={10} className="shrink-0 mt-0.5" />}
                    {warning.message}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── STABILITY BAR ──────────────────────────────── */}
          <div className="w-full mt-auto pt-3 md:pt-4 border-t border-slate-700/50 relative z-10">
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
              <motion.div animate={{ width: `${genomeStability}%` }} transition={{ type: "spring", bounce: 0.3 }}
                className={`h-full rounded-full ${genomeStability > 60 ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]' : genomeStability >= 25 ? 'bg-[#ffaa00] shadow-[0_0_10px_#ffaa00]' : 'bg-[#ff0000] shadow-[0_0_15px_#ff0000]'}`} />
              <div className="absolute top-0 left-[20%] w-0.5 h-full bg-red-500/60 z-10" />
            </div>

            {/* Active Mods Summary */}
            {activeMods.length > 0 && (
              <div className="mt-2">
                <div className="text-[7px] md:text-[8px] text-slate-500 font-mono uppercase mb-1">Aktive Mods ({activeMods.length})</div>
                <div className="flex flex-wrap gap-1">
                  {activeMods.map(modId => {
                    const mod = [...exoticMods, ...sensoryMods].find(m => m.id === modId);
                    return mod ? (
                      <span key={modId} className="text-[6px] md:text-[7px] bg-[#ff00e5]/15 border border-[#ff00e5]/30 text-[#ff00e5] px-1.5 py-0.5 rounded font-mono">
                        {mod.name.split('(')[0].trim()}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="flex-1 flex flex-col gap-4 h-full relative z-20">
         <Card className="flex-1 glass border-[#00f0ff]/20 flex flex-col relative overflow-hidden min-h-[300px]">
            <div className="flex w-full bg-slate-900/80 border-b border-slate-700/50 overflow-x-auto custom-scrollbar">
               {tabs.map(tab => {
                 const Icon = tab.icon;
                 const isActive = activeTab === tab.id;
                 return (
                   <button
                     key={tab.id}
                     onClick={() => { playSfx('click'); setActiveTab(tab.id); }}
                     className={`flex items-center justify-center gap-1.5 whitespace-nowrap px-3 md:px-4 py-3 md:py-4 text-[9px] md:text-[11px] font-bold tracking-widest uppercase border-b-2 transition-all duration-300 min-w-0 flex-1 ${
                       isActive
                         ? `border-[${tab.color}] text-[${tab.color}] bg-[${tab.color}]/5`
                         : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                     }`}
                     style={isActive ? { borderColor: tab.color, color: tab.color, backgroundColor: `${tab.color}10` } : undefined}
                   >
                     <Icon size={14} />
                     <span className="hidden sm:inline">{tab.label}</span>
                   </button>
                 );
               })}
            </div>
            <CardContent className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-20">
               <AnimatePresence mode="wait">
                  {activeTab === 'pigment' && (
                     <motion.div key="pigment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 md:space-y-6">
                        <div className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-3 md:p-4 rounded-xl flex items-start gap-3">
                           <Microscope className="text-[#00f0ff] shrink-0" size={20} />
                           <p className="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed">
                              Passen Sie die Melanozyten-Aktivität an. Extreme Abweichungen vom natürlichen Gleichgewicht kosten Genom-Stabilität.
                           </p>
                        </div>
                        {/* Skin Preview Strip */}
                        <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700">
                           <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Hautton-Vorschau</div>
                           <div className="flex gap-1 h-8 md:h-10 rounded-lg overflow-hidden border border-slate-600/50">
                              {Array.from({ length: 12 }).map((_, i) => {
                                const l = 90 - (eumelanin * 0.6) + (i - 6) * 3;
                                const s = 20 + (pheomelanin * 0.5) + (i - 6) * 2;
                                return <div key={i} className={`flex-1 transition-colors duration-300 ${i === 6 ? 'ring-2 ring-[#00f0ff] ring-offset-1 ring-offset-slate-900 scale-y-110' : ''}`} style={{ backgroundColor: `hsl(30, ${Math.max(0, Math.min(100, s))}%, ${Math.max(5, Math.min(95, l))}%)` }} />;
                              })}
                           </div>
                           <div className="flex justify-between mt-2 text-[7px] md:text-[8px] font-mono text-slate-600">
                              <span>Heller</span>
                              <span className="text-[#00f0ff]">Aktuell</span>
                              <span>Dunkler</span>
                           </div>
                        </div>
                        <div className="space-y-3 bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700">
                           <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                              <span className="text-white">Eumelanin (Dunkelpigment)</span>
                              <span className="text-[#00f0ff] font-mono text-base md:text-lg">{eumelanin}%</span>
                           </div>
                           <div className="flex items-center gap-2 md:gap-4">
                              <Button variant="outline" size="icon" onClick={() => { playSfx('click'); setEumelanin(e => Math.max(0, e - 5)) }} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#00f0ff]/20 active:border-[#00f0ff]"><Minus /></Button>
                              <input type="range" min="0" max="100" value={eumelanin} onChange={(e) => setEumelanin(Number(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none accent-[#00f0ff]" />
                              <Button variant="outline" size="icon" onClick={() => { playSfx('click'); setEumelanin(e => Math.min(100, e + 5)) }} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#00f0ff]/20 active:border-[#00f0ff]"><Plus /></Button>
                           </div>
                           <p className="text-[8px] md:text-[9px] font-mono text-slate-500">Braun-schwarzes Melanin. Bestimmt die Grundverdunklung der Haut.</p>
                        </div>
                        <div className="space-y-3 bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700">
                           <div className="flex justify-between items-center text-xs md:text-sm font-bold">
                              <span className="text-white">Phäomelanin (Hell/Rotpigment)</span>
                              <span className="text-[#ffaa00] font-mono text-base md:text-lg">{pheomelanin}%</span>
                           </div>
                           <div className="flex items-center gap-2 md:gap-4">
                              <Button variant="outline" size="icon" onClick={() => { playSfx('click'); setPheomelanin(e => Math.max(0, e - 5)) }} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#ffaa00]/20 active:border-[#ffaa00]"><Minus /></Button>
                              <input type="range" min="0" max="100" value={pheomelanin} onChange={(e) => setPheomelanin(Number(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none accent-[#ffaa00]" />
                              <Button variant="outline" size="icon" onClick={() => { playSfx('click'); setPheomelanin(e => Math.min(100, e + 5)) }} className="w-10 h-10 md:w-12 md:h-12 shrink-0 border-slate-600 active:bg-[#ffaa00]/20 active:border-[#ffaa00]"><Plus /></Button>
                           </div>
                           <p className="text-[8px] md:text-[9px] font-mono text-slate-500">Gelb-rötliches Melanin. Beeinflusst Wärme und Rötung des Hauttons.</p>
                        </div>
                        {/* Stability cost warning */}
                        {(eumelanin < 10 && pheomelanin < 10) && (
                          <div className="bg-amber-950/50 border border-amber-500/30 p-2 md:p-3 rounded-lg text-[9px] md:text-[10px] font-mono text-amber-400 flex items-center gap-2">
                            <AlertTriangle size={14} className="shrink-0" />
                            Albinismus-Bereich. Genom-Stabilität: -15%
                          </div>
                        )}
                        {(eumelanin > 90 && pheomelanin > 90) && (
                          <div className="bg-amber-950/50 border border-amber-500/30 p-2 md:p-3 rounded-lg text-[9px] md:text-[10px] font-mono text-amber-400 flex items-center gap-2">
                            <AlertTriangle size={14} className="shrink-0" />
                            Hyperpigmentierung. Genom-Stabilität: -10%
                          </div>
                        )}
                     </motion.div>
                  )}
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
                  {activeTab === 'hair' && (
                     <motion.div key="hair" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-3 md:p-4 rounded-xl flex items-start gap-3">
                           <Scissors className="text-[#00f0ff] shrink-0" size={20} />
                           <p className="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed">
                              Haarstruktur wird durch Follikelform bestimmt. Die CRISPR-Modifikation verändert Keratinproduktion und Disulfidbrücken-Verteilung.
                           </p>
                        </div>
                        {/* Hair color preview */}
                        <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700">
                           <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Haarfarbe (abgeleitet von Melanin)</div>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-600" style={{ backgroundColor: hairColor }} />
                              <div className="flex-1">
                                 <div className="text-[10px] md:text-xs text-slate-300 font-mono">EU: {eumelanin}% / PH: {pheomelanin}%</div>
                                 <div className="text-[8px] md:text-[9px] text-slate-500 font-mono mt-0.5">Haarfarbe leitet sich automatisch von Ihren Pigment-Einstellungen ab.</div>
                              </div>
                           </div>
                        </div>
                        {/* Hair type cards */}
                        <div className="grid grid-cols-1 gap-3">
                           {hairTypes.map(hair => {
                              const isSelected = hairType.id === hair.id;
                              return (
                                 <button
                                    key={hair.id}
                                    onClick={() => { playSfx('click'); handleHairSelect(hair); }}
                                    className={`p-3 md:p-4 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 md:gap-4 ${
                                       isSelected
                                         ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                                         : 'bg-slate-900/50 border-slate-700 text-slate-400 active:bg-slate-800'
                                    }`}
                                 >
                                    {/* Hair type visual indicator */}
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center shrink-0 overflow-hidden">
                                       <svg viewBox="0 0 40 40" className="w-8 h-8">
                                          {hair.pattern === 'straight' && <path d="M10,8 L10,35 M16,8 L16,35 M22,8 L22,35 M28,8 L28,35" stroke={hairColor} strokeWidth="2.5" fill="none" />}
                                          {hair.pattern === 'wavy' && <path d="M10,8 Q16,20 10,35 M18,8 Q24,20 18,35 M26,8 Q32,20 26,35" stroke={hairColor} strokeWidth="2.5" fill="none" />}
                                          {hair.pattern === 'curly' && <path d="M12,8 Q8,15 14,18 Q20,21 14,28 Q8,35 14,38 M24,8 Q20,15 26,18 Q32,21 26,28 Q20,35 26,38" stroke={hairColor} strokeWidth="2.5" fill="none" />}
                                          {hair.pattern === 'coily' && <>{[12,20,28].map((x,i) => <circle key={i} cx={x} cy="12" r="4" fill={hairColor} />) }{[16,24].map((x,i) => <circle key={i} cx={x} cy="22" r="4" fill={hairColor} />) }{[12,20,28].map((x,i) => <circle key={i} cx={x} cy="32" r="4" fill={hairColor} />)}</>}
                                          {hair.pattern === 'synthetic' && <><rect x="8" y="6" width="24" height="30" rx="3" fill={hairColor} opacity="0.5" /><line x1="12" y1="6" x2="12" y2="36" stroke="rgba(255,255,255,0.4)" strokeWidth="1" /><line x1="20" y1="6" x2="20" y2="36" stroke="rgba(255,255,255,0.4)" strokeWidth="1" /><line x1="28" y1="6" x2="28" y2="36" stroke="rgba(255,255,255,0.4)" strokeWidth="1" /></>}
                                       </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                       <h4 className={`font-bold text-xs md:text-sm ${isSelected ? 'text-white' : ''}`}>{hair.name}</h4>
                                       <p className="text-[9px] md:text-[10px] font-mono text-slate-500 mt-0.5">{hair.desc}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                       <div className={`text-[9px] md:text-[10px] font-mono font-bold ${hair.cost > 0 ? 'text-[#ffaa00]' : 'text-slate-600'}`}>
                                          {hair.cost > 0 ? `-${hair.cost}%` : 'FREI'}
                                       </div>
                                    </div>
                                 </button>
                              );
                           })}
                        </div>
                     </motion.div>
                  )}
                  {activeTab === 'morpho' && (
                     <motion.div key="morpho" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                        <div className="bg-[#00f0ff]/10 border border-[#00f0ff]/30 p-3 md:p-4 rounded-xl flex items-start gap-3">
                           <Ruler className="text-[#00f0ff] shrink-0" size={20} />
                           <p className="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed">
                              Körperbau-Modifikationen verändern Wachstumsfaktoren (GH/IGF-1), Myostatin-Expression und kraniofaziale Genregulation.
                           </p>
                        </div>
                        {/* Height Slider */}
                        <div className="bg-slate-900/50 p-3 md:p-4 rounded-xl border border-slate-700 space-y-3">
                           <div className="flex justify-between items-center">
                              <span className="text-xs md:text-sm font-bold text-white flex items-center gap-2"><Ruler size={14} className="text-[#00f0ff]" /> Zielhöhe</span>
                              <span className="text-lg md:text-2xl font-black font-mono text-[#00f0ff]">{height}<span className="text-xs text-slate-500">cm</span></span>
                           </div>
                           <input type="range" min="150" max="210" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} className="w-full h-3 bg-slate-800 rounded-lg appearance-none accent-[#00f0ff]" />
                           <div className="flex justify-between text-[7px] md:text-[8px] font-mono text-slate-600">
                              <span>150cm</span>
                              <span className="text-[#00f0ff]">{activeHeightRange.name}</span>
                              <span>210cm</span>
                           </div>
                           <div className="flex justify-between text-[8px] md:text-[9px] font-mono">
                              <span className="text-slate-500">{activeHeightRange.desc}</span>
                              <span className={activeHeightRange.cost > 0 ? 'text-[#ffaa00]' : 'text-slate-600'}>{activeHeightRange.cost > 0 ? `-${activeHeightRange.cost}%` : 'FREI'}</span>
                           </div>
                        </div>
                        {/* Build Options */}
                        <div className="space-y-2">
                           <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2"><User size={14} /> Körperbau</h3>
                           <div className="grid grid-cols-2 gap-2 md:gap-3">
                              {buildOptions.map(opt => {
                                 const isSelected = build === opt.id;
                                 return (
                                    <button
                                       key={opt.id}
                                       onClick={() => { playSfx('click'); handleBuildSelect(opt); }}
                                       className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                                          isSelected
                                            ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                                            : 'bg-slate-900/50 border-slate-700 text-slate-400 active:bg-slate-800'
                                       }`}
                                    >
                                       <h4 className={`font-bold text-[10px] md:text-xs ${isSelected ? 'text-white' : ''}`}>{opt.name.split('(')[0].trim()}</h4>
                                       <p className="text-[8px] md:text-[9px] font-mono text-slate-500 mt-1">{opt.desc}</p>
                                       <div className={`text-[8px] md:text-[9px] font-mono mt-1.5 ${opt.cost > 0 ? 'text-[#ffaa00]' : 'text-slate-600'}`}>
                                          {opt.cost > 0 ? `Stabilität: -${opt.cost}%` : 'FREI'}
                                       </div>
                                    </button>
                                 );
                              })}
                           </div>
                        </div>
                        {/* Face Options */}
                        <div className="space-y-2">
                           <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-slate-400 flex items-center gap-2"><Hexagon size={14} /> Gesichtsstruktur</h3>
                           <div className="grid grid-cols-2 gap-2 md:gap-3">
                              {faceOptions.map(opt => {
                                 const isSelected = face === opt.id;
                                 return (
                                    <button
                                       key={opt.id}
                                       onClick={() => { playSfx('click'); handleFaceSelect(opt); }}
                                       className={`p-3 rounded-xl border text-left transition-all duration-300 ${
                                          isSelected
                                            ? 'bg-slate-800 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                                            : 'bg-slate-900/50 border-slate-700 text-slate-400 active:bg-slate-800'
                                       }`}
                                    >
                                       <h4 className={`font-bold text-[10px] md:text-xs ${isSelected ? 'text-white' : ''}`}>{opt.name.split('(')[0].trim()}</h4>
                                       <p className="text-[8px] md:text-[9px] font-mono text-slate-500 mt-1">{opt.desc}</p>
                                       <div className={`text-[8px] md:text-[9px] font-mono mt-1.5 ${opt.cost > 0 ? 'text-[#ffaa00]' : 'text-slate-600'}`}>
                                          {opt.cost > 0 ? `Stabilität: -${opt.cost}%` : 'FREI'}
                                       </div>
                                    </button>
                                 );
                              })}
                           </div>
                        </div>
                     </motion.div>
                  )}
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
                                       onClick={() => { playSfx('click'); handleModToggle(mod) }}
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
                  {activeTab === 'sensory' && (
                     <motion.div key="sensory" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div className="bg-[#ff00e5]/10 border border-[#ff00e5]/30 p-3 md:p-4 rounded-xl flex items-start gap-3 mb-2">
                           <Ear className="text-[#ff00e5] shrink-0" size={20} />
                           <p className="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed">
                              <strong className="text-[#ff00e5]">SENSORIK-KLASSE:</strong> Modifikationen der menschlichen Sinnesorgane. Diese Eingriffe verändern die neurologische Grundarchitektur.
                           </p>
                        </div>
                        {sensoryMods.map(mod => {
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
                                       onClick={() => { playSfx('click'); handleModToggle(mod) }}
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
                           );
                        })}
                     </motion.div>
                  )}
               </AnimatePresence>
            </CardContent>
         </Card>
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
                           <p className="text-center text-[10px] md:text-xs">Wählen Sie ein Merkmal oder tippen Sie auf &quot;Akten lesen&quot; bei einer Modifikation, um die interdisziplinäre Lore aus Biologie, Politik und Ethik zu laden.</p>
                        </div>
                     )}
                  </motion.div>
               </AnimatePresence>
            </CardContent>
         </Card>
      </div>
      <div className="fixed bottom-2 right-2 md:bottom-6 md:right-6 z-50">
         <Button 
            variant="sci-fi" 
            size="lg"
            onClick={() => { playSfx('click'); onNext(); }}
            disabled={isCritical}
            className={`px-4 py-4 md:px-8 md:py-6 text-[10px] md:text-sm font-black tracking-widest ${isCritical ? 'opacity-50 cursor-not-allowed bg-red-950 border-red-500 text-red-500' : 'shadow-[0_0_30px_rgba(0,240,255,0.4)]'}`}
         >
            {isCritical ? 'GENOM KRITISCH' : 'SYNTHESE ABSCHLIESSEN'} <Zap className="ml-2 w-4 h-4 md:w-5 md:h-5" />
         </Button>
      </div>
    </motion.div>
  );
}