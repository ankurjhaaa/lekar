import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";

export default function Support() {
    const helpCategories = [
        { title: "Account & Settings", icon: "user-gear", desc: "Profile, language, app settings" },
        { title: "Payment & Wallets", icon: "wallet", desc: "Refunds, payment modes, Lekar Coins" },
        { title: "Safety & Security", icon: "shield-halved", desc: "Emergency, ride safety, trusted contacts" },
        { title: "Referrals & Rewards", icon: "gift", desc: "Invites, referral bonus, coupons" },
        { title: "Service & Quality", icon: "star", desc: "Driver feedback, vehicle cleanliness" },
        { title: "About Lekar", icon: "circle-info", desc: "Terms, privacy policy, app info" },
    ];

    return (
        <PublicLayout>
            <Head title="Help & Support" />
            <div className="bg-white min-h-screen pb-24">

                {/* STICKY HEADER */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-4 shadow-sm">
                    <Link href="/profile">
                        <i className="fa-solid fa-arrow-left text-gray-900 text-lg"></i>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
                </div>

                <div className="px-5 py-6">
                    {/* SEARCH BAR */}
                    <div className="relative mb-8">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                            placeholder="How can we help you?"
                        />
                    </div>

                    {/* RECENT RIDE CONTEXT */}
                    <div className="mb-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Issue with recent ride?</h2>
                        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:border-indigo-100 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                                <i className="fa-solid fa-taxi text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-bold text-gray-900">Today, 10:23 AM</h3>
                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Completed</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate">Home (Patna) to P&M Mall</p>
                            </div>
                            <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
                        </div>
                    </div>

                    {/* ALL TOPICS */}
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Browse Topics</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {helpCategories.map((cat, index) => (
                                <div key={index} className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mr-4">
                                        <i className={`fa-solid fa-${cat.icon}`}></i>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-900">{cat.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                                    </div>
                                    <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT US */}
                    <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-indigo-200">
                        <h3 className="text-lg font-bold mb-2">Still need help?</h3>
                        <p className="text-indigo-100 text-sm mb-6">Our support team is available 24/7 to assist you.</p>
                        <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-indigo-50 transition-colors w-full">
                            Chat with Us
                        </button>
                    </div>

                </div>

                <BottomNav />
            </div>
        </PublicLayout>
    );
}
