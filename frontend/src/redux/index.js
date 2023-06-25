import { configureStore } from '@reduxjs/toolkit'
import userSliceReducre from './userSlice'
import productSliceReducre from './productSlice'

export const store = configureStore({
    reducer: {
        user: userSliceReducre,
        product: productSliceReducre
    },
})