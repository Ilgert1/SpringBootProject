"use client";

import { useState } from "react";

export default function Test() {
    const words = ["main word", "Another word", "Something else"];

    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-white">

            <div className='text-black '>
                <form className=' flex justify-end-safe ' onSubmit={() => console.log("Hello")}>

                    <div className='  '>
                    <input
                    onChange={() => console.log('test')}
                aria-label={'search'}
                className="border border-solid rounded-full pointer-coarse:absolute border-red-400 "
                placeholder='search here'
                />
                <button className='absolute top-0 right-0 z-10 border border-solid border-black rounded-full'>S</button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col items-center text-4xl space-y-3 pt-20">
                {words.map((w) => (
                    <span
                        key={w}
                        onMouseEnter={() => setHovered(w)}
                        onMouseLeave={() => setHovered(null)}
                        className={`
              transition-all duration-200
              ${hovered && hovered !== w ? "opacity-30" : "opacity-100"}
              ${hovered === w ? "text-black" : "text-black"}
            `}
                    >
            {w}
          </span>
                ))}
            </div>
        </main>
    );
}
