import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import updateProfileSlice from './slices/updateProfileSlice.js';
import memberSlice from './slices/memberSlice.js';
import paymentSlice from './slices/paymentSlice.js';



const store = configureStore({
    reducer: {
        auth: authSlice,
        updateProfile: updateProfileSlice,
        member: memberSlice,
        payment: paymentSlice
    }
});

export default store;