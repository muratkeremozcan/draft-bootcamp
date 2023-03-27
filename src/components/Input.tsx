import type {HTMLProps} from 'react'
import styled from '@emotion/styled'
import type {StyledComponent} from '@emotion/styled'

export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    <FormGroup data-cy="Input">
      <Label htmlFor={id}>{label}</Label>
      <FormInput
        data-cy="form-input"
        type="text"
        id={id}
        {...restProps}
      ></FormInput>
    </FormGroup>
  )
}

const FormGroup = styled.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  width: '100%',
})

const Label = styled.label({
  display: 'block',
  color: '#090637',
  fontSize: '14px',
  fontWeight: 600,
  paddingBottom: '6px',
  width: '100%',
})

const FormInput: StyledComponent<
  HTMLProps<HTMLInputElement>,
  any,
  Record<string, never>
> = styled.input({
  border: '1px solid #515963',
  borderRadius: '4px',
  fontFamily: '"Nunito Sans", sans-serif',
  lineHeight: '38px',
  padding: '0 8px',
  flex: '1 0',
  '&:focus': {
    boxShadow: '#27aee4 0px 0px 0px 1px inset',
    border: '1px solid #27aee4',
    outline: 'none',
  },
})
