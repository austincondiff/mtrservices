import React from 'react'
import styled from 'styled-components'
// 1. Import 'BlocksControls'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'
import { blockFields, blockDefaults } from '../template'

const BlockWrap = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: ${({ textAlign }) => textAlign};
  padding: ${({ paddingTop, paddingBottom, theme }) =>
    `${theme.verticalSpacing[paddingTop]} 0 ${theme.verticalSpacing[paddingBottom]} 0`};
  color: ${({ color, theme }) => theme.color[color]};
  background-color: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  ${({ fullHeight }) => (fullHeight ? `height: 100vh;` : ``)}
`
const ContentWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

export function Hero({ data }) {
  return (
    <BlockWrap {...data}>
      <ContentWrap>
        <h1>
          <InlineTextarea name="headline" />
        </h1>
        <p>
          <InlineTextarea name="subtext" />
        </p>
      </ContentWrap>
    </BlockWrap>
  )
}

// 2. Define the block component with Hero
export const heroBlock = {
  Component: ({ index, data }) => (
    <BlocksControls insetControls focusRing={{ offset: { x: 0, y: 0 }, borderRadius: 0 }} index={index}>
      <Hero data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Hero',
    defaultItem: {
      ...blockDefaults,
      headline: 'The quick brown fox jumped over the lazy dog.',
      subtext: 'The quick brown fox jumped over the lazy dog.',
      align: 'center',
    },
    fields: [
      {
        name: 'primaryButtonLabel',
        label: 'Primary Button Label',
        component: 'text',
      },
      {
        name: 'primaryButtonLink',
        label: 'Primary Button Link',
        component: 'text',
      },
      {
        name: 'secondaryButtonLabel',
        label: 'Secondary Button Label',
        component: 'text',
      },
      {
        name: 'secondaryButtonLink',
        label: 'Secondary Button Link',
        component: 'text',
      },
      ...blockFields,
    ],
  },
}
