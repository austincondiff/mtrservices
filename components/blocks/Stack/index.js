import React, { useMemo } from 'react'
import theme from '@styles/theme'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks, useInlineBlocks } from 'react-tinacms-inline'
import { sizes, colors } from '@utils/formOptions'
import { featureListBlock } from '../FeatureList'
import { featureBlock } from '../FeatureList/Feature'
import { headingBlock } from '../Heading'
import { paragraphBlock } from '../Paragraph'
import { buttonGroupBlock } from '../Buttons'
import { buttonBlock } from '../Buttons/Button'
import { testimonialsBlock } from '../Testimonials'
import Icon from '@components/common/Icon'

export const Stack = styled(InlineBlocks)`
  display: flex;
  gap: ${({ gap, theme }) => theme.spacing[gap] || 0}px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: ${({ align }) => `${align === 'center' || align === 'stretch' ? `` : `flex-`}${align}`};
  ${({ direction }) => (direction === 'vertical' ? `flex-direction: column;` : ``)}
  text-align: ${({ textAlign }) => textAlign};
  color: ${({ color, theme }) => theme.color[color]};
  background-color: ${({ backgroundColor, theme }) => theme.color[backgroundColor]};
  ${({ paddingTop, paddingRight, paddingBottom, paddingLeft, theme }) =>
    paddingTop || paddingRight || paddingBottom || paddingLeft
      ? `padding: 
      ${theme.spacing[paddingTop] || 0}px 
      ${theme.spacing[paddingRight] || 0}px 
      ${theme.spacing[paddingBottom] || 0}px 
      ${theme.spacing[paddingLeft] || 0}px;`
      : ``}
  ${({ radius }) => (radius ? `border-radius: ${theme.radius[radius]}px;` : ``)}
  flex: 1;
`

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${({ backgroundImage }) => (backgroundImage ? `background-image: url(${backgroundImage});` : ``)}
  ${({ backgroundOpacity }) => (backgroundOpacity !== undefined ? `opacity: ${backgroundOpacity};` : ``)}
`

export const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    ${({ backgroundGradient, theme }) =>
      `${backgroundGradient.angle}deg, ${backgroundGradient.stops
        .map((stop) => `${theme.color[stop.color]} ${stop.position}%`)
        .join(', ')}`}
  );
`

export default Stack

export const stackDefaults = {
  gap: 'md',
  direction: 'vertical',
  distribute: 'center',
  align: 'center',
  padding: 0,
  radius: 0,
  background: 'transparent',
}

export const stackFields = [
  {
    name: 'gap',
    label: 'Gap',
    component: 'select',
    options: sizes,
  },
  {
    name: 'direction',
    label: 'Direction',
    component: 'select',
    options: [
      { value: 'horizontal', label: 'Horizontal' },
      { value: 'vertical', label: 'Vertical' },
    ],
  },
  {
    name: 'align',
    label: 'Align',
    component: 'select',
    options: [
      { value: 'start', label: 'Start' },
      { value: 'center', label: 'Center' },
      { value: 'end', label: 'End' },
      { value: 'stretch', label: 'Stretch' },
    ],
  },
  {
    name: 'color',
    label: 'Text Color',
    component: 'select',
    options: colors,
  },
  {
    name: 'backgroundColor',
    label: 'Background Color',
    component: 'select',
    options: colors,
  },
  {
    name: 'backgroundGradient',
    label: 'Background Gradient',
    component: 'group',
    fields: [
      {
        name: 'enable',
        label: 'Enable',
        component: 'toggle',
      },
      {
        name: 'angle',
        label: 'Angle (In Degrees)',
        component: 'number',
      },
      {
        name: 'type',
        label: 'Type',
        component: 'select',
        options: [
          { label: 'Linear', value: 'linear' },
          { label: 'Radial', value: 'radial' },
        ],
      },
      {
        name: 'stops',
        label: 'Stops',
        component: 'group-list',
        defaultItem: {
          color: 'transparent',
          opacity: 1,
          position: 0,
        },
        itemProps: (item) => ({
          key: item.id,
          label: `${item.opacity} ${item.color} ${item.position}%`,
        }),
        fields: [
          {
            name: 'color',
            label: 'Color',
            component: 'select',
            options: colors,
          },
          {
            name: 'opacity',
            label: 'Opacity',
            component: 'number',
            step: 0.01,
          },
          {
            name: 'position',
            label: 'Position (0 - 100)',
            component: 'number',
          },
        ],
      },
    ],
  },
  {
    name: 'darkModeColorInverse',
    label: 'Inverse Colors for Dark Mode',
    component: 'toggle',
  },
  {
    name: 'backgroundImage',
    label: 'Background Image',
    component: 'image',
    parse: (media) => `/images/${media.filename}`,
    uploadDir: () => '/public/images/',
    previewSrc: (fullSrc) => fullSrc.replace('/public', ''),
  },
  {
    name: 'backgroundVideo',
    label: 'Background Video',
    component: 'image',
  },
  {
    name: 'backgroundOpacity',
    label: 'Background Image/Video Opacity',
    component: 'number',
    step: 0.01,
  },
  {
    name: 'paddingTop',
    label: 'Padding Top',
    component: 'select',
    options: sizes,
  },
  {
    name: 'paddingRight',
    label: 'Padding Right',
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
    name: 'paddingLeft',
    label: 'Padding Left',
    component: 'select',
    options: sizes,
  },
  {
    name: 'radius',
    label: 'Radius',
    component: 'select',
    options: sizes,
  },
  {
    name: 'backgroundParallax',
    label: 'Background Parallax',
    component: 'toggle',
  },
  {
    name: 'contentParallax',
    label: 'Content Parallax',
    component: 'toggle',
  },
  {
    name: 'textAlign',
    label: 'Text Alignment',
    component: 'select',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
  },
]

const DuplicateIcon = () => <Icon size="sm" name="copy" style={{ width: 26, height: 18 }} />

export const stackBlock = {
  Component: ({ index, data }) => {
    const { insert } = useInlineBlocks()
    const DuplicateAction = useMemo(
      () => ({
        icon: <DuplicateIcon />,
        onClick: () => insert(index + 1, data),
      }),
      [data]
    )

    return (
      <BlocksControls index={index} customActions={[DuplicateAction]}>
        <Stack {...data} name="stackChildren" direction={data.direction} blocks={STACK_BLOCKS}>
          {data.backgroundImage && !data.backgroundVideo && <BackgroundImage {...data} />}
          {data.backgroundVideo && <BackgroundVideo {...data} />}
        </Stack>
      </BlocksControls>
    )
  },
  template: {
    label: 'Stack',
    defaultItem: {
      _template: 'stack',
      ...stackDefaults,
    },
    fields: [...stackFields],
  },
}

const STACK_BLOCKS = {
  stack: stackBlock,
  feature: featureBlock,
  features: featureListBlock,
  heading: headingBlock,
  paragraph: paragraphBlock,
  buttonGroup: buttonGroupBlock,
  button: buttonBlock,
  testimonials: testimonialsBlock,
}
