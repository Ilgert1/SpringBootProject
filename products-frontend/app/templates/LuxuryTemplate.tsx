"use client"
import React from "react";
import {
    Phone,
    MapPin,
    Star,
    Clock,
    Mail,
    Award,
    User,
    Sparkles,
    ShoppingBag,
    Briefcase,
    Gift,
    Users,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";
import {motion, Variants} from "framer-motion";

const businessName = "Elysian Atelier";
const businessType = "Luxury Lifestyle & Concierge";
const address = "128 Sovereign Row, New York, NY 10013";
const phone = "(212) 555-0189";
const rating = 4.9;
const totalRatings = 278;
const inferredServices = [
    "Bespoke Lifestyle Consulting",
    "Signature Experiences & Events",
    "Private Shopping & Luxury Retail",
    "Personal Styling & Wardrobe Curation",
    "Concierge & Travel Planning",
    "Interior Curation & Art Procurement",
    "VIP Travel & Transport",
    "Exclusive Gifting & Corporate Presents",
    "Membership & Concierge Plans",
];

const sectionFade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatIn: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

export default function LuxuryBusinessWebsite() {
    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white antialiased">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-black" aria-hidden >
                            <path d="M12 2L14.9 8.6L21.9 9.5L16.4 13.9L18.1 20.9L12 17.5L5.9 20.9L7.6 13.9L2.1 9.5L9.1 8.6L12 2Z" fill="black" opacity="0.95" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-serif text-lg md:text-xl tracking-wide">{businessName}</h1>
                        <p className="text-xs text-white/60 -mt-1">{businessType}</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a className="text-sm text-white/70 hover:text-white transition">Services</a>
                    <a className="text-sm text-white/70 hover:text-white transition">Why Us</a>
                    <a className="text-sm text-white/70 hover:text-white transition">Testimonials</a>
                    <a className="text-sm text-white/70 hover:text-white transition">Contact</a>
                    <a
                        href={`tel:${phone.replace(/[^d]/g, "")}`}
                        className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-lg transform transition hover:scale-105"
                        aria-label="Call us"
                    >
                        <Phone size={16} /> {phone}
                    </a>
                </nav>

                <div className="md:hidden">
                    <button className="p-2 bg-white/6 rounded-lg backdrop-blur-sm">
                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
                            <rect width="22" height="2" rx="1" fill="white" fillOpacity="0.9" />
                            <rect y="6" width="22" height="2" rx="1" fill="white" fillOpacity="0.9" />
                            <rect y="12" width="22" height="2" rx="1" fill="white" fillOpacity="0.9" />
                        </svg>
                    </button>
                </div>
            </header>

            <main>
                {/* HERO (LUXURY - HERO SPLIT chosen randomly as B) */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionFade}
                    className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                >
                    <div className="lg:col-span-7">
                        <motion.div
                            variants={floatIn}
                            className="bg-black/40 backdrop-blur-sm rounded-3xl p-10 md:p-14 ring-1 ring-white/10 shadow-2xl"
                        >
                            <p className="text-sm text-yellow-300 font-semibold mb-3">Exclusive · By Appointment</p>
                            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                                Bespoke lifestyle crafted for the discerning few.
                            </h2>
                            <p className="mt-6 text-white/70 text-base md:text-lg max-w-2xl">
                                At {businessName}, we remove the friction from luxury — from private events to
                                wardrobe curation and exclusive travel. We create seamless, memorable experiences so
                                you can live the life you deserve.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold transform transition hover:scale-105 shadow-lg"
                                >
                                    <Sparkles size={16} /> Get Started
                                </a>
                                <a
                                    href="#services"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/90 hover:bg-white/5 transition"
                                >
                                    Learn More
                                </a>
                            </div>

                            <div className="mt-8 flex items-center gap-6 text-white/70">
                                <div className="flex items-center gap-2">
                                    <Star size={18} className="text-yellow-400" />
                                    <div className="text-sm">
                                        <span className="text-white font-semibold">{rating}</span>
                                        <span className="ml-1">({totalRatings} reviews)</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin size={16} />
                                    <span className="text-sm">{address}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                                <div className="bg-gradient-to-tr from-transparent to-black/40 p-10 md:p-16">
                                    <div className="h-64 md:h-80 lg:h-96 bg-[url('https://images.unsplash.com/photo-1549187774-b4e9b0445b2e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=3c2a3e8b9b7b8b2b7b297a1f8f6f2c9a')] bg-cover bg-center transform hover:scale-105 transition duration-600" />
                                </div>
                                <div className="p-6 bg-black/50 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Signature Curation</h3>
                                            <p className="text-sm text-white/70">Hand-selected experiences & craftsmanship</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-white/60">Starting from</div>
                                            <div className="font-bold text-xl">$2,500</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -right-6 w-44 h-44 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 opacity-90 filter blur-2xl mix-blend-screen animate-[pulse_6s_infinite]" />
                        </motion.div>
                    </div>
                </motion.section>

                {/* SOCIAL PROOF */}
                <motion.section
                    id="testimonials"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="max-w-7xl mx-auto px-6 py-12 md:py-16"
                >
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 bg-white/6 px-4 py-2 rounded-full mb-4 mx-auto">
                            <Star size={18} className="text-yellow-300" />
                            <span className="font-semibold">{rating} stars</span>
                            <span className="text-white/60">· {totalRatings} reviews</span>
                        </div>

                        <h3 className="font-serif text-3xl md:text-4xl font-bold">Trusted by a discerning clientele</h3>
                        <p className="mt-3 text-white/70">Personalized, confidential, and impeccably delivered.</p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                quote:
                                    "Elysian Atelier turned our anniversary into an ethereal evening — flawless from start to finish. Extraordinary attention to detail.",
                                author: "Catherine R., Private Client",
                                role: "New York",
                            },
                            {
                                quote:
                                    "Their team curated a collection that felt entirely mine. Savvy, discreet, and beautifully executed.",
                                author: "Liam H., Collector",
                                role: "Manhattan",
                            },
                            {
                                quote:
                                    "From travel to wardrobe, Elysian handled everything with grace. A rare level of service and taste.",
                                author: "S. Patel, Entrepreneur",
                                role: "Brooklyn",
                            },
                        ].map((t, i) => (
                            <motion.blockquote
                                key={i}
                                variants={floatIn}
                                className="bg-black/40 backdrop-blur-sm p-6 rounded-2xl ring-1 ring-white/5 shadow-lg"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center text-black font-bold">
                                        {t.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                    </div>
                                    <div>
                                        <p className="text-white/90 italic">“{t.quote}”</p>
                                        <div className="mt-3 text-sm text-white/60">
                                            <div className="font-semibold">{t.author}</div>
                                            <div className="text-xs">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.blockquote>
                        ))}
                    </div>
                </motion.section>

                {/* SERVICES / PRODUCTS */}
                <motion.section
                    id="services"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="max-w-7xl mx-auto px-6 py-12 md:py-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="font-serif text-3xl md:text-4xl font-bold">Curated Services</h3>
                        <p className="mt-3 text-white/70 max-w-2xl mx-auto">
                            Comprehensive offerings to elevate every aspect of your life. Select the services that
                            fit your vision — we handle the rest.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inferredServices.slice(0, 9).map((s, idx) => {
                            const icons = [
                                <Award key="a" size={22} />,
                                <Users key="b" size={22} />,
                                <ShoppingBag key="c" size={22} />,
                                <User key="d" size={22} />,
                                <Briefcase key="e" size={22} />,
                                <Sparkles key="f" size={22} />,
                                <Gift key="g" size={22} />,
                                <Star key="h" size={22} />,
                                <Mail key="i" size={22} />,
                            ];
                            const descriptions = [
                                "Tailored strategy sessions that define and realize your personal aesthetic and lifestyle goals.",
                                "Custom-crafted private events and intimate experiences curated to perfection.",
                                "Private shopping, VIP access to ateliers, and hand-selected luxury retail appointments.",
                                "Personal styling and wardrobe workshops with renowned stylists and artisans.",
                                "Concierge services ranging from reservations to executive transport and security.",
                                "Interior curation and art procurement—harmonizing living spaces with rare objects.",
                                "Exclusive gifting solutions and corporate presents crafted for impact.",
                                "VIP travel logistics, private jets, and exceptional on-the-ground experiences.",
                                "Membership plans offering prioritized access, seasonal curation, and 24/7 concierge.",
                            ];
                            return (
                                <motion.article
                                    key={idx}
                                    whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}
                                    className="bg-gradient-to-br from-white/3 to-white/2 border border-white/5 p-6 rounded-2xl transition-transform transform"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center text-black shadow">
                                            {icons[idx % icons.length]}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{s}</h4>
                                            <p className="mt-2 text-white/70 text-sm">{descriptions[idx]}</p>
                                            <div className="mt-4">
                                                <a className="text-sm inline-flex items-center gap-2 text-yellow-300 hover:underline">
                                                    Learn more →
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </motion.section>

                {/* WHY CHOOSE US */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="max-w-7xl mx-auto px-6 py-12 md:py-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="font-serif text-3xl md:text-4xl font-bold">Why choose {businessName}?</h3>
                            <p className="mt-3 text-white/70 max-w-xl">
                                We combine impeccable taste, industry relationships, and discreet white-glove service
                                to deliver experiences that feel effortless and singular.
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-4">
                                {[
                                    {
                                        icon: <Award size={20} />,
                                        title: "Bespoke Craftsmanship",
                                        desc: "We partner with master artisans and industry leaders to ensure perfect execution.",
                                        color: "from-white/10 to-white/5",
                                    },
                                    {
                                        icon: <Users size={20} />,
                                        title: "Global Network",
                                        desc: "A curated network of partners ensures VIP access and seamless logistics worldwide.",
                                        color: "from-yellow-400 to-yellow-300",
                                    },
                                    {
                                        icon: <Sparkles size={20} />,
                                        title: "End-to-End Care",
                                        desc: "From concept to completion — we manage every detail, so you don't have to.",
                                        color: "from-white/10 to-white/5",
                                    },
                                ].map((d, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 6 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-black/30 ring-1 ring-white/4"
                                    >
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${d.color} text-black shadow`}>
                                            {d.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{d.title}</h4>
                                            <p className="text-white/70 text-sm">{d.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[linear-gradient(135deg,#111827_0%,#0b1220_100%)] p-8 rounded-2xl ring-1 ring-white/5 shadow-lg">
                            <h4 className="text-white/80 font-medium">Membership Spotlight</h4>
                            <p className="mt-3 text-white/70">
                                Our curated membership offers seasonally refreshed experiences, priority booking, and a
                                dedicated lifestyle manager.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">P</div>
                                    <div>
                                        <div className="font-semibold">Platinum</div>
                                        <div className="text-sm text-white/70">Priority access, bespoke seasonal packages</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">E</div>
                                    <div>
                                        <div className="font-semibold">Elite</div>
                                        <div className="text-sm text-white/70">Personal manager & exclusive events</div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <a className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-semibold transform transition hover:scale-105 shadow-lg">
                                        Request Membership
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CALL TO ACTION */}
                <motion.section
                    id="contact"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="py-16 md:py-24"
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-serif text-3xl md:text-4xl font-bold">Begin your bespoke journey</h3>
                                <p className="mt-2 text-black/70 max-w-md">
                                    Reach out for a private consultation. We craft everything around your preferences and
                                    privacy.
                                </p>
                                <div className="mt-4 flex items-center gap-6">
                                    <a href={`tel:${phone.replace(/[^d]/g, "")}`} className="inline-flex items-center gap-3 bg-black/5 px-4 py-3 rounded-lg font-semibold hover:scale-105 transition">
                                        <Phone size={16} /> {phone}
                                    </a>
                                    <div className="inline-flex items-center gap-2 text-black/80">
                                        <MapPin size={16} />
                                        <span className="text-sm">{address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-black/70">Hours</div>
                                <div className="mt-1 font-semibold">Mon–Fri: 9:00 AM – 6:00 PM</div>
                                <div className="font-semibold">Sat: 10:00 AM – 4:00 PM • Sun: Closed</div>

                                <div className="mt-6">
                                    <a className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-yellow-300 font-bold transform transition hover:scale-105 shadow-lg">
                                        Schedule a Consultation
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* FOOTER */}
            <footer className="bg-black/60 border-t border-white/6 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-300 flex items-center justify-center text-black font-bold">EA</div>
                            <div>
                                <div className="font-semibold">{businessName}</div>
                                <div className="text-sm text-white/70">{businessType}</div>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm max-w-sm">
                            Elysian Atelier provides confidential luxury services for clients who expect the
                            highest standard of craftsmanship and care.
                        </p>

                        <div className="mt-6 flex items-center gap-4">
                            <a className="p-2 rounded-md bg-white/6 hover:bg-white/8 transition"><Facebook size={18} /></a>
                            <a className="p-2 rounded-md bg-white/6 hover:bg-white/8 transition"><Instagram size={18} /></a>
                            <a className="p-2 rounded-md bg-white/6 hover:bg-white/8 transition"><Twitter size={18} /></a>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <h4 className="font-semibold">Contact</h4>
                        <div className="mt-3 text-sm text-white/70 space-y-2">
                            <div className="flex items-center gap-3"><Phone size={16} /> {phone}</div>
                            <div className="flex items-center gap-3"><Mail size={16} /> hello@elysianatelier.example</div>
                            <div className="flex items-center gap-3"><MapPin size={16} /> {address}</div>
                        </div>
                    </div>

                    <div className="md:col-span-1 grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold">Quick Links</h4>
                            <ul className="mt-3 text-sm text-white/70 space-y-2">
                                <li>Services</li>
                                <li>Membership</li>
                                <li>Testimonials</li>
                                <li>Press</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold">Legal</h4>
                            <ul className="mt-3 text-sm text-white/70 space-y-2">
                                <li>Privacy</li>
                                <li>Terms</li>
                                <li>Accessibility</li>
                                <li>Cookies</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/6">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-white/60 text-sm">
                        <div>© {new Date().getFullYear()} {businessName}. All rights reserved.</div>
                        <div className="mt-3 md:mt-0">Designed with care • {businessType}</div>
                    </div>
                </div>
            </footer>
        </div>


    );
}