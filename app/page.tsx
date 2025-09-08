'use client'
import { useEffect, useState } from 'react'
import Task from "@/components/Task";
import Image from "next/image";
import { BoardType, Status, TaskType } from '@/lib/types';
import TaskEditor from '@/components/TaskEditor';

export default function Home() {
	const [currentBoardId, setCurrentBoardId] = useState<string>('');
	const [boardData, setBoardData] = useState<BoardType | null>(null);
	const [tasksData, setTasksData] = useState<TaskType[]>([]);
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Partial<TaskType> | null>(null);

	useEffect (() => {
		const generateDefaultData = async () => {
			const response = await fetch("/api/boards", { method: 'POST' })
			return await response.json()
		}

		const fetchData = async (storedBoardId: string) => {
			const response = await fetch(`/api/boards/${storedBoardId}`, { method: 'GET' })
			return await response.json()
		}

		const initzilizeData = async () => {
			const storedBoardId = localStorage.getItem('boardId');

			let data: { board: BoardType; tasks: TaskType[] };
			if (storedBoardId)
				data = await fetchData(storedBoardId)
			else
				data = await generateDefaultData()

			localStorage.setItem('boardId', data.board.id);
			setCurrentBoardId(data.board.id)
			setBoardData(data.board)
			setTasksData(data.tasks)
		}

		initzilizeData()
	},[])

	const handleAddTask = () => {
		setEditingTask({ status: Status.TODO });
		setIsEditorOpen(true);
	};

	const handleEditTask = (task: TaskType) => {
		setEditingTask(task);
		setIsEditorOpen(true);
	};

	const handleSaveTask = async (taskData: Partial<TaskType>) => {
		try {
			const method = editingTask?.id ? 'PUT' : 'POST';
			const endpoint = editingTask?.id ? `/api/tasks/${editingTask.id}` : '/api/tasks';

			if (taskData.board_id == null) taskData.board_id = currentBoardId

			const response = await fetch(endpoint, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(taskData),
			});

			if (!response.ok) throw await response.json();

			const { data } = await response.json();
			const updatedTask = data;

			setTasksData(prev => {
				if (editingTask?.id) {
					return prev.map(t => t.id === updatedTask.id ? updatedTask : t);
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
		if (!taskId) {
			setIsEditorOpen(false);
			setEditingTask(null);
			return;
		}
		try {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: 'DELETE',
			});

			if (!response.ok) throw await response.json();

			setTasksData(prev => prev.filter(t => t.id !== taskId));
			setIsEditorOpen(false);
			setEditingTask(null);
		} catch (error) {
			console.error('Error deleting task:', error);
		}
	};

	return (
		<main className="flex flex-col items-center min-h-screen gap-16 p-8 pb-20 justify-items-center sm:p-20">
			<div className="sm-max-w-[555px] max-w-[400px]">
				<h1 className="flex flex-row gap-3 title">
						<Image src="Logo.svg" alt="Logo" width="50" height="50" />
						{boardData?.name}
						<Image src="Edit_duotone.svg" alt="Pen" width="25" height="25" />
					</h1>
				<p className="ml-16 description">{boardData?.description}</p>
				<div className="flex flex-col justify-center gap-5 mt-10">
					{tasksData.map((task: TaskType, index: number) => (
						<Task key={index} taskData={task} handleEditTask={handleEditTask} />
					))}
				</div>
				<div onClick={handleAddTask} className={`sm-w-[555px] w-full h-[75px] cursor-pointer flex flex-row items-center gap-4 p-4 mt-5 rounded-2xl bg-light-yellow`}>
					<div className="flex items-center justify-center size-11 rounded-xl bg-orange">
						<Image
							src="Add_round_duotone.svg"
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
					onDelete={() => handleDeleteTask(editingTask.id!)}
				/>
			)}
		</main>
	);
}
