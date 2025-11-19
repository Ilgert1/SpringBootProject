import React from 'react';
import { Phone, MapPin, Star, Mail, Clock, Users, Award, ChefHat, Pizza, Utensils } from 'lucide-react';

export default function BusinessWebsite() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-red-600 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Test Pizza Shop</h1>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#about" className="hover:text-red-200 transition-colors">About</a>
                        <a href="#menu" className="hover:text-red-200 transition-colors">Menu</a>
                        <a href="#contact" className="hover:text-red-200 transition-colors">Contact</a>
                        <a href="tel:(617)555-0123" className="bg-yellow-500 text-red-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                            Order Now
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="mb-6">
                        <Pizza className="w-16 h-16 mx-auto mb-4 text-yellow-400 animate-pulse" />
                        <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                            Test Pizza Shop
                        </h2>
                        <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
                            Milton&apos;s Premier Pizza Destination - Authentic Flavors, Fresh Ingredients, Unforgettable Taste
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <a href="tel:(617)555-0123" className="bg-yellow-500 text-red-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <Phone className="inline w-5 h-5 mr-2" />
                            Order Now: (617) 555-0123
                        </a>
                        <a href="#contact" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-red-600 transition-all duration-300">
                            Visit Us Today
                        </a>
                    </div>

                    {/* Rating Display */}
                    <div className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-lg py-3 px-6 inline-flex">
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-yellow-400 fill-current'}`} />
                            ))}
                        </div>
                        <span className="text-lg font-semibold">4.5/5</span>
                        <span className="text-red-100">(127 reviews)</span>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Test Pizza Shop?</h3>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Since opening our doors in Milton, we&apos;ve been committed to serving the community with
                            authentic, delicious pizza made from the finest ingredients.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <ChefHat className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Expert Chefs</h4>
                            <p className="text-gray-600">Our experienced chefs craft every pizza with passion and traditional techniques passed down through generations.</p>
                        </div>

                        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Fresh Ingredients</h4>
                            <p className="text-gray-600">We source only the freshest, highest quality ingredients daily to ensure every bite is perfect.</p>
                        </div>

                        <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Users className="w-12 h-12 text-red-600 mx-auto mb-4" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Community Favorite</h4>
                            <p className="text-gray-600">Proud to serve Milton families for years, building lasting relationships one pizza at a time.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section id="menu" className="py-16 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">Our Specialties</h3>
                        <p className="text-xl text-gray-600">From classic favorites to unique creations, we have something for everyone</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <Pizza className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Classic Margherita</h4>
                            <p className="text-gray-600 mb-3">Fresh mozzarella, basil, and our signature tomato sauce on hand-tossed dough</p>
                            <p className="text-lg font-bold text-red-600">From $14.99</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <Pizza className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Supreme Deluxe</h4>
                            <p className="text-gray-600 mb-3">Pepperoni, sausage, peppers, onions, mushrooms, and premium cheese</p>
                            <p className="text-lg font-bold text-red-600">From $18.99</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <Pizza className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">White Garlic</h4>
                            <p className="text-gray-600 mb-3">Ricotta, mozzarella, garlic, and fresh herbs - a customer favorite</p>
                            <p className="text-lg font-bold text-red-600">From $16.99</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <Utensils className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Fresh Salads</h4>
                            <p className="text-gray-600 mb-3">Garden fresh salads with house-made dressings and premium toppings</p>
                            <p className="text-lg font-bold text-red-600">From $8.99</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <Utensils className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Calzones</h4>
                            <p className="text-gray-600 mb-3">Stuffed with cheese and your choice of fillings, baked to golden perfection</p>
                            <p className="text-lg font-bold text-red-600">From $12.99</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                            <Utensils className="w-8 h-8 text-red-600 mb-3" />
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Wings & Sides</h4>
                            <p className="text-gray-600 mb-3">Crispy wings, garlic bread, and other delicious appetizers</p>
                            <p className="text-lg font-bold text-red-600">From $6.99</p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <a href="tel:(617)555-0123" className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Call to Order: (617) 555-0123
                        </a>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
                        <div className="flex items-center justify-center space-x-2 mb-6">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <span className="text-2xl font-bold text-gray-900">4.5/5</span>
                            <span className="text-gray-600">(127 reviews)</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex space-x-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">&quot;Best pizza in Milton! The crust is perfect and the ingredients are always fresh. Our family orders here every Friday night.&quot;</p>
                            <p className="font-semibold text-gray-900">- Sarah M.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex space-x-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-4">&quot;Amazing service and incredible flavors. The white garlic pizza is absolutely divine. Highly recommend!&quot;</p>
                            <p className="font-semibold text-gray-900">- Mike R.</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex space-x-1 mb-3">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                                <Star className="w-4 h-4 text-gray-300" />
                            </div>
                            <p className="text-gray-600 mb-4">&quot;Great local pizza shop with authentic flavors. The staff is friendly and the delivery is always on time.&quot;</p>
                            <p className="font-semibold text-gray-900">- Jennifer L.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 px-4 bg-red-600 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl font-bold mb-4">Visit Us Today</h3>
                        <p className="text-xl text-red-100">We&apos;re ready to serve you the best pizza in Milton</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-2xl font-bold mb-6">Contact Information</h4>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-6 h-6 text-yellow-400" />
                                    <div>
                                        <p className="font-semibold">Phone</p>
                                        <a href="tel:(617)555-0123" className="text-red-100 hover:text-white transition-colors">
                                            (617) 555-0123
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-6 h-6 text-yellow-400" />
                                    <div>
                                        <p className="font-semibold">Address</p>
                                        <p className="text-red-100">123 Main St, Milton, MA</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="w-6 h-6 text-yellow-400" />
                                    <div>
                                        <p className="font-semibold">Hours</p>
                                        <p className="text-red-100">Mon-Sun: 11:00 AM - 10:00 PM</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="w-6 h-6 text-yellow-400" />
                                    <div>
                                        <p className="font-semibold">Email</p>
                                        <a href="mailto:info@testpizzashop.com" className="text-red-100 hover:text-white transition-colors">
                                            info@testpizzashop.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-10 rounded-lg p-6">
                            <h4 className="text-2xl font-bold mb-4">Quick Order</h4>
                            <p className="text-red-100 mb-6">
                                Call us now for pickup or delivery! We accept all major payment methods and offer contactless delivery.
                            </p>
                            <a href="tel:(617)555-0123" className="block bg-yellow-500 text-red-900 px-6 py-3 rounded-lg text-center text-lg font-bold hover:bg-yellow-400 transition-colors">
                                <Phone className="inline w-5 h-5 mr-2" />
                                Call Now: (617) 555-0123
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-2">Test Pizza Shop</h2>
                    <p className="text-gray-400 mb-4">Milton&apos;s Premier Pizza Destination</p>
                    <p className="text-gray-500 text-sm">
                        © 2024 Test Pizza Shop. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}