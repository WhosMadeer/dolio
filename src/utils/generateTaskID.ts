export function generateTaskID() {
	return "TASK-" + (Math.random() + 1).toString(36).substring(7);
}
