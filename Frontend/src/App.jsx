import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import useGetCurrentUser from './hooks/getCurrentUser'
import useGetCity from './hooks/useGetCity'
import useGetMyShop from './hooks/useGetMyShop' // ✅ new hook
import CreateEditShop from './pages/CreateEditShop'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'

export const serverUrl = "http://localhost:3000"

const App = () => {
  useGetCity()
  const { loading: userLoading } = useGetCurrentUser()
  const { loading: shopLoading } = useGetMyShop() // ✅ call the hook here

  const { userData } = useSelector(state => state.user)

  // ⛔ Don’t render routes until both data fetches are done
  if (userLoading || shopLoading) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to='/' />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to='/' />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to='/' />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to='/signin' />} />
    

    <Route path='/create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to='/signin' />} />

    <Route path='/add-item' element={userData ? <AddItem /> : <Navigate to='/signin' />} />

    <Route path='/edit-item/:itemId' element={userData ? <EditItem /> : <Navigate to='/signin' />} />
    </Routes>
  )
}

export default App
