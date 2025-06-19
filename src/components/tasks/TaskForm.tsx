import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { TaskFormData } from "@/types/index";

type TaskFormProps = {
   errors: FieldErrors<TaskFormData>
   register: UseFormRegister<TaskFormData>
}

function TaskForm({ errors, register }: TaskFormProps) {
   return (
      <>
         <div className="flex flex-col gap-2">
            <label
               className="font-normal text-lg"
               htmlFor="name"
            >Nombre de la tarea</label>
            <input
               id="name"
               type="text"
               placeholder="Nombre de la tarea"
               className="w-full p-3  border-gray-300 border"
               {...register("name", {
                  required: "El nombre de la tarea es obligatorio",
               })}
            />
            {errors.name && (
               <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
         </div>

         <div className="flex flex-col gap-2">
            <label
               className="font-normal text-lg"
               htmlFor="description"
            >Descripción de la tarea</label>
            <textarea
               id="description"
               placeholder="Descripción de la tarea"
               className="w-full p-3  border-gray-300 border"
               {...register("description", {
                  required: "La descripción de la tarea es obligatoria"
               })}
            />
            {errors.description && (
               <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
         </div>
      </>
   )
}

export default TaskForm
