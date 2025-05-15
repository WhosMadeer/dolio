import Tasklist from "@/components/tasklist";
import BoardLayout from "@/components/views/boardLayout";

export default function BoardView() {
	return (
		<div className="md:grid grid-cols-[1fr_0.6fr] h-[calc(100svh-4rem)]">
			<div className="flex flex-col gap-2 flex-grow">
				<h1 className="text-lg ml-4 mt-4 max-h-fit">Kanban Board:</h1>

				<BoardLayout />
			</div>
			<Tasklist />
		</div>
	);
}
