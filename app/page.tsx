'use client'

import { useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps'

export default function Intro() {
  const positions: {
    lat: number
    lng: number
  }[] = [
    { lat: 53.54, lng: 10 },
    { lat: 52, lng: 10 },
  ]
  const [open, setOpen] = useState(false)

  if (
    !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    !process.env.NEXT_PUBLIC_MAP_ID
  ) {
    return (
      <h1>You are experiencing an error - unable to retrieve Google Map</h1>
    )
  }

  const markerImage =
    'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: '100vh', width: '100%' }}>
        <Map
          defaultZoom={9}
          defaultCenter={positions[0]}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          {positions.map((position: { lat: number; lng: number }) => (
            <>
              <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                <img src={markerImage} width={32} height={32} />
              </AdvancedMarker>
              {open && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpen(false)}
                >
                  <p>I'm in Hamburg</p>
                </InfoWindow>
              )}
            </>
          ))}
        </Map>
      </div>
    </APIProvider>
  )
}
