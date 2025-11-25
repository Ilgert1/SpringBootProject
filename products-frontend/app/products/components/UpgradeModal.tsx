"use client";

import { useRouter } from "next/navigation";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    limitType: 'search' | 'website' | 'message';
}

export default function UpgradeModal({ isOpen, onClose, limitType }: UpgradeModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    const messages = {
        search: {
            title: '🔍 Search Limit Reached',
            message: 'You\'ve used all your searches for this month.',
            feature: 'Continue searching for leads'
        },
        website: {
            title: '🌐 Website Generation Limit Reached',
            message: 'You\'ve generated all your websites for this month.',
            feature: 'Generate more websites'
        },
        message: {
            title: '💬 Message Generation Limit Reached',
            message: 'You\'ve generated all your messages for this month.',
            feature: 'Generate more outreach messages'
        }
    };

    const { title, message, feature } = messages[limitType];

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="text-5xl mb-4">🚀</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600 mb-6">{message}</p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-900">
                            <strong>Upgrade to continue:</strong> {feature} and unlock all premium features!
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                            Maybe Later
                        </button>
                        <button
                            onClick={() => router.push('/info')}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            View Plans
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}