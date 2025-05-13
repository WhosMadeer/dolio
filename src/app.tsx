import AppRoutes from "@/routes/routes";
import Providers from "@/providers/providers";

export default function App() {
	return (
		<Providers>
			<AppRoutes />
		</Providers>
	);
}
