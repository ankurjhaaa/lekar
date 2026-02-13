import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";

export default function Profile() {
    const menuItems = [
        { label: "Help", icon: "circle-question", route: "/support" },
        { label: "Parcel - Send Items", icon: "box", route: "/parcel" },
        { label: "Payment", icon: "money-bill-wave", route: "/payment" }, // or credit-card
        { label: "My Rides", icon: "clock-rotate-left", route: "/activity" },
        { label: "Safety", icon: "shield-halved", route: "/safety" },
        { label: "Refer and Earn", icon: "gift", route: "/refer", subtitle: "Get ₹50" },
        { label: "My Rewards", icon: "medal", route: "/rewards" },
        { label: "Power Pass", icon: "ticket", route: "/pass" }, // star or ticket
        { label: "Lekar Coins", icon: "coins", route: "/coins" },
    ];

    return (
        <PublicLayout>
            <Head title="Profile" />
            <div className="bg-white min-h-screen pb-24">
                {/* HEADER */}
                <div className="sticky top-0 z-10 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
                    <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                </div>

                {/* USER CARD */}
                <div className="px-4 mb-4 mt-2">
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                        {/* Profile Row */}
                        <div className="flex items-center p-4">
                            {/* Avatar Ring */}
                            <div className="relative mr-4">
                                <div className="w-14 h-14 rounded-full border-2 border-indigo-900 flex items-center justify-center p-1">
                                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                        <i className="fa-solid fa-user text-xl"></i>
                                    </div>
                                </div>
                                {/* Online Status or similar if needed, sticking to design */}
                            </div>

                            <div className="flex-1">
                                <h2 className="text-sm font-bold text-gray-900 tracking-wide uppercase">KUMAR ANKUR</h2>
                                <p className="text-gray-500 text-sm font-medium">7763972896</p>
                            </div>

                            <i className="fa-solid fa-chevron-right text-gray-800 text-xs"></i>
                        </div>

                        {/* Divider */}
                        <div className="h-[1px] bg-gray-100 mx-4"></div>

                        {/* Rating Row */}
                        <div className="flex items-center p-4 py-3">
                            <div className="w-14 flex justify-center items-center mr-4">
                                <i className="fa-solid fa-star text-yellow-400 text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <span className="text-sm font-bold text-gray-800">4.94 My Rating</span>
                            </div>
                            <i className="fa-solid fa-chevron-right text-gray-800 text-xs"></i>
                        </div>
                    </div>
                </div>

                {/* MENU LIST */}
                <div className="px-0">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.route}
                            className="flex items-center px-6 py-4 border-b border-gray-50 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                        >
                            <div className="w-8 flex items-center justify-center mr-4 opacity-70">
                                <i className={`fa-solid fa-${item.icon} text-lg text-gray-600`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="text-[15px] font-semibold text-gray-800">{item.label}</p>
                                {item.subtitle && (
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">{item.subtitle}</p>
                                )}
                            </div>
                            <i className="fa-solid fa-chevron-right text-gray-800 text-xs"></i>
                        </Link>
                    ))}
                </div>

                {/* LOGOUT (Optional at bottom of list or separate) - Keeping in list or separate? 
                    Screenshot ends at "Rapido Coins". I will add Logout at the very end just in case, but subtle.
                */}
                <div className="px-6 py-4">
                    <Link href="/logout" className="flex items-center gap-4 text-gray-400 hover:text-red-500 transition-colors">
                        <i className="fa-solid fa-power-off"></i>
                        <span className="font-medium text-sm">Log Out</span>
                    </Link>
                </div>

                <BottomNav />
            </div>
        </PublicLayout>
    );
}
