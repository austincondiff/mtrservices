import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { featureBlock } from './Feature'
import { Block, blockFields, blockDefaults } from '../template'

const FeatureListBlocks = styled(InlineBlocks)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3rem;
  grid-template-rows: auto;
`

function FeatureList({ data }) {
  return (
    <Block {...data}>
      <FeatureListBlocks name="features" blocks={FEATURE_BLOCKS} direction="row" className="feature-list" max={3} />
    </Block>
  )
}

const FEATURE_BLOCKS = {
  feature: featureBlock,
}

export const featureListBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FeatureList data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Feature List',
    defaultItem: {
      _template: 'features',
      ...blockDefaults,
      features: [
        {
          _template: 'feature',
          heading: 'heading 1',
          supporting_copy: 'supporting copy',
        },
        {
          _template: 'feature',
          heading: 'heading 2',
          supporting_copy: 'supporting copy',
        },
        {
          _template: 'feature',
          heading: 'heading 3',
          supporting_copy: 'supporting copy',
        },
      ],
    },
    fields: [...blockFields],
  },
}
