import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes,addToPastes } from "../redux/pasteSlice";
const ViewPaste = () => {
    const{id}=useParams();
    const allPastes=useSelector((state)=>state.paste.pastes);
    const paste=allPastes.filter((p)=>p._id===id)[0];
    console.log("Final paste:",paste)
  return (
   <div>
      <div className="flex flex-row place-content-between gap-7 p-4">
      <input
        className="p-1 rounded-2xl border border-gray-300 mt-2 pl-4"
        type="text"
        placeholder="Enter title here"
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />
      </div>
      <textarea
        className="rounded-2xl mt-2 p-4 w-full max-w-2xl min-h-[200px] border border-gray-300"
        value={paste.content}
        placeholder="Enter content here"
        disabled
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      ></textarea>

    </div>
  )
}

export default ViewPaste