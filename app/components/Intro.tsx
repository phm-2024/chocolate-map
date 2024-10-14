'use client'

import { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { Position } from '@/models/chocolate'
import { chocolate } from '../chocolate'

import InfoBox from './InfoBox'

export default function Intro() {
  const [open, setOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(9)
  const [focus, setFocus] = useState({
    brand: 'Brand',
    image_url: 'https://random.dog/77f957db-25ee-47d1-b44a-6918452d846a.jpg',
    description: 'No chocolate... only dog',
    uses_ethically_grown_cocoa: true,
    link: 'https://random.dog',
    location: {
      lat: -36.864372831981925,
      lng: 174.75733413578783,
      country: 'New Zealand',
      city: 'Auckland',
    },
  })
  const [currLocation, setCurrLocation] = useState({
    lat: -41.22599343392186,
    lng: 174.77614767136242,
  })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      position &&
        setCurrLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
    })
  }, [])

  if (
    !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    !process.env.NEXT_PUBLIC_MAP_ID
  ) {
    return (
      <h1>You are experiencing an error - unable to retrieve Google Map</h1>
    )
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          defaultZoom={zoomLevel}
          defaultCenter={currLocation}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          onCameraChanged={(event) => setZoomLevel(event.detail.zoom)}
        >
          {chocolate.map((position: Position, i: number) => {
            const markerSize = Math.max(20, zoomLevel * 10)
            return (
              <AdvancedMarker
                position={position.location}
                onClick={() => {
                  setOpen(true)
                  setFocus(position)
                }}
                key={i}
              >
                <img
                  src="/images/choc_icon.png"
                  width={markerSize}
                  height={markerSize}
                  className="hover:opacity-50"
                />
              </AdvancedMarker>
            )
          })}
          {open && <InfoBox />}
        </Map>
      </div>
    </APIProvider>
  )
}
