import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import {Global, css} from '@emotion/react'

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
      <LoginForm />
      <Footer />
    </>
  )
}
