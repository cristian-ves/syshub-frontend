import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState {
    isWakingUp: boolean;
}

const initialState: ConnectionState = {
    isWakingUp: false,
};

export const connectionSlice = createSlice({
    name: "connection",
    initialState,
    reducers: {
        setWakingUp: (state, action: PayloadAction<boolean>) => {
            state.isWakingUp = action.payload;
        },
    },
});

export const { setWakingUp } = connectionSlice.actions;
export default connectionSlice.reducer;
