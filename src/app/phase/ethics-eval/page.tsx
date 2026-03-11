"use client";

import { useRouter } from "next/navigation";
import { EthicsTestPhase } from "@/components/phases/EthicsTestPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <EthicsTestPhase onNext={() => router.push("/phase/pr-control")} />
    </div>
  );
}