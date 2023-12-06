import authReducer from './authSlice'
import {configureStore} from '@reduxjs/toolkit'

const store=configureStore({
    reducer:{
        useDetails:authReducer
    }
})

export default store;