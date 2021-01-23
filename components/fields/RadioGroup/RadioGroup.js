import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const RadioGroup = ({ input, field, options }) => {
  console.log({ field })
  const [activeRadioRef, setActiveRadioRef] = useState()
  const radioOptions = options || field.options
  const radioRefs = {}

  useEffect(() => {
    console.log({ activeRadioRef: radioRefs[`radio_${input.value}`] })
    setActiveRadioRef(radioRefs[`radio_${input.value}`])
  }, [input.value])

  const toProps = (option) => {
    if (typeof option === 'object') return option
    return { value: option, label: option }
  }

  const toComponent = (option) => {
    const optionId = `field-${field.name}-option-${option.value}`
    const checked = option.value === input.value

    return (
      <RadioOptionWrap
        variant={field.variant}
        ref={(ref) => {
          radioRefs[`radio_${option.value}`] = ref
        }}
      >
        <input
          type="radio"
          key={option.value}
          id={optionId}
          value={option.value}
          onChange={input.onChange}
          checked={checked}
        />
        <RadioOption for={optionId} checked={checked} variant={field.variant}>
          <Label variant={field.variant}>{option.label}</Label>
        </RadioOption>
      </RadioOptionWrap>
    )
  }

  return (
    <RadioOptions id={input.name} direction={field.direction} variant={field.variant}>
      {field.variant === 'button' && (
        <ActiveRadioIndicator
          width={activeRadioRef?.offsetWidth}
          height={activeRadioRef?.offsetHeight}
          position={{ left: activeRadioRef?.offsetLeft, top: activeRadioRef?.offsetTop }}
          hasValue={!!input.value}
        />
      )}
      {radioOptions ? radioOptions.map(toProps).map(toComponent) : input.value}
    </RadioOptions>
  )
}

export default RadioGroup

const Label = styled.span`
  ${(p) => (p.variant === 'button' ? `position: relative;` : ``)}
`

const ActiveRadioIndicator = styled.div`
  position: absolute;
  ${(p) => (p.width ? `width: ${p.width}px;` : ``)};
  ${(p) => (p.height ? `height: ${p.width}px;` : ``)};
  ${(p) => (p.position?.left ? `left: ${p.position?.left}px;` : ``)};
  ${(p) => (p.position?.top ? `top: ${p.position?.top}px;` : ``)}
  ${(p) => `transform: scale(${p.hasValue ? `1` : `0`});`}
  transition: all 85ms ease-out;
  backface-visibility: hidden;
  background-color: var(--tina-color-primary);
  box-shadow: var(--tina-shadow-small);
  border-radius: var(--tina-radius-big);
  height: calc(40px - 6px);
  pointer-events: none;
`

const RadioOptions = styled.div`
  display: flex;
  padding-top: 4px;
  ${(p) =>
    p.variant === 'button'
      ? `
    min-height: calc(40px + 2px);
    background-color: var(--tina-color-grey-0);
    border-radius: var(--tina-radius-big);
    box-shadow: var(--tina-shadow-small);
    background-color: var(--tina-color-grey-0);
    border: 1px solid var(--tina-color-grey-2);
    color: var(--tina-color-primary);
    padding: 3px;
    box-shadow: 0 0 0 0 var(--tina-color-grey-3);
    transition: all 85ms ease-out;
    gap: 3px;
    &:hover {
      box-shadow: 0 0 0 2px var(--tina-color-grey-3);
    }
    &:focus-within, &:active {
      box-shadow: 0 0 0 2px var(--tina-color-primary);
    }
  `
      : `
    gap: 12px;
    flex-wrap: wrap;
  `}
  ${(p) => (p.direction === 'vertical' ? `flex-direction: column;` : ``)}
`
const RadioOptionWrap = styled.div`
  ${(p) =>
    p.variant === 'button'
      ? `
      
    flex: 1;
    `
      : ``}
  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  font-size: var(--tina-font-size-1);
  ${(p) =>
    p.variant === 'button'
      ? `
    flex: 1;
    text-align: center;
    border-radius: var(--tina-radius-big);
    border: 1px solid var(--tina-color-grey-2);
    color: var(--tina-color-primary);
    font-weight: var(--tina-font-weight-regular);
    cursor: pointer;
    font-size: var(--tina-font-size-1);
    height: calc(40px - 6px);
    padding: 0 var(--tina-padding-small);
    transition: all 85ms ease-out;
    margin: 0;
    border: none;
    text-align: center;
    justify-content: center;
    input:checked + & {
      color: var(--tina-color-grey-0);
    }
    &:hover {
      background-color: var(--tina-color-grey-1);
    }
    &:active {
      background-color: var(--tina-color-grey-2);
    }
  `
      : `
  &:before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 4px;
    border-radius: var(--tina-radius-big);
    background-color: var(--tina-color-primary);
    border: 1px solid var(${(p) => (p.checked ? `--tina-color-primary` : `--tina-color-grey-2`)});
    box-shadow: 0 0 0 0 var(--tina-color-grey-3), inset 0 0 0 8px white;
    transition: all 85ms ease-out;
  }
  &:hover:before {
    box-shadow: 0 0 0 2px var(--tina-color-grey-3), inset 0 0 0 8px white;
  }
  input:focus + &:before {
    border: 1px solid var(--tina-color-grey-2);
    box-shadow: 0 0 0 2px var(--tina-color-primary), inset 0 0 0 8px white;
  }
  input:checked + &:before {
    border: 1px solid var(--tina-color-primary);
    box-shadow: 0 0 0 0 var(--tina-color-primary), inset 0 0 0 4px white;
  }
  input:checked:focus + &:before {
    border: 1px solid var(--tina-color-grey-2);
    box-shadow: 0 0 0 2px var(--tina-color-primary), inset 0 0 0 4px white;
  }
  `}
`
