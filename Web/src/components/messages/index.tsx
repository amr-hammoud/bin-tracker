import React, { useState, useEffect } from "react";
import { Message } from "../../store/interfaces";
import { format, parseISO } from "date-fns";
import userDefault from '../../assets/icons/user-default.svg'

interface MessageProps {
	message: Message;
	user_id: string;
}

export default function MessageComponent(props: MessageProps) {
	const updatedAtDate = parseISO(props.message.updatedAt);
	const formattedTime = format(updatedAtDate, "hh:mm a");

	const [isSender, setIsSender] = useState<boolean>(false);

	useEffect(() => {
		if (isSender) {
			setIsSender(true);
		} else {
			setIsSender(false);
		}
	}, [props.message]);

	return (
		<div
			className={`flex ${
				isSender
					? "justify-end animate__animated animate__slideInRight"
					: "justify-start animate__animated animate__slideInLeft"
			} w-full`}
		>
			<div
				className={`flex ${
					isSender
						? "flex-row-reverse"
						: ""
				} m-1`}
			>
				<div
					className={`flex flex-wrap justify-center content-center ${
						isSender
							? "border-l-2 pl-2 ml-4"
							: "border-r-2 pr-2 mr-4"
					} border-neutral-600`}
				>
					<img
						className="w-10 h-10 aspect-square object-cover rounded-full"
						src={props.message?.sender_id?.image ? props.message?.sender_id?.image : userDefault}
						alt=""
					/>
				</div>
				<div>
					<div className="text-sm text-gunmetal mb-1">
						{props.message.sender_id.username}
					</div>
					<div
						className={`flex text-sm p-2 rounded-md shadow-lg
                    ${
						isSender
							? "bg-primary-400 text-neutral-0"
							: "bg-neutral-0 text-gunmetal"
					} `}
					>
						<div>{props.message.content}</div>
					</div>
					<div className="flex justify-end text-xs text-gunmetal mt-1">
						{formattedTime}
					</div>
				</div>
			</div>
		</div>
	);
}
