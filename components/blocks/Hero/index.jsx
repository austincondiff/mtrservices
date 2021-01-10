import React from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'
import Section, { sectionFields, sectionDefaults } from '../Section'
import Button, { ButtonGroup } from '@components/common/Button'

const HeroBlock = styled(Section)`
  p {
    font-size: 1.5em;
    color: ${({ color, theme }) => theme.color[color]}cc;
  }
`
const HeroInside = styled.div`
  max-width: 700px;
  display: inline-block;
`
const StyledButtonGroup = styled(ButtonGroup)`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
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

const BreakCharacters = ({ children }) => {
  return <>{typeof children === 'string' ? children.map((char) => <span>{char}</span>) : children}</>
}

export function Hero({ data }) {
  return (
    <HeroBlock {...data}>
      <HeroInside>
        <h1>
          <InlineTextarea name="headline" />
        </h1>
        <p>
          <InlineTextarea name="subtext" />
        </p>
        {(data.primaryButtonLabel || data.secondaryButtonLabel) && (
          <StyledButtonGroup orientation={data.buttonOrientation === 'vertical' ? 'vertical' : 'horizontal'} gap="sm">
            {data.primaryButtonLabel && (
              <Link href={data.primaryButtonUrl || '#'}>
                <Button variant="contained">{data.primaryButtonLabel}</Button>
              </Link>
            )}
            {data.secondaryButtonLabel && (
              <Link href={data.secondaryButtonUrl || '#'}>
                <Button variant={data.buttonOrientation === 'vertical' ? 'ghost' : 'outlined'}>
                  {data.secondaryButtonLabel}
                </Button>
              </Link>
            )}
          </StyledButtonGroup>
        )}
        {data.showScrollIndicator && <Arrow />}
      </HeroInside>
    </HeroBlock>
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
      ...sectionDefaults,
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
        name: 'primaryButtonUrl',
        label: 'Primary Button URL',
        component: 'text',
      },
      {
        name: 'secondaryButtonLabel',
        label: 'Secondary Button Label',
        component: 'text',
      },
      {
        name: 'secondaryButtonUrl',
        label: 'Secondary Button URL',
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
      ...sectionFields,
    ],
  },
}
