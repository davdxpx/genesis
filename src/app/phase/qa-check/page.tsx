'use client';

import { useRouter } from "next/navigation";
import { QACheckPhase } from "@/components/phases/QACheckPhase";

export default function Phase() {
  const router = useRouter();
  
  return (
    <QACheckPhase 
      onNext={() => router.push('/phase/ethics-eval')} 
    />
  );
}