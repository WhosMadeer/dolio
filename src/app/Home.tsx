import { getTasks } from "@/api/task";
import Tasklist from "@/components/tasklist";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		getTasks();
	}, []);

	return (
		<div>
			<Tasklist />
		</div>
	);
}
