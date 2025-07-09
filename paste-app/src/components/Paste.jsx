import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast, { Toaster } from "react-hot-toast";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  // function handleShare(){
  //  <a href={paste?.}></a>
  // }
  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 border-1"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 justify-evenly">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Copy
                  </button>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                    Share
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
