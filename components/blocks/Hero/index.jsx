import React from 'react'
import styled from 'styled-components'
// 1. Import 'BlocksControls'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'
import { Block, blockFields, blockDefaults } from '../template'

export function Hero({ data }) {
  return (
    <Block {...data}>
      <h1>
        <InlineTextarea name="headline" />
      </h1>
      <p>
        <InlineTextarea name="subtext" />
      </p>
    </Block>
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
