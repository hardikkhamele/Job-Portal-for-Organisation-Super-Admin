import React from "react";
import { ArrowLeft,Wifi, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Image1 from "../../assets/Image1.svg";
import BannerTwo from "../../assets/BannerTwo.svg"

const ChatConversation = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-gray-100 min-h-screen pb-20">
      <div className="bg-white rounded-xl p-6 shadow">

       
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
          <div
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-900 cursor-pointer"
          >
            <ArrowLeft size={25} />
          </div>

          <h1 className="text-2xl font-bold">Chat Support</h1>
        </div>
          <button className="bg-green-700 text-white px-5 py-2 rounded-md">
            Mark as Solved
          </button>
        </div>

        <hr className="mb-4" />

      
        <div className="flex items-center  mb-4 gap-4">
          <Wifi size={20} className="text-yellow-500" />
          <span className="text-yellow-500 text">Ongoing</span>
        </div>

        
        <div className="bg-white p-4 rounded-sm h-[500px] overflow-y-auto space-y-4  no-scrollbar">

        
          <div className="max-w-xs">
          <div className="bg-purple-100 p-3 rounded-sm">
            Hi, how are you today?
          </div>

          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <img
              src={Image1}
              className="w-7 h-7 rounded-full "
              alt=""
            />
            <span>Tames John</span>
            <span>08:35 PM</span>
          </div>
          </div>

          <div className="max-w-xs">
          <div className="bg-purple-100 p-3 rounded-sm">
            I need help how can i apply for job ?
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <img
              src={Image1}
              className="w-7 h-7 rounded-full"
              alt=""
            />
            <span>Tames John</span>
            <span>08:35 PM</span>
          </div>
          </div>

          
          <div className="ml-auto max-w-xs">
            <div className="bg-yellow-100 p-3 rounded-sm">
              Set up account first
            </div>

            <div className="flex justify-end items-center gap-2 mt-1 text-sm text-gray-500">
              <span>09:24 AM</span>
              <span>Executive</span>
              <img
                src={BannerTwo}
                className="w-7 h-7 rounded-full"
                alt=""
              />
            </div>
          </div>

             <div className="ml-auto max-w-xs">
          <div className=" bg-yellow-100 p-3 rounded-sm">
            Go to browse Job
          </div>
          
              <div className="flex items-center justify-end gap-2 mt-1 text-sm text-gray-500">
                <span>09:24 AM</span>
                <span>Executive</span>
                <img
                  src={BannerTwo}
                  className="w-7 h-7 rounded-full"
                  alt=""
                />
              </div>
              </div>

           <div className="ml-auto max-w-xs">
          <div className=" bg-yellow-100 p-3 rounded-sm">
            Hit search button and apply
          </div>
          
              <div className="flex items-center justify-end gap-2 mt-1 text-sm text-gray-500">
                <span>09:24 AM</span>
                <span>Executive</span>
                <img
                  src={BannerTwo}
                  className="w-7 h-7 rounded-full"
                  alt=""
                />
              </div>
              </div>

         
            <div className="max-w-xs">
          <div className=" bg-purple-100 p-3 rounded-sm">
            Yes got it on the desktop page
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <img
              src={Image1}
              className="w-7 h-7 rounded-full"
              alt=""
            />
            <span>Tames John</span>
            <span>08:35 PM</span>
          </div>
          </div>

              <div className="max-w-xs">
          <div className=" bg-purple-100 p-3 rounded-sm">
            Done Thanks for helping me
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <img
              src={Image1}
              className="w-7 h-7 rounded-full mt-1"
              alt=""
            />
            <span>Tames John</span>
          </div>
          </div>


          <div className="max-w-xs">
          <div className=" bg-purple-100 p-3 rounded-sm">
        Typing....
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <img
              src={Image1}
              className="w-7 h-7 rounded-full mt-1"
              alt=""
            />
            <span>Tames John</span> 
          </div>
          </div>

          

        </div>

        
        <div className="flex gap-3 mt-4">
          <input
            placeholder="Enter Message"
            className="flex-1 border p-2 rounded-md"
          />
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md flex items-center justify-center cursor-pointer">
            <Send size={18} />
          </button> 
        </div>
        

      </div>
      <Footer/>
    </div>
  );
};

export default ChatConversation;