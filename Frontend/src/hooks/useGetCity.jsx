// useGetCity.jsx
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setCity } from '../redux/userSlice'

function useGetCity() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const apiKey = import.meta.env.VITE_GEOAPIKEY   // ✅ Correct for Vite

  useEffect(() => {
    if (!apiKey) {
      console.error("GeoAPI key missing in environment variables")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          )
          dispatch(setCity(result.data.results[0].city))
        } catch (error) {
          console.error("Error fetching city:", error)
        }
      },
      (error) => {
        console.error("Geolocation error:", error)
      }
    )
  }, [userData])
}

export default useGetCity
