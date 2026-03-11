"use client";

import { useRouter } from "next/navigation";
import { WorldStatusPhase } from "@/components/phases/WorldStatusPhase";

export default function Phase() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center py-10">
      <WorldStatusPhase onNext={() => router.push("/phase/auth-req")} />
    </div>
  );
}