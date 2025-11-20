// app/hooks/useTokenRefresh.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useTokenRefresh() {
    const router = useRouter();

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                // Decode JWT to check expiration
                const payload = JSON.parse(atob(token.split('.')[1]));
                const expiresAt = payload.exp * 1000; // Convert to milliseconds
                const now = Date.now();
                const timeUntilExpiry = expiresAt - now;

                console.log(`⏰ Token expires in ${Math.floor(timeUntilExpiry / 1000 / 60)} minutes`);

                // Refresh if expiring in next 5 minutes
                if (timeUntilExpiry < 5 * 60 * 1000 && timeUntilExpiry > 0) {
                    console.log('🔄 Token expiring soon, refreshing...');

                    const refreshToken = localStorage.getItem('refresh_token');
                    if (!refreshToken) {
                        console.log('❌ No refresh token found');
                        localStorage.clear();
                        router.push('/login');
                        return;
                    }

                    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
                    const response = await fetch(`${API_BASE}/auth/refresh`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem('access_token', data.access_token);
                        console.log('✅ Token refreshed successfully');
                    } else {
                        console.error('❌ Token refresh failed');
                        localStorage.clear();
                        router.push('/login');
                    }
                }

                // If already expired, logout
                if (timeUntilExpiry <= 0) {
                    console.log('❌ Token expired, logging out');
                    localStorage.clear();
                    router.push('/login');
                }

            } catch (error) {
                console.error('Error checking token:', error);
            }
        };

        // Check every minute
        const interval = setInterval(checkAndRefreshToken, 60000);

        // Check immediately on mount
        checkAndRefreshToken();

        return () => clearInterval(interval);
    }, [router]);
}