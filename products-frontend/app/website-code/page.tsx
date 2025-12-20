"use client";

import React, { useEffect, useState } from "react";
import { business } from "@/app/types/business";

export default function WebsiteCode() {

    const [businesses, setBusinesses] = useState<business[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);


    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (text: any) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy text. Please try again manually.');
        }
    };

    const API_BASE =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://springbootproject-production-9187.up.railway.app";

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const token = localStorage.getItem("access_token");

                if (!token) {
                    throw new Error("Not authenticated");
                }

                const res = await fetch(
                    `${API_BASE}/api/businesses/with-generated-website`,
                    {
                        cache: "no-store",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        window.location.href = "/login";
                        return;
                    }
                    throw new Error("Failed to fetch businesses");
                }

                const data: business[] = await res.json();
                setBusinesses(data ?? []);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBusinesses();
    }, []);

    const expandedBusiness = businesses.find(b => b.id === expandedId);

    return (
        <main className="min-h-screen bg-gradient-to-r from-pink-200 to-blue-200">
            <div className="text-black">
                The following is the code for all the businesses
            </div>

            <section className="flex-1 columns-1 justify-between">
                {businesses.map((b) => (
                    <div key={b.id} className="text-black">
                        <div className="text-blue-500 pt-5">Name: {b.name}</div>
                        <div>Generated Code:</div>

                        <div className="relative mt-5 max-h-25 w-1/2 overflow-auto [scrollbar-width:none] border border-solid border-black rounded-md p-3">
                            {/* EXPAND BUTTON */}
                            <button
                                onClick={() => {
                                    if (b.id !== undefined) setExpandedId(b.id);
                                }}
                                id='button'
                                className="absolute top-3 right-3 p-2
                                bg-white/90 backdrop-blur-sm rounded-lg shadow-md
                                hover:bg-white transition-transform duration-150
                                active:scale-95 z-10
                                "
                                title="Expand preview"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                    />
                                </svg>
                            </button>

                            <span>{b.generatedWebsiteCode}</span>
                        </div>

                        <button
                            onClick={() => copyToClipboard(b.generatedWebsiteCode)}
                            className="text-black border border-solid border-blue-300 rounded-full bg-gradient-to-r from-white to-blue-200"
                        >
                            {isCopied ? "Copied" : "Copy text"}
                        </button>
                    </div>
                ))}

                {/* EXPANDED MODAL */}
                {expandedBusiness && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={() => setExpandedId(null)}
                    >
                        <div
                            className="bg-white rounded-2xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-black">
                                    {expandedBusiness.name}
                                </h3>
                                <button
                                    onClick={() => setExpandedId(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable Code */}
                            <div className="flex-1 overflow-auto p-6">
                                <pre className="text-sm text-black whitespace-pre-wrap">
                                    {expandedBusiness.generatedWebsiteCode}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
