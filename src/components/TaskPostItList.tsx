'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import TaskPostIt from "./TaskPostit";

type TaskPostItListProps = {
    tasks: ({
        Status: {
            id: number;
            name: string;
            color: string;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        createdat: Date;
        createdby: number;
        updatedat: Date;
        status_id: number;
        order: number
    })[]
}
type ElementNode = {
    id: string;
    position: DOMRect;
}
const newPosition = (nodes:ElementNode[],x: number, y:number)=>{
    const previousNode = nodes.findLast((node)=>((node.position.x < x && (node.position.top < y && node.position.bottom > y)  )))
    const posteriorNode = nodes.find((node)=>((node.position.x > x && (node.position.top < y && node.position.bottom > y))))
    return {prevNode: Number(previousNode?.id), postNode: Number(posteriorNode?.id)}
}
const TaskPostItList = ({tasks}: TaskPostItListProps) => {
    /**
    * 
    * tasksplaces = [{id:1, row:1, column:1, x:}]
    */
    const listRef = useRef<HTMLDivElement>(null)
    const [orderedTasks, setOrderedTasks] = useState(tasks)
    const [prevAndPostNode, setPrevAndPostNode] = useState<{prevNode:number,postNode:number}>({prevNode:0,postNode:0})
    const [taskBeingDragged, setTaskBeingDragged] = useState<number|null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [nodesWithIdAndPosition, setNodesWithIdAndPosition] = useState<ElementNode[]>([])
    
    const handleDragging = (id: number|null) =>{
        if(id){
            setIsDragging(true)
            setTaskBeingDragged(id)
        }else{
            setIsDragging(false)
        }
    }
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const {prevNode, postNode}=newPosition(nodesWithIdAndPosition, currentX, currentY);
        setPrevAndPostNode({prevNode:prevNode, postNode: postNode})
            
        }, [nodesWithIdAndPosition]);
        useEffect(()=>{
            if(!isDragging && taskBeingDragged){
                let currentPosition = orderedTasks.find(task=>task.id===taskBeingDragged)!.order
                let newPosition = currentPosition || 0
                if(!isNaN(prevAndPostNode.prevNode)){
                    newPosition = prevAndPostNode.prevNode + 1
                }else if(!isNaN(prevAndPostNode.postNode)){
                    newPosition = prevAndPostNode.postNode - 1
                }
                const goingForward = currentPosition < newPosition
                const filtered = orderedTasks.map((task)=>{
                    const afterPrev = task.order > currentPosition
                    const afterNew = task.order > newPosition
                    const inNew = task.order === newPosition
                    if(task.id === taskBeingDragged){
                        console.log("Moving task: ",task.id," to:",newPosition)
                        return {...task, order:newPosition}
                    }else if((!goingForward && inNew) || (afterNew && !afterPrev)){
                        console.log("Moving task: ",task.id," to:",task.order + 1)
                        return {...task, order: task.order +1}
                    }else if((goingForward && inNew) || (!afterNew && afterPrev)){
                        console.log("Moving task: ",task.id," to:",task.order - 1)
                        return {...task, order: task.order -1}
                    }else{
                        console.log("Not Moving task: ",task.id, "place is: ",task.order)
                        return task
                    }
                }).sort((a,b)=> (a.order > b.order ? 1 : -1))
                setOrderedTasks(filtered)
            }
        },[prevAndPostNode, taskBeingDragged, isDragging])
        
        useEffect(()=>{
            if(listRef?.current){
                const nodes = Array.from(listRef.current.children)
                const newnodes: ElementNode[] = nodes.map((node)=>{
                    return (
                        {
                            id: node.id,
                            position: node.getBoundingClientRect()
                        }
                        )
                    })
                    setNodesWithIdAndPosition(newnodes)
                    
                }
            },[orderedTasks,])
            useEffect(()=>{
                if(isDragging){
                    document.addEventListener('mousemove',handleMouseMove)
                }else{
                    console.log('Task being dragged: ', taskBeingDragged, "between: ", prevAndPostNode.prevNode, "and ", prevAndPostNode.postNode)
                    document.removeEventListener('mousemove',handleMouseMove)
                }
            },[isDragging])
            return ( 
                <div ref={listRef} className='flex gap-2 flex-wrap'>
                {orderedTasks.map((task)=><div className="flex" key={task.id}>
                    {prevAndPostNode.postNode === task.id && isDragging && <div style={{height:1, width:'16px'}}></div>}
                <TaskPostIt setTaskBeingDragged={handleDragging} key={task.id} id={task.id} title={task.title} description={task.description} status={task.Status}/>{prevAndPostNode.prevNode === task.id && isDragging && <div style={{height:1, width:'16px'}}></div>}</div>)}
                </div>
                );
            }
            
            export default TaskPostItList;