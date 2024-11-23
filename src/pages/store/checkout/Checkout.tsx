import { useState } from "react";
import { motion } from "framer-motion";
import CheckoutTab1 from "./CheckoutTab1";
import CheckoutTab2 from "./CheckoutTab2";
import CheckoutTab3 from "./CheckoutTab3";
import { PartyPopper, ReceiptText, Wallet } from "lucide-react";

export type Tabs = "tab1" | "tab2" | "tab3" | "complete";

const Checkout = () => {
	const [activeTab, setActiveTab] = useState<Tabs>("tab1");

	return (
		<div className="flex flex-col items-center w-full gap-10">
			<ol className="flex items-center w-1/2 mt-10 font-medium text-center">
				<li
					className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-5 ${
						activeTab === "tab1"
							? "after:border-border"
							: "after:border-green-500"
					}`}
				>
					<ReceiptText
						className={`w-8 h-8 ${
							activeTab === "tab1" ? "" : "text-green-500"
						}`}
					/>
				</li>
				<li
					className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-5 ${
						activeTab === "tab3" || activeTab === "complete"
							? "after:border-green-500"
							: "after:border-border"
					}`}
				>
					<Wallet
						className={`w-8 h-8 ${
							activeTab === "tab1"
								? "opacity-50"
								: activeTab === "tab2"
								? ""
								: "text-green-500"
						}`}
					/>
				</li>
				<li className="flex items-center">
					<PartyPopper
						className={`w-8 h-8 ${
							["tab1", "tab2"].includes(activeTab)
								? "opacity-50"
								: activeTab === "complete"
								? "text-green-500"
								: ""
						}`}
					/>
				</li>
			</ol>

			<div className="w-2/3">
				{/* Order Summary */}
				{activeTab === "tab1" && (
					<CheckoutTab1 setActiveTab={setActiveTab} />
				)}

				{/* Payment Method Confirmation */}
				{activeTab === "tab2" && (
					<CheckoutTab2 setActiveTab={setActiveTab} />
				)}

				{/* Order Confirmation */}
				{(activeTab === "tab3" || activeTab === "complete") && (
					<CheckoutTab3
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				)}
			</div>
		</div>
	);
};
export default Checkout;
