import Image from 'next/image';

type TaskProps = {
	emoji: string;
}

const TaskIcon = ({emoji}:TaskProps) => {
	return (
		<div className={'size-11 flex flex-col justify-center items-center p-2.5 rounded-xl bg-gray-light cursor-pointer'}>      
			{emoji}
		</div>
	);
}

export default TaskIcon;