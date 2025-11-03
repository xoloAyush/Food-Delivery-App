import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import useGetCurrentUser from './hooks/getCurrentUser'
import useGetCity from './hooks/useGetCity'

export const serverUrl = "http://localhost:3000"

const App = () => {
  useGetCity()
  const { loading } = useGetCurrentUser()
  const { userData } = useSelector(state => state.user)

  // ⛔ Important: don’t render routes until loading is false
  if (loading) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to='/' />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to='/' />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to='/' />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to='/signin' />} />
    </Routes>
  )
}

export default App
