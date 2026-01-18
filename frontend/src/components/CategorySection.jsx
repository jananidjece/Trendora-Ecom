import React from 'react';
import Mancategory from "../assets/images/category-men.jpg"
import Womancategory from "../assets/images/category-women.jpg"
import Kidscategory from "../assets/images/cate-seckid.jpg"

const CategorySection = () => {
const categories =[
    {
        title: "Men",
        imageurl: Mancategory,
    },
     {
        title: "Women",
        imageurl: Womancategory,
    },

     {
        title: "Kids",
        imageurl: Kidscategory,
    },
]

  return (
    <div className='container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 cursor-pointer'>
      {categories.map((category, intex)=>(
        <div key={intex} className='relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer'> 
        <img src={category.imageurl} alt="img" className='w-full h-full object-cover object-top rounded-lg shadow-md' />
        <div className='absolute top-20 left-10'>
       <p className='text-xl font-bold '>{category.title}</p>
       <p className='text-gray-600'>View All</p>
        </div>
        </div>
      ))}
    </div>
  );
}

export default CategorySection;
