import React, { useMemo } from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks, useInlineBlocks } from 'react-tinacms-inline'
import { Stack, stackBlock, stackFields, stackDefaults, BackgroundImage, BackgroundGradient } from '../Stack'
import Icon from '@components/common/Icon'
import ShapeDivider from './ShapeDivider'
import { sizes, colors } from '@utils/formOptions'

export const sectionDefaults = {
  color: 'black',
  backgroundColor: 'white',
  darkModeColorInverse: true,
  backgroundParallax: false,
  contentParallax: false,
  fullHeight: false,
  width: 'default',
  textAlign: 'left',
  paddingTop: 'md',
  paddingBottom: 'md',
  gap: 'lg',
  align: 'start',
  direction: 'horizontal',
  sectionChildren: [
    {
      _template: 'stack',
      ...stackDefaults,
    },
  ],
}

export const sectionFields = [
  {
    name: 'fullHeight',
    label: 'Full Height',
    component: 'toggle',
  },
  {
    name: 'width',
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
    name: 'paddingTop',
    label: 'Padding Top',
    component: 'select',
    options: sizes,
  },
  {
    name: 'paddingBottom',
    label: 'Padding Bottom',
    component: 'select',
    options: sizes,
  },
  {
    name: 'shapeDivider',
    label: 'Shape Divider',
    component: 'group',
    fields: [
      {
        name: 'name',
        label: 'Type',
        component: 'select',
        options: [
          { value: null, label: 'None' },
          { value: 'book', label: 'Book' },
          { value: 'curve', label: 'Curve' },
          { value: 'split', label: 'Split' },
          { value: 'tilt', label: 'Tilt' },
          { value: 'triangle', label: 'Triangle' },
          { value: 'triangle-asymetrical', label: 'Triangle Asymetrical' },
          { value: 'wave', label: 'Wave' },
          { value: 'wave-fade', label: 'Wave Fade' },
          { value: 'wave-alt', label: 'Wave Alt' },
        ],
      },
      {
        name: 'color',
        label: 'Color',
        component: 'select',
        options: colors,
      },
      {
        name: 'position',
        label: 'Position',
        component: 'select',
        options: [
          { value: 'top', label: 'Top' },
          { value: 'bottom', label: 'Bottom' },
        ],
      },
      {
        name: 'flipped',
        label: 'Flipped',
        component: 'toggle',
      },
      {
        name: 'inverted',
        label: 'Inverted',
        component: 'toggle',
      },
    ],
  },
]

const SectionWrap = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: ${({ textAlign }) => textAlign};
  padding: ${({ paddingTop, paddingBottom, theme }) =>
    `${theme.verticalSpacing[paddingTop]} 0 ${theme.verticalSpacing[paddingBottom]} 0`};
  color: ${({ color, theme }) => theme.color[color]};
  background-color: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  ${({ fullHeight }) => (fullHeight ? `height: 100vh;` : ``)}
  gap: ${({ gap, theme }) => theme.spacing[gap] || 0}px;
`
const ContentWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`

const Section = ({ children, ...props }) => {
  console.log({ props })
  return (
    <SectionWrap {...props}>
      {props.shapeDivider?.name && <ShapeDivider {...props.shapeDivider} />}
      {props.backgroundImage && !props.backgroundVideo && <BackgroundImage {...props} />}
      {props.backgroundVideo && <BackgroundVideo {...props} />}
      {props.backgroundGradient?.enable && <BackgroundGradient {...props} />}
      <ContentWrap>{children}</ContentWrap>
    </SectionWrap>
  )
}

const SectionStack = styled(Stack)``

export default Section

const DuplicateIcon = () => <Icon size="sm" name="copy" style={{ width: 26, height: 18 }} />

export const sectionBlock = {
  Component: ({ index, data }) => {
    const { insert } = useInlineBlocks()
    const DuplicateAction = useMemo(
      () => ({
        icon: DuplicateIcon(),
        onClick: () => insert(index + 1, data),
      }),
      [data]
    )

    return (
      <BlocksControls
        index={index}
        focusRing={{ offset: 0, borderRadius: 0 }}
        insetControls
        customActions={[DuplicateAction]}
      >
        <Section {...data}>
          <SectionStack
            name="sectionChildren"
            blocks={SECTION_BLOCKS}
            className="section"
            {...data}
            backgroundColor={null}
            backgroundGradient={null}
            backgroundImage={null}
          />
        </Section>
      </BlocksControls>
    )
  },
  template: {
    label: 'Section',
    defaultItem: {
      _template: 'section',
      ...sectionDefaults,
      ...stackDefaults,
      direction: 'horizontal',
    },
    fields: [...sectionFields, ...stackFields],
  },
}

const SECTION_BLOCKS = {
  stack: stackBlock,
}
