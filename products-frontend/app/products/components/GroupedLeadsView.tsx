"use client";
import { useState } from "react";
import type { business } from "@/app/types/business";
import LeadsList from "./LeadsList";

type GroupedLeadsViewProps = {
    leads: business[];
};

// Format date nicely
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return "Today";
    if (date.getTime() === yesterday.getTime()) return "Yesterday";

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Extract city, state from address
// Extract city, state from address - SIMPLIFIED
function extractCityState(address: string | undefined): string {
    if (!address) return "";

    // Example: "123 Main St, Boston, MA 02118, USA"
    // Split by comma and get second-to-last (city) and last with state
    const parts = address.split(',').map(p => p.trim());

    if (parts.length < 2) return parts[0] || "";

    // Get city (usually second to last or third to last)
    let city = "";
    let state = "";

    // Find the part with 2-letter state code
    for (let i = parts.length - 1; i >= 0; i--) {
        const stateMatch = parts[i].match(/\b([A-Z]{2})\b/);
        if (stateMatch) {
            state = stateMatch[1];
            // City is the part before the state
            if (i > 0) {
                city = parts[i - 1];
            }
            break;
        }
    }

    if (city && state) {
        return `${city}, ${state}`;
    }

    // Fallback: return second part if it exists
    return parts[parts.length >= 2 ? parts.length - 2 : 0];
}

// Normalize city names (Dorchester → Boston, etc)
function normalizeCity(cityState: string): string {
    // Map neighborhoods to main cities
    const neighborhoods: Record<string, string> = {
        'Dorchester': 'Boston, MA',
        'Dorchester, MA': 'Boston, MA',
        'Weymouth': 'Weymouth, MA',
        'Braintree': 'Braintree, MA',
        'Quincy': 'Quincy, MA',
        'Milton': 'Milton, MA',
        'Hingham': 'Hingham, MA',
        'Boston': 'Boston, MA'
    };

    return neighborhoods[cityState] || cityState;
}

// Filter out generic/useless business types
function getMeaningfulTypes(types: string[] | string | undefined): string[] {
    if (!types) return [];

    // Convert to array if it's a comma-separated string from database
    let typesArray: string[];
    if (typeof types === 'string') {
        typesArray = types.split(',').map(t => t.trim());
    } else if (Array.isArray(types)) {
        typesArray = types;
    } else {
        return [];
    }

    // Only filter out the MOST generic types
    const genericTypes = [
        'point_of_interest',
        'establishment',
        'food', // Too generic
        'store', // Too generic
        'place',
        'political',
        'locality'
    ];

    return typesArray.filter(type =>
        type && // not empty
        type.length > 0 && // has content
        !genericTypes.includes(type) // not generic
    );
}

