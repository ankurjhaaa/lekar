import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Map from "@/Components/Map";

export default function Booking() {
    const [selected, setSelected] = useState("bike");
    const [isSearching, setIsSearching] = useState(false);

    const rides = [
        { id: "bike", label: "Bike", price: "₹45", icon: "fa-motorcycle" },
        { id: "toto", label: "Toto", price: "₹60", icon: "fa-car-side" },
        { id: "auto", label: "Auto", price: "₹75", icon: "fa-taxi" },
        { id: "cab", label: "Cab", price: "₹120", icon: "fa-car" },
    ];

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
                    <Map />
                </div>

                {/* BOTTOM SHEET CONTENT */}
                <div className="flex-1 w-full bg-white relative flex flex-col overflow-hidden">

                    {!isSearching ? (
                        <>
                            {/* RIDES LIST */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
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
