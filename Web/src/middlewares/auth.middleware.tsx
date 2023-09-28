import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Token, User } from "../store/interfaces";

interface ProtectedRouteProps {
	path: string;
	element: React.ReactNode;
	roles: string[];
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

	let location = useLocation();

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	} else {
		if (
			props.roles &&
			props.roles.length > 0 &&
			user &&
			!props.roles.includes(user.user_type)
		) {
			return <Navigate to="/e401" state={{ from: location}} replace />
		}
	}

	return <>{props.element}</>;
}
