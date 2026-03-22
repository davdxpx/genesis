"use client";
import { useRouter } from "next/navigation";
import { MediaTrainingPhase } from "@/components/phases/MediaTrainingPhase";
import { useGameState } from "@/lib/GameStateContext";
export default function Phase() {
  const router = useRouter();
  const { gameState, updateGameState } = useGameState();
  return (
    <div className="w-full flex justify-center py-10">
      <MediaTrainingPhase 
        onNext={() => router.push("/phase/phenotype")} 
        gameState={{ ...gameState, updateGameState }} 
      />
    </div>
  );
}