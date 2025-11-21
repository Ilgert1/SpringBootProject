"use client";
import type { business } from "@/app/types/business";
import { useState, useEffect } from "react";
import { api } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { Toaster , toast} from "react-hot-toast";

type LeadsListProps = {
    title: string;
    data: business[];
};

export default function LeadsList({ title, data }: LeadsListProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [generating, setGenerating] = useState<number | null>(null);
    const [generatedCode, setGeneratedCode] = useState<Record<number, string>>({});
    const [progress, setProgress] = useState(0);

    // Simulate progress during generation
    useEffect(() => {
        if (generating) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) return prev;
                    return prev + Math.random() * 3;
                });
            }, 500);
            return () => clearInterval(interval);
        } else {
            setProgress(0);
        }
    }, [generating]);

    async function generateWeb(business: business) {
        try {
            setGenerating(business.id!);
            setError(null);

            const result = await api<{
                businessId: number;
                businessName: string;
                generatedCode: string;
                success: boolean;
                errorMessage?: string;
            }>(`/api/businesses/${business.id}/generate-website`, {
                method: 'POST',
            });

            if (result.success && result.generatedCode) {
                setGeneratedCode(prev => ({
                    ...prev,
                    [business.id!]: result.generatedCode
                }));
                setProgress(100);
                setTimeout(() => {
                    toast('Website generated successfully!');
                }, 300);
            } else {
                throw new Error(result.errorMessage || 'Generation failed');
            }

        } catch (e: any) {
            const errorMsg = e.message || 'Failed to generate website';
            setError(errorMsg);
            toast('Error: ' + errorMsg);
        } finally {
            setGenerating(null);
        }
    }

    return (
        <section className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>

            {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-200">
                    {error}
                </div>
            )}

            <div className="grid gap-3">
                {data.map((b, i) => (
                    <div key={b.place_id ?? `fallback-${i}`} className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="font-medium text-lg text-gray-900">{b.name}</div>
                                <div className="text-sm text-gray-600 mt-1">{b.address}</div>
                                {b.website && (
                                    <div className="text-sm mt-1">
                                        <a className="text-blue-600 hover:underline" href={b.website} target="_blank" rel="noreferrer">
                                            {b.website}
                                        </a>
                                    </div>
                                )}
                                <div className="text-sm text-gray-600 mt-1">Phone: {b.phone ?? "N/A"}</div>
                            </div>

                            <div className="text-right text-sm space-y-2 ml-4">
                                <div>
                                    <button
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                            generating === b.id
                                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                                        }`}
                                        type="button"
                                        onClick={() => b.id && generateWeb(b)}
                                        disabled={generating === b.id}
                                    >
                                        {generating === b.id ? 'Generating...' : 'Generate Website'}
                                    </button>
                                </div>

                                {/* Loading State */}
                                {generating === b.id && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                                        <div className="flex items-start gap-2 mb-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mt-0.5"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-blue-900">Claude AI is writing code...</p>
                                                <p className="text-xs text-blue-700 mt-0.5">Creating professional website</p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-200 rounded-full h-2 w-full overflow-hidden">
                                            <div
                                                className="bg-blue-600 h-full transition-all duration-500 ease-out"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-blue-600 mt-1.5">Usually takes 15-30 seconds</p>
                                    </div>
                                )}

                                {/* Preview Button */}
                                {b.id && generatedCode[b.id] && (
                                    <div>
                                        <button
                                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all active:scale-95"
                                            onClick={() => router.push(`/preview/${b.id}`)}
                                        >
                                            Preview Website
                                        </button>
                                    </div>
                                )}

                                <div className="pt-2 border-t border-gray-200 mt-2">
                                    <div className="text-gray-600">Rating: {b.rating ?? "—"}</div>
                                    <div className="text-gray-600">Reviews: {b.total_ratings ?? "—"}</div>
                                    <div className="text-xs text-gray-500">{b.business_status ?? ""}</div>
                                </div>
                            </div>
                        </div>
                        {Array.isArray(b.types) && b.types.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="flex flex-wrap gap-1">
                                    {b.types.slice(0, 3).map((type, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                            {type.replace(/_/g, ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}