import { fetchAllStatuses } from "@/lib/apicalls";
import CreateTaskForm from "@/ui/CreateTaskForm";

const CreateTask = async () => {
    const statuses = await fetchAllStatuses()
    return ( 
        <div className="bg-white w-full h-full">
            <CreateTaskForm statuses={statuses}/>
        </div>
     );
}
 
export default CreateTask;