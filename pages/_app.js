import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import Router from 'next/router'

import { initializeStore } from '../src/store'

class WrappedApp extends App {
  static async getInitialProps(appContext) {
    const mobxStore = initializeStore()
    appContext.ctx.mobxStore = mobxStore

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore,
    }
  }

  constructor(props) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider store={this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default WrappedApp
