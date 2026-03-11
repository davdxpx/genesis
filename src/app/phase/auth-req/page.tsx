"use client";

import { useRouter } from "next/navigation";
import { PoliticsQuizPhase } from "@/components/phases/PoliticsQuizPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <PoliticsQuizPhase onNext={() => router.push("/phase/client-io")} />
    </div>
  );
}