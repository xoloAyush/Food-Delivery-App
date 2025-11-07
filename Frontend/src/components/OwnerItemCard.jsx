import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const OwnerItemCard = ({data}) => {

    const navigate = useNavigate()
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ffd2d] w-full max-w-2xl">
  <div className="w-36 h-full flex-shrink-0 bg-gray-50">
    <img src={data.image} alt="" className="w-full h-full object-cover" />
  </div>
  <div className="flex flex-col justify-between p-3 flex-1">
    <div className="flex flex-col">
      <h2 className="text-base font-semibold text-[#e32200]">{data.name}</h2>
      <p><span className="font-medium text-gray-70">Category:</span> {data.category}</p>
      <p><span className="font-medium text-gray-70">Food Type:</span> {data.foodType}</p>
    </div>
    <div className="flex items-center justify-between">
      <div className='text-[#ff4d2d] font-bold'>{data.price}</div>
      <div className="flex space-x-2 items-center ">
        {/* Assuming FaPen and FaTrashAlt are icons */}
        <span className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff2600]'
        
        onClick={()=>navigate(`/edit-item/${data._id}`)}>
        <FaPen size={16}/></span> 

        <span className='p-2 rounded-full hover:bg-[#000000]/10 text-[#000000]'><FaTrashAlt size={16}/></span>
      </div>
    </div>
  </div>
</div>
  )
}

export default OwnerItemCard