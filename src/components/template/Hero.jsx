import React, { useEffect, useState } from "react";
import banner from "../../assets/images/baner.png";
import logo from "../../assets/images/logo-bank.png";
import Button from "../atoms/Button";
import { FaRegClock } from "react-icons/fa6";
import { HiMiniUser, HiMiniUserGroup } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { getQueues } from "../../api/queueApi";

const Hero = () => {
  const [allQueue, setAllQueue] = useState(0);
  const [queueSuccess, setQueueSuccess] = useState(0);

  useEffect(()=>{
    getAllQueue();
  },[])

  const getAllQueue = async () => {
    const queues = await getQueues();
    const success = queues.filter((queue) => queue.status === 'Success');

    setQueueSuccess(success.length);
    setAllQueue(queues.length);
  }
  return (
    <div className="bg-slate-50 pt-20">
      <div className="max-w-[1300px] px-8 mx-auto py-[60px]">
        <div className="grid md:grid-cols-2 gap-y-10 lg:gap-x-5 flex items-center py-20">
          <div className="relative">
            <h4 className="text-4xl font-medium">
              Antri di Bank Lebih <br /> Efisien Menggunakan iBank
            </h4>
            <p className="my-5 text-gray-500">
            Hemat waktu dan nikmati kenyamanan antrian yang lebih teratur dengan iBank. Dengan teknologi pintar, iBank memudahkan Anda untuk mengelola waktu antrian di bank, sehingga Anda bisa lebih fokus pada keperluan lain tanpa harus menunggu lama.
            </p>
            <div className="cta-box w-[150px]">
                <Link to={'/antri'}><Button text={"Antri Sekarang"}/></Link>
            </div>
          </div>

          <div>
            <div className="relative max-w-[400px] mx-auto">
              <img
                src={logo}
                className="ms-24 w-[250px] lg:w-[200px] ngambang2 rounded-lg"
              />
            </div>
          </div>

        </div>
        <div className="grid grid-cols-3 gap-x-10 py-10">
            <div className="rounded-md bg-blue-100 w-full h-[100px] flex items-center gap-x-3 p-5">
                <FaRegClock className="text-blue-500" size={50}/>
                <div className="font-medium">
                    <h5 className="text-lg">Buka Setiap Hari</h5>
                    <p>24 Jam</p>
                </div>
            </div>
            <div className="rounded-md bg-red-100 w-full h-[100px] flex items-center gap-x-3 p-5">
                <HiMiniUserGroup className="text-red-500" size={50}/>
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
