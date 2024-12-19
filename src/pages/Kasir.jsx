import React, { useEffect, useState } from "react";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import Button from "../components/atoms/Button";
import logo from "./../assets/images/logo.png"
import { getQueues, updateQueueStatus } from "../api/queueApi";

const Kasir = () => {
  const [allQueue, setAllQueue] = useState(0);
  const [queueData, setQueueData] = useState([])
  const [queueSuccess, setQueueSuccess] = useState(0);

  useEffect(()=>{
    getAllQueue();
  },[])

  const getAllQueue = async () => {
    const queues = await getQueues();
    const success = queues.filter((queue) => queue.status === 'Success');
    
    setQueueSuccess(success.length);
    setAllQueue(queues.length);

    let queueId = []
    for(let i=0; i<queues.length; i++){
      queueId.push(queues[i]._id)
    }
    setQueueData(queueId)
  }

  const handleUpdateStatus = async () => {
    const response = await updateQueueStatus({id: queueData[queueSuccess]});
    getAllQueue();
    
 }
  return (
    <div className="bg-slate-50 pt-20 h-screen">
      <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
        <img src={logo} className="w-[200px] mx-auto" />
        <div className='w-[750px] mx-auto rounded-lg bg-white shadow mt-10 grid grid-cols-2 gap-2 p-5'>
          <div className="rounded-md bg-red-100 w-full h-[100px] flex items-center gap-x-3 p-5">
              <HiMiniUserGroup className="text-red-500" size={50}/>
              <div className="font-medium">
                  <h5 className="text-lg">Jumlah Antrian</h5>
                  <p>{allQueue}</p>
              </div>
          </div>
          <div className="rounded-md bg-green-100 w-full h-[100px] flex items-center gap-x-3 p-5">
              <HiMiniUser className="text-green-500" size={50}/>
              <div className="font-medium">
                  <h5 className="text-lg">Antrian Selesai</h5>
                  <p>{queueSuccess}</p>
              </div>
          </div>
          <div className="rounded-md col-span-2 bg-orange-100 w-full text-center gap-x-3 p-5">
              <HiMiniUser className="text-orange-500 mx-auto" size={50}/>
              <div className="font-medium">
                  <h5 className="text-lg">Antrian Saat Ini</h5>
                  <p className="text-[50px]">{allQueue == 0? 0 : allQueue == queueSuccess? allQueue: queueSuccess + 1}</p>
              </div>
          </div>

          <div onClick={handleUpdateStatus} className='col-span-3 pt-5'>
            <Button  text={"Berikutnya"} style={'py-5'}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kasir;
