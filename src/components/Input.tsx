import styled from '@emotion/styled'
import {useFormik, FormikHandlers} from 'formik'

export type Props = {
  label: string
  id: string
  value?: string
  name?: 'email' | 'password'
  type?: 'text' | 'password'
  onChange?: FormikHandlers['handleChange']
  onBlur?: FormikHandlers['handleBlur']
}

export default function Input({label, id, ...restProps}: Props) {
  const formik = useFormik({
    initialValues: {[id || '']: ''},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit: () => {},
  })

  const handleChange: FormikHandlers['handleChange'] = (e: {
    target: {value: string}
  }) => {
    const {value} = e.target
    formik.setFieldValue(id, value)
  }

  const handleBlur: FormikHandlers['handleBlur'] = (e: {
    target: {value: string}
  }) => {
    const {value} = e.target
    formik.setFieldTouched(id, true)
    formik.setFieldValue(id, value)
  }

  return (
    <FormGroup data-cy="Input">
      <Label htmlFor={id}>{label}</Label>
      <FormInput
        name={id}
        id={id}
        data-cy="form-input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values[id || '']}
        {...restProps}
      />
    </FormGroup>
  )
}

const FormInput = styled.input({
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
