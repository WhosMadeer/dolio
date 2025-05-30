import Tasklist from "@/components/tasklist";
import MatrixLayout from "@/components/views/matrixLayout";
import { useTaskContext } from "@/context/taskContext";

export default function MatrixView() {
	/* 
		Since the tasks are stored on a database now, the best way to manage the task data is to query the tasks here and then send them to the components that need them
		For each component, we can create a copy in the props that filters out what we don't need

	*/

	const { tasks } = useTaskContext();

	return (
		<div className="md:grid grid-cols-[1fr_0.6fr]">
			<div className="grid gap-2 h-fit">
				<h1 className="text-lg ml-4 mt-4 max-h-fit">Eisenhower Matrix:</h1>
				<MatrixLayout tasks={tasks} />
			</div>
			<Tasklist inboxTasks={tasks.filter((task) => task.matrix === "Inbox")} />
		</div>
	);
}
