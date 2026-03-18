"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { BookOpen, Gavel, TestTube2, AlertTriangle, ArrowLeft, ExternalLink, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
          author: "Jinek M, Chylinski K, Fonfara I, Hauer M, Doudna JA, Charpentier E.",
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
          desc: "Für die Programmierung (React, Next.js, Framer Motion) und inhaltliche Strukturierung dieser Applikation wurde das LLM Gemini (Google) genutzt. Die Prompts fokussierten sich auf die Übersetzung wissenschaftlicher Fakten in spielerische UI-Elemente gemäß den Vorgaben des Schul-Bewertungsbogens.",
          url: "#"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050A15] p-6 font-sans text-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12">
           <div>
             <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
               <BookOpen className="w-10 h-10 text-blue-500" />
               Quellenverzeichnis & Dokumentation
             </h1>
             <p className="text-slate-400 mt-2 text-lg">Fächerübergreifendes Projekt &quot;Leben&quot; – Genmanipulierte Designer-Babys</p>
           </div>
           
           <Link href="/">
             <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
               <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur App
             </Button>
           </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {sources.map((section, idx) => (
            <section key={idx}>
              <div className={`flex items-center gap-4 mb-6 pb-2 border-b border-slate-800`}>
                {section.icon}
                <h2 className="text-2xl font-bold text-white">{section.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className={`bg-slate-900 border-t-4 border-slate-800 ${section.color} hover:bg-slate-800/80 transition-colors`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold text-slate-100 leading-snug">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs font-mono text-slate-400 mt-1">
                        Autor: {item.author}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      {item.url !== "#" ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors">
                          Quelle aufrufen <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sm text-slate-500 font-mono">Internes Dokument</span>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </motion.div>
      </div>
    </div>
  );
}