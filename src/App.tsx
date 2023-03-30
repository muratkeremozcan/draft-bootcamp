import {Fragment} from 'react'
import Login from './pages/Login'
import ProductDetails from './pages/ProductDetails'
import ProductsList from './pages/ProductsList'
import NotFound from './pages/NotFound'
import {Global, css} from '@emotion/react'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

export default function App() {
  return (
    <Fragment>
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
      <Router>
        <Switch>
          <Route path="/products/:id">
            <ProductDetails />
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}
