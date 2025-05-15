import type { Task } from "@/types/types";
import { createContext, useContext, type ReactNode } from "react";

export const TaskContext = createContext<Task | null>(null);

// * PageContext hook
export const useTaskContext = () => {
	const task = useContext(TaskContext);

	if (task === undefined) {
		throw new Error("useTaskContext must be used to with a taskContext");
	}

	return task;
};

interface TaskContextProviderProps {
	value: Task | null;
	children: ReactNode;
}

export const TaskContextProvider = ({
	value,
	children,
}: TaskContextProviderProps) => {
	return (
		<TaskContext.Provider value={value}>{children}</TaskContext.Provider>
	);
};
