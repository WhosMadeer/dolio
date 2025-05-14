import Task from "@/components/task";
import { useTaskStore } from "@/store/tasksStore";
import type { DetailProps } from "@/types/props";
import type { Task as TaskType } from "@/types/types";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";

/*
    The Eisenhower Matrix is organized in a 2x2 grid. The direction of the grid is left to right and top to bottom
    Do, Schedule, Delegate, Delete
*/

export default function MatrixLayout() {
	const tasks = useTaskStore((state) => state.tasks);
	/*
        Each part of the grid gets a shallow copy of the task list that is filtered by the task status
    */

	return (
		<div className="grid grid-cols-2 grid-rows-2 gap-2 p-4 md:min-h-[80dvh]">
			<CardLayout
				title="Do:"
				taskList={tasks
					.filter((task) => task.matrix === "Do")
					.reverse()}
				description="Tasks with deadline and consequences"
			/>
			<CardLayout
				title="Schedule:"
				taskList={tasks
					.filter((task) => task.matrix === "Schedule")
					.reverse()}
				description="Tasks that contribute to long-term success"
			/>
			<CardLayout
				title="Delegate:"
				taskList={tasks
					.filter((task) => task.matrix === "Delegate")
					.reverse()}
				description="Tasks that must get done but require another person"
			/>
			<CardLayout
				title="Delete:"
				taskList={tasks
					.filter((task) => task.matrix === "Delete")
					.reverse()}
				description="Distractions and unnecessary tasks"
			/>
		</div>
	);
}

interface CardLayoutProps extends DetailProps {
	taskList: TaskType[];
}

function CardLayout({ title, description, taskList }: CardLayoutProps) {
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
