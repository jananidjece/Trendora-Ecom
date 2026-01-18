import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import InfoSection from "./components/InfoSection"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import CheckOut from "./pages/CheckOut"
import { useState } from "react"
import Order from "./pages/Order"
import FilteredData from "./pages/FilteredData"
import ProductDetail from "./pages/ProductDetail"
import Contacts from "./pages/Contacts"
import About from "./pages/About"
import PrivateRoute from "./components/PrivateRoute"
import AdminLayout from "./pages/admin/AdminLayout"
import AdminDashboard from "./pages/admin/AdminDashboard"
import ProductList from "./pages/admin/ProductList"
import ProductEdit from "./pages/admin/ProductEdit"
import UserList from "./pages/admin/UserList"
import UserEdit from "./pages/admin/UserEdit"



import { useDispatch } from "react-redux"
import { setProducts } from "./redux/productSlice"
import { useEffect } from "react"
import axios from "axios"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [order, setOrder] = useState('null')
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/')
        dispatch(setProducts(response.data))
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
    fetchProducts()
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut setOrder={setOrder} />} />
        <Route path='/order-confirmation' element={<Order order={order} />} />
        <Route path='/filter-data' element={<FilteredData />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:id/edit" element={<ProductEdit />} />
            <Route path="users" element={<UserList />} />
            <Route path="user/:id/edit" element={<UserEdit />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" style={{ top: '80px' }} />
    </>
  )
}

export default App
