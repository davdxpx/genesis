"use client";
import { useRouter } from "next/navigation";
import { BabyDesignerPsychologyPhase } from "@/components/phases/BabyDesignerPsychologyPhase";
import { useGameState } from "@/lib/GameStateContext";
export default function Phase() {
  const router = useRouter();
  const { gameState, updateGameState } = useGameState();
  return (
    <div className="w-full flex justify-center py-10">
      <BabyDesignerPsychologyPhase 
        onNext={() => router.push("/phase/prognosis")} 
        gameState={{ ...gameState, updateGameState }} 
      />
    </div>
  );
}