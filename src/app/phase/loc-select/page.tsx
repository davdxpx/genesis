"use client";

import { useRouter } from "next/navigation";
import { LegalPuzzlePhase } from "@/components/phases/LegalPuzzlePhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <LegalPuzzlePhase onNext={() => router.push("/phase/pid-screen")} />
    </div>
  );
}