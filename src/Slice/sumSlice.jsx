import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credit: 0,
  debit: 0,
  status: "initial",
  error: "",
};

const creditDebit = createSlice({
  name: "amount",
  initialState,
  reducers: {
    incrementAmount: (state, action) => {},
  },
});
