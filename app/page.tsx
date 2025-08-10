import Task from "@/components/Task";
import Image from "next/image";

export default function Home() {
	let title = "Task";

	return (
		<main className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<div className="max-w-[555px]">
				<h1 className="title">(Logo) My Task Board (lapiz)</h1>
				<p className="description">Tasks to keep organised</p>
				<div className="flex flex-col justify-center gap-5 mt-10">
					<Task status={"todo"} title={title} />
					<Task status={"progress"} title={title} />
					<Task status={"completed"} title={title} />
					<Task status={"wontdo"} title={title} />
				</div>
			</div>
		</main>
	);
}
