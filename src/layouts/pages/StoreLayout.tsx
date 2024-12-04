import { Outlet } from "react-router-dom";

const StoreLayout: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	return (
		<div className="px-[10%] mb-16">
			{/* If children are passed directly, render them; otherwise, render the Outlet */}
			{children || <Outlet />}
		</div>
	);
};
export default StoreLayout;
