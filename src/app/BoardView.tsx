import BoardLayout from "@/components/views/boardLayout";
import { useTaskContext } from "@/context/taskContext";

export default function BoardView() {
	const { tasks } = useTaskContext();

	return (
		<div
			className="md:grid 
		h-[calc(100svh-4rem)]">
			{/* grid-cols-[1fr_0.6fr] */}
			<div className="flex flex-col gap-2 flex-grow">
				<h1 className="text-lg ml-4 mt-4 max-h-fit">Kanban Board:</h1>

				<BoardLayout tasks={tasks} />
			</div>
			{/* <Tasklist inboxTasks={tasks.filter((task) => task.status === "Inbox")} /> */}
		</div>
	);
}
