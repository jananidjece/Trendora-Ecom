import React, { useState } from "react";
import { FaStar, FaPlus, FaCheck } from "react-icons/fa";
import { addTocart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFullURL } from "../axiosInstance";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddtoCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addTocart(product));

    // Trigger the animation state
    setIsAdded(true);
    toast.success("Product Added Successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    // Reset state after a delay (optional, or keep it green)
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white p-5 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-300 relative group overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative mb-4 flex justify-center items-center h-48 bg-gray-50 rounded-2xl overflow-hidden group-hover:bg-white transition-colors">
          <img
            src={getFullURL(product.image)}
            alt={product.name}
            className="w-full h-full object-contain p-2 mix-blend-multiply"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < product.rating ? "" : "text-gray-300"} />
              ))}
            </div>
            {/* <span className="text-xs text-gray-400 font-medium">1.5k Reviews</span> */}
          </div>

          {/* Price and Action Row */}
          <div className="mt-auto flex items-center justify-between">
            <div className="px-4 py-1.5 rounded-full bg-red-50 text-red-500 font-bold text-lg">
              ${product.price}
            </div>

            <div
              onClick={(e) => handleAddtoCart(e, product)}
              className={`
                        w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md
                        ${isAdded
                  ? "bg-green-500 text-white rotate-0"
                  : "bg-black text-white hover:bg-red-600 rotate-90 hover:rotate-0"
                }
                    `}
            >
              {isAdded ? (
                <FaCheck size={18} className="transition-transform duration-300 scale-100" />
              ) : (
                <FaPlus size={18} className="transition-transform duration-300" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
