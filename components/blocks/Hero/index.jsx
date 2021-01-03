import React from 'react'
import styled from 'styled-components'
// 1. Import 'BlocksControls'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'

const HeroWrap = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 16vh 0;
`

export function Hero() {
  return (
    <HeroWrap>
      <div className="wrapper wrapper--narrow">
        <h1>
          <InlineTextarea name="headline" />
        </h1>
        <p>
          <InlineTextarea name="subtext" />
        </p>
      </div>
    </HeroWrap>
  )
}

// 2. Define the block component with Hero
export const heroBlock = {
  Component: ({ index }) => (
    <BlocksControls index={index}>
      <Hero />
    </BlocksControls>
  ),
  template: {
    label: 'Hero',
    defaultItem: {
      headline: 'Suspended in a Sunbeam',
      subtext: 'Dispassionate extraterrestrial observer',
    },
    fields: [],
  },
}
