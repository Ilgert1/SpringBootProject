"use client";

import { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number; // milliseconds per character
    onComplete?: () => void;
}

export default function Typewriter({ text, speed = 30, onComplete }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    // Reset when text changes
    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    return (
        <span className="inline">
            {displayedText}
            <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
        </span>
    );
}