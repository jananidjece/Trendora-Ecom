import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaShopify, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-slate-900 text-gray-200 py-12 px-4 md:px-16 lg:px-24'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12'>
        <div>
          <h3 className='text-2xl font-bold tracking-tighter text-white'>Trendora</h3>
          <p className='mt-4 text-gray-400'>Your one-stop shop for all your needs. Shop with us and experience the best online shopping experience.</p>
        </div>
        <div className='flex flex-col md:items-center'>
          <h3 className='text-lg font-bold text-white uppercase tracking-wider'>Quick links</h3>
          <ul className='mt-4 space-y-3 font-medium'>
            <li>
              <Link to='/' className='hover:text-rose-400 transition-colors'>Home</Link>
            </li>
            <li>
              <Link to='/shop' className='hover:text-rose-400 transition-colors'>Shop</Link>
            </li>
            <li>
              <Link to="/contacts" className='hover:text-rose-400 transition-colors'>Contact</Link>
            </li>
            <li>
              <Link to='about' className='hover:text-rose-400 transition-colors'>About</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='text-lg font-bold text-white uppercase tracking-wider'>Follow us</h4>
          <div className='flex space-x-6 mt-4'>
            <a href="" className='text-gray-400 hover:text-rose-400 transition-colors text-xl'><FaFacebook /> </a>
            <a href="" className='text-gray-400 hover:text-rose-400 transition-colors text-xl'><FaTwitter /></a>
            <a href="" className='text-gray-400 hover:text-rose-400 transition-colors text-xl'><FaInstagram /></a>
            <a href="" className='text-gray-400 hover:text-rose-400 transition-colors text-xl'><FaLinkedin /></a>
          </div>
          <form className='flex items-center justify-center mt-8'>
            <input
              type="email"
              placeholder='Enter Email'
              className='w-full p-3 rounded-l-lg bg-slate-800 border-none focus:ring-2 focus:ring-rose-400 text-white placeholder-gray-500' />
            <button className='bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-r-lg font-semibold transition-colors'>Subscribe</button>
          </form>
        </div>
      </div>
      <div className='mt-8 border-t border-gray-700 pt-4'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <p>&copy; 2025 Trendora All rights reserved.</p>
          <div className='flex space-x-0 mt-4 md:mt-0'>
            <a href="" className='hover:underline'>Privacy Policy</a>
            <a href="" className='hover:underline'>Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer