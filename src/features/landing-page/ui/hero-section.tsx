"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const Hero = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<div className="relative min-h-screen bg-black overflow-hidden">
			{/* Animated Grid Background */}
			<div className="absolute inset-0">
				<div
					className="absolute inset-0 opacity-5 animate-pulse"
					style={{
						backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			{/* Subtle Moving Particles */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-white/30 rounded-full"
						style={{
							top: `${20 + i * 30}%`,
							left: `${10 + i * 20}%`,
							animation: `float ${4 + i}s ease-in-out infinite`,
							animationDelay: `${i * 1.5}s`,
						}}
					/>
				))}
			</div>

			{/* Custom CSS for floating animation */}
			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px) translateX(0px);
						opacity: 0.3;
					}
					25% {
						transform: translateY(-10px) translateX(5px);
						opacity: 0.6;
					}
					50% {
						transform: translateY(-20px) translateX(-5px);
						opacity: 0.9;
					}
					75% {
						transform: translateY(-10px) translateX(10px);
						opacity: 0.6;
					}
				}
			`}</style>

			{/* Main Content */}
			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 lg:px-8">
				<div
					className={`text-center max-w-5xl mx-auto transition-all duration-1000 ease-out ${
						isLoaded
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-6"
					}`}
				>
					{/* Status Indicator */}
					<div className="flex items-center justify-center space-x-3 mb-12">
						<div className="w-2 h-2 bg-white rounded-full animate-pulse" />
						<span className="text-white/70 text-sm font-light tracking-widest uppercase">
							Available Now
						</span>
					</div>

					{/* Main Heading */}
					<div className="mb-8">
						<h1 className="text-4xl md:text-6xl lg:text-7xl font-thin text-white leading-tight tracking-tight mb-4">
							ElectroFusion
						</h1>
						<div className="w-24 h-px bg-white/30 mx-auto" />
					</div>

					{/* Tagline */}
					<div className="mb-12">
						<p className="text-lg md:text-xl font-light text-white/80 tracking-wide max-w-2xl mx-auto">
							Where premium electronics meet refined taste
						</p>
					</div>

					{/* Description */}
					<div className="mb-16 max-w-2xl mx-auto">
						<p className="text-base text-white/60 font-light leading-relaxed">
							Discover our curated selection of premium
							electronics. Each product represents the pinnacle of
							design and technology, chosen for those who
							appreciate excellence.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
						<button className="group px-8 py-3 bg-white text-black font-medium tracking-wide uppercase transition-all duration-300 hover:bg-white/90 hover:scale-105 rounded-xl">
							<div className="flex items-center space-x-2">
								<span>Shop Now</span>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
							</div>
						</button>

						<button className="px-8 py-3 border border-white/40 text-white font-medium tracking-wide uppercase transition-all duration-300 hover:border-white/70 hover:bg-white/5 rounded-xl">
							Explore Categories
						</button>
					</div>
				</div>

				{/* Corner Decorations */}
				<div className="absolute top-8 left-8 w-6 h-6 border-l border-t border-white/20" />
				<div className="absolute top-8 right-8 w-6 h-6 border-r border-t border-white/20" />
				<div className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-white/20" />
				<div className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-white/20" />
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
				<div className="flex flex-col items-center space-y-2">
					<div className="w-px h-6 bg-white/30" />
					<ChevronDown
						className="w-4 h-4 text-white/40 animate-bounce"
						style={{ animationDuration: "2s" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
