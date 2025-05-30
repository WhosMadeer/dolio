import { Card, CardBody } from "@heroui/react";
import { memo } from "react";

import { removeTask, updateTask } from "@/api/tasks";
import { usePageContext } from "@/context/pageContext";
import { useTaskContext } from "@/context/taskContext";
import type { MatrixType, TaskType } from "@/types/tasks";
import { Select, SelectItem } from "@heroui/select";
import { X } from "lucide-react";
import { TaskStatusChip } from "./tasks/taskStatus";

const TaskComponent = memo(function Task(task: TaskType) {
	const page = usePageContext();

	const { id, title, description, status, matrix } = task;

	const { setTask } = useTaskContext();

	return (
		<>
			<Card>
				{/* <CardHeader></CardHeader> */}
				<CardBody className="hover:cursor-pointer flex gap-2 flex-row items-center">
					<div
						className="flex gap-2 items-center"
						onClick={() => {
							setTask(task);
						}}>
						<TaskStatusChip id={id} status={status} />

						<div className="grid gap-2 items-center h-full">
							<h1 className={"text-lg"}>{title}</h1>
							{description && <p className={"text-sm text-foreground"}>{description}</p>}
						</div>
						<div className="flex gap-2 ml-auto w-[35%] items-center">
							{page === "/matrix" && <TaskMatrixType id={id} status={matrix} />}
						</div>
					</div>
					<X
						className="w-4 h-4 ml-auto"
						onClick={async (e) => {
							e.preventDefault();
							await removeTask(id);
						}}
					/>
				</CardBody>
				{/* <CardFooter></CardFooter> */}
			</Card>
		</>
	);
});
export default TaskComponent;

export const matrixList: { key: MatrixType; label: MatrixType }[] = [
	{ key: "Do", label: "Do" },
	{ key: "Schedule", label: "Schedule" },
	{ key: "Delegate", label: "Delegate" },
	{ key: "Delete", label: "Delete" },
	{ key: "Inbox", label: "Inbox" },
];

function TaskMatrixType({ id, status }: { id: string; status: MatrixType }) {
	return (
		<Select
			className=""
			label=""
			selectedKeys={[status]}
			aria-label="matrix"
			onChange={async (e) => {
				const value = e.target.value;
				if (value !== "") {
					updateTask(id, "matrix", value);
				}
			}}>
			{matrixList.map((matrix) => (
				<SelectItem key={matrix.key}>{matrix.label}</SelectItem>
			))}
		</Select>
	);
}
