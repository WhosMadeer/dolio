import { createContext, useContext, type ReactNode } from "react";

export type PageContextType = "/matrix" | "/board" | "/" | "";

export const PageContext = createContext<PageContextType>("");

// * PageContext hook
export const usePageContext = () => {
	const page = useContext(PageContext);

	if (page === undefined) {
		throw new Error("usePageContext must be used to with a pageContext");
	}

	return page;
};

interface PageContextProviderProps {
	value: PageContextType;
	children: ReactNode;
}

export const PageContextProvider = ({
	value,
	children,
}: PageContextProviderProps) => {
	return (
		<PageContext.Provider value={value}>{children}</PageContext.Provider>
	);
};
