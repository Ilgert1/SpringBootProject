"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/app/lib/api";
import { toast } from "react-hot-toast";

type StripeUser = {
    id: string;
    email: string | null;
    subscriptionStatus: string | null;
};

export default function Dashboard() {
    /* ---------- USERS ---------- */
    const [users, setUsers] = useState<StripeUser[] | null>(null);
    const [usersLoading, setUsersLoading] = useState(false);
    const [usersError, setUsersError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"email" | "status">("email");
    const [showOnlyUniqueEmails, setShowOnlyUniqueEmails] = useState(false);

    /* ---------- BALANCE ---------- */
    const [balance, setBalance] = useState<string | null>(null);
    const [balanceLoading, setBalanceLoading] = useState(false);

    /* ---------- Fetch functions ---------- */
    async function getUsers() {
        setUsersLoading(true);
        setUsersError(null);
        try {
            const result = await api<StripeUser[]>(`/api/stripe/v1/customers`, {
                method: "GET",
            });

            // assume the endpoint returns a JSON array of {id, email, subscriptionStatus}
            setUsers(result ?? []);
        } catch (e: any) {
            setUsersError(e?.message ?? "Unknown error");
            toast.error(`Error fetching users: ${e?.message ?? "Unknown"}`);
        } finally {
            setUsersLoading(false);
        }
    }

    async function getBalance() {
        setBalanceLoading(true);
        try {
            const result = await api<{ balance: string }>(`/api/stripe/balance`, {
                method: "GET",
            });
            if (result.balance) {
                setBalance(result.balance);
            } else {
                toast.error("No balance returned.");
            }
        } catch (e: any) {
            toast.error(`Error retrieving balance: ${e?.message ?? "Unknown error"}`);
        } finally {
            setBalanceLoading(false);
        }
    }

    /* ---------- Derived data ---------- */
    const filteredAndSorted = useMemo(() => {
        if (!users) return [];

        // optional unique email filter
        let list = users.slice();

        if (showOnlyUniqueEmails) {
            const seen = new Set<string>();
            list = list.filter((u) => {
                const e = (u.email ?? "").toLowerCase();
                if (!e) return false;
                if (seen.has(e)) return false;
                seen.add(e);
                return true;
            });
        }

        if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase();
            list = list.filter(
                (u) =>
                    (u.email ?? "").toLowerCase().includes(q) ||
                    (u.id ?? "").toLowerCase().includes(q) ||
                    (u.subscriptionStatus ?? "").toLowerCase().includes(q)
            );
        }

        if (sortBy === "email") {
            list.sort((a, b) => (a.email ?? "").localeCompare(b.email ?? ""));
        } else {
            list.sort((a, b) =>
                (a.subscriptionStatus ?? "").localeCompare(b.subscriptionStatus ?? "")
            );
        }

        return list;
    }, [users, searchTerm, sortBy, showOnlyUniqueEmails]);

    const summary = useMemo(() => {
        if (!users) return { total: 0, active: 0, uniqueEmails: 0 };
        const total = users.length;
        const active = users.filter((u) => u.subscriptionStatus === "active").length;
        const uniqueEmails = new Set(users.map((u) => (u.email ?? "").toLowerCase())).size;
        return { total, active, uniqueEmails };
    }, [users]);

    /* ---------- Lifecycle (optional auto-load) ---------- */
    useEffect(() => {
        // optionally auto-fetch on mount
        getUsers();
    }, []);

    /* ---------- UI helpers ---------- */
    function statusBadge(status?: string | null) {
        const s = (status ?? "none").toLowerCase();
        const base = "px-3 py-1 rounded-full text-sm font-medium";
        if (s === "active") return <span className={`${base} bg-green-100 text-green-800`}>Active</span>;
        if (s === "past_due") return <span className={`${base} bg-yellow-100 text-yellow-800`}>Past due</span>;
        if (s === "canceled") return <span className={`${base} bg-red-100 text-red-800`}>Canceled</span>;
        if (s === "incomplete") return <span className={`${base} bg-orange-100 text-orange-800`}>Incomplete</span>;
        return <span className={`${base} bg-gray-100 text-gray-800`}>None</span>;
    }

    /* ---------- Render ---------- */
    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Stripe Dashboard</h1>

                    <div className="flex gap-3">
                        <button
                            onClick={getUsers}
                            disabled={usersLoading}
                            className="px-4 py-2 rounded-md bg-white text-black shadow hover:shadow-md border"
                        >
                            {usersLoading ? "Refreshing users…" : "Refresh users"}
                        </button>

                        <button
                            onClick={getBalance}
                            disabled={balanceLoading}
                            className="px-4 py-2 rounded-md bg-gradient-to-br from-red-500 to-gray-700 text-white shadow hover:opacity-95"
                        >
                            {balanceLoading ? "Loading balance…" : "Get balance"}
                        </button>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500">Total customers</div>
                        <div className="text-2xl font-bold text-gray-900">{summary.total}</div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500">Active subscriptions</div>
                        <div className="text-2xl font-bold text-green-600">{summary.active}</div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-sm text-gray-500">Unique emails</div>
                        <div className="text-2xl font-bold text-gray-900">{summary.uniqueEmails}</div>
                    </div>
                </div>

                {/* Balance card */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-500">Stripe balance</div>
                            <div className="text-lg font-semibold text-gray-900">
                                {balance ?? "—"}
                            </div>
                        </div>
                        <div className="text-xs text-gray-500">Last updated: {balanceLoading ? "Updating…" : "Now"}</div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 mb-4">
                    <input
                        type="search"
                        placeholder="Search by email, id or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 p-2 border rounded-md text-black placeholder-gray-400 bg-white"
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="p-2 border text-gray-400 rounded-md bg-white"
                    >
                        <option value="email">Sort by email</option>
                        <option value="status">Sort by status</option>
                    </select>

                    <label className="inline-flex items-center gap-2 text-gray-400 text-sm">
                        <input
                            type="checkbox"
                            checked={showOnlyUniqueEmails}
                            onChange={(e) => setShowOnlyUniqueEmails(e.target.checked)}
                            className="h-4 w-4 "
                        />
                        Unique emails
                    </label>
                </div>

                {/* Users table */}
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Customer ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subscription Status</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {usersLoading && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                                    Loading users...
                                </td>
                            </tr>
                        )}

                        {!usersLoading && filteredAndSorted.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}

                        {!usersLoading && filteredAndSorted.map((u) => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                            {(u.email ?? "U").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{u.email ?? "—"}</div>
                                            <div className="text-xs text-gray-500">{/* extra info if needed */}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.id}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {statusBadge(u.subscriptionStatus)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / small controls */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={() => {
                            // quick dedupe client-side and set users to unique list (optional)
                            if (!users) return;
                            const map = new Map<string, StripeUser>();
                            for (const u of users) {
                                const e = (u.email ?? "").toLowerCase();
                                if (!map.has(e)) map.set(e, u);
                            }
                            setUsers(Array.from(map.values()));
                            toast.success("Deduped users by email (client-side)");
                        }}
                        className="px-3 py-2 bg-white border rounded shadow"
                    >
                        Dedupe client-side
                    </button>
                </div>
            </div>
        </main>
    );
}
