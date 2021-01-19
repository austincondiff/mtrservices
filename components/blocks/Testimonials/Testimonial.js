import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import Icon, { iconComponents } from '@components/common/Icon'
import QuotationMark from './QuotationMark'

const TestimonialWrap = styled.div`
  background: #fff;
  box-shadow: 0 48px 100px 0 rgba(17, 12, 46, 0.15);
  opacity: 1;
  cursor: auto;
  text-align: center;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  justify-content: space-between;
  width: 800px;
  height: 396px;
  border-radius: 16px;
  box-shadow: 0 10px 50px 0 rgba(17, 12, 46, 0.1);
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  background: hsla(0, 0%, 100%, 0.6);
  transition: box-shadow 0.5s ease, opacity 0.5s ease;
`
const Avatar = styled.div`
  width: 104px;
  height: 104px;
  margin-top: -52px;
  border-radius: 100%;
  filter: grayscale(${({ active }) => (active ? 0 : 100)}%);
  transition: filter 0.5s ease;
  background-color: slateblue;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
`
const Body = styled.p`
  max-width: 650px;
  text-align: center;
  margin: auto 0;
  padding: 0 7%;
  font-size: 18px;
  line-height: 1.8;
  letter-spacing: -0.2px;
  color: #0e0c1b;
  && {
    margin: 0;
  }
`

const AuthorWrap = styled.div`
  text-align: center;
  margin: 0;
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 1.5;
  color: #0e0c1b;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AuthorName = styled.span``
const StyledQuotationMark = styled(QuotationMark)`
  width: 32px;
  margin-bottom: 16px;
  opacity: 0.15;
`

export const Testimonial = React.forwardRef(({ body, author, active, onClick }, ref) => {
  return (
    <TestimonialWrap active={active} onClick={onClick} ref={ref}>
      {(true || data.avatar) && <Avatar size="lg" src={author.avatar} active={active} />}
      <Body>{body}</Body>
      <AuthorWrap>
        <StyledQuotationMark />
        <AuthorName>{author.name}</AuthorName>
      </AuthorWrap>
    </TestimonialWrap>
  )
})

const testimonialBlockTemplate = {
  key: 'testimonial',
  label: 'Testimonial',
  defaultItem: {
    _template: 'testimonial',
    author: 'Marie Skłodowska Curie',
    title: 'Co-founder',
    body:
      'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
  },
  fields: [
    {
      name: 'body',
      label: 'Body',
      component: 'textarea',
    },
    {
      name: 'author',
      label: 'Author',
      component: 'group',
      fields: [
        {
          name: 'name',
          label: 'Name',
          component: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          component: 'text',
        },
        {
          name: 'avatar',
          label: 'Avatar',
          component: 'image',
          parse: (media) => `/images/${media.filename}`,
          uploadDir: () => '/public/images/',
          previewSrc: (fullSrc) => fullSrc.replace('/public', ''),
        },
      ],
    },
  ],
}

export const testimonialBlock = {
  Component: Testimonial,
  template: testimonialBlockTemplate,
  ...testimonialBlockTemplate,
}
