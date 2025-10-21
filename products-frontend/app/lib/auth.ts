// lib/auth.ts — cookie-based auth
export type Me = { username: string; roles: string[] };

export async function login(username: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
}

export async function logout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
}

export async function getCurrentUser(): Promise<Me | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}
