import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice.js';
import profileSlice from './slices/profileSlice.js';
import memberSlice from './slices/memberSlice.js';
import paymentSlice from './slices/paymentSlice.js';
import serviceSlice from './slices/serviceSlice.js';
import seatSlice from './slices/seatSlice.js';
import lockerSlice from './slices/lockerSlice.js';
import staffSlice from './slices/staffSlice.js'
import organizationSlice from './slices/organizationSlice.js';
import dashboardSlice from './slices/dashboardSlice.js';



const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard:dashboardSlice,
        profile: profileSlice,
        member: memberSlice,
        payment: paymentSlice,
        service: serviceSlice,
        seat: seatSlice,
        locker: lockerSlice,
        staff: staffSlice,
        organization: organizationSlice
    }
});

export default store;