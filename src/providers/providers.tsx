import {
	PageContextProvider,
	type PageContextType,
} from "@/context/pageContext";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { useNavigate, useHref, useLocation } from "react-router";

interface Providers {
	children: React.ReactNode;
}

export default function Providers({ children }: Providers) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<HeroUIProvider navigate={navigate} useHref={useHref}>
			<ToastProvider />
			<PageContextProvider value={location.pathname as PageContextType}>
				{children}
			</PageContextProvider>
		</HeroUIProvider>
	);
}
