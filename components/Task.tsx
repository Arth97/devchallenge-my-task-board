
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

	return (
		<div className={`w-[555px] h-[75px] flex flex-row items-center p-4 rounded-2xl ${taskBgStyle[status]}`}>      
      <div className="size-11 rounded-xl bg-background"></div>
      <h2 className="task-title">{title}</h2>
      <div className={`size-11 rounded-xl ml-auto ${taskBgStatus[status]}`}></div>
    </div>
	);
}

export default Task;