// put CT-only commands here
import './commands'

import {mount} from 'cypress/react18'
import {BrowserRouter, MemoryRouter, Route, Routes} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from '../../src/redux/store'

Cypress.Commands.add('mount', mount)

const storeWrappedMount = (
  WrappedComponent: React.ReactNode,
  customStore = store,
  options = {},
) =>
  cy.mount(
    <Provider store={customStore}>
      <BrowserRouter>{WrappedComponent}</BrowserRouter>
    </Provider>,
    options,
  )
Cypress.Commands.add('storeWrappedMount', storeWrappedMount)

// https://github.com/muratkeremozcan/cypress-react-component-test-examples/blob/24f5d2e597ac9480c3ea5352c8126777dd6c7282/cypress/component/hooks/kyle-wds/react-router-useParams-component-test/react-router-test-useParams.cy.tsx#L18
const routeWrappedMount = (
  WrappedComponent: React.ReactNode,
  route: string,
  path: string,
  customStore = store,
  options = {},
) => {
  window.history.pushState({}, '', route)
  const wrapped = (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route element={WrappedComponent} path={path} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
  return cy.mount(wrapped, options)
}
Cypress.Commands.add('routeWrappedMount', routeWrappedMount)
