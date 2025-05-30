import { TaskDetails } from "@/components/taskDetails";
import { PageContextProvider, type PageContextType } from "@/context/pageContext";
import { TaskContextProvider } from "@/context/taskContext";
import { UserContextProvider, type UserContextType } from "@/context/userContext";
import { auth } from "@/firebase/firebase";
import type { Task } from "@/types/types";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useHref, useLocation } from "react-router";

interface Providers {
	children: React.ReactNode;
}

export default function Providers({ children }: Providers) {
	const navigate = useNavigate();
	const location = useLocation();

	const [user, setUser] = useState<UserContextType>(undefined);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user); // here it assigns null if not signed in or user if it is signed in
		});
		return () => unsubscribe(); // Cleanup on unmount
	}, [auth]);

	const [task, setTask] = useState<Task | null>(null);
	console.log(task);

	return (
		<HeroUIProvider navigate={navigate} useHref={useHref}>
			<ToastProvider />
			<PageContextProvider value={location.pathname as PageContextType}>
				<UserContextProvider value={user}>
					<TaskContextProvider value={{ task: task, setTask: setTask }}>
						{children}
						{task && <TaskDetails isOpen={task !== null} {...task} />}
					</TaskContextProvider>
				</UserContextProvider>
			</PageContextProvider>
		</HeroUIProvider>
	);
}
