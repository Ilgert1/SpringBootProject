"use client"
import React, {useState} from "react";
import {motion} from "framer-motion";

{/*MESSAGE CARD*/}
export default function MessageCard({ business, type, message, delay }: {
    business: string;
    type: string;
    message: string;
    delay: number;
}) {
    const [displayedMessage, setDisplayedMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const startTyping = () => {
        if (hasStarted) return; // Only type once
        setHasStarted(true);
        setIsTyping(true);
        setDisplayedMessage("");

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < message.length) {
                setDisplayedMessage(message.substring(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 30); // Typing speed
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay, duration: 0.5 }}
            onViewportEnter={startTyping}
            className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 relative overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-slate-900">{business}</h3>
                    <p className="text-sm text-slate-500">{type}</p>
                </div>
                <div className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    AI Generated
                </div>
            </div>

            {/* Message Display */}
            <div className="bg-slate-50 rounded-xl p-4 min-h-[200px] relative">
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {displayedMessage}
                    {isTyping && (
                        <span className="inline-block w-0.5 h-4 bg-blue-600 ml-1 animate-pulse" />
                    )}
                </p>

                {/* Typing indicator */}
                {isTyping && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-slate-500">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span>Generating...</span>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>✓ Personalized</span>
                <span>✓ Professional</span>
                <span>✓ Ready to send</span>
            </div>
        </motion.div>
    );
}