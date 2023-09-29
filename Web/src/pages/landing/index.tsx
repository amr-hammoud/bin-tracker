import "./style.css";
import {
	FaFacebook,
	FaInstagram,
	FaLinkedinIn,
	FaYoutube,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { MdClose, MdMail, MdCall, MdSend } from "react-icons/md";
import { PiListBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import aboutImage from "../../assets/images/about-section.svg";
import map from "../../assets/images/map.png";
import bins from "../../assets/images/bins.png";
import dashboard from "../../assets/images/dashboard.png";
import Input from "../../components/base/input";
import logo from "../../assets/logo/logo-landing.svg";
import React, { useState } from "react";

export default function LandingPage() {
	const navigate = useNavigate();

	const [mobileNavbar, setMobileNavbar] = useState(true);

	const [contactForm, setContactForm] = useState({
		first_name: "",
		last_name: "",
		phone_number: "",
		email: "",
		company: "",
		location: "",
		inquiry: "",
	});

	const [emailSubscribe, setEmailSubscribe] = useState("");

	return (
		<div className="text-gunmetal">
			{/* Small Screens Navbar Toggler */}
			<div
				className={`flex justify-between sm:hidden fixed top-0 left-0 w-screen shadow-md px-8 py-4 bg-neutral-0 bg-opacity-90 z-20 ${
					mobileNavbar ? "hidden" : ""
				}`}
			>
				<div className="flex flex-wrap justify-center content-center w-24">
					<img src={logo} alt="logo" />
				</div>
				<div
					className="flex flex-wrap justify-center content-center text-2xl
                          			hover:cursor-pointer hover:text-primary-500"
					onClick={() => setMobileNavbar(true)}
				>
					<PiListBold />
				</div>
			</div>
			{/* Small Screens Navbar */}
			<div
				className={`flex flex-col fixed top-0 left-0 sm:hidden w-screen h-screen gap-10
                        px-16 py-4 bg-neutral-0 bg-opacity-90 justify-center content-center z-20 ${
							!mobileNavbar ? "hidden" : ""
						}`}
			>
				<div className="flex justify-end text-xl ">
					<div
						className="hover:cursor-pointer hover:text-primary-500"
						onClick={() => setMobileNavbar(false)}
					>
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
						<a href="#home">Home</a>
					</div>
					<div
						className="flex justify-center content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
					>
						<a href="#services">Services</a>
					</div>
					<div
						className="flex justify-center content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
					>
						<a href="#about">About</a>
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
			<div className="hidden sm:flex fixed top-0 left-0 w-screen px-16 py-4 shadow-md bg-neutral-0 bg-opacity-90 z-20">
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
						<a href="#home">Home</a>
					</div>
					<div
						className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
					>
						<a href="#services">Services</a>
					</div>
					<div
						className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
					>
						<a href="#about">About</a>
					</div>
					<div
						className="flex content-center flex-wrap font-medium
                                hover:text-primary-500 hover:cursor-pointer"
					>
						<a href="#contact">Contact us</a>
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
			{/* Hero Section */}
			<div
				className="flex flex-wrap justify-center content-center hero-background h-screen w-screen text-center"
				id="home"
			>
				<div className="black-overlay absolute opacity-60 bg-neutral-900 w-screen h-screen"></div>
				<div className="flex flex-col gap-6 z-10">
					<div className="text-primary-500 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
						Bin Tracker
					</div>
					<div className="text-neutral-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
						The Optimal Solution for <br />
						Smart Waste Management
					</div>
					<div className="flex justify-center content-center">
						<div
							className="flex content-center flex-wrap px-5 md:px-7 py-2 lg:py-3 lg:px-10 rounded-md font-semibold
                                text-neutral-0 bg-primary-500 hover:bg-primary-700
                                  hover:cursor-pointer"
						>
							<a href="#contact">Get Started</a>
						</div>
					</div>
				</div>
			</div>
			{/* Services Section */}
			<div
				className="flex flex-wrap justify-center content-center w-full bg-neutral-100"
				id="services"
			>
				<div className="flex flex-col w-4/5 my-28 gap-6">
					<div className=" text-4xl font-bold text-primary-500">
						Services
					</div>
					<div className="text-2xl font-medium">
						A leading smart waste management system
					</div>
					<div className=" text-xl text-[#555555]">
						Our Bin Tracker services revolutionize waste management
						through cutting-edge IoT technology and AI analysis. Say
						goodbye to overflowing bins and inefficient collection
						routes.
					</div>
					<div className="flex flex-wrap lg:flex-nowrap justify-center md:justify-center lg:justify-between gap-10">
						<div className="flex flex-col gap-2 bg-neutral-0 shadow-lg rounded-xl w-full lg:w-1/3">
							<img src={bins} alt="smart bins" />
							<div className="flex flex-col w-full gap-1 px-5 py-3 pb-7 rounded-xl">
								<div className="font-semibold text-xl">
									Smart Bins
								</div>
								<div className="font-medium">
									Our smart bins are equipped with advanced
									sensors that monitor fill levels in
									real-time. They reduce waste overflow, and
									save costs.
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-neutral-0 shadow-lg rounded-xl w-full lg:w-1/3">
							<img src={dashboard} alt="dashboard" />
							<div className="flex flex-col w-full gap-1 px-5 py-3 pb-7 rounded-xl">
								<div className="font-semibold text-xl">
									Customized Dashboard
								</div>
								<div className="font-medium">
									Access a user-friendly dashboard to
									visualize bin data. Monitor collection
									status, historical trends, and receive
									suggestions.
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-neutral-0 shadow-lg rounded-xl w-full lg:w-1/3">
							<img src={map} alt="map" />
							<div className="flex flex-col w-full gap-1 px-5 py-3 pb-7 rounded-xl">
								<div className="font-semibold text-xl">
									Interactive Map
								</div>
								<div className="font-medium">
									Track your bins on a real-time interactive
									map. Know exactly where your bins are
									located, their fill levels, and optimize
									collection routes effortlessly.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* About Section */}
			<div
				className="about-section relative flex flex-wrap justify-center w-full bg-neutral-0"
				id="about"
			>
				<div className="flex flex-col w-4/5 my-28 gap-10">
					<div className=" text-4xl font-bold text-primary-500">
						About
					</div>
					<div className="text-2xl font-medium">
						A leading smart waste management system
					</div>
					<div className=" text-xl">
						At Bin Tracker, we're on a mission to transform
						traditional waste management into a smart, data-driven
						solution. Our commitment to innovation and
						sustainability drives us forward.
					</div>
					<div className="flex gap-10">
						<div className="flex flex-wrap content-center text-9xl w-44 font-bold text-primary-500">
							01
						</div>
						<div className=" w-2/5 text-xl text-justify">
							Bin Tracker was born out of a desire to address the
							challenges of modern waste management. Traditional
							methods often lead to inefficient collection,
							increased operational costs, and environmental
							impact. With our IoT-based system, we've harnessed
							the power of technology to create a smarter, more
							sustainable way to manage waste.
						</div>
					</div>
					<div className="flex gap-10">
						<div className="flex flex-wrap content-center text-9xl w-44 font-bold text-primary-500">
							02
						</div>
						<div className=" w-2/5 text-xl text-justify">
							Our team is passionate about sustainability and
							innovation. We're dedicated to pushing the
							boundaries of what's possible in waste management.
							Whether you're a municipality looking to optimize
							your collection routes or a business aiming to
							reduce its ecological footprint, Bin Tracker is your
							partner in achieving these goals.
						</div>
					</div>
				</div>
				<div className="about-section-image-mobile flex justify-end md:hidden h-fit w-full">
					<img src={aboutImage} alt="garbage truck track" />
				</div>
				<div className="about-section-image hidden md:block absolute bottom-0 right-0 h-fit w-full">
					<img src={aboutImage} alt="garbage truck track" />
				</div>
			</div>
			{/* Contact us Section */}
			<div
				className="z-10 relative flex flex-wrap justify-center content-center w-full bg-neutral-100"
				id="contact"
			>
				<div className="flex flex-col w-4/5 my-28 gap-6">
					<div className=" text-4xl font-bold text-primary-500">
						Contact us
					</div>
					<div className="flex flex-wrap md:flex-nowrap gap-5 w-full">
						<div className=" w-full md:w-1/3">
							<Input
								label="First Name"
								placeholder="first name"
								required={true}
								onChange={(e) => {
									setContactForm({
										...contactForm,
										first_name: e.target.value,
									});
								}}
							/>
						</div>
						<div className=" w-full md:w-1/3">
							<Input
								label="Last Name"
								placeholder="surname"
								required={true}
								onChange={(e) => {
									setContactForm({
										...contactForm,
										last_name: e.target.value,
									});
								}}
							/>
						</div>
						<div className=" w-full md:w-1/3">
							<Input
								label="Phone Number"
								type="tel"
								placeholder="number"
								required={true}
								onChange={(e) => {
									setContactForm({
										...contactForm,
										phone_number: e.target.value,
									});
								}}
							/>
						</div>
					</div>
					<div className="flex flex-wrap md:flex-nowrap gap-5 w-full">
						<div className=" w-full md:w-1/3">
							<Input
								label="Email"
								placeholder="example@email.com"
								required={true}
								onChange={(e) => {
									setContactForm({
										...contactForm,
										email: e.target.value,
									});
								}}
							/>
						</div>
						<div className=" w-full md:w-1/3">
							<Input
								label="Company"
								placeholder="company name"
								required={true}
								onChange={(e) => {
									setContactForm({
										...contactForm,
										company: e.target.value,
									});
								}}
							/>
						</div>
						<div className=" w-full md:w-1/3">
							<Input
								label="Location"
								placeholder="City, Country"
								required={true}
								onChange={(e) => {
									setContactForm({
										...contactForm,
										location: e.target.value,
									});
								}}
							/>
						</div>
					</div>
					{/* Text Area */}
					<div className="flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 text-gunmetal">
						<div className=" text-sm flex content-center gap-1">
							<div className=" flex content-center flex-wrap">
								Inquiry<span className=" text-red-500">*</span>
							</div>
						</div>
						<textarea
							className={`rounded w-full text-base
									bg-neutral-50 border-neutral-700
									focus:ring-primary-500 focus:border-primary-500`}
							cols={30}
							rows={10}
							placeholder="How can we help you?"
							onChange={(e) => {
								setContactForm({
									...contactForm,
									inquiry: e.target.value,
								});
							}}
						/>
					</div>
					<div className="flex justify-end content-center mt-8">
						<div
							className="flex content-center flex-wrap px-5 md:px-7 py-2 lg:py-3 lg:px-10 rounded-md font-semibold
                                text-neutral-0 bg-primary-500 hover:bg-primary-700
                                  hover:cursor-pointer"
						>
							Submit
						</div>
					</div>
				</div>
			</div>
			{/* Footer Section */}
			<div className="z-10 flex flex-wrap justify-center content-center w-full bg-gunmetal text-neutral-0">
				<div className="flex flex-wrap md:flex-nowrap w-4/5 my-28 gap-6">
					<div className="flex flex-col gap-3 w-full md:w-1/3">
						<div>
							At Bin Tracker, our mission is to make waste
							management smarter and more efficient. Through the
							integration of IoT technology and AI analysis, we're
							committed to helping communities and businesses
							reduce waste, cut costs, and build a cleaner,
							sustainable future.
						</div>
						<a
							href="mailto:info@bintracker.com"
							className="flex gap-3 flex-wrap content-center text-md hover:text-primary-500"
						>
							<div className="flex gap-3 flex-wrap content-center">
								<MdMail />
							</div>
							<div className="">info@bintracker.com</div>
						</a>
						<a
							href="tel:+96176123123"
							className="flex gap-3 flex-wrap content-center text-md hover:text-primary-500"
						>
							<div className="flex gap-3 flex-wrap content-center">
								<MdCall />
							</div>
							<div>+961 76 123 123</div>
						</a>
					</div>
					<div className="flex flex-col gap-2 w-full md:w-1/3">
						<div className="text-lg font-bold">Pages</div>
						<div>
							<a
								className="hover:cursor-pointer hover:text-primary-500"
								href="#home"
							>
								Home
							</a>
						</div>
						<div>
							<a
								className="hover:cursor-pointer hover:text-primary-500"
								href="#services"
							>
								Services
							</a>
						</div>
						<div>
							<a
								className="hover:cursor-pointer hover:text-primary-500"
								href="#about"
							>
								About
							</a>
						</div>
						<div>
							<a
								className="hover:cursor-pointer hover:text-primary-500"
								href="#contact"
							>
								Contact us
							</a>
						</div>
						<div>
							<div
								className="w-fit hover:cursor-pointer hover:text-primary-500"
								onClick={() => navigate("/privacy-policy")}
							>
								Privacy Policy
							</div>
						</div>
						<div>
							<div
								className="w-fit hover:cursor-pointer hover:text-primary-500"
								onClick={() => navigate("/terms")}
							>
								Terms & Conditions
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-8 w-full md:w-1/3">
						<div className="flex flex-col gap-2">
							<div className="text-lg font-bold">Follow us</div>
							<div className="flex gap-3 text-lg">
								<div className="hover:cursor-pointer hover:text-primary-500">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://facebook.com/bintracker"
									>
										<FaFacebook />
									</a>
								</div>
								<div className="hover:cursor-pointer hover:text-primary-500">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://instagram.com/bintracker"
									>
										<FaInstagram />
									</a>
								</div>
								<div className="hover:cursor-pointer hover:text-primary-500">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://x.com/bintracker"
									>
										<RiTwitterXFill />
									</a>
								</div>
								<div className="hover:cursor-pointer hover:text-primary-500">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://linkedin.com/in/bintracker"
									>
										<FaLinkedinIn />
									</a>
								</div>
								<div className="hover:cursor-pointer hover:text-primary-500">
									<a
										target="_blank"
										rel="noreferrer"
										href="https://youtube.com/bintracker"
									>
										<FaYoutube />
									</a>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-lg font-bold">Subscribe</div>
							<div>Stay updated with the latest news</div>
							<div className="flex gap-5">
								<Input
									placeholder="Email"
									onChange={(e) => {
										setEmailSubscribe(e.target.value);
									}}
								/>
								<div className="flex flex-wrap justify-center content-center">
									<div className="bg-primary-500 w-fit p-3 rounded-full hover:cursor-pointer hover:bg-primary-700">
										<MdSend />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center py-3 w-full bg-primary-500 text-neutral-0">
				Bin Tracker - Revolutionizing Waste Management with IoT and AI.
				&copy; 2023. All rights reserved
			</div>
		</div>
	);
}
