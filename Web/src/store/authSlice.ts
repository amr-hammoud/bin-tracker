import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Token } from "./interfaces";

interface AuthState {
    token: Token | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<Token | null>) => {
            state.token = action.payload
        },
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        }
    }
})

export const { setToken, setUser} = authSlice.actions;
export default authSlice.reducer;