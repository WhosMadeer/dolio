import type { LoginProps } from "@/types/props";
import { supabase } from "@/utils/supabase";

export const createUser = async ({ email, password }: LoginProps) => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});
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

export const loginUser = async ({ email, password }: LoginProps) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
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
