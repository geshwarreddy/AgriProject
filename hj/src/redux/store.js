import {  configureStore } from '@reduxjs/toolkit';
import user from './Silce/userSlice';
const store = configureStore({
    reducer : {
        user
    }
});

export  {store};