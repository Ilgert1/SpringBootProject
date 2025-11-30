"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as process from "node:process";
// removed: import { input } from "framer-motion/client";

export default function PreviewPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const [loading, setLoading] = useState(true);
    const [openChat, setOpenChat] = useState(false);

    // small tweak: messages should be an array (for UI later)
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const API_BASE =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://springbootproject-production-9187.up.railway.app";
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
                    <button
                        onClick={() => setOpenChat(true)}
                        className="px-3 text-black py-1 bg-white rounded-full text-sm font-medium hover:bg-gray-200"
                    >
                        Customize Template
                    </button>
                    <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">✓ Live</span>
                </div>
            </div>

            {/* Main area: preview + optional chat */}
            <div className="relative">
                <div className="flex h-[calc(100vh-60px)]">
                    {/* Preview column - full width when chat closed, half when open */}
                    <div className={`${openChat ? "w-1/2" : "w-full"} h-full relative transition-all duration-200`}>
                        {/* Loading overlay (covers preview only) */}
                        {loading && (
                            <div className="absolute inset-0 bg-white flex items-center justify-center z-20">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading preview...</p>
                                </div>
                            </div>
                        )}

                        <iframe
                            src={renderUrl}
                            className="w-full h-full border-0"
                            title="Website Preview"
                            onLoad={() => setLoading(false)}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>

                    {/* Chat column - only rendered when openChat is true */}
                    {openChat && (
                        <div className="w-1/2 h-full bg-white border-l z-10 flex flex-col">
                            {/* Chat header / close */}
                            <div className="px-4 py-3 border-b flex items-center justify-between">
                                <div className="font-semibold text-black">Customize Template</div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setOpenChat(false)}
                                        className="px-3 py-1 text-sm rounded-full text-black hover:bg-gray-100"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>

                            {/* MESSAGES AREA (flex-1 so it grows and is scrollable) */}
                            <div className="flex-1 p-6 overflow-auto">
                                {/* example placeholder messages */}
                                <div className="space-y-3">
                                    {messages.length === 0 ? (
                                        <div className="text-center text-black">Coming soon...</div>
                                    ) : (
                                        messages.map((m, i) => (
                                            <div key={i} className="text-gray-800">
                                                {m}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* CHAT INPUT BAR - sibling of messages, so it sits at the bottom */}
                            <div className="border-t px-4 py-3 bg-gray-200 sticky bottom-0">
                                <form
                                    className="flex gap-3 items-center"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // temporary non-functional handler - just push to local messages for demo
                                        if (input.trim() === "") return;
                                        setMessages((prev) => [...prev, input.trim()]);
                                        setInput("");
                                    }}
                                >
                                    <input
                                        value={input}
                                        placeholder="Type a message here...coming soon"
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1 text-black rounded-full px-4 py-2 border focus:outline-none focus:ring focus:ring-blue-200"
                                        aria-label="message input"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
