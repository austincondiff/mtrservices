import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'

const ColumnWrap = styled.div`
  flex: ${({ widthFraction }) => widthFraction};
`

function Column({ index, data }) {
  return (
    <BlocksControls index={index}>
      <ColumnWrap className="column">
        <ColumnBlocks name="comlumn" blocks={COLUMN_BLOCKS} direction="row" className="column" {...data} />
      </ColumnWrap>
    </BlocksControls>
  )
}

export const columnBlock = {
  Component: Column,
  template: {
    name: 'column',
    label: 'Column',
    defaultItem: {
      _template: 'column',
      widthFraction: 1,
    },
    fields: [
      {
        name: 'widthFraction',
        label: 'Width Fraction',
        component: 'number',
      },
    ],
  },
}

const COLUMN_BLOCKS = {
  featureList,
  paragraph,
  heading,
  paragraph,
}
