import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import Block, { blockFields, blockDefaults } from '../Block'

const Text = styled.p`
  font-size: 1.375rem;
  margin: 0;
`

function Paragraph({ data }) {
  return (
    <Block {...data}>
      <Text>
        <InlineTextarea name="text" focusRing={false} />
      </Text>
    </Block>
  )
}

export const paragraphBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <Paragraph data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Paragraph',
    defaultItem: {
      ...blockDefaults,
      text:
        'Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ',
    },
    fields: [...blockFields],
  },
}
