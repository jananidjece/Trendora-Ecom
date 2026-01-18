import React from 'react'
import { FaHeadset, FaLock, FaMoneyBillWave, FaShippingFast, FaTag } from 'react-icons/fa'

const InfoSection = () => {
    const infoItems = [
        {
            icons:<FaShippingFast className='text-3xl text-red-600'/>,
            title:"Free Shipping",
            description:"Get your orders delivered with no extra cost",
        },
          {
            icons:<FaHeadset className='text-3xl text-red-600'/>,
            title:"Support 24/7",
            description:"We are ready to assist you anytime",
        },
     {
            icons:<FaMoneyBillWave className='text-3xl text-red-600'/>,
            title:"100% Money Back",
            description:"Full refund if you are not satisfied",
        },
          {
            icons:<FaLock className='text-3xl text-red-600'/>,
            title:"Payment secure",
            description:"Your payment information is safe with us",
        },
         {
            icons:<FaTag className='text-3xl text-red-600'/>,
            title:"Discount",
            description:"Enjoy the best prices on our products",
        },

    ]
  return (
    <div className='bg-white pb-8 pt-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {infoItems.map((item, intex)=>(
                <div key={intex} className='flex flex-col items-center text-center p-4 border rounded-lg shadow-md
                 transform transition-transform duration-300 hover:scale-105 cursor-pointer'>

                    {item.icons}
                    <h3 className='mt-4 text-xl font-semibold'>{item.title}</h3>
                    <p className='mt-2 text-gray-600'> {item.description}</p>

                </div>
            
            ))}
            
        </div>
    </div>
  )
}

export default InfoSection