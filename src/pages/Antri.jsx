import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/template/Navbar'
import logo from './../assets/images/logo.png'
import { HiMiniUser, HiMiniUserGroup } from 'react-icons/hi2'
import Button from '../components/atoms/Button'
import { useNavigate } from 'react-router-dom'
import { getUserById } from '../api/userApi'
import { getQueues, createQueue, getQueueByUser } from '../api/queueApi'

const Antri = () => {
  const navigate = useNavigate()
  const [tokenValue, setTokenValue] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAntri, setIsAntri] = useState(false);
  const [allQueue, setAllQueue] = useState(0);
  const [queueSuccess, setQueueSuccess] = useState(0);
  const [myQueue, setMyQueue] = useState(null);
  const [estMyQueue, setEstMyQueue] = useState(null);

  useEffect(() => {
    getAuthToken();
    getAllQueue();
  }, []);
  
  useEffect(()=>{
    userQueue();
  }, [isAntri])

  const getAuthToken = () => {
    const token = Cookies.get('authToken');
    if (token !== undefined) {
      setTokenValue(token);
    } else {
      setIsLogin(true);
    }
  }

  const userQueue = async () => {
    const token = Cookies.get('authToken');
    const user = await getUserById(token);
    const response = await getQueueByUser(user.telepon);
    const lastQueue = response[response.length - 1]
    
    if(lastQueue.status == "In Queue"){
      setMyQueue(lastQueue.queue)
      setIsAntri(true);
      setEstMyQueue(lastQueue.estimationQueue)
    }
  }

  const getAllQueue = async () => {
    const queues = await getQueues();
    const success = queues.filter((queue) => queue.status === 'Success');

    setQueueSuccess(success.length);
    setAllQueue(queues.length);
  }

  const handleSetAntri = async () => {
    const user = await getUserById(tokenValue);
    const nowQueue = await getQueues();
    const inQueue = nowQueue.length - queueSuccess;
    

    const startQueue = new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });
    const estQueue = new Date();
    estQueue.setMinutes(estQueue.getMinutes() + (inQueue * 10));

    const queueData = {
      username: user.username,
      telepon: user.telepon,
      queue: nowQueue.length + 1,
      startQueue: startQueue.replace(".", ":"),
      estimationQueue: estQueue.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }).replace(".", ":"),
      date: new Date().toLocaleDateString("id-ID"),
      status: null
    }


    const response = await createQueue(queueData);

    userQueue()
  }
  return (
    <>
      <Navbar />
      <div className="bg-slate-50 pt-20 h-screen">
        <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
          <img src={logo} className="w-[200px] mx-auto" />
          {isAntri?
            <div className='w-[700px] mx-auto rounded-lg bg-white shadow mt-10 p-5'>
              <div className='text-center'>
                <h5 className='font-medium text-xl'>Nomor Antrian Anda</h5>
                <h1 className='fotn-medium text-[100px]'>{myQueue}</h1>
                <h5>Estimasi Antrian Dilayani Jam <span className='font-medium'>{estMyQueue}</span></h5>
              </div>
              <div className='col-span-2'>
                <p>Perhatian!</p>
                <div className="rounded-md bg-orange-50 border border-orange-200 w-full p-2 text-sm">Untuk Anda yang sudah mengambil nomor antrian, harap datang 10-15 menit sebelum giliran Anda dilayani!</div>
              </div>
            </div>
            :       
            <div className='w-[700px] mx-auto rounded-lg bg-white shadow mt-10 grid grid-cols-2 gap-2 p-5'>
              <div className="rounded-md bg-orange-100 w-full h-[100px] flex items-center gap-x-3 p-5">
                  <HiMiniUserGroup className="text-orange-500" size={50}/>
                  <div className="font-medium">
                      <h5 className="text-lg">Jumlah Antrian</h5>
                      <p>{allQueue}</p>
                  </div>
              </div>
              <div className="rounded-md bg-orange-100 w-full h-[100px] flex items-center gap-x-3 p-5">
                  <HiMiniUser className="text-orange-500" size={50}/>
                  <div className="font-medium">
                      <h5 className="text-lg">Antrian Saat Ini</h5>
                      <p>{allQueue == 0? 0 : allQueue == queueSuccess? allQueue: queueSuccess + 1}</p>
                  </div>
              </div>

              <div className='col-span-2'>
                <p>Perhatian!</p>
                <div className="rounded-md col-span-2 bg-orange-50 border border-orange-200 w-full p-2 text-sm">Untuk Anda yang sudah mengambil nomor antrian, harap datang 10-15 menit sebelum giliran Anda dilayani!</div>
              </div>

              <div onClick={handleSetAntri} className='col-span-2 pt-5'>
                <Button  text={"Ambil Nomor Antrian"} style={'py-3'}/>
              </div>
            </div>
          }

        </div>
      </div>

      {/* Pop-up */}
      {isLogin && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
          
        >
          <div onClick={()=>navigate('/login')}>
            <Button text={"Mohon login terlebih dahulu"} style={'py-3'}/>
          </div>
        </div>
      )}
    </>
  )
}

export default Antri