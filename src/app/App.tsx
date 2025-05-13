import Tasklist from "@/components/tasklist";
import MatrixLayout from "@/layout/matrixLayout";

export default function App() {
	return (
		<div className="md:grid grid-cols-2">
			{/* <h1 className="underline text-3xl">Test</h1>
			<Button
				color="primary"
				onPress={() => {
					addToast({ title: "Test" });
				}}>
				Button
			</Button> */}
			<div className="grid gap-2 h-fit">
				<h1 className="text-lg ml-4 mt-4 max-h-fit">
					Eisenhower Matrix:
				</h1>
				<MatrixLayout />
			</div>
			<Tasklist />
		</div>
	);
}
