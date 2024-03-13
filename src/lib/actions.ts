'use server'

import { CreateTaskFormInput } from "@/ui/CreateTaskForm"
import { Prisma } from "@prisma/client"
import prisma from "./prisma"

export const createTaskAction = async (newTaskData: CreateTaskFormInput) =>{
    const latestTask = await prisma.tasks.findFirst({
        where:{
            createdby: 1,
        },
        orderBy:{
            order: 'desc'
        }
    })

    await prisma.tasks.create({
        data:{
            title:newTaskData.title,
            description:newTaskData.description,
            status_id: Number(newTaskData.status),
            createdat: new Date(),
            updatedat: new Date(),
            createdby: 1,
            order: (latestTask?.order ?? 0) + 1
        }
    })
}