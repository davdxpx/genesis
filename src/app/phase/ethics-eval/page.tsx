"use client";
import { useRouter } from "next/navigation";
import { EthicsTestPhase } from "@/components/phases/EthicsTestPhase";
import { useGameState } from "@/lib/GameStateContext";

export default function Phase() {
  const router = useRouter();
  const { updateGameState } = useGameState();
  return (
    <div className="w-full flex justify-center py-10">
      <EthicsTestPhase
        onNext={() => router.push("/phase/pr-control")}
        updateGameState={updateGameState}
      />
    </div>
  );
}