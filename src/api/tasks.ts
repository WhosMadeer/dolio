import { db } from "@/firebase/firebase";
import type { Task } from "@/types/types";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";

export const getAllTasks = async () => {
	const q = query(collection(db, "tasks")); // get all tasks
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => doc.data() as Task);
};

export const addTask = async (task: Task) => {
	await setDoc(doc(db, "tasks", task.id), task);
};

export const updateTask = async (id: string, key: keyof Task, value: any) => {
	await updateDoc(doc(db, "tasks", id), { [key]: value });
};

export const removeTask = async (id: string) => {
	await deleteDoc(doc(db, "tasks", id));
};
