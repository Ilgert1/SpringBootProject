"use client";
import React, { useState, useEffect } from "react";


export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('')

    const handleChange = (e: any) => {

        setSearchInput(e.target.value);


        return (
            <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleChange}
            />
        )

    }
}
