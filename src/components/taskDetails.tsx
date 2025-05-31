import { Chip, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/react";
import { type ReactNode } from "react";

import { useTaskContext } from "@/context/taskContext";
import type { TaskType } from "@/types/tasks";
import { format } from "date-fns";
import { ClockFading, ClockPlus, LayoutGrid, Loader } from "lucide-react";
import { TaskStatusChip } from "./tasks/taskStatus";

interface TaskDetailsProps extends TaskType {
	isOpen: boolean;
}

export function TaskDetails({ isOpen, ...task }: TaskDetailsProps) {
	const { id, title, description, status, matrix, createdDate, dueDate } = task;

	const { setTask } = useTaskContext();

	return (
		<Drawer
			isOpen={isOpen}
			onOpenChange={() => setTask(null)}
			className="data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium"
			size="xl">
			<DrawerContent>
				{() => (
					<>
						<DrawerHeader className="flex flex-col">
							<h1>{title}</h1>
							<p className="text-medium font-normal">{description}</p>
						</DrawerHeader>
						<DrawerBody>
							{/* <div className="grid grid-cols-[0.4fr_1fr]"></div> */}
							<div className="flex flex-col gap-6">
								<TaskDetailsStats
									icon={<ClockPlus />}
									title={"Time created"}
									data={format(new Date(createdDate), "MMMM d, yyyy hh:mm aa")}
								/>

								<TaskDetailsStats
									icon={<Loader />}
									title={"Status"}
									data={<TaskStatusChip id={id} status={status} />}
								/>
								<TaskDetailsStats
									icon={<LayoutGrid />}
									title={"Matrix Priority"}
									data={<Chip>{matrix}</Chip>}
								/>
								<TaskDetailsStats
									icon={<ClockFading />}
									title={"Due Date"}
									data={dueDate ? format(new Date(dueDate), "MMMM d, yyyy hh:mm aa") : "Empty"}
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
