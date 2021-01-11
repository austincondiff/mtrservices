import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'

const HeadingWrap = styled.div`
  width: 100%;
  & > * {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm}px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
const Supertitle = styled.span`
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 2px;
  padding: 0 ${({ theme }) => theme.spacing.sm}px;
  line-height: 40px;
  max-height: calc(1em + ${({ theme }) => theme.spacing.sm * 2}px);
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primary}11;
  text-transform: uppercase;
  display: inline-block;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  white-space: nowrap;
  textarea {
    background-color: transparent;
    white-space: nowrap;
  }
`
const Title = styled.h2`
  font-weight: 700;
  font-size: 44px;
  letter-spacing: -0.9px;
  line-height: 1.2;
`
const Subtitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.2px;
`

function Heading({ data }) {
  return (
    <HeadingWrap>
      {data.supertitle && (
        <Supertitle>
          <InlineTextarea name="supertitle" focusRing={false} />
        </Supertitle>
      )}
      {data.title && (
        <Title>
          <InlineTextarea name="title" focusRing={false} />
        </Title>
      )}
      {data.subtitle && (
        <Subtitle>
          <InlineTextarea name="subtitle" focusRing={false} />
        </Subtitle>
      )}
    </HeadingWrap>
  )
}

export const headingBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }}>
      <Heading data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Heading',
    defaultItem: {
      supertitle: 'Supertitle goes here',
      title: 'Title goes here',
      subtitle: 'Subtitle goes here',
    },
    fields: [
      {
        name: 'supertitle',
        label: 'Supertitle',
        component: 'text',
      },
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
        component: 'text',
      },
    ],
  },
}
