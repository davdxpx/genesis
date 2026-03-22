'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, HeartHandshake, Zap, Fingerprint, Lock, ChevronRight } from 'lucide-react';
interface AuthReqPhaseProps {
  onNext: () => void;
  onCancel: () => void;
  updateGameState?: (data: Record<string, unknown>) => void;
}
export function AuthReqPhase({ onNext, onCancel, updateGameState }: AuthReqPhaseProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const roles = [
    {
      id: "Pragmatic_Biologist",
      icon: <Zap className="w-10 h-10 text-cyan-400" />,
      title: "Der pragmatische Biologe",
      description: "Du siehst Genmanipulation als Werkzeug für den menschlichen Fortschritt. Evolution ist für dich ein Code, den man optimieren muss.",
      color: "cyan",
      borderClass: "border-cyan-500",
      bgClass: "bg-cyan-500/5",
      dotClass: "bg-cyan-500",
      traits: ["Fokus auf Wissenschaft", "Bereitschaft für Risiken", "Rational"]
    },
    {
      id: "Ethical_Guardian",
      icon: <HeartHandshake className="w-10 h-10 text-green-400" />,
      title: "Der ethische Wächter",
      description: "Für dich ist die Grenze zwischen Therapie und Enhancement fließend. Du hinterfragst jede Entscheidung auf ihre moralischen und sozialen Auswirkungen.",
      color: "green",
      borderClass: "border-green-500",
      bgClass: "bg-green-500/5",
      dotClass: "bg-green-500",
      traits: ["Hohes Moralbewusstsein", "Vorsichtig", "Gesellschaftsorientiert"]
    },
    {
      id: "Ambitious_Parent",
      icon: <Briefcase className="w-10 h-10 text-purple-400" />,
      title: "Die ambitionierten Eltern",
      description: "Du willst nur das Beste für dein Kind – auch wenn das bedeutet, alle verfügbaren Mittel auszuschöpfen. Erfolg rechtfertigt die Mittel.",
      color: "purple",
      borderClass: "border-purple-500",
      bgClass: "bg-purple-500/5",
      dotClass: "bg-purple-500",
      traits: ["Fokus auf Erfolg", "Wettbewerbsorientiert", "Ergebnisgetrieben"]
    }
  ];
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
  };
  const handleConfirmRole = () => {
    if (selectedRole) {
      if (updateGameState) {
        updateGameState({ selectedRole });
      }
      setIsConfirming(true);
      setTimeout(() => {
        onNext();
      }, 1000);
    }
  };
  return (
    <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center justify-center font-sans min-h-[80vh]">
      <Card className="w-full bg-slate-900 border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <CardHeader className="pb-4 border-b border-slate-800 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-slate-800/80 rounded-full border border-slate-700/50">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-3xl text-white font-bold tracking-tight mb-2">Wähle dein Profil</CardTitle>
          <CardDescription className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
            In der GENESIS CLINIC treffen Welten aufeinander. Mit welcher Perspektive betrittst du die Klinik?
            Deine Wahl beeinflusst die ethischen und biologischen Entscheidungen im Verlauf der Simulation.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-8 relative z-10 p-6">
          <AnimatePresence mode="wait">
            {!isConfirming ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`
                      relative p-6 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col h-full
                      ${selectedRole === role.id
                        ? 'bg-slate-800/80 ' + role.borderClass + ' shadow-[0_0_20px_rgba(0,0,0,0.5)] transform scale-[1.02]'
                        : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'
                      }
                    `}
                  >
                    {selectedRole === role.id && (
                      <div className={`absolute inset-0 ${role.bgClass} rounded-xl pointer-events-none`}></div>
                    )}
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 rounded-full bg-slate-900 border ${selectedRole === role.id ? role.borderClass + '/50 shadow-[0_0_15px_rgba(0,0,0,0.3)]' : 'border-slate-800'}`}>
                        {role.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white text-center mb-3">{role.title}</h3>
                    <p className="text-sm text-slate-400 text-center flex-1 mb-6 leading-relaxed">
                      {role.description}
                    </p>
                    <div className="mt-auto space-y-2">
                      {role.traits.map((trait, idx) => (
                        <div key={idx} className="text-xs text-slate-300 bg-slate-950/50 px-3 py-1.5 rounded border border-slate-800/50 flex items-center justify-center">
                          {trait}
                        </div>
                      ))}
                    </div>
                    {selectedRole === role.id && (
                      <div className="absolute top-3 right-3">
                         <div className={`w-3 h-3 rounded-full ${role.dotClass} shadow-[0_0_10px_rgba(0,0,0,0.8)]`}></div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="relative">
                  <Fingerprint className="w-24 h-24 text-blue-500 animate-pulse" />
                  <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-ping"></div>
                </div>
                <h2 className="text-2xl font-bold text-white mt-8 mb-2">Profil wird authentifiziert...</h2>
                <p className="text-slate-400 font-mono text-sm">Berechtigung wird geprüft. Initialisierung der Simulation.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between mt-4 pt-6 pb-8 px-8 border-t border-slate-800 relative z-10">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" 
            onClick={onCancel}
            disabled={isConfirming}
          >
            Zurück zur Übersicht
          </Button>
          <Button 
            className={`w-full sm:w-auto font-bold px-8 transition-all flex items-center gap-2 ${
              selectedRole
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            disabled={!selectedRole || isConfirming}
            onClick={handleConfirmRole}
          >
            <Lock className="w-4 h-4" />
            {isConfirming ? 'Authentifizierung...' : 'Profil bestätigen & Eintreten'}
            {!isConfirming && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}