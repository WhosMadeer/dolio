import { createUser } from "@/api/auth";
import type { LoginProps } from "@/types/props";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function SignUp() {
	const [isVisible, setIsVisible] = useState(false);

	const { handleSubmit, control } = useForm<LoginProps>({});

	const onSubmit = async (data: LoginProps) => {
		// console.log(data);
		await createUser(data);
	};

	return (
		<div className="grid h-screen w-screen place-content-center">
			<Card>
				<CardHeader>
					<h1>Login</h1>
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
					<CardFooter>
						<Button type="submit" color="primary">
							Sign Up
						</Button>
					</CardFooter>
				</Form>
			</Card>
		</div>
	);
}
