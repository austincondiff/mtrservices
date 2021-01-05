import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 100%;
    line-height: 1.5;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  .home {
    min-height: 90vh;
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 5rem 4rem;
  }

  .wrapper--narrow {
    max-width: 800px;
  }

  h1 {
    font-size: 3.25rem;
    line-height: 1.2;
    margin: 0;
  }

  h1:not(:last-child) {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.025em;
  }

  h3 {
    font-weight: 800;
    font-size: 1.75rem;
    letter-spacing: -0.02em;
    margin: 0;
  }

  h3:not(:last-child) {
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    margin: 0;
  }

  p:not(:last-child) {
    margin: 0 0 1.125rem 0;
  }
`

export default GlobalStyles
