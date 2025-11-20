export type Me = {username: string; roles: string[]};

export async function login(username: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    console.log('Login response data:', data);
    // Store token in localStorage
    if (data.accessToken) {
        console.log('Saving token to localStorage:', data.accessToken);
        localStorage.setItem('access_token', data.accessToken);
        console.log('Token saved. Verifying:', localStorage.getItem('access_token')); // Debug log
    } else {
        console.log('No accessToken in response!'); // Debug log
    }

    if(data.refresh_token){
        console.log("Saving refresh token to localStorage");
        localStorage.setItem('refresh_token' , data.refresh_token);
    }else{
        console.log('No refresh_token in response')
    }

}

export async function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
}

export async function getCurrentUser(): Promise<Me | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        },
        cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
}