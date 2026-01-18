import React from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ order }) => {
  const navigate = useNavigate()
  return (
    <div className='container mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Thank you for your Order !</h2>
      <p className='text-lg text-center text-green-400 hover:text-green-800'>Your Order has been confirmed &#128077;</p>
      <div className='mt-6 p-4 border rounded-lg bg-gray-100'>
        <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
        <p>Order Number: {order?._id}</p>
        <div className='mt-4'>
          <h4 className='text-md font-semibold mb-2'>Shipping Information</h4>
          <p>{order?.shippingAddress?.address}</p>
          <p>{order?.shippingAddress?.city}</p>
          <p>{order?.shippingAddress?.postalCode}</p>
        </div>
        <div className='mt-4'>
          <h3 className='text-md font-semibold mb-2'>Items Ordered</h3>
          {order?.orderItems?.map(product => (
            <div key={product._id} className='flex justify-between mt-2'>
              <p>{product.name} x {product.qty}</p>
              <p>${product.price * product.qty}</p>
            </div>
          ))}
        </div>
        <div className='mt-4 flex justify-between'>
          <span>Total Price</span>
          <span className='font-semibold'>${order?.totalPrice}</span>
        </div>
        <div className='mt-6'>
          <button
            className='ml-4 bg-green-600 text-white py-2 px-4 hover:bg-green-800'>
            Order tracking
          </button>
          <button
            className='ml-4 bg-red-600 text-white py-2 px-4 hover:bg-red-800'
            onClick={() => navigate('/')}>
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
