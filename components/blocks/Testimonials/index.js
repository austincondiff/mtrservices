import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import { testimonialBlock, Testimonial } from './Testimonial'
import Icon from '@components/common/Icon'
import theme from '@styles/theme'
import { useCarousel } from '@hooks/useCarousel'
import isInBroser from 'is-in-browser'

const TestimonialsWrap = styled.div`
  position: relative;
  left: 50%;
  margin-left: -50vw;
  width: 100vw;
  overflow: hidden;
`
const TestimonialsInside = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
  gap: 64px;
  padding-top: 52px;
`
const TestimonialControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  gap: 24px;
  padding: ${({ theme }) => theme.spacing.sm}px 0;
`
const DirectionalButton = styled.button`
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.black};
  opacity: 0.25;
  transition: 250ms;
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.color.primary};
  }
`
const Pagination = styled.div`
  display: flex;
  gap: 8px;
`
const PaginationButton = styled.button`
  cursor: pointer;
  outline: none;
  background-color: ${({ active, theme }) => (active ? theme.color.primary : `#00000044`)};
  box-shadow: ${({ active, theme }) => (active ? `0 8px 16px 2px rgba(17,12,46,0.15)` : `0 0 0 0 transparent`)};
  border: 0;
  padding: 0;
  width: 32px;
  height: 3px;
  transition: 400ms;
  position: relative;
  &:hover {
    background-color: ${({ active, theme }) => (active ? theme.color.primary : `#00000088`)};
  }
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 32px;
    position: absolute;
    left: 0;
    top: -15px;
  }
`

function makeIndices(start, delta, num) {
  const indices = []

  while (indices.length < num) {
    indices.push(start)
    start += delta
  }

  return indices
}

function Testimonials({ data }) {
  const { testimonials, interval = 5000 } = data
  const length = testimonials.length
  const slidesPresented = 3
  const numActive = Math.min(length, slidesPresented)
  const [slideIndexes, active, setActive, handlers, style] = useCarousel(length, interval, {
    slidesPresented: numActive,
  })

  return (
    <div>
      <TestimonialsWrap>
        <TestimonialsInside {...handlers} style={style}>
          {slideIndexes?.map?.((index, i) => (
            <Testimonial
              onClick={() => setActive(index)}
              key={`${index}-${i}`}
              {...testimonials[index]}
              active={index === active}
            />
          ))}
        </TestimonialsInside>
        <TestimonialControls>
          {data.directionalArrows && (
            <DirectionalButton onClick={() => setActive(active === 0 ? testimonials.length - 1 : active - 1)}>
              <Icon name="arrow-left" size="xl" />
            </DirectionalButton>
          )}
          {data.pagination && (
            <Pagination>
              {data.testimonials?.map((testimonial, index) => (
                <PaginationButton
                  key={index}
                  {...testimonial}
                  active={index === active}
                  onClick={() => setActive(index)}
                />
              ))}
            </Pagination>
          )}
          {data.directionalArrows && (
            <DirectionalButton onClick={() => setActive(active === testimonials.length - 1 ? 0 : active + 1)}>
              <Icon name="arrow-right" size="xl" />
            </DirectionalButton>
          )}
        </TestimonialControls>
      </TestimonialsWrap>
    </div>
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
      testimonials: [
        {
          _template: 'testimonial',
          author: {
            name: 'Tony Stark',
            title: 'CEO of Stark Industries',
            avatar: '/images/tony-stark-avatar.jpg',
          },
          body:
            "I would like to personally thank you for your outstanding product. It's incredible. It really saves me time and effort. MTR Services is exactly what our business has been lacking. I could probably go into sales for you.",
        },
        {
          _template: 'testimonial',
          author: {
            name: 'Steve Rodgers',
            avatar: '/images/steve-rogers-avatar.jpg',
          },
          body:
            'MTR Services saved my business. I would also like to say thank you to all your staff. Thank you so much for your help.',
        },
        {
          _template: 'testimonial',
          author: {
            name: 'Bruce Banner',
            avatar: '/images/bruce-banner-avatar.jpg',
          },
          body: 'MTR Services has completely surpassed our expectations. Just what I was looking for.',
        },
        {
          _template: 'testimonial',
          author: {
            name: 'Clint Barton',
            avatar: '/images/clint-barton-avatar.jpg',
          },
          body:
            "I would like to personally thank you for your outstanding product. It's incredible. It really saves me time and effort. MTR Services is exactly what our business has been lacking. I could probably go into sales for you.",
        },
        {
          _template: 'testimonial',
          author: {
            name: 'Natasha Romanoff',
            avatar: '/images/natasha-romanoff-avatar.jpg',
          },
          body:
            'MTR Services saved my business. I would also like to say thank you to all your staff. Thank you so much for your help.',
        },
        {
          _template: 'testimonial',
          author: {
            name: 'Thor Odinson',
            avatar: '/images/thor-odinson-avatar.jpg',
          },
          body: 'MTR Services has completely surpassed our expectations. Just what I was looking for.',
        },
        {
          _template: 'testimonial',
          author: {
            name: 'Peter Quill',
            avatar: '/images/peter-quill-avatar.jpg',
          },
          body: 'MTR Services has completely surpassed our expectations. Just what I was looking for.',
        },
      ],
      directionalArrows: true,
      pagination: true,
    },
    fields: [
      {
        name: 'directionalArrows',
        label: 'Directional Arrows',
        component: 'toggle',
      },
      {
        name: 'pagination',
        label: 'Pagination',
        component: 'toggle',
      },
      {
        name: 'testimonials',
        label: 'Testimonials',
        component: 'blocks',
        templates: TESTIMONIALS_BLOCKS,
      },
    ],
  },
}
