import fusionStore from "@/stores/userStore";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<PropsWithChildren<{ requiredRole: string }>> = ({
	children,
	requiredRole,
}) => {
	const { user } = fusionStore();

	if (!user || user.user_metadata.role !== requiredRole)
		return <Navigate to="/not-found?type=unauthorized" replace />;
	return children || <Outlet />;
};

export default ProtectedRoute;
