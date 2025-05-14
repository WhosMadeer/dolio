import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { NavLink } from "react-router";

/*
    Navbar
        -> NavbarBrand
        -> NavbarContent
            -> NavbarItem
*/

type NavBarLink = {
	title: string;
	link: string;
	// subPage?: NavBarLink[];
};

const pageList: NavBarLink[] = [
	{ title: "Home", link: "/" },
	{ title: "Matrix", link: "/matrix" },
	{ title: "Board", link: "/board" },
];

export default function NavigationMenu() {
	return (
		<Navbar maxWidth="full">
			<NavbarBrand>
				<h1 className="font-bold">Dolio</h1>
			</NavbarBrand>
			<NavbarContent className="" justify="center">
				{pageList.map((page) => {
					return (
						<NavbarItem key={page.title}>
							<NavLink
								to={page.link}
								className={({ isActive }) =>
									isActive
										? "text-primary font-bold"
										: "text-foreground"
								}>
								{page.title}
							</NavLink>
						</NavbarItem>
					);
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				{/* { // TODO: add login and signup } */}
			</NavbarContent>
		</Navbar>
	);
}
