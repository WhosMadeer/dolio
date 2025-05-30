import Tasklist from "@/components/tasklist";
import { useTaskContext } from "@/context/taskContext";

export default function Home() {
	const { tasks } = useTaskContext();

	return (
		<div>
			<Tasklist inboxTasks={tasks} />
		</div>
	);
}
