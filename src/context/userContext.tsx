import type { User } from "firebase/auth";
import { createContext, useContext, type ReactNode } from "react";

export type UserContextType = User | null | undefined;
/*
the undefined is the initial state while the null tells us if the user isn't signed in
the advantage of this is that we don't need to consider if we need to wait before we are signed in
*/

export const UserContext = createContext<UserContextType>(undefined);

// * UserContext hook
export const useUserContext = () => {
	const user = useContext(UserContext);

	// if (user === undefined) {
	// 	throw new Error("useUserContext must be used to with a UserContext");
	// }

	return user;
};

interface UserContextProviderProps {
	value: UserContextType;
	children: ReactNode;
}

export const UserContextProvider = ({ value, children }: UserContextProviderProps) => {
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
