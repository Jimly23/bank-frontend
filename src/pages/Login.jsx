import React, { useState } from 'react'
import Button from '../components/atoms/Button'
import Cookies from 'js-cookie'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/userApi'

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({email: "", password: ""});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(!userData.email || !userData.password) {alert("Please fill in all the required fields");}
  
      const response = await login(userData);
  
      if(response.status === 200){
        
        const { _id } = response.data;
        Cookies.set('authToken', _id, { expires: 7, secure: true, sameSite: 'Strict' });
        
        navigate("/");
      } else {
        alert("Email atau password salah");
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
    
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 z-50 fixed left-0 right-0 bottom-0 top-0">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <img src={logo} className='w-[200px] mx-auto pb-5' />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name='email'
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name='password'
              onChange={handleChange}
              value={userData.password}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button style={'w-full'} type={"submit"} text={"Login"} />
          </div>
        </form>
        <div className='font-medium text-sm mt-2'>Belum punya akun? <span className='underline'><Link to={'/register'}>Daftar</Link></span></div>
      </div>
    </div>
  )
}

export default Login