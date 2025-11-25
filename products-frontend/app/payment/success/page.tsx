"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/app/lib/api";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        async function verifyPayment() {
            if (!sessionId) {
                setStatus("error");
                return;
            }

            try {
                // Call backend to verify and activate subscription
                await api('/api/stripe/verify-session', {
                    method: 'POST',
                    body: JSON.stringify({ sessionId })
                });

                setStatus("success");

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    router.push('/products');
                }, 3000);

            } catch (error) {
                console.error('Payment verification failed:', error);
                setStatus("error");
            }
        }

        verifyPayment();
    }, [sessionId, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Verifying your payment...</h2>
                    <p className="text-gray-600 mt-2">Please wait a moment</p>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md">
                    <div className="text-red-600 text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment verification failed</h2>
                    <p className="text-gray-600 mb-6">Please contact support if you were charged.</p>
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md">
                <div className="text-green-600 text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Your subscription has been activated. Redirecting to dashboard...</p>
                <div className="animate-pulse text-blue-600">Please wait...</div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}