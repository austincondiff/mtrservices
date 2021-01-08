import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@components/common/Button'
import Logo from '@components/common/Logo'

const NavigationWrap = styled.div`
  position: fixed;
  top: ${({ adminToolbarVisible }) => (adminToolbarVisible ? `var(--tina-toolbar-height)` : 0)}px;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${({ condensed, theme }) => (condensed ? 64 : 96)}px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: ${({ transparent, borderWhenTransparent, dark, theme }) =>
    transparent && borderWhenTransparent
      ? `1px solid ${dark ? theme.color.white : theme.color.black}33`
      : `0 solid ${theme.color.transparent}`};
  background-color: ${({ transparent, theme }) => (transparent ? theme.color.transparent : theme.color.white)};
  box-shadow: ${({ transparent, theme }) =>
    transparent ? `0 0 0 0 ${theme.color.transparent}` : `0 4px 16px 0 rgba(0,0,0,0.15)`};
  transition: box-shadow 250ms, background-color 250ms, height 250ms, border 250ms, left 150ms ease-out;
  a {
    color: ${({ dark, theme }) => (dark ? theme.color.white : theme.color.black)};
  }
  [open] > & {
    left: var(--tina-sidebar-width);
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
  display: block;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f25e1c 0%, #edc621 100%);
    transform: scaleX(${({ active }) => (active ? 1 : 0)});
    transition: 250ms;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`

const Navigation = ({ links, adminToolbarVisible, router }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setScrolled(false)
      } else if (scrolled === false) {
        setScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <NavigationWrap
      adminToolbarVisible={adminToolbarVisible}
      condensed={scrolled}
      transparent={!scrolled}
      borderWhenTransparent
      dark={!scrolled}
    >
      <LogoWrap>
        <Logo dark={!scrolled} />
      </LogoWrap>
      <Links dark={scrolled}>
        {links?.map((link, i) => (
          <Link href={`${link.url || null}`} key={`navLink-${i}`} passHref={!link.isButton}>
            {link.isButton ? (
              <Button size="sm" variant="contained">
                {link.label}
              </Button>
            ) : (
              <StyledLink active={router.pathname === link.url}>{link.label}</StyledLink>
            )}
          </Link>
        ))}
      </Links>
    </NavigationWrap>
  )
}

export default withRouter(Navigation)
