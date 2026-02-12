import { useEffect } from "react";

export default function SearchPlace({ onClose, onComplete }) {

    useEffect(() => {
        requestAnimationFrame(() => {
            document
                .getElementById("search-page")
                ?.classList.remove("translate-x-full");
        });
    }, []);

    return (
        <div
            id="search-page"
            className="
                absolute inset-0 z-50 bg-[#ffffff]
                transform translate-x-full
                transition-transform duration-300 ease-out
            "
        >
            {/* HEADER */}
            <div className="px-6 pt-5 pb-4 flex items-center gap-4">
                <button onClick={onClose}>
                    <i className="fa-solid fa-arrow-left text-gray-800 text-lg"></i>
                </button>
                <h2 className="font-semibold text-gray-900">
                    Set destination
                </h2>
            </div>

            {/* PICKUP / DROP */}
            <div className="px-6 mt-2">

                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <input
                        value="Current location"
                        readOnly
                        className="flex-1 py-2 border-b border-gray-200 bg-transparent outline-none font-medium text-gray-800"
                    />
                </div>

                <div className="w-0.5 h-4 bg-gray-200 ml-1"></div>

                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <input
                        placeholder="Enter destination"
                        className="flex-1 py-2 border-b border-gray-200 outline-none font-medium"
                    />
                </div>
            </div>

            {/* SUGGESTIONS */}
            <div className="px-6 mt-8 space-y-4">
                <p className="text-xs font-semibold text-gray-400 tracking-wide">
                    SUGGESTIONS
                </p>

                {[
                    "Connaught Place, Delhi",
                    "Rajiv Chowk Metro Station",
                    "India Gate",
                ].map((place, i) => (
                    <button
                        key={i}
                        onClick={() => onComplete(place)}
                        className="w-full text-left flex items-start gap-3"
                    >
                        <i className="fa-solid fa-location-dot text-gray-400 mt-0.5"></i>
                        <div className="flex-1 border-b border-gray-100 pb-2">
                            <p className="text-sm font-medium text-gray-900">
                                {place}
                            </p>
                            <p className="text-xs text-gray-400">
                                Suggested place
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}