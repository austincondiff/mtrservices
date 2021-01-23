import { wrapFieldsWithMeta } from '@tinacms/fields'

import RadioGroup from './RadioGroup'

export const RadioGroupField = wrapFieldsWithMeta(RadioGroup)

export const RadioGroupFieldPlugin = {
  name: 'radio-group',
  Component: RadioGroupField,
}
