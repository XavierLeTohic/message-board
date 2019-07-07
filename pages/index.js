import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Settings from '../src/components/Settings'

import '../src/styles/base.styl'

const Index = ({ username, avatar }) => <Settings username={username} avatar={avatar} />

Index.getInitialProps = async ctx => {
  const options = {
    method: 'GET',
    credentials: 'include',
  }

  if (ctx && ctx.req) {
    options.headers = { cookie: ctx.req.headers.cookie }
  }

  const profileRes = await fetch('http://localhost:3000/profile', options)
  const {
    data: { username, avatar },
  } = await profileRes.json()
  let avatarUrl = avatar

  if (!avatarUrl) {
    // Get a random avatar url
    const avatarRes = await fetch('http://localhost:3000/avatar', options)
    const { url } = await avatarRes.json()
    avatarUrl = url
  }

  return { username, avatar: avatarUrl }
}

export default Index
