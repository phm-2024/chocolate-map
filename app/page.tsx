'use client'

import { useState } from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps'
import { Position } from '@/models/chocolate'
import { chocolate } from './chocolate'

export default function Intro() {
  const [open, setOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(9)
  const [focus, setFocus] = useState({
    brand: 'Brand',
    image_url: 'https://random.dog/77f957db-25ee-47d1-b44a-6918452d846a.jpg',
    description: 'No chocolate... only dog',
    uses_ethically_grown_cocoa: true,
    location: {
      lat: -41.22599343392186,
      lng: 174.75733413578783,
      country: 'New Zealand',
      city: 'Auckland',
    },
  })

  const currLocation = { lat: -36.864372831981925, lng: 174.77614767136242 }

  // navigator.geolocation.getCurrentPosition(function (position) {})

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
          defaultCenter={focus.location}
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
