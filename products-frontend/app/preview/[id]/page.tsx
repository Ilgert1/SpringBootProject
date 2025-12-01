"use client";
import { useParams, useRouter } from "next/navigation";
import {useState, useEffect, useRef} from "react";
import { api } from "@/app/lib/api";
import Typewriter from "@/app/products/components/Typewriter";

type Message = {
    role: 'user' | 'assistant';
    content: string;
    isTyping?: boolean; //Track is messages should type
};

export default function PreviewPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [openChat, setOpenChat] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const [messagesRemaining, setMessagesRemaining] = useState<number | null>(null);
    const [canCustomize, setCanCustomize] = useState(false);
    const [previewKey, setPreviewKey] = useState(0); // Force iframe refresh

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const renderUrl = `/api/render/${businessId}`;

    //Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior : "smooth"});
    } , [messages])
    // Fetch remaining messages when chat opens
    useEffect(() => {
        if (openChat) {
            fetchRemainingMessages();
        }
    }, [openChat]);

    async function fetchRemainingMessages() {
        try {
            const data = await api<{remaining: number, canCustomize: boolean}>(
                `/api/businesses/${businessId}/customize/remaining`
            );
            setMessagesRemaining(data.remaining);
            setCanCustomize(data.canCustomize);
        } catch (error) {
            console.error('Failed to fetch remaining messages:', error);
        }
    }

    async function handleSend(e: React.FormEvent) {
        e.preventDefault();

        if (!input.trim() || sending) return;

        const userMessage = input.trim();
        setInput("");

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage, isTyping: false }]);
        setSending(true);

        try {
            const response = await api<{
                success: boolean;
                assistantMessage: string;
                updatedCode: string;
                messagesRemaining: number;
            }>(`/api/businesses/${businessId}/customize`, {
                method: 'POST',
                body: JSON.stringify({ message: userMessage })
            });

            // IMMEDIATELY hide loading dots
            setSending(false);

            if (response.success) {
                // Add assistant message with typewriter
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.assistantMessage,
                    isTyping: true // Enable typewriter
                }]);

                // Update remaining count
                setMessagesRemaining(response.messagesRemaining);

                // Refresh preview iframe after typing completes
                setTimeout(() => {
                    setPreviewKey(prev => prev + 1);
                }, response.assistantMessage.length * 30); // Wait for typing to finish
            } else {
                // Show error message (no typing for errors)
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.assistantMessage,
                    isTyping: false
                }]);
            }
        } catch (error: any) {
            setSending(false); // Hide loading
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
                isTyping: false
            }]);
        }
        // REMOVED finally block - we handle setSending(false) earlier now
    }

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
                        onClick={() => setOpenChat(!openChat)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        {openChat ? 'Close Chat' : 'Customize with AI'}
                    </button>
                    <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">✓ Live</span>
                </div>
            </div>

            {/* Main area: preview + optional chat */}
            <div className="relative">
                <div className="flex h-[calc(100vh-60px)]">
                    {/* Preview column */}
                    <div className={`${openChat ? "w-1/2" : "w-full"} h-full relative transition-all duration-300`}>
                        {loading && (
                            <div className="absolute inset-0 bg-white flex items-center justify-center z-20">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Loading preview...</p>
                                </div>
                            </div>
                        )}

                        <iframe
                            key={previewKey}
                            src={renderUrl}
                            className="w-full h-full border-0"
                            title="Website Preview"
                            onLoad={() => setLoading(false)}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>

                    {/* Chat column */}
                    {openChat && (
                        <div className="w-1/2 h-full bg-white border-l flex flex-col">
                            {/* Chat header */}
                            <div className="px-6 py-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">Customize with AI ✨</h3>
                                        {messagesRemaining !== null && (
                                            <p className="text-sm text-purple-100 mt-1">
                                                {messagesRemaining} customizations remaining
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Messages area */}
                            <div className="flex-1 p-6 overflow-auto bg-gray-50">
                                {messages.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Customize Your Website</h4>
                                        <p className="text-gray-600 text-sm max-w-sm mx-auto mb-6">
                                            Ask me to change colors, fonts, text, spacing, or anything else!
                                        </p>
                                        {!canCustomize && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-sm mx-auto">
                                                <p className="text-sm text-yellow-800">
                                                    🔒 Upgrade to <strong>Pro</strong> or <strong>Enterprise</strong> to customize websites with AI!
                                                </p>
                                            </div>
                                        )}
                                        <div className="mt-6 space-y-2 text-left max-w-sm mx-auto">
                                            <p className="text-xs text-gray-500 font-medium">Example requests:</p>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p>• "Make the colors blue and white"</p>
                                                <p>• "Change the hero text to be more exciting"</p>
                                                <p>• "Add more spacing between sections"</p>
                                                <p>• "Make the buttons rounded"</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((msg, idx) => (
                                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                {msg.role === 'assistant' && (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">
                                                        AI
                                                    </div>
                                                )}
                                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                                    msg.role === 'user'
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                                                }`}>
                                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                        {msg.isTyping ? (
                                                            <Typewriter text={msg.content} speed={30} />
                                                        ) : (
                                                            msg.content
                                                        )}
                                                    </p>
                                                </div>
                                                {msg.role === 'user' && (
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm ml-3 shrink-0">
                                                        U
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {sending && (
                                            <div className="flex justify-start">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3 shrink-0">
                                                    AI
                                                </div>
                                                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex gap-1">
                                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                                                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
                                                        </div>
                                                        <span className="text-sm text-gray-600">Customizing your website...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Auto-scroll anchor */}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>
                            {/* Chat input */}
                            <div className="border-t p-4 bg-white">
                                <form onSubmit={handleSend} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={canCustomize ? "Change colors to blue and white..." : "Upgrade to Pro to customize..."}
                                        disabled={sending || !canCustomize || messagesRemaining === 0}
                                        className="flex-1 px-4 py-3 border text-black border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="submit"
                                        disabled={sending || !input.trim() || !canCustomize || messagesRemaining === 0}
                                        className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send
                                    </button>
                                </form>
                                {messagesRemaining === 0 && canCustomize && (
                                    <p className="text-xs text-red-600 mt-2 text-center">
                                        Customization limit reached. Upgrade to Enterprise for more!
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}