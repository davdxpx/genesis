'use client';
import { useRouter } from "next/navigation";
import { AuthReqPhase } from "@/components/phases/AuthReqPhase";
import { useGameState } from "@/lib/GameStateContext";

export default function Phase() {
  const router = useRouter();
  const { updateGameState } = useGameState();
  return (
    <AuthReqPhase 
      onNext={() => router.push('/phase/client-io')}
      onCancel={() => router.push('/')} 
      updateGameState={updateGameState}
    />
  );
}