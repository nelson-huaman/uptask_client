import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useForm } from "react-hook-form"
import type { Project, ProjectFromData } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProject } from "@/services/ProjectService"
import { toast } from "react-toastify"

type EditProjectFormProps = {
   data: ProjectFromData,
   projectId: Project['_id']
}

function EditProjectForm({ data, projectId }: EditProjectFormProps) {

   const navigate = useNavigate()

   const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
         projectName: data.projectName,
         clientName: data.clientName,
         description: data.description
      }
   })

   const queryClient = useQueryClient()

   const { mutate } = useMutation({
      mutationFn: updateProject,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['projects'] })
         queryClient.invalidateQueries({ queryKey: ['editProject', projectId] })
         toast.success(data)
         navigate('/')
      },
      onError: (error) => {
         toast.error(error.message)
      }
   })

   const handleForm = (formData: ProjectFromData) => {
      const data = {
         formData,
         projectId
      }
      mutate(data)
   }

   return (
      <div className="max-w-3xl mx-auto">
         <h1 className="text-4xl font-black">Editar Proyecto</h1>
         <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar el proyeto</p>
         <nav className="mt-5">
            <Link
               to={"/"}
               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold uppercase text-center transition-colors cursor-pointer"
            >
               Volver Proyectos
            </Link>
         </nav>
         <form
            className="mt-10 bg-white shadow-lg rounded-lg p-10"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >
            <ProjectForm
               register={register}
               errors={errors}
            />
            <input
               type="submit"
               className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-lg font-bold uppercase text-center transition-colors cursor-pointer w-full"
               value={"Guardar Cambios"}
            />
         </form>
      </div>
   )
}

export default EditProjectForm