import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, GithubMediaStore, TinacmsGithubProvider } from 'react-tinacms-github'
import isInBrowser from 'is-in-browser'

export default class Site extends App {
  constructor(props) {
    super(props)

    const [subdomain] = isInBrowser ? window.location.hostname?.split('.') : []
    this.isAdmin = subdomain === 'admin' || subdomain === 'localhost'

    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.BASE_BRANCH,
    })

    this.cms = new TinaCMS({
      enabled: !!this.isAdmin && !!props.pageProps.preview,
      apis: { github },
      media: new GithubMediaStore(github),
      sidebar: this.isAdmin && props.pageProps.preview,
      toolbar: this.isAdmin && props.pageProps.preview,
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider onLogin={onLogin} onLogout={onLogout} error={pageProps.error}>
          <EditLink cms={this.cms} />
          <Component {...pageProps} />
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
