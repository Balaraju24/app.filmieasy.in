import React from "react";
import {
  Image,
  Video,
  Users,
  Settings,
  Eye,
  Undo,
  Redo,
  Upload,
  Plus,
  Feather,
} from "lucide-react";

const SceneEditor = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 border border-[#FFFFFF40] rounded-sm">
      <div className="w-12 bg-black flex flex-col items-center  border-r border-gray-700">
        {[1, 2, 3].map((_, i) => (
          <button
            key={i}
            className="p-3 w-full flex items-center justify-center  hover:bg-gray-600 rounded-t-l-md"
          >
            <Feather className="w-4 h-4" />
          </button>
        ))}
        <button className="p-2 bg-[#FFFFFFCC] w-full text-gray-900 hover:bg-white flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="w-72 bg-[#191919] p-4 border-r border-gray-700 flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-400">Scene Name</label>
          <input
            type="text"
            placeholder="Enter Scene Name"
            className="w-full mt-1 bg-[#212121] text-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Description</label>
          <textarea
            placeholder="Enter Description"
            className="w-full mt-1 bg-[#212121] text-gray-200 p-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Select Members</label>
          <select className="w-full mt-1 bg-[#212121] p-2 rounded-md">
            <option>Select Membership</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400">Select Location</label>
          <select className="w-full mt-1 bg-[#212121] p-2 rounded-md">
            <option>Select</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400">Select Date & Time</label>
          <div className="flex gap-2 mt-1">
            <div className="relative">
              <input
                type="date"
                className=" w-full bg-[#212121] p-2 pl-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
      appearance-none [-webkit-appearance:none] [&::-ms-expand]:hidden [&::-webkit-calendar-picker-indicator]:opacity-0
      [&::-webkit-calendar-picker-indicator]:pointer-events-none"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="time"
                className="
                    w-full bg-[#212121] p-2 pl-3 rounded-md 
                    text-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    appearance-none 
                    [-webkit-appearance:none] 
                    [&::-ms-expand]:hidden
                    [&::-webkit-datetime-edit-fields-wrapper]:p-0
                    [&::-webkit-calendar-picker-indicator]:opacity-0
                    [&::-webkit-calendar-picker-indicator]:pointer-events-none
                  "
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-400">Location Type</label>
          <div className="flex gap-2">
            <div className="flex items-center justify-between w-32 px-4 py-2 bg-neutral-800 rounded-md">
              <label className="text-white text-sm">Indoor</label>

              <input
                id="option1"
                type="radio"
                name="choice"
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full relative cursor-pointer
                    checked:border-white checked:before:content-[''] checked:before:absolute
                    checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                    checked:before:w-2 checked:before:h-2 checked:before:bg-white checked:before:rounded-full"
              />
            </div>
            <div className="flex items-center justify-between w-32 px-4 bg-neutral-800 rounded-md">
              <label className="text-white text-sm">Outdoor</label>

              <input
                id="option1"
                type="radio"
                name="choice"
                className="appearance-none w-4 h-4 border border-gray-400 rounded-full relative cursor-pointer
                    checked:border-white checked:before:content-[''] checked:before:absolute
                    checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                    checked:before:w-2 checked:before:h-2 checked:before:bg-white checked:before:rounded-full"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="flex-1 bg-black flex flex-col">
        <div className="flex justify-between items-center bg-black border-b border-gray-700 px-4 py-2">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:text-white">
              <Image size={16} />
            </button>
            <button className="hover:text-white">
              <Video size={16} />
            </button>
            <button className="hover:text-white">
              <Users size={16} />
            </button>
            <button className="hover:text-white">
              <Settings size={16} />
            </button>
            <button className="hover:text-white">
              <Eye size={16} />
            </button>
            <button className="hover:text-white">
              <Undo size={16} />
            </button>
            <button className="hover:text-white">
              <Redo size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm">
              Try using AI
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md flex items-center gap-1 hover:bg-blue-500">
              <Upload size={14} />
              Upload
            </button>
          </div>
        </div>

        <div className="bg-[#2E2E2E] w-[75%] mx-auto block text-center py-4 mb-2 shadow-[0px_2px_4px_0px_#00000040]">
          <h2 className="text-lg font-semibold">UNTITLED SCREENPLAY</h2>
          <p className="text-gray-400 text-sm">Subtitle</p>
        </div>

        <div className="bg-[#2E2E2E] w-[75%] mx-auto block flex-1 flex items-center justify-center text-gray-500 shadow-[0px_2px_4px_0px_#00000040]">
          <p>( )</p>
        </div>

        <div className="flex justify-end border-t border-gray-700 p-3 bg-black">
          <button className="px-4 py-2 text-sm rounded-md hover:bg-gray-700">
            Cancel
          </button>
          <button className="ml-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SceneEditor;
