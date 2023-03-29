import styled from '@emotion/styled'
import {Formik, Field} from 'formik'

export interface Props {
  label: string
  id?: string

  name?: string
  type?: string
}

export default function Input({label, id, ...restProps}: Props) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Formik initialValues={{id: ''}} onSubmit={() => {}}>
      <FormGroup data-cy="Input">
        <Label htmlFor={id}>{label}</Label>
        <FormInput name="id" id={id} data-cy="form-input" {...restProps} />
      </FormGroup>
    </Formik>
  )
}

const FormInput = styled(Field)({
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
