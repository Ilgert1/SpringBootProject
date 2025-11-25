"use client";

import { useRouter } from "next/navigation";

export default function PaymentCanceledPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md">
                <div className="text-yellow-600 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Canceled</h2>
                <p className="text-gray-600 mb-6">You canceled the payment. No charges were made.</p>
                <button
                    onClick={() => router.push('/info')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Back to Pricing
                </button>
            </div>
        </div>
    );
}