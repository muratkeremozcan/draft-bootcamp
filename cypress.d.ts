/* eslint-disable @typescript-eslint/no-explicit-any */
import {MountOptions, MountReturn} from 'cypress/react'

export {}
declare global {
  namespace Cypress {
    interface Chainable {
      /** Yields elements with a data-cy attribute that matches a specified selector.
       * ```
       * cy.getByCy('search-toggle') // where the selector is [data-cy="search-toggle"]
       * ```
       */
      getByCy(qaSelector: string, args?: any): Chainable<JQuery<HTMLElement>>

      /** Yields elements with data-cy attribute that partially matches a specified selector.
       * ```
       * cy.getByCyLike('chat-button') // where the selector is [data-cy="chat-button-start-a-new-claim"]
       * ```
       */
      getByCyLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Yields the element that partially matches the css class
       * ```
       * cy.getByClassLike('StyledIconBase') // where the class is class="StyledIconBase-ea9ulj-0 lbJwfL"
       * ```
       */
      getByClassLike(
        qaSelector: string,
        args?: any,
      ): Chainable<JQuery<HTMLElement>>

      /** Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts a React node wrapped with a store
       * @param component React Node to mount
       * @param customStore Custom store to pass into mount
       * @param options Additional options to pass into mount
       */
      storeWrappedMount(
        component: React.ReactNode,
        customStore?: any,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>

      /** Mounts a React node wrapped with a store and Routes, for cases with react-router hooks such as `useParams`
       * @param component React Node to mount
       * @param customStore Custom store to pass into mount
       * @param options Additional options to pass into mount
       */
      routeWrappedMount(
        component: React.ReactNode,
        route: string,
        path: string,
        customStore?: any,
        options?: MountOptions,
      ): Cypress.Chainable<MountReturn>
    }
  }
}
