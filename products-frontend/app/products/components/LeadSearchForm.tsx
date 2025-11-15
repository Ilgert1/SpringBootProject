"use client";
import { useState } from "react";

type LeadSearchFormProps = {
    onSearch: (city: string, state: string, radius: number, businessType: string) => void;
    searching: boolean;
};

export default function LeadSearchForm({ onSearch, searching }: LeadSearchFormProps) {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [radius, setRadius] = useState(5000);
    const [businessType, setBusinessType] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!city.trim()) {
            alert("Please enter a city");
            return;
        }
        if (!state.trim()) {
            alert("Please select a state");
            return;
        }

        onSearch(city.trim(), state.trim(), radius, businessType);
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Find Local Leads</h2>

            {searching && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <div className="flex-1">
                            <p className="font-medium text-blue-900">Searching for businesses...</p>
                            <p className="text-sm text-blue-700">Crawling Google Places API • Usually takes 20-30 seconds</p>
                        </div>
                    </div>
                    <div className="mt-3 bg-blue-200 rounded-full h-1.5 w-full overflow-hidden">
                        <div className="bg-blue-600 h-full animate-progress"></div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* City Input */}
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Boston"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                        disabled={searching}
                    />
                </div>

                {/* State Input */}
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State
                    </label>
                    <select
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                        disabled={searching}
                    >
                        <option value="">Select State</option>
                        <option value="MA">Massachusetts</option>
                        <option value="NY">New York</option>
                        <option value="CA">California</option>
                        <option value="FL">Florida</option>
                        <option value="TX">Texas</option>
                        {/* Add more states as needed */}
                    </select>
                </div>

                {/* Radius Select */}
                <div>
                    <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
                        Search Radius
                    </label>
                    <select
                        id="radius"
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                        disabled={searching}
                    >
                        <option value={1000}>0.6 miles</option>
                        <option value={3000}>2 miles</option>
                        <option value={5000}>3 miles</option>
                        <option value={8000}>5 miles</option>
                        <option value={16000}>10 miles</option>
                    </select>
                </div>

                {/* Business Type Select */}
                <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type
                    </label>
                    <select
                        id="businessType"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white"
                        disabled={searching}
                    >
                        <option value="">All Types</option>
                        <option value="restaurant">Restaurants</option>
                        <option value="cafe">Cafes</option>
                        <option value="bar">Bars</option>
                        <option value="store">Retail Stores</option>
                        <option value="salon">Salons & Spas</option>
                        <option value="gym">Gyms</option>
                        <option value="bakery">Bakeries</option>
                        <option value="plumber">Plumbers</option>
                        <option value="electrician">Electricians</option>
                        <option value="contractor">Contractors</option>
                        <option value="dentist">Dentists</option>
                        <option value="lawyer">Lawyers</option>
                        <option value="accounting">Accountants</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={searching}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                        searching
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
                    }`}
                >
                    {searching ? 'Searching...' : 'Search for Leads'}
                </button>

            </form>

            <style jsx>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 25s linear;
                }
            `}</style>
        </div>
    );
}