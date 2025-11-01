import React, { useState } from 'react'
import {colors} from '../theme'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {auth} from '../firebase'
import { ClipLoader } from "react-spinners";
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const primaryColor = "#ff4d2d"
  const hoverColor = "#e64323"
  const bgColor = "#fff9f4"
  const borderColor = "#ddd"

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSignIn = async () => {
    setError('');
    setLoading(true)
    
    // Validate inputs
    if ( !email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length <= 6) {
      setError('Password must be longer than 6 characters');
      return;
    }


    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      console.log("Sending signup request with:", {  
        email, 
        passwordLength: password.length 
      });
      
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email, password
      }, { withCredentials: true });
      setLoading(false)

      // console.log("Signup successful:", result);

      dispatch(setUserData(result.data))

      navigate('/signup'); // Redirect to sign in page after successful signup
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong during signup';
      console.log("Detailed error:", {
        message: errorMessage,
        status: err.response?.status,
        data: err.response?.data
      });
      setError(errorMessage);
      setLoading(false)
    }
  };

  const handleGoogleAuth= async()=>{
      
      const provider = new GoogleAuthProvider();
  
      const result = await signInWithPopup(auth, provider)
      // console.log(result)
  
      try{
        const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
          
          email: result.user.email,
          
        }, {withCredentials: true})
  
        console.log(data)

        dispatch(setUserData(data))
        
      }catch(err){
        console.log(err)
      }
  
    }

  return (
    <div 
      className='min-h-screen w-full flex items-center justify-center p-4' 
      style={{ backgroundColor: bgColor }}
    >
      <div 
        className='bg-white rounded-xl shadow-lg w-full max-w-md p-8' 
        style={{
          border: `1px solid ${borderColor}`
        }}
      >
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>PetPooja</h1>
    <p className="text-gray-600 mb-8">Create your account to get started with delicious food deliveries</p>
    
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
      
      <input type="email" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}
      className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none "
       />
    </div>


    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>

      <div className="relative">
      <input type={`${showPassword ? "text" : "password"}`} placeholder="enter your password" value={password}
        onChange={(e) => setPassword(e.target.value)}

      className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none "
       />
       
       <button className='absolute cursor-pointer right-3 top-3 text-gray-500' onClick={()=>{setShowPassword(pre=>!pre)}}>

        {!showPassword ? <FaEye /> : <FaEyeSlash/>} </button>

       </div>
    </div>
    <div className='mb-4 text-[#ff4d2d] text-right font-medium cursor-pointer ' onClick={()=>navigate("/forgot-password")}>
      Forgot Password
    </div>
  
       <button  onClick={handleSignIn}
       className=" cursor-pointer w-full font-semibold py-2 rounded-lg transition duration-200 
  bg-[#ff4d2d] hover:bg-[#e64323] text-white">

        {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
        </button>

        <button className='w-full mt-4 flex items-center justify-center rounded-lg px-4 py-2 transition duration-200 gap-2 border-2 border-gray-300 hover:bg-gray-200 cursor-pointer' onClick={handleGoogleAuth}>
          <FcGoogle size={20} />
        <span>Sign in with Google</span></button>

        <p className='text-center mt-4'>Want to create account? <span className="cursor-pointer text-[#ff4d2d]" onClick={()=>navigate('/signup')}>SignUp</span></p>
    </div>


    </div>
    
  )
}

export default SignIn
