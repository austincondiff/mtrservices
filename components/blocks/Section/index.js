import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { Stack, stackBlock, stackFields, stackDefaults, BackgroundImage, BackgroundGradient } from '../Stack'
import { sizes } from '@utils/formOptions'

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
  gap: 'md',
  align: 'start',
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
  gap: ${({ gap, theme }) => `${theme.spacing[gap] || 0}`};
`
const ContentWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`

const Section = ({ children, ...props }) => {
  return (
    <SectionWrap {...props}>
      {props.backgroundImage && !props.backgroundVideo && <BackgroundImage {...props} />}
      {props.backgroundVideo && <BackgroundVideo {...props} />}
      {props.backgroundGradient?.enable && <BackgroundGradient {...props} />}
      <ContentWrap>{children}</ContentWrap>
    </SectionWrap>
  )
}

const SectionStack = styled(Stack)``

export default Section

export const sectionBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0, borderRadius: 0 }} insetControls>
      <Section {...data}>
        <SectionStack
          name="section"
          blocks={SECTION_BLOCKS}
          className="section"
          {...data}
          backgroundColor={null}
          backgroundGradient={null}
          backgroundImage={null}
        />
      </Section>
    </BlocksControls>
  ),
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
