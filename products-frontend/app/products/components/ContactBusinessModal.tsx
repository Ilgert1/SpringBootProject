// app/components/ContactBusinessModal.tsx
"use client";

import { useState, useEffect } from "react";
import type { business } from "@/app/types/business";

interface ContactBusinessModalProps {
    businessId: number;
    onClose: () => void;
}

export default function ContactBusinessModal({ businessId, onClose }: ContactBusinessModalProps) {
    const [businessDetails, setBusinessDetails] = useState<business | null>(null);
    const [generatedMessage, setGeneratedMessage] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://springbootproject-production-9187.up.railway.app";

    // Fetch business details
    useEffect(() => {
        async function fetchBusiness() {
            try {
                const token = localStorage.getItem('access_token');
                const res = await fetch(`${API_BASE}/api/businesses/${businessId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error('Failed to fetch business');
                const data = await res.json();
                setBusinessDetails(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBusiness();
    }, [businessId]);

    // Generate AI message with streaming
    const generateMessage = async () => {
        if(!businessDetails) return;

        setIsGenerating(true);
        setGeneratedMessage("");

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${API_BASE}/api/businesses/generate-outreach-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    businessName: businessDetails.name,
                    businessType: businessDetails.types?.[0] || 'business',
                    address: businessDetails.address
                })
            });

            if (!response.ok) throw new Error('Failed to generate message');

            const fullMessage = await response.text();

            // Simulate typing effect on frontend
            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                if (currentIndex < fullMessage.length) {
                    setGeneratedMessage(fullMessage.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsGenerating(false);
                }
            }, 20);

        } catch (err) {
            console.error('Error generating message:', err);
            setGeneratedMessage("Hi! I came across your business...");
            setIsGenerating(false);
        }
    };

    const sendMessage = () => {
        if (!businessDetails) return;

        const subject = encodeURIComponent(`Professional Website for ${businessDetails.name}`);
        const body = encodeURIComponent(generatedMessage);
        const email = ''; // Add email field if available

        window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-8">
                    <div className="animate-spin text-4xl">⏳</div>
                </div>
            </div>
        );
    }

    if (!businessDetails) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl text-black font-bold mb-2">{businessDetails.name}</h2>
                            <p className="text-gray-600 text-sm">{businessDetails.address}</p>
                            {businessDetails.phone && (
                                <p className="text-blue-600 text-sm mt-1">📞 {businessDetails.phone}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Message Form */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Your Outreach Message
                        </label>
                        <textarea
                            value={generatedMessage}
                            onChange={(e) => setGeneratedMessage(e.target.value)}
                            placeholder="Click 'Generate AI Message' to create a personalized message, or write your own..."
                            className="w-full h-64 p-4 border border-gray-300 text-black rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isGenerating}
                        />
                        {isGenerating && (
                            <div className="flex items-center gap-2 text-sm text-blue-600 mt-2">
                                <div className="animate-spin">⏳</div>
                                <span>Generating personalized message...</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={generateMessage}
                            disabled={isGenerating}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            <span>✨</span>
                            <span>Generate AI Message</span>
                        </button>
                        <button
                            onClick={sendMessage}
                            disabled={!generatedMessage.trim()}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            <span>📧</span>
                            <span>Send Message</span>
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900">
                            <strong>💡 Tip:</strong> The AI will craft a personalized message based on the business details.
                            You can edit it before sending!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}