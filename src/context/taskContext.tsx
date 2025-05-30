import type { Task } from "@/types/types";
import { createContext, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type TaskContextType = {
	task: Task | null;
	setTask: Dispatch<SetStateAction<Task | null>>;
};

export const TaskContext = createContext<TaskContextType>({
	task: null,
} as TaskContextType);

// * TaskContext hook
export const useTaskContext = () => {
	const task = useContext(TaskContext);

	if (task === undefined) {
		throw new Error("useTaskContext must be used to with a taskContext");
	}

	return task;
};

interface TaskContextProviderProps {
	value: TaskContextType;
	children: ReactNode;
}

export const TaskContextProvider = ({ value, children }: TaskContextProviderProps) => {
	return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
