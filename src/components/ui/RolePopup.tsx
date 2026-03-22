import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, X } from 'lucide-react';

interface RolePopupProps {
  title: string;
  description: string;
}

export function RolePopup({ title, description }: RolePopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md"
          >
            <div className="relative bg-[#0A101D] border-2 border-[#00f0ff] shadow-[0_0_50px_rgba(0,240,255,0.3)] p-6 md:p-8 rounded-2xl overflow-hidden group">
               <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 240, 255, 0.5) 50%)', backgroundSize: '100% 4px' }} />

               <button
                 onClick={() => setIsVisible(false)}
                 className="absolute top-4 right-4 p-1 bg-slate-900/80 rounded-full border border-slate-700 text-slate-400 hover:text-[#00f0ff] hover:border-[#00f0ff] hover:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all z-20"
               >
                 <X size={20} />
               </button>

               <div className="flex flex-col items-center text-center gap-4 relative z-10 mt-2">
                  <div className="p-4 bg-[#00f0ff]/10 rounded-2xl border border-[#00f0ff]/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                     <Microscope className="text-[#00f0ff] w-10 h-10 animate-pulse" />
                  </div>
                  <div>
                     <h4 className="text-[#00f0ff] font-black uppercase tracking-widest text-lg md:text-xl mb-3">
                        Ihr Auftrag: {title}
                     </h4>
                     <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent mx-auto mb-4" />
                     <p className="text-slate-300 text-sm md:text-base leading-relaxed font-mono">
                       {description}
                     </p>
                  </div>

                  <button
                    onClick={() => setIsVisible(false)}
                    className="mt-6 w-full py-3 bg-[#00f0ff]/10 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/20 font-bold uppercase tracking-widest transition-colors rounded text-sm"
                  >
                     Verstanden
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
