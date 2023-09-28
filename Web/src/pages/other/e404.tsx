import React from "react";
import logo from "../../assets/logo/Logo-full.svg";
import Button from "../../components/base/button";
import { useNavigate } from "react-router-dom";

export default function E401Page() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-wrap flex-col justify-center content-center h-screen bg-neutral-50 font-poppins text-gunmetal">
			<div className="bg-neutral-0 p-10 rounded-md flex flex-wrap lg:flex-nowrap mx-10 max-w-md lg:max-w-none gap-5 drop-shadow-2xl">
				<div className="w-full max-w-md flex flex-col flex-wrap gap-10">
					<img src={logo} alt="" />
					<h1 className=" text-center text-2xl font-semibold">Sorry, the page you requested is not found!</h1>
					<Button label="Go Back" onClick={() => navigate(-1)} />
				</div>
			</div>
		</div>
	);
}
