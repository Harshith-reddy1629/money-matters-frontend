import { configureStore } from "@reduxjs/toolkit";

import datareducer from "../slice/slice";

const store = configureStore({
  reducer: {
    // user: userReducer,
    data: datareducer,
  },
});
export default store;
