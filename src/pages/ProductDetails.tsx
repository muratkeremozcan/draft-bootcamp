import styled from '@emotion/styled'
import {useParams, Link, Redirect} from 'react-router-dom'
import {formatCurrency} from '../utils/formatCurrency'
import {Product} from '../types'
import Spinner from '../components/Spinner'
import {useGetProductByIdQuery} from '../redux/services/products'

export default function ProductDetails() {
  const {id} = useParams<{id: string}>()

  const {data, isFetching} = useGetProductByIdQuery(id)

  if (isFetching) {
    return <Spinner />
  }

  if (!data) return <Redirect to="/not-found" />

  const product = data as Product

  return (
    <Wrapper>
      <Header>{product.name}</Header>
      <Description>
        <p>
          <strong>ID</strong>: {product.id}
        </p>
        <p>
          <strong>MSRP (USD)</strong>: {formatCurrency(product.retail)}
        </p>
        <p>
          <strong>In Stock?</strong>: {product.isAvailable ? 'Yes' : 'No'}
        </p>
      </Description>
      <GoBack to="/products">Back to list</GoBack>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'left',
})

const Header = styled.div({
  margin: '16px 0',
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const GoBack = styled(Link)({
  textDecoration: 'inherit',
  color: '#03c',
})

const Description = styled.div({})
