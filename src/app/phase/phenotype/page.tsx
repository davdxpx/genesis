"use client";

import { useRouter } from "next/navigation";
import { BabyDesignerPhenotypePhase } from "@/components/phases/BabyDesignerPhenotypePhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <BabyDesignerPhenotypePhase onNext={() => router.push("/phase/attributes")} />
    </div>
  );
}