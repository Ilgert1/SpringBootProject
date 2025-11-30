"use client"
import React, {JSX} from "react";
import {
    Phone,
    MapPin,
    Star,
    Clock,
    Mail,
    Coffee,
    Users,
    Heart,
    Calendar,
    Facebook,
    Instagram,
    Twitter,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const businessName: string = "Hearth & Harvest";
const businessType: string = "Local Cafe & Bakery";
const address: string = "42 Maple Lane, Concord, NH 03301";
const phone: string = "(603) 555-0142";
const rating: number = 4.7;
const totalRatings: number = 162;
const inferredServices: string[] = [
    "Artisan Coffee & Espresso",
    "House-Baked Pastries",
    "Seasonal Brunch Menu",
    "Private Catering & Events",
    "Community Workshops",
    "Gift Bundles & Local Goods",
    "Subscription Coffee Beans",
    "Farm-to-Table Sandwiches",
    "Custom Cake Orders",
];

const sectionFade: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatIn: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

export default function LocalBusinessSite(): JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-100 to-rose-50 text-slate-900 antialiased">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-200 flex items-center justify-center shadow-sm ring-1 ring-amber-300">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M12 2c2 3 6 3 8 6 1.5 2.4.7 5.6-1.6 7L12 22 5.6 15c-2.3-1.4-3.1-4.6-1.6-7 2-3 6-3 8-6z" fill="#7c2d12" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-serif text-lg md:text-xl tracking-tight">{businessName}</h1>
                        <p className="text-xs text-slate-600 -mt-1">{businessType}</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    <a href="#services" className="text-sm text-slate-700 hover:text-rose-600 transition">Menu</a>
                    <a href="#why" className="text-sm text-slate-700 hover:text-rose-600 transition">Why Us</a>
                    <a href="#testimonials" className="text-sm text-slate-700 hover:text-rose-600 transition">Reviews</a>
                    <a href="#contact" className="ml-4 inline-flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:scale-105 transition" aria-label="Call">
                        <Phone size={16} /> {phone}
                    </a>
                </nav>

                <div className="md:hidden">
                    <button aria-label="Open menu" className="p-2 bg-white/80 rounded-lg shadow-sm">
                        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
                            <rect width="22" height="2" rx="1" fill="#7c2d12" />
                            <rect y="6" width="22" height="2" rx="1" fill="#7c2d12" />
                            <rect y="12" width="22" height="2" rx="1" fill="#7c2d12" />
                        </svg>
                    </button>
                </div>
            </header>

            <main>
                {/* HERO - HERO CENTER */}
                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={sectionFade}
                    className="px-6 py-20 md:py-28"
                >
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div variants={floatIn} className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg ring-1 ring-amber-200">
                            <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-rose-700">
                                Local flavor, warm welcome — your neighborhood gathering place.
                            </h2>
                            <p className="mt-4 text-slate-700 text-base md:text-lg max-w-2xl mx-auto">
                                At {businessName}, we bake with seasonal ingredients, brew thoughtfully, and create
                                moments that feel like home. Drop by for a morning pastry, a relaxed lunch, or a
                                cozy community event.
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-600 text-white font-semibold shadow-md transform transition hover:scale-105"
                                >
                                    <Coffee size={16} /> Get Started
                                </a>
                                <a
                                    href="#services"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose-200 text-rose-700 hover:bg-rose-50 transition"
                                >
                                    Learn More
                                </a>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-6 text-slate-600">
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="text-amber-500" />
                                    <span className="text-sm font-medium">{rating} ({totalRatings} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span className="text-sm">{address}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{delay:0.25}} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-xl overflow-hidden shadow-md">
                                <img alt="Cozy cafe interior" src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b5b7e8d9e5f2d8a9f2b4c6a3b0f1d2e" className="w-full h-48 object-cover" />
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-md">
                                <img alt="Fresh pastries" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=66f4b3c4f2a6c7f8d6b9a0c2e5f3b4a1" className="w-full h-48 object-cover" />
                            </div>
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
                    className="max-w-6xl mx-auto px-6 py-10"
                >
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">
                            <Star size={16} className="text-amber-500" />
                            <span className="font-semibold text-sm">{rating} stars</span>
                            <span className="text-sm text-slate-600">· {totalRatings} reviews</span>
                        </div>
                        <h3 className="mt-4 font-serif text-2xl md:text-3xl font-bold">What your neighbors are saying</h3>
                        <p className="mt-2 text-slate-600">Real reviews from our community — warm, honest, and local.</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                quote: "Best morning coffee in town — the staff remember my order and the croissants are unbeatable.",
                                author: "Maya T.",
                                place: "Concord",
                            },
                            {
                                quote: "Lovely atmosphere and the farmers' market boxes are a seasonal delight. A true community gem.",
                                author: "Daniel K.",
                                place: "Bedford",
                            },
                            {
                                quote: "We hosted a small family brunch here and the catering was thoughtful, fresh, and delicious.",
                                author: "Rosa & family",
                                place: "Bow",
                            },
                        ].map((t, i) => (
                            <motion.figure
                                key={i}
                                variants={floatIn}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100"
                            >
                                <blockquote className="text-slate-800 italic">“{t.quote}”</blockquote>
                                <figcaption className="mt-3 text-sm text-slate-600">
                                    <span className="font-semibold">{t.author}</span> — <span>{t.place}</span>
                                </figcaption>
                            </motion.figure>
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
                    className="max-w-7xl mx-auto px-6 py-12 md:py-16"
                >
                    <div className="text-center mb-8">
                        <h3 className="font-serif text-3xl font-bold">Our Offerings</h3>
                        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
                            From single-origin pours to warm, flaky pastries — everything crafted with local
                            farmers and seasonality in mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inferredServices.slice(0, 9).map((s, idx) => {
                            const icons = [
                                <Coffee key="a" size={20} />,
                                <Heart key="b" size={20} />,
                                <Calendar key="c" size={20} />,
                                <Users key="d" size={20} />,
                                <Mail key="f" size={20} />,
                                <ShoppingBagPlaceholder key="g" />,
                                <Clock key="h" size={20} />,
                                <Mail key="i" size={20} />,
                            ];
                            const descriptions: string[] = [
                                "Single-origin espresso, carefully brewed and served by knowledgeable baristas.",
                                "Fresh pastries, croissants, and muffins made daily using local ingredients.",
                                "Weekend brunch featuring seasonal dishes and farm-fresh produce.",
                                "Catering for intimate gatherings and community events with personalized menus.",
                                "Thoughtful gift bundles with local products, ideal for special occasions.",
                                "Monthly coffee subscriptions delivering freshly roasted beans to your door.",
                                "Savory sandwiches and salads crafted from farm-to-table ingredients.",
                                "Custom cake and dessert orders for celebrations of any size.",
                                "Community workshops: latte art, sourdough baking, and tasting sessions.",
                            ];
                            return (
                                <motion.article
                                    key={idx}
                                    variants={floatIn}
                                    whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(15,23,42,0.12)" }}
                                    className="bg-white rounded-2xl p-5 shadow-sm border border-amber-50 transition-transform"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-rose-700">
                                            {icons[idx % icons.length]}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800">{s}</h4>
                                            <p className="mt-2 text-sm text-slate-600">{descriptions[idx]}</p>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </motion.section>

                {/* WHY CHOOSE US */}
                <motion.section
                    id="why"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={sectionFade}
                    className="bg-rose-50 py-12"
                >
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-8">
                            <h3 className="font-serif text-3xl font-bold">Why your neighbors choose us</h3>
                            <p className="mt-2 text-slate-600">Local ingredients, friendly faces, and community-first values.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                {
                                    icon: <Users size={18} />,
                                    title: "Community Focused",
                                    desc: "We host events, support farmers, and prioritize neighborhood partnerships.",
                                },
                                {
                                    icon: <Heart size={18} />,
                                    title: "Handmade Daily",
                                    desc: "Everything is made with care each morning — you taste the difference.",
                                },
                                {
                                    icon: <Coffee size={18} />,
                                    title: "Sustainably Sourced",
                                    desc: "Ethically roasted beans and seasonal produce from trusted local farms.",
                                },
                                {
                                    icon: <Calendar size={18} />,
                                    title: "Local Events",
                                    desc: "Workshops and pop-ups that bring people together and celebrate local craft.",
                                },
                            ].map((d, i) => (
                                <motion.div key={i} variants={floatIn} whileHover={{ x: 6 }} className="bg-white rounded-xl p-5 shadow-sm border">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center text-rose-700">
                                            {d.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800">{d.title}</h4>
                                            <p className="text-sm text-slate-600 mt-1">{d.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
                    className="py-12"
                >
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-amber-100 rounded-3xl p-8 md:p-12 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-serif text-2xl md:text-3xl font-bold text-rose-700">Visit us or place an order</h3>
                                <p className="mt-2 text-slate-700">Walk-in breakfasts, takeout, and small event catering — we'd love to meet you.</p>
                                <div className="mt-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                                    <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-rose-600 text-white font-semibold hover:scale-105 transition">
                                        <Phone size={14} /> {phone}
                                    </a>
                                    <div className="inline-flex items-center gap-2 text-slate-700">
                                        <MapPin size={14} /> <span className="text-sm">{address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-slate-700">Hours</div>
                                <div className="mt-1 font-semibold">Mon–Fri: 7:00 AM – 4:00 PM</div>
                                <div className="font-semibold">Sat–Sun: 8:00 AM – 3:00 PM</div>
                                <div className="mt-4">
                                    <a href="#services" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-rose-700 font-semibold shadow-sm hover:scale-105 transition">
                                        Order Online
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* FOOTER */}
            <footer className="bg-amber-50 border-t border-amber-100 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-md bg-rose-600 flex items-center justify-center text-white font-semibold">HH</div>
                            <div>
                                <div className="font-semibold">{businessName}</div>
                                <div className="text-sm text-slate-600">{businessType}</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 max-w-sm">A neighborhood cafe celebrating seasonal food and human connection. Drop in — everyone's welcome.</p>

                        <div className="mt-4 flex items-center gap-3">
                            <a aria-label="Facebook" className="p-2 rounded-md bg-white shadow-sm"><Facebook size={18} className="text-rose-600" /></a>
                            <a aria-label="Instagram" className="p-2 rounded-md bg-white shadow-sm"><Instagram size={18} className="text-rose-600" /></a>
                            <a aria-label="Twitter" className="p-2 rounded-md bg-white shadow-sm"><Twitter size={18} className="text-rose-600" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold">Contact</h4>
                        <ul className="mt-3 text-sm text-slate-600 space-y-2">
                            <li className="flex items-center gap-2"><Phone size={14} /> {phone}</li>
                            <li className="flex items-center gap-2"><Mail size={14} /> hello@hearthharvest.example</li>
                            <li className="flex items-center gap-2"><MapPin size={14} /> {address}</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold">Quick Links</h4>
                            <ul className="mt-3 text-sm text-slate-600 space-y-2">
                                <li><a href="#services" className="hover:underline">Menu</a></li>
                                <li><a href="#why" className="hover:underline">About</a></li>
                                <li><a href="#testimonials" className="hover:underline">Reviews</a></li>
                                <li><a href="#contact" className="hover:underline">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold">Support</h4>
                            <ul className="mt-3 text-sm text-slate-600 space-y-2">
                                <li><a className="hover:underline">Gift Cards</a></li>
                                <li><a className="hover:underline">Catering</a></li>
                                <li><a className="hover:underline">Careers</a></li>
                                <li><a className="hover:underline">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-amber-100">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-600">
                        <div>© {new Date().getFullYear()} {businessName}. All rights reserved.</div>
                        <div className="mt-3 md:mt-0">Made with care • Local & seasonal</div>
                    </div>
                </div>
            </footer>
        </div>


    );
}

/* small placeholder icon for shopping bag (inline svg) */
function ShoppingBagPlaceholder(): JSX.Element {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 7l1-3h10l1 3" stroke="#7c2d12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 7h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" stroke="#7c2d12" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}