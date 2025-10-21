// lib/api.ts
export async function api<T = any>(path: string, init: RequestInit = {}) {
    const base = process.env.NEXT_PUBLIC_API_URL || "https://springbootproject-production-9187.up.railway.app";
    const method = (init.method ?? "GET").toUpperCase();

    // Build headers but only set Content-Type if you actually send a body
    const headers = new Headers(init.headers);
    if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${base}${path}`, {
        ...init,
        method,
        credentials: "include",
        headers,
    });

    if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `Request failed: ${res.status}`);
    }
    const ct = res.headers.get("content-type") || "";
    return (ct.includes("application/json") ? res.json() : undefined) as Promise<T>;
}
