import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Button from '../atoms/Button'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo-bank.png'

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isKasir, setIsKasir] = useState(false);
  const [cookie, setCookie] = useState(null);

  useEffect(()=>{
    getAuthToken();
  },[cookie])

  const getAuthToken = () => {
    const token = Cookies.get('authToken');
    if (token !== undefined) {
      const data = JSON.parse(token);
      setIsLogin(false);
      setCookie(token);
      if (data.email === "admin@gmail.com") {
        setIsAdmin(true);
      } else if (data.email === "kasir@gmail.com") {
        setIsKasir(true);
      }
    }
  }

  const logout = () => {
    Cookies.remove('authToken');
    setCookie(null);
    setIsLogin(true);
    setIsKasir(false);
    setIsAdmin(false);
  }
  
  return (
    <div className="fixed left-0 right-0 top-0 bg-white z-10 px-8">
      <div className="max-w-[1300px] px-8 mx-auto flex justify-between items-center py-4">
        <img src={logo} className="w-[100px]" />
        <nav className="hidden md:flex items-center gap-x-5 text-md font-medium text-slate-600">
          <Link to={"/"}>Beranda</Link>
          <Link to={"/antri"}>Antri</Link>
          {isAdmin && <Link to={"/admin"}>Admin</Link>}
          {isKasir && <Link to={"/kasir"}>Kasir</Link>}
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