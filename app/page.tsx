'use client'
import { useEffect } from 'react'
import Task from "@/components/Task";
import Image from "next/image";


export default function Home() {
	let title = "Task";

	useEffect (() => {
		const fetchDataTest = async () => {
			const response = await fetch("/api/boards", {
				method: 'POST',
				body: JSON.stringify({message: 'TEST'})
			})
			const data = await response.json()
			console.log("response data", data)
		}

		fetchDataTest()
	},[])

	return (
		<main className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<div className="max-w-[555px]">
				<h1 className="title flex flex-row gap-3">
						<Image src="Logo.svg" alt="Logo" width="50" height="50" />
						My Task Board
						<Image src="Edit_duotone.svg" alt="Pen" width="25" height="25" />
					</h1>
				<p className="description ml-16">Tasks to keep organised</p>
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
