"use client";

import { useRouter } from "next/navigation";
import { ParentInterviewPhase } from "@/components/phases/ParentInterviewPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <ParentInterviewPhase onNext={() => router.push("/phase/loc-select")} />
    </div>
  );
}