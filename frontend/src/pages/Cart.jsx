import React, { act, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import emptycart from '../assets/images/emptycart-cart.png'
import { FaTrashAlt } from 'react-icons/fa'
import Modal from '../components/Modal'
import { decreaceQuantity, increaceQuantity, removeFromCart } from '../redux/cartSlice'
import { useNavigate } from 'react-router-dom'



const Cart = () => {

const cart = useSelector(state => state.cart);  
const [address, setAddress] = useState('123 Default St, Default City, DC');
const [isModelOpen, setIsModelOpen] = useState(false);
const dispatch = useDispatch()
const navigate = useNavigate()
// console.log(cart)

  return (
    <div>
    <div className='container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24' >
{cart.products?.length > 0 ?(
  <div>
  <h3 className='text-2xl font-semibold mb-4'>SHOPPING CART</h3>
      <div className='flex flex-col md:flex-row justify-between md:space-x-10 mt-8'>
        <div className='md:w-2/3' >
          <div className='flex justify-between border-b items-center mb-4 text-xs font-bold pb-2'>
            <p className="flex-1">PRODUCT</p>
            <div className='hidden md:flex space-x-12'>
              <p>PRICE</p>
              <p>QUANTITY</p>
              <p>SUBTOTAL</p>
              <p>REMOVE</p>
            </div>
          </div>
          <div className="space-y-4">
            {cart.products.map((product)=> (
              <div 
              key={product.id}
              className='flex flex-col sm:flex-row items-center justify-between p-3 border-b gap-4'>
                <div className='flex items-center space-x-4 w-full sm:w-auto'> 
                  <img 
                  src={product?.Image} 
                  alt={product.name} 
                  className='w-20 h-20 object-contain rounded'/>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                    <p className="sm:hidden text-gray-500">${product.price}</p>
                  </div>
                </div>

                <div className='flex items-center justify-between w-full sm:w-auto sm:space-x-8 md:space-x-10 lg:space-x-12'>
                  <div className="hidden sm:block">
                    <p>${product.price}</p>
                  </div>
                  
                  <div className='flex items-center border rounded'>
                    <button 
                    className='text-xl font-bold px-2 py-0.5 border-r hover:bg-gray-100'
                    onClick={()=> dispatch(decreaceQuantity(product.id))}>
                      -
                    </button>  
                    <p className='text-lg px-3'>{product.quantity}</p>
                    <button 
                    className='text-xl font-bold px-2 py-0.5 border-l hover:bg-gray-100'
                    onClick={()=> dispatch(increaceQuantity(product.id))}>
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <p className="font-semibold">${(product.quantity * product.price).toFixed(2)}</p>
                    <button 
                    className='text-red-500 hover:text-red-700 p-2'
                    onClick={()=> dispatch(removeFromCart(product.id))}>
                      <FaTrashAlt/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='md:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-8 md:mt-0 h-fit'>
          <h3 className='text-sm font-bold mb-5 tracking-wider uppercase text-gray-500'>CART TOTAL</h3>
          <div className='flex justify-between mb-5 border-b pb-4'>
            <span className='text-sm text-gray-600'>TOTAL ITEMS:</span>
            <span className="font-semibold">{cart.totalQuantity}</span>
          </div>

          <div className='mb-6 border-b pb-6'>
            <p className="text-sm text-gray-600 mb-2">Shipping:</p>
            <div className='ml-2 space-y-2'>
              <p className='text-xs'>Shipping to: <span className='font-bold'>{address}</span></p>
              <button 
              className='text-blue-500 hover:text-blue-600 text-xs font-medium'
              onClick={()=>{setIsModelOpen(true)}}>
                Change Address
              </button>
            </div>
          </div>
          
          <div className='flex justify-between mb-6'>
            <span className="text-lg font-bold">Total Price</span>
            <span className="text-lg font-bold text-rose-600">${cart.totalPrice.toFixed(2)}</span>
          </div>
          
          <button
          className='w-full bg-rose-600 text-white py-3 rounded-lg font-bold hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200'
          onClick={()=> navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>

     <Modal
    isModelOpen= {isModelOpen} setIsModelOpen= {setIsModelOpen}>
    <h3 className="text-lg font-semibold mb-3">Change Shipping Address</h3>
     <input
          type="text"
          placeholder="Enter new address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
         <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsModelOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsModelOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Address
          </button>
        </div>
    </Modal>
  </div>
): (<div className='flex flex-col items-center justify-center text-center mb-8'>

  <img src={emptycart} alt="" className='h-96'/>

  {/* <div className='relative bottom-30 left-10 '>
  <p className='text-red-500 mt-7 font-semibold '>Your cart is empty</p>
  </div> */}
</div> 
)}  
  </div>
  </div>
  )
}

export default Cart