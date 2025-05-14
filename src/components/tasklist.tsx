import { usePageContext } from "@/context/pageContext";
import { useTaskStore } from "@/store/tasksStore";
import { Divider } from "@heroui/react";
import { AddTaskButton } from "./addTask";
import Task from "./task";

export default function Tasklist() {
	const page = usePageContext();

	let inboxTasks = useTaskStore((state) => state.tasks).reverse();

	if (page !== "/") {
		inboxTasks = inboxTasks.filter(
			(task) =>
				(page === "/matrix" && task.matrix === "Inbox") ||
				(page === "/board" && task.status === "Inbox")
		);
	}

	return (
		<div className="p-4">
			<div className="grid place-content-center h-fit p-4">
				<h1 className="text-lg">Task List:</h1>
				<p className="text-sm text-foreground">
					Write down your tasks here
				</p>
				<AddTaskButton />
			</div>
			<Divider className="" />
			<div className="grid gap-2 p-4">
				{inboxTasks.map((task) => {
					return <Task key={task.id} {...task} />;
				})}
			</div>
		</div>
	);
}
