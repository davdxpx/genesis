'use client';
import { useRouter } from "next/navigation";
import { AuthReqPhase } from "@/components/phases/AuthReqPhase";
export default function Phase() {
  const router = useRouter();
  return (
    <AuthReqPhase 
      onNext={() => router.push('/phase/client-io')}
      onCancel={() => router.push('/')} 
    />
  );
}