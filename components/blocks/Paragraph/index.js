import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'

const Text = styled.p`
  font-size: 1.375rem;
  margin: 0;
`

function Paragraph({ data }) {
  return (
    <Text>
      <InlineTextarea name="text" focusRing={false} />
    </Text>
  )
}

export const paragraphBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index} focusRing={{ offset: 0 }}>
      <Paragraph data={data} />
    </BlocksControls>
  ),
  template: {
    label: 'Paragraph',
    defaultItem: {
      text:
        'Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ',
    },
  },
}
