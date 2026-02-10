import PublicLayout from "@/layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import BottomNav from "./components/bottomnav";
import SearchPlace from "./components/SearchPlace";
import BookingPage from "./components/bookingpage";

export default function Home() {
  const startY = useRef(0);
  const startHeight = useRef(0);

  const MIN = 110;
  const MAX = 420;

  const [height, setHeight] = useState(400);
  const [dragging, setDragging] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const onTouchStart = (e) => {
    setDragging(true);
    startY.current = e.touches[0].clientY;
    startHeight.current = height;
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    const delta = startY.current - e.touches[0].clientY;
    let next = startHeight.current + delta;
    next = Math.max(MIN, Math.min(next, MAX));
    setHeight(next);
  };

  const onTouchEnd = () => {
    setDragging(false);
    // natural settle
    if (height < 200) setHeight(MIN);
    else setHeight(MAX);
  };

  return (
    <PublicLayout>
      <Head title="Home" />

      <div className="fixed inset-0 overflow-hidden bg-white">

        {/* MAP PLACEHOLDER */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
          Map Area
        </div>

        {/* SEARCH SHEET */}
        <div
          style={{ height }}
          className={`
                        absolute bottom-0 left-0 right-0 z-20
                        bg-white rounded-t-[28px]
                        shadow-[0_-10px_30px_rgba(0,0,0,0.06)]
                        ${dragging
              ? "transition-none"
              : "transition-[height] duration-400 ease-[cubic-bezier(.22,1,.36,1)]"}
                    `}
        >
          {/* DRAG + SEARCH */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="px-6 pt-4 pb-4"
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

            <div
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-3"
            >
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
              <div className="flex-1 border-b border-gray-200 py-2 text-gray-700 font-medium">
                Where to?
              </div>
            </div>
          </div>

          {/* QUICK SAVED */}
          <div className="px-6 space-y-4">
            {[
              { icon: "fa-house", label: "Home" },
              { icon: "fa-briefcase", label: "Office" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <i className={`fa-solid ${item.icon} text-blue-500 text-sm`}></i>
                <div className="flex-1 border-b border-gray-100 py-2">
                  <p className="text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    Saved place
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {searchOpen && (
          <SearchPlace
            onClose={() => setSearchOpen(false)}
            onComplete={() => {
              setSearchOpen(false);
              setBookingOpen(true);
            }}
          />
        )}

        {bookingOpen && (
          <BookingPage onClose={() => setBookingOpen(false)} />
        )}


        <BottomNav />
      </div>
    </PublicLayout>
  );
}
