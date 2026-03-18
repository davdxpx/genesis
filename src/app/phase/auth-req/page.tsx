'use client';

import { useRouter } from "next/navigation";
import { AuthReqPhase } from "@/components/phases/AuthReqPhase";

export default function Phase() {
  const router = useRouter();
  
  return (
    <AuthReqPhase 
      onNext={() => router.push('/phase/client-io')} // Korrigiert: Leitet jetzt zu Phase 4 (client-io) weiter!
      onCancel={() => router.push('/')} 
    />
  );
}