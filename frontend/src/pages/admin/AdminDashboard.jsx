import React from 'react'
import { FaBox, FaUsers, FaChartLine } from 'react-icons/fa'

const AdminDashboard = () => {
    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Stats Cards */}
                <div className='bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center'>
                    <FaBox className='text-4xl mr-4 opacity-80' />
                    <div>
                        <h3 className='text-xl font-semibold'>Products</h3>
                        <p className='text-3xl font-bold'>Manage</p>
                    </div>
                </div>
                <div className='bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center'>
                    <FaUsers className='text-4xl mr-4 opacity-80' />
                    <div>
                        <h3 className='text-xl font-semibold'>Users</h3>
                        <p className='text-3xl font-bold'>Manage</p>
                    </div>
                </div>
                <div className='bg-purple-500 text-white p-6 rounded-lg shadow-md flex items-center'>
                    <FaChartLine className='text-4xl mr-4 opacity-80' />
                    <div>
                        <h3 className='text-xl font-semibold'>Sales</h3>
                        <p className='text-3xl font-bold'>$0.00</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-gray-600">Select an item from the sidebar to manage content.</p>
            </div>
        </div>
    )
}

export default AdminDashboard
