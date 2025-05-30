import { updateTask } from "@/api/tasks";
import type { StatusType } from "@/types/types";
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export const statusList: { key: StatusType; label: StatusType }[] = [
	{ key: "Not Started", label: "Not Started" },
	{ key: "In Progress", label: "In Progress" },
	{ key: "Completed", label: "Completed" },
	{ key: "Inbox", label: "Inbox" },
];

export function TaskStatusSelect({ id, status }: { id: string; status: StatusType }) {
	const [taskStatus, setTaskStatus] = useState(status);

	return (
		<Select
			// radius="sm"
			className="w-[30%]"
			label=""
			selectedKeys={[taskStatus]}
			aria-label="status"
			onChange={async (e) => {
				const value = e.target.value;
				if (value !== "") {
					setTaskStatus(value as StatusType);
					// updateTask(id, "status", value);
					await updateTask(id, "status", value);
				}
			}}>
			{statusList.map((status) => (
				<SelectItem key={status.key}>{status.label}</SelectItem>
			))}
		</Select>
	);
}

export function TaskStatusChip({ id, status }: { id: string; status: StatusType }) {
	const [taskStatus, setTaskStatus] = useState(status);

	return (
		<Dropdown>
			<DropdownTrigger className="w-fit">
				<Chip radius="sm" className="w-8">
					{taskStatus}
				</Chip>
			</DropdownTrigger>
			<DropdownMenu
				items={statusList}
				selectionMode="single"
				disallowEmptySelection={true}
				selectedKeys={[taskStatus]}
				onSelectionChange={async (keys) => {
					const value = keys.currentKey;
					if (value !== "") {
						setTaskStatus(value as StatusType);
						await updateTask(id, "status", value);
					}
				}}
				onClick={(e) => e.stopPropagation()} // Prevent closing drawer
			>
				{(status) => <DropdownItem key={status.key}>{status.label}</DropdownItem>}
			</DropdownMenu>
		</Dropdown>
	);
}
