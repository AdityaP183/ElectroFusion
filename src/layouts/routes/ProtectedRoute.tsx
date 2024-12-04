import React, { PropsWithChildren } from "react";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
	// const role: UserRoles = "vendor";
	// const {user} = fusionStore();

	// return tempUser.role === role ? children : <Navigate to="/login" replace />;
	return children;
};

export default ProtectedRoute;
