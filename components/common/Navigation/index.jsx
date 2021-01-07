import Link from 'next/link'
import styled from 'styled-components'

const NavigationWrap = styled.div`
  position: fixed;
  top: ${({ adminToolbarVisible }) => (adminToolbarVisible ? 62 : 0)}px;
  left: 0;
  right: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
`
const LogoWrap = styled.div`
  flex: 1;
`
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const StyledLink = styled.a`
  color: white;
  text-decoration: none;
`

const Navigation = ({ links, adminToolbarVisible }) => {
  return (
    <NavigationWrap adminToolbarVisible={adminToolbarVisible}>
      <LogoWrap>Logo here</LogoWrap>
      <Links>
        {links?.map((link, i) => (
          <Link href={`${link?.url || null}`} key={`navLink-${i}`} passHref={!link.isButton}>
            {link.isButton ? <button>{link.label}</button> : <StyledLink>{link.label}</StyledLink>}
          </Link>
        ))}
      </Links>
    </NavigationWrap>
  )
}

export default Navigation
