import {HTMLProps} from 'react'
import styled from '@emotion/styled'
import {Field} from 'formik'
export interface Props extends HTMLProps<HTMLInputElement> {
  label: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    <FormGroup>
      <Label className="form-label" htmlFor={id}>
        {label}
      </Label>
      <FormInput className="form-input" type="text" id={id} {...restProps} />
    </FormGroup>
  )
}

const FormInput = styled(Field)({
  border: '1px solid #515963',
  borderRadius: 4,
  fontFamily: '"Nunito Sans", sans-serif',
  lineHeight: '38px',
  padding: '0 8px',
  flex: '1 0',
})

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
