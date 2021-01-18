import styled from 'styled-components'

const FooterWrap = styled.footer`
  background-color: ${({ theme }) => theme.color.light};
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
const FooterInside = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`
export default function Footer() {
  return (
    <FooterWrap paddingTop="xs" paddingBottom="xs">
      <FooterInside>MTR Services Copyright {new Date().getFullYear()}</FooterInside>
    </FooterWrap>
  )
}
