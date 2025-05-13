import { Button, Divider, Form, Input, Textarea } from "@heroui/react";
import Task from "./task";
import { useTaskStore } from "@/store/tasksStore";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import type { DetailProps } from "@/types/props";
import { generateTaskID } from "@/utils/generateTaskID";

export default function Tasklist() {
	const inboxTasks = useTaskStore((state) => state.tasks)
		.filter((task) => task.status === "Inbox")
		.reverse();

	// const inboxTasks = tasks.filter((task) => task.taskStatus === "Inbox");
	return (
		<div className="p-4">
			<div className="grid place-content-center h-fit p-4">
				<h1 className="text-lg">Task List:</h1>
				<p className="text-sm text-foreground">
					Write down your tasks here
				</p>
				<AddTask />
			</div>
			<Divider className="" />
			<div className="grid gap-2 p-4">
				{inboxTasks.map((task) => {
					return <Task key={task.id} {...task} />;
				})}
			</div>
		</div>
	);
}

function AddTask() {
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
