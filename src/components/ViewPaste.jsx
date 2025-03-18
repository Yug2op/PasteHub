import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);
  if (!paste) {
    return <p className="text-center text-red-500">Paste not found!</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 sm:p-6 shadow-lg rounded-lg bg-white">
      <div className="text-center">
        <input
          type="text"
          disabled
          value={`Title: ${paste?.title || ""}`}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md input1 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <textarea
          disabled
          value={`Content: ${paste?.content || ""}`}
          rows={10}
          className="w-full p-2 border border-gray-300 rounded-md input1 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
    </div>
  );
}

export default ViewPaste;
