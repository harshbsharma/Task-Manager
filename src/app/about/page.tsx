'use client'
import useAuthMiddleware from '@/middlewares/auth'
import React from 'react'

const Home = () => {
  useAuthMiddleware();
  return (
    <div>Home</div>
  )
}

export default Home