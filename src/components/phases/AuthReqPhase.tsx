'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Fingerprint, ShieldAlert, HeartPulse } from 'lucide-react';

interface AuthReqPhaseProps {
  onNext: () => void;
  onCancel: () => void;
}

export function AuthReqPhase({ onNext, onCancel }: AuthReqPhaseProps) {
  const [agreed, setAgreed] = useState(false);

  const terms = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-400" />,
      category: "Biologie: Unvorhersehbare Mutationen",
      title: "Risiko von Off-Target-Effekten",
      desc: "Die CRISPR-Cas9 Technologie, unsere 'Genschere', ist leistungsstark, aber nicht unfehlbar. Es kann zu unbeabsichtigten Schnitten in der DNA kommen, die abseits der Zielsequenz liegen (Off-Target). Dies kann zu unvorhersehbaren genetischen Defekten, Funktionsverlust wichtiger Gene oder sogar zu einem erhöhten Krebsrisiko bei Ihrem Kind führen."
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-purple-400" />,
      category: "Religion & Ethik: Die Schöpfungsfrage",
      title: "Der Eingriff in die menschliche Natur",
      desc: "Sie begeben sich auf ein Terrain, das viele Weltreligionen (Christentum, Islam, Judentum) kritisch betrachten. Verlassen wir die Rolle der Eltern und werden zu Schöpfern? Ist es moralisch vertretbar, die menschliche Keimbahn – und damit alle zukünftigen Generationen – unwiderruflich nach unseren Vorstellungen zu formen? Sie tragen die volle moralische Verantwortung."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-yellow-400" />,
      category: "Politik & Gesellschaft: Die Zwei-Klassen-Gesellschaft",
      title: "Rechtliche Grauzonen und soziale Spaltung",
      desc: "Die Genmanipulation am Menschen, insbesondere an der Keimbahn, ist in Deutschland (Embryonenschutzgesetz) und vielen anderen Ländern streng verboten. Wenn Sie fortfahren, begeben wir uns in internationale Gewässer. Zudem warnen Soziologen: Durch die enormen Kosten dieser Eingriffe riskieren wir eine Gesellschaft, die in 'genetisch Optimierte' und 'Unveränderte' gespalten ist."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center justify-center font-sans">
      <Card className="w-full bg-slate-900 border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <CardHeader className="pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <Fingerprint className="w-8 h-8 text-blue-500" />
            <CardTitle className="text-3xl text-white font-bold tracking-tight">GENESIS CLINIC</CardTitle>
          </div>
          <CardTitle className="text-xl text-blue-400 font-medium">Informed Consent Formular (Ethische Aufklärung)</CardTitle>
          <CardDescription className="text-slate-400 text-base mt-2 leading-relaxed">
            Sehr geehrte werdende Eltern, bevor Sie mit der genetischen Konfiguration Ihres Kindes beginnen, 
            sind wir gesetzlich und moralisch verpflichtet, Sie über die wissenschaftlichen Grenzen, ethischen Dilemmata und gesellschaftlichen Risiken der Keimbahnintervention aufzuklären.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 mt-6 max-h-[55vh] overflow-y-auto custom-scrollbar pr-2">
          {terms.map((term, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-800/60 border border-slate-700/50 shadow-sm transition-all hover:bg-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-900 rounded-lg border border-slate-700/50 flex-shrink-0">
                  {term.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{term.category}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{term.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{term.desc}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-8 p-6 bg-blue-950/20 border border-blue-900/50 rounded-xl relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div className="flex items-start space-x-4">
              <input 
                type="checkbox" 
                id="consent" 
                className="w-6 h-6 mt-1 accent-blue-500 rounded border-slate-600 bg-slate-800 cursor-pointer focus:ring-blue-500 focus:ring-offset-slate-900"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="consent" className="text-sm font-medium leading-relaxed text-slate-200 cursor-pointer select-none">
                Ich bestätige hiermit, die Risiken aus den Bereichen Biologie, Religion und Gesellschaft verstanden zu haben. 
                Mir ist bewusst, dass Änderungen an der menschlichen Keimbahn irreversibel sind und an alle zukünftigen Generationen vererbt werden. 
                Ich übernehme die volle Verantwortung für mein Handeln und willige in den Prozess der genetischen Modifikation ein.
              </label>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between mt-6 pt-6 border-t border-slate-800">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" 
            onClick={onCancel}
          >
            Abbrechen & Klinik verlassen
          </Button>
          <Button 
            className={`w-full sm:w-auto font-bold px-8 transition-all ${
              agreed 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            disabled={!agreed} 
            onClick={onNext}
          >
            Aufklärung verstanden – Starten
          </Button>
        </CardFooter>
      </Card>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 20px; }
      `}</style>
    </div>
  );
}