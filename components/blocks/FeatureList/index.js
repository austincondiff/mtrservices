import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { featureBlock } from './Feature'

const FeatureListBlocks = styled(InlineBlocks)`
  display: grid;
  grid-template-columns: ${({ columnCount }) =>
    Array(columnCount)
      .fill()
      .map((item) => `1fr`)
      .join(' ')};
  grid-gap: 3rem;
  grid-template-rows: auto;
  width: 100%;
`

function FeatureList({ data }) {
  return (
    <FeatureListBlocks
      name="features"
      blocks={FEATURE_BLOCKS}
      direction="row"
      className="feature-list"
      columnCount={data.columnCount}
    />
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
      columnCount: 3,
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
    fields: [
      {
        name: 'columnCount',
        label: 'Number of Columns',
        component: 'number',
      },
    ],
  },
}
