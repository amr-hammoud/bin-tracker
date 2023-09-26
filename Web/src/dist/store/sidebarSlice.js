"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCollapse = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    collapse: false,
};
const sidebarSlice = (0, toolkit_1.createSlice)({
    name: "sidebar",
    initialState,
    reducers: {
        setCollapse: (state, action) => {
            state.collapse = action.payload;
        }
    }
});
exports.setCollapse = sidebarSlice.actions.setCollapse;
exports.default = sidebarSlice.reducer;
