# Projekt "Leben" – Interaktive Simulation: Genmanipulierte Designer-Babys 🧬

Dieses Repository enthält eine interaktive Web-Applikation (Simulation), die als **fächerübergreifendes Schulprojekt** zu den Themenbereichen **Biologie, Politik & Gesellschaft sowie Religion & Ethik** entwickelt wurde.

Die App simuliert eine dystopisch-futuristische "Designer-Baby-Klinik", in der die Nutzer die Konsequenzen moderner Gen-Editierung (z.B. durch die Genschere CRISPR-Cas9) interaktiv erleben. Die Anwendung konfrontiert die Benutzer nicht nur mit den biologischen Möglichkeiten, sondern auch mit den weitreichenden gesellschaftlichen, rechtlichen und moralischen Folgen.

## 🌟 Features / Die Phasen der Simulation

Die App ist in verschiedene Phasen unterteilt, die der Benutzer nacheinander durchläuft:

- **System-Init / Auth-Req:** Authentifizierung und Einführung in das Szenario.
- **Geo-Scan / Loc-Select:** Auswahl des Klinikstandorts (z. B. internationale Gewässer), um gesetzliche Einschränkungen (wie das deutsche Embryonenschutzgesetz) zu umgehen.
- **Client-IO / Parent Interview:** Analyse der Kundenwünsche und Motivationen der "Eltern".
- **PID-Screen (Präimplantationsdiagnostik):** Das ethische Dilemma der Embryonenauswahl anhand genetischer Profile.
- **CRISPR-Lab / Phänotyp & Psyche:** Interaktive Anpassung von äußerlichen Merkmalen (Augenfarbe, Muskelwachstum) und kognitiven Fähigkeiten (Kurzschläfer-Gen, Intelligenz), inklusive Darstellung von Risiken wie der **Pleiotropie** (z. B. höheres Depressionsrisiko bei erhöhtem IQ).
- **QA-Check (Qualitätssicherung):** Simulation von Off-Target-Effekten und ungewollten Mutationen durch die CRISPR-Technologie.
- **Prognosis / World Status:** Evaluation der weitreichenden Folgen (z.B. soziale Spaltung, "Zwei-Klassen-Gesellschaft") für die Zukunft der Menschheit.

## 📚 Wissenschaftliche & Journalistische Quellen

Die App legt großen Wert auf Faktenbasierung. Unter der Route `/quellen` (im System aufrufbar) findet sich ein umfassendes Register echter Quellen, unterteilt in:

1. **Wissenschaftliche Grundlagen (Biologie):** Echte Papers (z.B. die Nobelpreis-Arbeit zu CRISPR von 2012) und journalistische Erklärtexte (Spektrum, National Geographic).
2. **Recht & Gesellschaft (Politik):** Gesetzestexte (ESchG), Berichte über den realen Fall von "He Jiankui" (2018) und Analysen zur globalen Ungleichheit (Michael Sandel).
3. **Religion & Ethik:** Stellungnahmen von Kirchen (EKD, Vatikan), Jüdische & Islamische Bioethik, Transhumanismus-Kritik (Jürgen Habermas) und die These der "Procreative Beneficence".

## 🛠 Tech Stack

Die Anwendung wurde als moderne, responsive Web-App mit einer speziellen "Cyberpunk/Klinik"-Ästhetik entwickelt.

- **[Next.js](https://nextjs.org/) (React Framework):** Für Routing, Server-Side Rendering (falls benötigt) und die gesamte App-Architektur.
- **[Tailwind CSS](https://tailwindcss.com/):** Für das Styling, Layout und die futuristische Farbpalette (`#00f0ff` Cyan, `#050A15` Dark Background).
- **[Framer Motion](https://www.framer.com/motion/):** Für komplexe, weiche Animationen und Hologramm-Effekte während der biologischen Phasen.
- **[Lucide Icons](https://lucide.dev/):** Für die konsistente und verständliche Ikonografie innerhalb des UI.

## 🚀 Getting Started

Um das Projekt lokal auszuführen:

1. **Repository klonen**
2. **Abhängigkeiten installieren:** `npm install`
3. **Entwicklungsserver starten:** Führe `npm start` oder das dev-script aus.
4. Öffne [http://localhost:3000](http://localhost:3000) im Browser.
