import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";

export default function OneWay() {
    return (
        <PublicLayout>
            <Head title="One Way Cabs" />
            <div className="bg-white min-h-screen pb-24">

                {/* STICKY HEADER */}
                <div className="sticky top-0 z-10 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
                    <h1 className="text-xl font-bold text-gray-900">One Way Cabs</h1>
                </div>

                <div className="px-5 py-6">
                    {/* CLEAN USP SECTION */}
                    <div className="mb-8 text-center">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold tracking-wide uppercase mb-3">
                            Premium Intercity
                        </span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pay Only One Side</h2>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                            Travel intercity and pay only for the distance you travel. No return fare.
                        </p>
                    </div>

                    {/* BOOKING FORM - CLEAN & FRESH */}
                    <div className="bg-white">
                        <div className="space-y-6">
                            {/* FROM & TO with Timeline */}
                            <div className="relative">
                                {/* Connecting Line */}
                                <div className="absolute left-[18px] top-10 bottom-10 w-[2px] bg-gray-100 rounded-full"></div>

                                {/* Pickup */}
                                <div className="relative mb-4">
                                    <div className="absolute left-0 top-3.5 z-10 w-10 h-10 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full outline outline-4 outline-white"></div>
                                    </div>
                                    <div className="ml-10">
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                                            From
                                        </label>
                                        <input
                                            type="text"
                                            className="block w-full px-0 py-2 bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-300 focus:ring-0 outline-none"
                                            placeholder="Enter Pickup City"
                                        />
                                    </div>
                                </div>


                                {/* Drop */}
                                <div className="relative">
                                    <div className="absolute left-0 top-3.5 z-10 w-10 h-10 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full outline outline-4 outline-white"></div>
                                    </div>
                                    <div className="ml-10">
                                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">To</label>
                                        <input
                                            type="text"
                                            className="block w-full px-0 py-2 bg-transparent text-lg font-semibold text-gray-900 placeholder-gray-300 focus:ring-0 outline-none"
                                            placeholder="Enter Drop City"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* DATE & TIME - MIMALIST CARD */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date</label>
                                    <input
                                        type="date"
                                        className="block w-full bg-transparent text-sm font-bold text-gray-900 focus:ring-0 outline-none"
                                    />
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-4 transition-colors hover:bg-gray-100">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Time</label>
                                    <input
                                        type="time"
                                        className="block w-full bg-transparent text-sm font-bold text-gray-900 focus:ring-0 outline-none"
                                    />
                                </div>
                            </div>

                            {/* FIND RIDE BUTTON */}
                            <button className="w-full bg-black text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl hover:bg-gray-900 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                                <span>Find Cabs</span>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* FEATURES - SUBTLE */}
                    <div className="mt-10 pt-8 border-t border-gray-50 grid grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mx-auto mb-2">
                                <i className="fa-solid fa-shield-halved text-sm"></i>
                            </div>
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Safe Rides</h4>
                        </div>
                        <div className="text-center">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mx-auto mb-2">
                                <i className="fa-solid fa-user-tie text-sm"></i>
                            </div>
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Top Drivers</h4>
                        </div>
                        <div className="text-center">
                            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mx-auto mb-2">
                                <i className="fa-solid fa-bolt text-sm"></i>
                            </div>
                            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Fast Booking</h4>
                        </div>
                    </div>

                </div>

                <BottomNav />
            </div>
        </PublicLayout>
    );
}
