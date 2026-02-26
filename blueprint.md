# Project Genesis Blueprint

## Overview
An interactive, narrative simulation placing the user in the role of a lead geneticist in 2045. The goal is to create a "perfect" child while navigating complex ethical, political, and biological hurdles. The application uses Next.js App Router, Tailwind CSS, and Google Gemini AI to generate a realistic future prognosis and image of the child at the end.

## Architecture
- **Framework**: Next.js App Router (React)
- **Styling**: Tailwind CSS (Dark Mode, Glassmorphism, Sci-Fi UI with Slate-900 backgrounds and cyan/pink/purple accents)
- **Icons**: Lucide React
- **State Management**: React `useState` / `useReducer` to manage the 14 phases.
- **AI Integration**: Google Gemini API via Server Actions.

## Phases
1. **Intro**: Introduction to the scenario (Year 2045).
2. **World Status (Geopolitics)**: Interactive map/grid analyzing genetic laws.
3. **Politics Quiz (Licensing)**: Knowledge test on genetic laws and ethics.
4. **Parent Interview**: Meeting clients (Vance family), gathering requirements.
5. **Legal Puzzle**: Choosing lab location.
6. **Embryo Screening (PID)**: Selecting from 4 pre-selected embryos.
7. **Biology Lab (CRISPR-Cas9)**: Simulating DNA extraction, editing.
8. **Off-Target Analysis**: Minigame finding errors in a matrix-style code stream.
9. **Ethics Test**: Moral dilemmas.
10. **Media Training**: Reacting to breaking news and PR.
11. **Baby Designer - Phase 1 (Phenotype)**: Visuals (Name, gender, skin tone, eye, hair).
12. **Baby Designer - Phase 2 (Stats)**: Bio-points for Intelligence, Athletics, Immunity, Lifespan.
13. **Baby Designer - Phase 3 (Personality)**: Empathy, Aesthetics, Creativity.
14. **Result**: AI generation of portrait and biography.

## Current Action Plan
1.  Initialize standard UI components (buttons, cards, layout).
2.  Set up the main game loop and state management in `src/app/page.tsx`.
3.  Implement placeholders or initial versions for each of the 14 phases.
4.  Integrate Lucide React for icons.
5.  Set up the dark sci-fi theme in `tailwind.config.ts` or `src/app/globals.css`.
6.  Create a server action for the final Gemini AI generation.