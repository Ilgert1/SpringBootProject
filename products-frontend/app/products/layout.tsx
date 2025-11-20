"use client"

import { useTokenRefresh} from "@/app/hooks/useTokenRefresh";

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
    useTokenRefresh(); // Auto-refresh tokens
    return <>{children}</>;
}