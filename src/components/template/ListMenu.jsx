import React, { useState } from 'react'
import dimsum from './../../assets/images/menu/Dimsum.png'
import lumpia from './../../assets/images/menu/Lumpia.jpeg'
import hompipa from './../../assets/images/menu/MieHompipa.jpeg'
import suit from './../../assets/images/menu/MieSuit.png'
import udang from './../../assets/images/menu/Rambutan.jpeg'
import gacoan from './../../assets/images/menu/gacoan.jpg'
import esCoklat from './../../assets/images/menu/esCoklat.jpg'
import Esgobaksodor from './../../assets/images/menu/Esgobaksodor.jpg'
import esptekumpey from './../../assets/images/menu/esptekumpey.jpeg'
import esTeh from './../../assets/images/menu/esTeh.jpg'
import EsTeklek from './../../assets/images/menu/EsTeklek.jpg'
import greenTea from './../../assets/images/menu/greenTea.jpg'
import lemonTea from './../../assets/images/menu/lemonTea.jpg'
import milo from './../../assets/images/menu/milo.jpg'
import mineral from './../../assets/images/menu/mineral.jpg'
import orange from './../../assets/images/menu/orange.jpg'
import tehTarik from './../../assets/images/menu/tehTarik.jpg'
import thaiTea from './../../assets/images/menu/thaiTea.jpg'
import vanilalatte from './../../assets/images/menu/vanilalatte.jpg'

const ListMenu = () => {
    // const [menu, setMenu] = useState([1,1,1,1,1,1,1,1,1,1]);
    const menu = [
      {
        img: dimsum,
        desc: "Dimsum",
        price: "Rp. 12.000"
      },
      {
        img: lumpia,
        desc: "Lumpia",
        price: "Rp. 12.000"
      },
      {
        img: hompipa,
        desc: "Mie Hompipa",
        price: "Rp. 12.000"
      },
      {
        img: suit,
        desc: "Mie Suit",
        price: "Rp. 12.000"
      },
      {
        img: udang,
        desc: "Udang Rambutan",
        price: "Rp. 12.000"
      },
      {
        img: gacoan,
        desc: "Mie Gacoan",
        price: "Rp. 12.000"
      },
      {
        img: esCoklat,
        desc: "Es Coklat",
        price: "Rp. 1o.000"
      },
      {
        img: Esgobaksodor,
        desc: "Es Gobak Sodor",
        price: "Rp. 14.000"
      },
      {
        img: esptekumpey,
        desc: "Es Petakumpet",
        price: "Rp. 14.000"
      },
      {
        img: esTeh,
        desc: "Es Teh",
        price: "Rp. 7.000"
      },
      {
        img: EsTeklek,
        desc: "Es Teklek",
        price: "Rp. 16.000"
      },
      {
        img: greenTea,
        desc: "Es Green Tea",
        price: "Rp. 10.000"
      },
      {
        img: lemonTea,
        desc: "Lemon Tea",
        price: "Rp. 7.000"
      },
      {
        img: milo,
        desc: "Es Milo",
        price: "Rp. 10.000"
      },
      {
        img: mineral,
        desc: "Air Mineral",
        price: "Rp. 7.000"
      },
      {
        img: orange,
        desc: "Es Jeruk",
        price: "Rp. 8.000"
      },
      {
        img: tehTarik,
        desc: "Teh Tarik",
        price: "Rp. 9.000"
      },
      {
        img: thaiTea,
        desc: "Thai Tea",
        price: "Rp. 9.000"
      },
      {
        img: vanilalatte,
        desc: "Vanlila Latte",
        price: "Rp. 15.000"
      },
    ]
  return (
    <div className='bg-gradient-to-b from-slate-100 to-white py-10'>
      <div className='max-w-[1300px] px-8 mx-auto'>
        <h3 className='font-medium text-3xl my-5 text-center mb-20'>Daftar Menu</h3>
        <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10'>
            {menu.map((item,index) => (
                <div key={index} className='text-center'>
                    <div className='w-[100px] h-[100px] bg-blue-700 rounded-md mx-auto overflow-hidden'><img src={item.img} className='h-full w-full object-cover' alt="" /></div>
                    <h5 className='font-medium text-lg'>{item.desc}</h5>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ListMenu