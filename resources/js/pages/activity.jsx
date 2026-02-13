import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";

export default function Activity() {
    const rides = [
        {
            id: 1,
            date: "Today, 10:23 AM",
            status: "Completed",
            statusColor: "text-green-600 bg-green-50",
            source: "Home (Patna)",
            destination: "P&M Mall",
            price: "₹120",
            vehicle: "Auto",
            icon: "taxi"
        },
        {
            id: 2,
            date: "Yesterday, 06:45 PM",
            status: "Cancelled",
            statusColor: "text-red-500 bg-red-50",
            source: "Office Park",
            destination: "Home (Patna)",
            price: "₹0",
            vehicle: "Bike",
            icon: "motorcycle"
        },
        {
            id: 3,
            date: "12 Feb, 02:15 PM",
            status: "Completed",
            statusColor: "text-green-600 bg-green-50",
            source: "Railway Station",
            destination: "Gandhi Maidan",
            price: "₹85",
            vehicle: "Auto",
            icon: "taxi"
        }
    ];

    return (
        <PublicLayout>
            <Head title="Your Rides" />
            <div className="bg-white min-h-screen pb-24">

                {/* STICKY HEADER */}
                <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-4 shadow-sm">
                    <Link href="/profile">
                        <i className="fa-solid fa-arrow-left text-gray-900 text-lg"></i>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Your Rides</h1>
                </div>

                {/* RIDE LIST */}
                <div className="px-4 py-4 space-y-4">
                    {rides.map((ride) => (
                        <div key={ride.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                            {/* Header: Date & Status */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded-lg">
                                    {ride.date}
                                </span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${ride.statusColor}`}>
                                    {ride.status}
                                </span>
                            </div>

                            {/* Route Visualization */}
                            <div className="flex gap-3 mb-4 relative">
                                {/* Timeline Line */}
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    <div className="w-[2px] h-8 bg-gray-200 my-0.5 border-l border-dashed border-gray-300"></div>
                                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                                </div>

                                <div className="flex-1">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-semibold text-gray-900">{ride.source}</h3>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">{ride.destination}</h3>
                                    </div>
                                </div>

                                {/* Price & Icon */}
                                <div className="flex flex-col items-end justify-center">
                                    <p className="text-lg font-bold text-gray-900">{ride.price}</p>
                                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                                        <i className={`fa-solid fa-${ride.icon}`}></i>
                                        <span>{ride.vehicle}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 border-t border-gray-50 pt-3">
                                <button className="flex-1 py-1.5 rounded-lg border border-indigo-100 text-indigo-600 text-xs font-bold hover:bg-indigo-50 transition-colors">
                                    <i className="fa-solid fa-rotate-right mr-1.5"></i> Rebook
                                </button>
                                <button className="flex-1 py-1.5 rounded-lg border border-gray-100 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors">
                                    Help
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Empty State / Bottom Text */}
                    <div className="text-center mt-8 text-gray-400 text-sm">
                        <p>Showing recent activity</p>
                    </div>
                </div>

                <BottomNav />
            </div>
        </PublicLayout>
    );
}
