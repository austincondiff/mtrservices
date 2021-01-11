import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import Icon, { iconComponents } from '@components/common/Icon'

const IconWrap = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs}px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primary}18;
  border-radius: ${({ theme }) => theme.radius.md}px;
  font-size: 0;
`

function Feature({ data, index }) {
  return (
    <BlocksControls index={index}>
      <div className="feature">
        {data.icon && (
          <IconWrap>
            <Icon size="lg" name={data.icon} />
          </IconWrap>
        )}
        <h3>
          <InlineTextarea name="heading" focusRing={false} />
        </h3>
        <p>
          <InlineTextarea name="supporting_copy" focusRing={false} />
        </p>
      </div>
    </BlocksControls>
  )
}

export const featureBlock = {
  Component: Feature,
  template: {
    label: 'Feature',
    defaultItem: {
      _template: 'feature',
      heading: 'Marie Skłodowska Curie',
      supporting_copy:
        'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
    },
    fields: [
      {
        name: 'icon',
        label: 'Icon',
        component: 'select',
        options: Object.keys(iconComponents).map((key) => ({ label: key.replace('-', ' '), value: key })),
      },
    ],
  },
}
