import { useEffect, useState } from "react";

export default function SearchingDriver({ onClose }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setAnimate(true);
        });
    }, []);

    return (
        <div
            className={`
                absolute inset-0 z-60 bg-[#ffffff]
                transform ${animate ? "translate-y-0" : "translate-y-full"}
                transition-transform duration-500 ease-out
                flex flex-col items-center justify-center
            `}
        >
            {/* Yellow Pulse Loader */}
            <div className="relative flex items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-yellow-200 animate-ping absolute"></div>
                <div className="w-20 h-20 rounded-full bg-[#FFD200] flex items-center justify-center">
                    <i className="fa-solid fa-motorcycle text-2xl text-black"></i>
                </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Finding your ride...
            </h2>

            <p className="text-sm text-gray-500">
                Connecting you to nearby drivers
            </p>

            <button
                onClick={onClose}
                className="absolute bottom-10 text-sm text-gray-500"
            >
                Cancel
            </button>
        </div>
    );
}