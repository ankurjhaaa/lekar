import { useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function PublicLayout({ children }) {

    useEffect(() => {
        if (!window.mapboxgl) {
            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
            document.head.appendChild(css);

            const script = document.createElement("script");
            script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <main className="flex-1 relative">
                {children}
            </main>
        </div>
    );
}
