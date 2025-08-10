
type TaskProps = {
  status: "progress" | "completed" | "wontdo" | "todo";
  title: string;
}

const Task = ({status, title}:TaskProps) => {

  const taskBgStyle = {
    progress: "bg-yellow",
    completed: "bg-light-green",
    wontdo: "bg-light-red",
    todo: "bg-gray-light",
  }

  const taskBgStatus = {
    progress: "bg-orange",
    completed: "bg-green",
    wontdo: "bg-red",
    todo: "bg-gray-light",
  }

  const taskEmoji = {
    progress: "⏰",
    completed: "🏋️",
    wontdo: "☕️",
    todo: "📚",
  }
  
  const statusEmoji = {
    progress: "",
    completed: "",
    wontdo: "",
    todo: "",
  }

	return (
		<div className={`w-[555px] h-[75px] flex flex-row items-center gap-4 p-4 rounded-2xl ${taskBgStyle[status]}`}>      
      <div className="size-11 rounded-xl flex items-center justify-center bg-background">
        {taskEmoji[status]}
      </div>
      <h2 className="task-title">{title}</h2>
      <div className={`size-11 rounded-xl ml-auto flex items-center justify-center ${taskBgStatus[status]}`}>
        {statusEmoji[status]}
      </div>
    </div>
	);
}

export default Task;