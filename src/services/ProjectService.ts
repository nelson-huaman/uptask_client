import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, projectSchema, type Project, type ProjectFromData } from "@/types/index";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFromData) {
   try {
      const { data } = await api.post<string>("/projects", formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getProjects() {
   try {
      const { data } = await api("/projects")
      const response = dashboardProjectSchema.safeParse(data)
      if (response.success) {
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getProjectById(id: Project['_id']) {
   try {
      const { data } = await api(`/projects/${id}`)
      const response = editProjectSchema.safeParse(data)
      if(response.success) {
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function getFullProject(id: Project['_id']) {
   try {
      const { data } = await api(`/projects/${id}`)
      const response = projectSchema.safeParse(data)
      if(response.success) {
         return response.data
      }
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

type UpdateProjectType = {
   formData: ProjectFromData,
   projectId: Project['_id']
}

export async function updateProject({ formData, projectId }: UpdateProjectType) {
   try {
      const { data } = await api.put<string>(`/projects/${projectId}`, formData)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
   }
}

export async function deleteProject(id: Project['_id']) {
   try {
      const { data } = await api.delete<string>(`/projects/${id}`)
      return data
   } catch (error) {
      if (isAxiosError(error) && error.response) {
         throw new Error(error.response.data.error)
      }
      throw new Error('Error al verificar la contraseña');
   }
}