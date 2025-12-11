"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopRightDropdown from "./components/TopRightDropdown";
import type {business} from "@/app/types/business";
import { getCurrentUser } from "@/app/lib/auth";
import { api } from "@/app/lib/api";
import LeadSearchForm from "@/app/products/components/LeadSearchForm";
import GroupedLeadsView from "@/app/products/components/GroupedLeadsView";
import UpgradeModal from "@/app/products/components/UpgradeModal";

type SearchHistory = {
    city: string;
    state: string;
    businessType: string;
    timestamp: Date;
    resultsCount: number;
};

export default function ProductsPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
    const [badgeRefresh, setBadgeRefresh] = useState(0);
    const [leads, setLeads] = useState<business[] | null>(null);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
    const [upgradeModal, setUpgradeModal] = useState<{
        isOpen: boolean;
        limitType: 'search' | 'website' | 'message';
    }>({ isOpen: false, limitType: 'search' });

    useEffect(() => {
        getCurrentUser().then((me) => {
            if (!me) router.replace("/login");
            else setUser(me);
        });

        const saved = localStorage.getItem('searchHistory');
        if (saved) {
            setSearchHistory(JSON.parse(saved));
        }
    }, [router]);

    const leadsNoWeb = leads?.filter(b =>
        !b.website || b.website.trim() === "" || b.website.toUpperCase() === "NO WEBSITE"
    );

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
                if (response.totalFound === 0) {
                    setLeads([]);
                    alert('No businesses found for that search');
                } else {
                    const list = await api<business[]>("/api/businesses");
                    setLeads(list);
                    alert(`Found ${response.totalFound} businesses! ${response.businessesWithoutWebsite} without websites.`);

                    const newSearch: SearchHistory = {
                        city,
                        state,
                        businessType,
                        timestamp: new Date(),
                        resultsCount: response.totalFound
                    };
                    const updated = [newSearch, ...searchHistory.slice(0, 4)];
                    setSearchHistory(updated);
                    localStorage.setItem('searchHistory', JSON.stringify(updated));
                }

                setBadgeRefresh(prev => prev + 1);
            } else {
                throw new Error(response.message);
            }

        } catch (e: any) {
            console.error('Search error:', e);
            const errorMessage = e?.message ?? "Failed to search for leads";

            if (errorMessage.includes("limit reached") || errorMessage.includes("upgrade")) {
                setUpgradeModal({isOpen: true, limitType: 'search'});
            } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
                router.replace("/login");
            } else {
                setError(errorMessage);
                alert(`Error: ${errorMessage}`);
            }
        } finally {
            setSearching(false);
        }
    }

    const [loadingLeads, setLoadingLeads] = useState(false);

    async function fetchAllLeads() {
        try {
            setLoadingLeads(true);
            const list = await api<business[]>("/api/businesses");
            setLeads(list);
        } catch (e: any) {
            if (String(e.message).includes("401") || String(e.message).includes("403")) {
                router.replace("/login");
                return;
            }
            alert("Failed to load leads");
        } finally {
            setLoadingLeads(false);
        }
    }

    function handleExportCSV() {
        if (!leads || leads.length === 0) {
            alert("No leads to export");
            return;
        }

        // Create CSV content
        const headers = ["Name", "Address", "City", "State", "Phone", "Rating", "Total Ratings", "Website"];
        const rows = leads.map(lead => [
            lead.name || "",
            lead.address || "",
            lead.rating || "",
            lead.website || "No Website"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        // Download
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    if (!user) return null;

    return (
        <main className="min-h-screen bg-gray-50">
            <TopRightDropdown />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            Lead Generator
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Find local businesses that need websites and turn them into customers
                        </p>
                    </div>

                    {/* Search Bar Placeholder */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Quick search businesses... (Coming soon)"
                                disabled
                                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                disabled
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-full font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>500+ businesses found</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>AI-powered generation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Instant results</span>
                        </div>
                    </div>
                </div>

                {/* Recent Searches */}
                {searchHistory.length > 0 && !leads && (
                    <div className="mb-12">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Searches</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {searchHistory.map((search, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSearch(search.city, search.state, 5, search.businessType)}
                                    className="group bg-white rounded-lg border border-gray-200 p-4 text-left transition-all hover:shadow-md hover:border-blue-300"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm truncate flex-1">
                                            {search.businessType}
                                        </h3>
                                        <svg
                                            className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition flex-shrink-0 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2 truncate">
                                        {search.city}, {search.state}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>{search.resultsCount} results</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Content: Search Form + Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left: Search Form (2/3 width) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search for Leads</h2>
                            <LeadSearchForm onSearch={handleSearch} searching={searching} />
                        </div>
                    </div>

                    {/* Right: Action Buttons (1/3 width) */}
                    <div className="space-y-4">
                        {/* Load Existing Leads */}
                        <button
                            onClick={fetchAllLeads}
                            disabled={loadingLeads}
                            className="w-full bg-white rounded-lg border-2 border-gray-200 p-6 text-left transition-all hover:border-blue-500 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">Load Existing Leads</h3>
                            <p className="text-sm text-gray-500">
                                {loadingLeads ? "Loading..." : "View your saved leads"}
                            </p>
                        </button>

                        {/* View Analytics */}
                        <button
                            onClick={() => router.push('/analytics')}
                            className="w-full bg-white rounded-lg border-2 border-gray-200 p-6 text-left transition-all hover:border-purple-500 hover:shadow-md group"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">View Analytics</h3>
                            <p className="text-sm text-gray-500">Charts & insights</p>
                        </button>

                        {/* Export & Bulk Actions */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Export CSV */}
                            <button
                                onClick={handleExportCSV}
                                disabled={!leads || leads.length === 0}
                                className="bg-white rounded-lg border-2 border-gray-200 p-4 text-left transition-all hover:border-green-500 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-200 transition">
                                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-1">Export CSV</h3>
                                <p className="text-xs text-gray-500">Download data</p>
                            </button>

                            {/* Bulk Generate */}
                            <button
                                onClick={() => alert("Bulk generate feature coming soon!")}
                                disabled={!leads || leads.length === 0}
                                className="bg-white rounded-lg border-2 border-gray-200 p-4 text-left transition-all hover:border-orange-500 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-orange-200 transition">
                                    <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-1">Bulk Generate</h3>
                                <p className="text-xs text-gray-500">Create websites</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                {/* Results Summary */}
                {leads && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Leads</p>
                                <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 mb-1">No Website</p>
                                <p className="text-3xl font-bold text-blue-600">{leadsNoWeb?.length || 0}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {leads.length > 0 ? Math.round(((leadsNoWeb?.length || 0) / leads.length) * 100) : 0}%
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Leads Table */}
                {leads && leads.length > 0 && (
                    <GroupedLeadsView
                        leads={leads}
                        onActionComplete={() => setBadgeRefresh(prev => prev + 1)}
                    />
                )}
            </div>

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={upgradeModal.isOpen}
                onClose={() => setUpgradeModal({ ...upgradeModal, isOpen: false })}
                limitType={upgradeModal.limitType}
            />
        </main>
    );
}