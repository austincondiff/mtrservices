import Head from 'next/head'
import { usePlugin } from 'tinacms'
import { InlineForm, InlineTextarea } from 'react-tinacms-inline'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home({ jsonFile }) {
  const formConfig = {
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'body',
        label: 'Body',
        component: 'textarea',
      },
    ],
  }

  console.log({ jsonFile })

  const [page, form] = useGithubJsonForm(jsonFile, formConfig)

  usePlugin(form)
  useGithubToolbarPlugins()

  return (
    <div className="container">
      <Head>
        <title>{page.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InlineForm form={form}>
        <main>
          <h1>
            <InlineTextarea name={page.title} />
          </h1>
          <div className="description">
            <InlineTextarea name={page.body} />
          </div>
        </main>
      </InlineForm>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const content = await import(`../content/index.json`)

  return {
    props: {
      jsonFile: {
        fileRelativePath: `/content/index.json`,
        data: content.default,
      },
    },
  }
}
