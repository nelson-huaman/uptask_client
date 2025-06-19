import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { getFullProject } from "@/services/ProjectService";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

function ProjectDetailView() {

   const { data: user, isLoading: authLoading } = useAuth()

   const navigate = useNavigate()

   const params = useParams()
   const projectId = params.projectId!
   const { data, isLoading, isError } = useQuery({
      queryKey: ['project', projectId],
      queryFn: () => getFullProject(projectId),
      retry: false
   })

   const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

   if (isLoading && authLoading) return 'Carregando...'
   if (isError) return <Navigate to={'/404'} />

   if (data && user) return (
      <>
         <h1 className="text-5xl font-black">{data.projectName}</h1>
         <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
         {isManager(data.manager, user._id) && (
            <nav className="my-5 flex gap-2">
               <button
                  type="button"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold uppercase text-center transition-colors cursor-pointer inline-block mt-5"
                  onClick={() => navigate(location.pathname + "?newTask=true")}
               >Agregar Tarea</button>
               <Link
                  to={'team'}
                  className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-lg font-bold uppercase text-center transition-colors cursor-pointer inline-block mt-5"
               >
                  Colaboradores
               </Link>
            </nav>
         )}
         
         <TaskList
            tasks={data.tasks}
            canEdit={canEdit}
         />
         <AddTaskModal />
         <EditTaskData />
         <TaskModalDetails />
      </>
   )
}

export default ProjectDetailView