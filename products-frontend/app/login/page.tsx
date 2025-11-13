"use client";
import React, { useState } from "react";
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
            router.replace("/products");
        } catch (e: any) {
            setError(e?.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main
            className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-8"
            style={{backgroundImage: "url('/modern.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'

            }}

        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content wrapper */}
            <div className="relative z-10 w-full max-w-sm">
                <h1 className="text-5xl font-bold text-white mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                    Find your leads
                 </span> With us
                </h1>
                <form onSubmit={onSubmit}
                      className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                    <h2 className="text-xl font-semibold mb-4 text-white">Login</h2>
                    {error && <p className="mb-3 text-red-400">{error}</p>}
                    <label className="block text-sm mb-1 text-white">Username</label>
                    <input
                        className="w-full mb-4 rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white"
                        value={username}
                        onChange={e => setU(e.target.value)}
                        autoComplete="username"
                    />

                    <label className="block text-sm mb-1 text-white">Password</label>
                    <input
                        className="w-full mb-5 rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white"
                        type="password"
                        value={password}
                        onChange={e => setP(e.target.value)}
                        autoComplete="current-password"
                    />

                    <button
                        disabled={loading}
                        className="w-full rounded-lg border border-white/20 py-2 text-white hover:bg-white/10 transition"
                        type="submit"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="text-sm text-gray-300 mt-4 text-center">
                        Don't have an account?{" "}
                        <a href="/signup" className="underline text-blue-400">Sign up</a>
                    </p>
                </form>
            </div>
        </main>
    );
}