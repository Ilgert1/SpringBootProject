"use client"
import React, { JSX } from "react";
import { Phone, MapPin, Star, Mail, Layers, Activity, Grid, Users, Facebook, Instagram, Twitter } from "lucide-react";
import { motion, Variants } from "framer-motion";

const businessName: string = "TechNova Solutions";
const businessType: string = "Tech Consulting & SaaS";
const address: string = "450 Innovation Drive, San Francisco, CA 94107";
const phone: string = "(415) 555-0178";
const rating: number = 4.7;
const totalRatings: number = 218;
const inferredServices: string[] = [
    "Cloud Infrastructure Consulting",
    "Custom SaaS Development",
    "Data Analytics & BI",
    "Cybersecurity Solutions",
    "AI & Machine Learning Integration",
    "DevOps Automation",
    "Mobile & Web App Development",
    "UI/UX Design",
    "Enterprise Software Integration",
];

const sectionFade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatIn: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

export default function ModernTemplate(): JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 text-slate-900 antialiased">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="font-bold text-xl">{businessName}</div>
                <nav className="hidden md:flex items-center gap-6 text-slate-700">
                    <a href="#services" className="hover:text-slate-900 transition">Services</a>
                    <a href="#why" className="hover:text-slate-900 transition">Why Us</a>
                    <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
                </nav>
                <div className="md:hidden">
                    <button aria-label="Open menu" className="p-2 bg-slate-100 rounded-lg">
                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
                            <rect width="22" height="2" rx="1" fill="#111827" />
                            <rect y="6" width="22" height="2" rx="1" fill="#111827" />
                            <rect y="12" width="22" height="2" rx="1" fill="#111827" />
                        </svg>
                    </button>
                </div>
            </header>

            <main>
                {/* HERO CENTER */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="relative px-6 py-24 flex flex-col items-center text-center"
                >
                    <motion.div variants={floatIn} className="max-w-3xl">
                        <h1 className="font-serif font-extrabold text-5xl md:text-6xl leading-tight">
                            Empowering Businesses with Modern Tech Solutions
                        </h1>
                        <p className="mt-4 text-lg text-slate-700">
                            TechNova Solutions provides consulting and SaaS services that streamline operations, drive growth, and future-proof your enterprise.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition">
                                <Phone size={16} /> Get Started
                            </a>
                            <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:bg-slate-50 transition">
                                Learn More
                            </a>
                        </div>
                        <div className="mt-6 flex items-center gap-6 text-slate-600 justify-center">
                            <div className="flex items-center gap-2">
                                <Star size={16} className="text-yellow-500" />
                                <span className="text-sm font-medium">{rating} ({totalRatings} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span className="text-sm">{address}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={floatIn} className="absolute -top-16 -left-16 w-40 h-40 rounded-full bg-cyan-400 opacity-30 blur-3xl animate-[float_6s_infinite]" />
                    <motion.div variants={floatIn} className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-blue-400 opacity-30 blur-3xl animate-[float_8s_infinite]" />
                </motion.section>

                {/* SERVICES */}
                <motion.section id="services" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">Our Services</h2>
                        <p className="mt-2 text-slate-600">Innovative solutions to drive your business forward.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inferredServices.slice(0, 9).map((service, idx) => {
                            const icons = [Layers, Activity, Grid, Users, Layers, Activity, Grid, Users, Layers];
                            const descriptions = [
                                "Consulting for scalable and efficient cloud infrastructure.",
                                "Custom SaaS development tailored to your business needs.",
                                "Data analytics and business intelligence solutions.",
                                "Cybersecurity audits and protection strategies.",
                                "AI & ML integration for smarter workflows.",
                                "DevOps automation to optimize development pipelines.",
                                "Mobile and web application development services.",
                                "User-centered UI/UX design for digital products.",
                                "Enterprise software integration for seamless operations.",
                            ];
                            const Icon = icons[idx % icons.length];
                            return (
                                <motion.div key={idx} variants={floatIn} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow-md border transition-transform">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow">
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{service}</h4>
                                            <p className="mt-2 text-sm text-slate-600">{descriptions[idx]}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* WHY CHOOSE US */}
                <motion.section id="why" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
                    <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">Why TechNova?</h2>
                        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Modern technology solutions with a human-centered approach.</p>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Layers, title: "Innovative Solutions", desc: "We use the latest technologies to solve complex challenges." },
                            { icon: Activity, title: "Agile & Efficient", desc: "Quick iterations and adaptive strategies for fast results." },
                            { icon: Users, title: "Client-Centric", desc: "Your goals drive every project we take on." },
                        ].map((item, i) => (
                            <motion.div key={i} variants={floatIn} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl shadow-md border">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* CALL TO ACTION */}
                <motion.section id="contact" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="py-16 bg-slate-900 text-white">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-serif text-3xl font-bold">Start Your Modern Transformation</h3>
                            <p className="mt-2 text-slate-200 max-w-md">Our team is ready to help you implement technology solutions that deliver real impact.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition">
                                <Phone size={16} /> {phone}
                            </a>
                            <a href={`mailto:hello@technova.example`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition">
                                <Mail size={16} /> Email Us
                            </a>
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* FOOTER */}
            <footer className="bg-slate-100 text-slate-700 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="font-serif font-bold text-lg">{businessName}</div>
                        <p className="mt-2 text-sm text-slate-600">{businessType}</p>
                        <p className="mt-4 text-sm text-slate-600">© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
                        <div className="mt-4 flex items-center gap-3">
                            <a aria-label="Facebook" className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition"><Facebook size={18} /></a>
                            <a aria-label="Instagram" className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition"><Instagram size={18} /></a>
                            <a aria-label="Twitter" className="p-2 rounded-md bg-slate-200 hover:bg-slate-300 transition"><Twitter size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><Phone size={14} /> {phone}</li>
                            <li className="flex items-center gap-2"><Mail size={14} /> hello@technova.example</li>
                            <li className="flex items-center gap-2"><MapPin size={14} /> {address}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#services" className="hover:underline">Services</a></li>
                            <li><a href="#why" className="hover:underline">Why Us</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                            <li><a className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>


    );
}