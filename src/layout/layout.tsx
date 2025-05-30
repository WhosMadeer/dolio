import { Outlet } from "react-router";
import NavigationMenu from "./navigationMenu";
import { AddTaskIconButton } from "@/components/addTask";
import { ProtectedRoutes } from "@/routes/protectedRoutes";

// Outlet is the page that the router is going to use

export default function Layout() {
	return (
		<ProtectedRoutes>
			<div className="w-svw h-svh">
				<NavigationMenu />
				<Outlet />
				<AddTaskIconButton />
			</div>
		</ProtectedRoutes>
	);
}
