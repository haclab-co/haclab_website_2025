'use client';

import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import LoadingUI from './LoadingUI';

interface MapComponentProps {
  position: [number, number]; // [latitude, longitude]
  zoom: number;
  markerPosition: [number, number];
  markerPopup: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  position,
  zoom,
  markerPosition,
  markerPopup
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Import Leaflet dynamically on the client side
    import('leaflet').then((L) => {
      // Fix for default marker icons in Leaflet with Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    });

    return () => {
      setIsMounted(false);
    };
  }, []);

  // Only render the map on the client side
  if (!isMounted) {
    return (
      <div className="w-full h-full bg-dark-surface rounded-lg flex items-center justify-center">
        <LoadingUI
          variant="inline"
          theme="circuit"
          text="Loading map..."
          size="md"
        />
      </div>
    );
  }

  // Dynamically import react-leaflet components and leaflet
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      {/* Grid overlay for tech aesthetic */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-grid-pattern opacity-10"></div>
      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
          background-color: #1a1a1a;
          font-family: var(--font-fira-code), monospace;
        }

        /* Custom dark theme for controls */
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3) !important;
        }

        .leaflet-control-zoom a {
          background-color: #1e1e1e !important;
          color: #ffffff !important;
          border: 1px solid #333333 !important;
        }

        .leaflet-control-zoom a:hover {
          background-color: #2a2a2a !important;
        }

        /* Custom dark theme for popup */
        .leaflet-popup-content-wrapper {
          background-color: #1e1e1e !important;
          color: #ffffff !important;
          border-radius: 0.5rem !important;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5) !important;
          border: 1px solid #333333 !important;
        }

        .leaflet-popup-tip {
          background-color: #1e1e1e !important;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5) !important;
        }

        /* Attribution styling */
        .leaflet-control-attribution {
          background-color: rgba(30, 30, 30, 0.8) !important;
          color: #999999 !important;
          font-size: 10px !important;
        }

        .leaflet-control-attribution a {
          color: #E41E26 !important;
        }

        /* Custom marker styling */
        .custom-marker-icon {
          filter: hue-rotate(330deg) brightness(1.2);
        }

        /* Add a subtle grid pattern overlay */
        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: 1000;
          opacity: 0.3;
        }

        /* Add a subtle red glow to the marker */
        .leaflet-marker-icon {
          filter: drop-shadow(0 0 5px rgba(228, 30, 38, 0.7));
        }
      `}</style>

      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        {/* Dark theme map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Styled by <a href="https://haclab.net">Haclab</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        <Marker
          position={markerPosition}
          icon={L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            className: 'custom-marker-icon'
          })}
        >
          <Popup>
            <div>
              <div dangerouslySetInnerHTML={{ __html: markerPopup }} />
              <div className="mt-3 pt-3 border-t border-dark-border">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${markerPosition[0]},${markerPosition[1]}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-haclab-red text-white text-xs font-medium rounded hover:bg-haclab-dark-red transition-colors w-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
