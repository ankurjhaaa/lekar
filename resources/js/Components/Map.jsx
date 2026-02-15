import { useEffect, useRef } from 'react';

const Map = ({
    id = "map",
    center = { lat: 28.6139, lng: 77.2090 }, // Default to New Delhi
    zoom = 12,
    markers = [],
    vehicles = [],
    pickup = null,
    drop = null,
    onRouteCalculated = null,
    className = ""
}) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const polylineRef = useRef(null);

    useEffect(() => {
        if (mapInstance.current && pickup && drop && window.mappls) {
            // Clear previous polyline ref if valid
            if (polylineRef.current && typeof polylineRef.current.remove === 'function') {
                polylineRef.current.remove();
            }
            polylineRef.current = null;

            // Use Mappls Direction Plugin if available
            if (window.mappls.direction) {
                window.mappls.direction({
                    map: mapInstance.current,
                    start: `${pickup.lat},${pickup.lng}`,
                    end: `${drop.lat},${drop.lng}`,
                    callback: (data) => {
                        if (data && data.results && data.results.length > 0) {
                            const trip = data.results[0].trips[0];
                            // Update parent with real distance (meters) and duration
                            if (onRouteCalculated) {
                                onRouteCalculated({
                                    distance: trip.length, // meters
                                    duration: trip.duration // seconds
                                });
                            }
                        }
                    }
                });
            } else {
                // Fallback: Simple Polyline
                const pts = [
                    { lat: parseFloat(pickup.lat), lng: parseFloat(pickup.lng) },
                    { lat: parseFloat(drop.lat), lng: parseFloat(drop.lng) }
                ];

                const polyline = new window.mappls.Polyline({
                    map: mapInstance.current,
                    paths: pts,
                    strokeColor: '#000000',
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                    fitbounds: true
                });

                polylineRef.current = polyline;

                // Markers
                new window.mappls.Marker({
                    map: mapInstance.current,
                    position: pts[0],
                    html: `<div style="width: 20px; height: 20px; background: #22c55e; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`
                });

                new window.mappls.Marker({
                    map: mapInstance.current,
                    position: pts[1]
                });
            }
        }
    }, [pickup, drop]);

    useEffect(() => {
        // Load Mappls SDK script dynamically
        const loadMapplsScript = () => {
            return new Promise((resolve, reject) => {
                if (window.mappls) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = `https://apis.mappls.com/advancedmaps/api/${import.meta.env.VITE_MAPPLS_API_KEY}/map_sdk?layer=vector&v=3.0`;
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    if (window.mappls) {
                        initMap();
                    }
                };
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

                // Add standard markers if any
                markers.forEach(marker => {
                    new window.mappls.Marker({
                        map: mapInstance.current,
                        position: marker.position,
                        icon: marker.icon, // URL to custom icon if provided
                        popupHtml: marker.popup || null
                    });
                });

                // Add vehicle markers
                if (window.mappls && Array.isArray(vehicles)) {
                    vehicles.forEach(vehicle => {
                        let iconClass = 'car';
                        let color = '#6366f1'; // Indigo (Cab)

                        if (vehicle.type === 'bike') {
                            iconClass = 'motorcycle';
                            color = '#22c55e'; // Green
                        } else if (vehicle.type === 'auto') {
                            iconClass = 'taxi';
                            color = '#eab308'; // Yellow
                        } else if (vehicle.type === 'toto') {
                            iconClass = 'car-side';
                            color = '#06b6d4'; // Cyan/Blue
                        }

                        // Create a custom HTML marker for vehicles
                        const iconHtml = `
                            <div style="
                                width: 30px; 
                                height: 30px; 
                                background: white; 
                                border-radius: 50%; 
                                display: flex; 
                                align-items: center; 
                                justify-content: center;
                                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                transform: rotate(${vehicle.heading || 0}deg); 
                            ">
                                <i class="fa-solid fa-${iconClass}" 
                                   style="color: ${color}; font-size: 14px;">
                                </i>
                            </div>
                        `;

                        new window.mappls.Marker({
                            map: mapInstance.current,
                            position: vehicle.position,
                            html: iconHtml,
                            width: 30,
                            height: 30,
                            popupHtml: `<div>${vehicle.type.toUpperCase()} - 2 mins away</div>`
                        });
                    });
                }
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
