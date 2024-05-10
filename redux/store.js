import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import updateProfileSlice from './slices/updateProfileSlice.js';
import memberSlice from './slices/memberSlice.js';
import paymentSlice from './slices/paymentSlice.js';
import seatSlice from './slices/seatSlice.js';
import lockerSlice from './slices/lockerSlice.js';
import staffSlice from './slices/staffSlice.js'
import organizationSlice from './slices/organizationSlice.js';



const store = configureStore({
    reducer: {
        auth: authSlice,
        updateProfile: updateProfileSlice,
        member: memberSlice,
        payment: paymentSlice,
        seat: seatSlice,
        locker: lockerSlice,
        staff: staffSlice,
        organization: organizationSlice
    }
});

export default store;