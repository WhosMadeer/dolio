import type { TaskType } from "@/types/tasks";
import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

interface TaskState {
	tasks: TaskType[];
	addTask: (task: TaskType) => void;
	updateTask: (id: string, key: keyof TaskType, value: any) => void;
	removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
	// persist(
	(set, get) => ({
		tasks: [],
		addTask: (task) => {
			set({ tasks: [...get().tasks, task] });
		},
		updateTask: (id, key, value) => {
			set((state) => ({
				tasks: state.tasks.map((task) => (task.id === id ? { ...task, [key]: value } : task)),
			}));
		},
		removeTask: (id) => {
			set((state) => ({
				tasks: state.tasks.filter((task) => task.id !== id),
			}));
		},
	})
	// ),
	// {
	// 	name: "task-storage",
	// 	storage: createJSONStorage(() => localStorage),
	// }
);
