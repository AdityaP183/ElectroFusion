import { tempUser } from "@/lib/app-data";
import { fusionStore } from "@/store/store";
import { UserRoles } from "@/types/component.type";
import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const role: UserRoles = "vendor";
	// const {user} = fusionStore();

	// return tempUser.role === role ? children : <Navigate to="/login" replace />;
	return children;
};

export default ProtectedRoute;
