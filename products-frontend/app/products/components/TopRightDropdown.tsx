"use client";

import {Dropdown, DropdownItem} from "flowbite-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {getCurrentUser} from "@/app/lib/auth";
import SubscriptionBadge from "@/app/products/components/SubcriptionBadge";

export default function TopRightDropdown() {
    const router = useRouter();
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
    const [badgeRefresh, setBadgeRefresh] = useState(0);
    const isSuperuser = !!user?.roles.includes("ROLE_SUPERUSER");

    useEffect(() => {
        getCurrentUser().then((me) => setUser(me));
    }, []);

    function handleLogout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("access_token");
        router.push("/login");
    }

    return (
        <div className="fixed top-4 left-4 z-[9999]">
            <Dropdown
                arrowIcon={false}
                dismissOnClick={false}
                placement="bottom-start"
                className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl"
                renderTrigger={() => (
                    <button
                        className="
                            inline-flex items-center justify-center
                            w-12 h-12 rounded-xl
                            bg-white/10 backdrop-blur-md
                            border border-white/20 ring-1 ring-white/10
                            shadow-lg shadow-black/40
                            transition-all duration-200
                            hover:bg-white/20 hover:scale-105
                            active:scale-95
                            group
                        "
                        aria-label="Open menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-900 transition group-hover:text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
            >
                {/* User Info */}
                {user && (
                    <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-500">{isSuperuser ? 'Administrator' : 'Member'}</p>
                    </div>
                )}

                {/* Navigation */}
                {isSuperuser && (
                    <DropdownItem
                        onClick={() => router.push("/dashboard")}
                        className="hover:bg-gray-100 transition"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Dashboard
                        </div>
                    </DropdownItem>
                )}

                <DropdownItem
                    onClick={() => router.push('/generatedWebsites')}
                    className="hover:bg-gray-100 transition"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Generated Websites
                    </div>
                </DropdownItem>

                <div className="border-t border-gray-200 my-1" />

                {/* Account Settings */}
                <DropdownItem className="hover:bg-gray-100 transition">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </div>
                </DropdownItem>

                <DropdownItem className='relative group'>
                    <div className="flex items-center justify-between w-full transition cursor-pointer hover:text-blue-600">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span>View Plan</span>
                        </div>
                        <svg
                            className="w-4 h-4 text-gray-400 transition group-hover:text-blue-600 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Badge Popup */}
                    <div className="
                        absolute left-full top-0 ml-2
                        w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-6
                        opacity-0 invisible scale-95 pointer-events-none
                        group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:pointer-events-auto
                        transition-all duration-200 ease-out
                        z-50
                    ">
                        <SubscriptionBadge refreshTrigger={badgeRefresh} />
                    </div>
                </DropdownItem>

                <div className="border-t border-gray-200 my-1" />

                {/* Logout */}
                <DropdownItem
                    className="hover:bg-red-50 text-red-600 font-medium transition"
                    onClick={handleLogout}
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                    </div>
                </DropdownItem>
            </Dropdown>
        </div>
    );
}