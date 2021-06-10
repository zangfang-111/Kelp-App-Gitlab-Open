import * as React from 'react'
import { Link } from 'react-router-dom'
import LogoPng from '../../assets/logo.png' // img === '/src/logo.png'
import LogoSvg from '../../assets/logo.svg'
import routes from './routes'

/**
 * Albums page
 * @returns
 */
export const Albums: React.FC = () => {
  return (
    <div>
      i am Albums app
      <div style={{ padding: '2em', backgroundColor: 'blue' }}>
        <Link to={routes.private.album.path.replace(':cid', '123123213213')}>
          <img width="100" src={LogoPng} />
        </Link>
      </div>
      <div style={{ padding: '2em', backgroundColor: 'maroon' }}>
        <Link to={routes.private.album.path.replace(':cid', 'eqwewqewqeqwew')}>
          <img width="100" src={LogoSvg} />
        </Link>
      </div>
    </div>
  )
}

export default Albums
