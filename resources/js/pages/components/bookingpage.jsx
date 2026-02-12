import { useEffect, useState } from "react";

export default function BookingPage({ onClose }) {
    const [selected, setSelected] = useState("bike");
    const [status, setStatus] = useState("idle");

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
                absolute inset-0 z-50 bg-[#ffffff]
                transform translate-x-full
                transition-transform duration-300 ease-out
                flex flex-col
            "
        >
            {/* BACK */}
            <button
                onClick={onClose}
                className="
                    absolute top-4 left-4 z-10
                    w-10 h-10 rounded-full
                    bg-white shadow
                    flex items-center justify-center
                "
            >
                <i className="fa-solid fa-arrow-left text-gray-800"></i>
            </button>

            {/* MAP */}
            <div className="h-[45%] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                Map Area
            </div>

            {/* RIDES (Hide when searching if you want) */}
            {status === "idle" && (
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
                                        className={`fa-solid ${ride.icon} text-xl ${
                                            isActive
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
            )}

            {/* BOTTOM AREA */}
            <div
                className={`
                    bg-white border-t border-gray-100 px-6
                    transition-all duration-300
                    ${status === "idle"
                        ? "py-4"
                        : "flex-1 flex flex-col justify-center items-center"}
                `}
            >
                {status === "idle" ? (
                    <>
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
                            onClick={() => setStatus("searching")}
                            className="w-full h-14 rounded-2xl bg-[#FFD200] text-black font-semibold active:scale-95 transition"
                        >
                            Confirm Ride
                        </button>
                    </>
                ) : (
                    <>
                        {/* FULL HEIGHT SEARCHING UI */}
                        <div className="flex flex-col items-center space-y-6">

                            <div className="relative flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-yellow-200 animate-ping absolute"></div>
                                <div className="w-20 h-20 rounded-full bg-[#FFD200] flex items-center justify-center">
                                    <i className="fa-solid fa-motorcycle text-2xl text-black"></i>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-lg font-semibold text-gray-900">
                                    Finding rider...
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Connecting nearby drivers
                                </p>
                            </div>

                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-6 text-sm text-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}