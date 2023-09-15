import React, { useState } from "react";
import Input from "../../components/base/input";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../../assets/logo/Logo-full.svg";
import authImage from "../../assets/images/auth-image.jpg";
import Button from "../../components/base/button";
import { sendRequest } from "../../configs/request";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
	const [authInfo, setAuthInfo] = useState({
		email: "",
		username: "",
		password: "",
		login_error: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const Login = async (): Promise<void> => {
		try {
			const response = await sendRequest({
				method: "POST",
				route: "auth/login",
				body: JSON.stringify(authInfo),
			});
			console.log(response);
			if (response.status === 200) {
				dispatch(setToken(response?.data?.token));
				dispatch(setUser(response?.data?.user));
				if(response.data.user.user_type === "1"){
					navigate("/admin/dashboard");
				} else if (response.data.user.user_type === "2"){
					navigate("/dashboard");
				}
			}
		} catch (err: any) {
			console.error(err);
			setAuthInfo({
				...authInfo, login_error: err.response.data.message,
			})
			
		}
	};

	const handleIdentifierChange = (e: string): void => {
		if (e.search("@") !== -1) {
			setAuthInfo({
				...authInfo,
				email: e,
				username: "",
			});
		} else {
			setAuthInfo({
				...authInfo,
				username: e,
				email: "",
			});
		}
	};

	const handlePasswordChange = (e: string): void => {
		setAuthInfo({
			...authInfo,
			password: e,
		});
	};

	return (
		<div className="flex flex-wrap flex-col justify-center content-center h-screen bg-neutral-50 font-poppins text-gunmetal">
			<div className="bg-neutral-0 p-10 rounded-md flex flex-wrap lg:flex-nowrap mx-10 max-w-md lg:max-w-none gap-5 drop-shadow-2xl">
				<div className="w-full max-w-sm flex flex-col flex-wrap gap-8">
					<img src={logo} alt="" />
					<h1 className=" text-center text-4xl font-bold">Login</h1>
					<div>
						<Input
							type="text"
							label="Email / Username"
							name="identifier"
							icon={<MdAlternateEmail />}
							onChange={(e) =>
								handleIdentifierChange(e.target.value)
							}
						/>
						<Input
							type="password"
							label="Password"
							name="password"
							error={authInfo.login_error}
							icon={<RiLockPasswordFill />}
							onChange={(e) =>
								handlePasswordChange(e.target.value)
							}
						/>
						<Button type="submit" label="Login" onClick={Login} />
					</div>
				</div>
				<div className="flex flex-wrap content-center w-0 lg:w-full">
					<img src={authImage} alt="" />
				</div>
			</div>
		</div>
	);
}
