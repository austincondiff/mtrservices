import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@components/common/Button'
import Logo from '@components/common/Logo'

const NavigationWrap = styled.div`
  position: fixed;
  top: ${({ adminToolbarVisible }) => (adminToolbarVisible ? 62 : 0)}px;
  left: 0;
  right: 0;
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: ${({ hasBackground, theme }) => (hasBackground ? theme.color.white : theme.color.transparent)};
  box-shadow: ${({ hasBackground, theme }) =>
    hasBackground ? `0 4px 16px 0 rgba(0,0,0,0.15)` : `0 0 0 0 ${theme.color.transparent}`};
  transition: 250ms;
  a {
    color: ${({ dark, theme }) => (dark ? theme.color.white : theme.color.black)};
  }
`
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`
const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
const StyledLink = styled.a`
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
`

const Navigation = ({ links, adminToolbarVisible }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        setScrolled(false)
      } else if (scrolled === false) {
        setScrolled(true)
      }
    })
  }, [])

  return (
    <NavigationWrap adminToolbarVisible={adminToolbarVisible} hasBackground={scrolled} dark={!scrolled}>
      <LogoWrap>
        <Logo dark={!scrolled} />
      </LogoWrap>
      <Links dark={scrolled}>
        {links?.map((link, i) => (
          <Link href={`${link?.url || null}`} key={`navLink-${i}`} passHref={!link.isButton}>
            {link.isButton ? (
              <Button size="sm" variant="contained">
                {link.label}
              </Button>
            ) : (
              <StyledLink>{link.label}</StyledLink>
            )}
          </Link>
        ))}
      </Links>
    </NavigationWrap>
  )
}

export default Navigation