// Format type names for display
function formatTypeName(type: string): string {
    return type
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Group leads by date
function groupByRelativeDate(leads: business[]): Record<string, business[]> {
    const grouped: Record<string, business[]> = {
        "Today": [],
        "Yesterday": [],
        "This Week": [],
        "This Month": [],
        "Older": []
    };

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setMonth(monthStart.getMonth() - 1);

    leads.forEach(lead => {
        if (!lead.createdAt) {
            grouped["Older"].push(lead);
            return;
        }

        const createdDate = new Date(lead.createdAt);

        if (createdDate >= todayStart) {
            grouped["Today"].push(lead);
        } else if (createdDate >= yesterdayStart) {
            grouped["Yesterday"].push(lead);
        } else if (createdDate >= weekStart) {
            grouped["This Week"].push(lead);
        } else if (createdDate >= monthStart) {
            grouped["This Month"].push(lead);
        } else {
            grouped["Older"].push(lead);
        }
    });

    // Remove empty groups
    Object.keys(grouped).forEach(key => {
        if (grouped[key].length === 0) {
            delete grouped[key];
        }
    });

    return grouped;
}

export default function GroupedLeadsView({ leads }: GroupedLeadsViewProps) {
    const [showHotLeads, setShowHotLeads] = useState(false);
    const [showAllBusinesses, setShowAllBusinesses] = useState(false);
    const [expandedHotDates, setExpandedHotDates] = useState<Set<string>>(new Set());
    const [expandedAllDates, setExpandedAllDates] = useState<Set<string>>(new Set());

    // Hot leads filters (removed typeFilter)
    const [locationFilter, setLocationFilter] = useState<string>("all");
    const [dateFilter, setDateFilter] = useState<string>("all");

    // Split into hot leads vs all
    const allHotLeads = leads.filter(b =>
        !b.website || b.website.trim() === "" || b.website.toUpperCase() === "NO WEBSITE"
    );

    // Get unique locations for filter (city, state only)
    const uniqueLocations = Array.from(new Set(
        leads.map(b => normalizeCity(extractCityState(b.address))).filter(Boolean)
    )).sort();

    // Apply filters to hot leads
    const filteredHotLeads = allHotLeads.filter(b => {
        // Location filter
        if (locationFilter !== "all") {
            const businessLocation = normalizeCity(extractCityState(b.address));
            if (businessLocation !== locationFilter) return false;
        }




        // Date filter
        if (dateFilter !== "all" && b.createdAt) {
            const createdDate = new Date(b.createdAt);
            const now = new Date();

            // Normalize dates to midnight for comparison
            const leadDate = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate());
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            if (dateFilter === "today") {
                if (leadDate.getTime() !== todayStart.getTime()) return false;
            } else if (dateFilter === "yesterday") {
                const yesterdayStart = new Date(todayStart);
                yesterdayStart.setDate(yesterdayStart.getDate() - 1);
                if (leadDate.getTime() !== yesterdayStart.getTime()) return false;
            } else if (dateFilter === "week") {
                const weekStart = new Date(todayStart);
                weekStart.setDate(weekStart.getDate() - 7);
                if (leadDate < weekStart) return false;
            } else if (dateFilter === "month") {
                const monthStart = new Date(todayStart);
                monthStart.setMonth(monthStart.getMonth() - 1);
                if (leadDate < monthStart) return false;
            }
        }
        return true;
    });

    // Group both by date
    // Group both by RELATIVE date (not absolute)
    const hotLeadsByDate = groupByRelativeDate(filteredHotLeads);
    const allLeadsByDate = groupByRelativeDate(leads);

// Get date groups in order
    const dateOrder = ["Today", "Yesterday", "This Week", "This Month", "Older"];
    const hotDates = dateOrder.filter(date => hotLeadsByDate[date]);
    const allDates = dateOrder.filter(date => allLeadsByDate[date]);

    function toggleHotDate(date: string) {
        const newSet = new Set(expandedHotDates);
        if (newSet.has(date)) newSet.delete(date);
        else newSet.add(date);
        setExpandedHotDates(newSet);
    }

    function toggleAllDate(date: string) {
        const newSet = new Set(expandedAllDates);
        if (newSet.has(date)) newSet.delete(date);
        else newSet.add(date);
        setExpandedAllDates(newSet);
    }
    //just for testing remove later
    console.log(' Debug - First 3 leads created_at:',
        filteredHotLeads.slice(0, 3).map(b => ({
            name: b.name,
            created_at: b.createdAt,
            status: b.businessStatus,
            parsed: new Date(b.createdAt || '').toLocaleDateString()
        }))
    );

    if (leads.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads yet</h3>
                    <p className="text-gray-600">Search for businesses to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* HOT LEADS SECTION */}
            {allHotLeads.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border-2 border-green-200 overflow-hidden">
                    <button
                        onClick={() => setShowHotLeads(!showHotLeads)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50 transition-colors bg-green-50/50"
                    >
                        <div className="flex items-center gap-3">
                            <svg
                                className={`w-5 h-5 text-gray-600 transition-transform ${showHotLeads ? 'rotate-90' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <h2 className="text-xl font-bold text-gray-900"> HOT LEADS (No Website)</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-bold">
                                {filteredHotLeads.length} {filteredHotLeads.length !== allHotLeads.length && `of ${allHotLeads.length}`}
                            </span>
                            <span className="text-sm text-gray-600">
                                {showHotLeads ? 'Click to hide' : 'Click to view'}
                            </span>
                        </div>
                    </button>

                    {showHotLeads && (
                        <>
                            {/* Filters */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-green-200">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                                        <select
                                            value={locationFilter}
                                            onChange={(e) => setLocationFilter(e.target.value)}
                                            className="w-full text-black px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white"
                                        >
                                            <option value="all">All Locations ({allHotLeads.length})</option>
                                            {uniqueLocations.map(loc => (
                                                <option key={loc} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Date Filter - SIMPLIFIED */}
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1"> Time Period</label>
                                        <select
                                            value={dateFilter}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                            className="w-full px-3 text-black py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 bg-white"
                                        >
                                            <option value="all">All Time</option>
                                            <option value="today">Today</option>
                                            <option value="yesterday">Yesterday</option>
                                            <option value="week">This Week</option>
                                            <option value="month">This Month</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Date Groups */}
                            <div className="border-t border-gray-200">{hotDates.length > 0 ? hotDates.map(dateKey => {
                                const dateLeads = hotLeadsByDate[dateKey];
                                const isExpanded = expandedHotDates.has(dateKey);

                                return (
                                    <div key={dateKey} className="border-b border-gray-100 last:border-b-0">
                                        <button
                                            onClick={() => toggleHotDate(dateKey)}
                                            className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                <span className="font-semibold text-gray-900">{dateKey}</span>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                {dateLeads.length} leads
                                            </span>
                                        </button>

                                        {isExpanded && (
                                            <div className="px-6 py-3 bg-gray-50">
                                                <LeadsList title="" data={dateLeads} />
                                            </div>
                                        )}
                                    </div>
                                );
                            }) : (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    No leads match these filters
                                </div>
                            )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ALL BUSINESSES SECTION */}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                    onClick={() => setShowAllBusinesses(!showAllBusinesses)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <svg
                            className={`w-5 h-5 text-gray-600 transition-transform ${showAllBusinesses ? 'rotate-90' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <h2 className="text-xl font-bold text-gray-900">ALL BUSINESSES</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm font-bold">
                            {leads.length} total
                        </span>
                        <span className="text-sm text-gray-600">
                            {showAllBusinesses ? 'Click to hide' : 'Click to view'}
                        </span>
                    </div>
                </button>

                {showAllBusinesses && (
                    <div className="border-t border-gray-200">
                        {allDates.map(dateKey => {
                            const dateLeads = allLeadsByDate[dateKey];
                            const isExpanded = expandedAllDates.has(dateKey);

                            return (
                                <div key={dateKey} className="border-b border-gray-100 last:border-b-0">
                                    <button
                                        onClick={() => toggleAllDate(dateKey)}
                                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            <span className="font-semibold text-gray-900">{dateKey}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                            {dateLeads.length} businesses
                                        </span>
                                    </button>

                                    {isExpanded && (
                                        <div className="px-6 py-3 bg-gray-50">
                                            <LeadsList title="" data={dateLeads} />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>



                )}

            </div>

        </div>
    );
}