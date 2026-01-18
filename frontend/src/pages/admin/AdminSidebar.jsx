import React from 'react'
import { FaBox, FaUsers, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/userSlice'

const AdminSidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
        { name: 'Products', path: '/admin/products', icon: <FaBox /> },
        { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    ]

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col'>
            <div className='text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4'>
                Admin Panel
            </div>
            <div className='flex-1'>
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center p-3 mb-2 rounded cursor-pointer transition-colors ${location.pathname === item.path ? 'bg-red-600' : 'hover:bg-gray-700'
                            }`}
                        onClick={() => navigate(item.path)}
                    >
                        <div className='mr-3 text-lg'>{item.icon}</div>
                        <div className='font-medium'>{item.name}</div>
                    </div>
                ))}
            </div>
            <div
                className='flex items-center p-3 mt-auto mb-2 rounded cursor-pointer hover:bg-gray-700 text-red-400'
                onClick={handleLogout}
            >
                <div className='mr-3 text-lg'><FaSignOutAlt /></div>
                <div className='font-medium'>Logout</div>
            </div>
        </div>
    )
}

export default AdminSidebar
