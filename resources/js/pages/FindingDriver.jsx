import PublicLayout from "@/layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
export default function FindingDriver({ booking }) {
    const [bookingState, setBookingState] = useState(booking);
    const [nearby, setNearby] = useState([]);
    const [driver, setDriver] = useState(null);

    const pickup = bookingState ? { lat: parseFloat(bookingState.pickup_lat), lng: parseFloat(bookingState.pickup_lng) } : null;
    const drop = bookingState ? { lat: parseFloat(bookingState.drop_lat), lng: parseFloat(bookingState.drop_lng) } : null;

    useEffect(() => {
        if (!bookingState?.id) return;

        const poll = async () => {
            try {
                const res = await fetch(`/booking/${bookingState.id}/status`);
                if (!res.ok) return;
                const data = await res.json();

                if (data.status !== bookingState.status) {
                    setBookingState(prev => ({ ...prev, status: data.status, otp_code: data.otp }));
                }
                if (data.driver) setDriver(data.driver);

                // Map nearby drivers for map display
                if (data.nearby) {
                    setNearby(data.nearby.map(d => ({
                        id: d.id,
                        type: d.vehicle_type || 'bike',
                        position: { lat: parseFloat(d.lat), lng: parseFloat(d.lng) },
                        heading: Math.random() * 360
                    })));
                }
            } catch (error) {
                console.error("Polling error", error);
            }
        };

        const interval = setInterval(poll, 2000); // Poll every 2s
        poll();

        return () => clearInterval(interval);
    }, [bookingState?.id]);

    const status = bookingState?.status || 'searching_driver';

    return (
        <PublicLayout>
            <Head title="Ride Status" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden">
                {/* MAP BACKGROUND */}
                <div className="absolute inset-0 z-0">
                    <Map pickup={pickup} drop={drop} vehicles={nearby} />
                </div>

                {/* STATUS OVERLAY */}
                <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-end pb-0 md:pb-6 px-0 md:px-4">

                    {status === 'searching_driver' && (
                        <div className="w-full bg-white rounded-t-3xl p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-w-md mx-auto animate-fade-in-up">
                            <div className="relative flex items-center justify-center mb-8">
                                <div className="absolute w-32 h-32 rounded-full bg-yellow-100/50 animate-ping"></div>
                                <div className="absolute w-24 h-24 rounded-full bg-yellow-200/50 animate-pulse"></div>
                                <div className="w-20 h-20 rounded-full bg-[#FFD200] flex items-center justify-center relative z-10 shadow-xl border-4 border-white">
                                    <i className="fa-solid fa-hourglass-half text-3xl text-black"></i>
                                </div>
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Finding your Captain</h2>
                                <p className="text-gray-500 text-sm">We are connecting you with nearby drivers...</p>
                                <div className="mt-6 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-black w-1/3 animate-[loading_2s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {status === 'driver_assigned' && (
                        <div className="w-full bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-w-md mx-auto animate-fade-in-up">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold mb-3 border border-green-100">
                                    <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                                    RIDE CONFIRMED
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Captain Accepted! 🚗</h3>
                                <p className="text-gray-500 text-sm mt-1">Arriving in approx 3 mins</p>
                            </div>

                            {/* Driver Details */}
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden relative">
                                    <i className="fa-solid fa-user text-2xl text-gray-400 absolute bottom-0 translate-y-1"></i>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg text-gray-900 leading-tight">{driver?.user?.name || "Raju Driver"}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 encoded mt-1">
                                        <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-800 font-bold tracking-wide">{driver?.number_plate || "DL-01-AB-1234"}</span>
                                        <span>• {driver?.vehicle_name || "Splendor Plus"}</span>
                                    </div>
                                </div>
                                <button className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition">
                                    <i className="fa-brands fa-whatsapp text-xl"></i>
                                </button>
                                <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition">
                                    <i className="fa-solid fa-phone"></i>
                                </button>
                            </div>

                            {/* OTP Section */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <i className="fa-solid fa-lock text-6xl text-yellow-600"></i>
                                </div>
                                <p className="text-[10px] text-yellow-800 font-bold uppercase tracking-widest mb-2 relative z-10">Share OTP with Captain</p>
                                <div className="text-4xl font-extrabold text-gray-900 tracking-[0.6em] font-mono leading-none relative z-10 pl-4">
                                    {bookingState.otp_code}
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button className="flex-1 py-3.5 text-red-500 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-xl transition">Cancel Ride</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <style>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </PublicLayout>
    );
}
