import React, { useEffect, useState } from "react";
import banner from "../../assets/images/baner.png";
import logo from "../../assets/images/logo.png";
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
              Antri Gacoan Lebih <br /> Efisien Menggunakan Gantri
            </h4>
            <p className="my-5 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              modi voluptatibus ratione perferendis tempora, quaerat dolorum aut
              neque aspernatur ullam.
            </p>
            <div className="cta-box w-[150px]">
                <Link to={'/antri'}><Button text={"Antri Sekarang"}/></Link>
            </div>
          </div>

          <div>
            <div className="relative max-w-[400px] mx-auto">
              <img
                src={logo}
                className="ms-4 w-[150px] lg:w-[170px] ngambang1 rounded-lg"
              />
              <img
                src={logo}
                className="ms-16 mt-5 w-[180px] lg:w-[200px] ngambang2 rounded-lg"
              />
              <div className="absolute right-0 top-0">
                <img
                  src={logo}
                  className="w-[200px] lg:w-[220px] ngambang3 rounded-lg"
                />
              </div>
              <div className="absolute right-0 top-0">
                <img src={logo} className="w-[30px] ngambang3 putar" />
              </div>
              <div className="absolute -left-10 top-[50px]">
                <img src={logo} className="w-[30px] ngambang3 putar" />
              </div>
              <div className="absolute left-[-100px] bottom-[0] flex items-center gap-x-[400px]">
                <img src={logo} className="w-[15px] rounded-lg" />
                <img src={logo} className="w-[15px] rounded-lg" />
              </div>
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
