import { useAuth } from "@/hooks/useAuth"
import { deleteNote } from "@/services/NoteService"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
   note: Note
}

function NoteDetail({ note }: NoteDetailProps) {

   const location = useLocation()
   const queryParams = new URLSearchParams(location.search)
   const taskId = queryParams.get('viewTask')!

   const params = useParams()
   const projectId = params.projectId!

   const { data, isLoading } = useAuth()
   const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

   const queryClient = useQueryClient()
   const { mutate } = useMutation({
      mutationFn: deleteNote,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (data) => {
         toast.success(data)
         queryClient.invalidateQueries({queryKey: ['task', taskId]})
      }
   })

   if (isLoading) return 'Cargando...'

   return (
      <div className="flex justify-between items-center p-2">
         <div>
            <p>
               {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
            </p>
            <p className="text-xs text-slate-500">
               {formatDate(note.createdAt)}
            </p>
         </div>
         {canDelete && (
            <button
               type="button"
               className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
               onClick={() => mutate({projectId, taskId, noteId: note._id})}
            >Eliminar</button>
         )}
      </div>
   )
}

export default NoteDetail