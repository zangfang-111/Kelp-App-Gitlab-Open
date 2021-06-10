import * as React from 'react'
import { useParams } from 'react-router-dom'
/**
 * Single Album
 * @returns
 */
export const Album: React.FC = () => {
  const { cid } = useParams<{ cid: string }>()
  return <div>i am Album app with CID {cid}</div>
}

export default React.memo(Album)
