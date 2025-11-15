"use client";

import {Dropdown, DropdownItem} from "flowbite-react";
import {useRouter} from "next/navigation";
import {router} from "next/client";
import {useEffect, useState} from "react";
import {getCurrentUser} from "@/app/lib/auth";

export default function TopRightDropdown() {

    const router = useRouter();
    //check roles
    //----
    const [user, setUser] = useState<{ username: string; roles: string[] } | null>(null);
    const isSuperuser = !!user?.roles.includes("ROLE_SUPERUSER");
    useEffect(() => {
        getCurrentUser().then((me) => setUser(me))
    }, [])
    //------
    function handleLogout(){
        localStorage.removeItem("jwt");
        router.push("/login")
    }

    return (
        <div className="fixed top-4 right-4 z-[9999]">
            <Dropdown
                arrowIcon={false}
                dismissOnClick={false}
                placement="bottom-end"
                // Glassy menu panel:
                className="bg-white/10 backdrop-blur-md border border-white/15 text-gray-100"
                // Custom trigger:
                renderTrigger={() => (
                    <span
                        className="
          inline-flex items-center justify-center
          !text-black text-3xl font-semibold tracking-wider
          px-3 py-1 rounded-xl
          bg-white/10 backdrop-blur-md
          border border-white/20 ring-1 ring-white/10
          shadow-lg shadow-black/40
          transition-all duration-200
          hover:bg-white/20 active:scale-[0.98]
        "
                        aria-label="Open menu"
                    >
        &#9776; {/* same as ☰, sometimes renders more consistently */}
      </span>
                )}
            >
                {isSuperuser && <DropdownItem className="hover:bg-white/15">Dashboard</DropdownItem>}
                <DropdownItem className="hover:bg-white/15"
                onClick={() => router.push("/cart")}
                >Cart
                </DropdownItem>
                <DropdownItem className="hover:bg-white/15 ">Settings</DropdownItem>
                <DropdownItem
                    className="hover:bg-red-800 text-red-300"
                    onClick={handleLogout}>
                    Sign out
                </DropdownItem>
                <DropdownItem
                    className="hover:bg-grey/250 text-black"
                    onClick={() => router.push('/generatedWebsites')}
                >
                    View generated websites
                </DropdownItem>
            </Dropdown>
        </div>
    );
}