import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Map from "@/Components/Map";

export default function Booking() {
    // Mock Pickup (User Location) - Default Delhi, updated by effect
    const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 });
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                // Generate vehicles around user
                const types = ['bike', 'auto', 'cab', 'toto'];
                const generated = Array.from({ length: 8 }).map((_, i) => ({
                    id: i,
                    type: types[Math.floor(Math.random() * types.length)],
                    position: {
                        lat: latitude + (Math.random() - 0.5) * 0.015,
                        lng: longitude + (Math.random() - 0.5) * 0.015
                    },
                    heading: Math.floor(Math.random() * 360)
                }));
                setVehicles(generated);
            });
        }
    }, []);

    // Get Drop Location from query params
    const params = new URLSearchParams(window.location.search);
    const dropLat = params.get('dropLat');
    const dropLng = params.get('dropLng');
    const dropName = params.get('dropName') || "Drop Location";
    const dropDesc = params.get('dropDesc') || "";
    const dropLocation = dropLat && dropLng ? { lat: parseFloat(dropLat), lng: parseFloat(dropLng) } : null;

    // Distance Calculation (Haversine)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const [realDistance, setRealDistance] = useState(0);

    const haversineDist = dropLocation ? calculateDistance(userLocation.lat, userLocation.lng, dropLocation.lat, dropLocation.lng) : 0;
    const distance = realDistance > 0 ? realDistance : haversineDist;

    const handleRouteCalculated = (data) => {
        if (data && data.distance) {
            setRealDistance(data.distance / 1000); // Convert meters to km
        }
    };

    // Pricing Logic
    const basePrice = { bike: 20, toto: 30, auto: 40, cab: 60 };
    const perKm = { bike: 10, toto: 15, auto: 20, cab: 30 };

    const getPrice = (type) => {
        if (!distance) return "₹--";
        const val = Math.round(basePrice[type] + (distance * perKm[type]));
        return "₹" + val;
    };

    const rides = [
        { id: "bike", label: "Bike", price: getPrice('bike'), icon: "fa-motorcycle" },
        { id: "toto", label: "Toto", price: getPrice('toto'), icon: "fa-car-side" },
        { id: "auto", label: "Auto", price: getPrice('auto'), icon: "fa-taxi" },
        { id: "cab", label: "Cab", price: getPrice('cab'), icon: "fa-car" },
    ];

    const [selected, setSelected] = useState("bike");
    const [isSearching, setIsSearching] = useState(false);

    // Mock vehicles removed in favor of dynamic generation above


    return (
        <PublicLayout>
            <Head title="Choose a Ride" />
            <div className="h-screen w-full flex flex-col bg-white overflow-hidden relative">

                {/* MAP AREA (Fixed Height) */}
                <div className="h-[45vh] w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm relative shrink-0">
                    <Link
                        href="/search"
                        className="
                            absolute top-4 left-4 z-10
                            w-10 h-10 rounded-full
                            bg-white shadow
                            flex items-center justify-center
                        "
                    >
                        <i className="fa-solid fa-arrow-left text-gray-800"></i>
                    </Link>
                    <Map
                        vehicles={vehicles}
                        pickup={userLocation}
                        drop={dropLocation}
                        onRouteCalculated={handleRouteCalculated}
                    />
                </div>

                {/* BOTTOM SHEET CONTENT */}
                <div className="flex-1 w-full bg-white relative flex flex-col overflow-hidden">

                    {!isSearching ? (
                        <>
                            {/* RIDES LIST */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                                {/* LOCATION HEADER */}
                                <div className="bg-gray-50 p-4 rounded-xl mb-4 shadow-sm border border-gray-100 relative">
                                    {/* Distance/Duration Badge */}
                                    {distance > 0 && (
                                        <div className="absolute top-4 right-4 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm flex items-center gap-2 z-20">
                                            <span className="text-xs font-bold text-gray-800">{distance.toFixed(1)} km</span>
                                            {duration > 0 && (
                                                <>
                                                    <span className="w-0.5 h-3 bg-gray-300"></span>
                                                    <span className="text-xs font-bold text-gray-800">{duration} min</span>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* Line */}
                                    <div className="absolute left-[29px] top-[34px] bottom-[34px] w-0.5 border-l-2 border-dashed border-gray-300"></div>

                                    {/* Pickup */}
                                    <div className="flex items-start gap-4 mb-5 relative z-10">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1 ring-4 ring-white shadow-sm"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-0.5">PICKUP</p>
                                            <p className="text-sm font-semibold text-gray-900">Current Location</p>
                                        </div>
                                    </div>

                                    {/* Drop */}
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-3 h-3 bg-red-500 mt-1 ring-4 ring-white shadow-sm rotate-45 transform origin-center"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-gray-400 font-bold tracking-wider mb-0.5">DROP OFF</p>
                                            <p className="text-sm font-semibold text-gray-900 line-clamp-1">{dropName}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{dropDesc}</p>
                                        </div>
                                    </div>
                                </div>

                                {rides.map((ride) => {
                                    const isActive = selected === ride.id;
                                    return (
                                        <button
                                            key={ride.id}
                                            onClick={() => setSelected(ride.id)}
                                            className={`
                                                w-full flex items-center justify-between
                                                px-4 py-5 rounded-xl bg-white transition
                                                ${isActive
                                                    ? "border-2 border-yellow-400"
                                                    : "border border-gray-100"}
                                            `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <i
                                                    className={`fa-solid ${ride.icon} text-xl ${isActive
                                                        ? "text-yellow-500"
                                                        : "text-gray-400"
                                                        }`}
                                                ></i>
                                                <div className="text-left">
                                                    <p className="font-medium text-gray-900">
                                                        {ride.label}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        2–4 mins away
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                {ride.price}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* BOTTOM ACTION */}
                            <div className="bg-white border-t border-gray-100 px-6 py-4 shrink-0">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <i className="fa-solid fa-wallet text-gray-700"></i>
                                        <span className="font-medium text-gray-800">
                                            Cash
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-700">
                                        <i className="fa-solid fa-tag"></i>
                                        <span className="font-medium text-sm">
                                            Offers
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsSearching(true)}
                                    className="w-full h-14 rounded-2xl bg-[#FFD200] text-black font-semibold active:scale-95 transition"
                                >
                                    Confirm Ride
                                </button>
                            </div>
                        </>
                    ) : (
                        /* FINDING DRIVER UI (In-place replacement) */
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                            {/* Yellow Pulse Loader */}
                            <div className="relative flex items-center justify-center mb-8">
                                <div className="w-24 h-24 rounded-full bg-yellow-200 animate-ping absolute"></div>
                                <div className="w-20 h-20 rounded-full bg-[#FFD200] flex items-center justify-center relative z-10">
                                    <i className="fa-solid fa-motorcycle text-2xl text-black"></i>
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Finding your ride...
                            </h2>

                            <p className="text-sm text-gray-500 mb-12">
                                Connecting you to nearby drivers
                            </p>

                            <button
                                onClick={() => setIsSearching(false)}
                                className="text-sm text-gray-400 hover:text-gray-600 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
