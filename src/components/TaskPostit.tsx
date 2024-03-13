'use client'

import { useEffect, useRef, useState } from "react";
import StatusIndicator from "./StatusIndicator";
import {Icon} from '@iconify/react'
type TaskPostItProps = Task & {
    setTaskBeingDragged: (id: number|null)=>void
}
const TaskPostIt = ({id, title, description, status, setTaskBeingDragged}:TaskPostItProps) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const dragRef = useRef<HTMLDivElement>(null)
    const handleStartDrag = () =>{
        setIsDragging(true)
        setTaskBeingDragged(id)
    }
    useEffect(()=>{

        document.addEventListener('mousemove', event => {
            if(isDragging && dragRef?.current){
                const y = event.pageY;
                const x = event.pageX;
                const scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                dragRef.current.style.left =  x - scrollLeft - 128 + 'px';
                dragRef.current.style.top = y - scrollTop - 20 + 'px';
            }
        })
    })
        const handleEndDrag = () =>{
            setIsDragging(false)
            setTaskBeingDragged(null)
    }
    const draggingClasses = 'fixed'
    return ( 
        <div id={String(id)} ref={dragRef} className={`h-64 w-64 bg-yellow-100 m-2 flex flex-col justify-between rounded-lg ${isDragging && draggingClasses}`} >
            <div className="w-full flex justify-center">
            <button onMouseDown={handleStartDrag} onMouseUp={handleEndDrag}><Icon icon="majesticons:pin" color="#c92c20" /></button>
            </div>
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