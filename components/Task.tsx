import Image from 'next/image';
import { TaskType } from '@/lib/types';
import { useEffect } from 'react';

type TaskProps = {
  taskData: TaskType;
  handleEditTask: (task: TaskType) => void;
}

const Task = ({taskData, handleEditTask}:TaskProps) => {
  const taskBgStyle = {
    inprogress: "bg-yellow",
    completed: "bg-light-green",
    wontdo: "bg-light-red",
    todo: "bg-gray-light",
  }

  const taskBgStatus = {
    inprogress: "bg-orange",
    completed: "bg-green",
    wontdo: "bg-red",
    todo: "bg-gray-light",
  }

  const taskEmoji = {
    inprogress: "⏰",
    completed: "🏋️",
    wontdo: "☕️",
    todo: "📚",
  }
  
  const statusEmoji = {
    inprogress: "./Time_atack_duotone.svg",
    completed: "./Done_round_duotone.svg",
    wontdo: "./close_ring_duotone.svg",
    todo: "",
  }

	return (
		<div onClick={() => handleEditTask(taskData)} className={`sm:w-[555px] w-full min-h-[75px] h-auto flex flex-row items-center gap-4 p-4 rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-102 ${taskBgStyle[taskData.status!]}`}>      
      <div className="flex items-center justify-center size-11 rounded-xl bg-background">
        {taskEmoji[taskData.status!]}
      </div>
      <div>
        <h2 className="task-title">{taskData.title}</h2>
        <p className="task-description">{taskData.description}</p>
      </div>
      <div className={`flex items-center justify-center ml-auto size-11 rounded-xl ${taskBgStatus[taskData.status!]}`}>
        {statusEmoji[taskData.status!] && (
          <Image
            src={statusEmoji[taskData.status!]}
            alt="Status"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
	);
}

export default Task;