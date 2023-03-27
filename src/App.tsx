import {Global, css} from '@emotion/react'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetail'
import ProductsList from './pages/ProductList'
import NotFound from './pages/NotFound'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

export default function App() {
  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }

          body {
            background-color: #f3f6f9;
            font-family: 'Nunito Sans', sans-serif;
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
