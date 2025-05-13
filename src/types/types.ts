export type Task = {
	id: string; // for internal use
	title: string;
	description?: string;
	completed: boolean;
	priority?: PriorityType;
	status: StatusType;
};

export type PriorityType = "None" | "Low" | "Medium" | "High";

export type StatusType = "Do" | "Schedule" | "Delegate" | "Delete" | "Inbox";
