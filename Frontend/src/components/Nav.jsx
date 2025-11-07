import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from 'react-icons/io'
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { setCurrentCity, setUserData } from '../redux/userSlice';
import axios from 'axios';
import { serverUrl } from '../App';

import { FaPlus } from "react-icons/fa";
import { TbReceipt } from "react-icons/tb";
import {setMyShopData} from '../redux/ownerSlice'

function Nav() {

  const { userData, currentCity } = useSelector(state => state.user)
  const { myShopData } = useSelector(state => state.owner)


  const [showInfo, setShowInfo] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const dispatch = useDispatch()

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })

      dispatch(setUserData(null))
      dispatch(setCurrentCity(null))
      setShowInfo(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-[80px] flex items-center justify-between
      md:justify-center md:gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6]
      overflow-visible '>
  
      {/* Logo */}
      <h1 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>CraveMeal</h1>

      {/* Mobile Search */}
      {showSearch  && (
        <div className='w-[90%] h-[70px] bg-white shadow-xl rounded-lg
          items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden'>

          <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className='w-[80%] truncate text-gray-600'>{currentCity || "Select City"}</div>
          </div>

          <div className='w-[80%] flex items-center gap-[10px] px-3'>
            <IoIosSearch size={25} className='text-[#ff4d2d]' />
            <input
              type="text"
              placeholder='search delicious food...'
              className='outline-0 p-2 w-full px-[10px]'
            />
          </div>
        </div>
      )}

    { userData.user.role == "user" && 
      
      <div className='md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg
        items-center gap-[20px] md:flex hidden'>
        <div className='flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400'>
          <FaLocationDot size={25} className="text-[#ff4d2d]" />
          <div className='w-[80%] truncate text-gray-600'>{currentCity || "Select City"}</div>
        </div>

        <div className='w-[80%] flex items-center gap-[10px] px-3'>
          <IoIosSearch size={25} className='text-[#ff4d2d]' />
          <input
            type="text"
            placeholder='search delicious food...'
            className='outline-0 p-2 w-full px-[10px]'
          />
        </div>
      </div>
    }
      
    {userData.user.role === "owner" ? (
  <>
    {myShopData && (
      <>
        <button className='hidden md:flex items-center gap-3 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
          <FaPlus size={20} />
          <span>Add food items</span>
        </button>

        <button className='md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
          <FaPlus size={20} />
        </button>
      </>
    )}

    <div className='flex gap-6'>
      <div className='relative md:flex hidden items-center gap-2 p-1 px-3 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
        <TbReceipt size={20} />
        <span>My Orders</span>
        <span className='absolute right -top-2 -right-0.5 bg-[#fe1b1b] rounded-full text-amber-50 font-semibold text-xs px-[6px] py-[1px]'>
          0
        </span>
      </div>

      <div className='relative md:hidden flex items-center gap-2 p-1 px-3 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
        <TbReceipt size={20} />
        <span className='absolute right -top-2 -right-0.5 bg-[#fe1b1b] rounded-full text-amber-50 font-semibold text-xs px-[6px] py-[1px]'>
          0
        </span>
      </div>
    </div>
  </>
) : (
  <>
    {showSearch ? (
      <RxCross2
        size={25}
        className='text-[#ff4d2d] md:hidden cursor-pointer'
        onClick={() => setShowSearch(false)}
      />
    ) : (
      <IoIosSearch
        size={25}
        className='text-[#ff4d2d] md:hidden cursor-pointer'
        onClick={() => setShowSearch(true)}
      />
    )}

    <div className='relative cursor-pointer'>
      <RiShoppingCartLine size={25} className='text-[#ff4d2d]' />
      <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d] text-sm font-semibold'>0</span>
    </div>

    <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-sm font-medium text-[#ff4d2d]'>
      My Orders
    </button>
  </>
)}


      {/* Desktop Search */}
      

      {/* Right section */}
      <div className='flex gap-3 items-center'>
        

        {/* Profile Circle */}
        <div
          className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer'
          onClick={() => setShowInfo(prev => !prev)}
        >
          {userData?.user?.fullName?.slice(0, 1) || "U"}
        </div>

        {/* Info Popup */}
        {showInfo && (
          <div className='fixed md:top-[100px] top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white
            shadow-2xl rounded-xl p-[20px] flex flex-col gap-[20px] z-[9999]'>
            <div className='text-[17px] font-medium'>
              {userData?.user?.fullName || "Guest User"}
            </div>

            <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>
              My Orders
            </div>

            <div
              className='text-[#ff4d2d] font-semibold cursor-pointer'
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Nav
