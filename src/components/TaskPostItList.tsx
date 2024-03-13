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
    })[]
}
type ElementNode = {
    id: string;
    position: DOMRect;
}
const newPosition = ( nodes: ElementNode[], x: number, y:number)=>{
    const previousNode = nodes.findLast((node)=>(node.position.right< x ))
    if(previousNode){
        
    }
    console.log("🚀Fran ~ file: TaskPostItList.tsx:29 ~ newPosition ~ previousNode:", previousNode)
}
const TaskPostItList = ({tasks}: TaskPostItListProps) => {
    /**
     * 
     * tasksplaces = [{id:1, row:1, column:1, x:}]
     */
    const listRef = useRef<HTMLDivElement>(null)
    const [taskBeingDragged, setTaskBeingDragged] = useState<number|null>(null)
    const [nodesWithIdAndPosition, setNodesWithIdAndPosition] = useState<ElementNode[]>([])
    const newPosition = (nodes:ElementNode[],x: number, y:number)=>{
        const previousNode = nodes.findLast((node)=>(node.position.right< x ))
        if(previousNode){
            console.log("🚀Fran ~ file: TaskPostItList.tsx:45 ~ newPosition ~ previousNode:", previousNode)
            
        }
    }
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const currentX = e.clientX;
        const currentY = e.clientY;
        newPosition(nodesWithIdAndPosition, currentX, currentY);
    }, [nodesWithIdAndPosition]);

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
    },[])
    useEffect(()=>{
        if(taskBeingDragged){
            document.addEventListener('mousemove',handleMouseMove)
        }else{
            document.removeEventListener('mousemove',handleMouseMove)
        }
    },[taskBeingDragged])
    return ( 
        <div ref={listRef} className='flex gap-2 flex-wrap' onDragEnter={()=>console.log('dragenter')}>
        {tasks.map((task)=><TaskPostIt setTaskBeingDragged={(id: number|null)=>setTaskBeingDragged(id)} key={task.id} id={task.id} title={task.title} description={task.description} status={task.Status}/>)}
        </div>
        );
    }
    
    export default TaskPostItList;