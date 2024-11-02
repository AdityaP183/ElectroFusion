import { tempUser } from "@/lib/app-data";
import { UserRoles } from "@/types/component.type";
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const role: UserRoles = "vendor";

	// return tempUser.role === role ? children : <Navigate to="/login" replace />;
	return children;
};

export default ProtectedRoute;
