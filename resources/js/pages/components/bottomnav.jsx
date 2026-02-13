import { Link, usePage } from "@inertiajs/react";

export default function BottomNav() {
    const { url } = usePage();
    const currentPath = url.split("?")[0];

    const navItems = [
        {
            id: 'home',
            icon: "house",
            label: "Home",
            route: "/",
            isActive: currentPath === "/"
        },
        {
            id: 'oneway',
            icon: "route",
            label: "One Way",
            route: "/oneway",
            isActive: currentPath.startsWith("/oneway")
        },
        {
            id: 'activity',
            icon: "clock-rotate-left",
            label: "Activity",
            route: "/activity",
            isActive: currentPath.startsWith("/activity")
        },
        {
            id: 'profile',
            icon: "user",
            label: "Profile",
            route: "/profile",
            isActive: currentPath.startsWith("/profile")
        },
    ];

    return (
        <nav
            className="
                fixed bottom-0 left-0 right-0 z-30
                bg-white
                border-t border-gray-100
                px-6 py-3
                flex justify-between items-center
                shadow-[0_-5px_20px_rgba(0,0,0,0.04)]
            "
        >
            {navItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.route}
                    className={`
                        flex flex-col items-center gap-1 p-1 transition-all duration-200
                        ${item.isActive
                            ? "text-black scale-105"
                            : "text-gray-400 hover:text-gray-600"}
                    `}
                >
                    <i className={`fa-solid fa-${item.icon} text-xl`}></i>

                    <span className="text-[11px] font-semibold tracking-wide">
                        {item.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
}
