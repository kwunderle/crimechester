import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <section>
        <h1>Not Logged In</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign Up</Link>
    </section>
  )
}

export default Welcome