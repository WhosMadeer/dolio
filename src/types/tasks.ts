export type TaskType = {
	id: string; // for internal use
	title: string;
	description?: string;
	priority?: PriorityType;
	matrix: MatrixType;
	status: StatusType;
	createdDate: string;
	dueDate?: string;
	uid: string;
};

export type PriorityType = "None" | "Low" | "Medium" | "High";

export type MatrixType = "Do" | "Schedule" | "Delegate" | "Delete" | "Inbox";

export type StatusType = "Not Started" | "In Progress" | "Completed";
