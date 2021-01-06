import Head from 'next/head'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { InlineForm, InlineBlocks, InlineTextarea } from 'react-tinacms-inline'
import { useFormScreenPlugin, usePlugin } from 'tinacms'
import Footer from '@components/common/Footer'
import { featureListBlock } from '@components/blocks/FeatureList'
import { heroBlock } from '@components/blocks/Hero'
import { paragraphBlock } from '@components/blocks/Paragraph'

export default function Home({ file, themeFile, navigationFile, siteFile, preview }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      { name: 'body', component: 'textarea' },
    ],
  }
  const themeFormOptions = {
    label: 'Theme',
    fields: [
      { name: 'logo', component: 'media' },
      { name: 'test', component: 'textarea' },
    ],
  }
  const navigationFormOptions = {
    label: 'Navigation',
    fields: [
      { name: 'logo', component: 'media' },
      { name: 'test', component: 'textarea' },
    ],
  }
  const siteFormOptions = {
    label: 'Site',
    fields: [
      { name: 'logo', component: 'media' },
      { name: 'test', component: 'textarea' },
    ],
  }

  const [page, form] = useGithubJsonForm(file, formOptions)

  const [theme, themeForm] = useGithubJsonForm(themeFile, themeFormOptions)
  const [navigation, navigationForm] = useGithubJsonForm(navigationFile, navigationFormOptions)
  const [site, siteForm] = useGithubJsonForm(siteFile, siteFormOptions)

  usePlugin(form)
  useFormScreenPlugin(themeForm)
  useFormScreenPlugin(navigationForm)
  useFormScreenPlugin(siteForm)
  useGithubToolbarPlugins()

  return (
    <div className="container">
      <Head>
        <title>{page.title}</title>
      </Head>
      <InlineForm form={form}>
        <main>
          <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
        </main>
      </InlineForm>
      <Footer />
    </div>
  )
}

export const getStaticProps = async function ({ preview, previewData, ...ctx }) {
  if (preview) {
    const githubOptions = {
      repoFullName: previewData?.working_repo_full_name || 'https://github.com/austincondiff/mtrservices',
      branch: previewData?.head_branch || 'master',
      accessToken: previewData?.github_access_token || '',
    }
    const pageProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/pages/index.json',
      parse: parseJson,
    })
    const themeFile = await getGithubFile({
      ...githubOptions,
      fileRelativePath: 'content/settings/theme.json',
      parse: parseJson,
    })
    const navigationFile = await getGithubFile({
      ...githubOptions,
      fileRelativePath: 'content/settings/navigation.json',
      parse: parseJson,
    })
    const siteFile = await getGithubFile({
      ...githubOptions,
      fileRelativePath: 'content/settings/site.json',
      parse: parseJson,
    })

    return {
      ...pageProps?.props,
      themeFile,
      navigationFile,
      siteFile,
    }
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/pages/index.json',
        data: (await import('../content/pages/index.json')).default,
      },
      themeFile: {
        fileRelativePath: 'content/settings/theme.json',
        data: (await import('../content/settings/theme.json')).default,
      },
      navigationFile: {
        fileRelativePath: 'content/settings/navigation.json',
        data: (await import('../content/navigation.json')).default,
      },
      siteFile: {
        fileRelativePath: 'content/settings/site.json',
        data: (await import('../content/site.json')).default,
      },
    },
  }
}

// export const getStaticProps = async function ({ preview, previewData }) {
//   if (preview) {
//     return getGithubPreviewProps({
//       ...previewData,
//       fileRelativePath: 'content/index.json',
//       parse: parseJson,
//     })
//   }
//   return {
//     props: {
//       sourceProvider: null,
//       error: null,
//       preview: false,
//       file: {
//         fileRelativePath: 'content/index.json',
//         data: (await import('../content/index.json')).default,
//       },
//     },
//   }
// }

const HOME_BLOCKS = {
  hero: heroBlock,
  features: featureListBlock,
  paragraph: paragraphBlock,
}
