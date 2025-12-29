"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/lib/api";
import { getCurrentUser } from "@/app/lib/auth";
import type { business } from "@/app/types/business";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import TopRightDropdown from "@/app/products/components/TopRightDropdown";

type LeadsByDate = {
    date: string;
    count: number;
};

type LeadsByLocation = {
    location: string;
    count: number;
};

type BusinessTypeData = {
    name: string;
    value: number;
};

export default function AnalyticsPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
    const [leads, setLeads] = useState<business[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then((me) => {
            if (!me) router.replace("/login");
            else setUser(me);
        });

        fetchLeads();
    }, [router]);

    async function fetchLeads() {
        try {
            setLoading(true);
            const data = await api<business[]>("/api/businesses");
            setLeads(data);
        } catch (error) {
            console.error("Failed to fetch leads:", error);
        } finally {
            setLoading(false);
        }
    }

    // Helper: Extract city from address
    const extractCity = (address?: string): string => {
        if (!address) return 'Unknown';
        // Try to extract city (usually between first comma and second comma)
        const parts = address.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            return parts[1]; // City is typically second part
        }
        return parts[0] || 'Unknown';
    };

    // Helper: Get primary business type from types array
    const getPrimaryType = (types?: string[] | undefined): string => {
        if (!Array.isArray(types) || types.length === 0) {
            return 'Other';
        }

        const filtered = types.filter(
            (t): t is string =>
                typeof t === 'string' &&
                !['point_of_interest', 'establishment'].includes(t.toLowerCase())
        );

        if (filtered.length > 0) {
            return filtered[0]
                .split('_')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
        }

        return 'Other';
    };



    // Calculate metrics
    const totalLeads = leads.length;
    const leadsWithoutWebsite = leads.filter(
        (b) => !b.website || b.website.trim() === "" || b.website.toUpperCase() === "NO WEBSITE"
    ).length;
    const websitesGenerated = leads.filter((b) => b.generatedWebsiteCode).length;
    const successRate = leadsWithoutWebsite > 0
        ? Math.round((websitesGenerated / leadsWithoutWebsite) * 100)
        : 0;
    const revenuePotential = leadsWithoutWebsite * 500;

    // Leads over time (last 30 days)
    const leadsOverTime: LeadsByDate[] = React.useMemo(() => {
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return date.toISOString().split('T')[0];
        });

        const leadsByDate = leads.reduce((acc, lead) => {
            if (lead.createdAt) {
                const date = new Date(lead.createdAt).toISOString().split('T')[0];
                acc[date] = (acc[date] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return last30Days.map(date => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count: leadsByDate[date] || 0
        }));
    }, [leads]);

    // Leads by location (extracted from address)
    const leadsByLocation: LeadsByLocation[] = React.useMemo(() => {
        const locationCount = leads.reduce((acc, lead) => {
            const city = extractCity(lead.address);
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(locationCount)
            .map(([location, count]) => ({ location, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }, [leads]);

    // Business types distribution (from types field)
    const businessTypes: BusinessTypeData[] = React.useMemo(() => {
        const typeCount = leads.reduce((acc, lead) => {
            const type = getPrimaryType(lead.types);
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(typeCount)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6);
    }, [leads]);

    // Rating distribution
    const ratingDistribution = React.useMemo(() => {
        const ratings = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
        leads.forEach(lead => {
            if (lead.rating) {
                const rounded = Math.floor(lead.rating);
                if (rounded >= 1 && rounded <= 5) {
                    ratings[rounded.toString() as keyof typeof ratings]++;
                }
            }
        });
        return Object.entries(ratings).map(([rating, count]) => ({
            rating: `${rating} Stars`,
            count
        })).reverse();
    }, [leads]);

    // Business status breakdown
    const statusBreakdown = React.useMemo(() => {
        const statusCount = leads.reduce((acc, lead) => {
            const status = lead.businessStatus || lead.business_status || 'UNKNOWN';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(statusCount)
            .map(([status, count]) => ({
                status: status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                count
            }))
            .sort((a, b) => b.count - a.count);
    }, [leads]);

    const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];

    if (!user) return null;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <TopRightDropdown />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <button
                            onClick={() => router.push('/products')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Dashboard
                        </button>
                        <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="text-gray-600 mt-2">Insights from your lead generation efforts</p>
                    </div>
                    <button
                        onClick={() => alert("Export PDF feature coming soon!")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Export PDF
                    </button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Leads */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Leads</p>
                        <p className="text-3xl font-bold text-gray-900">{totalLeads}</p>
                        <p className="text-sm text-gray-500 mt-2">All time</p>
                    </div>

                    {/* Websites Generated */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Websites Generated</p>
                        <p className="text-3xl font-bold text-gray-900">{websitesGenerated}</p>
                        <p className="text-sm text-green-600 mt-2">Active</p>
                    </div>

                    {/* Revenue Potential */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Revenue Potential</p>
                        <p className="text-3xl font-bold text-gray-900">
                            ${(revenuePotential / 1000).toFixed(0)}K
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Est. at $500/lead</p>
                    </div>

                    {/* Success Rate */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
                        <p className="text-3xl font-bold text-gray-900">{successRate}%</p>
                        <p className="text-sm text-gray-500 mt-2">Conversion rate</p>
                    </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Leads Over Time */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={leadsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    stroke="#9CA3AF"
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    stroke="#9CA3AF"
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3B82F6', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Leads by Location */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={leadsByLocation}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="location"
                                    tick={{ fontSize: 12 }}
                                    stroke="#9CA3AF"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    stroke="#9CA3AF"
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Business Types */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Types</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={businessTypes}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent = 0}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {businessTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Rating Distribution */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ratingDistribution} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                                <YAxis
                                    dataKey="rating"
                                    type="category"
                                    tick={{ fontSize: 12 }}
                                    stroke="#9CA3AF"
                                    width={80}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="count" fill="#10B981" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Locations Table */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Locations</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Location</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Leads</th>
                                </tr>
                                </thead>
                                <tbody>
                                {leadsByLocation.slice(0, 5).map((loc, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-0">
                                        <td className="py-3 px-4 text-sm text-gray-900">{idx + 1}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{loc.location}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900 text-right font-semibold">
                                            {loc.count}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Top Business Types Table */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Business Types</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">#</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Count</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Potential</th>
                                </tr>
                                </thead>
                                <tbody>
                                {businessTypes.slice(0, 5).map((type, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 last:border-0">
                                        <td className="py-3 px-4 text-sm text-gray-900">{idx + 1}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{type.name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-900 text-right font-semibold">
                                            {type.value}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-green-600 text-right font-semibold">
                                            ${((type.value * 500) / 1000).toFixed(1)}K
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}