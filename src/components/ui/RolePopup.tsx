import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, X } from 'lucide-react';

interface RolePopupProps {
  title: string;
  description: string;
}

export function RolePopup({ title, description }: RolePopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide after 12 seconds, or let user close it manually
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full"
        >
          <div className="relative bg-slate-900/95 border border-[#00f0ff]/50 shadow-[0_0_30px_rgba(0,240,255,0.2)] p-5 rounded-2xl backdrop-blur-md overflow-hidden group">
             {/* Scanline background effect */}
             <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 240, 255, 0.1) 50%)', backgroundSize: '100% 4px' }} />

             {/* Close button */}
             <button
               onClick={() => setIsVisible(false)}
               className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors"
             >
               <X size={16} />
             </button>

             <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-[#00f0ff]/10 rounded-xl border border-[#00f0ff]/30 shrink-0">
                   <Microscope className="text-[#00f0ff] w-6 h-6 animate-pulse" />
                </div>
                <div>
                   <h4 className="text-[#00f0ff] font-black uppercase tracking-widest text-sm mb-1">Ihr Auftrag: {title}</h4>
                   <p className="text-slate-300 text-xs leading-relaxed font-mono">
                     {description}
                   </p>
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
