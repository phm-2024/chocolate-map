import { InfoWindow } from '@vis.gl/react-google-maps'

import React, { useState } from 'react'
import { Position } from '@/models/chocolate'

interface InfoBoxProps {
  focus: Position
}

const InfoBox = ({ focus }: InfoBoxProps) => {
  const [open, setOpen] = useState(false)

  return (
    <InfoWindow
      position={focus.location}
      onCloseClick={() => setOpen(false)}
      maxWidth={400}
    >
      <div className="flex">
        <div className="w-[70%]">
          <p className={'underline text-2xl font-bold'}>
            <a href={focus.link}>{focus.brand}</a>
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
          <img
            src={focus.image_url}
            alt={focus.image_url}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </InfoWindow>
  )
}

export default InfoBox
