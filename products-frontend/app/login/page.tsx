"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/auth";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [username, setU] = useState("");
    const [password, setP] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }));
        setParticles(newParticles);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
    };

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
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />

            {/* Moving gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />

            {/* Floating particles */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-white/20 animate-float"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}

            {/* Main content */}
            <div
                className="relative z-10 flex items-center justify-center min-h-screen p-8"
                onMouseMove={handleMouseMove}
            >
                <div
                    className="w-full max-w-md transition-transform duration-300 ease-out"
                    style={{
                        transform: `perspective(1000px) rotateX(${mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)`
                    }}
                >
                    {/* Glassmorphic card */}
                    <div className="relative backdrop-blur-2xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden">
                        {/* Glowing border effect on hover */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-[-2px] rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-sm" />
                        </div>

                        <div className="relative z-10">
                            {/* Logo/Icon */}
                            <div className="flex justify-center mb-8">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
                                    <div className="relative bg-gradient-to-br from-cyan-400 to-purple-600 p-4 rounded-full">
                                        <Sparkles className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                                Welcome Back
                            </h1>
                            <p className="text-center text-white/60 mb-8">Enter your credentials to continue</p>

                            {/* Error message */}
                            {error && (
                                <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Form */}
                            <div className="space-y-6">
                                {/* Username field */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-white/80 mb-2">Username</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setU(e.target.value)}
                                            autoComplete="username"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 group-hover:bg-white/10"
                                            placeholder="Enter your username"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-cyan-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 pointer-events-none transition-all duration-500" />
                                    </div>
                                </div>

                                {/* Password field */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setP(e.target.value)}
                                            autoComplete="current-password"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 group-hover:bg-white/10"
                                            placeholder="Enter your password"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-cyan-500/10 group-focus-within:via-purple-500/10 group-focus-within:to-pink-500/10 pointer-events-none transition-all duration-500" />
                                    </div>
                                </div>

                                {/* Remember me & Forgot password */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors">
                                        <input type="checkbox" className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500/50" />
                                        Remember me
                                    </label>
                                    <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                                        Forgot password?
                                    </button>
                                </div>

                                {/* Submit button */}
                                <button
                                    onClick={onSubmit}
                                    disabled={loading}
                                    className="group relative w-full py-3 px-6 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                                >
                                    {/* Button gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:scale-110" />

                                    {/* Button glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Button text */}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </span>
                                </button>
                            </div>

                            {/* Sign up link */}
                            <p className="text-center mt-8 text-white/60">
                                Don't have an account?{' '}
                                <a href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animate-float { animation: float linear infinite; }
            `}</style>
        </main>
    );
}