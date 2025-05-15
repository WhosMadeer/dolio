import Task from "@/components/task";
import { useTaskStore } from "@/store/tasksStore";
import type { DetailProps } from "@/types/props";
import type { Task as TaskType } from "@/types/types";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";

/*
    The Kanban board is a multi column system that allows people to organize tasks based on their status
    The direction of the columns go left to right 
*/

export default function BoardLayout() {
	const tasks = useTaskStore((state) => state.tasks);

	/*
        Each column of the board gets a shallow copy of the task list that is filtered by the status
    */

	return (
		<div className="grid grid-cols-3 gap-2 p-4 h-full">
			<ColumnLayout
				title="Not Started"
				taskList={tasks.filter((task) => task.status === "Not Started")}
			/>
			<ColumnLayout
				title="In Progress"
				taskList={tasks.filter((task) => task.status === "In Progress")}
			/>
			<ColumnLayout
				title="Completed"
				taskList={tasks.filter((task) => task.status === "Completed")}
			/>
		</div>
	);
}

interface ColumnLayoutProps extends DetailProps {
	taskList: TaskType[];
}

function ColumnLayout({ title, description, taskList }: ColumnLayoutProps) {
	return (
		<Card>
			<CardHeader>
				<div className="grid gap-2 w-full">
					<h2 className="text-lg">{title}</h2>
					<p className="text-sm text-foreground">{description}</p>
					<Divider />
				</div>
			</CardHeader>
			<CardBody>
				<div className="grid gap-2 p-4">
					{taskList.map((task) => {
						return <Task key={task.id} {...task} />;
					})}
				</div>
			</CardBody>
			<CardFooter></CardFooter>
		</Card>
	);
}
