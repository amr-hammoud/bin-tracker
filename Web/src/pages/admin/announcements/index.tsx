import React, {
	useState,
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { User2, Token, Message } from "../../../store/interfaces";
import Sidebar from "../../../components/common/sidebar";
import Navbar from "../../../components/common/navbar";
import MessageComponent from "../../../components/messages";
import { sendRequest } from "../../../configs/request";
import { format, parseISO } from "date-fns";
import { IoSend } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
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

	const [rowCount, setRowCount] = useState(1);
	const [messageText, setMessageText] = useState<string>("");

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

	const handleTextareaChange = (text: string) => {
		setMessageText(text);
		const lines = text.split("\n");
		const lineCount = Math.min(5, lines.length);

		setRowCount(lineCount);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && e.ctrlKey && messageText !== "") {
			sendMessage();
			e.preventDefault();
		}
	};

	const sendMessage = async () => {
		try {
			const response = await sendRequest({
				method: "POST",
				route: `announcements`,
				body: { group_id: user.group_id, content: messageText.trim() },
				token,
			});

			if (response.status === 200) {
				setMessageText("");

			} else {
				toast.error("Couldn't Send, Try Again", { duration: 4000 });
			}
		} catch (err: any) {
			console.error(err);
			toast.error("Couldn't Send, Try Again", { duration: 2500 });
		}
	};

	const handleMessage = () => {};

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
				className={`flex flex-col w-full relative ${
					collapse ? "ml-20" : "ml-52"
				}`}
			>
				<Navbar label="Announcements" />
				<div>
					<Toaster />
				</div>
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
				<div className="sticky bottom-3 left-5 w-full flex flex-wrap flex-col justify-center content-center font-poppins h-fit my-1 text-gunmetal">
					<textarea
						className={`rounded-xl text-base w-11/12
									bg-neutral-0 border-primary-400 shadow-lg
									focus:ring-primary-500 focus:border-primary-500`}
						style={{ resize: "none" }}
						cols={30}
						rows={rowCount}
						value={messageText}
						placeholder="Enter: new line | Ctrl + Enter: send message"
						onChange={(e) => {
							handleTextareaChange(e.target.value);
						}}
						onKeyDown={(e) => handleKeyDown(e)}
					/>
					<div
						className="absolute right-16  rounded-full p-2 text-md bg-primary-500 text-neutral-0
									hover:bg-primary-700 hover:cursor-pointer"
						onClick={() => handleMessage()}
					>
						<IoSend />
					</div>
				</div>
			</div>
		</div>
	);
}
