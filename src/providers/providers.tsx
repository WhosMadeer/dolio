import { PageContextProvider, type PageContextType } from "@/context/pageContext";
import { TaskContextProvider } from "@/context/taskContext";
import { UserContextProvider } from "@/context/userContext";
import { auth } from "@/firebase/firebase";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useHref, useLocation } from "react-router";

interface Providers {
	children: React.ReactNode;
}

export default function Providers({ children }: Providers) {
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return () => unsubscribe(); // Cleanup on unmount
	}, [auth]);

	return (
		<HeroUIProvider navigate={navigate} useHref={useHref}>
			<ToastProvider />
			<PageContextProvider value={location.pathname as PageContextType}>
				<UserContextProvider value={user}>
					<TaskContextProvider value={null}>{children}</TaskContextProvider>
				</UserContextProvider>
			</PageContextProvider>
		</HeroUIProvider>
	);
}
