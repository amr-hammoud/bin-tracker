"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUser = exports.setToken = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    token: null,
    user: null,
};
const authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});
_a = authSlice.actions, exports.setToken = _a.setToken, exports.setUser = _a.setUser;
exports.default = authSlice.reducer;
