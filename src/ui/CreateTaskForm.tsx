'use client'
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import CustomTextArea from "@/components/CustomTextArea";
import { createTaskAction } from "@/lib/actions";
import { SubmitHandler, useForm } from "react-hook-form";
export type CreateTaskFormInput = {
    title: string
    description?: string
    status: number
}
type CreateTaskForm = {
    statuses: Status[]
}
const CreateTaskForm = ({statuses}:CreateTaskForm) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<CreateTaskFormInput>()
    const onSubmit: SubmitHandler<CreateTaskFormInput> = (data) => createTaskAction(data)
    console.log("🚀Fran ~ file: CreateTaskForm.tsx:20 ~ CreateTaskForm ~ errors:", errors)
    return ( 
        <form className="bg-gray-100 rounded-lg shadow-lg ml-2 mr-2 p-2 text-black" onSubmit={handleSubmit(onSubmit,)}>
            <label>Title</label>
            <CustomInput error={errors.title} placeholder="Title eg. 'Laundry day'" register={register} name="title" required="This field is required" />
            <label>Description</label>
            <CustomTextArea placeholder="Description eg. 'White clothes only!'" register={register} name="description"/>
            <label>Status</label>
            <CustomSelect options={statuses.map(status=>({id:Number(status.id), text:status.name}))} required="You need to assign a status" register={register} name='status'/>
            <button className="h-8 pl-2 pr-2 mt-2 rounded-lg w-full bg-sky-200 hover:bg-sky-300 ease-in duration-150" type="submit">Create</button>
        </form>
     );
}
 
export default CreateTaskForm;