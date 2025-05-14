import { Card, CardBody } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import { useState } from "react";

import { Select, SelectItem } from "@heroui/select";
import type { Task, StatusType, MatrixType } from "@/types/types";
import { useTaskStore } from "@/store/tasksStore";
import { X } from "lucide-react";
import { usePageContext } from "@/context/pageContext";

// interface TaskProps extends DetailProps {
// 	taskStatus: TaskStatusType;
// }

export default function Task({
	id,
	completed,
	title,
	description,
	status,
	matrix,
}: Task) {
	const page = usePageContext();
	// console.log(page);

	const [isCompleted, setIsCompleted] = useState(completed);

	const updateTask = useTaskStore((state) => state.updateTask);
	const removeTask = useTaskStore((state) => state.removeTask);

	return (
		<Card>
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
					<div className="flex gap-2 ml-auto w-[35%] items-center">
						{page === "/matrix" && (
							<TaskMatrixType id={id} status={matrix} />
						)}
						{page === "/board" && (
							<TaskStatusType id={id} status={status} />
						)}
					</div>

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
	);
}

export const matrixList: { key: MatrixType; label: MatrixType }[] = [
	{ key: "Do", label: "Do" },
	{ key: "Schedule", label: "Schedule" },
	{ key: "Delegate", label: "Delegate" },
	{ key: "Delete", label: "Delete" },
	{ key: "Inbox", label: "Inbox" },
];

function TaskMatrixType({ id, status }: { id: string; status: MatrixType }) {
	const [taskMatrix, setTaskMatrix] = useState(status);

	const updateTask = useTaskStore((state) => state.updateTask);

	return (
		<Select
			className=""
			label=""
			selectedKeys={[taskMatrix]}
			aria-label="matrix"
			onChange={(e) => {
				const value = e.target.value;
				if (value !== "") {
					setTaskMatrix(value as MatrixType);
					updateTask(id, "matrix", value);
				}
			}}>
			{matrixList.map((matrix) => (
				<SelectItem key={matrix.key}>{matrix.label}</SelectItem>
			))}
		</Select>
	);
}

export const statusList: { key: StatusType; label: StatusType }[] = [
	{ key: "Not Started", label: "Not Started" },
	{ key: "In Progress", label: "In Progress" },
	{ key: "Completed", label: "Completed" },
	{ key: "Inbox", label: "Inbox" },
];

function TaskStatusType({ id, status }: { id: string; status: StatusType }) {
	const [taskStatus, setTaskStatus] = useState(status);

	const updateTask = useTaskStore((state) => state.updateTask);

	return (
		<Select
			className=""
			label=""
			selectedKeys={[taskStatus]}
			aria-label="matrix"
			onChange={(e) => {
				const value = e.target.value;
				if (value !== "") {
					setTaskStatus(value as StatusType);
					updateTask(id, "status", value);
				}
			}}>
			{statusList.map((status) => (
				<SelectItem key={status.key}>{status.label}</SelectItem>
			))}
		</Select>
	);
}
