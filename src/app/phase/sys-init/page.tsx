"use client";

import { useRouter } from "next/navigation";
import { IntroPhase } from "@/components/phases/IntroPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <IntroPhase onNext={() => router.push("/phase/geo-scan")} />
    </div>
  );
}