// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeGate() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    router.replace(token ? "/login" : "/welcome");
  }, [router]);

  // Optional: small placeholder while redirecting
  return (
      <main className="min-h-screen grid place-items-center bg-black text-gray-100">
        <div className="opacity-70 text-sm">Loading…</div>
      </main>
  );
}
