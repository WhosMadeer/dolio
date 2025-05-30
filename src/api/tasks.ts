import { db } from "@/firebase/firebase";
import type { TaskType } from "@/types/tasks";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";

export const getAllTasks = async () => {
	const q = query(collection(db, "tasks")); // get all tasks
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => doc.data() as TaskType);
};

export const getTask = async (id: string) => {
	const docs = await getDoc(doc(db, "tasks", id));
	if (docs.exists()) {
		return docs.data() as TaskType;
	} else {
		return null;
	}
};

export const addTask = async (task: TaskType) => {
	await setDoc(doc(db, "tasks", task.id), task);
};

export const updateTask = async (id: string, key: keyof TaskType, value: any) => {
	await updateDoc(doc(db, "tasks", id), { [key]: value });
};

export const removeTask = async (id: string) => {
	await deleteDoc(doc(db, "tasks", id));
};
