"use client";


import Link from "next/link";
import React from "react";
import {router} from "next/client";
import { motion } from "framer-motion"
import { Variants} from "framer-motion";

export default function infoAboutUs(){
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 18 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                // numeric bezier is strongly typed and accepted by Variants
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return(
        <main className="relative min-h-screen bg-white overflow-hidden flex flex-col">
            <div className="absolute top-4 right-4 z-20">
                <Link
                    href="/welcome"
                    className="inline-block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-black rounded-xl font-semibold shadow-md transition"
                >
                    Back to Welcome
                </Link>
            </div>



            <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 py-32">
                <div className="max-w-5xl w-full">
                    <motion.h1
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                        style={{ WebkitFontSmoothing: "antialiased" }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-8"

                    >
                        <span className="block">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                                Find your leads
                            </span>
                        </span>
                        <span className="block text-gray-800 mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                            With Elevare
                        </span>
                    </motion.h1>

                    <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Elevare connects businesses without websites to modern, auto-generated web pages —
                        empowering you to grow your network, boost visibility, and land more clients effortlessly.
                    </p>

                    <div className="flex flex-col items-center gap-6">



                        {/* Pricing Plans */}
                        <div className="flex flex-col items-center gap-6">

                            {/* Pricing Header */}
                            <div className="px-8 py-4 text-center text-black text-lg transition">
                                <h1 className="font-extrabold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                                    Make the wise decision for your business
                                </h1>
                                <p className="font-light text-base md:text-lg">
                                    Choose from our affordable plans
                                </p>
                            </div>
                            {/* Pricing Plans */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">

                                {/* Basic Plan - White */}
                                <motion.div
                                    whileHover={{ scale: 1.00, y: -3 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 7 }}
                                    className="border-2 border-black rounded-xl p-6 flex flex-col justify-between flex-1 min-h-[600px] bg-white shadow-lg shadow-black/20 hover:shadow-xl transition">
                                    <div className="text-left space-y-3">
                                        <h1 className="bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500 text-transparent bg-clip-text text-2xl md:text-3xl font-bold">
                                            Basic Plan
                                        </h1>
                                        <p className="text-black text-4xl font-bold mt-2">$19.99</p>
                                        <p className="text-black text-xl">
                                            Best for scraping locally and finding businesses
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button className="border-2 border-black rounded-2xl px-8 py-3 mx-auto text-black font-semibold hover:bg-black hover:text-white transform hover:scale-105 transition">
                                            Get Started
                                        </button>

                                        <div className="text-left mt-6 space-y-1">
                                            <p className="text-black text-xl font-bold">What's included:</p>
                                            <p className="text-black text-xl">60 local businesses (with and without websites)</p>
                                            <p className="text-black text-xl">10 website generations</p>
                                            <p className="text-black text-xl">4000 tokens</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Premium Plan - Black */}
                                <motion.div
                                    whileHover={{ scale: 1.00, y: -3 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 7 }}
                                    className="border-2 border-white rounded-xl p-6 flex flex-col flex-1 min-h-[600px] bg-black shadow-blue-800 hover:shadow-xl transition">
                                    <div className="text-left space-y-3">
                                        <h1 className="inline-block w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-cyan-400 text-transparent bg-clip-text text-2xl md:text-3xl font-bold">
                                            Premium Plan
                                        </h1>
                                        <p className="text-4xl font-extrabold text-white mt-2">$49.99</p>
                                        <p className="inline-block w-full bg-gradient-to-br from-gray-200 to-white text-transparent bg-clip-text text-xl pt-2">
                                            Best for scraping other cities and finding businesses
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button className="border-2 border-white rounded-2xl mt-7 mb-17 px-8 py-3 mx-auto text-white font-semibold hover:bg-white hover:text-black transform hover:scale-105 transition">
                                            Get Started
                                        </button>

                                        <div className="text-left mt-7 space-y-1">
                                            <p className="inline-block w-full bg-gradient-to-br from-gray-200 to-white text-transparent bg-clip-text text-xl font-semibold">
                                                What's included:
                                            </p>
                                            <ul className="list-disc list-inside space-y-1 text-left">
                                                <li className="inline-block w-full bg-gradient-to-br from-gray-200 to-white text-transparent bg-clip-text text-lg">150 businesses (with and without websites)</li>
                                                <li className="inline-block w-full bg-gradient-to-br from-gray-200 to-white text-transparent bg-clip-text text-lg">50 website generations</li>
                                                <li className="inline-block w-full bg-gradient-to-br from-gray-200 to-white text-transparent bg-clip-text text-lg">8000 tokens</li>
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Enterprise Plan - White */}
                                <motion.div
                                    whileHover={{ scale: 1.00, y: -3 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 7 }}
                                    className="border-2 border-black rounded-xl p-6 flex flex-col justify-between flex-1 min-h-[600px] bg-white shadow-lg shadow-black/20 hover:shadow-xl transition">
                                    <div className="text-left space-y-3">
                                        <h1 className="bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-500 text-transparent bg-clip-text text-2xl md:text-3xl font-bold">Enterprise Plan</h1>
                                        <p className="mt-2 text-black text-4xl font-bold">$199.99</p>
                                        <p className="text-black text-xl pt-2">
                                            Best for scraping across the US and finding businesses
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <button className="border-2 border-black rounded-2xl px-8 py-3 mx-auto text-black font-semibold hover:bg-black hover:text-white transform hover:scale-105 transition">
                                            Get Started
                                        </button>

                                        <div className="text-left mt-7 space-y-1">
                                            <p className="text-black text-xl font-bold">What's included:</p>
                                            <p className="text-black text-xl">500+ local businesses (with and without websites)</p>
                                            <p className="text-black text-xl">50+ website generations</p>
                                            <p className="text-black text-xl">10000+ tokens</p>
                                        </div>
                                    </div>
                                </motion.div>

                            </div>
                        </div>

                    </div>


                </div>
            </section>
        </main>
    )


}