import { Route, Routes } from "react-router-dom";
import StoreLayout from "../pages/StoreLayout";
import { Home } from "@/pages/common";

const StoreRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<StoreLayout />}>
				<Route index element={<Home />} />

				{/* <Route path="*" element={<NotFound />} /> */}
			</Route>
		</Routes>
	);
};
export default StoreRoutes;
