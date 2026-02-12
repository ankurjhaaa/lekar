import PublicLayout from "@/layouts/PublicLayout";
import { Head, router } from "@inertiajs/react";
import BottomNav from "./components/bottomnav";
import Map from "@/Components/Map";

export default function Home() {
  return (
    <PublicLayout>
      <Head title="Home" />

      <div className="relative bg-gray-50 min-h-screen pb-20">

        {/* FIXED MAP BACKGROUND */}
        <div className="fixed top-0 left-0 right-0 h-[65vh] z-0">
          <Map />
        </div>

        {/* SCROLLABLE CONTENT OVERLAY */}
        {/* Adds margin-top to start content below, allowing map to be seen */}
        <div className="relative z-10 mt-[45vh] px-4">

          {/* MAIN CONTENT CARD */}
          <div className="bg-white rounded-t-3xl min-h-screen shadow-2xl -mx-4 px-4 pt-4 pb-24">

            {/* DRAG HANDLE INDICATOR */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>

            {/* STICKY SEARCH BAR */}
            <div className="sticky top-0 z-20 bg-white pb-4 pt-2">
              <div
                onClick={() => router.visit('/search')}
                className="flex items-center gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="text-xl text-yellow-500">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <i className="fa-solid fa-magnifying-glass text-sm"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Where do you want to go?</h3>
                  <p className="text-xs text-gray-400">Search destination</p>
                </div>
              </div>
            </div>

            {/* EXPLORE SECTION */}
            <div className="mb-8 mt-2">
              <h3 className="text-gray-900 font-bold text-lg mb-4">Explore</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { name: "Parcel", icon: "box" },
                  { name: "Auto", icon: "taxi" },
                  { name: "Cab", icon: "car" },
                  { name: "Bike", icon: "motorcycle" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    {/* Placeholder Image Div */}
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                      <i className={`fa-solid fa-${item.icon} text-xl`}></i>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PROMO BANNER PLACEHOLDER */}
            <div className="mb-8">
              <div className="w-full h-32 bg-indigo-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-indigo-100 text-indigo-300">
                <span className="font-medium">Promo Banner</span>
              </div>
            </div>

            {/* GO PLACES / RECENT */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-bold text-lg mb-4">Go Places</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-64">
                    <div className="w-full h-32 bg-gray-100 rounded-2xl mb-3 flex items-center justify-center text-gray-300">
                      <i className="fa-solid fa-image text-2xl"></i>
                    </div>
                    <p className="font-bold text-gray-800">Popular Destination {item}</p>
                    <p className="text-xs text-gray-500">123 Street Name, City Area</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MORE CONTENT PLACEHOLDER (to enable scrolling) */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-bold text-lg mb-4">Offers</h3>
              <div className="w-full h-40 bg-yellow-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-yellow-200 text-yellow-500">
                <span className="font-bold">Exclusive Offers</span>
              </div>
            </div>

          </div>
        </div>

        <BottomNav />
      </div>
    </PublicLayout>
  );
}