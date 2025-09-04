import Image from 'next/image';

type TaskIconProps = {
	emoji: string;
	onSelect: (emoji: string) => void;
	isSelected?: boolean;
}

const TaskIcon = ({ emoji, onSelect, isSelected = false }: TaskIconProps) => {
	return (
		<div onClick={() => onSelect(emoji)}
			className={`size-11 flex flex-col justify-center items-center p-2.5 rounded-xl bg-gray-light cursor-pointer
			${isSelected ? 'bg-yellow' : 'bg-gray-light hover:bg-gray-200'}`}
		>
			{emoji}
		</div>
	);
}

export default TaskIcon;