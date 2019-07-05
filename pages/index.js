import { parseCookies } from 'nookies'
import Router from 'next/router'

import Settings from '../src/components/Settings'

import '../src/styles/base.styl'

const Index = ({ username }) => <Settings username={username} />

Index.getInitialProps = ctx => {
  const { username } = parseCookies(ctx)

  return { username }
}

export default Index
