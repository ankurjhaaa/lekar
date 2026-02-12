import { useEffect, useRef } from 'react';

const Map = ({
    id = "map",
    center = { lat: 28.6139, lng: 77.2090 }, // Default to New Delhi
    zoom = 12,
    markers = [],
    className = ""
}) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        // Load Mappls SDK script dynamically
        const loadMapplsScript = () => {
            return new Promise((resolve, reject) => {
                if (window.mappls) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://apis.mappls.com/advancedmaps/api/${import.meta.env.VITE_MAPPLS_API_KEY}/map_sdk?layer=vector&v=3.0&callback=initMap`;
                script.async = true;
                script.defer = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error('Failed to load Mappls SDK'));
                document.body.appendChild(script);
            });
        };

        const initMap = () => {
            if (mapInstance.current) return; // Prevent re-initialization

            if (window.mappls) {
                mapInstance.current = new window.mappls.Map(id, {
                    center: [center.lat, center.lng],
                    zoom: zoom,
                    geolocation: true,
                    traffic: true,
                });

                mapInstance.current.addListener('load', function () {
                    /*
                        Uses getlocation method to fetch the user location and center the map
                     */
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            const lat = position.coords.latitude;
                            const lng = position.coords.longitude;
                            mapInstance.current.setCenter([lat, lng]);

                            new window.mappls.Marker({
                                map: mapInstance.current,
                                position: { lat: lat, lng: lng },
                                fitbounds: true,
                                popupHtml: "<div>You are here</div>"
                            });
                        });
                    }
                });

                // Add markers if any
                markers.forEach(marker => {
                    new window.mappls.Marker({
                        map: mapInstance.current,
                        position: marker.position,
                        icon: marker.icon // URL to custom icon if provided
                    });
                });
            }
        };

        loadMapplsScript().then(() => {
            // Mappls SDK requires a global callback for initialization in the script URL
            // but we can also initialize it manually after script load if we handle it carefully.
            // The script URL above includes callback=initMap, so we need to define it globally 
            // or just rely on manual initialization after load.

            // To be safe with React, we'll manually initialize after the script is confirmed loaded.
            // We might need to wait for the global 'mappls' object to be fully ready.
            if (window.mappls && window.mappls.Map) {
                initMap();
            } else {
                // Fallback or retry mechanism if needed, but onload usually suffices.
                // Sometimes the script loads but the global object isn't immediately ready?
                // Let's assume onload is fine for now.
                const interval = setInterval(() => {
                    if (window.mappls && window.mappls.Map) {
                        clearInterval(interval);
                        initMap();
                    }
                }, 100);
            }
        }).catch(err => console.error("Mappls script load error:", err));

        return () => {
            // Cleanup if needed (Mappls doesn't have a strict destroy method in docs usually, but good to clear ref)
            if (mapInstance.current) {
                // mapInstance.current.remove(); // If a remove method exists
                mapInstance.current = null;
            }
        };
    }, []);

    // Update center or markers if props change? 
    // For now, simple initialization is enough.

    return (
        <div
            id={id}
            ref={mapRef}
            className={`w-full h-full ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default Map;
