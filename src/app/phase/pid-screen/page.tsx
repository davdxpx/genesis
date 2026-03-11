"use client";

import { useRouter } from "next/navigation";
import { EmbryoScreeningPhase } from "@/components/phases/EmbryoScreeningPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <EmbryoScreeningPhase onNext={() => router.push("/phase/crispr-lab")} />
    </div>
  );
}