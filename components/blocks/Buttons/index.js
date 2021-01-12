import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { buttonBlock } from './Button'

const ButtonGroupBlocks = styled(InlineBlocks)`
  display: flex;
  width: 100%;
`

function ButtonGroup({ data }) {
  return (
    <ButtonGroupBlocks
      name="features"
      blocks={BUTTON_BLOCKS}
      direction="horizontal"
      className="feature-list"
      columnCount={data.columnCount}
    />
  )
}

const BUTTON_BLOCKS = {
  button: buttonBlock,
}

export const buttonGroupBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={false} label={false}>
      <ButtonGroup data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Button Group',
    defaultItem: {
      _template: 'buttonGroup',
      direction: 'horizontal',
      buttons: [
        {
          _template: 'button',
          label: 'Button',
          variant: 'contained',
          color: 'primary',
        },
        {
          _template: 'button',
          label: 'Button',
          variant: 'outlined',
          color: 'primary',
        },
      ],
    },
    fields: [
      {
        name: 'direction',
        label: 'Direction',
        component: 'select',
        options: [
          { value: 'horizontal', label: 'Horizontal' },
          { value: 'vertical', label: 'Vertical' },
        ],
      },
    ],
  },
}
