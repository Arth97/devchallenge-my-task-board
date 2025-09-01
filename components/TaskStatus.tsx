import Image from 'next/image';

type TaskProps = {
  title: string;
	status: 'inprogress' | 'completed' | "wontdo" | "todo";
}

const taskBgStatus = {
  inprogress: "bg-orange",
  completed: "bg-green",
  wontdo: "bg-red",
  todo: "bg-gray-light",
}

const statusEmoji = {
  inprogress: "./Time_atack_duotone.svg",
  completed: "./Done_round_duotone.svg",
  wontdo: "./close_ring_duotone.svg",
  todo: "",
}

const TaskIcon = ({title, status}:TaskProps) => {
	return (
		<div className={'w-[280px] h-[50px] flex flex-row justify-start items-center gap-3 p-0.5 rounded-2xl border-2 border-gray-light cursor-pointer'}>      
			<div className={`size-11 rounded-xl flex items-center justify-center ${taskBgStatus[status]}`}>
        {statusEmoji[status] && (
          <Image
            src={statusEmoji[status]}
            alt="Status"
            width={24}
            height={24}
          />
        )}
      </div>
      <p className="font-semibold">{title}</p>
		</div>
	);
}

export default TaskIcon;