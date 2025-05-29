import type { User } from "firebase/auth";
import { createContext, useContext, type ReactNode } from "react";

export type UserContextType = User | null;

export const UserContext = createContext<User | null>(null);

// * UserContext hook
export const useUserContext = () => {
	const user = useContext(UserContext);

	if (user === undefined) {
		throw new Error("useUserContext must be used to with a UserContext");
	}

	return user;
};

interface UserContextProviderProps {
	value: User | null;
	children: ReactNode;
}

export const UserContextProvider = ({ value, children }: UserContextProviderProps) => {
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
