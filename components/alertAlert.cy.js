import React from 'react'
import Alert from './alert'

describe('<Alert />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Alert type="success" theme="light">hello world</Alert>)
  })
})