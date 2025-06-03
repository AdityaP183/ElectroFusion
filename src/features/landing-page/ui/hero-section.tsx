"use client";

import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function HeroSection() {
	return (
		<div
			className="relative my-10 flex h-screen mx-10 flex-col items-center justify-center overflow-hidden rounded-3xl"
		>
			{/* Product boxes */}
			<div
				className="absolute top-20 left-40 z-20 w-32 h-32 rounded-xl overflow-hidden shadow-lg rotate-3"
			>
				<Image
					src="/products/product1.jpg"
					alt="Product 1"
					fill
					className="object-cover"
				/>
			</div>

			<div
				className="absolute top-1/2 right-10 z-20 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
			>
				<Image
					src="/products/product2.jpg"
					alt="Product 2"
					fill
					className="object-cover"
				/>
			</div>

			<div
				className="absolute top-1/2 left-40 z-20 w-28 h-28 rounded-xl overflow-hidden shadow-lg"
			>
				<Image
					src="/products/product3.jpg"
					alt="Product 3"
					fill
					className="object-cover"
				/>
			</div>

			<div
				className="absolute top-80 right-24 z-20 w-28 h-28 rounded-xl overflow-hidden shadow-lg"
			>
				<Image
					src="/products/product4.jpg"
					alt="Product 4"
					fill
					className="object-cover"
				/>
			</div>

			{/* Main content */}
			<h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-white md:text-4xl lg:text-6xl">
				This is your life and it&apos;s ending one{" "}
				<span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
					moment
				</span>{" "}
				at a time.
			</h2>

			<p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
				You are not your job, you&apos;re not how much money you have in
				the bank...
			</p>

			<div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
				<button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700">
					Join the club
				</button>
				<button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/20">
					Read more
				</button>
			</div>

			<HeroSectionOverlay />
		</div>
	);
}

function HeroSectionOverlay() {
	return (
		<div className="absolute inset-0 z-10 h-full w-full bg-slate-900" />
	);
}
