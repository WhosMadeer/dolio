import Tasklist from "@/components/tasklist";
import BoardLayout from "@/components/views/boardLayout";
import { db } from "@/firebase/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import type { Task as TaskType } from "@/types/types";

export default function BoardView() {
	const [tasks, setTasks] = useState<TaskType[]>([]);

	useEffect(() => {
		const q = query(collection(db, "tasks")); // get all tasks

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setTasks(
				querySnapshot.docs.map((doc) => {
					return doc.data() as TaskType;
				})
			);
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className="md:grid grid-cols-[1fr_0.6fr] h-[calc(100svh-4rem)]">
			<div className="flex flex-col gap-2 flex-grow">
				<h1 className="text-lg ml-4 mt-4 max-h-fit">Kanban Board:</h1>

				<BoardLayout tasks={tasks} />
			</div>
			<Tasklist inboxTasks={tasks.filter((task) => task.status === "Inbox")} />
		</div>
	);
}
