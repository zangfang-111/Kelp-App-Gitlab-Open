import * as React from 'react'
import LogoPng from '../../assets/logo.png' // img === '/src/logo.png'
import LogoSvg from '../../assets/logo.svg'
export const Timeline: React.FC = () => {
  return (
    <div>
      i am Timeline app
      <div style={{ padding: '2em', backgroundColor: 'blue' }}>
        <img width="100" src={LogoPng} />
      </div>
      <div style={{ padding: '2em', backgroundColor: 'maroon' }}>
        <img width="100" src={LogoSvg} />
      </div>
    </div>
  )
}

export default Timeline
