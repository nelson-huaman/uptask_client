import type { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/services/NoteService"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

function AddNoteForm() {

   const params = useParams()
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)

   const projectId = params.projectId!
   const taskId = queryParams.get('viewTask')!

   const initialValues: NoteFormData = {
      content: ''
   }

   const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

   const queryClient = useQueryClient()
   const { mutate } = useMutation({
      mutationFn: createNote,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (data) => {
         toast.success(data)
         queryClient.invalidateQueries({queryKey: ['task', taskId]})
      }
   })

   const handleAddNote = (formData: NoteFormData) => {
      const data = { projectId, taskId, formData }
      mutate(data)
      reset()
   }

   return (
      <form
         onSubmit={handleSubmit(handleAddNote)}
         className="space-y-3"
         noValidate
      >
         <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Crear Nota</label>
            <input
               id="content"
               type="text"
               placeholder="Contenido de la Nota"
               className="w-full p-3 border border-gray-300"
               {...register('content', {
                  required: 'El contenido de la nota es obligatorio'
               })}
            />
            {errors.content && (
               <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
         </div>
         <input
            type="submit"
            value="Crear Nota"
            className="bg-fuchsia-600 hover:bg-fuchsia-800 w-full p-2 text-white font-bold cursor-pointer"
         />
      </form>
   )
}

export default AddNoteForm