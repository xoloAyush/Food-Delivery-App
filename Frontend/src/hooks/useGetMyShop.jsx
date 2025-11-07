// useGetCurrentUser.js
import { useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'

function useGetMyShop() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/get-my`, {
          withCredentials: true,
        })
        // dispatch(setUserData(result.data))
        dispatch(setMyShopData(result.data))
      } catch (err) {
        console.log('Not logged in:', err.response?.data || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchShop()
  }, [dispatch])

  return { loading }
}

export default useGetMyShop
