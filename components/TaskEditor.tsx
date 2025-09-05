import Image from 'next/image';
import { Status, TaskType } from '@/lib/types';
import { Dispatch, SetStateAction, useState } from 'react';
import TaskIcon from './TaskIcon';
import TaskStatus from './TaskStatus';

type TaskEditorProps = {
	taskData?: Partial<TaskType>;
	onClose: () => void;
	onSave: (task: Partial<TaskType>) => void;
	onDelete: (taskId: string) => void;
}

const emojis = ["👨🏻‍💻", "💬", "☕️", "🏋️", "📚", "⏰"];

const TaskEditor = ({ taskData = {}, onClose, onSave, onDelete }: TaskEditorProps) => {
	const [formData, setFormData] = useState<Partial<TaskType>>(taskData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		console.log("name", name)
		console.log("value", value)
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		console.log("")
		console.log("formData", formData)
		console.log("")
	};

	const handleIconSelect = (emoji: string) => {
		console.log("emoji", emoji)
		setFormData(prev => ({
			...prev,
			icon: emoji
		}));
	};

	const handleStatusSelect = (status: Status) => {
		console.log("status", status)
		setFormData(prev => ({
			...prev,
			status: status
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black-transparent">
			{/* <div className={`w-[630px] h-[755px] flex flex-col items-start gap-5 p-5 rounded-xl bg-white`}> */}
			<div className="w-[630px] h-full bg-white rounded-xl">
				<div className="p-6">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">
							Task details
						</h2>
						<button onClick={onClose} className="p-1 border-2 rounded-md cursor-pointer border-gray-light">
							<Image src="./close_ring_duotone-1.svg" alt="Close" width={24} height={24} />
						</button>
					</div>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div> {/* TASK NAME */}
							<label htmlFor="taskName" className="block mb-1 text-sm text-gray-medium">
								Task name
							</label>
							<input
								id="title"
								name="title"
								type="text"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full p-2 border-2 rounded-md border-gray-light"
								required
							/>
						</div>
						
						<div> {/* DESCRIPTION */}
							<label htmlFor="description" className="block mb-1 text-sm text-gray-medium">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description || ''}
								onChange={handleChange}
								rows={3}
								className="w-full p-2 border-2 rounded-md border-gray-light"
								placeholder="Enter a short description"
							/>
						</div>

						<div> {/* ICON */}
							<label htmlFor="description" className="block mb-1 text-sm text-gray-medium">
								Icon
							</label>
							<div className="flex flex-row gap-2.5">
								{emojis.map((emoji) => (
									<TaskIcon 
										key={emoji}
										emoji={emoji}
										onSelect={handleIconSelect}
										isSelected={formData.icon === emoji}
									/>
								))}
							</div>
						</div>

						<div> {/* STATUS */}
							<label htmlFor="description" className="block mb-1 text-sm text-gray-medium">
								Status
							</label>
							<div className="grid grid-cols-2 gap-2">
								<TaskStatus handleStatusSelect={handleStatusSelect} title="In Progress" status={Status.IN_PROGRESS} />
								<TaskStatus handleStatusSelect={handleStatusSelect} title="Completed" status={Status.COMPLETED} />
								<TaskStatus handleStatusSelect={handleStatusSelect} title="Wont Do" status={Status.WONT_DO}/>
							</div>
						</div>

						<div className="flex justify-end pt-4 space-x-3">
							<button type="button" onClick={() => onDelete} className="px-4 py-2 text-gray-700 border rounded-3xl hover:bg-gray-50">
								Delete
							</button>
							<button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-3xl hover:bg-blue-700">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TaskEditor;