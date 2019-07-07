import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Settings from '../src/components/Settings'

import '../src/styles/base.styl'

/**
 * Props username and avatar comes from the method getInitialProps below
 */
const Index = ({ username, avatar }) => <Settings username={username} avatar={avatar} />

/**
 * This method is called both on server-side and client-side by Next. It allow
 * us to fetch data before and put it in our component as props.
 */
Index.getInitialProps = async ctx => {
  const options = {
    method: 'GET',
    credentials: 'include',
  }

  // If server-side
  if (ctx && ctx.req) {
    options.headers = { cookie: ctx.req.headers.cookie }
  }

  // Fetch the profile if there is one
  const res = await fetch('http://localhost:3000/profile', options)
  const {
    data: { username, avatar },
  } = await res.json()
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
