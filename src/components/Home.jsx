import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Slice/Slice';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');

    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId && allPastes.length > 0) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        if (!title.trim() || !value.trim()) return; 

        const paste = {
            title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        // Reset input fields
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="text-center">
                <input
                    type="text"
                    placeholder="Enter your title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />

                <button
                    onClick={createPaste}
                    className={`w-full mb-4 px-4 py-2 text-white rounded-md 
                        ${title.trim() && value.trim() ? 'bg-teal-600 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!title.trim() || !value.trim()}
                >
                    {pasteId ? 'Update My Paste' : 'Create My Paste'}
                </button>
            </div>
            <div>
                <textarea
                    placeholder="Enter your text here"
                    value={value}
                    rows={10}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
        </div>
    );
}

export default Home;
