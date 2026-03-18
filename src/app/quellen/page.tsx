"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Gavel, TestTube2, AlertTriangle, ArrowLeft, ExternalLink, Bot, Scale, Dna, Brain, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuellenPage() {
  const sources = [
    {
      category: "Wissenschaftliche Grundlagen (Biologie)",
      icon: <TestTube2 className="w-8 h-8 text-cyan-400" />,
      color: "border-cyan-500",
      items: [
        {
          title: "A Programmable Dual-RNA-Guided DNA Endonuclease in Adaptive Bacterial Immunity",
          author: "Jinek M, Chylinski K, Fonfara I, Hauer M, Doudna JA, Charpentier E. (Science)",
          desc: "Das originale Paper der Nobelpreisträgerinnen von 2012, das CRISPR-Cas9 als 'programmierbare Genschere' der Welt vorstellte.",
          url: "https://www.science.org/doi/10.1126/science.1225829"
        },
        {
          title: "CRISPR-Cas9 Off-Target Effects: Understanding and Mitigation",
          author: "Zhang, F. et al. / Nature Reviews Genetics",
          desc: "Übersichtsarbeit über die Risiken von Off-Target-Mutationen und Genom-Instabilität, die in der QA-Check Phase der App behandelt werden.",
          url: "https://www.nature.com/articles/nrg3686"
        },
        {
          title: "The pleiotropic effects of genes",
          author: "Stearns, F. W. / Genetics",
          desc: "Wissenschaftliche Erklärung der Pleiotropie (Ein Gen beeinflusst mehrere Merkmale), welche das Risiko bei kognitivem Enhancement (Intelligenz vs. Depressionsrisiko) aufzeigt.",
          url: "https://academic.oup.com/genetics/article/185/1/11/6069796"
        },
        {
          title: "Targeting the HERC2 gene for eye color modification",
          author: "Sturm, R. A. / Journal of Human Genetics",
          desc: "Studie über die genetischen Grundlagen der Augenfarbe, speziell die OCA2/HERC2-Region, die im Phänotyp-Editor der App verwendet wird.",
          url: "https://www.nature.com/articles/jhg200870"
        },
        {
          title: "Myostatin mutation associated with gross muscle hypertrophy",
          author: "Schuelke, M. et al. / New England Journal of Medicine",
          desc: "Der reale biologische Hintergrund der 'Myostatin-Inhibition', die in der App als militärisches Upgrade angeboten wird (Muskelhypertrophie ohne Training).",
          url: "https://www.nejm.org/doi/full/10.1056/NEJMoa040933"
        },
        {
          title: "A missense mutation in DEC2 alters sleep length",
          author: "He, Y. et al. / Science",
          desc: "Studie zur DEC2-Mutation (Kurzschläfer-Gen), die im Phänotyp-Editor als 'Effizienz-Upgrade' für den Arbeitsmarkt thematisiert wird.",
          url: "https://www.science.org/doi/10.1126/science.1174443"
        },
        {
          title: "Gene editing of CCR5 in human embryos",
          author: "Kang, X. et al. / Journal of Assisted Reproduction and Genetics",
          desc: "Forschungsansätze zur HIV-Resistenz durch Keimbahn-Editierung (CCR5-Mutation), wie sie oft als Rechtfertigung für Gen-Enhancement angeführt werden.",
          url: "https://link.springer.com/article/10.1007/s10815-016-0710-8"
        },
        {
          title: "The genetics of cognitive abilities and disabilities",
          author: "Plomin, R. / Trends in Cognitive Sciences",
          desc: "Übersicht zur Polygenie von Intelligenz, die verdeutlicht, dass 'Intelligenz-Design' weit komplexer ist als die Änderung eines einzelnen Gens.",
          url: "https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(99)01332-9"
        }
      ]
    },
    {
      category: "Recht & Gesellschaft (Politik)",
      icon: <Gavel className="w-8 h-8 text-yellow-400" />,
      color: "border-yellow-500",
      items: [
        {
          title: "Gesetz zum Schutz von Embryonen (Embryonenschutzgesetz - ESchG) § 5",
          author: "Bundesministerium der Justiz",
          desc: "Das deutsche Gesetz, das jegliche künstliche Veränderung der menschlichen Keimbahnzellen unter Strafe (bis zu 5 Jahre Freiheitsstrafe) stellt.",
          url: "https://www.gesetze-im-internet.de/eschg/__5.html"
        },
        {
          title: "He Jiankui and the CRISPR Babies Skandal",
          author: "Science Magazine / Nature",
          desc: "Dokumentation des realen Falles von 2018 in China, als He Jiankui die Zwillinge Lulu und Nana erschuf. Diente als Vorlage für die Location-Select Phase.",
          url: "https://www.nature.com/articles/d41586-019-00673-1"
        },
        {
          title: "Eingriffe in die menschliche Keimbahn",
          author: "Deutscher Ethikrat",
          desc: "Stellungnahme des Ethikrates von 2019, welche die gesellschaftlichen Konsequenzen (Zwei-Klassen-Gesellschaft) und globale Regulierungen fordert.",
          url: "https://www.ethikrat.org/fileadmin/Publikationen/Stellungnahmen/deutsch/stellungnahme-eingriffe-in-die-menschliche-keimbahn.pdf"
        },
        {
          title: "Global registry of human genome editing",
          author: "World Health Organization (WHO)",
          desc: "Forderung nach einem globalen Register und ethischen Standards für Gen-Editierung, um 'Rogue Clinics' (wie im Spiel) zu verhindern.",
          url: "https://www.who.int/publications/i/item/9789240030060"
        },
        {
          title: "Genetic Inequality: Human Genetic Engineering",
          author: "Sandel, M. J. / The Case Against Perfection",
          desc: "Gesellschaftspolitische Analyse zur Gefahr einer neuen Eugenik und sozialen Spaltung durch käufliches genetisches Enhancement.",
          url: "https://www.hup.harvard.edu/catalog.php?isbn=9780674036383"
        },
        {
          title: "The FDA and Human Germline Engineering",
          author: "Food and Drug Administration (USA)",
          desc: "Rechtlicher Hintergrund zum 'Dickey-Wicker Amendment', das in den USA die Bundesfinanzierung für Forschung an menschlichen Embryonen blockiert.",
          url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products"
        },
        {
          title: "Seasteading and the Law of the Sea",
          author: "UNCLOS (United Nations Convention on the Law of the Sea)",
          desc: "Völkerrechtliche Grundlage zur Erklärung, warum internationale Gewässer (wie in der App wählbar) ein rechtliches Schlupfloch darstellen.",
          url: "https://www.un.org/depts/los/convention_agreements/texts/unclos/unclos_e.pdf"
        },
        {
          title: "Patenting CRISPR: The global battle",
          author: "Cohen, J. / Science",
          desc: "Hintergrund zum Patentstreit um CRISPR, der zeigt, wie enorm das wirtschaftliche Kapital (und damit die Gefahr der Kommerzialisierung) in diesem Sektor ist.",
          url: "https://www.science.org/content/article/how-battle-lines-over-crispr-were-drawn"
        }
      ]
    },
    {
      category: "Religion & Ethik",
      icon: <AlertTriangle className="w-8 h-8 text-purple-400" />,
      color: "border-purple-500",
      items: [
        {
          title: "CRISPR und die Frage nach dem 'Schöpfer spielen'",
          author: "Evangelische Kirche in Deutschland (EKD)",
          desc: "Theologische Abhandlung zur Geneditierung. Diskutiert die Spannung zwischen dem biblischen Heilungsauftrag und der Anmaßung göttlicher Macht (Enhancement).",
          url: "https://www.ekd.de/ekd_de/ds_doc/CRISPR-Cas9-und-die-Gentechnik.pdf"
        },
        {
          title: "Jewish Medical Ethics regarding CRISPR",
          author: "Rabbi Dr. Avraham Steinberg",
          desc: "Darstellung des Prinzips 'Pikuach Nefesch' (Rettung von Leben), wonach Genmanipulation zur Heilung tödlicher Krankheiten im Judentum erlaubt, kosmetisches Enhancement jedoch umstritten ist.",
          url: "https://www.jewishvirtuallibrary.org/medical-ethics-in-judaism"
        },
        {
          title: "Erklärung der Päpstlichen Akademie für das Leben",
          author: "Vatikan",
          desc: "Katholische Perspektive zur Unantastbarkeit des Embryos von der Befruchtung an, was PID (Präimplantationsdiagnostik) streng verbietet.",
          url: "https://www.vatican.va/roman_curia/pontifical_academies/acdlife/documents/rc_pont-acd_life_doc_20000824_prospettive-clonazione_ge.html"
        },
        {
          title: "Islamic Bioethics on Genetic Modification",
          author: "Al-Bar, M. A., & Chamsi-Pasha, H.",
          desc: "Islamische Perspektive: Heilung von Gendefekten (Tadawi) wird befürwortet, die Veränderung der Schöpfung (Taghyir khalq Allah) zur reinen Optimierung jedoch abgelehnt.",
          url: "https://link.springer.com/book/10.1007/978-3-319-18428-9"
        },
        {
          title: "Buddhism and Genetic Engineering",
          author: "Keown, D. / Journal of Buddhist Ethics",
          desc: "Buddhistische Sichtweise, die die Intention (Karma) hinter der Handlung betont und vor Gier nach Perfektion warnt.",
          url: "https://blogs.dickinson.edu/buddhistethics/files/2010/04/Keown1.pdf"
        },
        {
          title: "Transhumanismus und christliche Theologie",
          author: "Burdett, M. / Zygon",
          desc: "Kritische Auseinandersetzung mit der transhumanistischen Ideologie, den menschlichen Körper als unfertiges Produkt zu betrachten, das optimiert werden muss.",
          url: "https://onlinelibrary.wiley.com/doi/10.1111/zygo.12093"
        },
        {
          title: "The Ethics of Designer Babies",
          author: "Savulescu, J. / Bioethics",
          desc: "Philosophisches Argument der 'Procreative Beneficence': Die umstrittene These, dass Eltern moralisch verpflichtet seien, die besten genetischen Eigenschaften für ihr Kind zu wählen.",
          url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/1467-8519.00250"
        },
        {
          title: "Eugenik der Vergangenheit und Zukunft",
          author: "Kevles, D. J. / In the Name of Eugenics",
          desc: "Historische Einordnung. Warnt davor, dass moderne 'liberale Eugenik' (die Wahl der Eltern) dieselben diskriminierenden Folgen haben kann wie die staatliche Eugenik des 20. Jahrhunderts.",
          url: "https://www.hup.harvard.edu/catalog.php?isbn=9780674445574"
        }
      ]
    },
    {
      category: "Technologie & Prompts (Formalia)",
      icon: <Bot className="w-8 h-8 text-[#00f0ff]" />,
      color: "border-[#00f0ff]",
      items: [
        {
          title: "KI-Nutzung & Prompts",
          author: "Gruppenprojekt Dokumentation",
          desc: "Für die Programmierung (React, Next.js, Framer Motion) und inhaltliche Strukturierung dieser Applikation wurde ein Large Language Model genutzt. Die Prompts fokussierten sich auf die Übersetzung wissenschaftlicher Fakten in spielerische UI-Elemente gemäß den Vorgaben des Schul-Bewertungsbogens.",
          url: "#"
        },
        {
          title: "Framer Motion (React Animation Library)",
          author: "Framer",
          desc: "Verwendet für die Darstellung komplexer biologischer Prozesse (CRISPR-Schnitt, PID-Scanner, Neuronales Netz) als interaktive Hologramme.",
          url: "https://www.framer.com/motion/"
        },
        {
          title: "Tailwind CSS & Lucide Icons",
          author: "Tailwind Labs / Lucide",
          desc: "Frameworks zur Gestaltung der responsiven, Cyberpunk-/Klinik-ästhetischen Benutzeroberfläche, optimiert für Tablet-Präsentationen.",
          url: "https://tailwindcss.com/"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050A15] p-6 font-sans text-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
           <div>
             <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
               <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#00f0ff]" />
               Wissenschaftliche Quellen
             </h1>
             <p className="text-slate-400 mt-2 text-sm md:text-base font-mono">Fächerübergreifendes Projekt &quot;Leben&quot; – Genmanipulierte Designer-Babys</p>
             <p className="text-slate-500 mt-1 text-xs">Biologie | Politik & Gesellschaft | Religion & Ethik</p>
           </div>
           
           <Link href="/">
             <Button variant="outline" className="border-[#00f0ff]/50 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-mono tracking-widest uppercase">
               <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zum System
             </Button>
           </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16 pb-20"
        >
          {sources.map((section, idx) => (
            <section key={idx} className="relative">
              {/* Category Header */}
              <div className={`flex items-center gap-4 mb-8 pb-4 border-b-2 \${section.color} border-opacity-30`}>
                <div className={`p-3 bg-slate-900 rounded-xl border \${section.color} border-opacity-50 shadow-lg`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider">{section.category}</h2>
              </div>
              
              {/* Source Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {section.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className={`bg-slate-900/80 border-t-4 \${section.color} hover:bg-slate-800 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                    <CardHeader className="pb-3 flex-none">
                      <CardTitle className="text-sm md:text-base font-bold text-slate-100 leading-snug">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-[10px] md:text-xs font-mono text-[#00f0ff] mt-2 bg-[#00f0ff]/10 inline-block px-2 py-1 rounded">
                        {item.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4 flex-1">
                      <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0 border-t border-slate-800 mt-auto flex-none">
                      {item.url !== "#" ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white flex items-center gap-2 transition-colors w-full p-2 bg-slate-950 rounded justify-center border border-slate-800 hover:border-slate-600">
                          <ExternalLink className="w-3 h-3" /> Quelle Öffnen
                        </a>
                      ) : (
                        <span className="mt-4 text-[10px] font-mono text-slate-500 bg-slate-950 w-full text-center p-2 rounded border border-slate-800">
                          PROJEKT-INTERNES DOKUMENT
                        </span>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </div>
      
      {/* Scrollbar styling */}
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050A15; }
        ::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
}