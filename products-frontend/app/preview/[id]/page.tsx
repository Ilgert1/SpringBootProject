"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PreviewPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const [loading, setLoading] = useState(true);

    const renderUrl = `/api/render/${businessId}`;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Preview Header */}
            <div className="bg-gray-900 text-white py-3 px-6 flex items-center justify-between sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <div>
                        <p className="text-sm text-gray-400">Live Preview</p>
                        <p className="font-semibold">Generated Website</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">
                        ✓ Live
                    </span>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading preview...</p>
                    </div>
                </div>
            )}

            {/* iframe Container */}
            <div className="h-[calc(100vh-60px)]">
                <iframe
                    src={renderUrl}
                    className="w-full h-full border-0"
                    title="Website Preview"
                    onLoad={() => setLoading(false)}
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
}