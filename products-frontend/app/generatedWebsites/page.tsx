"use client";

import { useEffect, useState } from "react";
import type { business } from "@/app/types/business";
import ContactBusinessModal from "@/app/products/components/ContactBusinessModal";

export default function GeneratedWebsitesPage() {
    const [businesses, setBusinesses] = useState<business[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [contactBusinessId, setContactBusinessId] = useState<number | null>(null);
    const [generatedMessage, setGeneratedMessage] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);


    // Update this if your backend is on a different domain
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://springbootproject-production-9187.up.railway.app";

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const token = localStorage.getItem('access_token');

                if (!token) {
                    throw new Error('Not authenticated');
                }

                const res = await fetch(
                    `${API_BASE}/api/businesses/with-generated-website`,
                    {
                        cache: "no-store",
                        headers: {
                            'Authorization': `Bearer ${token}`  // ✅ Add this!
                        }
                    }
                );

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        window.location.href = '/login';
                        return;
                    }
                    throw new Error("Failed to fetch businesses");
                }

                const data: business[] = await res.json();
                console.log('Loaded generated websites:', data.length); // Debug
                setBusinesses(data ?? []);
            } catch (err: any) {
                console.error('Error loading generated websites:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBusinesses();
    }, []);

    return (
        <main className="bg-white min-h-screen flex flex-col px-6 py-12">
            {/* Page header */}
            <h1 className="bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500 text-transparent bg-clip-text text-3xl md:text-4xl font-bold mb-12">
                Generated Websites Preview
            </h1>

            {/* Loading state */}
            {loading && (
                <div className="text-gray-600 text-lg text-center py-12">
                    Loading businesses...
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="text-red-600 text-lg text-center py-12">
                    Error: {error}
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && businesses.length === 0 && (
                <div className="text-gray-500 text-lg text-center py-12">
                    No businesses have generated websites yet.
                </div>
            )}

            {/* Businesses grid */}
            {!loading && !error && businesses.length > 0 && (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businesses.map((b) => (
                        <div
                            key={b.id}
                            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
                        >
                            {/* Business info */}
                            <div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-2">
                                    {b.name}
                                </h2>
                                {b.address && (
                                    <p className="text-gray-600 text-sm mb-1">{b.address}</p>
                                )}
                                {b.website && (
                                    <a
                                        href={b.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 text-sm hover:underline mb-1 block"
                                    >
                                        {b.website}
                                    </a>
                                )}
                                {b.phone && (
                                    <p className="text-gray-600 text-sm mb-1">Phone: {b.phone}</p>
                                )}
                                {b.business_status && (
                                    <p className="text-gray-500 text-xs mt-2">{b.business_status}</p>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="mt-4 flex flex-col gap-2">
                                {/* Preview button */}
                                <a
                                    href={`/preview/${b.id}`}
                                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-center transition-all"
                                >
                                    Preview Website
                                </a>
                                <button
                                    onClick={() => setContactBusinessId(b.id ?? null)}
                                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                                >
                                    📧 Contact Business
                                </button>
                                {contactBusinessId &&
                                <ContactBusinessModal businessId={contactBusinessId} onClose={() => setContactBusinessId(null)}

                                />
                                }

                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Optional: Use LeadsList for additional functionality */}
            {/* <LeadsList title="Generated Websites" data={businesses} /> */}
        </main>
    );
}
