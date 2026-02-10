import { useEffect, useState } from "react";

export default function BookingPage({ onClose }) {
    const [selected, setSelected] = useState("bike");

    useEffect(() => {
        requestAnimationFrame(() => {
            document
                .getElementById("booking-page")
                ?.classList.remove("translate-x-full");
        });
    }, []);

    const rides = [
        { id: "bike", label: "Bike", price: "₹45", icon: "fa-motorcycle" },
        { id: "toto", label: "Toto", price: "₹60", icon: "fa-car-side" },
        { id: "auto", label: "Auto", price: "₹75", icon: "fa-taxi" },
        { id: "cab", label: "Cab", price: "₹120", icon: "fa-car" },
    ];

    return (
        <div
            id="booking-page"
            className="
                absolute inset-0 z-50 bg-white
                transform translate-x-full
                transition-transform duration-300 ease-out
                flex flex-col
            "
        >
            {/* FLOATING BACK ICON */}
            <button
                onClick={onClose}
                className="
                    absolute top-4 left-4 z-10
                    w-10 h-10 rounded-full
                    bg-white/90 backdrop-blur
                    shadow
                    flex items-center justify-center
                "
            >
                <i className="fa-solid fa-arrow-left text-gray-700"></i>
            </button>

            {/* MAP AREA */}
            <div className="h-[45%] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                Map Area (static)
            </div>

            {/* VEHICLE OPTIONS (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {rides.map((ride) => {
                    const isActive = selected === ride.id;

                    return (
                        <button
                            key={ride.id}
                            onClick={() => setSelected(ride.id)}
                            className={`
                                w-full flex items-center justify-between
                                px-4 py-5 rounded-lg
                                bg-white
                                transition
                                ${isActive
                                    ? "border border-black"
                                    : ""}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <i
                                    className={`fa-solid ${ride.icon} text-xl ${isActive
                                        ? "text-black"
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

            {/* PAYMENT + CONFIRM */}
            <div className="px-6 py-4 border-t border-gray-100 space-y-4 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.19)] rounded-t-2xl">
                <div className="flex items-center justify-between">
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

                {/* CONFIRM BUTTON (THEME COLOR) */}
                <button className="w-full h-14 rounded-2xl bg-blue-500 text-white font-semibold">
                    Confirm Ride
                </button>
            </div>
        </div>
    );
}
