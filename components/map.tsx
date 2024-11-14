'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapBoxProps } from '@/types';

export default function MapBox({
  markers = [],
  center = [39.406544, -6.042782],
  zoom = 8,
  title= '',
  style = 'mapbox://styles/mapbox/streets-v12',
  className = 'w-full h-[500px]'
}: MapBoxProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(center[0]);
  const [lat, setLat] = useState(center[1]);
  const [mapZoom, setZoom] = useState(zoom);

  useEffect(() => {
    // Vérifier que le conteneur est bien monté et que la carte n'existe pas déjà
    if (!mapContainer.current || map.current) return;

    // Initialiser la carte
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: [lng, lat],
      zoom: mapZoom
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Événement de chargement de la carte
    map.current.on('load', () => {
      // Ajouter les marqueurs
      markers.forEach((marker) => {
        // Créer l'élément personnalisé du marqueur
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.backgroundImage = 'url(/icon/marker.png)';
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = 'cover';
        el.style.cursor = 'pointer';

        // Créer et ajouter le popup
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setHTML(
            `<div class="p-2">
              <h3 class="font-bold text-lg">${marker.title}</h3>
              <p class="text-sm">${marker.description}</p>
            </div>`
          );

        // Créer et ajouter le marqueur
        new mapboxgl.Marker(el)
          .setLngLat([marker.longitude, marker.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    // Événements de mouvement de la carte
    map.current.on('move', () => {
      if (!map.current) return;
      setLng(Number(map.current.getCenter().lng.toFixed(4)));
      setLat(Number(map.current.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current.getZoom().toFixed(2)));
    });

    // Nettoyage
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, mapZoom, style, markers, title]);

  return (
    <div className="relative">
      <div ref={mapContainer} className={className} />
      <div className="absolute top-0 left-0 bg-white/75 px-2 py-1 m-2 rounded z-10">
        {/* Longitude: {lng} | Latitude: {lat} | Zoom: {mapZoom} */}
        {title}
      </div>
    </div>
  );
}