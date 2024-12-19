import React from 'react'
import andhika from './../../assets/images/andhika.jpg'
import dea from './../../assets/images/dea.jpg'
import fera from './../../assets/images/fera.jpg'
import nur from './../../assets/images/nur.jpg'
import yopi from './../../assets/images/yopi.jpg'

const ListMenu = () => {
    const menu = [
      {
        img: andhika,
        desc: "Andhika Prasetyo",
        price: "23SA21A092"
      },
      {
        img: dea,
        desc: "Dea Bella Sarmila",
        price: "23SA21A105"
      },
      {
        img: fera,
        desc: "Tri Fera Nofitasari",
        price: "23SA21A100"
      },
      {
        img: nur,
        desc: "Nur Hikmah",
        price: "23SA21A094"
      },
      {
        img: yopi,
        desc: "Yopi Prasetiyo",
        price: "23SA21A083"
      },
      
    ]
  return (
    <div className='bg-gradient-to-b from-slate-100 to-white py-10'>
      <div className='max-w-[1300px] px-8 mx-auto'>
        <h3 className='font-medium text-3xl my-5 text-center mb-20'>Tentang Kami</h3>
        <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-10 pt-16 pb-24'>
            {menu.map((item,index) => (
                <div key={index} className='text-center'>
                    <div className='w-[150px] h-[150px] bg-blue-700 rounded-md mx-auto overflow-hidden'><img src={item.img} className='h-full w-full object-cover' alt="" /></div>
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