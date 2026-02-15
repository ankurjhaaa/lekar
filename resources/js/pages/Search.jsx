import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Map from "@/Components/Map";

export default function Search() {
    const [query, setQuery] = useState("");

    const [suggestions, setSuggestions] = useState([]);

    // Load Mappls SDK
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://apis.mappls.com/advancedmaps/api/${import.meta.env.VITE_MAPPLS_API_KEY}/map_sdk?layer=vector&v=3.0`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    // Mappls AutoSuggest / Search
    useEffect(() => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            if (window.mappls && window.mappls.search) {
                const searchOptions = {
                    query: query,
                    tokenizeAddress: true, // often helps
                    location: { lat: 28.6139, lng: 77.2090 } // Bias to Delhi
                };

                new window.mappls.search(searchOptions, (data) => {
                    console.log("Search Data:", data);
                    if (data && Array.isArray(data)) {
                        const mapped = data.map(item => ({
                            name: item.placeName || item.placeAddress,
                            desc: item.placeAddress, // Additional description
                            lat: item.latitude,
                            lng: item.longitude,
                            eLoc: item.eLoc
                        }));
                        setSuggestions(mapped);
                    }
                });
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <PublicLayout>
            <Head title="Search Destination" />
            <div
                className="
                    min-h-screen bg-[#ffffff]
                    flex flex-col
                "
            >
                {/* HEADER */}
                <div className="px-6 pt-5 pb-4 flex items-center gap-4">
                    <Link href="/">
                        <i className="fa-solid fa-arrow-left text-gray-800 text-lg"></i>
                    </Link>
                    <h2 className="font-semibold text-gray-900">
                        Set destination
                    </h2>
                </div>

                {/* PICKUP / DROP */}
                <div className="px-6 mt-2">

                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <input
                            defaultValue="Current location"
                            readOnly
                            className="flex-1 py-2 border-b border-gray-200 bg-transparent outline-none font-medium text-gray-800"
                        />
                    </div>

                    <div className="w-0.5 h-4 bg-gray-200 ml-1"></div>

                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <input
                            placeholder="Enter destination"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 py-2 border-b border-gray-200 outline-none font-medium"
                        />
                    </div>
                </div>

                {/* DYNAMIC RESULTS */}
                <div className="flex-1 overflow-y-auto">
                    {query ? (
                        /* SEARCH RESULTS */
                        <div className="px-6 py-4 space-y-4">
                            <p className="text-xs font-semibold text-gray-400 tracking-wide">
                                SEARCH RESULTS
                            </p>
                            {suggestions.map((place, i) => (
                                <button
                                    key={i}
                                    onClick={() => router.visit('/booking', {
                                        data: {
                                            dropLat: place.lat,
                                            dropLng: place.lng,
                                            dropName: place.name,
                                            dropDesc: place.desc || ""
                                        }
                                    })}
                                    className="w-full text-left flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mt-1">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className="flex-1 border-b border-gray-100 pb-3">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                            {place.name}
                                        </p>
                                        <p className="text-xs text-gray-400 line-clamp-1">
                                            {place.desc || place.name}
                                        </p>
                                    </div>
                                </button>
                            ))}
                            {/* Fallback if no filter match */}
                            {suggestions.length === 0 && (
                                <div className="text-center text-gray-400 text-sm mt-10">
                                    <p>No results found</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* DEFAULT OPTIONS (Saved, Recent, etc.) */
                        <>
                            {/* LOCATE ON MAP */}
                            <div className="px-6 py-4 border-b border-gray-100">
                                <button className="flex items-center gap-4 text-left w-full group">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-gray-200 transition">
                                        <i className="fa-solid fa-map-location-dot"></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Locate on Map</h3>
                                        <p className="text-xs text-gray-500">Set exact location manually</p>
                                    </div>
                                </button>
                            </div>

                            {/* SAVED PLACES */}
                            <div className="px-6 py-6 border-b border-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xs font-bold text-gray-400 tracking-wider">SAVED PLACES</h3>
                                    <button className="text-xs text-indigo-600 font-semibold">EDIT</button>
                                </div>
                                <div className="space-y-5">
                                    <button className="flex items-center gap-4 w-full text-left group">
                                        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-gray-100 transition">
                                            <i className="fa-solid fa-house"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Home</h4>
                                            <p className="text-xs text-gray-400">Add address</p>
                                        </div>
                                    </button>
                                    <button className="flex items-center gap-4 w-full text-left group">
                                        <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-gray-100 transition">
                                            <i className="fa-solid fa-briefcase"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Work</h4>
                                            <p className="text-xs text-gray-400">Add address</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* RECENT SEARCHES */}
                            <div className="px-6 py-6">
                                <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-4">RECENT SEARCHES</h3>
                                <div className="space-y-6">
                                    {[
                                        { name: "Connaught Place", city: "New Delhi", icon: "clock-rotate-left" },
                                        { name: "Rajiv Chowk Metro", city: "New Delhi", icon: "clock-rotate-left" },
                                        { name: "India Gate", city: "New Delhi", icon: "location-dot" },
                                        { name: "Select Citywalk", city: "Saket", icon: "location-dot" },
                                    ].map((place, i) => (
                                        <button
                                            key={i}
                                            onClick={() => router.visit('/booking')}
                                            className="w-full text-left flex items-start gap-4 group"
                                        >
                                            <i className={`fa-solid fa-${place.icon} text-gray-400 mt-1 group-hover:text-gray-600 transition`}></i>
                                            <div className="flex-1 border-b border-gray-50 pb-4">
                                                <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition">
                                                    {place.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {place.city}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </PublicLayout >
    );
}
