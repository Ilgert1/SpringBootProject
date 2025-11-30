"use client"
import React, {JSX} from "react";
import {
    Phone,
    MapPin,
    Star,
    Mail,
    ShieldCheck,
    Users,
    FileText,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const businessName: string = "Harrington & Co. Law Firm";
const businessType: string = "Law Firm";
const address: string = "1234 Elm Street, Suite 400, Boston, MA 02116";
const phone: string = "(617) 555-0199";
const rating: number = 4.9;
const totalRatings: number = 128;
const inferredServices: string[] = [
    "Corporate Law",
    "Litigation",
    "Real Estate Law",
    "Intellectual Property",
    "Estate Planning",
    "Family Law",
    "Employment Law",
    "Tax Advisory",
    "Compliance & Regulation",
];

const sectionFade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatIn: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

export default function ProfessionalTemplate(): JSX.Element {
    return (
        <div className="min-h-screen bg-white text-slate-900 antialiased">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-200">
                <div className="font-serif font-bold text-xl">{businessName}</div>
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
                {/* HERO SPLIT */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                    <div className="lg:col-span-7">
                        <motion.div variants={floatIn}>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                                Trusted Legal Expertise for Every Challenge
                            </h1>
                            <p className="mt-4 text-slate-700 text-lg md:text-xl max-w-xl">
                                Harrington & Co. provides comprehensive legal services to help individuals and businesses navigate complex matters with confidence.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold shadow hover:scale-105 transition">
                                    <Phone size={16} /> Call Us
                                </a>
                                <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:bg-slate-50 transition">
                                    Learn More
                                </a>
                            </div>
                            <div className="mt-6 flex items-center gap-6 text-slate-600">
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
                    </div>
                    <div className="lg:col-span-5">
                        <motion.div variants={floatIn} className="w-full h-80 bg-slate-100 rounded-3xl shadow-lg flex items-center justify-center text-slate-400 font-semibold text-xl">
                            Professional Image Placeholder
                        </motion.div>
                    </div>
                </motion.section>

                {/* SERVICES */}
                <motion.section id="services" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">Our Services</h2>
                        <p className="mt-2 text-slate-600">Comprehensive legal solutions tailored to your needs.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inferredServices.slice(0, 9).map((service, idx) => {
                            const icons = [ShieldCheck, FileText, Users, ShieldCheck, FileText, Users, ShieldCheck, FileText, Users];
                            const descriptions = [
                                "Corporate and commercial legal guidance for your business operations.",
                                "Litigation support ensuring strong representation in disputes.",
                                "Real estate legal services for property and development needs.",
                                "Protecting intellectual property rights and trademarks.",
                                "Estate planning and wealth management services.",
                                "Family law solutions that prioritize clarity and fairness.",
                                "Employment and labor law advisory for businesses and individuals.",
                                "Tax compliance and advisory services to minimize risk.",
                                "Regulatory and compliance guidance for complex industries.",
                            ];
                            const Icon = icons[idx % icons.length];
                            return (
                                <motion.div key={idx} variants={floatIn} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow-md border transition-transform">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow">
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
                <motion.section id="why" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="py-16 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold">Why Choose Us</h2>
                        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">Experience, professionalism, and client-first approach.</p>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: ShieldCheck, title: "Trusted Expertise", desc: "Decades of combined legal experience providing reliable advice." },
                            { icon: Users, title: "Client Focused", desc: "We prioritize understanding your unique needs and goals." },
                            { icon: FileText, title: "Transparent Process", desc: "Clear communication and strategic guidance every step." },
                        ].map((item, i) => (
                            <motion.div key={i} variants={floatIn} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl shadow-md border">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center">
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
                            <h3 className="font-serif text-3xl font-bold">Schedule a Consultation</h3>
                            <p className="mt-2 text-slate-200 max-w-md">Our attorneys are ready to provide expert guidance tailored to your situation.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500 text-slate-900 font-semibold shadow hover:scale-105 transition">
                                <Phone size={16} /> {phone}
                            </a>
                            <a href={`mailto:contact@harringtonco.example`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-500 hover:text-slate-900 transition">
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
                            <li className="flex items-center gap-2"><Mail size={14} /> contact@harringtonco.example</li>
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