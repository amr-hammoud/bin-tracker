import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import app from "../../assets/images/app.png";
import bins from "../../assets/images/bins.png";
import dashboard from "../../assets/images/dashboard.png";
import logo from "../../assets/logo/logo-landing.svg";
import { MdClose } from "react-icons/md";
import { PiListBold } from "react-icons/pi";

export default function LandingPage() {
	const navigate = useNavigate();

	const [mobileNavbar, setMobileNavbar] = useState(true);

	return (
		<div className="scroll-smooth text-gunmetal">
			<div className="hero-background h-screen w-screen">
				{/* Small Screens Toggler */}
				<div className={`flex justify-between sm:hidden px-8 py-4 bg-neutral-0 bg-opacity-90 ${mobileNavbar && "hidden"}`}>
					<div
						className="flex flex-wrap justify-center content-center text-2xl
                          hover:cursor-pointer hover:text-primary-500"
            onClick={() => setMobileNavbar(true)}
					>
						<PiListBold />
					</div>
					<div className="flex flex-wrap justify-center content-center w-24">
						<img src={logo} alt="logo" />
					</div>
				</div>
        {/* Small Screens Navbar */}
				<div
					className={`flex flex-col fixed top-0 left-0 sm:hidden w-screen h-screen gap-10
                        px-16 py-4 bg-neutral-0 bg-opacity-90 justify-center content-center ${!mobileNavbar && "hidden"}`}
				>
					<div className="flex justify-end text-xl ">
						<div className="hover:cursor-pointer hover:text-primary-500"
            onClick={() => setMobileNavbar(false)}>
							<MdClose />
						</div>
					</div>
					<div className="flex flex-wrap justify-center content-center">
						<img src={logo} alt="logo" />
					</div>
					<div
						className="flex flex-col flex-wrap justify-center content-center gap-5 w-full 
                      text-lg text-center"
					>
						<div
							className="flex justify-center content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							Home
						</div>
						<div
							className="flex justify-center content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							Services
						</div>
						<div
							className="flex justify-center content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
						>
							About
						</div>
						<div
							className="flex justify-center content-center flex-wrap font-medium
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
				{/* Default Navbar */}
				<div className="hidden sm:flex fixed top-0 left-0 w-screen px-16 py-4 bg-neutral-0 bg-opacity-90 ">
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
