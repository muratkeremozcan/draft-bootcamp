// put CT-only commands here
import './commands'
import '../../src/styles.css'

import {mount} from 'cypress/react18'

Cypress.Commands.add('mount', mount)
