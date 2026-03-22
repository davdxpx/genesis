"use client";
import { useRouter } from "next/navigation";
import { ProjectBriefingPhase } from "@/components/phases/ProjectBriefingPhase";
export default function Phase() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center py-10">
      <ProjectBriefingPhase onNext={() => router.push("/phase/auth-req")} />
    </div>
  );
}