'use client'

import { UseFormRegister } from "react-hook-form";

type CustomSelectProps = {
    register: UseFormRegister<any>
    name: string
    required?: string
    options: {id: string |number, text: string | number}[]
}
const CustomSelect = ({options, register, name, required}:CustomSelectProps) => {
    return ( 
        <select className="rounded-lg w-full border border-solid border-cyan-600 focus:outline focus:outline-cyan-600 focus:outline-3 h-8 pl-2 text-sm align-middle " {...register(name, {required})}>
            {options.map((option)=><option key={option.id} id={String(option.id)} value={option.id}>{option.text}</option>)}
        </select>
     );
}
 
export default CustomSelect;