import '@styles/globals.css'
import { withTina } from 'tinacms'
import { GithubClient, TinacmsGithubProvider, GithubMediaStore } from 'react-tinacms-github'
import { MarkdownFieldPlugin } from 'react-tinacms-editor'

const github = new GithubClient({
  proxy: '/api/proxy-github',
  authCallbackRoute: '/api/create-github-access-token',
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.REPO_FULL_NAME,
  baseBranch: process.env.BASE_BRANCH,
})

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

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

function Application({ Component, pageProps }) {
  return (
    <TinacmsGithubProvider onLogin={onLogin} onLogout={onLogout} error={pageProps.error}>
      <Component {...pageProps} />
    </TinacmsGithubProvider>
  )
}

export default withTina(Application, {
  enabled: true,
  sidebar: false,
  toolbar: true,
  plugins: [MarkdownFieldPlugin],
  apis: { github },
  media: new GithubMediaStore(github),
})
