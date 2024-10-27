import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center w-full h-full gap-3 mt-11">
			<div className="w-[40%] mx-auto">
				<img
					src="/not-found.svg"
					alt="Not Found"
					className="aspect-square"
				/>
			</div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full max-w-md gap-3 p-2 overflow-hidden bg-opacity-50 shadow-xl bg-secondary backdrop-filter backdrop-blur-xl rounded-2xl"
			>
				<h1>Seem's like we can't find what you're looking for</h1>  
				<Button asChild>
					<Link to="/admin">Go Home</Link>
				</Button>
			</motion.div>
		</div>
	);
};

export default NotFound;
