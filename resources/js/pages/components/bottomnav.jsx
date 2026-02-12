import { Link, usePage } from "@inertiajs/react";

export default function BottomNav() {
    const { url } = usePage();

    const navItems = [
        {
            id: 'home',
            icon: "house",
            label: "Home",
            route: "/",
            isActive: url === "/"
        },
        {
            id: 'services',
            icon: "list-alt",
            label: "Services",
            route: "/services",
            isActive: url.startsWith("/services")
        },
        {
            id: 'activity',
            icon: "clock",
            label: "Activity",
            route: "/activity",
            isActive: url.startsWith("/activity")
        },
        {
            id: 'account',
            icon: "user",
            label: "Account",
            route: "/profile",
            isActive: url.startsWith("/profile")
        },
    ];

    return (
        <nav
            className="
                fixed bottom-0 left-0 right-0 z-30
                bg-white
                border-t border-gray-100
                px-6 py-2
                flex justify-between items-center
                rounded-t-2xl
                shadow-[0_-5px_15px_rgba(0,0,0,0.08)]
            "
        >
            {navItems.map((item) => (
                <Link
                    key={item.id}
                    href={item.route}
                    className={`
                        flex flex-col items-center gap-1 p-2 transition-all duration-200
                        ${item.isActive ? "text-black scale-110" : "text-gray-400 hover:text-gray-600"}
                    `}
                >
                    <i className={`
                        ${item.isActive ? "fa-solid" : "fa-regular"} 
                        fa-${item.icon} 
                        text-xl mb-0.5
                    `}></i>
                    <span
                        className={`
                            text-[10px] font-medium tracking-wide
                        `}
                    >
                        {item.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
}