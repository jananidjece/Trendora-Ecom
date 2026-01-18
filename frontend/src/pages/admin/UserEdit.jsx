import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


const UserEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.user)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, config)
                setName(data.username)
                setEmail(data.email)
                setIsAdmin(data.isAdmin)
            } catch (error) {
                console.error(error)
            }
        }
        fetchUser()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://127.0.0.1:8000/api/users/update/${id}/`, {
                username: name, email, isAdmin
            }, config)
            toast.success('User updated successfully')
            navigate('/admin/users')
        } catch (error) {
            toast.error('Error updating user')
        }
    }

    return (
        <div className='p-6'>
            <button onClick={() => navigate('/admin/users')} className='bg-gray-500 text-white px-4 py-2 rounded mb-4'>Go Back</button>
            <h2 className='text-2xl font-bold mb-6'>Edit User</h2>
            <div className='bg-white p-6 rounded shadow-md max-w-md'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Name</label>
                        <input className='w-full border p-2' type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email Address</label>
                        <input className='w-full border p-2' type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-4 flex items-center'>
                        <input
                            className='mr-2'
                            type="checkbox"
                            checked={isAdmin}
                            onChange={e => setIsAdmin(e.target.checked)}
                        />
                        <label className='block text-gray-700'>Is Admin</label>
                    </div>

                    <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UserEdit
