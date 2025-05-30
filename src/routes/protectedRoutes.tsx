import { useUserContext } from "@/context/userContext";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

// this file is used around the layouts that need to signed in first
export function ProtectedRoutes({ children }: { children: ReactNode }) {
	const user = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (user === null) {
			navigate("/login", { replace: true });
		}
	}, [user]);
	return <>{children}</>;
}
