import ProjectForm from "@/components/projects/ProjectForm"
import { createProject } from "@/services/ProjectService"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import type { ProjectFromData } from "@/types/index"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

function CreateProjectView() {

   const navigate = useNavigate()

   const initialValues: ProjectFromData = {
      projectName: "",
      clientName: "",
      description: ""
   }

   const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

   const { mutate } = useMutation({
      mutationFn: createProject,
      onSuccess: (data) => {
         toast.success(data)
         navigate('/')
      },
      onError: (error) => {
         toast.error(error.message)
      }
   })

   const handleForm = (formData: ProjectFromData) => mutate(formData)

   return (
      <div className="max-w-3xl mx-auto">
         <h1 className="text-4xl font-black">Crear Proyecto</h1>
         <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyeto</p>
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
               value={"Crear Proyecto"}
            />
         </form>
      </div>
   )
}

export default CreateProjectView