'use client'

import { useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps'
import { Position } from '@/models/chocolate'
import { chocolate } from './chocolate'

export default function Intro() {
  const [open, setOpen] = useState(false)

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
          defaultZoom={9}
          defaultCenter={chocolate[0].location}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          {chocolate.map((position: Position) => (
            <>
              <AdvancedMarker
                position={position.location}
                onClick={() => setOpen(true)}
              >
                <img src={position.image_url} width={32} height={32} />
              </AdvancedMarker>
              {open && (
                <InfoWindow
                  position={position.location}
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
