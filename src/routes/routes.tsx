import { Routes, Route } from "react-router";
import MatrixView from "@/app/MatrixView";
import Layout from "@/layout/layout";
import BoardView from "@/app/BoardView";
import Home from "@/app/Home";

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/matrix" element={<MatrixView />} />
				<Route path="/board" element={<BoardView />} />
			</Route>
		</Routes>
	);
}
