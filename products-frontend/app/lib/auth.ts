export type Me = {
    username: string;
    roles: string[];
    subscriptionPlan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
    subscriptionStatus: string;
    searchesUsed: number;
    websitesGenerated: number;
    messagesGenerated: number;
    searchesRemaining: number;
    websitesRemaining: number;
    messagesRemaining: number;
    monthlySearches: number;
    monthlyWebsites: number;
    monthlyMessages: number;
};

export async function login(username: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://springbootproject-production-9187.up.railway.app'}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    console.log('Login response data:', data);

    // Store tokens
    if (data.accessToken) {
        console.log('Saving access token to localStorage');
        localStorage.setItem('access_token', data.accessToken);
    }

    if (data.refreshToken) {
        console.log('Saving refresh token to localStorage');
        localStorage.setItem('refresh_token', data.refreshToken);
    }
}

export async function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://springbootproject-production-9187.up.railway.app'}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (e) {
        console.error('Logout failed:', e);
    }
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
}

export function getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
}

// NEW: Refresh the access token
export async function refreshAccessToken(): Promise<boolean> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        console.log('No refresh token available');
        return false;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://springbootproject-production-9187.up.railway.app'}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        });

        if (!res.ok) {
            console.log('Token refresh failed');
            // Clear tokens if refresh fails
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return false;
        }

        const data = await res.json();

        if (data.accessToken) {
            console.log('Access token refreshed successfully');
            localStorage.setItem('access_token', data.accessToken);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return false;
    }
}

export async function getCurrentUser(): Promise<Me | null> {
    const token = getAccessToken();

    if (!token) {
        return null;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://springbootproject-production-9187.up.railway.app'}/auth/me`, {
        credentials: "include",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
}