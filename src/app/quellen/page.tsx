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
          title: "Designer-Babys: Wie weit darf die Genforschung gehen?",
          author: "National Geographic Deutschland",
          desc: "Ausführliche Reportage über die ethischen und biologischen Grenzen der genetischen Optimierung des Menschen durch moderne Methoden.",
          url: "https://www.nationalgeographic.de/wissenschaft/designer-babys-wie-weit-darf-die-genforschung-gehen"
        },
        {
          title: "Gene editing of CCR5 in human embryos",
          author: "Kang, X. et al. / Journal of Assisted Reproduction and Genetics",
          desc: "Forschungsansätze zur HIV-Resistenz durch Keimbahn-Editierung (CCR5-Mutation), wie sie oft als Rechtfertigung für Gen-Enhancement angeführt werden.",
          url: "https://link.springer.com/article/10.1007/s10815-016-0710-8"
        },
        {
          title: "Crispr-Babys in China: Die Büchse der Pandora",
          author: "Spiegel Online",
          desc: "Ausführliche journalistische Aufarbeitung der ersten genmanipulierten Babys (Lulu und Nana) und der Reaktionen der Wissenschaftswelt.",
          url: "https://www.spiegel.de/wissenschaft/medizin/crispr-babys-in-china-die-buechse-der-pandora-ist-offen-a-1240685.html"
        },
        {
          title: "Myostatin und Muskelwachstum: Hemmung als neuer Ansatz",
          author: "Deutsches Ärzteblatt",
          desc: "Wissenschaftsjournalistischer Artikel über das Gen Myostatin, dessen Hemmung zu Muskelhypertrophie führt, ein Konzept, das im Projekt als 'militärisches Upgrade' vorkommt.",
          url: "https://www.aerzteblatt.de/archiv/42221/Myostatin-Hemmung-Neuer-Ansatz-zur-Therapie-von-Muskelerkrankungen"
        },
        {
          title: "Intelligenz ist stark erblich – aber nicht nur von einem Gen abhängig",
          author: "Max-Planck-Gesellschaft",
          desc: "Bericht der Max-Planck-Gesellschaft über die genetischen Grundlagen der Intelligenz und warum kognitives Enhancement so komplex ist.",
          url: "https://www.mpg.de/11388047/intelligenz-gene"
        },
        {
          title: "Wie die Genschere CRISPR/Cas9 funktioniert",
          author: "Quarks (WDR)",
          desc: "Verständliche journalistische Erklärung des CRISPR/Cas-Systems, das in der App als primäre Technologie genutzt wird.",
          url: "https://www.quarks.de/gesundheit/medizin/crispr-genschere-revolution-in-der-medizin/"
        },
        {
          title: "Schlafforschung: Das Gen der Kurzschläfer",
          author: "Spektrum der Wissenschaft",
          desc: "Bericht über die Entdeckung von Genmutationen (wie DEC2 und ADRB1), die Menschen mit sehr wenig Schlaf auskommen lassen.",
          url: "https://www.spektrum.de/news/gen-fuer-kurzschlaefer-entdeckt/1671500"
        },
        {
          title: "Genschere Crispr/Cas: Der Traum vom perfekten Menschen",
          author: "Spektrum der Wissenschaft",
          desc: "Journalistischer Artikel über die Möglichkeiten und Risiken, mit CRISPR-Cas menschliche Embryonen genetisch zu verändern.",
          url: "https://www.spektrum.de/wissen/genschere-crispr-cas-der-traum-vom-perfekten-menschen/1435889"
        }
      ]
    },
    {
      category: "Recht & Gesellschaft (Politik)",
      icon: <Gavel className="w-8 h-8 text-yellow-400" />,
      color: "border-yellow-500",
      items: [
        {
          title: "Gesetz zum Schutz von Embryonen (Embryonenschutzgesetz - ESchG)",
          author: "Bundesministerium der Justiz / Gesetze im Internet",
          desc: "Das deutsche Gesetz, das jegliche künstliche Veränderung der menschlichen Keimbahnzellen unter Strafe (bis zu 5 Jahre Freiheitsstrafe) stellt.",
          url: "https://www.gesetze-im-internet.de/eschg/"
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
          title: "Human Genome Editing: Recommendations",
          author: "World Health Organization (WHO)",
          desc: "Offizielle Empfehlungen der WHO für ein globales Register und ethische Standards für Gen-Editierung, um unregulierte Kliniken zu verhindern.",
          url: "https://www.who.int/publications/i/item/9789240030060"
        },
        {
          title: "Die Gefahr einer neuen Eugenik durch Geneditierung",
          author: "Deutschlandfunk",
          desc: "Auseinandersetzung mit Michael Sandels Thesen zur Gefahr sozialer Spaltung durch käufliches genetisches Enhancement.",
          url: "https://www.deutschlandfunkkultur.de/michael-sandel-das-plaedoyer-gegen-die-perfektion-100.html"
        },
        {
          title: "Genetic Inequality: Human Genetic Engineering",
          author: "Sandel, M. J. / Harvard University Press",
          desc: "Gesellschaftspolitische Analyse zur Gefahr einer neuen Eugenik und sozialen Spaltung durch käufliches genetisches Enhancement.",
          url: "https://www.hup.harvard.edu/catalog.php?isbn=9780674036383"
        },
        {
          title: "Seasteading: Städte auf dem Meer sollen die Menschheit retten",
          author: "Neue Zürcher Zeitung (NZZ)",
          desc: "Bericht über libertäre Pläne für schwimmende Städte im Ozean (Seasteading), die nationalen Gesetzen (z.B. zu Gentechnik) entgehen wollen.",
          url: "https://www.nzz.ch/feuilleton/seasteading-staedte-auf-dem-meer-sollen-die-menschheit-retten-ld.1633504"
        },
        {
          title: "CRISPR-Patentstreit: Wer besitzt die Genschere?",
          author: "WirtschaftsWoche",
          desc: "Hintergrundbericht zum Patentstreit um CRISPR, der zeigt, wie enorm das wirtschaftliche Kapital und die Kommerzialisierung in diesem Sektor ist.",
          url: "https://www.wiwo.de/technologie/forschung/genschere-crispr-cas9-der-hickhack-um-das-jahrhundertpatent/26184518.html"
        },
        {
          title: "Zwei-Klassen-Gesellschaft durch genetische Optimierung",
          author: "Frankfurter Allgemeine Zeitung (FAZ)",
          desc: "Artikel über die soziologischen Folgen, wenn sich nur Reiche genetische Upgrades für ihre Kinder leisten können (Gattaca-Szenario).",
          url: "https://www.faz.net/aktuell/wissen/medizin-ernaehrung/genetik-droht-eine-gesellschaft-der-genetisch-optimierten-15891739.html"
        },
        {
          title: "Gentechnik am Menschen: Ein globales Regelvakuum",
          author: "Süddeutsche Zeitung",
          desc: "Journalistische Analyse zur Forderung nach weltweiten Richtlinien, um illegale Gen-Experimente an Menschen zu verhindern.",
          url: "https://www.sueddeutsche.de/wissen/crispr-babys-gentechnik-who-regeln-1.5349479"
        },
        {
          title: "Gesetzgeber hinkt Gen-Technologie hinterher",
          author: "Tagesschau",
          desc: "Journalistische Aufbereitung des Problems, dass die rasante CRISPR-Forschung geltendes Recht auf die Probe stellt.",
          url: "https://www.tagesschau.de/wissen/technologie/crispr-genschere-101.html"
        }
      ]
    },
    {
      category: "Religion & Ethik",
      icon: <AlertTriangle className="w-8 h-8 text-purple-400" />,
      color: "border-purple-500",
      items: [
        {
          title: "Gentechnik - Ein Eingriff in die Schöpfung?",
          author: "Evangelische Kirche in Deutschland (EKD)",
          desc: "Theologische Abhandlung zur Geneditierung. Diskutiert die Spannung zwischen dem biblischen Heilungsauftrag und der Anmaßung göttlicher Macht.",
          url: "https://www.ekd.de/Gentechnik-10826.htm"
        },
        {
          title: "Jewish Medical Ethics regarding CRISPR",
          author: "Rabbi Dr. Avraham Steinberg / Jewish Virtual Library",
          desc: "Darstellung des Prinzips 'Pikuach Nefesch' (Rettung von Leben), wonach Genmanipulation zur Heilung tödlicher Krankheiten im Judentum erlaubt, kosmetisches Enhancement jedoch umstritten ist.",
          url: "https://www.jewishvirtuallibrary.org/medical-ethics-in-judaism"
        },
        {
          title: "Ethik des Enhancements",
          author: "Deutsches Referenzzentrum für Ethik in den Biowissenschaften",
          desc: "Umfassendes Dossier über die moralische Unterscheidung zwischen Therapie (Heilung) und Enhancement (Verbesserung).",
          url: "https://www.drze.de/de/forschung-publikationen/im-blickpunkt/enhancement"
        },
        {
          title: "Islamic Bioethics on Genetic Modification",
          author: "Al-Bar, M. A., & Chamsi-Pasha, H. / Springer",
          desc: "Islamische Perspektive: Heilung von Gendefekten (Tadawi) wird befürwortet, die Veränderung der Schöpfung zur reinen Optimierung jedoch abgelehnt.",
          url: "https://link.springer.com/book/10.1007/978-3-319-18428-9"
        },
        {
          title: "Spielen wir Gott? Ethik der Geneditierung",
          author: "Bayerischer Rundfunk (BR Wissen)",
          desc: "Journalistischer Beitrag über die moralischen Fragen, transhumanistische Visionen und die Rolle der Ethik bei CRISPR.",
          url: "https://www.br.de/wissen/crispr-cas9-genschere-ethik-moral-gentechnik-100.html"
        },
        {
          title: "Die katholische Kirche und der Schutz des ungeborenen Lebens",
          author: "Vatican News",
          desc: "Die Perspektive der katholischen Kirche zur Unantastbarkeit des menschlichen Lebens von der Empfängnis an, was verbrauchende Embryonenforschung ablehnt.",
          url: "https://www.vaticannews.va/de/welt/news/2021-02/lebensschutz-kirche-papst-johannes-paul-evangelium-vitae-ethik.html"
        },
        {
          title: "The Ethics of Designer Babies (Procreative Beneficence)",
          author: "Savulescu, J. / Bioethics",
          desc: "Philosophisches Argument der 'Procreative Beneficence': Die umstrittene These, dass Eltern moralisch verpflichtet seien, die besten genetischen Eigenschaften für ihr Kind zu wählen.",
          url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/1467-8519.00250"
        },
        {
          title: "Eugenik der Vergangenheit und Zukunft",
          author: "Kevles, D. J. / In the Name of Eugenics",
          desc: "Historische Einordnung. Warnt davor, dass moderne 'liberale Eugenik' (die freie Wahl der Eltern) dieselben diskriminierenden Folgen haben kann wie die staatliche Eugenik.",
          url: "https://www.hup.harvard.edu/catalog.php?isbn=9780674445574"
        },
        {
          title: "Transhumanismus: Homo Digitalis",
          author: "Arte (Dokumentation)",
          desc: "Auseinandersetzung mit der Ideologie des Transhumanismus, den menschlichen Körper als unfertiges Produkt zu betrachten, das optimiert werden muss.",
          url: "https://www.arte.tv/de/videos/081591-000-A/homo-digitalis-1-7/"
        },
        {
          title: "Jürgen Habermas: Die Zukunft der menschlichen Natur",
          author: "Deutschlandfunk / Suhrkamp",
          desc: "Diskussion über die philosophische Betrachtung von Jürgen Habermas über die 'Vorprogrammierung' von Menschen und den drohenden Verlust an Autonomie.",
          url: "https://www.deutschlandfunk.de/juergen-habermas-die-zukunft-der-menschlichen-natur-auf-dem-100.html"
        },
        {
          title: "Buddhistische Perspektiven auf Gentechnik",
          author: "Buddhismus aktuell",
          desc: "Ein Einblick, wie der Buddhismus Intention und Karma bewertet und vor Gier nach biologischer Perfektion warnt.",
          url: "https://buddhismus-aktuell.de/artikel/ausgaben/20164-schoepfung/karma-und-die-schoepfung/"
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
          desc: "Für die Programmierung (React, Next.js, Framer Motion) und inhaltliche Strukturierung dieser Applikation wurde ein Large Language Model genutzt.",
          url: "#"
        },
        {
          title: "Framer Motion (React Animation Library)",
          author: "Framer",
          desc: "Verwendet für die Darstellung komplexer biologischer Prozesse (CRISPR-Schnitt, PID-Scanner, Neuronales Netz) als interaktive Hologramme.",
          url: "https://motion.dev/"
        },
        {
          title: "Tailwind CSS",
          author: "Tailwind Labs",
          desc: "Framework zur Gestaltung der responsiven, Cyberpunk-/Klinik-ästhetischen Benutzeroberfläche.",
          url: "https://tailwindcss.com/"
        },
        {
          title: "Next.js Framework",
          author: "Vercel",
          desc: "Das React-Framework, auf dem die Architektur dieses interaktiven Schulprojekts basiert.",
          url: "https://nextjs.org/"
        },
        {
          title: "Lucide Icons",
          author: "Lucide",
          desc: "Die Open-Source Icon-Bibliothek, die für die intuitive Benutzerführung in den verschiedenen Phasen genutzt wird.",
          url: "https://lucide.dev/"
        }
      ]
    }  ];

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