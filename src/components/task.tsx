import { Card, CardBody } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import { useState } from "react";

import { Select, SelectItem } from "@heroui/select";
import type { Task, StatusType } from "@/types/types";
import { useTaskStore } from "@/store/tasksStore";
import { X } from "lucide-react";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
// interface TaskProps extends DetailProps {
// 	taskStatus: TaskStatusType;
// }

export default function Task({
	id,
	completed,
	title,
	description,
	status,
}: Task) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
	});

	const style = transform
		? { transform: CSS.Translate.toString(transform), width: "20dvw" }
		: undefined;

	const [isCompleted, setIsCompleted] = useState(completed);

	const updateTask = useTaskStore((state) => state.updateTask);
	const removeTask = useTaskStore((state) => state.removeTask);

	return (
		<div
			id={id}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={style}
			className="z-4">
			<Card className="bg-white">
				{/* <CardHeader></CardHeader> */}
				<CardBody>
					<div className="flex gap-2 items-center">
						<Checkbox
							lineThrough
							isSelected={isCompleted}
							onValueChange={(state) => {
								setIsCompleted(state);
								updateTask(id, "completed", state);
							}}></Checkbox>
						<div className="grid gap-2 items-center h-full">
							<h1
								className={
									"text-lg " +
									(isCompleted
										? "line-through text-foreground"
										: "")
								}>
								{title}
							</h1>
							{description && (
								<p className={"text-sm text-foreground"}>
									{description}
								</p>
							)}
						</div>
						<TaskType id={id} status={status} />
						<X
							className="w-4 h-4"
							onClick={() => {
								removeTask(id);
							}}
						/>
					</div>
				</CardBody>
				{/* <CardFooter></CardFooter> */}
			</Card>
		</div>
	);
}

export const statusList: { key: StatusType; label: StatusType }[] = [
	{ key: "Do", label: "Do" },
	{ key: "Schedule", label: "Schedule" },
	{ key: "Delegate", label: "Delegate" },
	{ key: "Delete", label: "Delete" },
	{ key: "Inbox", label: "Inbox" },
];

function TaskType({ id, status }: { id: string; status: StatusType }) {
	const [taskStatus, setTaskStatus] = useState(status);

	const updateTask = useTaskStore((state) => state.updateTask);

	return (
		<Select
			className="w-[30%] ml-auto"
			label=""
			selectedKeys={[taskStatus]}
			aria-label="status"
			onChange={(e) => {
				const value = e.target.value;
				if (value !== "") {
					setTaskStatus(value as StatusType);
					updateTask(id, "status", value);
				}
			}}>
			{statusList.map((statusList) => (
				<SelectItem key={statusList.key}>{statusList.label}</SelectItem>
			))}
		</Select>
	);
}
