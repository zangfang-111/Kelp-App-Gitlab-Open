// @FUCK what was this for i wonder
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
::-webkit-scrollbar-track {
	background-color: #303030;
}

::-webkit-scrollbar {
	width: 12px;
	background-color: #303030;
}

::-webkit-scrollbar-thumb {
	background-color: #646464;
}
a {
	color: #eee
}
`

export default GlobalStyle
