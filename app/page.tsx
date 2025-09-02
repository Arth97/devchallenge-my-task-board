'use client'
import { useEffect, useState } from 'react'
import Task from "@/components/Task";
import Image from "next/image";
import { TaskType } from '@/lib/types';
import TaskEditor from '@/components/TaskEditor';

export default function Home() {
	const [tasksData, setTasksData] = useState<TaskType[]>([]);
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Partial<TaskType> | null>(null);

	useEffect (() => {
		const fetchDataTest = async () => {
			const response = await fetch("/api/boards", {
				method: 'POST',
				body: JSON.stringify({message: 'TEST'})
			})
			const data = await response.json()
			console.log("response data", data)
			setTasksData(data)
		}
		fetchDataTest()
	},[])

	const handleAddTask = () => {
		setEditingTask({ status: 'todo' });
		setIsEditorOpen(true);
	};

	const handleEditTask = (task: TaskType) => {
		setEditingTask(task);
		setIsEditorOpen(true);
	};

	const handleSaveTask = async (taskData: Partial<TaskType>) => {
		try {
			const method = taskData.id ? 'PUT' : 'POST';
			const endpoint = taskData.id ? `/api/tasks/${taskData.id}` : '/api/tasks';

			const response = await fetch(endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(taskData),
			});

			if (!response.ok) throw new Error('Failed to save task');

			const updatedTask = await response.json();

			setTasksData(prev => {
				if (taskData.id) {
					return prev.map(t => t.id === taskData.id ? updatedTask : t);
				} else {
					return [...prev, updatedTask];
				}
			});

			setIsEditorOpen(false);
			setEditingTask(null);
		} catch (error) {
			console.error('Error saving task:', error);
		}
	};

	const handleDeleteTask = async (taskId: string) => {
		try {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw new Error('Failed to delete task');

			setTasksData(prev => prev.filter(t => t.id !== taskId));
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	return (
		<main className="flex flex-col items-center min-h-screen gap-16 p-8 pb-20 justify-items-center sm:p-20">
			<div className="max-w-[555px]">
				<h1 className="flex flex-row gap-3 title">
						<Image src="Logo.svg" alt="Logo" width="50" height="50" />
						My Task Board
						<Image src="Edit_duotone.svg" alt="Pen" width="25" height="25" />
					</h1>
				<p className="ml-16 description">Tasks to keep organised</p>
				<div className="flex flex-col justify-center gap-5 mt-10">
					{tasksData.map((task) => (
						<div key={task.id} onClick={() => handleEditTask(task)}>
							<Task taskData={task} />
						</div>
					))}
				</div>
				<div onClick={handleAddTask} className={`w-[555px] h-[75px] cursor-pointer flex flex-row items-center gap-4 p-4 mt-5 rounded-2xl bg-light-yellow`}>
					<div className="flex items-center justify-center size-11 rounded-xl bg-orange">
						<Image
							src={"./Add_round_duotone.svg"}
							alt="Status"
							width={24}
							height={24}
						/>
					</div>
					<h2 className="task-title">Add new task</h2>
				</div>
			</div>

			{isEditorOpen && editingTask && (
				<TaskEditor
					taskData={editingTask}
					onClose={() => {
						setIsEditorOpen(false);
						setEditingTask(null);
					}}
					onSave={handleSaveTask}
					onDelete={handleDeleteTask}
				/>
			)}
		</main>
	);
}
