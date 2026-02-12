import PublicLayout from "@/layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import { useRef, useState } from "react";
import BottomNav from "./components/bottomnav";
import SearchPlace from "./components/SearchPlace";
import BookingPage from "./components/bookingpage";

export default function Home() {
  const startY = useRef(0);
  const startHeight = useRef(0);

  const MIN = 120;
  const MAX = 460;

  const [height, setHeight] = useState(300);
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
    if (height < 230) setHeight(MIN);
    else setHeight(MAX);
  };

  return (
    <PublicLayout>
      <Head title="Home" />

      <div className="fixed inset-0 overflow-hidden bg-[#ffffff]">

        {/* MAP AREA */}
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
          Map Area
        </div>

        {/* SEARCH SHEET */}
        <div
          style={{ height }}
          className={`
            absolute bottom-16 left-0 right-0 z-20
            bg-[#ffffff] rounded-t-[28px]
            shadow-[0_-12px_30px_rgba(0,0,0,0.08)]
            ${dragging
              ? "transition-none"
              : "transition-[height] duration-300 ease-out"}
          `}
        >
          {/* DRAG HANDLE */}
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="px-6 pt-4 pb-3"
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />

            {/* SEARCH BAR */}
            <div
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl"
            >
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
              <span className="text-gray-600 font-medium">
                Where to?
              </span>
            </div>
          </div>

          {/* QUICK SAVED */}
          <div className="px-6 space-y-5 mt-2">
            {[
              { icon: "fa-house", label: "Home" },
              { icon: "fa-briefcase", label: "Office" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
                  <i className={`fa-solid ${item.icon} text-yellow-500 text-sm`}></i>
                </div>

                <div className="flex-1 border-b border-gray-100 pb-3">
                  <p className="text-sm font-semibold text-gray-900">
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