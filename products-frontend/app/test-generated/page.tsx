import React from 'react';
import { Phone, MapPin, Star, Mail, Clock, Utensils, ChefHat, Users } from 'lucide-react';

export default function BusinessWebsite() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-orange-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative container mx-auto px-4 py-20 lg:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
                            Master Wok
                        </h1>
                        <p className="text-xl lg:text-2xl mb-8 text-red-100">
                            Authentic Asian Cuisine • Fresh Ingredients • Bold Flavors
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                                Order Now
                            </button>
                            <button className="border-2 border-white text-white hover:bg-white hover:text-red-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                                View Menu
                            </button>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-yellow-400">
                            <div className="flex">
                                {[1, 2, 3].map((star) => (
                                    <Star key={star} className="h-6 w-6 fill-current" />
                                ))}
                                {[1, 2].map((star) => (
                                    <Star key={star} className="h-6 w-6 text-gray-300" />
                                ))}
                            </div>
                            <span className="text-white ml-2">2.6 stars • 46 reviews</span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L1440 0V120H0Z" fill="white"/>
                    </svg>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    Crafting Authentic Asian Flavors Since Day One
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    At Master Wok, we bring together traditional recipes passed down through generations
                                    with the freshest ingredients to create an unforgettable dining experience. Our skilled
                                    chefs use authentic wok techniques to deliver bold, flavorful dishes that transport
                                    you straight to the heart of Asia.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex items-center space-x-3">
                                        <ChefHat className="h-8 w-8 text-red-600" />
                                        <span className="text-gray-700">Expert Chefs</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Utensils className="h-8 w-8 text-red-600" />
                                        <span className="text-gray-700">Fresh Ingredients</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                        <span className="font-semibold text-gray-800">Fast Service</span>
                                        <Clock className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                        <span className="font-semibold text-gray-800">Quality Food</span>
                                        <Utensils className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                                        <span className="font-semibold text-gray-800">Family Friendly</span>
                                        <Users className="h-6 w-6 text-red-600" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Highlights Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Signature Dishes</h2>
                            <p className="text-xl text-gray-600">Taste the authentic flavors of Asia</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Kung Pao Chicken",
                                    description: "Tender chicken with peanuts and vegetables in our signature spicy sauce",
                                    price: "$12.95"
                                },
                                {
                                    title: "Beef & Broccoli",
                                    description: "Classic stir-fry with tender beef and fresh broccoli in brown sauce",
                                    price: "$13.95"
                                },
                                {
                                    title: "Vegetable Lo Mein",
                                    description: "Fresh vegetables and noodles tossed in our savory house sauce",
                                    price: "$10.95"
                                },
                                {
                                    title: "Sweet & Sour Pork",
                                    description: "Crispy pork with pineapple and bell peppers in tangy sauce",
                                    price: "$12.95"
                                },
                                {
                                    title: "Shrimp Fried Rice",
                                    description: "Wok-fried rice with fresh shrimp, eggs, and mixed vegetables",
                                    price: "$11.95"
                                },
                                {
                                    title: "General Tso's Chicken",
                                    description: "Crispy chicken in our famous sweet and spicy General Tso's sauce",
                                    price: "$13.95"
                                }
                            ].map((dish, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                    <div className="h-48 bg-gradient-to-br from-red-400 to-orange-500 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-4 left-4">
                      <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold text-lg">
                        {dish.price}
                      </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{dish.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{dish.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                                View Full Menu
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                        <div className="flex items-center justify-center space-x-2 mb-12">
                            <div className="flex">
                                {[1, 2, 3].map((star) => (
                                    <Star key={star} className="h-8 w-8 fill-current text-yellow-400" />
                                ))}
                                {[1, 2].map((star) => (
                                    <Star key={star} className="h-8 w-8 text-gray-300" />
                                ))}
                            </div>
                            <span className="text-2xl font-semibold text-gray-700 ml-4">2.6 out of 5</span>
                            <span className="text-gray-500">• 46 reviews</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                {
                                    name: "Sarah M.",
                                    rating: 4,
                                    comment: "Great portions and fast service! The fried rice is always fresh and flavorful."
                                },
                                {
                                    name: "Mike R.",
                                    rating: 3,
                                    comment: "Good value for money. The kung pao chicken has just the right amount of spice."
                                },
                                {
                                    name: "Lisa T.",
                                    rating: 4,
                                    comment: "Convenient location in Braintree. Love their beef and broccoli dish!"
                                },
                                {
                                    name: "John D.",
                                    rating: 2,
                                    comment: "Food is decent for the price. Could use more seasoning in some dishes."
                                }
                            ].map((review, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="ml-3 font-semibold text-gray-900">{review.name}</span>
                                    </div>
                                    <p className="text-gray-600 italic">&quot;{review.comment}&quot;</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gradient-to-br from-red-900 to-red-800 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Visit Master Wok Today</h2>
                            <p className="text-xl text-red-100">Experience authentic Asian cuisine in the heart of Braintree</p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="h-8 w-8 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Location</h3>
                                        <p className="text-red-100 text-lg">
                                            250 Granite Street #195<br />
                                            Braintree, MA
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Clock className="h-8 w-8 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Hours</h3>
                                        <div className="text-red-100 space-y-1">
                                            <p>Monday - Thursday: 11:00 AM - 9:30 PM</p>
                                            <p>Friday - Saturday: 11:00 AM - 10:00 PM</p>
                                            <p>Sunday: 12:00 PM - 9:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Mail className="h-8 w-8 text-orange-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Connect With Us</h3>
                                        <p className="text-red-100">Follow us on social media for daily specials and updates</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                <h3 className="text-2xl font-bold mb-6 text-center">Ready to Order?</h3>
                                <div className="space-y-4">
                                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                                        Order for Pickup
                                    </button>
                                    <button className="w-full border-2 border-white text-white hover:bg-white hover:text-red-800 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300">
                                        Call for Delivery
                                    </button>
                                </div>
                                <p className="text-center text-red-100 mt-6">
                                    Questions? We&apos;re here to help!<br />
                                    Visit us at our Braintree location.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Master Wok</h3>
                                <p className="text-gray-400 mb-4">
                                    Authentic Asian Cuisine in Braintree, MA
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Phone className="h-6 w-6" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <MapPin className="h-6 w-6" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <Mail className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Order Online</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>250 Granite Street #195</li>
                                    <li>Braintree, MA</li>
                                    <li className="pt-2">
                                        <a href="tel:+1234567890" className="hover:text-white transition-colors">
                                            (123) 456-7890
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-800 pt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                © 2024 Master Wok. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}