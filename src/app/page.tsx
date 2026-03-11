"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first phase on initial load
    router.replace("/phase/sys-init");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050A15] text-[#00f0ff] font-mono">
      <div className="animate-pulse flex items-center gap-4">
        <div className="w-4 h-4 rounded-full bg-[#00f0ff]" />
        INITIALIZING GENESIS OS...
      </div>
    </div>
  );
}