import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Dna, Fingerprint, Database, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function IntroPhase({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4"
    >
      <div className="mb-12 text-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Dna size={80} className="text-[#00f0ff] opacity-80" />
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#9d00ff] drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
          PROJECT GENESIS
        </h1>
        <p className="text-xl text-slate-400 tracking-widest uppercase mb-2">Jahr: 2045</p>
        <p className="text-sm text-[#ff00e5] opacity-80 uppercase tracking-[0.3em] animate-pulse">
          <AlertTriangle className="inline w-4 h-4 mr-2 mb-1" />
          Eingeschränkter Zugriff Stufe 5
        </p>
      </div>

      <Card className="w-full relative overflow-hidden glass border-[#00f0ff]/30">
        <CardHeader className="border-b border-slate-700/50 bg-slate-800/50">
          <CardTitle className="flex items-center gap-2 text-[#00f0ff]">
            <Fingerprint className="text-[#00f0ff]" />
            Direktive Alpha
          </CardTitle>
          <CardDescription>System-Initialisierungsprotokoll</CardDescription>
        </CardHeader>
        <CardContent className="py-8 space-y-6 text-lg text-slate-300">
          <p>
            Willkommen, Leitender Genetiker. Sie wurden für <strong className="text-[#00f0ff]">Projekt Genesis</strong> ausgewählt.
          </p>
          <p>
            Ihr Ziel: Erschaffen Sie das optimale Kind für hochkarätige Klienten. Sie werden durch komplexe ethische Grenzen navigieren, die idealen genetischen Merkmale auswählen und die öffentliche Wahrnehmung in einer zunehmend polarisierten Welt steuern.
          </p>
          <div className="p-4 rounded-md bg-[#0f172a]/50 border border-[#ff00e5]/20 flex items-start gap-4">
            <Database className="text-[#ff00e5] shrink-0 mt-1" />
            <p className="text-sm">
              <span className="text-[#ff00e5] font-bold">WARNUNG:</span> Jede Entscheidung hat kaskadierende Konsequenzen. Das am Ende von der KI generierte Ergebnis spiegelt Ihre Entscheidungen wider – ein ständiger Balanceakt zwischen biologischer Perfektion und ethischer Realität.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-slate-700/50 bg-slate-800/30 pt-6">
          <Button variant="default" size="lg" onClick={onNext} className="w-full md:w-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            Bestätigen & Initialisieren
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}