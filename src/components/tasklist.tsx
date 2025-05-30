import { Divider } from "@heroui/react";
import { AddTaskButton } from "./addTask";
import Task from "./task";
import type { Task as TaskType } from "@/types/types";
import { memo } from "react";

const Tasklist = memo(function Tasklist({ inboxTasks }: { inboxTasks: TaskType[] }) {
	return (
		<div className="p-4">
			<div className="grid place-content-center h-fit p-4">
				<h1 className="text-lg">Task List:</h1>
				<p className="text-sm text-foreground">Write down your tasks here</p>
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
});
export default Tasklist;
