import { createUser } from "@/api/auth";
import type { LoginProps } from "@/types/props";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function SignUp() {
	const [isVisible, setIsVisible] = useState(false);

	const navigate = useNavigate();

	const { handleSubmit, control } = useForm<LoginProps>({});

	const onSubmit = async (data: LoginProps) => {
		await createUser(data);
		navigate("/", { replace: true });
	};

	return (
		<div className="grid h-screen w-screen place-content-center">
			<Card className="p-4 w-[18vw]">
				<CardHeader>
					<h1 className="text-xl font-bold">Sign Up</h1>
				</CardHeader>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<CardBody>
						<div className="grid gap-2">
							<Controller
								control={control}
								name="email"
								render={({
									field: { name, value, onChange, onBlur, ref },
									fieldState: { invalid, error },
								}) => (
									<Input
										ref={ref}
										isRequired
										errorMessage={error?.message}
										isInvalid={invalid}
										name={name}
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										label={"Email"}
									/>
								)}
							/>
							<Controller
								control={control}
								name="password"
								render={({
									field: { name, value, onChange, onBlur, ref },
									fieldState: { invalid, error },
								}) => (
									<Input
										ref={ref}
										isRequired
										errorMessage={error?.message}
										isInvalid={invalid}
										name={name}
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										endContent={
											<Button
												isIconOnly
												type="button"
												variant="faded"
												className="border-0"
												onPress={() => setIsVisible(!isVisible)}>
												{isVisible ? <EyeOff /> : <Eye />}
											</Button>
										}
										label={"Password"}
										type={isVisible ? "text" : "password"}
									/>
								)}
							/>
						</div>
					</CardBody>
					<CardFooter className="flex flex-col gap-2">
						<Button type="submit" color="primary" className="w-full">
							Sign Up
						</Button>
						<span className="text-sm">
							Already have an account?{" "}
							<Link to="/login" className="text-secondary underline">
								Login
							</Link>{" "}
							here
						</span>
					</CardFooter>
				</Form>
			</Card>
		</div>
	);
}
