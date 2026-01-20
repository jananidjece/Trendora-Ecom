import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const ProductList = () => {
    const [products, setProducts] = useState([])
    const { userInfo } = useSelector(state => state.user)
    const navigate = useNavigate()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    const fetchProducts = async () => {
        const { data } = await axiosInstance.get('/api/products/')
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axiosInstance.delete(`/api/products/delete/${id}/`, config)
                fetchProducts()
                toast.success('Product deleted successfully')
            } catch (error) {
                toast.error('Error deleting product')
            }
        }
    }

    const handleCreate = async () => {
        try {
            const { data } = await axiosInstance.post('/api/products/create/', {}, config)
            toast.success('Product created successfully')
            navigate(`/admin/product/${data.id}/edit`)
        } catch (error) {
            toast.error('Error creating product')
        }
    }

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>Products</h2>
                <button
                    onClick={handleCreate}
                    className='bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700'
                >
                    <FaPlus className='mr-2' /> Create Product
                </button>
            </div>

            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <table className='w-full'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='py-3 px-4 text-left'>ID</th>
                            <th className='py-3 px-4 text-left'>NAME</th>
                            <th className='py-3 px-4 text-left'>PRICE</th>
                            <th className='py-3 px-4 text-left'>CATEGORY</th>
                            <th className='py-3 px-4 text-left'>BRAND</th>
                            <th className='py-3 px-4 text-center'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className='border-b hover:bg-gray-50'>
                                <td className='py-3 px-4'>{product.id}</td>
                                <td className='py-3 px-4'>{product.name}</td>
                                <td className='py-3 px-4'>${product.price}</td>
                                <td className='py-3 px-4'>{product.category}</td>
                                <td className='py-3 px-4'>{product.brand}</td>
                                <td className='py-3 px-4 text-center'>
                                    <button
                                        onClick={() => navigate(`/admin/product/${product.id}/edit`)}
                                        className='text-blue-500 hover:text-blue-700 mr-4'
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList
