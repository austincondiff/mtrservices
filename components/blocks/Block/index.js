import styled from 'styled-components'

export const blockDefaults = {
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
}

export const blockFields = [
  {
    name: 'color',
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
    name: 'backgroundColor',
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
    component: 'file',
  },
  {
    name: 'backgroundOpacity',
    label: 'Background Image/Video Opacity',
    component: 'number',
    step: 0.01,
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
    name: 'textAlign',
    label: 'Text Alignment',
    component: 'select',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
  },
  {
    name: 'paddingTop',
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
    name: 'paddingBottom',
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
]

const BlockWrap = styled.section`
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
`
const ContentWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`
const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${({ backgroundImage }) => (backgroundImage ? `background-image: url(${backgroundImage});` : ``)}
  ${({ backgroundOpacity }) => (backgroundOpacity !== undefined ? `opacity: ${backgroundOpacity};` : ``)}
`

const Block = ({ children, ...props }) => {
  return (
    <BlockWrap {...props}>
      {props.backgroundImage && <BackgroundImage {...props} />}
      <ContentWrap>{children}</ContentWrap>
    </BlockWrap>
  )
}

export default Block
