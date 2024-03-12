import StatusIndicator from "./StatusIndicator";

type TaskPostItProps = Task
const TaskPostIt = ({title, description, status}:TaskPostItProps) => {
    return ( 
        <div className="h-64 w-64 bg-yellow-100 m-2 flex flex-col justify-between rounded-lg" >
          <div className="flex flex-col gap-2 pt-4">
						<h3 className="text-lg font-semibold text-center" id="title" aria-describedby="title">
								{title}
						</h3>
						<p className="text-sm text-center text-ellipsis">
								{description}
						</p>
          </div>
          <div className="pt-4 pb-4">
              <StatusIndicator status={status}/>
          </div>
      </div>
     );
}
 
export default TaskPostIt;