import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_MY_API;

const jwtToken = Cookies.get("jwt_token");

export const fetchData = createAsyncThunk(
  "data/fetchData",

  async (_, thunkApi) => {
    try {
      var options = {
        method: "GET",

        url: baseUrl + "/all-transactions/",
        headers: {
          Accept: "*/*",

          Authorization: `Bearer ${jwtToken}`,

          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(options);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response.data.error);
    }
  }
);

export const addTransaction = createAsyncThunk("data/addData", async () => {});
export const deleteTransaction = createAsyncThunk(
  "data/deleteData",
  async () => {}
);
export const updateTransaction = createAsyncThunk(
  "data/updateData",
  async () => {}
);

const initialState = {
  data: [],

  status: "initial",
  errorMessage: "",
  credit: 0,
  debit: 0,
  amountStatus: "initial",
  error: "",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const result = action.payload;
        const sortedData = result.sort(
          (a, b) => new Date(a.txnDate) - new Date(b.txnDate)
        );
        state.data = sortedData;
      })
      .addCase(fetchData.rejected, () => {})
      .addCase(fetchData.pending, () => {});
  },
});

export default dataSlice.reducer;
