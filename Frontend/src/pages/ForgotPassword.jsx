import React from 'react'
import { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate} from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSendOtp = async () => {
        setLoading(true)
        try{
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`,
                {email},
                {withCredentials: true}
            )
            console.log(result)
            setError("")
            setStep(2)
            setLoading(false)
            
        }catch(err){
            setError(err?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        setLoading(true)
        try{
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,
                {email, otp},
                {withCredentials: true}
            )
            console.log(result)
            setError("")
            setStep(3)
            setLoading(false)
        }catch(err){
            setError(err?.response?.data?.message)
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        setLoading(true)
        if(newPassword != confirmPassword){
            return null
        }
        if(newPassword.length < 6){
            setError('Password must be longer than 6 characters');
      return;
        }

        try{
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`,
                {email, newPassword},
                {withCredentials: true}
            )
            console.log(result)
            setStep(1)
            setError("")
            setLoading(false)
            navigate('/signin')
        }catch(err){
            setError(err?.response?.data?.message)
            setLoading(false)
        }
    }

  return (

    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>

        <div className='bg-white rounded-xl shadow-lg  w-full max-w-md p-8 '>
            <div className='flex items-center gap-4 mb-4'>
                <IoIosArrowRoundBack size={30} className='text-[#ff4d2d]' 
                onClick={()=>navigate('/signin')}/>

                <h1 className='text-[#ff4d2d] text-2xl font-bold text-center'>Forgot Password</h1>
            </div>
            {step == 1
            &&
            <div>
                
                <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
      
      <input type="email" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}
      className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none "
       />
    </div>
    <button onClick={handleSendOtp}
       className=" cursor-pointer w-full font-semibold py-2 rounded-lg transition duration-200 
  bg-[#ff4d2d] hover:bg-[#e64323] text-white">
        {loading ? <ClipLoader size={20} color='white' /> : "Send OTP"}</button>
    </div>}

        {step == 2
            &&
            <div>
                <div className="mb-4">
      <label htmlFor="otp" className="block text-gray-700 font-medium mb-1">OTP</label>
      
      <input type="number" placeholder="enter otp" value={otp} onChange={(e)=>setOtp(e.target.value)}
      className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none "
       />
    </div>
    <button onClick={handleVerifyOtp}
       className=" cursor-pointer w-full font-semibold py-2 rounded-lg transition duration-200 
  bg-[#ff4d2d] hover:bg-[#e64323] text-white">
        {loading ? <ClipLoader size={20} color='white' /> : "Verify"}</button>

    </div>}

    {step == 3
            &&
            <div>
                <div className="mb-4">
                {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">New Password</label>
      
      <input type="text" placeholder="enter new password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}
      className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none "
       />
    </div>

    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
      
      <input type="text" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
      className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none "
       />
    </div>

    
    <button onClick={handleResetPassword}
       className=" cursor-pointer w-full font-semibold py-2 rounded-lg transition duration-200 mb-4
  bg-[#ff4d2d] hover:bg-[#e64323] text-white">
        {loading ? <ClipLoader size={20} color='white'/> : "Reset Password"}</button>

        
    </div>}
    {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg mt-4">
            {error}
          </div>
        )}
        </div>
    </div>
  )
}

export default ForgotPassword