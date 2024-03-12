'use client'
import { CreateTaskFormInput } from "@/ui/CreateTaskForm"
import { ChangeEvent } from "react"
import { FieldError, UseFormRegister } from "react-hook-form"

type CustomInputProps = {
    placeholder?: string,
    error?: FieldError
    register: UseFormRegister<any>
    name: string,
    required?: string
}
const CustomInput = ({placeholder, register,error, name, required}:CustomInputProps) => {
    return ( 
        <div className="flex flex-col">
            <input className={`rounded-lg w-full border border-solid border-cyan-600  focus:outline focus:outline-cyan-600 focus:outline-3 h-8 col-span-5 row-span-1 pl-2 text-sm ${error && 'border-red-600 focus:outline-red-600'}`} placeholder={placeholder} {...register(name, {required})}
            />
            {error && <span className="text-red-600 text-xs pl-2 pt-1" >{error.message}</span>}
        </div>
        );
    }
    
    export default CustomInput;