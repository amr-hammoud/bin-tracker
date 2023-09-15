import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import UsersPage from "./pages/users";
import { Provider } from "react-redux";
import store from "./store/store";
import SuperAdminDashboard from "./pages/superadmin/dashboard";
import SuperAdminUsers from "./pages/superadmin/users";
import SuperAdminGroups from "./pages/superadmin/groups";
import SuperAdminAccount from "./pages/superadmin/account";
import AdminDashboard from "./pages/admin/dashboard";

function App() {

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route path="/users" element={<UsersPage />} />
					<Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
					<Route path="/admin/users" element={<SuperAdminUsers />} />
					<Route path="/admin/groups" element={<SuperAdminGroups />} />
					<Route path="/admin/account" element={<SuperAdminAccount />} />
					<Route path="/dashboard" element={<AdminDashboard />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
