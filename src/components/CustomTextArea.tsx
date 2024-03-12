import { UseFormRegister } from "react-hook-form";


type CustomTextAreaProps = {
    placeholder?: string,
    register: UseFormRegister<any>
    name: string,
    required?: boolean
}
const CustomTextArea = ({placeholder, register, name, required}:CustomTextAreaProps) => {
    return ( 
        <textarea className="rounded-lg w-full border border-solid border-cyan-600  focus:outline focus:outline-cyan-600 focus:outline-3 h-8 col-span-5 row-span-1 pl-2 pt-1 text-sm min-h-32"
        placeholder={placeholder} {...register(name, {required})} ></textarea>
     );
}
 
export default CustomTextArea;