import React, { PropsWithChildren } from "react";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import ScrollToTop from "./scroll-to-top";
const StoreLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="px-[10%] mb-16">
            <ScrollToTop />
            <Navbar />
			<main>{children || <Outlet />}</main>
            <Footer />
		</div>
	);
};

export default StoreLayout;
