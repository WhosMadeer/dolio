export type Task = {
	id: string; // for internal use
	title: string;
	description?: string;
	completed: boolean;
	priority?: PriorityType;
	matrix: MatrixType;
	status: StatusType;
};

export type PriorityType = "None" | "Low" | "Medium" | "High";

export type MatrixType = "Do" | "Schedule" | "Delegate" | "Delete" | "Inbox";

export type StatusType = "Not Started" | "In Progress" | "Completed" | "Inbox";
