import Head from 'next/head'
import { getGithubPreviewProps, getGithubFile, parseJson } from 'next-tinacms-github'
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github'
import { InlineForm, InlineBlocks, InlineTextarea } from 'react-tinacms-inline'
import { useFormScreenPlugin, usePlugins } from 'tinacms'
import Footer from '@components/common/Footer'
import PageLayout from '@components/common/PageLayout'
import { featureListBlock } from '@components/blocks/FeatureList'
import { heroBlock } from '@components/blocks/Hero'
import { paragraphBlock } from '@components/blocks/Paragraph'
import slugify from 'react-slugify'

// const PageCreatorPlugin = {
//   __type: 'content-creator',
//   fields: [
//     {
//       label: 'Title',
//       name: 'title',
//       component: 'text',
//       validation(title) {
//         if (!title) return 'Required.'
//       },
//     },
//     { name: 'title', label: 'Title', component: 'text', required: true },
//     { name: 'description', label: 'Description', component: 'text', required: true },
//   ],
//   onSubmit(values, cms) {
//     // Call functions that create the new blog post. For example:
//     // cms.apis.someBackend.createPost(values)
//   },
// }
const CreatePageButton = {
  __type: 'content-creator',
  label: 'New Page',
  filename: (form) => {
    let slug = slugify(form.title.toLowerCase())

    return `content/pages/${slug}.json`
  },
  data: (form) => {
    let slug = slugify(form.title.toLowerCase())

    return new Promise((resolve) => {
      resolve({
        title: form.title,
        description: form.description,
        date: new Date(),
        slug,
      })
    })
  },
  fields: [
    { name: 'title', label: 'Title', component: 'text', required: true },
    { name: 'description', label: 'Description', component: 'text', required: true },
  ],
}

// const CreatePagePlugin = new JsonCreatorPlugin({
//   label: 'New Page',
//   filename: (form) => {
//     return `content/pages/${form.slug}.json`
//   },
//   fields: [
//     { name: 'title', label: 'Title', component: 'text', required: true },
//     { name: 'slug', label: 'Slug', component: 'text', required: true },
//   ],
//   onSubmit(values, cms) {
//     // Call functions that create the new blog post. For example:
//     // cms.apis.someBackend.createPost(values)
//   },
// })

export default function Home({ file, themeFile, navigationFile, siteFile, preview }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'image' },
      { name: 'body', component: 'textarea' },
    ],
  }
  const themeFormOptions = {
    label: 'Theme',
    fields: [
      { name: 'logo', component: 'image' },
      { name: 'test', component: 'textarea' },
    ],
  }
  const navigationFormOptions = {
    label: 'Navigation',
    fields: [
      { name: 'logo', component: 'image' },
      { name: 'test', component: 'textarea' },
      {
        name: 'links',
        label: 'Links',
        component: 'group-list',
        defaultItem: {
          color: 'transparent',
          opacity: 1,
          position: 0,
        },
        itemProps: (item) => ({
          key: item.id,
          label: item.label || 'Link',
        }),
        fields: [
          {
            name: 'label',
            label: 'Label',
            component: 'text',
          },
          {
            name: 'url',
            label: 'URL',
            component: 'text',
          },
          {
            name: 'newWindow',
            label: 'Open in new window',
            component: 'toggle',
          },
          {
            name: 'isButton',
            label: 'Button',
            component: 'toggle',
          },
        ],
      },
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

  usePlugins([form, CreatePageButton])
  useFormScreenPlugin(themeForm)
  useFormScreenPlugin(navigationForm)
  useFormScreenPlugin(siteForm)
  useGithubToolbarPlugins()

  return (
    <PageLayout adminToolbarVisible={preview} navigation={navigation} theme={theme} site={site}>
      <Head>
        <title>{page.title}</title>
      </Head>
      <InlineForm form={form}>
        <main>
          <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
        </main>
      </InlineForm>
      <Footer />
    </PageLayout>
  )
}

export const getStaticProps = async function ({ preview, previewData, ...ctx }) {
  const pageFilePath = `content/pages/index.json`
  const themeFilePath = `content/settings/theme.json`
  const navigationFilePath = `content/settings/navigation.json`
  const siteFilePath = `content/settings/site.json`

  if (preview) {
    const pageProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: pageFilePath,
      parse: parseJson,
    })
    const themeFile = await getGithubFile({
      ...previewData,
      fileRelativePath: themeFilePath,
      parse: parseJson,
    })
    const navigationFile = await getGithubFile({
      ...previewData,
      fileRelativePath: navigationFilePath,
      parse: parseJson,
    })
    const siteFile = await getGithubFile({
      ...previewData,
      fileRelativePath: siteFilePath,
      parse: parseJson,
    })

    return {
      props: {
        ...pageProps?.props,
        themeFile,
        navigationFile,
        siteFile,
      },
    }
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: pageFilePath,
        data: (await import(`../${pageFilePath}`)).default,
      },
      themeFile: {
        fileRelativePath: themeFilePath,
        data: (await import(`../${themeFilePath}`)).default,
      },
      navigationFile: {
        fileRelativePath: navigationFilePath,
        data: (await import(`../${navigationFilePath}`)).default,
      },
      siteFile: {
        fileRelativePath: siteFilePath,
        data: (await import(`../${siteFilePath}`)).default,
      },
    },
  }
}

const HOME_BLOCKS = {
  hero: heroBlock,
  features: featureListBlock,
  paragraph: paragraphBlock,
}
