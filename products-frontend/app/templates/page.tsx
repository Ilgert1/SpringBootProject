import { Phone, Mail, MapPin, Star, Clock, Sparkles, Heart, Leaf, Users, Facebook, Instagram, Twitter } from "lucide-react";

const Index = () => {
    const services = [
        { icon: Sparkles, name: "Signature Facial", description: "Rejuvenating treatments tailored to your skin's unique needs" },
        { icon: Heart, name: "Hydrotherapy", description: "Healing waters that restore body and mind balance" },
        { icon: Leaf, name: "Body Rituals", description: "Ancient techniques for complete renewal and relaxation" },
        { icon: Users, name: "Couples Retreat", description: "Shared moments of tranquility for two" },
        { icon: Sparkles, name: "Energy Healing", description: "Holistic practices to align your inner harmony" },
        { icon: Leaf, name: "Aromatherapy", description: "Essential oils crafted for deep sensory wellness" },
    ];

    const testimonials = [
        { name: "Victoria S.", review: "An absolutely transcendent experience. The attention to detail and luxurious atmosphere exceeded all expectations.", location: "Beverly Hills" },
        { name: "James M.", review: "Aurum Spa has become my sanctuary. The therapists are world-class and the ambiance is unmatched.", location: "Malibu" },
        { name: "Catherine L.", review: "Pure elegance from start to finish. This is what true luxury wellness feels like.", location: "Santa Monica" },
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-serif">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-amber-200/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="#" className="text-2xl font-light tracking-widest text-slate-900">
                        AURUM <span className="text-amber-600">SPA</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-sm tracking-wide text-slate-600 hover:text-amber-600 transition-colors">Services</a>
                        <a href="#experience" className="text-sm tracking-wide text-slate-600 hover:text-amber-600 transition-colors">Experience</a>
                        <a href="#testimonials" className="text-sm tracking-wide text-slate-600 hover:text-amber-600 transition-colors">Reviews</a>
                        <a href="#contact" className="text-sm tracking-wide text-slate-600 hover:text-amber-600 transition-colors">Contact</a>
                        <a href="#contact" className="px-6 py-2 bg-amber-600 text-white text-sm tracking-wide hover:bg-amber-700 transition-colors">
                            Book Now
                        </a>
                    </div>
                    <button className="md:hidden text-slate-900">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-stone-100 to-stone-50 pt-20">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <p className="text-amber-600 tracking-widest text-sm mb-6 uppercase">Beverly Hills' Premier Destination</p>
                    <h1 className="text-5xl md:text-7xl font-light text-slate-900 mb-6 leading-tight">
                        Where Luxury Meets
                        <span className="block italic text-amber-600">Tranquility</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Immerse yourself in an oasis of calm. Experience world-class treatments
                        designed to rejuvenate your body, mind, and spirit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#contact" className="px-10 py-4 bg-slate-900 text-white tracking-wide hover:bg-slate-800 transition-colors">
                            Reserve Your Experience
                        </a>
                        <a href="#services" className="px-10 py-4 border border-amber-600 text-amber-600 tracking-wide hover:bg-amber-600 hover:text-white transition-colors">
                            Explore Services
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-amber-600 tracking-widest text-sm mb-4 uppercase">Our Offerings</p>
                        <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Curated Experiences</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Each treatment is thoughtfully designed to provide an unparalleled journey of restoration and renewal.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group p-8 bg-stone-50 hover:bg-amber-50 transition-colors duration-300 border border-stone-200 hover:border-amber-200">
                                <service.icon className="w-10 h-10 text-amber-600 mb-6" strokeWidth={1} />
                                <h3 className="text-xl font-light text-slate-900 mb-3 tracking-wide">{service.name}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                                <a href="#contact" className="inline-block mt-6 text-amber-600 text-sm tracking-wide hover:text-amber-700 transition-colors">
                                    Learn More →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 px-6 bg-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-amber-500 tracking-widest text-sm mb-4 uppercase">The Aurum Experience</p>
                            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">A Sanctuary of Serenity</h2>
                            <p className="text-stone-400 leading-relaxed mb-6">
                                Nestled in the heart of Beverly Hills, Aurum Spa offers an escape from the ordinary.
                                Our master therapists bring decades of expertise, combining ancient healing traditions
                                with modern luxury.
                            </p>
                            <p className="text-stone-400 leading-relaxed mb-8">
                                Every detail has been meticulously crafted—from our organic, ethically-sourced products
                                to our serene treatment rooms overlooking private gardens. This is wellness elevated
                                to an art form.
                            </p>
                            <div className="flex flex-wrap gap-8 mb-8">
                                <div>
                                    <p className="text-3xl font-light text-amber-500">15+</p>
                                    <p className="text-stone-500 text-sm">Years of Excellence</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-light text-amber-500">50k+</p>
                                    <p className="text-stone-500 text-sm">Happy Guests</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-light text-amber-500">25+</p>
                                    <p className="text-stone-500 text-sm">Expert Therapists</p>
                                </div>
                            </div>
                            <a href="#contact" className="inline-block px-8 py-3 border border-amber-500 text-amber-500 tracking-wide hover:bg-amber-500 hover:text-slate-900 transition-colors">
                                Discover More
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="bg-stone-800 h-48 flex items-center justify-center">
                                    <Sparkles className="w-12 h-12 text-amber-600/40" />
                                </div>
                                <div className="bg-stone-800 h-64 flex items-center justify-center">
                                    <Leaf className="w-12 h-12 text-amber-600/40" />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="bg-stone-800 h-64 flex items-center justify-center">
                                    <Heart className="w-12 h-12 text-amber-600/40" />
                                </div>
                                <div className="bg-stone-800 h-48 flex items-center justify-center">
                                    <Users className="w-12 h-12 text-amber-600/40" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 px-6 bg-stone-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-amber-600 tracking-widest text-sm mb-4 uppercase">Client Stories</p>
                        <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Words of Praise</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 shadow-sm">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                                <p className="text-slate-600 italic leading-relaxed mb-6">"{testimonial.review}"</p>
                                <div>
                                    <p className="text-slate-900 font-medium">{testimonial.name}</p>
                                    <p className="text-slate-500 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <p className="text-amber-600 tracking-widest text-sm mb-4 uppercase">Get in Touch</p>
                            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">Begin Your Journey</h2>
                            <p className="text-slate-600 leading-relaxed mb-10">
                                Ready to experience the ultimate in luxury wellness? Our concierge team is here
                                to craft your perfect spa experience.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-50 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm">Call Us</p>
                                        <p className="text-slate-900">(555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-50 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm">Email</p>
                                        <p className="text-slate-900">concierge@aurumspa.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-50 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm">Visit Us</p>
                                        <p className="text-slate-900">123 Luxury Lane, Beverly Hills, CA</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-amber-50 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-sm">Hours</p>
                                        <p className="text-slate-900">Daily 9:00 AM - 9:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-stone-50 p-8 lg:p-12">
                            <h3 className="text-2xl font-light text-slate-900 mb-6">Reserve Your Experience</h3>
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 bg-white border border-stone-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 bg-white border border-stone-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 bg-white border border-stone-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 bg-white border border-stone-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                                <select className="w-full px-4 py-3 bg-white border border-stone-200 text-slate-600 focus:outline-none focus:border-amber-500 transition-colors">
                                    <option>Select a Service</option>
                                    <option>Signature Facial</option>
                                    <option>Hydrotherapy</option>
                                    <option>Body Rituals</option>
                                    <option>Couples Retreat</option>
                                    <option>Energy Healing</option>
                                    <option>Aromatherapy</option>
                                </select>
                                <textarea
                                    rows={4}
                                    placeholder="Special Requests"
                                    className="w-full px-4 py-3 bg-white border border-stone-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-slate-900 text-white tracking-wide hover:bg-slate-800 transition-colors"
                                >
                                    Request Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-2">
                            <a href="#" className="text-2xl font-light tracking-widest mb-4 block">
                                AURUM <span className="text-amber-500">SPA</span>
                            </a>
                            <p className="text-stone-400 leading-relaxed max-w-md">
                                Beverly Hills' premier destination for luxury wellness. Where every treatment
                                is a journey and every visit is an escape.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-amber-500 tracking-widest text-sm mb-6 uppercase">Quick Links</h4>
                            <ul className="space-y-3">
                                <li><a href="#services" className="text-stone-400 hover:text-amber-500 transition-colors">Services</a></li>
                                <li><a href="#experience" className="text-stone-400 hover:text-amber-500 transition-colors">Experience</a></li>
                                <li><a href="#testimonials" className="text-stone-400 hover:text-amber-500 transition-colors">Reviews</a></li>
                                <li><a href="#contact" className="text-stone-400 hover:text-amber-500 transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-amber-500 tracking-widest text-sm mb-6 uppercase">Connect</h4>
                            <div className="flex gap-4 mb-6">
                                <a href="#" className="w-10 h-10 bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                            </div>
                            <p className="text-stone-400 text-sm">(555) 123-4567</p>
                            <p className="text-stone-400 text-sm">concierge@aurumspa.com</p>
                        </div>
                    </div>
                    <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-stone-500 text-sm">© 2024 Aurum Spa. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-stone-500 text-sm hover:text-amber-500 transition-colors">Privacy Policy</a>
                            <a href="#" className="text-stone-500 text-sm hover:text-amber-500 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
