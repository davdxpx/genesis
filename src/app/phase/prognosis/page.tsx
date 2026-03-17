"use client";

import { useRouter } from "next/navigation";
import { ResultPhase } from "@/components/phases/ResultPhase";
import { useGameState } from "@/lib/GameStateContext";

export default function Phase() {
  const router = useRouter();
  const { gameState, resetGameState } = useGameState();

  const handleRestart = () => {
    resetGameState();
    router.push("/phase/sys-init");
  };

  return (
    <div className="w-full flex justify-center py-10">
      <ResultPhase 
        onRestart={handleRestart} 
        gameState={gameState} 
      />
    </div>
  );
}