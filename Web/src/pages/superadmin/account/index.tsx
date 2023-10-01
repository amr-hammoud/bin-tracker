import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Token, User, User_Password } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import toast, { Toaster } from "react-hot-toast";
import EditArea from "../../../components/base/editarea";
import { MdOutlineEdit } from "react-icons/md";
import Button from "../../../components/base/button";
import { sendRequest } from "../../../configs/request";
import { setUser } from "../../../store/authSlice";
import userDefault from "../../../assets/icons/user-default.svg";
import ModalComponent from "../../../components/base/modal";

export default function SuperAdminAccount() {
	const user: User | null = useSelector(
		(state: RootState) => state.auth.user
	);

	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
	);
	const [disabledInputs, setDisabledInputs] = useState({
		first_name: true,
		last_name: true,
		email: true,
		username: true,
		password: true,
		button: true,
	});

	const [profileDetails, setProfileDetails] = useState<User_Password>({
		_id: user?._id ? user?._id : "",
		first_name: user?.first_name ? user?.first_name : "",
		last_name: user?.last_name ? user?.last_name : "",
		email: user?.email ? user?.email : "",
		username: user?.username ? user?.username : "",
		password: "",
		image: user?.image ? user.image : userDefault,
	});

	const dispatch = useDispatch();

	const getProfile = async () => {
		try {
			const response = await sendRequest({
				route: `users/${user?._id}`,
				token,
			});

			if (response.status === 200) {
				setProfileDetails(response.data);
				setDisabledInputs({
					...disabledInputs,
					first_name: true,
					last_name: true,
					email: true,
					username: true,
					password: true,
					button: true,
				});

				dispatch(setUser(response?.data));
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	const handleButtonAvailability = (key: string, value: string) => {
		const userValue = user ? user[key as keyof User] : "";

		const isDisabled = value === userValue;

		setDisabledInputs({
			...disabledInputs,
			button: isDisabled,
		});
	};

	const [customUserType, setCustomUserType] = useState<string>("");
	useEffect(() => {
		if (user?.user_type === "1") {
			setCustomUserType("Super Admin");
		} else if (user?.user_type === "2") {
			setCustomUserType("Admin");
		} else if (user?.user_type === "3") {
			setCustomUserType("Driver");
		}
	}, [user?.user_type]);

	const updateProfile = async () => {
		const { _id, ...restData } = profileDetails;

		try {
			const response = await sendRequest({
				method: "PUT",
				route: `users/profile`,
				body: restData,
				token,
			});

			if (response.status === 200) {
				toast.success("Profile updated successfully", {
					duration: 2500,
				});
				getProfile();
			} else {
				toast.error("Couldn't Update, Try Again", { duration: 4000 });
			}
		} catch (err: any) {
			console.error(err);
			toast.error("Couldn't Update, Try Again", { duration: 2500 });
		}
	};

	const [createModalState, setCreateModalState] = useState<boolean>(false);

	const activateImageModal = () => {
		setCreateModalState(true); 
	};

	const imageInput = useRef<HTMLInputElement>(null);

	const handleImageSelect = (e: any) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (event) {
				const image = event.target ? event.target.result : ""
				if(image && image !== "" && typeof image === "string"){				
				
				setProfileDetails({
					...profileDetails,
					image: image,
				})};
			};
			reader.readAsDataURL(file);
		}
	};

	
	const updateImage = async () => {
		const { image } = profileDetails;

		try {
			const response = await sendRequest({
				method: "PUT",
				route: `users/image`,
				body: {image: image},
				token,
			});

			if (response.status === 200) {
				toast.success("Image updated successfully", {
					duration: 2500,
				});
				getProfile();
			} else {
				toast.error("Couldn't Update, Try Again", { duration: 4000 });
			}
		} catch (err: any) {
			console.error(err);
			toast.error("Couldn't Update, Try Again", { duration: 2500 });
		}
	};

	return (
		<div className="flex">
			<Sidebar
				items={["Dashboard", "Users", "Groups", "Account"]}
				selected="Account"
			/>
			<div
				className={`flex flex-col w-full ${
					collapse ? "ml-20" : "ml-52"
				}`}
			>
				<Navbar label="Account" />
				<div>
					<Toaster />
				</div>
				<ModalComponent
					showModal={createModalState}
					onRequestClose={() =>
						setCreateModalState(!createModalState)
					}
				>
					<div className="text-xl">Edit Image</div>
					<div className="flex flex-col flex-wrap justify-center content-center gap-3 w-fit">
						<div>
							<input
								ref={imageInput}
								className="baseInput"
								type="file"
								name="picture"
								id="picture"
								hidden
								onChange={(e) => handleImageSelect(e)}
							/>
							<Button
								label="Select Image"
								onClick={() =>
									imageInput.current
										? imageInput.current.click()
										: console.log("")
								}
							/>
						</div>
						<div>
							<img
								className="w-80 h-80 rounded-full object-cover"
								src={profileDetails.image ? profileDetails.image : userDefault}
								alt=""
							/>
						</div>
					</div>
					<div className="flex w-full justify-center gap-10 mt-5">
						<Button
							label="Cancel"
							color="text-gunmetal"
							bgColor="bg-neutral-100"
							hoverColor="hover:bg-neutral-600"
							onClick={() => setCreateModalState(false)}
						/>
						<Button
							label="Update"
							bgColor="bg-primary-500"
							hoverColor="hover:bg-primary-700"
							onClick={() => {updateImage(); setCreateModalState(false);}}
						/>
					</div>
				</ModalComponent>
				<div className="flex flex-col flex-wrap content-center justify-center py-20 px-3">
					<div className="flex flex-wrap content-center gap-10">
						<div className="relative flex aspect-square">
							<img
								src={user?.image ? user?.image : userDefault}
								className="w-48 h-48 rounded-full object-cover"
								alt="profile"
							/>
							<div
								className="absolute bottom-2 right-2 p-3 text-2xl rounded-full
											bg-primary-500 text-neutral-0
											hover:bg-primary-700 hover:cursor-pointer"
								onClick={activateImageModal}
							>
								<MdOutlineEdit />
							</div>
						</div>
						<div className="flex flex-col justify-center gap-5 text-xl">
							<div>{`${user?.first_name} ${user?.last_name}`}</div>
							<div>@{user?.username}</div>
							<div>{customUserType}</div>
						</div>
					</div>
					<hr className="my-10" />
					<div className="flex flex-col w-4/5 gap-6">
						<div className="flex flex-wrap md:flex-nowrap gap-5 w-full">
							<div className=" w-full md:w-80">
								<EditArea
									label="First Name"
									value={profileDetails.first_name}
									disabled={disabledInputs.first_name}
									enabler={() => {
										setDisabledInputs({
											...disabledInputs,
											first_name: false,
										});
									}}
									onChange={(e) => {
										setProfileDetails({
											...profileDetails,
											first_name: e.target.value,
										});
										handleButtonAvailability(
											"first_name",
											e.target.value
										);
									}}
								/>
							</div>
							<div className=" w-full md:w-80">
								<EditArea
									label="Last Name"
									disabled={disabledInputs.last_name}
									value={profileDetails.last_name}
									enabler={() => {
										setDisabledInputs({
											...disabledInputs,
											last_name: false,
										});
									}}
									onChange={(e) => {
										setProfileDetails({
											...profileDetails,
											last_name: e.target.value,
										});
										handleButtonAvailability(
											"last_name",
											e.target.value
										);
									}}
								/>
							</div>
							<div className=" w-full md:w-80">
								<EditArea
									label="Username"
									disabled={disabledInputs.username}
									value={profileDetails.username}
									enabler={() => {
										setDisabledInputs({
											...disabledInputs,
											username: false,
										});
									}}
									onChange={(e) => {
										setProfileDetails({
											...profileDetails,
											username: e.target.value,
										});
										handleButtonAvailability(
											"username",
											e.target.value
										);
									}}
								/>
							</div>
						</div>
						<div className="flex flex-wrap md:flex-nowrap gap-5 w-full">
							<div className=" w-full md:w-80">
								<EditArea
									label="Email"
									disabled={disabledInputs.email}
									value={profileDetails.email}
									enabler={() => {
										setDisabledInputs({
											...disabledInputs,
											email: false,
										});
									}}
									onChange={(e) => {
										setProfileDetails({
											...profileDetails,
											email: e.target.value,
										});
										handleButtonAvailability(
											"email",
											e.target.value
										);
									}}
								/>
							</div>
							<div className=" w-full md:w-80">
								<EditArea
									label="Password"
									disabled={disabledInputs.password}
									placeholder="********"
									value={profileDetails.password}
									enabler={() => {
										setDisabledInputs({
											...disabledInputs,
											password: false,
										});
									}}
									onChange={(e) => {
										setProfileDetails({
											...profileDetails,
											password: e.target.value,
										});
										handleButtonAvailability(
											"password",
											e.target.value
										);
									}}
								/>
							</div>
						</div>

						<div className="flex justify-end content-center mt-8">
							<div
								className="flex content-center flex-wrap h-10 rounded-md font-semibold
                                text-neutral-0"
								onClick={() => updateProfile()}
							>
								<Button
									label="Save"
									disabled={disabledInputs.button}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
