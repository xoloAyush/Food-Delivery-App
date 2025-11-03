// useGetCurrentUser.js
import { useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        })
        // dispatch(setUserData(result.data))
        dispatch(setUserData(result.data))
      } catch (err) {
        console.log('Not logged in:', err.response?.data || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [dispatch])

  return { loading }
}

export default useGetCurrentUser
