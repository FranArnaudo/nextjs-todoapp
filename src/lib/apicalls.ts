import { Prisma } from "@prisma/client"
import prisma from "./prisma"

export const fetchAllTasks = async (query:string, status:string) => {
  const where: Prisma.TasksWhereInput = {
    OR:[
      { 
        title:{
          contains: query,
          mode: 'insensitive'
        },
      },
      {
        description:{
          contains: query,
          mode: 'insensitive'
        }
      }
    ],
    ...(status !== '0' ? {status_id:{ equals: Number(status)} } : {})
  }
  return await prisma.tasks.findMany({
    where,
    include:{
      Status: true
    }
  })
  
}

export const fetchAllStatuses = async () =>{
  return await prisma.status.findMany()
}