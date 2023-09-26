import React from "react";
import { Message } from "../../store/interfaces";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

interface MessageProps {
	message: Message;
	user_id: string;
}

export default function MessageComponent(props: MessageProps) {
	const updatedAtDate = parseISO(props.message.updatedAt);
	const formattedTime = format(updatedAtDate, "hh:mm a");

	return (
		<div
			className={`flex ${
				props.message.sender_id._id === props.user_id
					? "justify-end"
					: "justify-start"
			} w-full`}
		>
			<div className="my-1 mx-1">
				<div className="text-sm text-gunmetal mb-1">
					{props.message.sender_id.username}
				</div>
				<div
					className={`flex text-sm p-2 rounded-md shadow-lg
                    ${
						props.message.sender_id._id === props.user_id
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
	);
}
