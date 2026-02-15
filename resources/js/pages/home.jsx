import { useState, useEffect } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";
import Map from "@/Components/Map";


export default function Home() {
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 });
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Get User Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Generate random vehicles around user
        const types = ['bike', 'auto', 'cab', 'toto'];
        const generated = Array.from({ length: 8 }).map((_, i) => ({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          position: {
            lat: latitude + (Math.random() - 0.5) * 0.015,
            lng: longitude + (Math.random() - 0.5) * 0.015
          },
          heading: Math.floor(Math.random() * 360)
        }));
        setVehicles(generated);
      });
    }
  }, []);

  return (
    <PublicLayout>
      <Head title="Home" />

      <div className="relative bg-white min-h-screen pb-20">

        {/* FIXED MAP BACKGROUND */}
        <div className="fixed top-0 left-0 right-0 h-[65vh] z-0">
          <Map vehicles={vehicles} center={userLocation} />
        </div>

        {/* SCROLLABLE CONTENT OVERLAY */}
        {/* Adds margin-top to start content below, allowing map to be seen */}
        <div className="relative z-10 mt-[45vh]">

          {/* MAIN CONTENT CARD */}
          <div className="bg-white rounded-t-3xl min-h-screen shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] pt-6 pb-24">

            {/* DECORATIVE DRAG INDICATOR (Optional, kept subtle) */}
            <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6"></div>

            {/* STICKY SEARCH BAR */}
            <div className="sticky top-0 z-20 bg-white px-6 pb-4 pt-2">
              <div
                onClick={() => router.visit('/search')}
                className="flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-3.5 rounded-xl shadow-sm cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg"></i>
                <div className="flex-1">
                  <span className="text-gray-500 font-medium text-base">Where to?</span>
                </div>
                <div className="bg-gray-200 px-2 py-1 rounded text-xs font-semibold text-gray-500">
                  Now
                </div>
              </div>
            </div>

            {/* EXPLORE SECTION */}
            <div className="mb-10 px-6 mt-4">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-gray-900 font-bold text-xl">Explore</h3>
                <span className="text-indigo-600 text-sm font-semibold cursor-pointer">View All</span>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[
                  { name: "Parcel", icon: "box", color: "text-blue-500", bg: "bg-blue-50" },
                  { name: "Auto", icon: "taxi", color: "text-yellow-500", bg: "bg-yellow-50" },
                  { name: "Cab", icon: "car", color: "text-indigo-500", bg: "bg-indigo-50" },
                  { name: "Bike", icon: "motorcycle", color: "text-green-500", bg: "bg-green-50" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
                    <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center ${item.color} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                      <i className={`fa-solid fa-${item.icon} text-2xl`}></i>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PROMO BANNER (Redesigned) */}
            <div className="mb-10 px-6">
              <div className="w-full h-36 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-between px-6 shadow-lg shadow-indigo-200 relative overflow-hidden">
                <div className="relative z-10 text-white">
                  <p className="font-bold text-lg mb-1">Get 50% OFF</p>
                  <p className="text-indigo-100 text-sm mb-3">On your first 3 rides</p>
                  <button className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm">Claim Now</button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 text-white">
                  <i className="fa-solid fa-gift text-9xl"></i>
                </div>
              </div>
            </div>

            {/* GO PLACES / RECENT */}
            <div className="mb-10 pl-6">
              <h3 className="text-gray-900 font-bold text-xl mb-5">Go Places</h3>
              <div className="flex gap-4 overflow-x-auto pb-6 pr-6 custom-scrollbar">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-64 group cursor-pointer">
                    <div className="w-full h-36 bg-gray-100 rounded-2xl mb-3 flex items-center justify-center text-gray-300 relative overflow-hidden shadow-sm">
                      {/* Placeholder for actual image */}
                      <i className="fa-solid fa-city text-4xl group-hover:scale-110 transition-transform duration-500"></i>
                    </div>
                    <p className="font-bold text-gray-800 text-lg">Popular Destination {item}</p>
                    <p className="text-sm text-gray-500">123 Street, City Area</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OFFERS (More refined) */}
            <div className="mb-8 px-6">
              <h3 className="text-gray-900 font-bold text-xl mb-5">Just For You</h3>
              <div className="w-full bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <i className="fa-solid fa-tag text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Exclusive Partner Offers</h4>
                  <p className="text-xs text-gray-500">Check out deals from our partners</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <BottomNav />
      </div >
    </PublicLayout >
  );
}