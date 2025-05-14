import { Outlet } from "react-router";
import NavigationMenu from "./navigationMenu";
import { AddTaskIconButton } from "@/components/addTask";

// Outlet is the page that the router is going to use

export default function Layout() {
	return (
		<div className="w-screen h-screen">
			<NavigationMenu />
			<Outlet />
			<AddTaskIconButton />
		</div>
	);
}
