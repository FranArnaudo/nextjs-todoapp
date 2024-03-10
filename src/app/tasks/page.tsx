import TaskPostIt from "@/components/TaskPostit";

const TasksPage = () => {
    return ( 
        <div className="w-full 
        h-full bg-white d-flex justify-start 
        content-start text-black p-20">
            {/* <div className="pt-3 pb-3 ">

            </div> */}
            <TaskPostIt/>
        </div>
     );
}
 
export default TasksPage;