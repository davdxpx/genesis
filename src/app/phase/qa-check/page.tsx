"use client";

import { useRouter } from "next/navigation";
import { OffTargetAnalysisPhase } from "@/components/phases/OffTargetAnalysisPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <OffTargetAnalysisPhase onNext={() => router.push("/phase/ethics-eval")} />
    </div>
  );
}