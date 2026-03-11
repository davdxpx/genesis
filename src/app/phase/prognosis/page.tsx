"use client";

import { useRouter } from "next/navigation";
import { ResultPhase } from "@/components/phases/ResultPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <ResultPhase onRestart={() => router.push("/phase/sys-init")} />
    </div>
  );
}