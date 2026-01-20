import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'

const Login = ({ openSignUp, setIsModelOpen }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axiosInstance.post('/api/users/login/', {
                username: username,
                password: password
            })
            dispatch(login(data))
            setIsModelOpen(false)

            if (data.isAdmin) {
                navigate('/admin/dashboard')
            }

        } catch (err) {
            setError('Invalid username or password')
        }
    }

    return (
        <div>
            <h2 className='text 2x1 font-semibold mb-4'>Login</h2>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter Username'
                        className='w-full px-3 py-2 border'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password'
                        className='w-full px-3 py-2 border'
                        required
                    />
                </div>
                <div className='mb-4 flex items-center justify-between'>
                    <label className='inline-flex items-center'>
                        <input type="checkbox"
                            className='form-checkbox' />
                        <span className='ml-2 text-gray-700'>Remember Me</span>
                    </label>
                    <a href="#" className='text-red-800'>Forgot Password?</a>
                </div>
                <div className='mb-4'>
                    <button type='submit' className='w-full bg-red-600 text-white py-2'>Login</button>
                </div>
            </form>
            <div className='text-center'>
                <span className='text-gray-700'>Don't Have an Account?</span>
                <button className='text-red-800' onClick={openSignUp}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login