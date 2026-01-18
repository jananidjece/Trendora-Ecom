import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const ProductEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.user)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
            setName(data.name)
            setPrice(data.price)
            setImage(data.image)
            setBrand(data.brand)
            setCategory(data.category)
            setCountInStock(data.countInStock)
            setDescription(data.description)
        }
        fetchProduct()
    }, [id])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', id)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Authorization: `Bearer ${userInfo.token}`, // If you adding auth to upload view
                }
            }
            await axios.post('http://127.0.0.1:8000/api/products/upload/', formData, config)
            setUploading(false)
            toast.success('Image Uploaded!')
            // Ideally refetch product to get new image URL or just trust it.
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://127.0.0.1:8000/api/products/update/${id}/`, {
                name, price, image, brand, category, countInStock, description
            }, config)
            toast.success('Product updated successfully')
            navigate('/admin/products')
        } catch (error) {
            toast.error('Error updating product')
        }
    }

    return (
        <div className='p-6'>
            <button onClick={() => navigate('/admin/products')} className='bg-gray-500 text-white px-4 py-2 rounded mb-4'>Go Back</button>
            <h2 className='text-2xl font-bold mb-6'>Edit Product</h2>
            <div className='bg-white p-6 rounded shadow-md max-w-2xl'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Name</label>
                        <input className='w-full border p-2' type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Price</label>
                        <input className='w-full border p-2' type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    {/* Image Upload */}
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Image</label>
                        <input className='w-full border p-2 mb-2' type="text" value={image} onChange={e => setImage(e.target.value)} readOnly />
                        <input type="file" onChange={uploadFileHandler} />
                        {uploading && <p>Uploading...</p>}
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700'>Brand</label>
                        <input className='w-full border p-2' type="text" value={brand} onChange={e => setBrand(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Count In Stock</label>
                        <input className='w-full border p-2' type="number" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Category</label>
                        <input className='w-full border p-2' type="text" value={category} onChange={e => setCategory(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Description</label>
                        <textarea className='w-full border p-2' value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
