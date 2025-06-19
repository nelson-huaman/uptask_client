import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import type { TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/services/TaskService';
import { toast } from 'react-toastify';

function AddTaskModal() {

   const navigate = useNavigate()

   /** Leer si modal existe */
   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)
   const modalTask = queryParams.get('newTask')
   const show = modalTask ? true : false

   /** Obtener projectId */
   const params = useParams()
   const projectId = params.projectId!

   const initialValues: TaskFormData = {
      name: '',
      description: ''
   }

   const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

   const queryClient = useQueryClient()
   const { mutate } = useMutation({
      mutationFn: createTask,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['project', projectId] })
         toast.success(data)
         reset()
         navigate(location.pathname, { replace: true })
      }
   })

   const handleCreateTask = (formData: TaskFormData) => {
      const data = {
         formData,
         projectId
      }
      mutate(data);
   }
   return (
      <>
         <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
               <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black/60" />
               </TransitionChild>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-10">
                           <DialogTitle
                              as="h3"
                              className="font-black text-4xl mb-5"
                           >
                              Nueva Tarea
                           </DialogTitle>

                           <p className="text-xl font-bold">Llena el formulario y crea  {''}
                              <span className="text-fuchsia-600">una tarea</span>
                           </p>

                           <form
                              className="mt-5 space-y-5"
                              onSubmit={handleSubmit(handleCreateTask)}
                              noValidate
                           >
                              <TaskForm
                                 errors={errors}
                                 register={register}
                              />
                              <input
                                 type="submit"
                                 value="Registrar Tarea"
                                 className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 rounded-lg font-bold uppercase text-center transition-colors cursor-pointer w-full"
                              />
                           </form>

                        </DialogPanel>
                     </TransitionChild>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
}

export default AddTaskModal