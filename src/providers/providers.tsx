import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { useNavigate, useHref } from "react-router";

interface Providers {
	children: React.ReactNode;
}

export default function Providers({ children }: Providers) {
	const navigate = useNavigate();

	return (
		<HeroUIProvider navigate={navigate} useHref={useHref}>
			<ToastProvider />
			{children}
		</HeroUIProvider>
	);
}
