# Genesis Project - Designer Baby Web App (Schulprojekt)

## 1. Overview & Purpose
Diese Web-App simuliert eine fiktive Klinik für "Genmanipulierte Designer-Babys" (CRISPR/Cas9). Sie dient als interaktives digitales Begleitstück für ein Schulprojekt und deckt die Fächer **Biologie, Religion und Politik & Gesellschaft** ab.
Ziel ist es, den Nutzer spielerisch über die Möglichkeiten, Risiken und ethischen Dilemmata der Keimbahnintervention aufzuklären und direkt an das zugehörige Plakat anzuknüpfen.

## 2. Kriterien aus dem Bewertungsbogen & Aufgabenstellung
- **Biologie:** Fundierte Erklärung der wissenschaftlichen Grundlagen (CRISPR/Cas9), Möglichkeiten/Grenzen der Veränderung menschlicher Gene und Risiken (z.B. Off-Target-Effekte, Pleiotropie).
- **Religion:** Differenzierte Betrachtung ethischer und religiöser Fragestellungen ("Eingriff in die Schöpfung", "Spielen wir Gott?"), moralische Vertretbarkeit, Verantwortung von Wissenschaftlern, Eltern und Gesellschaft.
- **Politik & Gesellschaft:** Klare Analyse der rechtlichen Rahmenbedingungen (z.B. Embryonenschutzgesetz in DE vs. internationale Regelungen) und der gesellschaftlichen Folgen (z.B. Zwei-Klassen-Gesellschaft, Gerontokratie).
- **Kreativität & Präsentation:** Ästhetische, interaktive Umsetzung (Ausstellungsstück), die zum Nachdenken anregt und alle Perspektiven vereint.

## 3. Phasen-Umbau (Action Plan)
Die App bestand ursprünglich zu großen Teilen aus fiktiven Sci-Fi-Rätseln ohne echten Lerneffekt. Diese werden nun systematisch zu edukativen, interaktiven Stationen umgebaut, die direkt auf die Bewertungskriterien einzahlen.

### Phase 1: Informed Consent (`/phase/auth-req`) - ✅ DONE
- **Vorher:** Sinnlose Sci-Fi-Authentifizierungsfragen.
- **Jetzt:** Eine ethische "Einverständniserklärung" (Informed Consent). Der Nutzer muss die echten biologischen, religiösen und politischen Risiken lesen und aktiv akzeptieren, bevor er die Klinik betreten darf.

### Phase 2: Die genetische Konfiguration (`/phase/attributes`, `/phase/psyche` etc.) - ⏳ NEXT
- Hier "designt" der Nutzer das Baby (z. B. Intelligenz, Immunsystem, Telomerase-Aktivierung für Langlebigkeit).
- **Ziel:** Jede Auswahl triggert sofortiges, fachspezifisches Feedback.
  - *Biologie-Feedback:* Warnung vor Pleiotropie (z.B. hohe Intelligenz korreliert mit Depressionsrisiko).
  - *Politik-Feedback:* Hinweis, dass solche Eingriffe in vielen Ländern illegal sind.

### Phase 3: Die Konsequenzen & PR (`/phase/prognosis`, `/phase/pr-control`) - ⏳ PLANNED
- Eine Simulation der Zukunft des designten Kindes. Konfrontation mit der Gesellschaft, Presse (Stellvertretend für kritische Fragen der Lehrkräfte) und rechtlichen Hürden.

## 4. GitHub & Deployment
- **Repository:** https://github.com/davdxpx/genesis
- Regelmäßige Commits, um den Arbeitsfortschritt für die Lehrkräfte (falls gefragt) zu dokumentieren.