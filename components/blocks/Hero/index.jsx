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
      backgroundColor: 'white',
      textColor: 'black',
      align: 'center',
    },
    fields: [
      {
        name: 'background_color',
        label: 'Background Color',
        component: 'select',
        widget: 'block',
        options: [
          { value: 'white', label: 'White' },
          { value: 'light', label: 'Light' },
          { value: 'primaryLight', label: 'Primary Light' },
          { value: 'secondaryLight', label: 'Secondary Light' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'primaryDark', label: 'Primary Dark' },
          { value: 'secondaryDark', label: 'Secondary Dark' },
          { value: 'dark', label: 'Dark' },
          { value: 'black', label: 'Black' },
        ],
      },
      {
        name: 'text_color',
        label: 'Text Color',
        component: 'select',
        options: [
          { value: 'white', label: 'White' },
          { value: 'light', label: 'Light' },
          { value: 'primaryLight', label: 'Primary Light' },
          { value: 'secondaryLight', label: 'Secondary Light' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'primaryDark', label: 'Primary Dark' },
          { value: 'secondaryDark', label: 'Secondary Dark' },
          { value: 'dark', label: 'Dark' },
          { value: 'black', label: 'Black' },
        ],
      },
      {
        name: 'inverse_colors_for_dark_mode',
        label: 'Inverse Colors for Dark Mode',
        component: 'toggle',
      },
      {
        name: 'fullHeight',
        label: 'Full Height',
        component: 'toggle',
      },
      {
        name: 'Width',
        label: 'Full Width',
        component: 'select',
        options: [
          { value: 'narrow', label: 'Narrow' },
          { value: 'default', label: 'Default' },
          { value: 'wide', label: 'Wide' },
          { value: 'fullWidth', label: 'Full Width' },
        ],
      },
      {
        name: 'align',
        label: 'Alignment',
        component: 'select',
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ],
      },
      {
        name: 'padding_top',
        label: 'Padding Top',
        component: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'xs', label: 'Extra Small' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' },
        ],
      },
      {
        name: 'padding_bottom',
        label: 'Padding Bottom',
        component: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'xs', label: 'Extra Small' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' },
        ],
      },
    ],
  },
}
