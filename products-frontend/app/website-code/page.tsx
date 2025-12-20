"use client";

import React, {useEffect, useState} from "react";
import {business} from "@/app/types/business";

export default function WebsiteCode(){

    const [businesses, setBusinesses] = useState<business[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://springbootproject-production-9187.up.railway.app";

    useEffect(() => {
        async function fetchBusinesses() {
            try {
                const token = localStorage.getItem('access_token');

                if (!token) {
                    throw new Error('Not authenticated');
                }

                const res = await fetch(
                    `${API_BASE}/api/businesses/with-generated-website`,
                    {
                        cache: "no-store",
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        window.location.href = '/login';
                        return;
                    }
                    throw new Error("Failed to fetch businesses");
                }

                const data: business[] = await res.json();
                console.log('Loaded generated websites:', data.length); // Debug
                setBusinesses(data ?? []);
            } catch (err: any) {
                console.error('Error loading generated websites:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBusinesses();
    }, []);


    return(
        <main className='min-h-screen bg-gradient-to-r from-pink-200 to-blue-200'>
            <div className='text-black'>The following is the code for all the businesses</div>
            <section className='flex-1 columns-1 justify-between'>
                {businesses.map((b) =>(
                    <div className="text-black ">

                       <div className='text-blue-500 pt-5'> Name: {b.name} </div>
                        <div>Generated Code: </div>
                    <div className='relative mt-5 max-h-25 w-1/2 overflow-auto [scrollbar-width:none] border border-solid border-black rounded-md p-3'>
                        {/*EXAPND BUTTON*/}
                        <div className='absolute top-0 right-0 '>{

                            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>

                        }</div>
                            <span className=''>{b.generatedWebsiteCode}

                            </span>

                    </div>
                        <button className='text-black border border-solid border-blue-300 rounded-full bg-gradient-to-r from-white to-blue-200 bg-transparentcc'>Copy code</button>
                    </div>

                ) ) }
            </section>
        </main>
    )
}