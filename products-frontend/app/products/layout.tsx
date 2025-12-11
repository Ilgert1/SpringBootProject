"use client"

import { useTokenRefresh} from "@/app/hooks/useTokenRefresh";
import React from "react";

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
    useTokenRefresh(); // Auto-refresh tokens
    return <>{children}</>;
}