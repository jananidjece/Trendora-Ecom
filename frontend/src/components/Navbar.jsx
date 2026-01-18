import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShopify,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Modal from "../components/Modal";
import { setSearchTerm } from "../redux/productSlice";
import { logout } from "../redux/userSlice";


const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [isLogin, setisLogin] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false) // New state for user dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobile Menu State

  const user = useSelector((state) => state.user.userInfo); // Get user from Redux
  const dispatch = useDispatch()

  const openSignUp = () => {
    setisLogin(false)
    setIsModelOpen(true)
  }
  const openLogin = () => {
    setisLogin(true)
    setIsModelOpen(true)
  }

  const products = useSelector((state) => state.cart.products) || [];

  const [search, setSearch] = useState()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setSearchTerm(search))
    navigate('/filter-data')
  }

  const handleLogout = () => {
    dispatch(logout())
    setUserMenuOpen(false);
    // also clear cart or do other cleanup if needed
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center gap-4">

        {/* Mobile Menu Button (Left) */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-xl text-gray-700">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="text-xl font-black tracking-tight text-gray-800">
          <Link to="/"> Trendora</Link>
        </div>

        <div className="relative flex-1 mx-4 max-w-lg hidden md:block">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-200 py-2.5 px-6 rounded-full focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100 transition-all bg-gray-50 text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-3.5 right-4 text-rose-400 text-lg"></FaSearch>
          </form>
        </div>

        <div className="flex items-center space-x-6 text-gray-600 font-medium">
          <Link to="/cart" className="relative hover:text-rose-500 transition-colors">
            <FaShoppingCart className="text-xl" />
            {products?.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs w-5 h-5 bg-rose-500 rounded-full flex justify-center items-center text-white font-bold ring-2 ring-white">
                {products.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                className="hidden md:flex items-center space-x-1 hover:text-rose-500 transition-colors"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span>{user.username}</span>
                <FaUser />
              </button>
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="block md:hidden">
                <FaUser />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                    <p className="text-sm text-gray-500 truncate">{user.username}</p>
                  </div>

                  {/* Conditional Links */}
                  {user.isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/checkout"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      Checkout
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors border-t border-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="hidden md:block hover:text-rose-500 transition-colors"
                onClick={() => setIsModelOpen(true)}>
                Login | Register
              </button>
              <button onClick={() => setIsModelOpen(true)} className="block md:hidden text-xl">
                <FaUser />
              </button>
            </>
          )}

        </div>
      </div>

      {/* Mobile Search Bar (Visible only on mobile) */}
      <div className="md:hidden px-4 pb-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border border-gray-200 py-2 px-4 rounded-full focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all bg-gray-50 text-gray-700 text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-2.5 right-4 text-rose-400"></FaSearch>
        </form>
      </div>


      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-center space-x-8 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
        <Link to="/" className="hover:text-rose-500 transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-rose-500 transition-colors">
          About
        </Link>
        <Link to="/shop" className="hover:text-rose-500 transition-colors">
          Shop
        </Link>
        <Link to="/contacts" className="hover:text-rose-500 transition-colors">
          Contacts
        </Link>
      </div>

      {/* Mobile Menu (Full Screen Overlay) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-50 flex flex-col items-center justify-center space-y-8 animate-fade-in-up">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-rose-500">
            <FaTimes />
          </button>

          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold hover:text-rose-500 transition-transform hover:scale-110">Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold hover:text-rose-500 transition-transform hover:scale-110">Shop</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold hover:text-rose-500 transition-transform hover:scale-110">About</Link>
          <Link to="/contacts" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-semibold hover:text-rose-500 transition-transform hover:scale-110">Contact</Link>
          {!user && (
            <button onClick={() => { setIsMobileMenuOpen(false); setIsModelOpen(true) }} className="text-2xl font-semibold text-rose-500 hover:scale-110 transition-transform">
              Login / Register
            </button>
          )}
        </div>
      )}

      <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen} >
        {isLogin ? <Login openSignUp={openSignUp} setIsModelOpen={setIsModelOpen} /> : <Register openLogin={openLogin} setIsModelOpen={setIsModelOpen} />}
      </Modal>
    </nav>
  );
};

export default Navbar;
