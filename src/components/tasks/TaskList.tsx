import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import type { Project, TaskProject, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTraslations } from "@/locales/es"
import DropTask from "./DropTask"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "@/services/TaskService"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type TaskListProps = {
   tasks: TaskProject[]
   canEdit: boolean
}

type GroupedTask = {
   [key: string]: TaskProject[]
}

const initialStateGroups: GroupedTask = {
   pending: [],
   onHold: [],
   inProgress: [],
   underReview: [],
   completed: [],
}

const statusStyles: { [key: string]: string } = {
   pending: 'border-slate-500 bg-slate-200',
   onHold: 'border-red-500 bg-red-200',
   inProgress: 'border-blue-500 bg-blue-200',
   underReview: 'border-amber-500 bg-amber-200',
   completed: 'border-emerald-500 bg-emerald-200'
}

function TaskList({ tasks, canEdit }: TaskListProps) {

   const params = useParams()
   const projectId = params.projectId!

   const queryClient = useQueryClient()
   const { mutate } = useMutation({
      mutationFn: updateStatus,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (data) => {
         toast.success(data)
         queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      }
   })

   const groupedTasks = tasks.reduce((acc, task) => {
      let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
      currentGroup = [...currentGroup, task]
      return { ...acc, [task.status]: currentGroup };
   }, initialStateGroups);

   const handleDragEnd = (e: DragEndEvent) => {
      const { over, active } = e
      if (over && over.id) {
         const taskId = active.id.toString()
         const status = over.id as TaskStatus
         mutate({ projectId, taskId, status })

         queryClient.setQueryData(['project', projectId], (prevData: Project) => {
            const updateTasks = prevData.tasks.map((task) => {
               if (task._id === taskId) {
                  return { ...task, status }
               }
               return task
            })
            return { ...prevData, tasks: updateTasks }
         })
      }
   }

   return (
      <>
         <h2 className="text-5xl font-black my-10">Tareas</h2>

         <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
            <DndContext onDragEnd={handleDragEnd}>
               {Object.entries(groupedTasks).map(([status, tasks]) => (
                  <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                     <h3
                        className={`text-xl font-bold border-t-8 p-2 text-center ${statusStyles[status]}`}
                     >{statusTraslations[status]}</h3>

                     <DropTask status={status} />

                     <ul className='mt-5 space-y-5'>
                        {tasks.length === 0 ? (
                           <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                        ) : (
                           tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                        )}
                     </ul>
                  </div>
               ))}
            </DndContext>
         </div>
      </>
   )
}

export default TaskList