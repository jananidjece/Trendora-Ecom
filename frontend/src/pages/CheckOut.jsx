import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createOrder } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";

const CheckOut = ({ setOrder }) => {
  const [billingToggle, setBillingToggle] = useState(true);
  const [shippingToggle, setShippingToggle] = useState(true);
  const [paymentToggle, setPaymentToggle] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zip: ''
  })

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOrder = () => {
    const newOrder = {
      orderItems: cart.products.map(item => ({
        product: item.id,
        name: item.name,
        qty: item.quantity,
        price: item.price,
        image: item.image // Ensure this field exists in cart items
      })),
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.zip,
        country: 'India' // Default or add field
      },
      paymentMethod: paymentMethod,
      itemsPrice: cart.totalPrice, // Simplified
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: cart.totalPrice
    }

    dispatch(createOrder(newOrder))
    dispatch(clearCart())
    setOrder(newOrder)
    navigate('/order-confirmation')
  }


  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <h3 className="text-2xl font-semibold mb-4">CHECKOUT</h3>
      <div className="flex flex-col md:flex-row justify-between md:space-x-10 mt-8 gap-8">
        <div className="md:w-2/3">
          <div className="border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h3 className="text-lg font-bold text-gray-800">
                Billing Information
              </h3>
              {billingToggle ? <FaAngleDown className="text-gray-400" /> : <FaAngleUp className="text-gray-400" />}
            </div>

            <div className={`mt-4 space-y-4 ${billingToggle ? "" : "hidden"}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShippingToggle(!shippingToggle)}
            >
              <h3 className="text-lg font-bold text-gray-800">
                Shipping Information
              </h3>
              {shippingToggle ? <FaAngleDown className="text-gray-400" /> : <FaAngleUp className="text-gray-400" />}
            </div>

            <div className={`mt-4 space-y-4 ${shippingToggle ? "" : "hidden"}`}>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Enter City Name"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Zip Code"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 mb-6 shadow-sm">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h3 className="text-lg font-bold text-gray-800">Payment Method</h3>
              {paymentToggle ? <FaAngleDown className="text-gray-400" /> : <FaAngleUp className="text-gray-400" />}
            </div>

            <div className={`mt-4 space-y-4 ${paymentToggle ? "" : "hidden"}`}>
              <div className="space-y-2">
                <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setPaymentMethod("Cod")}>
                  <input
                    type="radio"
                    className="text-rose-600 focus:ring-rose-500"
                    checked={paymentMethod === "Cod"}
                    onChange={() => setPaymentMethod("Cod")}
                  />
                  <label className="block text-gray-700 ml-3 font-medium cursor-pointer">
                    Cash on Delivery
                  </label>
                </div>

                <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setPaymentMethod("Dc")}>
                  <input
                    type="radio"
                    className="text-rose-600 focus:ring-rose-500"
                    checked={paymentMethod === "Dc"}
                    onChange={() => setPaymentMethod("Dc")}
                  />
                  <label className="block text-gray-700 ml-3 font-medium cursor-pointer">
                    Debit Card
                  </label>
                </div>
              </div>

              {paymentMethod === "Dc" && (
                <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100 shadow-inner">
                  <h3 className="text-md font-bold text-gray-800">
                    Debit Card Details
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Card Holder Name"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-white transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.products.map((product) => (
              <div key={product.id} className="flex justify-between items-center gap-4">
                <div className="flex items-center">
                  <img
                    src={product.Image}
                    alt={product.name}
                    className="w-12 h-12 object-contain rounded bg-gray-50 p-1"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h4>
                    <p className="text-xs text-gray-500">
                      ${product.price} x {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-800 shrink-0">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Price </span>
              <span className="text-xl font-black text-rose-600">
                ${cart.totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-[0.98]"
              onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
