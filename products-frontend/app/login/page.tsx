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
                <span className="font-semibold text-gray-900 text-lg tracking-tight">Elevare</span>
            </Link>
        );
    }

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex flex-col">
            {/* NAV */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Logo />
                </div>
            </nav>

            {/* HERO + FORM */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-32">
                <div className="max-w-5xl w-full mb-12">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6">
                        <span className="block">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                                Find your leads
                            </span>
                        </span>
                        <span className="block text-gray-800 mt-3 text-3xl sm:text-4xl font-semibold">
                            With Elevare
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Sign in to manage your leads and auto-generated websites. Fast, simple, and reliable.
                    </p>
                </div>

                {/* centered card for the login form */}
                <div className="mx-auto w-full max-w-md">
                    <form onSubmit={onSubmit} className="bg-white p-10 rounded-2xl border border-gray-200 shadow-xl shadow-black/5">
                        <h2 className="text-3xl font-bold mb-2 text-gray-900">Welcome back</h2>
                        <p className="text-gray-500 mb-8">Sign in to your account</p>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl" role="alert" aria-live="polite">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
                        <input
                            aria-label="username"
                            className="w-full mb-6 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={username}
                            onChange={(e) => setU(e.target.value)}
                            autoComplete="username"
                            placeholder="you@business.com"
                        />

                        <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                        <input
                            aria-label="password"
                            className="w-full mb-6 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            type="password"
                            value={password}
                            onChange={(e) => setP(e.target.value)}
                            autoComplete="current-password"
                            placeholder="••••••••"
                        />

                        <button
                            disabled={loading}
                            className="w-full rounded-xl py-3.5 text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed font-semibold shadow-lg shadow-blue-600/20 transition"
                            type="submit"
                            aria-busy={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                        <div className="flex items-center justify-between text-sm text-gray-600 mt-6">
                            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-700 transition">
                                Create account
                            </Link>
                            <Link href="/forgot-password" className="font-medium text-gray-600 hover:text-gray-900 transition">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* footer */}
            <footer className="absolute bottom-8 w-full z-10 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Elevare — Built for local businesses
                </p>
            </footer>
        </main>
    );
}