"use client";

import { useRouter } from "next/navigation";
import { BabyDesignerStatsPhase } from "@/components/phases/BabyDesignerStatsPhase";
import { useGameState } from "@/lib/GameStateContext";

export default function Phase() {
  const router = useRouter();
  const { gameState, updateGameState } = useGameState();

  return (
    <div className="w-full flex justify-center py-10">
      <BabyDesignerStatsPhase 
        onNext={() => router.push("/phase/psyche")} 
        gameState={{ ...gameState, updateGameState }} 
      />
    </div>
  );
}