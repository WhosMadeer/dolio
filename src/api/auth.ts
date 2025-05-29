import { auth } from "@/firebase/firebase";
import type { LoginProps } from "@/types/props";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export const createUser = async ({ email, password }: LoginProps) => {
	// console.log(email, password);
	try {
		const user = await createUserWithEmailAndPassword(auth, email, password);
		return user;
	} catch (error: any) {
		console.error(error);
		return null;
	}
};

export const loginUser = async ({ email, password }: LoginProps) => {
	// console.log(email, password);
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		return user;
	} catch (error: any) {
		console.error(error);
		return null;
	}
};

export const getUserState = () => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			// const uid = user.uid;
			return user;
			// ...
		} else {
			// User is signed out
			// ...
			return null;
		}
	});
};
