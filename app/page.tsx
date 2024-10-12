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
              maxWidth={400}
            >
              <div className="flex">
                <div className="w-[70%]">
                  <p className={'underline text-2xl font-bold'}>
                    {focus.brand}
                  </p>
                  <p
                    className={'font-bold pb-4'}
                  >{`@${focus.location.country}, ${focus.location.city}`}</p>

                  <p className={'text-lg pb-4'}>{focus.description}</p>
                  {focus.uses_ethically_grown_cocoa && (
                    <p>✨ They use ethically grown cocoa</p>
                  )}
                </div>
                <div className="w-[30%] flex items-center">
                  <img src={focus.image_url} style={{ width: '100%' }} />
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  )
}
