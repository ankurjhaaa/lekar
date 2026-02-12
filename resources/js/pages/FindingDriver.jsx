import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Map from "@/Components/Map";

export default function FindingDriver() {
    return (
        <PublicLayout>
            <Head title="Finding Driver" />
            <div
                className="
                    min-h-screen bg-[#ffffff]
                    flex flex-col items-center justify-center
                    relative overflow-hidden
                "
            >
                {/* MAP BACKGROUND */}
                <div className="absolute inset-0 z-0">
                    <Map />
                </div>

                {/* CONTENT OVERLAY */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-white/80 backdrop-blur-sm">
                    {/* Yellow Pulse Loader */}
                    <div className="relative flex items-center justify-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-yellow-200 animate-ping absolute"></div>
                        <div className="w-20 h-20 rounded-full bg-[#FFD200] flex items-center justify-center">
                            <i className="fa-solid fa-motorcycle text-2xl text-black"></i>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            Finding your ride...
                        </h2>

                        <p className="text-sm text-gray-500">
                            Connecting you to nearby drivers
                        </p>
                    </div>

                    <Link
                        href="/booking"
                        className="absolute bottom-10 text-sm text-gray-500"
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
