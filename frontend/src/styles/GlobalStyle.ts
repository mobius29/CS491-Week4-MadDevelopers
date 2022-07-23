import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  ol, ul, li {
    list-style: none;
  }

  button {
    border: none;
  }

  button:focus {
    border: none;
    outline: none;
  }

  Link {
    text-decoration: none;
  }
`

export default GlobalStyle
