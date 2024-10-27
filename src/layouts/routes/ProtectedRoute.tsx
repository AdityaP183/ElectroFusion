import { UserRoles } from "@/types/pages.types";
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const role: UserRoles = "admin";

	return role ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
