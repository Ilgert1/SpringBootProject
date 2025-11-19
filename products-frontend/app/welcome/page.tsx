"use client";
import React, { useState } from "react";
import Link from "next/link";
import {router} from "next/client";

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
                <span className="font-semibold text-gray-900 text-lg tracking-tight">Elevare</span>
            </Link>
        );
    }

    return (
        <main className="relative min-h-screen bg-white overflow-hidden flex flex-col">
            {/* NAV */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Logo />

                    {/* desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition"
                        >
                            Sign up
                        </Link>
                        <div className="relative group">
                            {/* Visible button */}
                            <div className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition cursor-pointer">
                                Contact Sales
                            </div>

                            {/* Dropdown panel */}
                            <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contacts:</h2>
                                <p className="text-gray-700 text-lg leading-relaxed">
                                    Email: ilgertshehaj6@gmail.com<br />
                                    Phone: 857-348-0687
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* mobile toggle */}
                    <button
                        className="md:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100"
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
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
                            <Link href="/login" className="text-gray-700 py-2 font-medium">
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="text-white py-2.5 bg-blue-600 rounded-xl px-4 text-center font-medium"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/*What we do*/}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20">
                <div className="group relative w-48">
                    {/* Visible tab */}
                    <Link href={'/platform'} className="bg-blue-600 text-white px-4 py-2 rounded-l-xl cursor-pointer text-lg font-semibold shadow-lg shadow-blue-600/20">
                        What We Do
                    </Link>

                    {/* Hidden panel */}
                </div>
            </div>

            {/* HERO section */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-32">
                <div className="max-w-5xl w-full">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-8">
                        <span className="block">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                                Find your leads
                            </span>
                        </span>
                        <span className="block text-gray-800 mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            With Elevare
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Elevare connects businesses without websites to modern, auto-generated web pages,
                        empowering you to grow your network, boost visibility, and land more clients effortlessly.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/info"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 text-lg font-semibold transition"
                        >
                            See Pricing
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-lg font-semibold transition"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="absolute bottom-8 w-full z-10 text-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Elevare — Empowering businesses without websites
                </p>
            </footer>
        </main>
    );
}