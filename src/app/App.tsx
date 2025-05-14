import Tasklist from "@/components/tasklist";
import MatrixLayout from "@/components/matrixLayout";
import {
	DndContext,
	DragOverlay,
	type DragEndEvent,
	type DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { useTaskStore } from "@/store/tasksStore";
import Task from "@/components/task";
import type { Task as TaskType } from "@/types/types";

export default function App() {
	const [activeID, setActiveID] = useState<string>("");

	const updateTask = useTaskStore((state) => state.updateTask);
	const getTask = useTaskStore((state) => state.getTask);

	const handleDragStart = (event: DragStartEvent) => {
		const {
			active: { id },
		} = event;

		console.log(id);
		setActiveID(id.toString());
	};

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		console.log(active, over);
		if (over) {
			// console.log(over.id);
			updateTask(active.id.toString(), "status", over.id);
		}
	}

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="md:grid grid-cols-[1fr_0.5fr]">
				{/* <h1 className="underline text-3xl">Test</h1>
			<Button
				color="primary"
				onPress={() => {
					addToast({ title: "Test" });
				}}>
				Button
			</Button> */}
				<div className="grid gap-2 h-fit">
					<h1 className="text-lg ml-4 mt-4 max-h-fit">
						Eisenhower Matrix:
					</h1>
					<MatrixLayout />
				</div>
				<Tasklist />
				<DragOverlay>
					{activeID &&
						(getTask(activeID) ? (
							<Task {...(getTask(activeID) as TaskType)} />
						) : null)}
				</DragOverlay>
			</div>
		</DndContext>
	);
}
