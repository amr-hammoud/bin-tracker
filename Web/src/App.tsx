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
import E401Page from "./pages/other/e401";
import E404Page from "./pages/other/e404";
import ProtectedRoute from "./middlewares/auth.middleware";

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
								path="/sadmin/dashboard"
								element={
									<ProtectedRoute
										path="/admin/dashboard"
										element={<SuperAdminDashboard />}
										roles={["1"]}
									/>
								}
							/>

							<Route
								path="/sadmin/users"
								element={
									<ProtectedRoute
										path="/sadmin/users"
										element={<SuperAdminUsers />}
										roles={["1"]}
									/>
								}
							/>

							<Route
								path="/sadmin/groups"
								element={
									<ProtectedRoute
										path="/sadmin/groups"
										element={<SuperAdminGroups />}
										roles={["1"]}
									/>
								}
							/>

							<Route
								path="/sadmin/account"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<SuperAdminAccount />}
										roles={["1"]}
									/>
								}
							/>

							<Route
								path="/admin/dashboard"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminDashboard />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/bins"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminBins />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/map/:id?"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminMap />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/users"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminUsers />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/trucks"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminTrucks />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/announcements"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminAnnouncements />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/chats"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminChats />}
										roles={["2"]}
									/>
								}
							/>
							<Route
								path="/admin/account"
								element={
									<ProtectedRoute
										path="/sadmin/account"
										element={<AdminAccount />}
										roles={["2"]}
									/>
								}
							/>
							<Route path="/privacy-policy" element={""} />
							<Route path="/terms" element={""} />
							<Route path="/e401" element={<E401Page />} />
							<Route path="*" element={<E404Page />} />
							
						</Routes>
					</BrowserRouter>
				</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
