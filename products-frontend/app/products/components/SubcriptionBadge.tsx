"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, type Me } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

interface SubscriptionBadgeProps{
    refreshTrigger?: number;
}

export default function SubscriptionBadge({ refreshTrigger }: SubscriptionBadgeProps) {
    const router = useRouter();
    const [user, setUser] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .finally(() => setLoading(false));
    }, [refreshTrigger]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const planColors = {
        FREE: {
            bg: "bg-gray-50",
            border: "border-gray-300",
            text: "text-gray-700",
            badge: "bg-gray-100 text-gray-700"
        },
        BASIC: {
            bg: "bg-blue-50",
            border: "border-blue-300",
            text: "text-blue-700",
            badge: "bg-blue-100 text-blue-700"
        },
        PRO: {
            bg: "bg-purple-50",
            border: "border-purple-300",
            text: "text-purple-700",
            badge: "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        },
        ENTERPRISE: {
            bg: "bg-gradient-to-br from-purple-50 to-pink-50",
            border: "border-purple-300",
            text: "text-purple-900",
            badge: "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        }
    };

    const planNames = {
        FREE: "Free Trial",
        BASIC: "Basic Plan",
        PRO: "Pro Plan",
        ENTERPRISE: "Enterprise"
    };

    const colors = planColors[user.subscriptionPlan];

    function getProgressColor(percentage: number) {
        if (percentage > 60) return "bg-green-500";
        if (percentage > 30) return "bg-yellow-500";
        return "bg-red-500";
    }

    function UsageBar({
                          label,
                          used,
                          total,
                          remaining,
                          icon
                      }: {
        label: string;
        used: number;
        total: number;
        remaining: number;
        icon: string;
    }) {
        const isUnlimited = remaining === -1;
        const percentage = isUnlimited ? 100 : Math.round((used / total) * 100);

        return (
            <div>
                <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="text-gray-700 font-medium flex items-center gap-1.5">
                        <span>{icon}</span>
                        {label}
                    </span>
                    <span className="font-semibold text-gray-900">
                        {isUnlimited ? (
                            <span className="text-green-600">∞ Unlimited</span>
                        ) : (
                            <span>{remaining} left</span>
                        )}
                    </span>
                </div>
                {!isUnlimited && (
                    <>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(100 - percentage)}`}
                                style={{ width: `${100 - percentage}%` }}
                            />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {used} / {total} used
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className={`${colors.bg} rounded-xl border-2 ${colors.border} p-6 shadow-sm`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Your Plan
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge}`}>
                    {planNames[user.subscriptionPlan]}
                </span>
            </div>

            {/* Usage Stats */}
            <div className="space-y-4">
                <UsageBar
                    label="Searches"
                    icon="🔍"
                    used={user.searchesUsed}
                    total={user.monthlySearches}
                    remaining={user.searchesRemaining}
                />

                <UsageBar
                    label="Websites"
                    icon="🌐"
                    used={user.websitesGenerated}
                    total={user.monthlyWebsites}
                    remaining={user.websitesRemaining}
                />

                <UsageBar
                    label="Messages"
                    icon="💬"
                    used={user.messagesGenerated}
                    total={user.monthlyMessages}
                    remaining={user.messagesRemaining}
                />
            </div>

            {/* Upgrade Button */}
            {user.subscriptionPlan !== 'ENTERPRISE' && (
                <button
                    onClick={() => router.push('/info')}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                    Upgrade Plan 🚀
                </button>
            )}

            {user.subscriptionPlan === 'ENTERPRISE' && (
                <div className="mt-6 text-center py-2 text-sm text-gray-600">
                    ✨ You have full access to all features
                </div>
            )}
        </div>
    );
}