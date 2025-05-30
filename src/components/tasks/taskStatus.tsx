import { getTask, updateTask } from "@/api/tasks";
import { useTaskContext } from "@/context/taskContext";
import type { StatusType } from "@/types/tasks";
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from "@heroui/react";

export const statusList: { key: StatusType; label: StatusType }[] = [
	{ key: "Not Started", label: "Not Started" },
	{ key: "In Progress", label: "In Progress" },
	{ key: "Completed", label: "Completed" },
	// { key: "Inbox", label: "Inbox" },
];

export function TaskStatusSelect({ id, status }: { id: string; status: StatusType }) {
	const { task, setTask } = useTaskContext();

	return (
		<Select
			// radius="sm"
			className="w-[30%]"
			label=""
			selectedKeys={[status]}
			aria-label="status"
			onChange={async (e) => {
				const value = e.target.value;
				if (value !== "") {
					await updateTask(id, "status", value);
					task && setTask(await getTask(id));
				}
			}}>
			{statusList.map((status) => (
				<SelectItem key={status.key}>{status.label}</SelectItem>
			))}
		</Select>
	);
}

export function TaskStatusChip({ id, status }: { id: string; status: StatusType }) {
	const { task, setTask } = useTaskContext();

	return (
		<Dropdown>
			<DropdownTrigger className="w-fit">
				<Chip radius="sm" className="w-8">
					{status}
				</Chip>
			</DropdownTrigger>
			<DropdownMenu
				items={statusList}
				selectionMode="single"
				disallowEmptySelection={true}
				selectedKeys={[status]}
				onSelectionChange={async (keys) => {
					const value = keys.currentKey;
					if (value !== "") {
						// setTaskStatus(value as StatusType);
						await updateTask(id, "status", value);
						task && setTask(await getTask(id));
					}
				}}
				onClick={(e) => e.stopPropagation()} // Prevent closing drawer
			>
				{(status) => <DropdownItem key={status.key}>{status.label}</DropdownItem>}
			</DropdownMenu>
		</Dropdown>
	);
}
