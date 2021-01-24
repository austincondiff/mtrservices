import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { iconComponents } from '@components/common/Icon'
import { sizes } from '@utils/formOptions'
import Button from '@components/common/Button'

export const buttonBlock = {
  Component: ({ data, index }) => (
    <BlocksControls index={index}>
      <Link href={data.url || '#'} target={data.newWindow && '_blank'}>
        <Button {...data}>{data.label}</Button>
      </Link>
    </BlocksControls>
  ),
  template: {
    label: 'Button',
    defaultItem: {
      _template: 'button',
      label: 'Button',
    },
    fields: [
      {
        name: 'label',
        label: 'Label',
        component: 'text',
      },
      {
        name: 'url',
        label: 'URL',
        component: 'text',
      },
      {
        name: 'newWindow',
        label: 'Open in new window',
        component: 'toggle',
      },
      {
        name: 'icon',
        label: 'Icon',
        component: 'select',
        options: Object.keys(iconComponents).map((key) => ({ label: key.replace('-', ' '), value: key })),
      },
      {
        name: 'variant',
        label: 'Variant',
        component: 'select',
        options: [
          { value: 'contained', label: 'Contained' },
          { value: 'outlined', label: 'Outlined' },
          { value: 'ghost', label: 'Ghost' },
        ],
      },
      {
        name: 'color',
        label: 'Color',
        component: 'select',
        options: [
          { value: 'white', label: 'White' },
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
        ],
      },
      {
        name: 'size',
        label: 'Size',
        component: 'select',
        options: sizes,
      },
    ],
  },
}
