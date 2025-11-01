import React, {useEffect} from 'react'
import axios from 'axios'
import { serverUrl } from '../App'

function useGetCurrentUser() {
    useEffect(()=>{
        const fetchUser = async () => {
            try{
                const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})

                console.log(result)
                // console.log("Fetching current user...");
            }
            catch(err){
                console.log(err)
            }
        }
        fetchUser()
    }, [])
}

export default useGetCurrentUser 