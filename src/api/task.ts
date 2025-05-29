import type { Task } from "@/types/types";
import { supabase } from "@/utils/supabase";

export const addTaskBackend = async (task: Task) => {
	try {
		const { data, error } = await supabase
			.from("tasks")
			.insert(task)
			.select();
		if (error) {
			throw error;
		}
		console.log(data);
		return data;
	} catch (e) {
		console.error(e);
		return e;
	}
};

export const updateTaskBackend = async (
	id: string,
	key: keyof Task,
	value: any
) => {
	try {
		const { data, error } = await supabase
			.from("tasks")
			.update({ [key]: value })
			.eq("id", id)
			.select();
		if (error) {
			throw error;
		}
		console.log(data);
		return data;
	} catch (e) {
		console.error(e);
		return e;
	}
};

export const getTasks = async () => {
	try {
		const { data, error } = await supabase.from("tasks").select();
		if (error) {
			throw error;
		}
		console.log(data);
		return data;
	} catch (e) {
		console.error(e);
		return e;
	}
};
