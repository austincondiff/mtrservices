import React from 'react'
import styled from 'styled-components'
// 1. Import 'BlocksControls'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'
import Block, { blockFields, blockDefaults } from '../Block'
import Button, { ButtonGroup } from '@components/common/Button'

const StyledButtonGroup = styled(ButtonGroup)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`

export function Hero({ data }) {
  return (
    <Block {...data}>
      <h1>
        <InlineTextarea name="headline" />
      </h1>
      <p>
        <InlineTextarea name="subtext" />
      </p>
      {(data.primaryButtonLabel || data.secondaryButtonLabel) && (
        <StyledButtonGroup orientation="vertical" gap="sm">
          {data.primaryButtonLabel && <Button variant="contained">{data.primaryButtonLabel}</Button>}
          {data.secondaryButtonLabel && <Button>{data.secondaryButtonLabel}</Button>}
        </StyledButtonGroup>
      )}
    </Block>
  )
}

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
