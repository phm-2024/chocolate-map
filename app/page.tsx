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

export default function Intro() {
  const positions: Position[] = [
    {
      brand: 'Lindt',
      image_url: 'https://example.com/lindt.jpg',
      description:
        'Lindt is a Swiss chocolate company known for its fine, high-quality chocolate products.',
      uses_ethically_grown_cocoa: true,
      location: {
        lat: 47.3769,
        lng: 8.5417,
        country: 'Switzerland',
        city: 'Zurich',
      },
    },
    {
      brand: 'Valrhona',
      image_url: 'https://example.com/valrhona.jpg',
      description:
        'Valrhona is a French chocolate maker, specializing in premium chocolate for gourmet chefs.',
      uses_ethically_grown_cocoa: true,
      location: {
        lat: 45.918,
        lng: 4.7005,
        country: 'France',
        city: "Tain-l'Hermitage",
      },
    },
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
          defaultCenter={positions[0].location}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          {positions.map((position: Position) => (
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
