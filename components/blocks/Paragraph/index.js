import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'

const Text = styled.p`
  font-size: 1.375rem;
  margin: 0;
`
const ParagraphWrap = styled.section`
  background-color: #eff4f6;
`

function Paragraph({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ParagraphWrap>
        <div className="wrapper wrapper--narrow">
          <Text>
            <InlineTextarea name="text" focusRing={false} />
          </Text>
        </div>
      </ParagraphWrap>
    </BlocksControls>
  )
}

export const paragraphBlock = {
  Component: Paragraph,
  template: {
    label: 'Paragraph',
    defaultItem: {
      text:
        'Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ',
    },
    fields: [],
  },
}
