import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";

export default function Rewards() {
    return (
        <PublicLayout>
            <Head title="My Rewards" />
            <div className="bg-white min-h-screen pb-24">
                <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-100 flex items-center gap-4 shadow-sm">
                    <Link href="/profile">
                        <i className="fa-solid fa-arrow-left text-gray-900 text-lg"></i>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">My Rewards</h1>
                </div>

                <div className="flex flex-col items-center justify-center p-8 text-center min-h-[50vh]">
                    <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-yellow-500">
                        <i className="fa-solid fa-medal text-3xl"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your Rewards</h2>
                    <p className="text-gray-500 text-sm">Check your earned scratch cards and coupons here.</p>
                </div>

                <BottomNav />
            </div>
        </PublicLayout>
    );
}
