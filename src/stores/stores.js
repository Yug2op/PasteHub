import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../Slice/Slice'

export const store = configureStore({
    reducer: {
        paste: pasteReducer,
    },
})