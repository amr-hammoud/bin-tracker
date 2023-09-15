import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { User } from "../../../store/interfaces";

export default function SuperAdminUsers() {
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

	return (
		<div>
			<h1>Admin Users</h1>
			<h2>
				Hello {user?.first_name} {user?.last_name}
			</h2>
		</div>
	);
}
