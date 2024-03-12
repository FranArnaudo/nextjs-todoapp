import TaskPostIt from "@/components/TaskPostit";
import { fetchAllStatuses, fetchAllTasks } from "@/lib/apicalls";
import ButtonLink from "@/components/ButtonLink";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import _ from 'lodash'
import Search from "@/components/Search";

const TasksPage = async ({searchParams}:{searchParams:{
    query?:string,
    status?:string
}}) => {
    const query = searchParams.query || ''
    const status = searchParams.status || '0'
    const tasks = await fetchAllTasks(query,status)
    const statuses = await fetchAllStatuses()
    return ( 
        <div className="w-full 
        h-full bg-white d-flex justify-start 
        content-start text-black p-20">
            <div className="pt-3 pb-3 bg-gray-50 shadow-xl rounded-xl w-full flex flex-col gap-4 pl-2 p-4">
                <Search statuses={statuses}/>
                <ButtonLink text="Add note" href="/tasks/create"/>
            </div>
            {tasks.map((task)=><TaskPostIt key={task.id} title={task.title} description={task.description} status={task.Status}/>)}
        </div>
     );
}
 
export default TasksPage;