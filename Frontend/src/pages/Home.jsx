import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliveryBoy from '../components/DeliveryBoy'

const Home = () => {

  const {userData} = useSelector(state=> state.user)

  return (
    <div className=''>

      {userData?.user?.role === 'user' && <UserDashboard />}
{userData?.user?.role === 'owner' && <OwnerDashboard />}
{userData?.user?.role === 'deliveryBoy' && <DeliveryBoy />}
    </div>
  )
}

export default Home