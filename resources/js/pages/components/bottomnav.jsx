export default function BottomNav() {
    return (
        <nav
            className="
                fixed bottom-0 left-0 right-0 z-40
                bg-white/90 backdrop-blur-xl
                rounded-t-3xl
                shadow-[0_-10px_30px_rgba(0,0,0,0.08)]
                px-6 py-4
                flex justify-between
            "
        >
            {[
                { icon: "fa-home", label: "Home", active: true },
                { icon: "fa-route", label: "Trips" },
                { icon: "fa-shield-halved", label: "Safety" },
                { icon: "fa-user", label: "Profile" },
            ].map((item, i) => (
                <div
                    key={i}
                    className={`
                        flex flex-col items-center gap-1
                        transition-all duration-200
                        ${item.active
                            ? "text-blue-500"
                            : "text-gray-400"}
                    `}
                >
                    <div
                        className={`
                            w-10 h-10 rounded-xl
                            flex items-center justify-center
                            transition-all duration-200
                            ${item.active
                                ? "bg-blue-50"
                                : "bg-transparent"}
                        `}
                    >
                        <i
                            className={`fa-solid ${item.icon} text-lg`}
                        ></i>
                    </div>

                    <span
                        className={`
                            text-[11px]
                            ${item.active ? "font-semibold" : "font-medium"}
                        `}
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </nav>
    );
}
