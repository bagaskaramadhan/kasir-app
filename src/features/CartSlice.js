import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk(
    "cart/getCart",
    async () => {
        const response = await axios.get("/carts");
        return response.data
    }
)

export const inputCart = createAsyncThunk(
    "cart/inputCart",
    async (data) => {
        await axios.post("/carts", data)
        const response = await axios.get("/carts");
        return response.data
    }
)

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (data) => {
        await axios.put(`/carts/${data.id}`, data)
        const response = await axios.get("/carts")
        return response.data
    }
)

export const saveCart = createAsyncThunk(
    "cart/saveCart",
    async (data) => {
        await axios.post("/orders", data)
        axios.get("/carts")
            .then((cart) => {
                const data = cart.data;
                data.map(async (item) => {
                    try {
                        await axios.delete(`/carts/${item.id}`)
                    } catch (err) {
                        return null;
                    }
                })
            })
        const response = await axios.get("/carts");
        return response.data
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET CARTS
            .addCase(getCart.pending, (state) => {
                state.data = null
                state.loading = true
                state.error = null
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getCart.rejected, (state, action) => {
                state.data = null
                state.loading = false
                state.error = action.error.message
            })
            // POST CARTS
            .addCase(inputCart.pending, (state) => {
                state.loading = true
                state.data = null
                state.error = null
            })
            .addCase(inputCart.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(inputCart.rejected, (state, action) => {
                state.loading = false
                state.data = null
                state.error = action.error.message
            })
            // PUT CARTS
            .addCase(updateCart.pending, (state) => {
                state.loading = true
                state.data = null
                state.error = null
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = null
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false
                state.data = null
                state.error = action.error.message
            })
            // SAVE CARTS
            .addCase(saveCart.pending, (state) => {
                state.loading = true
                state.data = null
                state.error = null
            })
            .addCase(saveCart.fulfilled, (state) => {
                state.loading = false
                state.error = null
            })
            .addCase(saveCart.rejected, (state, action) => {
                state.loading = false
                state.data = null
                state.error = action.error.message
            })
    }
})


export default cartSlice.reducer;