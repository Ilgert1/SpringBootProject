"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
    const labels = { weak: "Weak", fair: "Fair", good: "Good", strong: "Strong" };
    return (
        <div className="mt-2">
            <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[level]} transition-all`} style={{ width: `${(score / 7) * 100}%` }} />
                </div>
                <span className={`text-sm font-medium ${level === "weak" ? "text-red-600" : level === "fair" ? "text-orange-600" : level === "good" ? "text-yellow-600" : "text-green-600"}`}>
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
    const [email, setEmail] = useState("");
    const [showRequirements, setShowRequirements] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(null);

    const { level: strengthLevel, score: strengthScore } = getPasswordStrength(password);
    const isPasswordStrong = strengthLevel === "strong";

    // small, practical email regex (requires dot-suffix)
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setMsg(null);

        const emailTrim = email.trim().toLowerCase();
        const usernameTrim = username.trim();

        // Email validation — RETURN early if invalid
        if (!emailTrim || !emailRegex.test(emailTrim)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!usernameTrim || !password) {
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
                    email: emailTrim,
                    username: usernameTrim,
                    password,
                    roles: "ROLE_BASIC",
                }),
            });

            if (!res.ok) {
                // try parse JSON first, fallback to text
                const contentType = res.headers.get("content-type") ?? "";
                let serverMessage = `HTTP ${res.status}`;
                if (contentType.includes("application/json")) {
                    const json = await res.json();
                    // common shapes: { message: "..." } or { error: "..." }
                    serverMessage = json?.message || json?.error || JSON.stringify(json);
                } else {
                    const text = await res.text();
                    serverMessage = text || serverMessage;
                }
                setError(serverMessage);
                return;
            }

            toast.success("Account created! You can now log in.");
            router.push("/login");
        } catch (err: any) {
            setError(err?.message ?? "Sign up failed");
        } finally {
            setSubmitting(false);
        }
    }

    const emailIsValid = emailRegex.test(email.trim().toLowerCase());
    const canSubmit = !submitting && username.trim() !== "" && password !== "" && emailIsValid && isPasswordStrong;

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex flex-col items-center justify-center py-32 px-6">
            <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <Link href="/welcome">
                            <span className="text-gray-900 font-semibold text-lg tracking-tight">Elevare</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">
                            Log in
                        </a>
                    </div>
                </div>
            </nav>

            <div className="relative z-10 w-full max-w-md">
                <h1 className="text-5xl font-bold text-gray-900 mb-3 text-center">
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">Join</span>{" "}
                    Elevare
                </h1>
                <p className="text-gray-600 text-center mb-10 text-lg">Create your account and start finding leads</p>

                <form onSubmit={onSubmit} className="bg-white p-10 rounded-2xl border border-gray-200 shadow-xl shadow-black/5" noValidate>
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}
                    {msg && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-green-700 text-sm">{msg}</p>
                        </div>
                    )}

                    <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        aria-label="Email"
                        className="w-full mb-6 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        placeholder="you@business.com"
                    />

                    <label className="block text-sm font-medium mb-2 text-gray-700">Username</label>
                    <input
                        name="username"
                        className="w-full mb-6 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        autoComplete="username"
                        placeholder="elevare1"
                        required
                    />

                    <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="w-full mb-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowRequirements(true)}
                        onBlur={() => setShowRequirements(false)}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        required
                    />

                    {password && <StrengthBar level={strengthLevel} score={strengthScore} />}

                    {showRequirements && (
                        <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <p className="font-semibold mb-2 text-gray-900">Password must include:</p>
                            <ul className="space-y-1.5">
                                <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> At least 8 characters</li>
                                <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Uppercase letters (A-Z)</li>
                                <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Lowercase letters (a-z)</li>
                                <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Numbers (0-9)</li>
                                <li className="flex items-center gap-2"><span className="text-gray-400">✓</span> Special characters (!@#$%^&*)</li>
                            </ul>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="w-full mt-8 rounded-xl py-3.5 text-white bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-blue-600/20"
                    >
                        {submitting ? "Creating…" : "Create account"}
                    </button>

                    <p className="text-sm text-gray-600 mt-6 text-center">
                        Already have an account?{" "}
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-700 transition">Log in</a>
                    </p>
                </form>
            </div>
        </main>
    );
}
