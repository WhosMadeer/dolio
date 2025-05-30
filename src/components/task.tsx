import { Card, CardBody } from "@heroui/react";
import { memo, useState } from "react";

import { removeTask, updateTask } from "@/api/tasks";
import { usePageContext } from "@/context/pageContext";
import { useTaskContext } from "@/context/taskContext";
import type { MatrixType, Task } from "@/types/types";
import { Select, SelectItem } from "@heroui/select";
import { X } from "lucide-react";
import { TaskStatusChip } from "./tasks/taskStatus";

const TaskComponent = memo(function Task(task: Task) {
	const page = usePageContext();

	const { id, title, description, status, matrix } = task;

	const { setTask } = useTaskContext();

	console.log(task);

	return (
		<>
			<Card>
				{/* <CardHeader></CardHeader> */}
				<CardBody
					onClick={() => {
						setTask(task);
					}}
					className="hover:cursor-pointer">
					<div className="flex gap-2 items-center">
						<TaskStatusChip id={id} status={status} />

						<div className="grid gap-2 items-center h-full">
							<h1 className={"text-lg"}>{title}</h1>
							{description && <p className={"text-sm text-foreground"}>{description}</p>}
						</div>
						<div className="flex gap-2 ml-auto w-[35%] items-center">
							{page === "/matrix" && <TaskMatrixType id={id} status={matrix} />}
						</div>

						<X
							className="w-4 h-4"
							onClick={async () => {
								await removeTask(id);
							}}
						/>
					</div>
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
	const [taskMatrix, setTaskMatrix] = useState(status);

	return (
		<Select
			className=""
			label=""
			selectedKeys={[taskMatrix]}
			aria-label="matrix"
			onChange={async (e) => {
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
