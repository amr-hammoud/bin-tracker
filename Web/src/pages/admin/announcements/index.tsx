import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { User2, Token, Message } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import MessageComponent from "../../../components/messages";
import { sendRequest } from "../../../configs/request";
import { format, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

interface GroupedAnnouncements {
	[date: string]: Message[];
}

export default function AdminAnnouncements() {
	const token: Token | null = useSelector(
		(state: RootState) => state.auth.token
	);

	const user: User2 = useSelector(
		(state: RootState) => state.auth.user as User2
	);

	const collapse: boolean = useSelector(
		(state: RootState) => state.sidebar.collapse
	);

	const [announcements, setAnnouncements] = useState<Message[]>([]);
	const [groupedAnnouncements, setGroupedAnnouncements] =
		useState<GroupedAnnouncements>({});

	const getMessages = async () => {
		try {
			const response = await sendRequest({
				route: `announcements/${user.group_id}`,
				token,
			});
			if (response.status === 200) {
				setAnnouncements(response.data);
				console.log(response);
			}
		} catch (err: any) {
			console.error(err);
		}
	};

	useEffect(() => {
		getMessages();
	}, []);

	useEffect(() => {
		const grouped: GroupedAnnouncements = {};
		announcements.forEach((message) => {
			const date = parseISO(message.createdAt);

			const formattedDate = format(date, "MMMM dd, yyyy");
			if (!grouped[formattedDate]) {
				grouped[formattedDate] = [];
			}
			grouped[formattedDate].push(message);
		});
		setGroupedAnnouncements(grouped);
	}, [announcements]);

	return (
		<div className="flex">
			<Sidebar
				items={[
					"Dashboard",
					"Bins",
					"Map",
					"Users",
					"Trucks",
					"Announcements",
					"Chats",
					"Account",
				]}
				selected="Announcements"
			/>
			<div
				className={`flex flex-col w-full ${
					collapse ? "ml-20" : "ml-52"
				}`}
			>
				<Navbar label="Announcements" />
				<div className="p-5 bg-neutral-100 h-full">
					{Object.keys(groupedAnnouncements).map((date) => (
						<div key={date}>
							<div className=" flex justify-center w-full mt-5 mb-2">
								<div className="text-center text-xs bg-neutral-700 px-2 py-1 rounded-full text-neutral-0">
									{date}
								</div>
							</div>
							{groupedAnnouncements[date].map(
								(message, index) => (
									<MessageComponent
										key={index}
										message={message}
										user_id={user._id}
									/>
								)
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
