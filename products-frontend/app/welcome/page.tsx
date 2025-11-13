"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function WelcomePage() {
    const [navOpen, setNavOpen] = useState(false);

    function Logo() {
        return (
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Elevare home">
                <img
                    src="/justLogo.png"
                    alt="Elevare logo"
                    width={40}
                    height={40}
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
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Logo />

                    {/* desktop links */}
                    <div className="hidden md:flex items-center gap-6">

                        <Link
                            href="/signup"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* mobile toggle */}
                    <button
                        className="md:hidden text-white p-2 rounded-md hover:bg-white/10"
                        aria-label="Toggle menu"
                        onClick={() => setNavOpen((s) => !s)}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current">
                            {navOpen ? (
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            ) : (
                                <path
                                    d="M4 7h16M4 12h16M4 17h16"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* mobile menu */}
                {navOpen && (
                    <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
                            <Link href="/login" className="text-white py-2">
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="text-white py-2 bg-blue-500 rounded-lg px-3 text-center"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/50" />

            {/* HERO section */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-24">
                <div className="max-w-4xl w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
                        <span className="block">
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                                Find your leads
                            </span>
                        </span>
                        <span className="block text-white/90 mt-2 text-2xl sm:text-3xl font-medium">
                            With Elevare
                        </span>
                    </h1>

                    <p className="text-gray-200 max-w-2xl mx-auto mb-10">
                        Elevare connects businesses without websites to modern, auto-generated web pages —
                        empowering you to grow your network, boost visibility, and land more clients effortlessly.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/signup"
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md text-lg font-medium transition"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 text-lg font-medium transition"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="absolute bottom-6 w-full z-10 text-center">
                <p className="text-xs text-gray-300/80">
                    © {new Date().getFullYear()} Elevare — Empowering businesses without websites
                </p>
            </footer>
        </main>
    );
}
