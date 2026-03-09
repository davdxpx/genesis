# Blueprint: Phase 12 & 13 - Finalisierung des Baby-Designers

## Status Quo
Das Projekt ist ein immersiver Sci-Fi "Baby Designer" im Next.js App Router.
- **Phase 12 (Stats):** Existiert als Code (`BabyDesignerStatsPhase.tsx`), ist aber in `page.tsx` nur als Placeholder eingebunden. Es fehlt die Anbindung an einen globalen State.
- **Phase 13 (Psyche):** Existiert noch nicht. Soll das "Highlight" werden.

## Plan für Phase 13: "Neuro-Architektur & Persönlichkeits-Matrix"
Diese Phase simuliert die Formung des Charakters und der Psyche. Es ist der letzte Schritt vor der Prognose.

### Konzept
- **Thema:** "Nature vs. Nurture" - Wir kontrollieren beides.
- **Visuals:** Ein "Neurales Netzwerk" oder "Gehirn-Hologramm", das in Echtzeit auf Eingaben reagiert. Pulsierende Synapsen.
- **Interaktion:**
  - **Archetyp-Wähler:** Presets wie "Der Visionär", "Der Beschützer", "Der Stratege".
  - **Psyche-Slider (Neuro-Modulation):**
    - *Konformität vs. Rebellion* (Gehorsam)
    - *Empathie vs. Logik* (Soziale Kompetenz vs. Kühle Ratio)
    - *Risikobereitschaft vs. Sicherheit* (Amygdala-Tuning)
  - **Das ultimative Dilemma:** Ein "Happiness Limiter". (Je glücklicher, desto weniger ambitioniert/erfolgreich).

### Technische Umsetzung
- Neue Komponente: `BabyDesignerPsychologyPhase.tsx`
- Nutzung von `framer-motion` für komplexe Animationen des Gehirns/Netzwerks.
- State-Updates an `page.tsx`.

## Reparatur & Integration (Phase 12 & State)
Damit die Phasen funktionieren, muss `page.tsx` Daten speichern können.

1.  **Global State in `page.tsx`:** Einführung von `const [gameState, setGameState] = useState({...})`.
2.  **Phase 12 Integration:** Ersetzen des Placeholders in `page.tsx` durch die echte `BabyDesignerStatsPhase` und Übergabe der Props.
3.  **Phase 12 Code-Optimierung:** Sicherstellen, dass die SVG-Charts und Buttons auf allen Devices funktionieren.

## Schritte
1.  `page.tsx` vorbereiten (State Management).
2.  `BabyDesignerStatsPhase.tsx` (Phase 12) finalisieren.
3.  `BabyDesignerPsychologyPhase.tsx` (Phase 13) implementieren.
4.  `page.tsx` Phasen-Array aktualisieren.
