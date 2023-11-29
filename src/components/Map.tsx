import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
    borderRadius: '50px',
    background: '#F5F5F5',
    boxShadow: '0px 4px 5px 4px rgba(16, 13, 159, 0.10)',

};

const center = {
    lat: 40.7128, // nyc
    lng: -74.0060,
};

const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    disableDefaultUI: true,

};

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'YOUR_API_KEY',
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, [center]);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    const handleZoomIn = React.useCallback(function () {
        if (map) {
            map.setZoom(map.getZoom() + 1);
        }
    }, [map]);

    const handleZoomOut = React.useCallback(function () {
        if (map) {
            map.setZoom(map.getZoom() - 1);
        }
    }, [map]);

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12} // Adjust the initial zoom level as needed
                options={mapOptions} // Apply the map options
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
}

export default Map;
