import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo-landing.svg";

export default function LandingPage() {
	const navigate = useNavigate();


	return (
		<div className="scroll-smooth text-gunmetal">
			<div className="hero-background h-screen w-screen">
				{/* Default Navbar */}
				<div className="flex fixed top-0 left-0 w-screen px-16 py-4 bg-neutral-0 bg-opacity-90 ">
					<div>
						<img src={logo} alt="logo" />
					</div>
					<div
						className="flex w-full justify-center content-center gap-5
                                text-lg"
					>
						<div
							className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							Home
						</div>
						<div
							className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							Services
						</div>
						<div
							className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							About
						</div>
						<div
							className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							Contact Us
						</div>
					</div>
					<div className="flex justify-center content-center">
						<div
							className="flex content-center flex-wrap py-3 px-5 rounded-md font-semibold
                                text-neutral-0 bg-primary-500 hover:bg-primary-700
                                  hover:cursor-pointer"
							onClick={() => navigate("login")}
						>
							Login
						</div>
					</div>
				</div>
			</div>
			
		</div>
	);
}
