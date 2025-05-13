import { Routes, Route } from "react-router";
import App from "@/app/App.tsx";
import Layout from "@/layout/layout";

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<App />} />
			</Route>
		</Routes>
	);
}
