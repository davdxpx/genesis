"use client";
import { useRouter } from "next/navigation";
import { BiologyLabPhase } from "@/components/phases/BiologyLabPhase";
export default function Phase() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center py-10">
      <BiologyLabPhase onNext={() => router.push("/phase/qa-check")} />
    </div>
  );
}