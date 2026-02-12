export default function BottomNav() {
    return (
        <nav
            className="
                fixed bottom-0 left-0 right-0 z-30
                bg-[#ffffff]
                border-t border-gray-200
                px-6 py-3
                flex justify-between items-center
            "
        >
            {[
                { icon: "home", label: "Ride", active: true },
                { icon: "paper-plane", label: "All Services" },
                { icon: "plane", label: "Travel" }, // ✅ Updated here
                { icon: "user", label: "Profile" },
            ].map((item, i) => (
                <button
                    key={i}
                    className="flex flex-col items-center gap-1"
                >
                    <i
                        className={`
                            ${item.active
                                ? `fa-solid fa-${item.icon} text-[#2E2E2E]`
                                : `fa-regular fa-${item.icon} text-[#7A7A7A]`
                            }
                            text-[22px]
                        `}
                    ></i>

                    <span
                        className={`
                            text-[13px]
                            ${item.active
                                ? "font-semibold text-[#2E2E2E]"
                                : "font-medium text-[#7A7A7A]"
                            }
                        `}
                    >
                        {item.label}
                    </span>
                </button>
            ))}
        </nav>
    );
}