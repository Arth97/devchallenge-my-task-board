import Image from 'next/image';
import { TaskType } from '@/lib/types';
import { Dispatch, SetStateAction, useState } from 'react';
import TaskIcon from './TaskIcon';
import TaskStatus from './TaskStatus';

type TaskEditorProps = {
	taskData?: Partial<TaskType>;
	onClose: () => void;
	onSave: (task: Partial<TaskType>) => void;
}

const emojis = ["👨🏻‍💻", "💬", "☕️", "🏋️", "📚", "⏰"];

const TaskEditor = ({ taskData = {}, onClose, onSave }: TaskEditorProps) => {
	const [formData, setFormData] = useState<Partial<TaskType>>(taskData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black-transparent flex items-center justify-end z-50 p-4">
			{/* <div className={`w-[630px] h-[755px] flex flex-col items-start gap-5 p-5 rounded-xl bg-white`}> */}
			<div className="w-[630px] h-full bg-white rounded-xl">
				<div className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold">
							Task details
						</h2>
						<button onClick={onClose} className="cursor-pointer border-2 border-gray-light rounded-md p-1">
							<Image src="./close_ring_duotone-1.svg" alt="Close" width={24} height={24} />
						</button>
					</div>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						<div> {/* TASK NAME */}
							<label htmlFor="taskName" className="block text-sm text-gray-medium mb-1">
								Task name
							</label>
							<input
								id="taskName"
								name="taskName"
								type="text"
								value={formData.title || ''}
								onChange={handleChange}
								className="w-full p-2 border-2 border-gray-light rounded-md"
								required
							/>
						</div>
						
						<div> {/* DESCRIPTION */}
							<label htmlFor="description" className="block text-sm text-gray-medium mb-1">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								value={formData.description || ''}
								onChange={handleChange}
								rows={3}
								className="w-full p-2 border-2 border-gray-light rounded-md"
								placeholder="Enter a short description"
							/>
						</div>

						<div> {/* ICON */}
							<label htmlFor="description" className="block text-sm text-gray-medium mb-1">
								Icon
							</label>
							<div className="flex flex-row gap-2.5">
								{emojis.map((e) => (
									<TaskIcon emoji={e}/>
								))}
							</div>
						</div>

						<div> {/* STATUS */}
							<label htmlFor="description" className="block text-sm text-gray-medium mb-1">
								Status
							</label>
							<div className="grid grid-cols-2 gap-2">
								<TaskStatus title="In Progress" status="inprogress"/>
								<TaskStatus title="Completed" status="completed"/>
								<TaskStatus title="Wont Do" status="wontdo"/>
							</div>
						</div>

						<div className="flex justify-end space-x-3 pt-4">
							<button type="button" onClick={null}
								className="px-4 py-2 rounded-3xl text-gray-700 border hover:bg-gray-50"
							>
								Delete
							</button>
							<button type="submit"
								className="px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-700"
							>
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