import StatusIndicator from "./StatusIndicator";

type TaskPostItProps = Task
const TaskPostIt = ({title, description, status}:TaskPostItProps) => {
    return ( 
        <div className="h-32 w-32 bg-yellow-100" >
            <h3 id="title" aria-describedby="title">
                {title}
            </h3>
            <p>
                {description}
            </p>
            <div>
                <StatusIndicator status="To do"/>
            </div>
        </div>
     );
}
 
export default TaskPostIt;