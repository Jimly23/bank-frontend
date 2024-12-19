import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Button from '../atoms/Button'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [cookie, setCookie] = useState(null);

  useEffect(()=>{
    getAuthToken();
  },[cookie])

  const getAuthToken = () => {
    const token = Cookies.get('authToken');
    if (token !== undefined) {
      setIsLogin(false);
      setCookie(token);
    }
  }

  const logout = () => {
    Cookies.remove('authToken');
    setCookie(null);
    setIsLogin(true);
  }
  
  return (
    <div className="fixed left-0 right-0 top-0 bg-white z-10 px-8">
      <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
        <img src={logo} className="w-[100px]" />
        <nav className="hidden md:flex items-center gap-x-5 text-md font-medium text-slate-600">
          <Link to={"/"}>Beranda</Link>
          <Link to={"/antri"}>Antri</Link>
        </nav>
        <div className="hidden md:block">
          {isLogin? 
            <Link to={"/login"}>
              <Button text={"Login"}/>
            </Link>
          :
            <Link onClick={logout}>
              <Button text={"Logout"} style={'bg-red-500'}/>
            </Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar