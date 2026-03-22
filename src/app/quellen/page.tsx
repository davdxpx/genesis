"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, AlertOctagon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-[#050A15] p-6 font-sans text-slate-200 flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)] w-full">
           <div>
             <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
               <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-[#00f0ff]" />
               Wissenschaftliche Quellen
             </h1>
             <p className="text-slate-400 mt-2 text-sm md:text-base font-mono">Fächerübergreifendes Projekt "Leben" – Genmanipulierte Designer-Babys</p>
             <p className="text-slate-500 mt-1 text-xs">Biologie | Politik & Gesellschaft | Religion & Ethik</p>
           </div>
           
           <Link href="/">
             <Button variant="outline" className="border-[#00f0ff]/50 hover:bg-[#00f0ff]/20 text-[#00f0ff] font-mono tracking-widest uppercase">
               <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zum System
             </Button>
           </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center items-center mt-20"
        >
          <Card className="max-w-xl w-full bg-slate-900/80 border-[#ff00e5]/50 shadow-[0_0_40px_rgba(255,0,229,0.2)]">
             <CardContent className="p-10 flex flex-col items-center text-center">
                <AlertOctagon className="w-24 h-24 text-[#ff00e5] mb-6 animate-pulse" />
                <h2 className="text-3xl font-black text-white mb-4 tracking-widest uppercase">
                   Vorübergehend nicht verfügbar
                </h2>
                <div className="w-16 h-1 bg-[#ff00e5] mb-6 rounded-full" />
                <p className="text-slate-300 font-mono leading-relaxed">
                   <br /><br />
                   <span className="text-[#00f0ff]">Bitte versuchen Sie es später erneut.</span>
                </p>
             </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050A15; }
        ::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
}
