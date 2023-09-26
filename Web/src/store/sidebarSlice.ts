import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
    collapse: boolean;
}

const initialState: SidebarState = {
    collapse: false,
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        setCollapse: (state, action: PayloadAction<boolean>) => {
            state.collapse = action.payload
        }
    }
})

export const { setCollapse } = sidebarSlice.actions;
export default sidebarSlice.reducer;