"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [username, setU] = useState("");
    const [password, setP] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!username.trim() || !password) { setError("Enter username and password."); return; }
        try {
            setLoading(true);
            await login(username.trim(), password);
            router.replace("/products"); // go to your main page
        } catch (e: any) {
            setError(e?.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-black">
            <form onSubmit={onSubmit} className="w-full max-w-sm bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h1 className="text-xl font-semibold mb-4">Login</h1>
                {error && <p className="mb-3 text-red-400">{error}</p>}
                <label className="block text-sm mb-1">Username</label>
                <input
                    className="w-full mb-4 rounded-lg bg-black/40 border border-white/15 px-3 py-2"
                    value={username}
                    onChange={e => setU(e.target.value)}
                    autoComplete="username"
                />
                <label className="block text-sm mb-1">Password</label>
                <input
                    className="w-full mb-5 rounded-lg bg-black/40 border border-white/15 px-3 py-2"
                    type="password"
                    value={password}
                    onChange={e => setP(e.target.value)}
                    autoComplete="current-password"
                />
                <button
                    disabled={loading}
                    className="w-full rounded-lg border border-white/20 py-2 hover:bg-white/10 transition"
                    type="submit"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-sm text-gray-300 mt-4">
                    Don’t have an account?{" "}
                    <a href="/signup" className="underline">Sign up</a>
                </p>
            </form>
        </main>
    );
}
