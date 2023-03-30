import styled from '@emotion/styled'
import {useHistory} from 'react-router-dom'
import {formatCurrency} from '../utils/formatCurrency'
import Spinner from '../components/Spinner'
import {useGetProductsQuery} from '../redux/services/products'

export default function ProductsList() {
  const history = useHistory()

  const handleClickTableRow = (id: string): void => {
    history.push(`/products/${id}`)
  }

  const {data, isFetching} = useGetProductsQuery({})

  if (isFetching) {
    return <Spinner />
  }

  if (!data) {
    return null
  }

  return (
    <Wrapper>
      <Header>Products</Header>
      <Table>
        <thead>
          <TableRow>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Company</TableHeaderCell>
            <TableHeaderCell>Suggested Retail Price ($USD)</TableHeaderCell>
            <TableHeaderCell>In Stock?</TableHeaderCell>
          </TableRow>
        </thead>
        <tbody>
          {data.map(product => {
            return (
              <TableRow
                key={product.id}
                onClick={() => handleClickTableRow(product.id)}
              >
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.company}</TableCell>
                <TableCell>{formatCurrency(product.retail)}</TableCell>
                <TableCell>
                  {product.isAvailable ? 'Yes' : 'Sold out!'}
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
      </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  textAlign: 'center',
})

const Header = styled.div({
  marginBottom: 16,
  color: '#090637',
  fontSize: 24,
  fontWeight: 700,
})

const Table = styled.table({
  color: '#090637',
  fontSize: 14,
  fontWeight: 400,
  borderSpacing: 0,
  borderCollapse: 'collapse',
  textAlign: 'left',
})

const TableRow = styled.tr({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(233,233,233,0.9)',
  },
})

const TableHeaderCell = styled.th({
  color: '#969592',
  fontWeight: 400,
  border: '1px solid #dfdfde',
  padding: 8,
})

const TableCell = styled.td({
  border: '1px solid #dfdfde',
  padding: 8,
})
