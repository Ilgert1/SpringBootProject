"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion , Variants} from "framer-motion"

export default function PlatformPage() {
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<number | null>(null);


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
    return (
        <main className="min-h-screen bg-white text-slate-800 antialiased">
            {/* Navigation */}
            <nav className="fixed inset-x-0 top-4 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
                        <button
                            onClick={() => router.push("/")}
                            className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
                        >
                            Elevare
                        </button>

                        <div className="hidden md:flex gap-8 items-center">
                            <a href="#how-it-works" className="text-sm text-slate-700 hover:text-blue-600 transition">
                                How it works
                            </a>
                            <a href="#examples" className="text-sm text-slate-700 hover:text-blue-600 transition">
                                Examples
                            </a>
                            <a href="#technology" className="text-sm text-slate-700 hover:text-blue-600 transition">
                                Technology
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.push("/signup")}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-40 pb-28 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={fadeUp}
                        className="text-4xl md:text-6xl leading-tight font-extrabold mb-6 tracking-tight"
                        style={{ WebkitFontSmoothing: "antialiased" }}
                    >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400">
              AI-Powered Websites for Local Businesses
            </span>
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.15 } } }}
                        className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8"
                    >
                        We find businesses without websites and deliver professional, ready-to-deploy sites in minutes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-4 justify-center"
                    >
                        <button
                            onClick={() => router.push("/products")}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition"
                        >
                            Start Free Trial
                        </button>

                        <a
                            href="#how-it-works"
                            className="px-6 py-3 rounded-xl border border-blue-200 text-blue-700 font-medium hover:bg-blue-50 transition"
                        >
                            See How It Works
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-3xl md:text-4xl font-bold text-center mb-12"
                    >
                        <span className="text-red-600">55%</span> of Small Businesses Still Don't Have a Website
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-red-50 grid place-items-center text-red-600">❌</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Without a Website</h3>
                                    <ul className="text-slate-600 space-y-2">
                                        <li>Lost customers to competitors with online presence</li>
                                        <li>Invisible on Google searches</li>
                                        <li>Missing revenue opportunities</li>
                                        <li>Can't afford $3,000+ for custom websites</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial="hidden" whileInView="show" variants={fadeUp} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-md border border-blue-100">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-600 text-white grid place-items-center">✅</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">With Elevare</h3>
                                    <ul className="text-slate-700 space-y-2">
                                        <li>Professional website in under 60 seconds</li>
                                        <li>Found on Google, discoverable by customers</li>
                                        <li>Increase revenue with online presence</li>
                                        <li>Affordable — fraction of typical cost</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" className="text-3xl md:text-4xl font-bold text-center mb-6">
                        How It Works
                    </motion.h2>
                    <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">Three simple steps to transform local businesses</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[{
                            title: "We Find Them",
                            desc: "Our AI scans Google Places for businesses without websites.",
                            color: "from-blue-50 to-cyan-50",
                            icon: "1"
                        }, {
                            title: "We Build It",
                            desc: "Generates a beautiful, responsive site tailored to each business.",
                            color: "from-purple-50 to-pink-50",
                            icon: "2"
                        }, {
                            title: "You Deliver Value",
                            desc: "Present a ready-made website and close deals instantly.",
                            color: "from-green-50 to-emerald-50",
                            icon: "3"
                        }].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className={`p-6 rounded-2xl border border-slate-100 bg-gradient-to-br ${s.color} shadow-sm`}
                            >
                                <div className="w-16 h-16 rounded-xl grid place-items-center bg-white/60 font-bold text-slate-800 mb-4">{s.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                                <p className="text-slate-600 text-sm">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples Gallery */}
            <section id="examples" className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial="hidden"
                        whileInView="show"
                        variants={fadeUp}
                        className="text-3xl md:text-4xl font-bold text-center mb-4"
                    >
                        See What We Generate
                    </motion.h2>
                    <p className="text-center text-slate-600 mb-10">
                        Real websites generated by our AI in under 60 seconds
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { id: 52, name: "Cardtronics", type: "Bank", city: "Boston, MA(deployemnt)" },
                            { id: 155, name: "Footprints Kids Yoga", type: "Day Care", city: "Quincy, MA" },
                            { id: 382, name: "Leamington Hotel", type: "Hotel", city: "Miami" },
                        ].map((business, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02, y: -6 }}
                                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
                            >
                                {/* Small preview with expand button */}
                                <div className="relative h-64 bg-gray-100 overflow-hidden">
                                    <iframe
                                        src={`/api/render/${business.id}`}
                                        className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
                                        style={{
                                            transform: 'scale(0.33)',
                                            transformOrigin: 'top left',
                                            width: '300%',
                                            height: '300%'
                                        }}
                                        title={`Preview of ${business.name}`}
                                    />
                                    {/* Expand button - top right */}
                                    <button
                                        onClick={() => setExpandedId(business.id)}
                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md hover:bg-white transition-all z-10"
                                        title="Expand preview"
                                    >
                                        <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-1">{business.name}</h3>
                                    <p className="text-sm text-slate-600 mb-4">
                                        {business.type} • {business.city}
                                    </p>
                                    <button
                                        onClick={() => router.push('/login')}
                                        className="block w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all text-center"
                                    >
                                        Create Websites Like This →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Expanded Preview Modal */}
                {expandedId && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setExpandedId(null)}
                    >
                        <div
                            className="bg-white rounded-2xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold">
                                    {[
                                        { id: 112, name: "Cardtronics" },
                                        { id: 155, name: "Footprints Kids Yoga" },
                                        { id: 382, name: "Leamington Hotel" },
                                    ].find(b => b.id === expandedId)?.name}
                                </h3>
                                <button
                                    onClick={() => setExpandedId(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Scrollable iframe */}
                            <div className="flex-1 overflow-auto bg-gray-50">
                                <iframe
                                    src={`/api/render/${expandedId}`}
                                    className="w-full min-h-[1200px] border-0"
                                    title="Expanded preview"
                                    sandbox="allow-scripts allow-same-origin"
                                />
                            </div>

                            {/* Modal Footer with CTA */}
                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                                >
                                    Sign Up to Generate Websites Like This
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <section id="technology" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Powered by AI, Built for Results
                    </motion.h2>
                    <motion.div
                        whileHover={{ scale: 1.02, y: -6 }}
                        transition={{ type: "spring", stiffness: 180, damping: 14 }}
                        className="grid md:grid-cols-3 gap-8"

                    >
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Google Places API</h3>
                            <p className="text-gray-600">
                                Scan 100+ businesses per search with real-time data from Google's comprehensive database
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">🤖</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Claude AI (Anthropic)</h3>
                            <p className="text-gray-600">
                                Generates pixel-perfect, professional React websites tailored to each business
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Smart Filtering</h3>
                            <p className="text-gray-600">
                                Automatically identifies businesses without websites, saving you hours of research
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-cyan-500">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <motion.h2 initial="hidden" whileInView="show" variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
                        Start Finding Clients Today
                    </motion.h2>
                    <p className="text-lg mb-8 opacity-95">Join hundreds of agencies already using Elevare to generate revenue</p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => router.push("/info")}
                            className="px-10 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-md hover:scale-[1.02] transform transition"
                        >
                            See Pricing
                        </button>
                    </div>
                </div>
            </section>

            <footer className="py-12 px-6 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Elevare</div>
                    <p className="text-slate-400 mb-4">AI-Powered Lead Generation for Local Businesses</p>
                    <div className="text-sm text-slate-500">© 2024 Elevare. All rights reserved.</div>
                </div>
            </footer>
        </main>
    );
}
