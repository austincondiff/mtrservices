import React from 'react'
import styled, { keyframes } from 'styled-components'
// 1. Import 'BlocksControls'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'
import Block, { blockFields, blockDefaults } from '../Block'
import Button, { ButtonGroup } from '@components/common/Button'

const StyledButtonGroup = styled(ButtonGroup)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const arrowBounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`
const Arrow = styled.div`
  position: absolute;
  bottom: -16vh;
  left: calc(50% - 8px);
  animation: ${arrowBounce} 2s infinite;
  &:after {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    border-right: 1.5px solid white;
    border-bottom: 1.5px solid white;
  }
  /* mediaQueries.sm {
    bottom: 6vw;
  } */
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
        <StyledButtonGroup orientation={data.buttonOrientation === 'vertical' ? 'vertical' : 'horizontal'} gap="sm">
          {data.primaryButtonLabel && <Button variant="contained">{data.primaryButtonLabel}</Button>}
          {data.secondaryButtonLabel && (
            <Button variant={data.buttonOrientation === 'vertical' ? 'ghost' : 'outlined'}>
              {data.secondaryButtonLabel}
            </Button>
          )}
        </StyledButtonGroup>
      )}
      {data.showScrollIndicator && <Arrow />}
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
      {
        name: 'buttonOrientation',
        label: 'Button Orientation',
        component: 'select',
        options: [
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
        ],
      },
      {
        name: 'showScrollIndicator',
        label: 'Show Scroll Indicator',
        component: 'toggle',
      },
      ...blockFields,
    ],
  },
}
