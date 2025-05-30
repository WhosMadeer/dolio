import Tasklist from "@/components/tasklist";
import { db } from "@/firebase/firebase";
import type { Task } from "@/types/types";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Home() {
	const [inboxTasks, setInboxTasks] = useState<Task[]>([]);

	useEffect(() => {
		const q = query(collection(db, "tasks")); // get all tasks

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setInboxTasks(
				querySnapshot.docs.map((doc) => {
					return doc.data() as Task;
				})
			);
		});

		return () => unsubscribe();
	}, []);
	return (
		<div>
			<Tasklist inboxTasks={inboxTasks} />
		</div>
	);
}
