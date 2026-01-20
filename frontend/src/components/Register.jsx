import axiosInstance from '../axiosInstance'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/userSlice'

const Register = ({ openLogin, setIsModelOpen }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axiosInstance.post('/api/users/register/', {
                username: username,
                email: email,
                password: password
            })
            dispatch(login(data))
            setIsModelOpen(false)
        } catch (err) {
            setError('Registration failed. Try again.')
        }
    }

    return (
        <div>
            <h2 className='text 2x1 font-semibold mb-4'>Register</h2>
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
                    <label className='block text-gray-700'>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
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
                <div className='mb-4'>
                    <button type='submit' className='w-full bg-red-600 text-white py-2'>Sign Up</button>
                </div>
            </form>
            <div className='text-center'>
                <span className='text-gray-700'>Already Have an Account?</span>
                <button className='text-red-800' onClick={openLogin}>Login</button>
            </div>
        </div>
    )
}

export default Register