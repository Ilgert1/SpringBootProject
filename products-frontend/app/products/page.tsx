"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopRightDropdown from "./components/TopRightDropdown";
import type {business} from "@/app/types/business";
import { getCurrentUser } from "@/app/lib/auth";
import { api } from "@/app/lib/api";
import LeadsList from "@/app/products/components/LeadsList";
import LeadSearchForm from "@/app/products/components/LeadSearchForm";
import GroupedLeadsView from "@/app/products/components/GroupedLeadsView";

export default function ProductsPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);

    useEffect(() => {
        getCurrentUser().then((me) => {
            if (!me) router.replace("/login");
            else setUser(me);
        });
    }, [router]);

    const [leads, setLeads] = useState<business[] | null>(null);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const leadsNoWeb = leads?.filter(b =>
        !b.website || b.website.trim() === "" || b.website.toUpperCase() === "NO WEBSITE"
    );

    // In your ProductsPage, update the handleSearch function:

    async function handleSearch(city: string, state: string, radius: number, businessType: string) {
        try {
            setSearching(true);
            setError(null);

            const response = await api<{
                success: boolean;
                message: string;
                location: string;
                radius: number;
                businessType: string;
                totalFound: number;
                imported: number;
                businessesWithoutWebsite: number;
            }>("/api/leads/search", {
                method: "POST",
                body: JSON.stringify({
                    city,
                    state,
                    radius,
                    businessType
                })
            });

            if (response.success) {
                // After search completes, fetch the updated leads
                if(response.totalFound === 0){
                    setLeads([]);
                    alert('No businesses found for that search')
                }else {
                    const list = await api<business[]>("/api/businesses");
                    setLeads(list);

                    // Show success message
                    alert(`Found ${response.totalFound} businesses! ${response.businessesWithoutWebsite} without websites.`);
                }
            } else {
                throw new Error(response.message);
            }

        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) {
                router.replace("/login");
                return;
            }
            setError(e?.message ?? "Failed to search for leads");
        } finally {
            setSearching(false);
        }
    }
    //fetch all leads
    const [loadingLeads, setLoadingLeads] = useState(false);
    const [errorLeads, setErrorLeads] = useState<string | null>(null);


    async function fetchAllLeads() {
        try {
            setLoadingLeads(true);
            setErrorLeads(null);

            const list = await api<business[]>("/api/businesses");
            setLeads(list);
        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) {
                router.replace("/login");
                return;
            }
            setErrorLeads(e?.message ?? "Failed to fetch leads");
            setLeads(null);
        } finally {
            setLoadingLeads(false);
        }
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <TopRightDropdown />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">Lead Generator</h1>
                    <p className="text-gray-600">Find local businesses that need your help</p>
                </div>

                {/* Search Form */}
                <LeadSearchForm onSearch={handleSearch} searching={searching} />

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Results Summary */}
                {leads && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Leads</p>
                                <p className="text-2xl font-semibold text-gray-900">{leads.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">No Website</p>
                                <p className="text-2xl font-semibold text-blue-600">{leadsNoWeb?.length || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Conversion Rate</p>
                                <p className="text-2xl font-semibold text-green-600">
                                    {leads.length > 0 ? Math.round(((leadsNoWeb?.length || 0) / leads.length) * 100) : 0}%
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Leads Lists */}
                {leads && leads.length > 0 && (
                    <GroupedLeadsView leads={leads} />
                )}


                {/* Empty State */}
                <div className="flex items-center gap-3 mt-4 mb-4">
                    <button
                        onClick={fetchAllLeads}
                        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-medium"
                        disabled={loadingLeads}
                    >
                        {loadingLeads ? "Loading..." : "Load Existing Leads"}
                    </button>

                    {errorLeads && <span className="text-red-500">{errorLeads}</span>}
                    {leads && <span className="text-green-300">{leads.length} leads loaded</span>}
                </div>
                { !leads && !searching && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads yet</h3>
                            <p className="text-gray-600">Enter a location above to find local businesses</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}