import React, { useEffect, useState } from 'react'
import Button from '../components/atoms/Button'
import { FaRegClock } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { HiMiniUser, HiMiniUserGroup } from 'react-icons/hi2';
import { getUsers } from '../api/userApi';
import { getQueues, updateQueueStatus } from '../api/queueApi';

const Admin = () => {
    const [isOpen, setIsOpen] = useState(1);
    const [allUser, setAllUser] = useState([]);
    const [allQueue, setAllQueue] = useState([]);
    const [queueSuccess, setQueueSuccess] = useState(0);

    useEffect(()=>{
        getAllUser();
        getAllQueue();
    }, [])

    const getAllUser = async () => {
        const response = await getUsers();
        setAllUser(response);
    }

    const getAllQueue = async () => {
        const response = await getQueues();

        const success = response.filter((queue) => queue.status === 'Success');

        setQueueSuccess(success.length);
        setAllQueue(response);
    }

    const handleUpdateStatus = async (id) => {
       const response = await updateQueueStatus({id: id});
       getAllQueue();
    }

  return (
    <>
        <div className='grid grid-cols-6'>
            <div className='col-span-1 sidebar h-screen bg-blue-900'>
                <h3 className='font-medium text-xl text-white p-5'>Admin Gacoan</h3>
                <ul className='mt-3 font-medium'>
                    <li onClick={()=>setIsOpen(1)} className='text-white hover:bg-slate-500 cursor-pointer py-3 px-4'>Daftar Antrian</li>
                    <li onClick={()=>setIsOpen(2)} className='text-white hover:bg-slate-500 cursor-pointer py-3 px-4'>Riwayat Antrian</li>
                    <li onClick={()=>setIsOpen(3)} className='text-white hover:bg-slate-500 cursor-pointer py-3 px-4'>Daftar User</li>
                </ul>
            </div>
            <div className='col-span-5 bg-slate-50 p-5'>
                {isOpen == 1 && 
                    <>
                        <>
                            <h3 className='font-medium text-xl'>Ringkasan Antrian</h3>
                            <div className="grid grid-cols-3 gap-x-10 pb-10 pt-2">
                                <div className="rounded-lg bg-white border w-full h-[100px] flex items-center gap-x-3 p-5">
                                    <HiMiniUserGroup className="text-red-500" size={50}/>
                                    <div className="font-medium">
                                        <h5 className="text-lg">Jumlah Antrian</h5>
                                        <p>{allQueue.length}</p>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white border w-full h-[100px] flex items-center gap-x-3 p-5">
                                    <HiMiniUser className="text-orange-500" size={50}/>
                                    <div className="font-medium">
                                        <h5 className="text-lg">Antrian Saat Ini</h5>
                                        <p>{allQueue.length == 0? 0 : allQueue.length == queueSuccess? allQueue.length: queueSuccess + 1}</p>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white border w-full h-[100px] flex items-center gap-x-3 p-5">
                                    <FaRegCheckCircle className="text-green-500" size={40}/>
                                    <div className="font-medium">
                                        <h5 className="text-lg">Antrian Selesai</h5>
                                        <p>{queueSuccess}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        <>
                            <h3 className='font-medium text-xl mb-2'>Daftar Antrian</h3>
                            <div className="daftar-antrian w-full bg-white rounded-xl p-5 shadow">
                                <div className="header grid grid-cols-6 font-medium text-slate-700 border-b border-slate-500 pb-6">
                                    <h6>Nama</h6>
                                    <h6>Telepon</h6>
                                    <h6>No. Antri</h6>
                                    <h6>Mulai Antri</h6>
                                    <h6>Estimasi</h6>
                                    <h6>Status</h6>
                                </div>
                                {allQueue.map((item, index) => (    
                                    <div key={index} className="grid flex items-center text-sm grid-cols-6 font-medium text-slate-700 border-b border-slate-500 py-3">
                                        <h6>{item.username}</h6>
                                        <h6>{item.telepon}</h6>
                                        <h6>{item.queue}</h6>
                                        <h6>{item.startQueue}</h6>
                                        <h6>{item.estimationQueue}</h6>
                                        <div onClick={()=>handleUpdateStatus(item._id)} className={`py-1 px-3 w-[120px] rounded-md text-white ${item.status === 'Success' ? 'bg-green-500 cursor-no-drop' : 'bg-orange-500'} font-medium cursor-pointer`}>
                                            {item.status}
                                        </div>
                                    </div> 
                                ))}
                            </div>
                        </>
                    </>
                }

                {isOpen === 2 && 
                    <> 
                        <>
                            <h3 className='font-medium text-xl'>Ringkasan Antrian</h3>
                            <div className="grid grid-cols-3 gap-x-10 pb-10 pt-2">
                                <div className="rounded-lg bg-white border w-full h-[100px] flex items-center gap-x-3 p-5">
                                    <HiMiniUserGroup className="text-blue-900" size={50}/>
                                    <div className="font-medium">
                                        <h5 className="text-lg">Riwayat Antrian</h5>
                                        <p>{queueSuccess}</p>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-white border w-full h-[100px] flex items-center gap-x-3 p-5">
                                    <FaRegCheckCircle className="text-green-500" size={40}/>
                                    <div className="font-medium">
                                        <h5 className="text-lg">Antrian Selesai</h5>
                                        <p>{queueSuccess}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        <div className="daftar-antrian w-full bg-white rounded-xl p-5 shadow">
                            <div className="header grid grid-cols-6 font-medium text-slate-700 border-b border-slate-500 pb-6">
                                <h6>Nama</h6>
                                <h6>Telepon</h6>
                                <h6>No. Antri</h6>
                                <h6>Mulai Antri</h6>
                                <h6>Estimasi</h6>
                                <h6>Status</h6>
                            </div>
                            {allQueue.map((item, index) => (   
                                <div key={index}>
                                    {item.status === 'Success' && 
                                        <div key={index} className="grid flex items-center text-sm grid-cols-6 font-medium text-slate-700 border-b border-slate-500 py-3">
                                                <h6>{item.username}</h6>
                                                <h6>{item.telepon}</h6>
                                                <h6>{item.queue}</h6>
                                                <h6>{item.startQueue}</h6>
                                                <h6>{item.estimationQueue}</h6>
                                                <div onClick={()=>handleUpdateStatus(item._id)} className={`py-1 px-3 w-[120px] rounded-md text-white ${item.status === 'Success' ? 'bg-green-500 cursor-no-drop' : 'bg-orange-500'} font-medium cursor-pointer`}>
                                                    {item.status}
                                                </div>
                                        </div> 
                                    }
                                </div> 
                            ))}
                        </div>
                    </>
                }

                {isOpen === 3 && 
                    <>
                        <h3 className='font-medium text-xl mb-2'>List Users</h3>
                        <div className="daftar-antrian w-full bg-white rounded-xl p-5 shadow">
                            <div className="header grid grid-cols-6 font-medium text-slate-700 border-b border-slate-500 pb-6">
                                <h6>No.</h6>
                                <h6 className='col-span-2'>Nama</h6>
                                <h6 className='col-span-2'>Email</h6>
                                <h6>Telepon</h6>
                            </div>
                            <div>
                                {allUser.map((item,index) => (
                                    <div key={index} className="grid flex items-center text-sm grid-cols-6 font-medium text-slate-700 border-b border-slate-500 py-3">
                                        <h6>{index + 1}</h6>
                                        <h6 className='col-span-2'>{item.username}</h6>
                                        <h6 className='col-span-2'>{item.email}</h6>
                                        <h6>{item.telepon}</h6>
                                    </div> 
                                    
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    </>
  )
}

export default Admin