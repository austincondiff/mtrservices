import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, GithubMediaStore, TinacmsGithubProvider } from 'react-tinacms-github'
import { ThemeProvider } from 'styled-components'
import isInBrowser from 'is-in-browser'
import GlobalStyles from '@styles/GlobalStyles'
import theme from '@styles/theme'

export default class Site extends App {
  constructor(props) {
    super(props)

    const [subdomain] = isInBrowser ? window.location.hostname?.split('.') : []
    this.isAdmin =
      subdomain === 'admin' ||
      subdomain === 'localhost' ||
      props.host?.includes('admin') ||
      props.host?.includes('localhost')

    this.isEditing = !!this.isAdmin && !!props.pageProps.preview

    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.BASE_BRANCH,
    })

    this.cms = new TinaCMS({
      enabled: this.isEditing,
      sidebar: this.isEditing,
      toolbar: this.isEditing,
      apis: { github },
      media: new GithubMediaStore(github),
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider onLogin={onLogin} onLogout={onLogout} error={pageProps.error}>
          <ThemeProvider theme={theme}>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <GlobalStyles />
            <Component isEditing={this.isEditing} {...pageProps} />
            {this.isAdmin && <EditLink cms={this.cms} />}
          </ThemeProvider>
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  console.log('ON LOGIN')

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch(`/api/preview`, { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export const EditLink = ({ cms }) => {
  return <button onClick={() => cms.toggle()}>{cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}</button>
}
