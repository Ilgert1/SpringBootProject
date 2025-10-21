"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type StrengthLevel = "weak" | "fair" | "good" | "strong";

function getPasswordStrength(password: string): { level: StrengthLevel; score: number } {
    let score = 0;

    if (!password) return { level: "weak", score: 0 };

    // Length checks
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character variety
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1; // special chars

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
                <span className={`text-sm font-medium ${
                    level === "weak" ? "text-red-400" :
                        level === "fair" ? "text-orange-400" :
                            level === "good" ? "text-yellow-400" :
                                "text-green-400"
                }`}>
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
                    roles: "ROLE_BASIC"
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
        <main className="min-h-screen bg-black text-gray-100 grid place-items-center p-6">
            <form onSubmit={onSubmit} className="w-full max-w-sm bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10">
                <h1 className="text-xl font-semibold mb-4">Create account</h1>

                {error && <p className="mb-3 text-red-400 text-sm">{error}</p>}
                {msg && <p className="mb-3 text-green-400 text-sm">{msg}</p>}

                <label className="block text-sm mb-1">Username</label>
                <input
                    className="w-full mb-3 rounded-lg bg-black/40 border border-white/15 px-3 py-2"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete="username"
                />

                <label className="block text-sm mb-1">Password</label>
                <input
                    type="password"
                    className="w-full mb-1 rounded-lg bg-black/40 border border-white/15 px-3 py-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setShowRequirements(true)}
                    onBlur={() => setShowRequirements(false)}
                    autoComplete="new-password"
                />

                {password && <StrengthBar level={strengthLevel} score={strengthScore} />}

                {showRequirements && (
                    <div className="mt-3 text-xs text-gray-400 bg-black/40 p-2 rounded">
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
                    className="w-full mt-5 rounded-lg px-3 py-2 border border-gray-700 text-gray-200 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? "Creating…" : "Sign up"}
                </button>

                <p className="text-sm text-gray-400 mt-3">
                    Already have an account?{" "}
                    <button type="button" className="underline" onClick={() => router.push("/login")}>
                        Log in
                    </button>
                </p>
            </form>
        </main>
    );
}