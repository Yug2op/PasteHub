import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],

}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      state.pastes.push(paste)
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
      toast.success('Paste added successfully')
    },
    updateToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((p) => p._id === paste._id)
      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste updated successfully')
      }
      else {
        toast.error('Paste not found')
      }

    },
    resetAllPastes: (state, action) => {
      state.pastes = []
      localStorage.removeItem('pastes')

    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((p) => p._id === pasteId)
      if (index >= 0) {
        state.pastes.splice(index, 1)
        localStorage.setItem('pastes', JSON.stringify(state.pastes))
      } else {
        toast.error('Paste not found')
      }
    },
  },
})


export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer