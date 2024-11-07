import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
	const [isScrolling, setIsScrolling] = useState<boolean>(false);

	const handleHalfScreenScroll = () => {
		if (window.scrollY > window.innerHeight / 2) {
			setIsScrolling(true);
		} else {
			setIsScrolling(false);
		}
		console.log(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleHalfScreenScroll);
		return () => {
			window.removeEventListener("scroll", handleHalfScreenScroll);
		};
	}, []);

	return (
		<>
			<AnimatePresence>
				{isScrolling ? <NavFloat /> : <NavButton />}
			</AnimatePresence>
			<div className="w-full h-[200vh] relative flex flex-col justify-between">
				<div className="flex flex-col items-center justify-center w-full h-screen gap-3 bg-gradient-to-r from-purple-500 to-fuchsia-700">
					<h1 className="text-5xl font-bold font-ox">
						Lorem ipsum dolor sit amet consectetur adipisicing.
					</h1>
					{/* <motion.nav
					className={`flex items-center justify-between gap-10 px-8 py-2 w-fit z-10 ${
						isScrolling
                        ? "fixed top-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 glass"
                        : "block"
                        }`}
                        animate={{
                            width: isScrolling ? "fit-content" : "200px",
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
					{isScrolling && (
						<div className="flex items-center h-5 space-x-4 text-sm">
							<div>Blog</div>
							<Separator
                            orientation="vertical"
                            className="bg-gray-400"
							/>
							<div>Docs</div>
							<Separator
                            orientation="vertical"
                            className="bg-gray-400"
							/>
							<div>Source</div>
                            </div>
                            )}
                            <Button>
                            Get Started
                            <ArrowRight />
                            </Button>
                            </motion.nav> */}
				</div>
				<div className="w-full h-screen bg-gradient-to-r from-rose-500 to-red-700"></div>
			</div>
		</>
	);
};
export default Home;

const NavButton = () => {
	return (
		<nav className="fixed z-10 flex justify-between w-full px-8 py-2 top-4">
			<div className="flex items-center gap-2 text-white">
				<svg
					className="rotate-180"
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"
					></path>
				</svg>
				<p className="text-xl text-white">Diagram</p>
			</div>
			<ul className="flex items-center text-white/50">
				<li className="px-2 text-md ">
					<Link to={"/pods"}>Magician</Link>
				</li>
				<li className="px-2 text-md">
					<Link to={"/"}>Genius</Link>
				</li>
				<li className="px-2 text-md">
					<Link to={"/"}>Animator</Link>
				</li>
				<li className="px-2 text-md">
					<Link to={"/"}>UI-AI</Link>
				</li>
			</ul>
			<div className="px-4 py-2 ml-2 text-white bg-black rounded-full text-md ">
				<Link to={"/"}>Login</Link>
			</div>
		</nav>
	);
};

const NavFloat = () => {
	return (
		<motion.nav
			key={1}
			initial="initial"
			animate="animate"
			exit="exit"
			variants={NavAnimations}
			className="fixed z-10 flex justify-between px-4 py-2 rounded-full ts-bg left-1/2 top-10"
		>
			<ul className="flex items-center">
				<li className="px-2 text-white text-md">
					<Link to={"/pods"}>Magician</Link>
				</li>
				<li className="px-2 text-white text-md">
					<Link to={"/"}>Genius</Link>
				</li>
				<li className="px-2 text-white text-md">
					<Link to={"/"}>Animator</Link>
				</li>
				<li className="px-2 text-white text-md">
					<Link to={"/"}>UI-AI</Link>
				</li>
				<li className="px-4 py-2 ml-2 text-white bg-black rounded-full text-md ">
					<Link to={"/"}>Login</Link>
				</li>
			</ul>
		</motion.nav>
	);
};

const NavAnimations = {
	initial: {
		y: -50,
		x: "-50%",
		opacity: 0,
	},
	animate: {
		y: 0,
		x: "-50%",
		opacity: 1,
		transition: {
			type: "spring",
			damping: 10,
			stiffness: 100,
		},
	},
	exit: {
		y: -50,
		opacity: 0,
	},
};
