import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './Root'

// Provider configs

/**
 * Main app bundle
 * All providers are rendered here
 */
const Main = () => {
  return (
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  )
}
const rootNode = document.getElementById('root')

ReactDOM.render(<Main />, rootNode)
