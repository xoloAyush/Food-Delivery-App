import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { FaUtensils } from "react-icons/fa6";
import axios from 'axios';
import { setMyShopData } from '../redux/ownerSlice';
import { serverUrl } from '../App';
import { useEffect } from 'react';

function EditItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { myShopData } = useSelector(state => state.owner);
 
  const {itemId} = useParams()
  const [currentItem, setCurrentItem] = useState(null)
  // ✅ Initialize states
  const [name, setName] = useState(myShopData?.name || "");

  const [price, setPrice] = useState(0)

  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)

  const categories = ["Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others"]

    const [category, setCategory] = useState("")
    const [foodType, setFoodType] = useState("")

  const handleImage = (e) =>{
    const file = e.target.files[0];
  if (!file) return; // Safety check

    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))

  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try{
      const formData = new FormData()
      formData.append("name", name)
      formData.append("category", category)
      formData.append("price", price)
      formData.append("foodType", foodType)

       if (backendImage) {
      formData.append("image", backendImage);
    } 
    // else if (frontendImage) {
    //   formData.append("image", frontendImage);
    // }

      const result = await axios.put(
  `${serverUrl}/api/item/edit-item/${itemId}`,
  formData, 
  { withCredentials: true }
);

dispatch(setMyShopData(result.data)); // ✅ now defined
console.log(result.data);


    }catch(err){
      console.log("error", err)
    }
  }

  useEffect(()=>{
    const handleGetItemById=async()=>{
        try{
            const result = await axios.get(`${serverUrl}/api/item/get-by-id/${itemId}`, 
                {withCredentials: true}
            )
            
            setCurrentItem(result.data)

        }catch(err){
            console.log(err)
        }
    }
    handleGetItemById()
  },[])

  useEffect(()=>{
    setName(currentItem?.name || "")
    setPrice(currentItem?.price || 0)
    setCategory(currentItem?.category || "")
    setFoodType(currentItem?.foodType || "")
    setFrontendImage(currentItem?.image || "")
  },[currentItem])
  
  return (
    <div className='flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white relative min-h-screen'>
      <div className='absolute top-[20px] left-[20px] z-[10] mb-[10px]' onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
      </div>

      <div className='max-w-lg w-[450px] bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
        <div className='flex flex-col items-center mb-6'>
          <div className='bg-orange-100 p-4 rounded-full mb-4'>
            <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
          </div>

          <div className='text-3xl font-extrabold text-gray-900'>
            Edit Food
          </div>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input
              type='text'
              placeholder='Enter Shop Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
            <input
              type='number'
              placeholder='Enter Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>

          {/* Shop Image */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Shop Image</label>
            <input
              type='file'
              accept='image/*'
              className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
              onChange={handleImage}
            />
          </div>

           <input
    type='text'
    placeholder='Or paste image URL'
    value={frontendImage?.startsWith('blob:') ? '' : frontendImage || ''}
    onChange={(e) => {
      const url = e.target.value;
      setFrontendImage(url);
      setBackendImage(null); // clear backend file if using URL
    }}
    className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
  />

          {frontendImage && <div className='mt-4'>
            <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border'/>
          </div>}
          

          {/* City + State */}
          {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
              <input
                type='text'
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
              <input
                type='text'
                placeholder='State'
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
            </div>
          </div>

          {/* Address */}
          {/* <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
            <input
              type='text'
              placeholder='Enter Shop Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
          </div>  */}

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
            <select
              type='number'
              placeholder='Enter Price'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
            >
                <option value="">Select Category</option>

                {categories.map((cate, index)=>(
                    <option value={cate} key={index}>{cate}</option>
                ))}
            </select>
          </div>

          <div>
  <label className='block text-sm font-medium text-gray-700 mb-1'>
    Select Food Type
  </label>
  <select
    value={foodType}
    onChange={(e) => setFoodType(e.target.value)}
    className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
    required
  >
    <option value="">Select Food Type</option> {/* <-- Add a default placeholder */}
    <option value="veg">Veg</option>
    <option value="non veg">Non Veg</option>
  </select>
</div>


          <button
            type='submit'
            className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-xl transition-all cursor-pointer'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
