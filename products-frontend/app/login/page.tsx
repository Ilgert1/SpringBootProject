"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [username, setU] = useState("");
    const [password, setP] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!username.trim() || !password) {
            setError("Enter username and password.");
            return;
        }
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

    function Logo() {
        return (
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Elevare home">
                <img
                    src="/justLogo.png"
                    alt="Elevare logo"
                    width={36}
                    height={36}
                    loading="lazy"
                    className="w-9 h-9 object-contain"
                />
                <span className="font-semibold text-white text-lg tracking-wide">Elevare</span>
            </Link>
        );
    }

    return (
        <main
            className="relative min-h-screen overflow-hidden flex flex-col"
            style={{
                backgroundImage: "url('/modern.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            {/* NAV */}
            <nav className="fixed top-0 left-0 right-0 z-50 items-center">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Logo />

                    {/* desktop links */}

                    {/* mobile toggle */}

                </div>
                {/* mobile menu */}
            </nav>

            {/* overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" />

            {/* HERO + FORM */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-24">
                <div className="max-w-4xl w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4">
            <span className="block">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                Find your leads
              </span>
            </span>
                        <span className="block text-white/90 mt-2 text-2xl sm:text-3xl font-medium">With Elevare</span>
                    </h1>

                    <p className="text-gray-200 max-w-2xl mx-auto mb-8">
                        Sign in to manage your leads and auto-generated websites. Fast, simple, and reliable.
                    </p>

                    {/* centered glass card for the login form */}
                    <div className="mx-auto mt-6 w-full max-w-sm">
                        <form onSubmit={onSubmit} className="bg-white/8 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-3 text-white">Welcome back</h2>

                            {error && (
                                <p className="mb-3 text-red-400" role="alert" aria-live="polite">
                                    {error}
                                </p>
                            )}

                            <label className="block text-sm mb-1 text-gray-200">Username</label>
                            <input
                                aria-label="username"
                                className="w-full mb-4 rounded-lg bg-black/40 border border-white/12 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={username}
                                onChange={(e) => setU(e.target.value)}
                                autoComplete="username"
                                placeholder="you@business.com"
                            />

                            <label className="block text-sm mb-1 text-gray-200">Password</label>
                            <input
                                aria-label="password"
                                className="w-full mb-5 rounded-lg bg-black/40 border border-white/12 px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                type="password"
                                value={password}
                                onChange={(e) => setP(e.target.value)}
                                autoComplete="current-password"
                                placeholder="••••••••"
                            />

                            <button
                                disabled={loading}
                                className="w-full rounded-lg py-2 text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-60 transition"
                                type="submit"
                                aria-busy={loading}
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </button>

                            <div className="flex items-center justify-between text-sm text-gray-300 mt-4">
                                <Link href="/signup" className="underline text-blue-300">
                                    Create account
                                </Link>
                                <Link href="/forgot-password" className="underline">
                                    Forgot password?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className="absolute bottom-6 w-full z-10 text-center">
                <p className="text-xs text-gray-300/80">© {new Date().getFullYear()} Elevare — Built for local businesses</p>
            </footer>
        </main>
    );
}
