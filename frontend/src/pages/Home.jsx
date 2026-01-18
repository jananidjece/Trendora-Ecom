import React from 'react';
import axios from 'axios';
import { Categories, mockData } from '../assets/mockData';
import HeroImage from "../assets/images/hero-img1.png";
import InfoSection from '../components/InfoSection';
import CategorySection from '../components/CategorySection';
import ImageHero from "../assets/images/image-hero.jpg";
import { setProducts } from '../redux/productSlice';
import { useSelector } from 'react-redux';

import ProductCard from '../components/ProductCard';
import Shop from './Shop';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const products = useSelector(state => state.product)

  const navigate = useNavigate()
  return (
    <div >
      {/* <div className='bg-white mt-2 px-4'> */}
      <div className='bg-white mt-2 px-4 md:px-16 lg:px-24'>
        <div className='container mx-auto py-4 flex flex-col md:flex-row space-x-2'>
          {/* <div className='w-full md:w-3/12'>
<div className='bg-red-600 text-white text-xs font-bold px-2 py-2.5'>SHOP BY CATEGORIES</div>

             <ul className='space-y-4 bg-gray-100 p-3 border-white shadow-md'>
              {Categories.map((category, index)=>(
                <li key={index} className='flex items-center text-sm font-medium'>
                  <div className='w-2 h-2 border border-red-500 rounded-full mr-2'></div>
                  {category}
                </li>
              ))}
            </ul>

            </div> */}

          {/* <div className="relative w-full h-screen overflow-hidden">        */}
          <div className='w-full h-[380px] md:h-[500px] relative rounded-3xl overflow-hidden shadow-2xl'>
            <img
              src={ImageHero}
              alt="Hero"
              className='w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-1000'
            />

            {/* Overlay Elements - Magazine Style */}
            <div className='absolute inset-0'>

              {/* 1. Badge - Top Left */}
              <div className='absolute top-6 left-4 md:top-10 md:left-12 transform -rotate-2 z-10'>
                <div className='bg-black text-white text-sm md:text-xl font-bold px-3 py-1 md:px-6 md:py-2 skew-x-[-12deg] shadow-lg'>
                  1M+ Products<span className='text-rose-500'>*</span>
                </div>
              </div>

              {/* 2. Main Title - Belly Center (Mobile) / Left Side Below Badge (Desktop) */}
              <div className='absolute top-[75%] left-8 right-0 transform -translate-y-1/2 md:top-32 md:left-12 md:right-auto md:translate-y-0 flex flex-col items-center md:items-start space-y-2 pointer-events-none z-0'>
                <div className='bg-white px-3 py-1 md:px-6 md:py-2 transform -skew-x-6 shadow-md inline-block'>
                  <h2 className='text-xl md:text-5xl font-black tracking-tighter text-gray-900'>
                    WELCOME TO
                  </h2>
                </div>
                <div className='bg-white px-3 py-1 md:px-6 md:py-2 transform -skew-x-6 shadow-md inline-block'>
                  <h2 className='text-2xl md:text-6xl font-black tracking-tighter text-rose-600 italic'>
                    TRENDORA
                  </h2>
                </div>
              </div>

              {/* 3. Button - Below Badge (Mobile) / Below Title (Desktop) */}
              <div className='absolute top-24 left-4 md:top-auto md:bottom-24 md:left-12'>
                <button
                  className='bg-rose-600 text-white text-xs md:text-base px-6 py-2 md:px-10 md:py-3 rounded-full font-bold shadow-xl 
                    hover:bg-rose-700 hover:scale-105 transition-all duration-300 uppercase tracking-wide'
                  onClick={() => navigate('/shop')}>
                  Shop Now
                </button>
              </div>

            </div>
          </div>
        </div>
        <InfoSection />
        <CategorySection />

        <div className='container mx-auto py-12'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Top Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {products.products.slice(0, 5).map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Shop/> */}
    </div>
  );
}

export default Home;
