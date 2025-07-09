import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes,addToPastes } from "../redux/pasteSlice";
const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams,setSearchParams] = useSearchParams(); // No need to pass empty string
  const pasteId = searchParams.get("pasteId");
  const dispatch=useDispatch()
  const allPastes=useSelector((state)=>state.paste.pastes);
  useEffect(()=>{
   if(pasteId){
     const paste=allPastes.find((p)=>p._id===pasteId);
    setValue(paste.content);
     setTitle(paste.title);
   }
  },[pasteId])
  function createPaste(){
   const paste={
    title:title,
    content:value,
    _id:pasteId||
    Date.now().toString(36),
    createdAt:new Date().toISOString
    (),
   }
   if(pasteId){
    //update
    dispatch(updateToPastes(paste));
   }
   else{
    // create
    dispatch(addToPastes(paste));
   }
   setTitle('');
   setValue('');
   setSearchParams({});
  }
  return (
    <div>
      <div className="flex flex-row place-content-between gap-7 p-4">
      <input
        className="p-1 rounded-2xl border border-gray-300 mt-2 pl-4"
        type="text"
        placeholder="Enter title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button 
      onClick={createPaste}
      className="border border-black rounded-2xl px-4 py-2 hover:bg-black hover:text-white transition mt-2">
        {pasteId ? "Update Paste" : "Create My Paste"}
      </button>
      </div>
      <textarea
        className="rounded-2xl mt-2 p-4 w-full max-w-2xl min-h-[200px] border border-gray-300"
        value={value}
        placeholder="Enter content here"
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      ></textarea>

    </div>
  );
};

export default Home;
