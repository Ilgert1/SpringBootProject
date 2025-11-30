"use client"
import React, {JSX} from "react";
import {
    Star,
    Phone,
    MapPin,
    Mail,
    Grid,
    Image,
    PenTool,
    Palette,
    Activity,
    Megaphone,
    Layers,
    Users,
    Heart,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const businessName: string = "Studio Neonfold";
const businessType: string = "Creative Agency";
const address: string = "88 Arlo Street, Portland, OR 97214";
const phone: string = "(503) 555-0123";
const rating: number = 4.8;
const totalRatings: number = 342;
const inferredServices: string[] = [
    "Brand Identity & Strategy",
    "Creative Campaigns",
    "Art Direction & Photography",
    "UI/UX & Product Design",
    "Motion & Video Production",
    "Social Media Strategy",
    "Packaging & Print Design",
    "Web Development",
    "Workshops & Creative Direction",
];

const sectionFade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatIn: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

export default function CreativeTemplate(): JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-sky-50 text-slate-900 antialiased">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center shadow-xl transform -rotate-6">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <rect x="3" y="3" width="18" height="18" rx="4" fill="white" opacity="0.06" />
                            <path d="M6 18L18 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-serif text-lg md:text-xl tracking-tight">{businessName}</h1>
                        <p className="text-xs text-slate-600 -mt-1">{businessType}</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a href="#services" className="text-sm text-slate-700 hover:text-pink-600 transition">Services</a>
                    <a href="#work" className="text-sm text-slate-700 hover:text-pink-600 transition">Work</a>
                    <a href="#why" className="text-sm text-slate-700 hover:text-pink-600 transition">Why Us</a>
                    <a href="#contact" className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform transition hover:scale-105" aria-label="Call">
                        <Phone size={16} /> {phone}
                    </a>
                </nav>

                <div className="md:hidden">
                    <button aria-label="Open menu" className="p-2 bg-white/80 rounded-lg shadow-sm">
                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
                            <rect width="22" height="2" rx="1" fill="#111827" />
                            <rect y="6" width="22" height="2" rx="1" fill="#111827" />
                            <rect y="12" width="22" height="2" rx="1" fill="#111827" />
                        </svg>
                    </button>
                </div>
            </header>

            <main>
                {/* HERO - ASYMMETRIC */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionFade}
                    className="relative overflow-hidden px-6 py-20 md:py-28"
                >
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <motion.div variants={floatIn} className="bg-white/90 rounded-3xl p-8 md:p-12 shadow-2xl ring-1 ring-white/60">
                                <p className="text-sm text-slate-500 font-medium">Bold ideas, crafted visually</p>
                                <h2 className="font-serif font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 mt-3">
                                    We design memorable brands that stop the scroll and start conversations.
                                </h2>
                                <p className="mt-4 text-slate-700 text-base md:text-lg max-w-2xl">
                                    From daring campaigns to playful product launches — we blend strategy, craft, and kinetic
                                    visuals to make your audience care.
                                </p>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <a href="#contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-lg transform transition hover:scale-105">
                                        <Megaphone size={16} /> Get Started
                                    </a>
                                    <a href="#work" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-50 transition">
                                        Learn More
                                    </a>
                                </div>

                                <div className="mt-6 flex items-center gap-6 text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="text-pink-500" />
                                        <span className="text-sm font-medium">{rating} ({totalRatings} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        <span className="text-sm">{address}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:col-span-5 order-1 lg:order-2 relative">
                            <motion.div initial={{ scale: 0.98, x: 80, opacity: 0 }} animate={{ scale: 1, x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
                                <div className="rounded-3xl overflow-hidden shadow-2xl">
                                    <div className="h-96 md:h-[28rem] bg-[linear-gradient(135deg,#ff7ab6_0%,#6ad0ff_50%,#ffd27a_100%)] p-6 flex items-end">
                                        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 max-w-[18rem] transform -rotate-3 shadow-lg">
                                            <h3 className="font-semibold text-lg">Recent Launch</h3>
                                            <p className="text-sm text-slate-900/80 mt-2">Visual identity & multi-channel campaign for a sustainable fashion label.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -left-10 -top-6 w-36 h-36 rounded-full bg-pink-400 opacity-80 blur-3xl mix-blend-screen animate-[float_6s_infinite]" />
                                <div className="absolute right-[-36px] bottom-6 w-44 h-44 rounded-full bg-blue-400 opacity-70 blur-2xl mix-blend-screen animate-[float_8s_infinite]" />
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* SOCIAL PROOF */}
                <motion.section id="testimonials" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="max-w-7xl mx-auto px-6 py-12">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
                            <Star size={16} className="text-pink-500" />
                            <span className="font-semibold text-sm">{rating} stars</span>
                            <span className="text-sm text-slate-600">· {totalRatings} reviews</span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl md:text-3xl font-bold">Creativity that moves people</h3>
                        <p className="mt-2 text-slate-600">Selected client stories — frank, excited, and real.</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "They made our brand sing. Unexpected, joyful, and strategically sharp.",
                                author: "Ava M. — Founder",
                            },
                            {
                                quote: "Campaigns hit cultural moments — we grew our community threefold in 3 months.",
                                author: "Noah P. — CMO",
                            },
                            {
                                quote: "Studio Neonfold balanced boldness with clarity and delivered across channels.",
                                author: "Lina S. — Product Lead",
                            },
                        ].map((t, i) => (
                            <motion.blockquote key={i} variants={floatIn} className="bg-white rounded-2xl p-6 shadow-md border">
                                <p className="text-slate-800 italic">“{t.quote}”</p>
                                <div className="mt-3 text-sm text-slate-600 font-semibold">{t.author}</div>
                            </motion.blockquote>
                        ))}
                    </div>
                </motion.section>

                {/* SERVICES */}
                <motion.section id="services" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                    <div className="text-center mb-8">
                        <h3 className="font-serif text-3xl font-bold">What we do</h3>
                        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">A full-service creative studio focused on ideas that are beautiful and effective.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inferredServices.slice(0, 9).map((s, idx) => {
                            const icons = [
                                <Grid key="a" size={20} />,
                                <Megaphone key="b" size={20} />,
                                <Image key="c" size={20} />,
                                <PenTool key="d" size={20} />,
                                <Activity key="e" size={20} />,
                                <Layers key="f" size={20} />,
                                <Palette key="g" size={20} />,
                                <Users key="h" size={20} />,
                                <Heart key="i" size={20} />,
                            ];
                            const descriptions = [
                                "We craft visual systems and naming that scale across every touchpoint.",
                                "Creative campaigns that spark conversations and measurable engagement.",
                                "Director-led art direction and photography to bring your story to life.",
                                "Human-centered UI/UX design that looks incredible and works beautifully.",
                                "Motion-led spots and short-form content that cuts through noise.",
                                "Unified brand systems from packaging to environmental design.",
                                "Beautiful, tactile packaging and printed matter with heart.",
                                "Community-building strategies and social-first activation.",
                                "Workshops and creative leadership to align teams and spark ideas.",
                            ];
                            return (
                                <motion.article key={idx} variants={floatIn} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 shadow-md border transition-transform">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
                                            {icons[idx % icons.length]}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{s}</h4>
                                            <p className="mt-2 text-sm text-slate-600">{descriptions[idx]}</p>
                                            <div className="mt-4">
                                                <a className="text-sm text-pink-600 inline-flex items-center gap-2 hover:underline">Explore →</a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </motion.section>

                {/* WHY CHOOSE US */}
                <motion.section id="why" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="py-12 bg-gradient-to-br from-pink-50 to-sky-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-8">
                            <h3 className="font-serif text-3xl font-bold">Why Studio Neonfold?</h3>
                            <p className="mt-2 text-slate-600">A creative partner who blends craft, culture, and strategy.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: <PenTool size={18} />, title: "Creative First", desc: "Ideas that lead with emotion and clarity." },
                                { icon: <Activity size={18} />, title: "Strategic Impact", desc: "We tie creativity to measurable outcomes." },
                                { icon: <Users size={18} />, title: "Collaborative Process", desc: "Transparent, iterative, and joyful partnerships." },
                                { icon: <Layers size={18} />, title: "End-to-End Delivery", desc: "From concept through production and launch." },
                            ].map((d, i) => (
                                <motion.div key={i} variants={floatIn} whileHover={{ x: 6 }} className="bg-white rounded-xl p-5 shadow-md border">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-md bg-gradient-to-br from-pink-500 to-blue-500 text-white flex items-center justify-center">
                                            {d.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{d.title}</h4>
                                            <p className="text-sm text-slate-600 mt-1">{d.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section id="contact" initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionFade} className="py-12">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">Ready to make something unexpected?</h3>
                                <p className="mt-2 text-slate-600 max-w-md">Let's design a creative language that moves hearts and drives results.</p>
                                <div className="mt-4 flex items-center gap-4">
                                    <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition">
                                        <Phone size={14} /> {phone}
                                    </a>
                                    <a href={`mailto:hello@neonfold.example`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 text-slate-900 hover:bg-slate-50 transition">
                                        <Mail size={14} /> hello@neonfold.example
                                    </a>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-slate-600">Studio</div>
                                <div className="mt-1 font-semibold">{address}</div>
                                <div className="mt-4">
                                    <a href="#work" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white font-semibold shadow hover:scale-105 transition">
                                        See Our Work
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* FOOTER */}
            <footer className="mt-12 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white font-bold">SN</div>
                            <div>
                                <div className="font-semibold">{businessName}</div>
                                <div className="text-sm text-white/70">{businessType}</div>
                            </div>
                        </div>
                        <p className="text-sm text-white/70 max-w-sm">We fuse craft and culture to create brands and campaigns that matter.</p>

                        <div className="mt-6 flex items-center gap-3">
                            <a aria-label="Facebook" className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"><Facebook size={18} /></a>
                            <a aria-label="Instagram" className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"><Instagram size={18} /></a>
                            <a aria-label="Twitter" className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition"><Twitter size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold">Contact</h4>
                        <ul className="mt-3 text-sm text-white/70 space-y-2">
                            <li className="flex items-center gap-2"><Phone size={14} /> {phone}</li>
                            <li className="flex items-center gap-2"><Mail size={14} /> hello@neonfold.example</li>
                            <li className="flex items-center gap-2"><MapPin size={14} /> {address}</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold">Explore</h4>
                            <ul className="mt-3 text-sm text-white/70 space-y-2">
                                <li><a href="#services" className="hover:underline">Services</a></li>
                                <li><a href="#work" className="hover:underline">Work</a></li>
                                <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
                                <li><a href="#contact" className="hover:underline">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold">Legal</h4>
                            <ul className="mt-3 text-sm text-white/70 space-y-2">
                                <li><a className="hover:underline">Privacy</a></li>
                                <li><a className="hover:underline">Terms</a></li>
                                <li><a className="hover:underline">Accessibility</a></li>
                                <li><a className="hover:underline">Careers</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
                        <div>© {new Date().getFullYear()} {businessName}. All rights reserved.</div>
                        <div className="mt-3 md:mt-0">Crafted with curiosity • {businessType}</div>
                    </div>
                </div>
            </footer>
        </div>


    );
}