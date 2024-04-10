import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import updateProfileSlice from './slices/updateProfileSlice.js';
import memberSlice from './slices/memberSlice.js';
import paymentSlice from './slices/paymentSlice.js';
import seatSlice from './slices/seatSlice.js';
import staffSlice from './slices/staffSlice.js'



const store = configureStore({
    reducer: {
        auth: authSlice,
        updateProfile: updateProfileSlice,
        member: memberSlice,
        payment: paymentSlice,
        seat: seatSlice,
        staff: staffSlice
    }
});

export default store;