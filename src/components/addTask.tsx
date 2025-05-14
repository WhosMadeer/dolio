import { useTaskStore } from "@/store/tasksStore";
import type { DetailProps } from "@/types/props";
import { generateTaskID } from "@/utils/generateTaskID";
import {
	Popover,
	PopoverTrigger,
	Button,
	PopoverContent,
	Input,
	Textarea,
	Form,
} from "@heroui/react";
import { PenLine } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

export function AddTaskButton() {
	const addTasks = useTaskStore((state) => state.addTask);

	const { handleSubmit, control } = useForm({
		defaultValues: {} as DetailProps,
	});

	const onSubmit = (data: DetailProps) => {
		addTasks({
			id: generateTaskID(),
			title: data.title,
			description: data.description,
			completed: false,
			matrix: "Inbox",
			status: "Inbox",
		});
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
						<Button
							type="submit"
							color="primary"
							className="mx-auto">
							Add Task to Inbox
						</Button>
					</Form>
				</PopoverContent>
			</Popover>
		</>
	);
}

export function AddTaskIconButton() {
	const addTasks = useTaskStore((state) => state.addTask);

	const { handleSubmit, control } = useForm({
		defaultValues: {} as DetailProps,
	});

	const onSubmit = (data: DetailProps) => {
		addTasks({
			id: generateTaskID(),
			title: data.title,
			description: data.description,
			completed: false,
			matrix: "Inbox",
			status: "Inbox",
		});
	};

	return (
		<>
			<Popover placement="top-end">
				<PopoverTrigger className="fixed bottom-4 right-4 h-16 w-16">
					<Button color="primary" isIconOnly className="rounded-full">
						<PenLine className="h-12 w-12" />
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
						<Button
							type="submit"
							color="primary"
							className="mx-auto">
							Create Task
						</Button>
					</Form>
				</PopoverContent>
			</Popover>
		</>
	);
}
