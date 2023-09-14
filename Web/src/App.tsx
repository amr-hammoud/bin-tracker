import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import UsersPage from "./pages/users";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route path="/users" element={<UsersPage />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
