import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const UserList = () => {
    const [users, setUsers] = useState([])
    const { userInfo } = useSelector(state => state.user)
    const navigate = useNavigate()

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://127.0.0.1:8000/api/users/', config)
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/users/delete/${id}/`, config)
                fetchUsers()
                toast.success('User deleted successfully')
            } catch (error) {
                toast.error('Error deleting user')
            }
        }
    }

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6'>Users</h2>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <table className='w-full'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='py-3 px-4 text-left'>ID</th>
                            <th className='py-3 px-4 text-left'>NAME</th>
                            <th className='py-3 px-4 text-left'>EMAIL</th>
                            <th className='py-3 px-4 text-center'>ADMIN</th>
                            <th className='py-3 px-4 text-center'>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className='border-b hover:bg-gray-50'>
                                <td className='py-3 px-4'>{user.id}</td>
                                <td className='py-3 px-4'>{user.username}</td>
                                <td className='py-3 px-4'><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td className='py-3 px-4 text-center'>
                                    {user.isAdmin ? (
                                        <FaCheck className='text-green-500 inline' />
                                    ) : (
                                        <FaTimes className='text-red-500 inline' />
                                    )}
                                </td>
                                <td className='py-3 px-4 text-center'>
                                    <button
                                        onClick={() => navigate(`/admin/user/${user.id}/edit`)}
                                        className='text-blue-500 hover:text-blue-700 mr-4'
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
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

export default UserList
