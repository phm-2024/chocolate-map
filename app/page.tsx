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
  const positions: {
    lat: number
    lng: number
  }[] = [
    { lat: -36.864372831981925, lng: 174.77614767136242 },
    { lat: 52, lng: 10 },
  ]
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState({
    brand: 'Brand',
    image_url: 'https://random.dog/77f957db-25ee-47d1-b44a-6918452d846a.jpg',
    description: 'No chocolate... only dog',
    uses_ethically_grown_cocoa: true,
    location: {
      lat: -36.864372831981925,
      lng: 174.77614767136242,
      country: 'New Zealand',
      city: 'Auckland',
    },
  })

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
          defaultCenter={focus.location}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          {chocolate.map((position: Position) => (
            <>
              <AdvancedMarker
                position={position.location}
                onClick={() => {
                  setOpen(true)
                  setFocus(position)
                }}
              >
                <img src={position.image_url} width={32} height={32} />
              </AdvancedMarker>
            </>
          ))}
          {open && (
            <InfoWindow
              position={focus.location}
              onCloseClick={() => setOpen(false)}
            >
              <p>{focus.brand}</p>
              <p>{`${focus.location.country}, ${focus.location.city}`}</p>
              <img src={focus.image_url} style={{ width: '200px' }} />
              <p>{focus.description}</p>
              <p>
                Uses ethically grown cocoa?{' '}
                {focus.uses_ethically_grown_cocoa ? 'Yes' : 'No'}
              </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  )
}
