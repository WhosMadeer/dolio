import Tasklist from "@/components/tasklist";
import BoardLayout from "@/components/views/boardLayout";

export default function MatrixView() {
	return (
		<div className="md:grid grid-cols-[1fr_0.6fr]">
			<div className="grid gap-2 h-fit">
				<h1 className="text-lg ml-4 mt-4 max-h-fit">Kanban Board:</h1>
				<BoardLayout />
			</div>
			<Tasklist />
		</div>
	);
}
