import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TeamMemberSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";

type TeamAPI = {
   formData: TeamMemberForm
   projectId: Project['_id']
   id: TeamMember['_id']
   userId: TeamMember['_id']
}

export async function findUserByEmail({ projectId, formData }: Pick<TeamAPI, 'projectId' | 'formData'>) {
   try {
      const url = `/projects/${projectId}/team/find`
      const { data } = await api.post(url, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function addUserToProject({ projectId, id }: Pick<TeamAPI, 'projectId' | 'id'>) {
   try {
      const url = `/projects/${projectId}/team`
      const { data } = await api.post<string>(url, { id })
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getProjectTeam({ projectId }: Pick<TeamAPI, 'projectId'>) {
   try {
      const url = `/projects/${projectId}/team`
      const { data } = await api(url)
      const response = TeamMemberSchema.safeParse(data)
      if(response.success) {
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function removeUserFormProject({ projectId, userId }: Pick<TeamAPI, 'projectId' | 'userId'>) {
   try {
      const url = `/projects/${projectId}/team/${userId}`
      const { data } = await api.delete<string>(url)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}