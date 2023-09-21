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
			<div className="flex flex-wrap justify-center content-center w-full bg-neutral-100">
				<div className="flex flex-col w-4/5 my-28 gap-6">
					<div className=" text-4xl font-bold text-primary-500">
						Services
					</div>
					<div className="text-2xl font-medium">
						A leading smart waste management system
					</div>
					<div className=" text-xl text-[#555555]">
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Labore, placeat nulla magnam iure autem earum
						iusto incidunt nihil veritatis pariatur perspiciatis
						porro commodi perferendis sit iste blanditiis, eius
						corporis fuga!
					</div>
					<div className="flex flex-wrap md:justify-center lg:justify-start xl:flex-nowrap gap-5 md:gap-2">
						<div className="flex flex-col gap-2 bg-neutral-0 rounded-xl">
							<img src={bins} alt="smart bins" />
							<div className="flex flex-col w-full sm:w-4/5 md:w-96 gap-1 px-5 py-3 pb-7 rounded-xl">
								<div className="font-semibold text-xl">Smart Bins</div>
								<div className="font-medium">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quod, iusto ex? Sequi
									placeat amet doloremque obcaecati facere eum
									tenetur distinctio!
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-neutral-0 rounded-xl">
							<img src={dashboard} alt="dashboard" />
							<div className="flex flex-col w-full sm:w-4/5 md:w-96 gap-1 px-5 py-3 pb-7 rounded-xl">
								<div className="font-semibold text-xl">Customized Dashboard</div>
								<div className="font-medium">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quod, iusto ex? Sequi
									placeat amet doloremque obcaecati facere eum
									tenetur distinctio!
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-neutral-0 rounded-xl">
							<img src={app} alt="app" />
							<div className="flex flex-col w-full sm:w-4/5 md:w-96 gap-1 px-5 py-3 pb-7 rounded-xl">
								<div className="font-semibold text-xl">Mobile App</div>
								<div className="font-medium">
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quod, iusto ex? Sequi
									placeat amet doloremque obcaecati facere eum
									tenetur distinctio!
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
