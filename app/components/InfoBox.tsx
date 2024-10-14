import { InfoWindow } from '@vis.gl/react-google-maps'

import React, { useState } from 'react'

const InfoBox = () => {
  const [open, setOpen] = useState(false)

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
  return (
    <InfoWindow
      position={focus.location}
      onCloseClick={() => setOpen(false)}
      maxWidth={400}
    >
      <div className="flex">
        <div className="w-[70%]">
          <p className={'underline text-2xl font-bold'}>{focus.brand}</p>
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
  )
}

export default InfoBox
