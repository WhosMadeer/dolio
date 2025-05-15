import {
	Card,
	CardBody,
	Chip,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	useDisclosure,
} from "@heroui/react";
import { useState, type ReactNode } from "react";

import { Select, SelectItem } from "@heroui/select";
import type { Task, MatrixType } from "@/types/types";
import { useTaskStore } from "@/store/tasksStore";
import { ClockPlus, LayoutGrid, Loader, X } from "lucide-react";
import { usePageContext } from "@/context/pageContext";
import { format } from "date-fns";
import { TaskStatusChip } from "./tasks/taskStatus";

// interface TaskProps extends DetailProps {
// 	taskStatus: TaskStatusType;
// }

export default function Task(task: Task) {
	const page = usePageContext();

	const { id, title, description, status, matrix } = task;

	// const [isCompleted, setIsCompleted] = useState(completed);

	// const updateTask = useTaskStore((state) => state.updateTask);
	const removeTask = useTaskStore((state) => state.removeTask);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Card>
				{/* <CardHeader></CardHeader> */}
				<CardBody onClick={onOpen} className="hover:cursor-pointer">
					<div className="flex gap-2 items-center">
						<TaskStatusChip id={id} status={status} />

						<div className="grid gap-2 items-center h-full">
							<h1 className={"text-lg"}>{title}</h1>
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
			<TaskDetails
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				{...task}
			/>
		</>
	);
}

interface TaskDetailsProps extends Task {
	isOpen: boolean;
	// onOpen: () => void;
	// onClose: () => void;
	onOpenChange: () => void;
	// isControlled: boolean;
	// getButtonProps: (props?: any) => any;
	// getDisclosureProps: (props?: any) => any;
}

export function TaskDetails({
	isOpen,
	// onOpen,
	onOpenChange,
	...task
}: TaskDetailsProps) {
	const { id, title, description, status, matrix, createdDate } = task;

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			className="data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium"
			size="xl">
			<DrawerContent>
				{() => (
					<>
						<DrawerHeader className="flex flex-col">
							<h1>{title}</h1>
							<p className="text-medium font-normal">
								{description}
							</p>
						</DrawerHeader>
						<DrawerBody>
							{/* <div className="grid grid-cols-[0.4fr_1fr]"></div> */}
							<div className="flex flex-col gap-4">
								<TaskDetailsStats
									icon={<ClockPlus />}
									title={"Time created"}
									data={format(
										new Date(createdDate),
										"MMMM d, yyyy hh:mm"
									)}
								/>
								<TaskDetailsStats
									icon={<Loader />}
									title={"Status"}
									data={
										<TaskStatusChip
											id={id}
											status={status}
										/>
									}
								/>
								<TaskDetailsStats
									icon={<LayoutGrid />}
									title={"Matrix Priority"}
									data={<Chip>{matrix}</Chip>}
								/>
								<TaskDetailsStats
									icon={<ClockPlus />}
									title={"Time created"}
									data={format(
										new Date(createdDate),
										"MMMM d, yyyy hh:mm"
									)}
								/>
							</div>
						</DrawerBody>
						<DrawerFooter></DrawerFooter>
					</>
				)}
			</DrawerContent>
		</Drawer>
	);
}

interface TaskDetailsStatsProps {
	icon: ReactNode;
	title: string;
	data: string | number | boolean | ReactNode;
}

function TaskDetailsStats({ icon, title, data }: TaskDetailsStatsProps) {
	return (
		<div className="grid grid-cols-[0.1fr_0.5fr_1fr] gap-2">
			{icon}
			<span>{title}</span> <span>{data}</span>
		</div>
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
