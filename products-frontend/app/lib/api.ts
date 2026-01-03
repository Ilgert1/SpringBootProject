// lib/api.ts
import { getAccessToken, refreshAccessToken } from "@/app/lib/auth";

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

export async function api<T = any>(path: string, init: RequestInit = {}): Promise<T> {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://springbootproject-production-9187.up.railway.app";
    const method = (init.method ?? "GET").toUpperCase();

    // Build headers
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const token = getAccessToken();
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${base}${path}`, {
        ...init,
        method,
        credentials: "include",
        headers,
    });

    // Handle 401 - Token expired
    if (res.status === 401) {
        if (isRefreshing) {
            // Wait for the refresh to complete
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then(() => {
                // Retry original request with new token
                return api<T>(path, init);
            });
        }

        isRefreshing = true;

        try {
            const refreshed = await refreshAccessToken();

            if (refreshed) {
                processQueue();
                isRefreshing = false;
                // Retry original request with new token
                return api<T>(path, init);
            } else {
                processQueue(new Error('Token refresh failed'));
                isRefreshing = false;
                // Redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                throw new Error('Session expired');
            }
        } catch (error) {
            processQueue(error);
            isRefreshing = false;
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            throw error;
        }
    }

    if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `Request failed: ${res.status}`);
    }

    const ct = res.headers.get("content-type") || "";
    return (ct.includes("application/json") ? res.json() : undefined) as Promise<T>;
}