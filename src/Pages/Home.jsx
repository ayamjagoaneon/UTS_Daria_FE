import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
   <>
    <div id='container_home' className="w-full min-h-screen bg-red-200  items-center justify-center bg-cover bg-center">        
      <h1 className="text-3xl  text-w e pt-2 ps-2 font-bold font-serif  text-bold mx-4">
          PROYEK MR ANGIN
      </h1>
      <div className="text-white font-medium rounded-lg w-[10%] h-screen flex justify-center items-center">
        <div className="flex flex-col  justify-center items-center gap-10">
          <div className=" flex flex-col gap-10">
            <Link to="/proyek">
              <button className=" bg-red-500 w-28 h-28 rounded-md">Proyek</button>
            </Link>
            <button className="bg-blue-500 w-28 h-28 rounded-md">karyawan</button>        
            <button className="bg-yellow-500 w-28 h-28 rounded-md">Tugas</button>
            <button className="bg-purple-500 w-28 h-28 rounded-md">Status</button>
          </div>
          <button className="bg-lime-500 w-28 h-28 rounded-md">Client</button>
        </div>
      </div>
    </div>    
    </>
  );
}

export default Home