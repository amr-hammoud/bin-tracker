import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth";
import { Provider } from "react-redux";
import store from "./store/store";
import SuperAdminDashboard from "./pages/superadmin/dashboard";
import SuperAdminUsers from "./pages/superadmin/users";
import SuperAdminGroups from "./pages/superadmin/groups";
import SuperAdminAccount from "./pages/superadmin/account";
import AdminDashboard from "./pages/admin/dashboard";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import AdminBins from "./pages/admin/bins";
import AdminMap from "./pages/admin/map";
import AdminUsers from "./pages/admin/users";
import AdminTrucks from "./pages/admin/trucks";
import AdminAnnouncements from "./pages/admin/announcements";
import AdminChats from "./pages/admin/chats";
import AdminAccount from "./pages/admin/account";
import LandingPage from "./pages/landing";

function App() {
	const persistor = persistStore(store);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className=" font-poppins cursor-default">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/login" element={<AuthPage />} />
							<Route
								path="/admin/dashboard"
								element={<SuperAdminDashboard />}
							/>
							<Route
								path="/admin/users"
								element={<SuperAdminUsers />}
							/>
							<Route
								path="/admin/groups"
								element={<SuperAdminGroups />}
							/>
							<Route
								path="/admin/account"
								element={<SuperAdminAccount />}
							/>
							<Route
								path="/dashboard"
								element={<AdminDashboard />}
							/>
							<Route
								path="/bins"
								element={<AdminBins />}
							/>
							<Route
								path="/map"
								element={<AdminMap />}
							/>
							<Route
								path="/users"
								element={<AdminUsers />}
							/>
							<Route
								path="/trucks"
								element={<AdminTrucks />}
							/>
							<Route
								path="/announcements"
								element={<AdminAnnouncements />}
							/>
							<Route
								path="/chats"
								element={<AdminChats />}
							/>
							<Route
								path="/account"
								element={<AdminAccount />}
							/>
							<Route
								path="/privacy-policy"
								element={""}
							/>
							<Route
								path="/terms"
								element={""}
							/>
						</Routes>
					</BrowserRouter>
				</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
