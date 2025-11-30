"use client";
import type { business } from "@/app/types/business";
import { useState, useEffect } from "react";
import { api } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { Toaster , toast} from "react-hot-toast";
import UpgradeModal from "@/app/products/components/UpgradeModal";

type LeadsListProps = {
    title: string;
    data: business[];
    onActionComplete?: () => void;
};
type StrengthLevel = "weak" | "fair" | "good" | "strong";

function getLeadStrength(lead: business): { score: number; percent: number; leadStrength: StrengthLevel } {
    // configurable weights
    const PHONE_WEIGHT = 1;       // contactable
    const STATUS_WEIGHT = 2;      // operational
    const RATING_MAX = 4;         // rating scaled 0..RATING_MAX
    const REVIEWS_MAX = 3;        // reviews scale 0..REVIEWS_MAX (log)
    const EXTRA_HIGH_RATING_BONUS = 0.5; // optional small extra for >=4.5

    // compute raw score pieces
    const phoneScore = (lead.phone && lead.phone.trim() !== "") ? PHONE_WEIGHT : 0;

    const statusRaw = (lead.business_status ?? lead.businessStatus ?? "").toString().trim().toLowerCase();
    const statusScore = statusRaw === "operational" ? STATUS_WEIGHT : 0;

    const rating = (lead.rating ?? 0);
    // scale rating linearly to 0..RATING_MAX
    const ratingScore = (rating / 5) * RATING_MAX;

    // small extra for truly excellent ratings
    const highRatingBonus = rating >= 4.5 ? EXTRA_HIGH_RATING_BONUS : 0;

    const total = (lead.total_ratings ?? 0);
    // reviews: use log10 to compress wide ranges, clamp to REVIEWS_MAX
    const reviewsScore = total > 0 ? Math.min(REVIEWS_MAX, Math.floor(Math.log10(total))) : 0;

    // sum and normalize
    const rawScore = phoneScore + statusScore + ratingScore + highRatingBonus + reviewsScore;
    const MAX_SCORE = PHONE_WEIGHT + STATUS_WEIGHT + RATING_MAX + EXTRA_HIGH_RATING_BONUS + REVIEWS_MAX;

    const percent = Math.round((rawScore / MAX_SCORE) * 100);
    let leadStrength: StrengthLevel;
    if (percent >= 60) leadStrength = "strong";
    else if (percent >= 40) leadStrength = "good";
    else if (percent >= 20) leadStrength = "fair";
    else leadStrength = "weak";

    // if you want integer score for display, round rawScore
    return { score: Math.round(rawScore * 10) / 10, percent, leadStrength };
}

function StrengthBar({ level, score }: { level: StrengthLevel; score: number }) {
    // define max possible score used by your algorithm
    const MAX_SCORE = 10; // treat 10 as best case (phone 1 + operational 2 + rating>=2.5 1 + rating>=4 3 + total_ratings>=1000 3)

    const percent = Math.round((Math.min(score, MAX_SCORE) / MAX_SCORE) * 100);

    const colorBg = {
        weak: "bg-red-50",
        fair: "bg-orange-50",
        good: "bg-yellow-50",
        strong: "bg-green-50",
    } as const;

    const colorFill = {
        weak: "bg-red-500",
        fair: "bg-orange-500",
        good: "bg-yellow-500",
        strong: "bg-green-500",
    } as const;

    const label = {
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
    } as const;

    return (
        <div
            className={`w-40 p-2 rounded-md flex items-center gap-2 ${colorBg[level]} border border-gray-100`}
            title={`${label[level]} — score ${score} / ${MAX_SCORE}`}
            aria-label={`Lead strength: ${label[level]} (${score} of ${MAX_SCORE})`}
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-gray-700 truncate">{label[level]}</div>
                    <div className="text-xs font-mono text-gray-600">{score}</div>
                </div>

                <div className="mt-1 h-2 w-full rounded-full bg-white/60 overflow-hidden border border-white/30">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ease-out ${colorFill[level]}`}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}


export default function LeadsList({ title, data , onActionComplete}: LeadsListProps) {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [generating, setGenerating] = useState<number | null>(null);
    const [generatedCode, setGeneratedCode] = useState<Record<number, string>>({});
    const [progress, setProgress] = useState(0);

    const [showUpgradeModal, setShowUpgradeModal] = useState(false);


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

                onActionComplete?.();
            } else {
                throw new Error(result.errorMessage || 'Generation failed');
            }

        } catch (e: any) {
            const errorMsg = e.message || 'Failed to generate website';
            if(errorMsg.includes("Website generation limit reached") || errorMsg.includes("upgrade")){
                setShowUpgradeModal(true);
             }else{
                setError(errorMsg);
                toast('Error: ' + errorMsg);
            }
        } finally {
            setGenerating(null);
        }
    }

    return (
        <>
        <section className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>

            {error && (
                <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-200">
                    {error}
                </div>
            )}

            <div className="space-y-3">
                {data.map((b, i) => (
                    <div key={b.place_id ?? `fallback-${i}`} className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
                        {/* Main Content Row */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Left: Business Info */}
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-lg text-gray-900">{b.name}</div>
                                <div className="text-sm text-gray-600 mt-1">{b.address}</div>
                                {b.website != "NO WEBSITE" && (
                                    <div className="text-sm mt-1">
                                        <a className="text-blue-600 hover:underline" href={b.website} target="_blank" rel="noreferrer">
                                            Go to business website
                                        </a>
                                    </div>
                                )}
                                {b.website === 'NO WEBSITE' &&(
                                    <div className="text-sm mt-1">
                                        <a className="text-blue-600 hover:underline" href={b.website} target="_blank" rel="noreferrer">
                                            {b.website}
                                        </a>
                                    </div>
                                )}
                                <div className="text-sm text-gray-600 mt-1">Phone: {b.phone ?? "N/A"}</div>

                                {/* Business Stats - Mobile */}
                                <div className="flex items-center gap-4 mt-2 lg:hidden">
                                    <div className="text-sm text-gray-600">rating {b.rating ?? "—"}</div>
                                    <div className="text-xs text-gray-500">{b.business_status ?? ""}</div>
                                </div>
                            </div>

                            {/* Right: Actions & Stats */}
                            <div className="flex flex-col gap-3 lg:min-w-[280px]">
                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
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

                                    {/* Preview Button */}
                                    {b.id && generatedCode[b.id] && (
                                        <button
                                            className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all active:scale-95"
                                            onClick={() => router.push(`/preview/${b.id}`)}
                                        >
                                            Preview Website
                                        </button>
                                    )}
                                </div>

                                {/* Loading State */}
                                {generating === b.id && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
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

                                {/* Stats & Strength - Desktop */}
                                <div className="hidden lg:flex items-center justify-between gap-3 pt-3 border-t border-gray-200">
                                    <div className="text-sm space-y-1">
                                        <div className="text-gray-600">rating {b.rating ?? "—"}</div>
                                        <div className="text-xs text-gray-500">{b.business_status ?? ""}</div>
                                    </div>

                                    {/* Strength indicator */}
                                    {(() => {
                                        const { score, leadStrength } = getLeadStrength(b);
                                        return <StrengthBar level={leadStrength} score={score} />;
                                    })()}
                                </div>

                                {/* Strength - Mobile */}
                                <div className="lg:hidden">
                                    {(() => {
                                        const { score, leadStrength } = getLeadStrength(b);
                                        return <StrengthBar level={leadStrength} score={score} />;
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Business Types */}
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

            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                limitType="website"
            />

        </>
    );
}