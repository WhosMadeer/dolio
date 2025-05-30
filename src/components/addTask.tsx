import type { DetailProps } from "@/types/props";
import { generateTaskID } from "@/utils/generateTaskID";
import { Popover, PopoverTrigger, Button, PopoverContent, Input, Textarea, Form } from "@heroui/react";
import { PenLine } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import type { TaskType } from "@/types/tasks";
import { addTask } from "@/api/tasks";
import { useUserContext } from "@/context/userContext";

export function AddTaskButton() {
	const user = useUserContext();

	const { handleSubmit, control } = useForm({
		defaultValues: {} as DetailProps,
	});

	const onSubmit = async (data: DetailProps) => {
		const task: TaskType = {
			id: generateTaskID(),
			title: data.title,
			description: data.description,
			// completed: false,
			matrix: "Inbox",
			status: "Not Started",
			createdDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
			uid: user?.uid as string,
		};
		await addTask(task);
		// addTasks(task);
	};

	return (
		<>
			<Popover placement="bottom">
				<PopoverTrigger>
					<Button color="primary">Add Task</Button>
				</PopoverTrigger>
				<PopoverContent className="p-4">
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							control={control}
							name="title"
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
									label={"Title"}
								/>
							)}
						/>
						<Controller
							control={control}
							name="description"
							render={({
								field: { name, value, onChange, onBlur, ref },
								fieldState: { invalid, error },
							}) => (
								<Textarea
									ref={ref}
									errorMessage={error?.message}
									isInvalid={invalid}
									name={name}
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									label={"Description"}
								/>
							)}
						/>
						<Button type="submit" color="primary" className="mx-auto">
							Add Task to Inbox
						</Button>
					</Form>
				</PopoverContent>
			</Popover>
		</>
	);
}

export function AddTaskIconButton() {
	const user = useUserContext();

	const { handleSubmit, control } = useForm({
		defaultValues: {} as DetailProps,
	});

	const onSubmit = async (data: DetailProps) => {
		const task: TaskType = {
			id: generateTaskID(),
			title: data.title,
			description: data.description,
			// completed: false,
			matrix: "Inbox",
			status: "Not Started",
			createdDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"),
			uid: user?.uid as string,
		};
		await addTask(task);
	};

	return (
		<>
			<Popover placement="top-end">
				<PopoverTrigger className="fixed bottom-4 right-4 h-16 w-16">
					<Button color="primary" isIconOnly className="">
						<PenLine className="h-6 w-6" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-4">
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							control={control}
							name="title"
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
									label={"Title"}
								/>
							)}
						/>
						<Controller
							control={control}
							name="description"
							render={({
								field: { name, value, onChange, onBlur, ref },
								fieldState: { invalid, error },
							}) => (
								<Textarea
									ref={ref}
									errorMessage={error?.message}
									isInvalid={invalid}
									name={name}
									value={value}
									onChange={onChange}
									onBlur={onBlur}
									label={"Description"}
								/>
							)}
						/>
						<Button type="submit" color="primary" className="mx-auto">
							Create Task
						</Button>
					</Form>
				</PopoverContent>
			</Popover>
		</>
	);
}
