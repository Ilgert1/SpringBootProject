"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type StrengthLevel = "weak" | "fair" | "good" | "strong";

function getPasswordStrength(password: string): { level: StrengthLevel; score: number } {
    let score = 0;

    if (!password) return { level: "weak", score: 0 };

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;

    if (score <= 2) return { level: "weak", score };
    if (score <= 4) return { level: "fair", score };
    if (score <= 5) return { level: "good", score };
    return { level: "strong", score };
}

function StrengthBar({ level, score }: { level: StrengthLevel; score: number }) {
    const colors = {
        weak: "bg-red-500",
        fair: "bg-orange-500",
        good: "bg-yellow-500",
        strong: "bg-green-500",
    };

    const labels = {
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
    };

    return (
        <div className="mt-2">
            <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${colors[level]} transition-all`}
                        style={{ width: `${(score / 7) * 100}%` }}
                    />
                </div>
                <span
                    className={`text-sm font-medium ${
                        level === "weak"
                            ? "text-red-400"
                            : level === "fair"
                                ? "text-orange-400"
                                : level === "good"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                    }`}
                >
                    {labels[level]}
                </span>
            </div>
        </div>
    );
}

export default function SignUpPage() {
    const router = useRouter();
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showRequirements, setShowRequirements] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(null);

    const { level: strengthLevel, score: strengthScore } = getPasswordStrength(password);
    const isPasswordStrong = strengthLevel === "strong";

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setMsg(null);

        if (!username.trim() || !password) {
            setError("Username and password are required.");
            return;
        }

        if (!isPasswordStrong) {
            setError("Password must be strong. Include uppercase, lowercase, numbers, and special characters.");
            return;
        }

        try {
            setSubmitting(true);
            const res = await fetch(`${base}/createnewuser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                    roles: "ROLE_BASIC",
                }),
            });

            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || `HTTP ${res.status}`);
            }

            setMsg("Account created! You can now log in.");
            router.push("/login");
        } catch (e: any) {
            setError(e?.message ?? "Sign up failed");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main
            className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center pt-8 p-8"
            style={{
                backgroundImage: "url('/modern.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <img src="/justLogo.png" alt="Elevare" className="w-8 h-8" />
                        <span className="text-white font-semibold text-xl tracking-wide">Elevare</span>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href="/login" className="text-white hover:text-blue-400 transition">
                            Login
                        </a>
                        <a
                            href="/signup"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </nav>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Signup Card */}
            <div className="relative z-10 w-full max-w-sm">
                <h1 className="text-5xl font-bold text-white mb-8 text-center">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                        Join
                    </span>{" "}
                    Elevare
                </h1>

                <form
                    onSubmit={onSubmit}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
                >
                    {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
                    {msg && <p className="mb-3 text-green-400 text-sm">{msg}</p>}

                    <label className="block text-sm mb-1 text-white">Username</label>
                    <input
                        className="w-full mb-4 rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        autoComplete="username"
                    />

                    <label className="block text-sm mb-1 text-white">Password</label>
                    <input
                        type="password"
                        className="w-full mb-1 rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowRequirements(true)}
                        onBlur={() => setShowRequirements(false)}
                        autoComplete="new-password"
                    />

                    {password && <StrengthBar level={strengthLevel} score={strengthScore} />}

                    {showRequirements && (
                        <div className="mt-3 text-xs text-gray-300 bg-black/40 p-2 rounded">
                            <p className="font-semibold mb-1">Password must include:</p>
                            <ul className="space-y-1">
                                <li>✓ At least 8 characters</li>
                                <li>✓ Uppercase letters (A-Z)</li>
                                <li>✓ Lowercase letters (a-z)</li>
                                <li>✓ Numbers (0-9)</li>
                                <li>✓ Special characters (!@#$%^&*)</li>
                            </ul>
                        </div>
                    )}

                    <button
                        disabled={submitting || !isPasswordStrong}
                        className="w-full mt-5 rounded-lg px-3 py-2 border border-white/20 text-white bg-white/10 hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Creating…" : "Sign up"}
                    </button>

                    <p className="text-sm text-gray-300 mt-4 text-center">
                        Already have an account?{" "}
                        <a href="/login" className="underline text-blue-400">
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </main>
    );
}
