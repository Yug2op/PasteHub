import React from 'react'
import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom'

function ViewPaste() {
  const {id} = useParams();
  const allPastes =useSelector ((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];

  

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 p-6 accordion div1 shadow-lg rounded-lg">
        <div className='text-center '>
          <input 
            type="text"
            // placeholder="Enter your title here"
            disabled
            value={"Title:- "+ (paste.title)}
            onChange={(e) => setTitle((e.target.value))}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md input1 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <textarea
            // placeholder="Enter your text here"
            disabled
            value={"Content:- " +(paste.content)}
            rows={20}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-gray-300 input1 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

    </>
  )
}

export default ViewPaste
