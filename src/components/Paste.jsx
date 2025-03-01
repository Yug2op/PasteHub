import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../Slice/Slice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from 'react-icons/fa';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerms, setSearchTerms] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerms.toLowerCase())
  );


  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success('Paste deleted successfully');
  }

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "Hey, take a look at this awesome content!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  return (
    <div
      className="min-h-screen p-6"
    >
      <div
        className="p-4 rounded-t-xl div1"
      >
        <div className="flex items-center w-full gap-2">
          <input
            type="search"
            placeholder="Search here..."
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
            className="p-2 rounded w-3/4 bg-gray-800 text-white placeholder-gray-400 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-1/4">
            <Link
              to="/"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex justify-center"
            >
              Create New Paste
            </Link>
          </button>
        </div>

      </div>


      {/* Content */}
      <div
        className="p-4 rounded-b-lg div1"
      >
        {filteredData.length > 0 ? (
          filteredData.map((paste, index) => (
            <div
              key={paste._id || index}
              className="mb-6 p-4 bg-gray-700 text-white rounded-lg"
            >
              <div className="text-xl font-bold mb-2">{paste.title}</div>
              <div className="mb-4">{paste.content}</div>

              <div className="flex gap-4 justify-evenly">
                <Link
                  to={`/?pasteId=${paste?._id}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-500"
                >
                  <FaEdit /> Edit
                </Link>

                <Link
                  to={`/pastes/${paste?._id}`}
                  className="flex items-center gap-2 text-green-400 hover:text-green-500"
                >
                  <FaEye /> View
                </Link>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="flex items-center gap-2 text-red-400 hover:text-red-500"
                >
                  <FaTrash /> Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to clipboard');
                  }}
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-500"
                >
                  <FaCopy /> Copy
                </button>

                <button
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-500"
                  onClick={handleShare}
                >
                  <FaShareAlt /> Share
                </button>
              </div>

              <div className="mt-4 text-gray-400 text-sm">
                Created At: {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">No results found</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
