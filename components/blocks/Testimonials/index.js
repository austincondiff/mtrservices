import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { testimonialBlock, Testimonial } from './Testimonial'
import Icon from '@components/common/Icon'
import theme from '@styles/theme'

const TestimonialsWrap = styled.div`
  position: relative;
  left: 50%;
  margin-left: -50vw;
  width: 100vw;
  overflow: hidden;
`
const TestimonialsInside = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding-top: 52px;
`
const TestimonialControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  gap: 24px;
`
const DirectionalButton = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.primary};
`
const Pagination = styled.div`
  display: flex;
  gap: 12px;
`
const PaginationButton = styled.button`
  background-color: ${({ active, theme }) => (active ? theme.color.primary : `#00000044`)};
  box-shadow: ${({ active, theme }) => (active ? `0 8px 24px 0 rgba(17, 12, 46, 0.15)` : `0 0 0 0 transparent`)};
  border: 0;
  padding: 0;
  width: 32px;
  height: 3px;
`

function Testimonials({ data }) {
  return (
    <TestimonialsWrap>
      <TestimonialsInside>
        {data.testimonials?.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} active={index === Math.floor(data.testimonials?.length / 2)} />
        ))}
      </TestimonialsInside>
      <TestimonialControls>
        <DirectionalButton>
          <Icon name="arrow-left" size="lg" />
        </DirectionalButton>
        <Pagination>
          {data.testimonials?.map((testimonial, index) => (
            <PaginationButton
              key={index}
              {...testimonial}
              active={index === Math.floor(data.testimonials?.length / 2)}
            />
          ))}
        </Pagination>
        <DirectionalButton>
          <Icon name="arrow-right" />
        </DirectionalButton>
      </TestimonialControls>
    </TestimonialsWrap>
  )
}

const TESTIMONIALS_BLOCKS = {
  testimonial: testimonialBlock,
}

export const testimonialsBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Testimonials data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Testimonials',
    defaultItem: {
      _template: 'testimonials',
      columnCount: 3,
      testimonials: [
        {
          _template: 'testimonial',
          author: { name: 'John Smith' },
          body:
            "I would like to personally thank you for your outstanding product. It's incredible. It really saves me time and effort. MTR Services is exactly what our business has been lacking. I could probably go into sales for you.",
        },
        {
          _template: 'testimonial',
          author: { name: 'Jane Doe' },
          body:
            'MTR Services saved my business. I would also like to say thank you to all your staff. Thank you so much for your help.',
        },
        {
          _template: 'testimonial',
          author: { name: 'Johnny Appleseed' },
          body: 'MTR Services has completely surpassed our expectations. Just what I was looking for.',
        },
      ],
    },
    fields: [
      {
        name: 'testimonials',
        label: 'Testimonials',
        component: 'blocks',
        templates: TESTIMONIALS_BLOCKS,
      },
    ],
  },
}
